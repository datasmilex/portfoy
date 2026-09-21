import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check, Download, ArrowRight, Link as LinkIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { useYxShotStore } from '../../store/useYxShotStore';
import { parseInstagramUrl, ERROR_MESSAGES } from '../../lib/constants';
import { extractMedia } from '../../services/videoExtractor';
import { generateFileName } from '../../lib/utils';

// Exact SVG path of the Yunovax lightning bolt from /favicon.svg
const LIGHTNING_PATH =
  "M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z";

export default function LightningDownloadButton() {
  const {
    isLoading,
    setIsLoading,
    setActiveMedia,
    addToHistory,
    downloadProgress,
    setDownloadProgress,
  } = useYxShotStore();

  const [statusText, setStatusText] = useState('Tek Tıkla İndir');
  const [subText, setSubText] = useState('Panodaki son kopyalanan link otomatik algılanır ve indirilir');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualUrl, setManualUrl] = useState('');

  // Process video download from a valid URL
  const processAndDownload = async (targetUrl) => {
    setIsLoading(true);
    setIsSuccess(false);
    setStatusText('Video Çözümleniyor...');
    setSubText('Orijinal HD kaynak hazırlanıyor');
    setDownloadProgress(15);

    const toastId = toast.loading('Video bilgileri alınıyor...');

    try {
      // Step 1: Extract Video Media
      const result = await extractMedia(targetUrl);

      if (!result.success || !result.data || !result.data.videoUrl) {
        const errMsg = result.error || ERROR_MESSAGES.FETCH_FAILED;
        toast.error(errMsg, { id: toastId });
        setStatusText('Hata Oluştu');
        setSubText('Lütfen linki kontrol edip tekrar deneyin');
        setIsLoading(false);
        setDownloadProgress(0);
        return;
      }

      const media = result.data;
      setActiveMedia(media);
      addToHistory(media);

      // Step 2: Auto-Trigger Download
      setStatusText('Cihaza İndiriliyor...');
      setSubText('HD MP4 dosyası doğrudan indiriliyor');
      setDownloadProgress(50);
      toast.loading('Video cihazınıza indiriliyor...', { id: toastId });

      const filename = generateFileName(media.author?.username, media.shortcode);
      const streamProxyUrl = `/api/download?stream=${encodeURIComponent(media.videoUrl)}&filename=${encodeURIComponent(filename)}`;

      try {
        const response = await fetch(streamProxyUrl);
        if (response.ok) {
          setDownloadProgress(85);
          const blob = await response.blob();
          const blobUrl = window.URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = blobUrl;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(blobUrl);

          setDownloadProgress(100);
          setIsSuccess(true);
          setStatusText('İndirme Tamamlandı!');
          setSubText('Video başarıyla cihazınıza kaydedildi');
          toast.success('Video başarıyla indirildi!', { id: toastId });

          // Confetti celebration
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.7 },
              colors: ['#863bff', '#47bfff', '#ede6ff', '#ffffff'],
            });
          } catch (e) {}

          setTimeout(() => {
            setIsSuccess(false);
            setStatusText('Tek Tıkla İndir');
            setSubText('Panodaki son kopyalanan link otomatik algılanır ve indirilir');
            setDownloadProgress(0);
          }, 4500);
          return;
        }
        throw new Error('Proxy stream failed');
      } catch (streamErr) {
        // Fallback: Direct download trigger
        const directAnchor = document.createElement('a');
        directAnchor.href = streamProxyUrl;
        directAnchor.download = filename;
        directAnchor.target = '_blank';
        document.body.appendChild(directAnchor);
        directAnchor.click();
        document.body.removeChild(directAnchor);

        setDownloadProgress(100);
        setIsSuccess(true);
        setStatusText('İndirme Başlatıldı!');
        setSubText('Tarayıcınız indirmeyi sürdürüyor');
        toast.success('İndirme başlatıldı!', { id: toastId });

        setTimeout(() => {
          setIsSuccess(false);
          setStatusText('Tek Tıkla İndir');
          setSubText('Panodaki son kopyalanan link otomatik algılanır ve indirilir');
          setDownloadProgress(0);
        }, 4500);
      }
    } catch (err) {
      console.error(err);
      toast.error('İndirme sırasında bir sorun oluştu.', { id: toastId });
      setStatusText('Hata Oluştu');
      setSubText('Lütfen linki kontrol edin veya elle yapıştırın');
      setShowManualInput(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Primary 1-click clipboard handler
  const handleButtonClick = async () => {
    if (isLoading) return;

    // Check clipboard support
    if (!navigator.clipboard?.readText) {
      setShowManualInput(true);
      toast.info('Panoya otomatik erişilemedi. Lütfen linki yapıştırın.');
      return;
    }

    setStatusText('Pano Okunuyor...');
    setSubText('Son kopyalanan bağlantı kontrol ediliyor');

    try {
      const clipboardText = await navigator.clipboard.readText();
      const trimmed = (clipboardText || '').trim();

      if (!trimmed) {
        toast.error('Panoda herhangi bir kopyalanmış metin bulunamadı.');
        setStatusText('Pano Boş');
        setSubText('Lütfen önce bir Instagram/Reels linki kopyalayın');
        setShowManualInput(true);
        return;
      }

      const parsed = parseInstagramUrl(trimmed);
      if (!parsed) {
        toast.error('Panodaki son kopyalanan metin geçerli bir Reels/video linki değil.');
        setStatusText('Geçersiz Link');
        setSubText('Panoda video bağlantısı bulunamadı');
        setShowManualInput(true);
        setManualUrl(trimmed);
        return;
      }

      toast.success(`Bağlantı algılandı (${parsed.shortcode})! İndiriliyor...`);
      await processAndDownload(trimmed);
    } catch (err) {
      console.warn('Clipboard permission error:', err);
      toast.info('Panoya erişim izni verilmedi. Linki kutucuğa yapıştırabilirsiniz.');
      setShowManualInput(true);
      setStatusText('Tek Tıkla İndir');
      setSubText('Panodaki son kopyalanan link otomatik algılanır ve indirilir');
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualUrl.trim()) return;
    const parsed = parseInstagramUrl(manualUrl.trim());
    if (!parsed) {
      toast.error('Geçerli bir Instagram Reels veya video linki giriniz.');
      return;
    }
    processAndDownload(manualUrl.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto py-6 sm:py-10 select-none">
      {/* Centered Hero Lightning Button */}
      <div className="relative flex items-center justify-center">
        {/* Animated Radial Energy Glow */}
        <div
          className={`absolute inset-0 -m-12 rounded-full transition-opacity duration-700 pointer-events-none ${
            isLoading
              ? 'opacity-80 bg-gradient-to-tr from-purple-600/30 via-violet-500/20 to-cyan-500/20 blur-3xl scale-125 animate-pulse'
              : isSuccess
              ? 'opacity-80 bg-gradient-to-tr from-emerald-500/30 via-teal-500/20 to-cyan-500/20 blur-3xl scale-125'
              : isHovered
              ? 'opacity-60 bg-gradient-to-tr from-purple-600/25 via-violet-500/15 to-transparent blur-3xl scale-110'
              : 'opacity-20 bg-purple-600/15 blur-2xl'
          }`}
        />

        {/* The Clickable Lightning Button Container */}
        <motion.button
          onClick={handleButtonClick}
          disabled={isLoading}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="relative group p-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-3xl"
          aria-label="Tek tıkla panodan video indir"
          title="Tıkla ve panodaki videoyu hemen indir"
        >
          {/* Main SVG with Lightning Logo and Contoured Border Lines */}
          <svg
            viewBox="-10 -10 68 66"
            className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] overflow-visible transition-transform duration-300"
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9d4edd" />
                <stop offset="50%" stopColor="#863bff" />
                <stop offset="100%" stopColor="#5a189a" />
              </linearGradient>

              <linearGradient id="electricStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d8b4fe" />
                <stop offset="50%" stopColor="#863bff" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>

              <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="lightningGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Outermost Pulsing Contour Line (Dashed electric border) */}
            <motion.path
              d={LIGHTNING_PATH}
              fill="none"
              stroke={isSuccess ? '#34d399' : '#863bff'}
              strokeWidth="0.75"
              strokeDasharray="4 3"
              transform="scale(1.28) translate(-5.5, -5)"
              animate={{
                rotate: [0, 0],
                strokeOpacity: isLoading ? [0.3, 0.9, 0.3] : isHovered ? 0.7 : 0.25,
              }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            />

            {/* Middle Contour Border Line (Exact offset lightning shape border) */}
            <motion.path
              d={LIGHTNING_PATH}
              fill="none"
              stroke={isSuccess ? '#34d399' : 'url(#electricStroke)'}
              strokeWidth="1.2"
              transform="scale(1.14) translate(-2.7, -2.5)"
              animate={{
                strokeOpacity: isLoading ? [0.4, 1, 0.4] : isHovered ? 0.9 : 0.5,
              }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              filter="url(#lightningGlow)"
            />

            {/* Close-in Inner Contour Line */}
            <path
              d={LIGHTNING_PATH}
              fill="none"
              stroke={isSuccess ? '#a7f3d0' : '#ffffff'}
              strokeWidth="0.8"
              strokeOpacity={isHovered ? '0.85' : '0.4'}
              transform="scale(1.05) translate(-1, -0.9)"
            />

            {/* Core Yunovax Lightning Bolt Body */}
            <path
              d={LIGHTNING_PATH}
              fill={isSuccess ? 'url(#successGradient)' : 'url(#lightningGradient)'}
              stroke="#ffffff"
              strokeWidth="0.7"
              strokeOpacity={isHovered ? '0.9' : '0.6'}
              className="transition-all duration-300"
            />

            {/* Subtle Inner Highlight Spine */}
            <path
              d="M13 2H36L30 11H40L25 38V29H13L19 20H8L13 2Z"
              fill="#ffffff"
              fillOpacity={isHovered ? 0.22 : 0.12}
              className="pointer-events-none"
            />

            {/* Center Status Icon Overlay (Loader / Check / Download) */}
            {isLoading ? (
              <g transform="translate(14, 13)">
                <circle cx="10" cy="10" r="12" fill="#09090b" fillOpacity="0.85" />
                <path
                  d="M10 2 A8 8 0 0 1 18 10"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 10 10"
                    to="360 10 10"
                    dur="0.8s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            ) : isSuccess ? (
              <g transform="translate(14, 13)">
                <circle cx="10" cy="10" r="12" fill="#059669" />
                <path
                  d="M6 10 L9 13 L15 7"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            ) : null}
          </svg>
        </motion.button>
      </div>

      {/* Button Status & Description Text */}
      <div className="mt-4 text-center flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
          ) : isSuccess ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Download className="w-4 h-4 text-zinc-300" />
          )}
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {statusText}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-xs sm:max-w-sm text-balance">
          {subText}
        </p>

        {/* Progress Bar (when downloading) */}
        {isLoading && downloadProgress > 0 && (
          <div className="w-48 bg-zinc-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="bg-purple-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
        )}

        {/* Subtle Toggle for Manual Link Input Fallback */}
        <button
          type="button"
          onClick={() => setShowManualInput((prev) => !prev)}
          className="mt-3 text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-zinc-900"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          <span>{showManualInput ? 'Elle girişi gizle' : 'veya bağlantıyı elle yapıştırın'}</span>
        </button>
      </div>

      {/* Expandable Manual Input Bar (Fallback) */}
      <AnimatePresence>
        {showManualInput && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md mt-4 overflow-hidden"
          >
            <form onSubmit={handleManualSubmit} className="relative flex items-center p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 focus-within:border-zinc-500 shadow-sm">
              <input
                type="url"
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                placeholder="https://www.instagram.com/reel/..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder-zinc-500 px-3 py-2"
              />
              <button
                type="submit"
                disabled={isLoading || !manualUrl}
                className="px-3.5 py-2 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
              >
                <span>İndir</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
