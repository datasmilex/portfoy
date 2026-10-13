import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import Reveal from './Reveal';
import { COMMUNITIES, EMAIL, SOCIALS } from '../data/portfolio';

function LinkList({ title, links, listClassName = '' }) {
  return (
    <div>
      <h3 className="text-sm text-mute">{title}</h3>
      <ul className={`mt-4 grid grid-cols-2 gap-x-6 ${listClassName}`}>
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-3 border-t border-line py-3.5 text-[15px] text-paper-dim transition-colors hover:text-paper"
            >
              {link.name}
              <ArrowUpRight
                className="h-4 w-4 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-paper"
                strokeWidth={1.75}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer id="iletisim" className="scroll-mt-16 border-t border-line">
      <div className="mx-auto max-w-5xl px-5 pb-6 pt-24 sm:px-8 sm:pt-32">
        <Reveal>
          <h2 className="text-sm text-mute">İletişim</h2>
          <p className="mt-6 max-w-[16ch] font-display text-[2.6rem] leading-[1.02] text-paper sm:text-6xl">
            Bir fikriniz varsa, <em className="text-paper-dim">konuşalım.</em>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4">
          <a
            href={`mailto:${EMAIL}`}
            className="break-all font-display text-[clamp(1.6rem,7vw,2.75rem)] leading-tight text-paper underline decoration-line-strong decoration-1 underline-offset-[8px] transition-colors hover:decoration-paper/60"
          >
            {EMAIL}
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-line-strong px-4 text-sm text-paper-dim transition-colors hover:border-paper/60 hover:text-paper"
          >
            {copied ? (
              <Check className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <Copy className="h-4 w-4" strokeWidth={1.75} />
            )}
            <span aria-live="polite">{copied ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>
        </Reveal>

        <Reveal delay={0.15} className="mt-20 grid gap-12 sm:grid-cols-[2fr_1fr] sm:gap-10">
          <LinkList title="Sosyal" links={SOCIALS} />
          <LinkList title="Topluluk" links={COMMUNITIES} listClassName="sm:grid-cols-1" />
        </Reveal>

        <div className="mt-24 flex flex-col gap-2 border-t border-line pt-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Yunus Emre Gedik</span>
          <span className="transition-colors hover:text-mute">buraya bakacağını biliyordum :)</span>
        </div>

        <p
          aria-hidden="true"
          className="mt-10 select-none overflow-hidden whitespace-nowrap text-center font-display text-[27vw] leading-[0.8] tracking-[-0.03em] text-paper/[0.06] sm:text-[clamp(8rem,24vw,17.5rem)]"
        >
          Yunovax
        </p>
      </div>
    </footer>
  );
}
