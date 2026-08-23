/**
 * Vercel Serverless Function: POST /api/download
 * Runs on Node.js server to bypass browser CORS and ISP domain blocking.
 */

function decodeB64(str) {
  if (!str) return '';
  try {
    return Buffer.from(str, 'base64').toString('utf-8');
  } catch (e) {
    return str;
  }
}

async function fetchOEmbed(shortcode) {
  try {
    const postUrl = `https://www.instagram.com/reel/${shortcode}/`;
    const res = await fetch(`https://api.instagram.com/oembed/?url=${encodeURIComponent(postUrl)}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {}
  return null;
}

async function extractSaveIG(shortcode) {
  try {
    const postUrl = `https://www.instagram.com/reel/${shortcode}/`;
    const res = await fetch('https://v3.saveig.app/api/ajaxSearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Origin': 'https://saveig.app',
        'Referer': 'https://saveig.app/',
      },
      body: new URLSearchParams({ q: postUrl, t: 'media', lang: 'en' }),
    });

    if (res.ok) {
      const json = await res.json();
      const html = json.data;
      if (html) {
        const mp4Match = html.match(/href="([^"]+?\.mp4[^"]*?)"/) ||
                         html.match(/href="([^"]+?dl=1[^"]*?)"/) ||
                         html.match(/href="([^"]+?rapidcdn\.app[^"]*?)"/) ||
                         html.match(/src="([^"]+?\.mp4[^"]*?)"/);

        const thumbMatch = html.match(/src="([^"]+?cdninstagram\.com[^"]*?)"/) || html.match(/src="([^"]+?\.jpg[^"]*?)"/);

        if (mp4Match) {
          let directUrl = mp4Match[1].replace(/&amp;/g, '&');
          if (directUrl.includes('url=')) {
            const parsedUrl = new URL(directUrl);
            const encoded = parsedUrl.searchParams.get('url');
            if (encoded) {
              const decoded = decodeB64(encoded);
              if (decoded && decoded.startsWith('http')) directUrl = decoded;
            }
          }

          return {
            videoUrl: directUrl,
            thumbnailUrl: thumbMatch ? thumbMatch[1].replace(/&amp;/g, '&') : undefined,
          };
        }
      }
    }
  } catch (e) {}
  return null;
}

async function extractInstaVideoSave(shortcode) {
  try {
    const postUrl = `https://www.instagram.com/reel/${shortcode}/`;
    const res = await fetch('https://instavideosave.net/api/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify({ url: postUrl }),
    });

    if (res.ok) {
      const json = await res.json();
      const videoEntry = json?.url?.find((item) => item.type === 'video' || item.ext === 'mp4') || json?.url?.[0];
      if (videoEntry && videoEntry.url) {
        let directUrl = videoEntry.url;
        if (directUrl.includes('url=')) {
          const parsedUrl = new URL(directUrl);
          const encoded = parsedUrl.searchParams.get('url');
          if (encoded) {
            const decoded = decodeB64(encoded);
            if (decoded && decoded.startsWith('http')) directUrl = decoded;
          }
        }
        return {
          videoUrl: directUrl,
          thumbnailUrl: json.thumb,
          title: json.meta?.title,
        };
      }
    }
  } catch (e) {}
  return null;
}

async function extractCobalt(shortcode) {
  const cobaltNodes = [
    'https://cobalt-api.kwiatekm.tokyo',
    'https://api.cobalt.tools',
    'https://co.wuk.sh',
  ];
  const postUrl = `https://www.instagram.com/reel/${shortcode}/`;

  for (const node of cobaltNodes) {
    try {
      const res = await fetch(`${node}/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: postUrl }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.url) {
          return { videoUrl: json.url };
        }
      }
    } catch (e) {}
  }
  return null;
}

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { url } = req.body || {};
    if (!url || typeof url !== 'string') {
      return res.status(200).json({ success: false, error: 'Geçerli bir video bağlantısı gönderilmelidir.' });
    }

    let shortcode = url.trim();
    const match = shortcode.match(/(?:reel|reels|p|tv|share\/(?:reel|p))\/([A-Za-z0-9_-]+)/i);
    if (match) {
      shortcode = match[1];
    } else {
      shortcode = shortcode.replace(/[^A-Za-z0-9_-]/g, '');
    }

    if (!shortcode || shortcode.length < 3) {
      return res.status(200).json({ success: false, error: 'Reels bağlantısı doğrulanamadı.' });
    }

    // Parallel fetch: oEmbed + SaveIG
    const [oembedData, saveIgResult] = await Promise.all([
      fetchOEmbed(shortcode),
      extractSaveIG(shortcode),
    ]);

    let extractedVideo = saveIgResult;

    if (!extractedVideo || !extractedVideo.videoUrl) {
      extractedVideo = await extractInstaVideoSave(shortcode);
    }

    if (!extractedVideo || !extractedVideo.videoUrl) {
      extractedVideo = await extractCobalt(shortcode);
    }

    if (!extractedVideo || !extractedVideo.videoUrl) {
      return res.status(200).json({
        success: false,
        error: 'Video bilgileri çıkarılamadı. Video silinmiş veya hesap gizli olabilir.',
      });
    }

    const username = oembedData?.author_name || 'reels_user';
    const rawTitle = oembedData?.title || extractedVideo.title || `Reels Videosu (${shortcode})`;
    const title = rawTitle.slice(0, 100);
    const thumbnailUrl = oembedData?.thumbnail_url || extractedVideo.thumbnailUrl || '';
    const videoUrl = extractedVideo.videoUrl;

    const data = {
      id: shortcode,
      shortcode,
      type: 'reel',
      title,
      caption: rawTitle,
      thumbnailUrl,
      videoUrl,
      downloadUrl: videoUrl,
      author: {
        username,
      },
      dimensions: {
        width: 1080,
        height: 1920,
      },
    };

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('API /api/download error:', error);
    return res.status(200).json({
      success: false,
      error: 'Sunucu tarafında beklenmeyen bir hata oluştu.',
    });
  }
}
