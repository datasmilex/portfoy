import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { COMMUNITIES, SOCIALS } from '../data/portfolio';
import { useLang } from '../i18n';

export default function LinksSection() {
  const { t } = useLang();
  const links = [...SOCIALS, ...COMMUNITIES];

  return (
    <section id="baglantilar" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-16 sm:px-8 sm:py-20">
      <Reveal as="h2" className="mb-8 text-sm text-mute">
        {t({ tr: 'Bağlantılar', en: 'Links' })}
      </Reveal>

      <ul className="grid grid-cols-2 gap-x-6 sm:grid-cols-3">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 border-t border-line py-3.5 text-[15px] text-paper-dim transition-colors hover:text-paper"
            >
              {t(link.name)}
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper"
                strokeWidth={1.75}
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
