import React, { useEffect, useState } from 'react';
import { useLang } from '../i18n';
import Logo from './Logo';

const LINKS = [
  { href: '#isler', label: { tr: 'İşler', en: 'Work' } },
  { href: '#baglantilar', label: { tr: 'Bağlantılar', en: 'Links' } },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-300 ${
        scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-line' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label={t({ tr: 'Yunovax — başa dön', en: 'Yunovax — back to top' })} className="flex items-center gap-2.5 font-display text-[1.4rem] leading-none text-paper">
          <Logo className="h-6 w-6" />
          Yunovax
        </a>

        <nav className="flex items-center gap-1 text-sm text-mute">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden rounded-full px-3 py-2 transition-colors hover:text-paper sm:inline-block"
            >
              {t(link.label)}
            </a>
          ))}
          <button
            type="button"
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            aria-label={lang === 'tr' ? 'Switch to English' : 'Türkçeye geç'}
            className="cursor-pointer rounded-full px-3 py-2 tabular-nums transition-colors hover:text-paper"
          >
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>
          <a
            href="#iletisim"
            className="rounded-full border border-line-strong px-4 py-2 text-paper transition-colors hover:border-paper/60"
          >
            {t({ tr: 'İletişim', en: 'Contact' })}
          </a>
        </nav>
      </div>
    </header>
  );
}
