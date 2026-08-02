import React from 'react';
import { Orbit, Terminal, Sparkles, MoveDown, Compass, User, Mail, Users } from 'lucide-react';
import { scrollToSection } from '../utils/scroll';

export default function Navbar({ isGravityOn, toggleGravity, onOpenTerminal }) {
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId, 1000);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand / Logo */}
        <button onClick={(e) => handleNavClick(e, 'hero')} className="flex items-center gap-3 group text-left cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-white/20 p-[1px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#050505] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
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
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <button
            onClick={(e) => handleNavClick(e, 'projects')}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-gray-400" />
            Projeler
          </button>
          <button
            onClick={(e) => handleNavClick(e, 'hakkimda')}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <User className="w-4 h-4 text-gray-400" />
            Hakkımda
          </button>
          <button
            onClick={(e) => handleNavClick(e, 'community')}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Users className="w-4 h-4 text-gray-400" />
            Topluluk
          </button>
          <button
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-gray-400" />
            İletişim
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Gravity Toggle Button */}
          <button
            onClick={toggleGravity}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-none border text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
              isGravityOn
                ? 'bg-white/10 border-white text-white'
                : 'bg-transparent border-white/20 text-gray-400 hover:text-white hover:border-white/50'
            }`}
            title="Yerçekimi Fizikini Değiştir"
          >
            {isGravityOn ? (
              <MoveDown className="w-4 h-4 text-white animate-bounce" />
            ) : (
              <Orbit className="w-4 h-4 text-gray-400" />
            )}
            <span>Yerçekimi</span>
          </button>

          {/* Terminal CLI Trigger Button */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-3 py-2 rounded-none bg-black border border-white/20 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs font-mono group cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-gray-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">CLI</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-black border border-white/20 rounded-none text-gray-500">
              Ctrl+K
            </kbd>
          </button>

        </div>

      </div>
    </header>
  );
}
