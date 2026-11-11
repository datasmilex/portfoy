import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLang } from '../i18n';

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
  const { t } = useLang();
  return (
    <section
      id="top"
      className="mx-auto max-w-5xl px-5 pb-8 pt-12 sm:px-8 sm:pt-24"
    >
      <div>
        <motion.p {...rise(0)} className="text-sm text-mute">
          {t({ tr: 'UI/UX tasarımcı · Geliştirici', en: 'UI/UX designer · Developer' })}
        </motion.p>

        <h1 className="mt-5 font-display text-[clamp(3rem,15vw,7rem)] leading-[0.86] tracking-[-0.025em] text-paper md:whitespace-nowrap md:text-[clamp(5rem,9vw,8rem)]">
          {NAME.map(({ word, italic }, i) => (
            <React.Fragment key={word}>
              <span className={`inline-block overflow-hidden pb-[0.04em] ${italic ? 'pr-[0.08em]' : ''}`}>
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
          {t({
            tr: 'Web ve mobilde kullanıcı odaklı dijital ürünler geliştiriyor, Roblox üzerinde hikâyesi olan psikolojik deneyimler kurguluyorum.',
            en: 'I build user-centred digital products for web and mobile, and craft story-driven psychological experiences on Roblox.',
          })}
        </motion.p>

        <motion.div {...rise(0.65)} className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
          <a
            href="#isler"
            className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-paper pl-6 pr-5 text-[15px] font-medium text-ink transition-colors duration-300 hover:bg-white"
          >
            {t({ tr: 'İşlere göz at', en: 'See the work' })}
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={1.75} />
          </a>
          <a
            href="#iletisim"
            className="text-[15px] text-paper-dim underline decoration-line-strong underline-offset-[6px] transition-colors duration-300 hover:text-paper hover:decoration-paper/60"
          >
            {t({ tr: 'Birlikte çalışalım', en: 'Work with me' })}
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.85 }}
        className="mt-12 hidden"
      >
        <p className="text-sm leading-relaxed text-mute">
          {t({ tr: 'Şu sıralar', en: 'Currently working on' })}{' '}
          <a href="#muzikors" className="text-paper-dim transition-colors hover:text-paper">
            Muzikors
          </a>{' '}
          {t({ tr: 've', en: 'and' })}{' '}
          <a href="#thepier" className="text-paper-dim transition-colors hover:text-paper">
            The Pier
          </a>{' '}
          {t({ tr: 'üzerinde çalışıyorum.', en: '' })}
        </p>
      </motion.div>
    </section>
  );
}
