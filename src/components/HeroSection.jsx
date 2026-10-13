import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const EASE = [0.16, 1, 0.3, 1];

const NAME = [
  { word: 'Yunus' },
  { word: 'Emre' },
  { word: 'Gedik', italic: true },
];

const rise = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: EASE },
});

export default function HeroSection() {
  return (
    <section
      id="top"
      className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-5xl flex-col justify-between px-5 pb-7 pt-[6svh] sm:px-8 sm:pt-[14svh]"
    >
      <div>
        <motion.p {...rise(0)} className="text-sm text-mute">
          UI/UX tasarımcı · Geliştirici
        </motion.p>

        <h1 className="mt-5 font-display text-[clamp(5rem,29vw,9rem)] leading-[0.86] tracking-[-0.025em] text-paper md:whitespace-nowrap md:text-[clamp(6rem,10.4vw,9.5rem)]">
          {NAME.map(({ word, italic }, i) => (
            <React.Fragment key={word}>
              <span className={`block overflow-hidden pb-[0.04em] md:inline-block ${italic ? 'pr-[0.08em]' : ''}`}>
                <motion.span
                  className={`block ${italic ? 'italic text-paper-dim' : ''}`}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.2, delay: 0.12 + i * 0.1, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>{' '}
            </React.Fragment>
          ))}
        </h1>

        <motion.p
          {...rise(0.55)}
          className="mt-8 max-w-[36ch] text-[17px] leading-relaxed text-mute sm:text-lg"
        >
          Web ve mobilde kullanıcı odaklı dijital ürünler geliştiriyor, Roblox üzerinde hikâyesi
          olan psikolojik deneyimler kurguluyorum.
        </motion.p>

        <motion.div {...rise(0.65)} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
          <a
            href="#isler"
            className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-paper pl-6 pr-5 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-white"
          >
            İşlere göz at
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={1.75} />
          </a>
          <a
            href="#iletisim"
            className="text-[15px] text-paper-dim underline decoration-line-strong underline-offset-[6px] transition-colors duration-300 hover:text-paper hover:decoration-paper/60"
          >
            Birlikte çalışalım
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.85 }}
        className="mt-12 border-t border-line pt-5"
      >
        <p className="text-sm leading-relaxed text-mute">
          Şu sıralar{' '}
          <a href="#muzikors" className="text-paper-dim transition-colors hover:text-paper">
            Muzikors
          </a>{' '}
          ve{' '}
          <a href="#thepier" className="text-paper-dim transition-colors hover:text-paper">
            The Pier
          </a>{' '}
          üzerinde çalışıyorum.
        </p>
      </motion.div>
    </section>
  );
}
