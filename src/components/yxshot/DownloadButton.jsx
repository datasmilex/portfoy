import React, { useState } from 'react';
import { Download, Share2, Check, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';
import { generateFileName } from '../../lib/utils';
import { useYxShotStore } from '../../store/useYxShotStore';

export default function DownloadButton({ media }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { downloadProgress, setDownloadProgress } = useYxShotStore();

  const handleDownload = async () => {
    if (!media || !media.videoUrl) {
      toast.error('İndirilecek video bağlantısı bulunamadı.');
      return;
    }

    setIsDownloading(true);
    setIsSuccess(false);
    setDownloadProgress(15);

    const filename = generateFileName(media.author?.username, media.shortcode);
    const toastId = toast.loading('Video indiriliyor...');

    try {
      setDownloadProgress(45);
      
      // Try blob download for direct file saving
      const response = await fetch(media.videoUrl);
      if (!response.ok) throw new Error('Video çekilemedi');

      setDownloadProgress(80);
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
      toast.success('Video başarıyla indirildi!', { id: toastId });

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#ec4899', '#f43f5e', '#f59e0b', '#8b5cf6'],
        });
      } catch (e) {}

      setTimeout(() => {
        setIsSuccess(false);
        setDownloadProgress(0);
      }, 4000);
    } catch (err) {
      // Fallback: Direct window open if CORS blocks blob fetch
      try {
        window.open(media.videoUrl, '_blank');
        toast.success('Video yeni sekmede açıldı, oradan kaydedebilirsiniz.', { id: toastId });
      } catch (e) {
        toast.error('İndirme başarısız oldu. Lütfen tekrar deneyin.', { id: toastId });
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!media) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: media.title || 'Reels Videosu',
          text: `YX Shot ile indirildi: ${media.title || ''}`,
          url: media.videoUrl || window.location.href,
        });
        toast.success('Paylaşıldı!');
      } catch (e) {}
    } else {
      try {
        await navigator.clipboard.writeText(media.videoUrl || window.location.href);
        toast.success('Video bağlantısı panoya kopyalandı!');
      } catch (e) {
        toast.error('Paylaşım desteklenmiyor.');
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Download Progress Bar */}
      {isDownloading && (
        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-pink-500 to-amber-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${downloadProgress}%` }}
          />
        </div>
      )}

      <div className="flex items-center gap-2.5">
        {/* Main HD Download Button */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl transition-all cursor-pointer ${
            isSuccess
              ? 'bg-emerald-600 text-white shadow-emerald-500/25'
              : 'bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:via-rose-500 hover:to-amber-500 text-white shadow-pink-500/25 active:scale-[0.98]'
          } disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>İndiriliyor (%{downloadProgress})</span>
            </>
          ) : isSuccess ? (
            <>
              <Check className="w-5 h-5" />
              <span>Cihaza İndirildi!</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>HD Video İndir (.mp4)</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </>
          )}
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all cursor-pointer"
          title="Videoyu Paylaş"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
