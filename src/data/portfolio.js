export const EMAIL = 'iletisim@yunovax.com.tr';
export const WHATSAPP = '905068638306';
export const WHATSAPP_LABEL = '0506 863 83 06';

/*
 * Project fields:
 *  image          – screenshot in /public/projects (optional)
 *  robloxPlaceId  – live visits / players are fetched from /api/stats
 *  playStoreId    – live install count is fetched from /api/stats
 *  stats          – manual numbers shown as-is, e.g. [{ value: '500+', label: { tr: 'oyun', en: 'games' } }]
 */
export const PROJECTS = [
  {
    id: 'muzikors',
    title: 'Muzikors',
    kind: { tr: 'Kafe & restoran · Sosyal jukebox', en: 'Cafés & restaurants · Social jukebox' },
    description: {
      tr: 'Kafe, bar ve restoranlar için interaktif müzik kutusu. Misafirler masadaki karekodu okutup uygulama indirmeden şarkı istiyor ve sıradakilere oy veriyor; mekân sahibi de panelden neyin çalacağını kontrol ediyor.',
      en: 'An interactive jukebox for cafés, bars and restaurants. Guests scan the QR code on their table to request songs and vote on what plays next, no app needed, while the venue keeps control from its own panel.',
    },
    href: 'https://muzikors.com.tr',
    linkLabel: 'muzikors.com.tr',
    external: true,
    image: '/projects/muzikors.webp',
  },
  {
    id: 'yxclean',
    title: 'YX Clean',
    kind: { tr: 'Android uygulaması', en: 'Android app' },
    description: {
      tr: 'Galerini kaydırarak temizle: sola sil, sağa tut, telefonda yer aç.',
      en: 'Clean your gallery by swiping: left to delete, right to keep, free up space.',
    },
    playStoreId: 'yxclean.apk',
    href: 'https://play.google.com/store/apps/details?id=yxclean.apk',
    linkLabel: 'Google Play',
    external: true,
    image: '/projects/yxclean.png',
  },
  {
    id: 'jumpup',
    title: 'Jump Up',
    kind: { tr: 'Android oyunu', en: 'Android game' },
    description: {
      tr: 'Dokun, zıpla, durmadan tırman. Refleks ve zamanlamaya dayalı mobil oyun.',
      en: 'Tap, jump, climb forever. A reflex-and-timing mobile game.',
    },
    playStoreId: 'com.jumpup.up',
    href: 'https://play.google.com/store/apps/details?id=com.jumpup.up',
    linkLabel: 'Google Play',
    external: true,
    image: '/projects/jumpup.png',
  },
  {
    id: 'drainingalake',
    title: 'Draining a Lake',
    kind: { tr: 'Android oyunu', en: 'Android game' },
    description: {
      tr: 'Gölü kaşık kaşık boşalt, dibinde saklananları keşfet.',
      en: 'Drain the lake spoon by spoon and uncover what hides at the bottom.',
    },
    href: 'https://play.google.com/apps/testing/com.drainingalake.game',
    linkLabel: 'Google Play',
    external: true,
    testing: true,
    image: '/projects/drainingalake.png',
  },
  {
    id: 'thepier',
    title: 'The Pier',
    kind: { tr: 'Roblox · Psikolojik korku', en: 'Roblox · Psychological horror' },
    description: {
      tr: 'Sisle kaplı bir okyanusun ortasında, nereye uzandığı bilinmeyen bir iskelede geçen atmosferik deneyim.',
      en: 'An atmospheric experience set on a pier that stretches into a fog-covered ocean, leading who knows where.',
    },
    href: 'https://www.roblox.com/games/104035534286177/The-Pier',
    linkLabel: 'Roblox',
    external: true,
    inProgress: true,
    hasLore: true,
    robloxPlaceId: '104035534286177',
  },
  {
    id: 'yxshot',
    title: 'YX Shot',
    kind: { tr: 'Web & mobil araç', en: 'Web & mobile tool' },
    description: {
      tr: 'Reels ve kısa videoları filigransız, yüksek çözünürlükte tek dokunuşla indiren araç.',
      en: 'A one-tap tool that downloads Reels and short videos in high resolution, without watermarks.',
    },
    href: '/yxshot',
    linkLabel: 'yunovax.com/yxshot',
    internal: true,
    image: '/projects/yxshot.png',
  },
  {
    id: 'yxgames',
    title: 'YX Games',
    kind: { tr: 'Web oyun platformu', en: 'Web game platform' },
    description: {
      tr: 'Yüzlerce HTML5 oyununu tek çatı altında toplayan, tarayıcıdan ücretsiz oynanan oyun platformu.',
      en: 'A free browser game platform that gathers hundreds of HTML5 games under one roof.',
    },
    href: 'https://yxgames.site',
    linkLabel: 'yxgames.site',
    external: true,
    image: '/projects/yxgames.png',
  },
];

export const CAPABILITIES = [
  { label: { tr: 'Tasarım', en: 'Design' }, items: { tr: 'Figma, Photoshop, fotoğrafçılık, video kurgu', en: 'Figma, Photoshop, photography, video editing' } },
  { label: { tr: 'Ürün', en: 'Product' }, items: 'FlutterFlow, Supabase, Vercel' },
  { label: { tr: 'Oyun', en: 'Games' }, items: { tr: 'Lua, oyun mekanikleri, ses tasarımı', en: 'Lua, game mechanics, sound design' } },
  { label: { tr: 'Araçlar', en: 'Tools' }, items: { tr: 'VS Code, Blender, üretken yapay zekâ akışları', en: 'VS Code, Blender, generative AI workflows' } },
];

export const SPOTIFY_ARTIST_ID = '6P3mJteUET8bvp876ri6Ox';

/*
 * Photo gallery: put images in /public/gallery and list them here.
 * The section stays hidden while this list is empty.
 * Example: { src: '/gallery/01.jpg', alt: { tr: 'Gün batımı', en: 'Sunset' } }
 */
export const GALLERY = [];

export const VSCO_URL = 'https://vsco.co/yunovax/gallery';

export const SOCIALS = [
  { name: 'Instagram', url: 'https://www.instagram.com/yunovax/' },
  { name: 'YouTube', url: 'https://www.youtube.com/@yunovax' },
  { name: 'Spotify', url: 'https://open.spotify.com/intl-tr/artist/6P3mJteUET8bvp876ri6Ox' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/yunus-emre-gedik-176a9331a' },
  { name: 'Threads', url: 'https://www.threads.net/@yunovax' },
  { name: 'VSCO', url: VSCO_URL },
  { name: 'Pinterest', url: 'https://tr.pinterest.com/yunovax/' },
];

export const COMMUNITIES = [
  { name: { tr: 'Discord sunucusu', en: 'Discord server' }, url: 'https://discord.com/invite/Bgpnjzx2bc' },
  { name: { tr: 'Roblox grubu', en: 'Roblox group' }, url: 'https://www.roblox.com/communities/3958018/yunovax#!/about' },
];
