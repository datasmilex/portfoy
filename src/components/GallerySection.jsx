import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { GALLERY, VSCO_URL } from '../data/portfolio';
import { useLang } from '../i18n';

export default function GallerySection() {
  const { t } = useLang();
  if (!GALLERY.length) return null;

  return (
    <section id="fotograf" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="mb-10 flex items-end justify-between gap-6 sm:mb-14">
        <h2 className="font-display text-[2.75rem] leading-none tracking-[-0.01em] text-paper sm:text-6xl">
          {t({ tr: 'Fotoğraf', en: 'Photography' })}
        </h2>
        <a
          href={VSCO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 pb-1 text-sm text-mute transition-colors hover:text-paper"
        >
          VSCO
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
        </a>
      </Reveal>

      <Reveal delay={0.1} className="columns-2 gap-3 sm:columns-3 sm:gap-4">
        {GALLERY.map((photo) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={t(photo.alt) || ''}
            loading="lazy"
            decoding="async"
            className="mb-3 w-full break-inside-avoid rounded-lg border border-line sm:mb-4"
          />
        ))}
      </Reveal>
    </section>
  );
}
