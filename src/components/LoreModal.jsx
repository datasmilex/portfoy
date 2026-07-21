import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Sparkles, Skull, RotateCcw } from 'lucide-react';

const LORE_TEXT = `Sisle kaplı sonsuz bir okyanusun ortasında, nereye uzandığı bilinmeyen ahşap bir iskele...

"The Pier: Endless Depths", oyuncuyu yalnızlığın, fısıltıların ve zamanın durduğu bir hafıza denizinin içine fırlatır. Her adımda sis biraz daha yoğunlaşır, deniz dalgaları geçmişin yankılarını kıyıya vurur.

Burada amaç sadece ilerlemek değil; kendi zihninizin karanlığıyla yüzleşmektir. Fenerin cılız ışığı sönmeye başladığında, dalgaların altından seslenen şey sizden ne istiyor?

"Derinlikler sadece suyu temsil etmez. Derinlik, kaçtığın gerçektir."`;

export default function LoreModal({ isOpen, onClose }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const typewriterTimerRef = useRef(null);

  const audioCtxRef = useRef(null);
  const osc1Ref = useRef(null);
  const osc2Ref = useRef(null);
  const gainNodeRef = useRef(null);

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
      stopAudio();
      return;
    }

    startTypewriter();
    startAudio();

    return () => {
      if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
    };
  }, [isOpen]);

  const handleReplay = () => {
    startTypewriter();
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const startAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      let ctx = audioCtxRef.current;
      
      if (!ctx || ctx.state === 'closed') {
        ctx = new AudioContext();
        audioCtxRef.current = ctx;
      }

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (osc1Ref.current) try { osc1Ref.current.stop(); } catch (e) {}
      if (osc2Ref.current) try { osc2Ref.current.stop(); } catch (e) {}

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2);
      gainNodeRef.current = gain;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, ctx.currentTime);

      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(65.41, ctx.currentTime);

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(98.0, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;

      setIsPlayingAudio(true);
    } catch (e) {
      console.warn('Web Audio API play error:', e);
    }
  };

  const stopAudio = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6);
        setTimeout(() => {
          if (osc1Ref.current) { try { osc1Ref.current.stop(); } catch (e) {} }
          if (osc2Ref.current) { try { osc2Ref.current.stop(); } catch (e) {} }
          if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close();
          }
          audioCtxRef.current = null;
        }, 600);
      } catch (e) {
        // ignore
      }
    }
    setIsPlayingAudio(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-[95vw] sm:w-full max-w-3xl max-h-[85vh] sm:max-h-[90vh] glass-panel rounded-3xl border border-violet-500/30 overflow-hidden shadow-2xl shadow-violet-950/80 p-5 sm:p-8 flex flex-col justify-between"
        >
          {/* Top Bar Controls */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 shrink-0">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-violet-950/90 border border-violet-500/50 flex items-center justify-center text-violet-400 shrink-0">
                <Skull className="w-4 h-4" />
              </div>
              <div className="truncate">
                <h3 className="text-base sm:text-xl font-bold text-white tracking-wide truncate">The Pier: Endless Depths</h3>
                <span className="text-[11px] sm:text-xs font-mono text-violet-400 block truncate">Cinematic Lore</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Ambient Audio Toggle */}
              <button
                onClick={toggleAudio}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-violet-900/60 border-violet-400 text-cyan-300 animate-pulse'
                    : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                    <span className="hidden sm:inline">Ambiyans Ses: AÇIK</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4" />
                    <span className="hidden sm:inline">Ambiyans Ses: KAPALI</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  stopAudio();
                  onClose();
                }}
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Typewriter Text Box */}
          <div className="flex-1 overflow-y-auto min-h-[180px] bg-slate-950/80 rounded-2xl border border-violet-900/30 p-5 sm:p-7 font-serif text-slate-200 text-sm sm:text-lg leading-relaxed whitespace-pre-line shadow-inner">
            {displayedText}
            {!isTypingComplete && <span className="inline-block w-2 h-5 bg-violet-400 ml-1 animate-pulse" />}
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 shrink-0">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              Kurgu: Yunus Emre Gedik
            </span>

            <button
              onClick={handleReplay}
              className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Yeniden Oynat
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
