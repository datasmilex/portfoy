/**
 * Vercel Serverless Function: /api/download
 * Fully configured with user's Safesite RapidAPI key + multi-tier fallback scrapers.
 */

const DEFAULT_RAPIDAPI_KEY = '5d9a671ebbmshca5285f2d1854f0p154a1ajsn0ca2677241d2';

function decodeB64(str) {
  if (!str) return '';
  try {
    return Buffer.from(str, 'base64').toString('utf-8');
  } catch (e) {
    return str;
  }
}

/**
 * 1. User's Safesite RapidAPI Endpoint (Primary Engine)
 */
async function extractViaSafesiteRapidAPI(url, apiKey) {
  const key = apiKey || process.env.RAPIDAPI_KEY || DEFAULT_RAPIDAPI_KEY;
  try {
    const endpoint = `https://instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com/convert?url=${encodeURIComponent(url)}`;
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com',
        'x-rapidapi-key': key,
      },
    });

    if (res.ok) {
      const json = await res.json();
      const videoItem = json?.media?.find((m) => m.type === 'video' || (m.url && m.url.includes('.mp4'))) || json?.media?.[0];
      if (videoItem && videoItem.url) {
        return {
          videoUrl: videoItem.url,
          thumbnailUrl: videoItem.thumbnail,
          title: json.title || 'Reels Videosu',
        };
      }
    }
  } catch (e) {
    console.error('Safesite RapidAPI error:', e);
  }
  return null;
}

/**
 * 2. oEmbed Metadata
 */
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

/**
 * 3. SaveIG Scraper
 */
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

/**
 * 4. InstaVideoSave Scraper
 */
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

/**
 * 5. Cobalt Multi-Node Scraper
 */
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
    return res.status(200).end();
  }

  // Stream proxy for downloads: GET /api/download?stream=...
  if (req.method === 'GET' && req.query.stream) {
    try {
      const streamUrl = decodeURIComponent(req.query.stream);
      const filename = req.query.filename || 'reels_video.mp4';

      const response = await fetch(streamUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
          'Referer': 'https://www.instagram.com/',
        },
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: 'Stream error' });
      }

      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
      
      const buffer = await response.arrayBuffer();
      return res.status(200).send(Buffer.from(buffer));
    } catch (e) {
      return res.status(500).json({ error: 'Stream failed' });
    }
  }

  try {
    let rawUrl = '';
    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch (e) {}
      }
      rawUrl = body?.url || '';
    } else if (req.method === 'GET') {
      rawUrl = req.query?.url || '';
    }

    if (!rawUrl || typeof rawUrl !== 'string') {
      return res.status(200).json({ success: false, error: 'Geçerli bir video bağlantısı gönderilmelidir.' });
    }

    let shortcode = rawUrl.trim();
    const match = shortcode.match(/(?:reel|reels|p|tv|share\/(?:reel|p))\/([A-Za-z0-9_-]+)/i);
    if (match) {
      shortcode = match[1];
    } else {
      shortcode = shortcode.replace(/[^A-Za-z0-9_-]/g, '');
    }

    if (!shortcode || shortcode.length < 3) {
      return res.status(200).json({ success: false, error: 'Reels bağlantısı veya shortcode doğrulanamadı.' });
    }

    const cleanUrl = `https://www.instagram.com/reel/${shortcode}/`;
    const apiKey = process.env.RAPIDAPI_KEY || DEFAULT_RAPIDAPI_KEY;

    // Step 1: Safesite RapidAPI (Primary)
    let extractedVideo = await extractViaSafesiteRapidAPI(cleanUrl, apiKey);

    // Step 2: Parallel oEmbed + SaveIG
    const [oembedData, saveIgResult] = await Promise.all([
      fetchOEmbed(shortcode),
      extractedVideo ? Promise.resolve(null) : extractSaveIG(shortcode),
    ]);

    if (!extractedVideo) {
      extractedVideo = saveIgResult;
    }

    // Step 3: InstaVideoSave Fallback
    if (!extractedVideo || !extractedVideo.videoUrl) {
      extractedVideo = await extractInstaVideoSave(shortcode);
    }

    // Step 4: Cobalt Fallback
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
      downloadUrl: `/api/download?stream=${encodeURIComponent(videoUrl)}&filename=${username}_${shortcode}.mp4`,
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
