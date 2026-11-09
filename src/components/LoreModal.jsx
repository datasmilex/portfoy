import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, RotateCcw } from 'lucide-react';
import { useLang } from '../i18n';

const LORE = {
  tr: `Sisle kaplı sonsuz bir okyanusun ortasında, nereye uzandığı bilinmeyen ahşap bir iskele...

"The Pier: Endless Depths", oyuncuyu yalnızlığın, fısıltıların ve zamanın durduğu bir hafıza denizinin içine fırlatır. Her adımda sis biraz daha yoğunlaşır, deniz dalgaları geçmişin yankılarını kıyıya vurur.

Burada amaç sadece ilerlemek değil; kendi zihninizin karanlığıyla yüzleşmektir. Fenerin cılız ışığı sönmeye başladığında, dalgaların altından seslenen şey sizden ne istiyor?

"Derinlikler sadece suyu temsil etmez. Derinlik, kaçtığın gerçektir."`,
  en: `In the middle of an endless, fog-covered ocean, a wooden pier stretching who knows where...

"The Pier: Endless Depths" throws the player into a sea of memory where loneliness, whispers and stillness reign. With every step the fog grows thicker, and the waves wash the echoes of the past ashore.

The goal here is not just to move forward; it is to face the darkness of your own mind. When the lantern's faint light begins to fade, what does the thing calling from beneath the waves want from you?

"The depths are not just the water. The depth is the truth you are running from."`,
};

const UI = {
  tr: { label: 'The Pier · Hikâye', close: 'Kapat', credit: 'Kurgu: Yunus Emre Gedik', replay: 'Baştan oku', skip: 'Tamamını göster' },
  en: { label: 'The Pier · Story', close: 'Close', credit: 'Story: Yunus Emre Gedik', replay: 'Read again', skip: 'Show all' },
};

const TYPE_SPEED_MS = 24;

function LoreReader({ onClose, lang }) {
  const LORE_TEXT = LORE[lang];
  const ui = UI[lang];
  const reduceMotion = useReducedMotion();
  const [length, setLength] = useState(reduceMotion ? LORE_TEXT.length : 0);
  const timerRef = useRef(null);
  const closeRef = useRef(null);
  const isComplete = length >= LORE_TEXT.length;

  const stop = () => clearInterval(timerRef.current);

  const start = useCallback(() => {
    stop();
    setLength(0);
    timerRef.current = setInterval(() => {
      setLength((n) => {
        if (n + 1 >= LORE_TEXT.length) stop();
        return n + 1;
      });
    }, TYPE_SPEED_MS);
  }, [LORE_TEXT.length]);

  useEffect(() => {
    if (!reduceMotion) start();
    return stop;
  }, [reduceMotion, start]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const skip = () => {
    if (isComplete) return;
    stop();
    setLength(LORE_TEXT.length);
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lore-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-ink/[0.97] backdrop-blur-sm"
    >
      <div className="mx-auto flex min-h-full max-w-2xl flex-col px-5 pb-10 pt-5 sm:px-8 sm:pt-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-mute">{ui.label}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={ui.close}
            className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-paper-dim transition-colors hover:bg-ink-raised hover:text-paper"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-1 flex-col justify-center py-10"
        >
          <h2 id="lore-title" className="font-display text-[2.6rem] leading-none text-paper sm:text-6xl">
            Endless <em className="text-paper-dim">Depths</em>
          </h2>

          <div
            onClick={skip}
            className="mt-10 min-h-[22rem] whitespace-pre-line font-display text-[1.3rem] leading-[1.55] text-paper-dim sm:text-2xl"
          >
            <span className="sr-only">{LORE_TEXT}</span>
            <span aria-hidden="true">
              {LORE_TEXT.slice(0, length)}
              {!isComplete && <span className="ml-0.5 inline-block h-[1.1em] w-px translate-y-[0.15em] bg-paper" />}
            </span>
          </div>
        </motion.div>

        <div className="flex items-center justify-between border-t border-line pt-5 text-sm text-faint">
          <span>{ui.credit}</span>
          {isComplete ? (
            <button
              type="button"
              onClick={start}
              className="-mr-2 inline-flex h-11 cursor-pointer items-center gap-2 px-2 text-mute transition-colors hover:text-paper"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.75} />
              {ui.replay}
            </button>
          ) : (
            <button
              type="button"
              onClick={skip}
              className="-mr-2 inline-flex h-11 cursor-pointer items-center px-2 text-mute transition-colors hover:text-paper"
            >
              {ui.skip}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function LoreModal({ isOpen, onClose }) {
  const { lang } = useLang();
  return (
    <AnimatePresence>{isOpen && <LoreReader key={lang} lang={lang === 'en' ? 'en' : 'tr'} onClose={onClose} />}</AnimatePresence>
  );
}
