import React from 'react';
import Reveal from './Reveal';
import { CAPABILITIES } from '../data/portfolio';

export default function AboutSection() {
  return (
    <section id="hakkimda" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-20 sm:px-8 sm:py-28">
      <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12">
        <Reveal>
          <h2 className="text-sm text-mute">Hakkımda</h2>
        </Reveal>

        <div>
          <Reveal
            as="p"
            className="mt-6 font-display text-[1.85rem] leading-[1.18] text-paper sm:text-[2.6rem] md:mt-0"
          >
            Tasarımı ve kodu aynı masada düşünüyorum. Sade bir arayüz de, iyi kurulmuş bir gerilim
            sahnesi de aynı kararla başlar: <em className="text-paper-dim">neyi göstermeyeceğini bilmek.</em>
          </Reveal>

          <Reveal as="dl" delay={0.1} className="mt-14 border-b border-line">
            {CAPABILITIES.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-t border-line py-5 sm:grid-cols-[9rem_minmax(0,1fr)]"
              >
                <dt className="text-sm text-mute">{row.label}</dt>
                <dd className="text-[15px] leading-relaxed text-paper-dim">{row.items}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
