import React, { useState, useEffect, useTransition } from 'react';
import { Clipboard, ArrowRight, Loader2, Sparkles, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useYxShotStore } from '../../store/useYxShotStore';
import { parseInstagramUrl, ERROR_MESSAGES } from '../../lib/constants';
import { extractMedia } from '../../services/videoExtractor';

export default function LinkInput() {
  const [inputUrl, setInputUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [parsedUrl, setParsedUrl] = useState(null);
  const [, startTransition] = useTransition();

  const { isLoading, setIsLoading, setActiveMedia, addToHistory } = useYxShotStore();

  useEffect(() => {
    if (!inputUrl) {
      setParsedUrl(null);
      setErrorMessage(null);
      return;
    }
    const parsed = parseInstagramUrl(inputUrl);
    setParsedUrl(parsed);
    if (parsed) {
      setErrorMessage(null);
    }
  }, [inputUrl]);

  const handlePaste = async () => {
    try {
      if (!navigator.clipboard?.readText) {
        toast.error('Tarayıcınız pano erişimini desteklemiyor.');
        return;
      }
      const text = await navigator.clipboard.readText();
      if (!text || text.trim() === '') {
        toast.error('Panoda herhangi bir metin bulunamadı.');
        return;
      }
      const trimmed = text.trim();
      setInputUrl(trimmed);

      const parsed = parseInstagramUrl(trimmed);
      if (parsed) {
        toast.success('Geçerli video linki yapıştırıldı!');
        fetchMedia(trimmed);
      } else {
        toast.error('Panodaki metin geçerli bir Reels/video linki değil.');
      }
    } catch (err) {
      toast.error('Panoya erişim izni verilmedi.');
    }
  };

  const handleNativePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText) {
      const trimmed = pastedText.trim();
      if (parseInstagramUrl(trimmed)) {
        setTimeout(() => {
          fetchMedia(trimmed);
        }, 100);
      }
    }
  };

  const fetchMedia = async (urlToFetch) => {
    const targetUrl = urlToFetch || inputUrl;
    if (!targetUrl || targetUrl.trim() === '') {
      setErrorMessage(ERROR_MESSAGES.EMPTY_URL);
      toast.error(ERROR_MESSAGES.EMPTY_URL);
      return;
    }

    const parsed = parseInstagramUrl(targetUrl);
    if (!parsed) {
      setErrorMessage(ERROR_MESSAGES.INVALID_URL);
      toast.error(ERROR_MESSAGES.INVALID_URL);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const toastId = toast.loading('Video bilgileri alınıyor...');

    try {
      const result = await extractMedia(targetUrl);

      if (!result.success || !result.data) {
        const errorMsg = result.error || ERROR_MESSAGES.FETCH_FAILED;
        setErrorMessage(errorMsg);
        toast.error(errorMsg, { id: toastId });
        return;
      }

      startTransition(() => {
        setActiveMedia(result.data);
        addToHistory(result.data);
      });

      toast.success('Video başarıyla getirildi!', { id: toastId });
    } catch (err) {
      setErrorMessage(ERROR_MESSAGES.FETCH_FAILED);
      toast.error(ERROR_MESSAGES.FETCH_FAILED, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMedia();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 focus-within:border-zinc-500 focus-within:ring-1 focus-within:ring-zinc-500 shadow-sm transition-colors">
          
          <div className="pl-3 pr-2 flex items-center justify-center">
            <img src="/favicon.svg" alt="Yunovax" className="w-5 h-5 object-contain" />
          </div>

          <input
            type="url"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onPaste={handleNativePaste}
            placeholder="Reels veya video linkini yapıştırın..."
            disabled={isLoading}
            className="flex-1 bg-transparent border-none outline-none text-sm sm:text-base text-white placeholder-zinc-500 disabled:opacity-50 py-2.5 px-1"
          />

          {inputUrl && (
            <button
              type="button"
              onClick={() => {
                setInputUrl('');
                setErrorMessage(null);
              }}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors mr-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={handlePaste}
            disabled={isLoading}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-xs font-mono text-zinc-300 hover:text-white border border-zinc-700 transition-colors mr-2 cursor-pointer"
          >
            <Clipboard className="w-3.5 h-3.5" />
            <span>Yapıştır</span>
          </button>

          <button
            type="submit"
            disabled={isLoading || !inputUrl}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs sm:text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                <span className="hidden sm:inline">İşleniyor</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Videoyu Getir</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Live Regex Format Detector Badge */}
        <AnimatePresence mode="wait">
          {errorMessage ? (
            <motion.div
              key="badge-error-msg"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-2.5 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          ) : parsedUrl ? (
            <motion.div
              key="badge-valid-url"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mt-2.5 flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium w-fit"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                Geçerli {parsedUrl.type === 'reel' ? 'Reels' : 'Video'} Bağlantısı Algılandı ({parsedUrl.shortcode})
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </form>
    </div>
  );
}
