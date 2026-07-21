import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Skull, AlertTriangle, Smartphone, Globe, Terminal, Clock, ExternalLink, Play } from 'lucide-react';

export default function ProjectsSection({ onOpenLore }) {
  const [glitchActive, setGlitchActive] = useState(false);

  return (
    <section id="projects" className="relative z-10 py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <span className="px-3 py-1 rounded-full bg-violet-950/80 border border-violet-500/40 text-violet-400 font-mono text-xs uppercase tracking-widest mb-3">
          Öne Çıkan Çalışmalar
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          İnteraktif Deneyimler & Ürünler
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mt-3">
          Roblox üzerindeki psikolojik atmosferlerden web ve mobil platformlardaki özel çözümlere.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* PROJECT 1: The Pier: Endless Depths */}
        <motion.div
          whileHover={{ y: -6 }}
          className="glass-card rounded-2xl overflow-hidden flex flex-col border border-violet-900/40 relative group"
        >
          {/* Header Banner */}
          <div className="relative h-52 bg-gradient-to-b from-indigo-950 via-slate-950 to-[#0A0A0C] overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px] animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent z-10" />
            
            <div className="relative z-20 text-center p-6 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-violet-900/50 border border-violet-500/50 flex items-center justify-center mb-3 shadow-lg shadow-violet-500/20 group-hover:scale-110 transition-transform">
                <Skull className="w-6 h-6 text-violet-300" />
              </div>
              <span className="text-xs font-mono tracking-widest text-violet-400 uppercase">Roblox Experience</span>
              <h3 className="text-xl font-bold text-white tracking-wide mt-1">The Pier: Endless Depths</h3>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-violet-950/80 text-violet-300 border border-violet-800/40">
                  Psychological Horror
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-indigo-950/80 text-indigo-300 border border-indigo-800/40">
                  Lua Scripting
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Sisle kaplı sonsuz bir okyanusun ortasında, nereye uzandığı bilinmeyen ahşap bir iskelede geçen, klostrofobik atmosferi ve psikolojik anlatımıyla oyuncuyu içine çeken Roblox deneyimi.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="py-1.5 px-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-300 font-mono text-xs flex items-center justify-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Yapım aşamasında</span>
              </div>

              {/* Action buttons: Play Game + Read Lore */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://www.roblox.com/games/104035534286177/The-Pier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20 group/play"
                >
                  <Play className="w-3.5 h-3.5 fill-current group-hover/play:scale-110 transition-transform" />
                  <span>Oyuna Git</span>
                </a>

                <button
                  onClick={onOpenLore}
                  className="py-3 px-3 rounded-xl bg-gradient-to-r from-violet-700 to-indigo-700 text-white font-semibold text-xs hover:from-violet-600 hover:to-indigo-600 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-violet-700/30 group/btn cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-cyan-300 group-hover/btn:scale-110 transition-transform" />
                  <span>Lore Oku</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PROJECT 2: YDCO (Yunovax's Difficulty Chart Obby) */}
        <motion.div
          whileHover={{ y: -6 }}
          onMouseEnter={() => setGlitchActive(true)}
          onMouseLeave={() => setGlitchActive(false)}
          className={`glass-card rounded-2xl overflow-hidden flex flex-col border transition-all duration-300 relative group ${
            glitchActive ? 'border-rose-500/70 shadow-2xl shadow-rose-950/80' : 'border-rose-950/40'
          }`}
        >
          {/* Glitch Header Banner */}
          <div className="relative h-52 bg-gradient-to-b from-rose-950/80 via-slate-950 to-[#0A0A0C] overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent z-10" />

            <div className="relative z-20 text-center p-6 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-rose-950/80 border border-rose-500/50 flex items-center justify-center mb-3 shadow-lg shadow-rose-500/30 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6 text-rose-400" />
              </div>
              <span className="text-xs font-mono tracking-widest text-rose-400 uppercase">Meta-Horror Obby</span>
              <h3 className={`text-xl font-bold tracking-wide mt-1 ${glitchActive ? 'text-rose-400 glitch-hover' : 'text-white'}`}>
                YDCO - Difficulty Chart
              </h3>
            </div>

            {/* Red Terminal Glitch Popup Message */}
            {glitchActive && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-3 py-1.5 rounded bg-black/90 border border-rose-500 text-rose-400 font-mono text-xs flex items-center gap-2 shadow-2xl animate-bounce">
                <Terminal className="w-3.5 h-3.5" />
                <span>"You shouldn't be here."</span>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-rose-950/80 text-rose-300 border border-rose-800/40">
                  Meta Horror
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 text-slate-300 border border-slate-700">
                  Advanced Parkour
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-red-950/60 text-red-300 border border-red-800/30">
                  Lua
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Standart obby mekaniklerini bozan, seviyeler ilerledikçe kendi kod dünyasını sorgulatan meta-korku ve zorluk parkuru deneyimi.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="py-1.5 px-4 rounded-xl bg-amber-950/30 border border-amber-900/40 text-xs font-mono text-amber-300 flex items-center justify-between">
                <span>Yapım aşamasında</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              </div>

              {/* Play Game CTA Button */}
              <a
                href="https://www.roblox.com/games/97672403225593/Yunovaxs-Difficulty-Chart-Obby"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-rose-700/20 group/play"
              >
                <Play className="w-3.5 h-3.5 fill-current group-hover/play:scale-110 transition-transform" />
                <span>Oyuna Git (Roblox)</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* PROJECT 3: Muzikors */}
        <motion.div
          whileHover={{ y: -6 }}
          className="glass-card rounded-2xl overflow-hidden flex flex-col border border-cyan-900/40 relative group"
        >
          {/* Header Banner */}
          <div className="relative h-52 bg-gradient-to-b from-cyan-950/70 via-slate-950 to-[#0A0A0C] overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent z-10" />

            <div className="relative z-20 text-center p-6 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center mb-3 shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6 text-cyan-300" />
              </div>
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">Modern Cross-Platform Canlı</span>
              <h3 className="text-xl font-bold text-white tracking-wide mt-1">Muzikors</h3>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                  Flutter
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-indigo-950/80 text-indigo-300 border border-indigo-800/40">
                  Mobile & Web
                </span>
              </div>
              <p className="text-slate-300 text-base leading-relaxed mb-6 font-medium tracking-wide">
                Pek yakında...
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Modern Platform</span>
              </div>
              <span className="text-cyan-400 font-semibold">Pek yakında...</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
