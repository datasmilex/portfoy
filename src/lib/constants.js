export const INSTAGRAM_PATTERNS = {
  REEL: /https?:\/\/(?:www\.)?instagram\.com\/(?:reel|reels)\/([A-Za-z0-9_-]+)/i,
  POST: /https?:\/\/(?:www\.)?instagram\.com\/p\/([A-Za-z0-9_-]+)/i,
  TV: /https?:\/\/(?:www\.)?instagram\.com\/tv\/([A-Za-z0-9_-]+)/i,
  SHARE: /https?:\/\/(?:www\.)?instagram\.com\/share\/(?:reel|p)\/([A-Za-z0-9_-]+)/i,
  GENERAL: /https?:\/\/(?:www\.)?instagram\.com\/(?:reel|reels|p|tv|share\/(?:reel|p))\/([A-Za-z0-9_-]+)/i,
};

export const ERROR_MESSAGES = {
  INVALID_URL: 'Lütfen geçerli bir Reels veya video bağlantısı girin.',
  EMPTY_URL: 'Bağlantı alanı boş bırakılamaz.',
  FETCH_FAILED: 'Video bilgileri alınamadı. Lütfen bağlantıyı kontrol edip tekrar deneyin.',
  DOWNLOAD_FAILED: 'Video indirilemedi. Lütfen bağlantınızı kontrol edin.',
  PRIVATE_ACCOUNT: 'Bu video gizli bir hesaba ait olabilir veya silinmiş olabilir.',
  NETWORK_ERROR: 'İnternet bağlantınızı kontrol edin.',
  CLIPBOARD_PERMISSION: 'Pano okuma izni verilmedi veya panoda geçerli bağlantı yok.',
};

export function parseInstagramUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();

  const match = trimmed.match(INSTAGRAM_PATTERNS.GENERAL);
  if (!match) return null;

  const shortcode = match[1];
  let type = 'reel';

  if (INSTAGRAM_PATTERNS.REEL.test(trimmed)) {
    type = 'reel';
  } else if (INSTAGRAM_PATTERNS.POST.test(trimmed)) {
    type = 'post';
  } else if (INSTAGRAM_PATTERNS.TV.test(trimmed)) {
    type = 'tv';
  }

  return {
    type,
    shortcode,
    cleanUrl: `https://www.instagram.com/reel/${shortcode}/`,
  };
}
