import React from 'react';
import Reveal from './Reveal';
import { SPOTIFY_ARTIST_ID } from '../data/portfolio';
import { useLang } from '../i18n';

export default function MusicSection() {
  const { t } = useLang();

  return (
    <section id="muzik" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-24 sm:px-8 sm:py-32">
      <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] md:gap-12">
        <Reveal>
          <h2 className="font-display text-[2.75rem] leading-none tracking-[-0.01em] text-paper sm:text-6xl">
            {t({ tr: 'Müzik', en: 'Music' })}
          </h2>
          <p className="mt-5 max-w-[30ch] text-[15px] leading-relaxed text-mute">
            {t({
              tr: 'Tasarımın yanında müzik de üretiyorum. Spotify’da dinleyebilirsin.',
              en: 'Alongside design, I make music too. Have a listen on Spotify.',
            })}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 md:mt-2">
          <iframe
            title="Spotify — Yunovax"
            src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="rounded-xl border border-line"
          />
        </Reveal>
      </div>
    </section>
  );
}
