import React, { useState } from 'react';
import { Info, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ onBackToPortfolio }) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-zinc-950/85 border-b border-zinc-800/80 transition-all">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Left: Back to Portfolio & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortfolio}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition-colors group cursor-pointer"
            title="Yunovax Portföy'e Geri Dön"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Portföy</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center p-1.5">
              <img src="/favicon.svg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">
                YX Shot
              </span>
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
                HD
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions: Info modal */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsInfoOpen(true)}
            className="p-2 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Uygulama Hakkında"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {isInfoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-6 shadow-2xl relative"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">YX Shot Hakkında</h3>
                  <p className="text-xs text-zinc-400 font-mono">Reels & Video İndirme Aracı</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-zinc-300 leading-relaxed">
                <p>
                  YX Shot, sosyal medya Reels ve video içeriklerini filigransız, yüksek kalitede (HD 1080p) cihazınıza doğrudan indirmenizi sağlayan modern ve reklamsız bir araçtır.
                </p>
                <div className="p-3.5 rounded-lg bg-zinc-900/70 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-zinc-200 font-medium text-xs">
                    <Zap className="w-4 h-4 shrink-0 text-zinc-400" />
                    <span>Öne Çıkan Özellikler</span>
                  </div>
                  <ul className="text-xs text-zinc-400 list-disc list-inside space-y-1">
                    <li>Tek tıkla panodan otomatik link algılama</li>
                    <li>Orijinal CDN üzerinden hızlı ve doğrudan indirme</li>
                    <li>Cihaz üzerinde yerel geçmiş yönetimi</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setIsInfoOpen(false)}
                className="w-full mt-6 py-2.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                Anladım
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
