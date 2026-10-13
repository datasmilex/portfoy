import React, { useEffect, useState } from 'react';

const LINKS = [
  { href: '#isler', label: 'İşler' },
  { href: '#hakkimda', label: 'Hakkımda' },
];

export default function Navbar() {
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
        <a href="#top" aria-label="Yunovax — başa dön" className="font-display text-[1.4rem] leading-none text-paper">
          Yunovax
        </a>

        <nav className="flex items-center gap-1 text-sm text-mute">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden rounded-full px-3 py-2 transition-colors hover:text-paper sm:inline-block"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#iletisim"
            className="rounded-full border border-line-strong px-4 py-2 text-paper transition-colors hover:border-paper/60"
          >
            İletişim
          </a>
        </nav>
      </div>
    </header>
  );
}
