import React from 'react';
import { History, Trash2, Play, Download, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useYxShotStore } from '../../store/useYxShotStore';

export default function HistoryList() {
  const { history, removeFromHistory, clearHistory, setActiveMedia } = useYxShotStore();

  if (history.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-12 px-4 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-gray-400">
          <History className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-white mb-1">Henüz İndirme Geçmişi Yok</h3>
        <p className="text-xs text-gray-400 max-w-sm mx-auto">
          İndirdiğiniz veya analiz ettiğiniz Reels ve videolar burada listelenecektir.
        </p>
      </div>
    );
  }

  const handleSelectMedia = (item) => {
    setActiveMedia(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.success('Geçmişteki video seçildi.');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header with clear button */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-pink-400" />
          <h3 className="font-bold text-sm sm:text-base text-white">
            İndirme Geçmişi ({history.length})
          </h3>
        </div>
        <button
          onClick={clearHistory}
          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-1 rounded-lg hover:bg-red-500/10 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Geçmişi Temizle</span>
        </button>
      </div>

      {/* Grid of history cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <AnimatePresence>
          {history.map((item, index) => (
            <motion.div
              key={item.shortcode || item.id || `hist-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/40 cursor-pointer transition-all hover:shadow-lg flex gap-3 relative backdrop-blur-xl"
              onClick={() => handleSelectMedia(item)}
            >
              {/* Thumbnail */}
              <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-black/80 shrink-0">
                {item.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                    No Thumb
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
                <div>
                  <span className="text-[11px] font-bold text-pink-400 block truncate">
                    @{item.author?.username || 'reels_user'}
                  </span>
                  <p className="text-xs font-medium text-gray-200 line-clamp-2 mt-0.5 leading-snug">
                    {item.title || 'Reels Videosu'}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectMedia(item);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-400 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Yeniden İndir</span>
                  </button>
                </div>
              </div>

              {/* Delete item button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromHistory(item.shortcode);
                }}
                className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-400 transition-colors"
                title="Geçmişten Kaldır"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
