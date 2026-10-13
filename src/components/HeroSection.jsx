import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const rise = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function HeroSection() {
  return (
    <section
      id="top"
      className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-5xl flex-col justify-between px-5 pb-10 pt-[14svh] sm:px-8 sm:pt-[18svh]"
    >
      <div>
        <motion.p {...rise(0)} className="mb-7 text-sm text-mute">
          Yunovax — Tasarımcı & geliştirici
        </motion.p>

        <motion.h1
          {...rise(0.1)}
          className="max-w-[13ch] font-display md:max-w-[20ch] text-[clamp(2.9rem,12vw,6.25rem)] leading-[0.98] tracking-[-0.01em] text-paper"
        >
          Ürünler tasarlıyorum, <em className="text-paper-dim">dünyalar</em> kuruyorum.
        </motion.h1>

        <motion.p
          {...rise(0.22)}
          className="mt-8 max-w-[36ch] text-[17px] leading-relaxed text-mute sm:text-lg"
        >
          Web ve mobilde kullanıcı odaklı dijital ürünler geliştiriyor, Roblox üzerinde hikâyesi
          olan psikolojik deneyimler kurguluyorum.
        </motion.p>

        <motion.div {...rise(0.34)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href="#isler"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-paper px-6 text-[15px] font-medium text-ink transition-colors hover:bg-white"
          >
            İşlere göz at
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" strokeWidth={1.75} />
          </a>
          <a
            href="#iletisim"
            className="text-[15px] text-paper-dim underline decoration-line-strong underline-offset-[6px] transition-colors hover:text-paper hover:decoration-paper/60"
          >
            Birlikte çalışalım
          </a>
        </motion.div>
      </div>

      <motion.p {...rise(0.5)} className="mt-16 flex items-center gap-3 text-sm text-mute">
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        <span>
          Şu sıralar <span className="text-paper-dim">The Pier</span> üzerinde çalışıyorum.
        </span>
      </motion.p>
    </section>
  );
}
