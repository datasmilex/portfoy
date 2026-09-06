import React from 'react';
import { Compass, User, Mail, Users } from 'lucide-react';
import { scrollToSection } from '../utils/scroll';

export default function Navbar() {
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId, 1000);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 px-4 md:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand / Yunovax Logo */}
        <button onClick={(e) => handleNavClick(e, 'hero')} className="flex items-center gap-3 group text-left cursor-pointer">
          <img
            src="/favicon.svg"
            alt="Yunovax Logo"
            className="w-8 h-8 object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-wider text-white group-hover:text-zinc-200 transition-colors">
              YUNOVAX
            </span>
            <span className="text-xs tracking-wider text-zinc-400 font-mono">
              Yunus Emre Gedik
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 md:gap-8 text-sm font-medium text-zinc-300">
          <button
            onClick={(e) => handleNavClick(e, 'projects')}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer py-1"
          >
            <Compass className="w-4 h-4 text-zinc-400" />
            <span>Projeler</span>
          </button>
          <button
            onClick={(e) => handleNavClick(e, 'hakkimda')}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer py-1"
          >
            <User className="w-4 h-4 text-zinc-400" />
            <span>Hakkımda</span>
          </button>
          <button
            onClick={(e) => handleNavClick(e, 'community')}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer py-1 hidden sm:flex"
          >
            <Users className="w-4 h-4 text-zinc-400" />
            <span>Topluluk</span>
          </button>
          <button
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer py-1"
          >
            <Mail className="w-4 h-4 text-zinc-400" />
            <span>İletişim</span>
          </button>
        </nav>

      </div>
    </header>
  );
}
