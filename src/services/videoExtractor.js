/**
 * YX Shot - Client Video Extraction Service
 * First calls the internal /api/download serverless endpoint (zero CORS issues).
 * Falls back to client-side multi-engine scrapers if offline.
 */

function decodeB64(str) {
  if (!str) return '';
  try {
    if (typeof atob !== 'undefined') {
      return atob(str);
    }
    return Buffer.from(str, 'base64').toString('utf-8');
  } catch (e) {
    return str;
  }
}

/**
 * Katman 1: Dahili Sunucusuz API Rotaları (/api/download)
 * Vercel üzerinde çalıştığında tarayıcı CORS kısıtlamalarına takılmadan doğrudan sunucu tarafında çalışır.
 */
async function extractViaServerApi(url) {
  try {
    const res = await fetch('/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (res.ok) {
      const json = await res.json();
      if (json && json.success && json.data) {
        return json;
      }
      if (json && json.error) {
        return json;
      }
    }
  } catch (e) {}
  return null;
}

/**
 * Katman 2: İstemci Tarafı oEmbed
 */
async function fetchClientOEmbed(shortcode) {
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
 * Katman 3: İstemci Tarafı SaveIG
 */
async function extractClientSaveIG(shortcode) {
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
 * Katman 4: İstemci Tarafı InstaVideoSave
 */
async function extractClientInstaVideoSave(shortcode) {
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
 * Ana Çıkarım Fonksiyonu
 */
export async function extractMedia(urlOrShortcode) {
  if (!urlOrShortcode) {
    return { success: false, error: 'Lütfen geçerli bir Reels veya video bağlantısı girin.' };
  }

  let shortcode = urlOrShortcode.trim();
  const match = shortcode.match(/(?:reel|reels|p|tv|share\/(?:reel|p))\/([A-Za-z0-9_-]+)/i);
  if (match) {
    shortcode = match[1];
  } else {
    shortcode = shortcode.replace(/[^A-Za-z0-9_-]/g, '');
  }

  if (!shortcode || shortcode.length < 3) {
    return { success: false, error: 'Reels bağlantısı doğrulanamadı.' };
  }

  const cleanUrl = `https://www.instagram.com/reel/${shortcode}/`;

  // 1. Önce dahili sunucusuz rotayı çağır (CORS yok)
  const serverResult = await extractViaServerApi(cleanUrl);
  if (serverResult) {
    return serverResult;
  }

  // 2. Yedek: İstemci tarafı oEmbed ve SaveIG
  const [oembedData, saveIgResult] = await Promise.all([
    fetchClientOEmbed(shortcode),
    extractClientSaveIG(shortcode),
  ]);

  let extractedVideo = saveIgResult;

  if (!extractedVideo || !extractedVideo.videoUrl) {
    extractedVideo = await extractClientInstaVideoSave(shortcode);
  }

  if (!extractedVideo || !extractedVideo.videoUrl) {
    return {
      success: false,
      error: 'Video bilgileri çıkarılamadı. Video silinmiş veya hesap gizli olabilir.',
    };
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

  return {
    success: true,
    data,
  };
}
