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
    setDownloadProgress(20);

    const filename = generateFileName(media.author?.username, media.shortcode);
    const toastId = toast.loading('Video indiriliyor...');

    // Same-origin stream proxy URL to avoid browser CORS errors
    const streamProxyUrl = `/api/download?stream=${encodeURIComponent(media.videoUrl)}&filename=${encodeURIComponent(filename)}`;

    try {
      setDownloadProgress(50);

      // Attempt 1: Fetch via our internal serverless stream proxy
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
        toast.success('Video cihazınıza indirildi!', { id: toastId });

        // Trigger confetti celebration
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
        return;
      }
      throw new Error('Proxy stream error');
    } catch (err) {
      // Fallback: Direct download trigger without fetch CORS check
      try {
        const directAnchor = document.createElement('a');
        directAnchor.href = streamProxyUrl;
        directAnchor.download = filename;
        directAnchor.target = '_blank';
        document.body.appendChild(directAnchor);
        directAnchor.click();
        document.body.removeChild(directAnchor);

        setDownloadProgress(100);
        setIsSuccess(true);
        toast.success('Video indirmesi başlatıldı!', { id: toastId });

        setTimeout(() => {
          setIsSuccess(false);
          setDownloadProgress(0);
        }, 4000);
      } catch (fallbackErr) {
        window.open(media.videoUrl, '_blank');
        toast.success('Video yeni sekmede açıldı.', { id: toastId });
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
        <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-white h-full transition-all duration-300 rounded-full"
            style={{ width: `${downloadProgress}%` }}
          />
        </div>
      )}

      <div className="flex items-center gap-2.5">
        {/* Main HD Download Button */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`flex-1 py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-sm transition-colors cursor-pointer ${
            isSuccess
              ? 'bg-emerald-600 text-white'
              : 'bg-white hover:bg-zinc-200 text-zinc-950 active:scale-[0.99]'
          } disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-zinc-950" />
              <span>İndiriliyor (%{downloadProgress})</span>
            </>
          ) : isSuccess ? (
            <>
              <Check className="w-5 h-5 text-white" />
              <span>Cihaza İndirildi!</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5 text-zinc-950" />
              <span>HD Video İndir (.mp4)</span>
            </>
          )}
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="p-3.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          title="Videoyu Paylaş"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
