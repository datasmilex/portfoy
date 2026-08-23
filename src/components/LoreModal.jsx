import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Skull, RotateCcw } from 'lucide-react';

const LORE_TEXT = `Sisle kaplı sonsuz bir okyanusun ortasında, nereye uzandığı bilinmeyen ahşap bir iskele...

"The Pier: Endless Depths", oyuncuyu yalnızlığın, fısıltıların ve zamanın durduğu bir hafıza denizinin içine fırlatır. Her adımda sis biraz daha yoğunlaşır, deniz dalgaları geçmişin yankılarını kıyıya vurur.

Burada amaç sadece ilerlemek değil; kendi zihninizin karanlığıyla yüzleşmektir. Fenerin cılız ışığı sönmeye başladığında, dalgaların altından seslenen şey sizden ne istiyor?

"Derinlikler sadece suyu temsil etmez. Derinlik, kaçtığın gerçektir."`;

export default function LoreModal({ isOpen, onClose }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const typewriterTimerRef = useRef(null);

  const startTypewriter = () => {
    if (typewriterTimerRef.current) {
      clearInterval(typewriterTimerRef.current);
    }

    setDisplayedText('');
    setIsTypingComplete(false);

    let index = 0;
    typewriterTimerRef.current = setInterval(() => {
      if (index < LORE_TEXT.length) {
        setDisplayedText(LORE_TEXT.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        if (typewriterTimerRef.current) {
          clearInterval(typewriterTimerRef.current);
        }
      }
    }, 28);
  };

  useEffect(() => {
    if (!isOpen) {
      if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
      setDisplayedText('');
      setIsTypingComplete(false);
      return;
    }

    startTypewriter();

    return () => {
      if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
    };
  }, [isOpen]);

  const handleReplay = () => {
    startTypewriter();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-[95vw] sm:w-full max-w-3xl max-h-[85vh] sm:max-h-[90vh] bg-[#050505] rounded-none border border-white/20 overflow-hidden shadow-2xl p-5 sm:p-8 flex flex-col justify-between"
        >
          {/* Top Bar Controls */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-none bg-[#111] border border-white/20 flex items-center justify-center text-white shrink-0">
                <Skull className="w-4 h-4" />
              </div>
              <div className="truncate">
                <h3 className="text-base sm:text-xl font-bold text-white tracking-wide truncate">The Pier: Endless Depths</h3>
                <span className="text-[11px] sm:text-xs font-mono text-gray-400 block truncate">Cinematic Lore</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Typewriter Text Box */}
          <div className="flex-1 overflow-y-auto min-h-[180px] bg-[#0A0A0A] rounded-none border border-white/10 p-5 sm:p-7 font-serif text-slate-200 text-sm sm:text-lg leading-relaxed whitespace-pre-line shadow-inner">
            {displayedText}
            {!isTypingComplete && <span className="inline-block w-2 h-5 bg-white ml-1 animate-pulse" />}
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 shrink-0">
            <span className="text-xs font-mono text-slate-400">
              Kurgu & Hikaye: Yunus Emre Gedik
            </span>

            <button
              onClick={handleReplay}
              className="flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Yeniden Oynat</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
