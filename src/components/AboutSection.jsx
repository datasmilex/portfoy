import React from 'react';
import Reveal from './Reveal';
import { CAPABILITIES } from '../data/portfolio';
import { useLang } from '../i18n';

export default function AboutSection() {
  const { t } = useLang();
  return (
    <section id="hakkimda" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-16 sm:px-8 sm:py-20">
      <Reveal as="h2" className="mb-8 text-sm text-mute">
        {t({ tr: 'Hakkımda', en: 'About' })}
      </Reveal>

      <Reveal as="dl" className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map((row) => (
          <div key={row.label.tr} className="border-t border-line pt-4">
            <dt className="text-sm text-paper">{t(row.label)}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-mute">{t(row.items)}</dd>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
