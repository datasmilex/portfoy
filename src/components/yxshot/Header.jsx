import React, { useState } from 'react';
import { Sparkles, Info, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ onBackToPortfolio }) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/60 border-b border-white/10 transition-all">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Left: Back to Portfolio & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortfolio}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-all group"
            title="Yunovax Portföy'e Geri Dön"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Portföy</span>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 p-[1.5px] shadow-lg shadow-pink-500/20">
              <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center p-1.5">
                <img src="/favicon.svg" alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300">
                  YX SHOT
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-pink-500/10 border border-pink-500/20 text-pink-400">
                  HD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Actions: Info modal */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsInfoOpen(true)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
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
              className="w-full max-w-md bg-[#0A0A0C] border border-white/20 rounded-2xl p-6 shadow-2xl relative"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">YX Shot Hakkında</h3>
                  <p className="text-xs text-gray-400 font-mono">Reels & Video İndirme Aracı</p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                <p>
                  YX Shot, sosyal medya Reels ve video içeriklerini filigransız, en yüksek kalitede (HD 1080p) cihazınıza doğrudan indirmenizi sağlayan modern ve reklamsız bir araçtır.
                </p>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-pink-400 font-medium">
                    <Zap className="w-4 h-4 shrink-0" />
                    <span>Öne Çıkan Özellikler</span>
                  </div>
                  <ul className="text-xs text-gray-400 list-disc list-inside space-y-1">
                    <li>Tek tıkla panodan otomatik link algılama</li>
                    <li>Orijinal CDN üzerinden hızlı ve doğrudan indirme</li>
                    <li>İndirme geçmişi yönetimi</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setIsInfoOpen(false)}
                className="w-full mt-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-medium text-xs transition-all"
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
