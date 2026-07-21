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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-wider text-white group-hover:text-cyan-400 transition-colors">
              YUNOVAX
            </span>
            <span className="text-[10px] tracking-widest text-violet-400 uppercase font-mono">
              Yunus Emre Gedik
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={(e) => handleNavClick(e, 'projects')}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-violet-400" />
            Projeler
          </button>
          <button
            onClick={(e) => handleNavClick(e, 'hakkimda')}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <User className="w-4 h-4 text-pink-400" />
            Hakkımda
          </button>
          <button
            onClick={(e) => handleNavClick(e, 'community')}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Users className="w-4 h-4 text-indigo-400" />
            Topluluk
          </button>
          <button
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            İletişim
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Gravity Toggle Button - Label strictly "Yerçekimi" */}
          <button
            onClick={toggleGravity}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
              isGravityOn
                ? 'bg-rose-500/20 border border-rose-500/50 text-rose-300 shadow-lg shadow-rose-500/20'
                : 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-lg shadow-cyan-500/20 animate-pulse'
            }`}
            title="Yerçekimi Fizikini Değiştir"
          >
            {isGravityOn ? (
              <MoveDown className="w-4 h-4 text-rose-400 animate-bounce" />
            ) : (
              <Orbit className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            )}
            <span>Yerçekimi</span>
          </button>

          {/* Terminal CLI Trigger Button */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-950/60 border border-violet-500/40 text-violet-300 hover:text-white hover:bg-violet-900/60 transition-all text-xs font-mono group cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-violet-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">CLI</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-slate-900 border border-violet-500/30 rounded text-slate-400">
              Ctrl+K
            </kbd>
          </button>

        </div>

      </div>
    </header>
  );
}
