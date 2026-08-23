/**
 * YX Shot - Reels & Video Extraction Service
 * 5-Engine Resilient Multi-Layer Scraper with Base64 Decoders
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
 * Engine 1: oEmbed Official Metadata
 */
async function fetchOEmbedInfo(shortcode) {
  try {
    const postUrl = `https://www.instagram.com/reel/${shortcode}/`;
    const url = `https://api.instagram.com/oembed/?url=${encodeURIComponent(postUrl)}`;
    const res = await fetch(url);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {}
  return null;
}

/**
 * Engine 2: SaveIG
 */
async function extractFromSaveIG(shortcode) {
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
 * Engine 3: InstaVideoSave
 */
async function extractFromInstaVideoSave(shortcode) {
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
 * Engine 4: Cobalt Fast API
 */
async function extractFromCobalt(shortcode) {
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

/**
 * Engine 5: Direct Embed Regex Parser
 */
async function extractFromDirectEmbed(shortcode) {
  try {
    const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/`;
    const res = await fetch(embedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    if (res.ok) {
      const html = await res.text();
      const videoMatch = html.match(/"video_url":"([^"]+)"/) || html.match(/<video[^>]+src="([^">]+)"/);
      const thumbMatch = html.match(/"display_url":"([^"]+)"/) || html.match(/<meta property="og:image" content="([^">]+)"/);
      if (videoMatch) {
        return {
          videoUrl: videoMatch[1].replace(/\\u0026/g, '&').replace(/\\\//g, '/'),
          thumbnailUrl: thumbMatch ? thumbMatch[1].replace(/\\u0026/g, '&').replace(/\\\//g, '/') : undefined,
        };
      }
    }
  } catch (e) {}
  return null;
}

/**
 * Main Unified Extraction Function
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

  // Run oEmbed and primary scraper in parallel
  const [oembedData, saveIgResult] = await Promise.all([
    fetchOEmbedInfo(shortcode),
    extractFromSaveIG(shortcode),
  ]);

  let extractedVideo = saveIgResult;

  // Fallback 1: InstaVideoSave
  if (!extractedVideo || !extractedVideo.videoUrl) {
    extractedVideo = await extractFromInstaVideoSave(shortcode);
  }

  // Fallback 2: Cobalt Node
  if (!extractedVideo || !extractedVideo.videoUrl) {
    extractedVideo = await extractFromCobalt(shortcode);
  }

  // Fallback 3: Direct Embed
  if (!extractedVideo || !extractedVideo.videoUrl) {
    extractedVideo = await extractFromDirectEmbed(shortcode);
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
