import React from 'react';
import Reveal from './Reveal';
import { CAPABILITIES } from '../data/portfolio';

export default function AboutSection() {
  return (
    <section id="hakkimda" className="mx-auto max-w-5xl scroll-mt-16 px-5 py-24 sm:px-8 sm:py-32">
      <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] md:gap-12">
        <Reveal>
          <h2 className="font-display text-[2.75rem] leading-none tracking-[-0.01em] text-paper sm:text-6xl">
            Hakkımda
          </h2>
        </Reveal>

        <Reveal as="dl" delay={0.1} className="mt-10 border-b border-line md:mt-2">
          {CAPABILITIES.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-t border-line py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:py-6"
            >
              <dt className="text-sm text-mute">{row.label}</dt>
              <dd className="text-[15px] leading-relaxed text-paper-dim sm:text-base">{row.items}</dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
