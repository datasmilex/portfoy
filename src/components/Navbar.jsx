import React from 'react';
import { Compass, User, Mail, Users } from 'lucide-react';
import { scrollToSection } from '../utils/scroll';

export default function Navbar() {
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId, 1000);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand / Yunovax Logo */}
        <button onClick={(e) => handleNavClick(e, 'hero')} className="flex items-center gap-3 group text-left cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-white/20 p-[1px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#050505] rounded-[11px] flex items-center justify-center p-2">
              <img src="/favicon.svg" alt="Yunovax Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-wider text-white group-hover:text-gray-300 transition-colors">
              YUNOVAX
            </span>
            <span className="text-[10px] tracking-widest text-gray-400 uppercase font-mono">
              Yunus Emre Gedik
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6 md:gap-8 text-sm font-medium text-slate-400">
          <button
            onClick={(e) => handleNavClick(e, 'projects')}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-gray-400" />
            <span>Projeler</span>
          </button>
          <button
            onClick={(e) => handleNavClick(e, 'hakkimda')}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <User className="w-4 h-4 text-gray-400" />
            <span>Hakkımda</span>
          </button>
          <button
            onClick={(e) => handleNavClick(e, 'community')}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer hidden sm:flex"
          >
            <Users className="w-4 h-4 text-gray-400" />
            <span>Topluluk</span>
          </button>
          <button
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-gray-400" />
            <span>İletişim</span>
          </button>
        </nav>

      </div>
    </header>
  );
}
