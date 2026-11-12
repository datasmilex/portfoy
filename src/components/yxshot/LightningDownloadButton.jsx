import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check, Download, ArrowRight, Link as LinkIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { useYxShotStore } from '../../store/useYxShotStore';
import { parseInstagramUrl, ERROR_MESSAGES } from '../../lib/constants';
import { extractMedia } from '../../services/videoExtractor';
import { generateFileName } from '../../lib/utils';

// Yunovax cube mark (same paths as src/components/Logo.jsx)
const CUBE = {
  top: 'M31.4 9.2a1.3 1.3 0 0 1 1.2 0L52.8 21 32 33 11.2 21z',
  left: 'M9.4 24 30.7 36.3V57L10 45a1.3 1.3 0 0 1-.6-1.1z',
  right: 'M54.6 24 33.3 36.3V57L54 45a1.3 1.3 0 0 0 .6-1.1z',
};

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
              colors: ['#ece7df', '#c9c3b9', '#8f897f', '#ffffff'],
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
              ? 'opacity-70 bg-stone-200/15 blur-3xl scale-125 animate-pulse'
              : isSuccess
              ? 'opacity-80 bg-gradient-to-tr from-emerald-500/30 via-teal-500/20 to-cyan-500/20 blur-3xl scale-125'
              : isHovered
              ? 'opacity-60 bg-stone-200/10 blur-3xl scale-110'
              : 'opacity-20 bg-stone-200/10 blur-2xl'
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
          className="relative group p-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-300 rounded-3xl"
          aria-label="Tek tıkla panodan video indir"
          title="Tıkla ve panodaki videoyu hemen indir"
        >
          {/* Yunovax cube mark */}
          <svg
            viewBox="2 2 60 62"
            className="w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] overflow-visible"
          >
            <motion.g
              animate={{ y: isLoading ? [0, -1.5, 0] : 0 }}
              transition={{ repeat: isLoading ? Infinity : 0, duration: 1, ease: 'easeInOut' }}
            >
              <path d={CUBE.top} fill={isSuccess ? '#a7f3d0' : '#ece7df'} fillOpacity={isHovered || isLoading ? 1 : 0.92} className="transition-all duration-300" />
              <path d={CUBE.left} fill={isSuccess ? '#34d399' : '#c9c3b9'} fillOpacity={isHovered || isLoading ? 1 : 0.92} className="transition-all duration-300" />
              <path d={CUBE.right} fill={isSuccess ? '#059669' : '#8f897f'} fillOpacity={isHovered || isLoading ? 1 : 0.92} className="transition-all duration-300" />
            </motion.g>

            {isLoading ? (
              <g transform="translate(22, 30)">
                <circle cx="10" cy="10" r="12" fill="#09090b" fillOpacity="0.85" />
                <path d="M10 2 A8 8 0 0 1 18 10" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round">
                  <animateTransform attributeName="transform" type="rotate" from="0 10 10" to="360 10 10" dur="0.8s" repeatCount="indefinite" />
                </path>
              </g>
            ) : isSuccess ? (
              <g transform="translate(22, 30)">
                <circle cx="10" cy="10" r="12" fill="#059669" />
                <path d="M6 10 L9 13 L15 7" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ) : null}
          </svg>
        </motion.button>
      </div>

      {/* Button Status & Description Text */}
      <div className="mt-4 text-center flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-stone-300" />
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
              className="bg-stone-300 h-full transition-all duration-300 rounded-full"
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
