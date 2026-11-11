import React, { useEffect, useRef, useState } from 'react';
import { Check, Copy, MessageCircle } from 'lucide-react';
import Reveal from './Reveal';
import { COMMUNITIES, EMAIL, SOCIALS, WHATSAPP, WHATSAPP_LABEL } from '../data/portfolio';
import { useLang } from '../i18n';

const TXT = {
  title: { tr: 'İletişim', en: 'Contact' },
  lead: { tr: 'Bir fikriniz varsa,', en: 'Got an idea?' },
  leadEm: { tr: 'konuşalım.', en: 'Let’s talk.' },
  copy: { tr: 'Kopyala', en: 'Copy' },
  copied: { tr: 'Kopyalandı', en: 'Copied' },
  social: { tr: 'Sosyal', en: 'Social' },
  community: { tr: 'Topluluk', en: 'Community' },
  whatsapp: { tr: 'WhatsApp’tan yaz', en: 'Message on WhatsApp' },
  waText: { tr: 'Merhaba Yunus, portföyünü gördüm.', en: 'Hi Yunus, I saw your portfolio.' },
  footer: { tr: 'buraya bakacağını biliyordum :)', en: 'knew you’d look down here :)' },
};

export default function ContactSection() {
  const { t } = useLang();
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
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <h2 className="text-sm text-mute">{t(TXT.title)}</h2>
          <p className="mt-4 font-display text-[2.4rem] leading-[1.05] text-paper sm:text-5xl">
            {t(TXT.lead)} <em className="text-paper-dim">{t(TXT.leadEm)}</em>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t(TXT.waText))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-paper px-5 text-[15px] font-medium text-ink transition-colors hover:bg-white"
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={handleCopy}
            title={EMAIL}
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-line-strong px-5 text-[15px] text-paper-dim transition-colors hover:border-paper/60 hover:text-paper"
          >
            {copied ? <Check className="h-4 w-4" strokeWidth={1.75} /> : <Copy className="h-4 w-4" strokeWidth={1.75} />}
            <span aria-live="polite">{copied ? t(TXT.copied) : EMAIL}</span>
          </button>
        </Reveal>

        <ul className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-sm text-mute">
          {[...SOCIALS, ...COMMUNITIES].map((link) => (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-paper">
                {t(link.name)}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-1 border-t border-line pt-5 text-[13px] text-faint sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Yunus Emre Gedik · {WHATSAPP_LABEL}</span>
          <span className="transition-colors hover:text-mute">{t(TXT.footer)}</span>
        </div>
      </div>
    </footer>
  );
}
