import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Skull, AlertTriangle, Smartphone, Globe, Terminal, Clock, Play, Video, ArrowUpRight, Download, Gamepad2 } from 'lucide-react';

export default function ProjectsSection({ onOpenLore, onNavigateToYxShot }) {
  const [glitchActive, setGlitchActive] = useState(false);

  return (
    <section id="projects" className="relative z-10 py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          İnteraktif Deneyimler & Ürünler
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl mt-3 text-balance">
          Roblox üzerindeki psikolojik atmosferlerden web ve mobil platformlardaki özel dijital çözümlere.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* PROJECT 0: YX Games */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-none bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-600/80 transition-all flex flex-col justify-between"
        >
          {/* Header Banner */}
          <div className="p-7 border-b border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <Gamepad2 className="w-6 h-6 text-zinc-300" />
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">YX Games</h3>
                <span className="text-xs font-mono text-zinc-400">Web Oyun Platformu</span>
              </div>
            </div>
            <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/70 text-zinc-300 border border-zinc-700/60">
              Web
            </span>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
                  HTML5
                </span>
                <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
                  Web Games
                </span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                Yüzlerce HTML5 tabanlı web oyununu tek bir çatı altında toplayan, tarayıcı üzerinden ücretsiz oynanabilen modern oyun platformu.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <a
                href="https://yxgames.site"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Globe className="w-4 h-4 text-zinc-950" />
                <span>Oyun Oyna (yxgames.site)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* PROJECT 1: YX Shot */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-none bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-600/80 transition-all flex flex-col justify-between"
        >
          {/* Header Banner */}
          <div className="p-7 border-b border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <Video className="w-6 h-6 text-zinc-300" />
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">YX Shot</h3>
                <span className="text-xs font-mono text-zinc-400">Web & Mobil Araç</span>
              </div>
            </div>
            <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/70 text-zinc-300 border border-zinc-700/60">
              Tool
            </span>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
                  Reels & Shorts
                </span>
                <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
                  1080p HD
                </span>
                <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
                  Fast CDN
                </span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                Sosyal medya Reels ve video içeriklerini filigransız ve yüksek çözünürlükte indiren web aracı.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <a
                href="/yxshot"
                onClick={(e) => {
                  if (onNavigateToYxShot) {
                    e.preventDefault();
                    onNavigateToYxShot();
                  }
                }}
                className="w-full py-3 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4 text-zinc-950" />
                <span>Uygulamayı Aç (yxshot)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* PROJECT 2: Muzikors */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-none bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-600/80 transition-all flex flex-col justify-between"
        >
          {/* Header Banner */}
          <div className="p-7 border-b border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <Smartphone className="w-6 h-6 text-zinc-300" />
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">Muzikors</h3>
                <span className="text-xs font-mono text-zinc-400">Modern Müzik Platformu</span>
              </div>
            </div>
            <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/70 text-zinc-300 border border-zinc-700/60">
              Cross-Platform
            </span>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
                  Mobile & Web
                </span>
                <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
                  Audio Streaming
                </span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                Müzik keşfini ve dinleme deneyimini modern bir arayüzle buluşturan yeni nesil cross-platform müzik platformu.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <a
                href="https://muzikors.com.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Globe className="w-4 h-4 text-zinc-950" />
                <span>Siteye Git (muzikors.com.tr)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* PROJECT 3: The Pier: Endless Depths */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-none bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-600/80 transition-all flex flex-col justify-between"
        >
          {/* Header Banner */}
          <div className="p-7 border-b border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <Skull className="w-6 h-6 text-zinc-300" />
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">The Pier: Endless Depths</h3>
                <span className="text-xs font-mono text-zinc-400">Roblox Experience</span>
              </div>
            </div>
            <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/70 text-zinc-300 border border-zinc-700/60">
              Psychological
            </span>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
                  Psychological Horror
                </span>
                <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
                  Lua Scripting
                </span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                Sisle kaplı sonsuz bir okyanusun ortasında, nereye uzandığı bilinmeyen ahşap bir iskelede geçen klostrofobik atmosferik Roblox deneyimi.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <div className="py-2 px-3 bg-zinc-950 border border-zinc-800/80 text-zinc-400 font-mono text-xs flex items-center justify-center gap-2">
                <Clock className="w-3.5 h-3.5 text-zinc-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Yapım aşamasında</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://www.roblox.com/games/104035534286177/The-Pier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Oyuna Git</span>
                </a>

                <button
                  onClick={onOpenLore}
                  className="py-3 px-3 bg-zinc-800/80 border border-zinc-700/80 text-white font-semibold text-xs hover:bg-zinc-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-white" />
                  <span>Lore Oku</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PROJECT 4: YDCO */}
        <motion.div
          whileHover={{ y: -4 }}
          onMouseEnter={() => setGlitchActive(true)}
          onMouseLeave={() => setGlitchActive(false)}
          className={`rounded-none bg-zinc-900/40 border transition-all flex flex-col justify-between relative ${
            glitchActive ? 'border-zinc-500 bg-zinc-900/60' : 'border-zinc-800/80'
          }`}
        >
          {/* Header Banner */}
          <div className="p-7 border-b border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between relative">
            <div className="flex items-center gap-3.5">
              <AlertTriangle className="w-6 h-6 text-zinc-300" />
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">YDCO - Difficulty Chart</h3>
                <span className="text-xs font-mono text-zinc-400">Meta-Horror Obby</span>
              </div>
            </div>
            <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/70 text-zinc-300 border border-zinc-700/60">
              Hardcore
            </span>

            {/* Terminal Glitch Popup Message */}
            {glitchActive && (
              <div className="absolute top-2 right-4 z-30 px-3 py-1 bg-black border border-zinc-600 text-zinc-200 font-mono text-xs flex items-center gap-2 shadow-xl">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span>"You shouldn't be here."</span>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
                  Meta Horror
                </span>
                <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
                  Advanced Parkour
                </span>
                <span className="px-2.5 py-1 text-xs font-mono bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
                  Lua
                </span>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                Standart obby mekaniklerini bozan, seviyeler ilerledikçe kendi kod dünyasını sorgulatan meta-korku ve zorluk parkuru deneyimi.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <div className="py-2 px-3 bg-zinc-950 border border-zinc-800/80 text-zinc-400 font-mono text-xs flex items-center justify-center gap-2">
                <Clock className="w-3.5 h-3.5 text-zinc-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Yapım aşamasında</span>
              </div>

              <a
                href="https://www.roblox.com/games/97672403225593/Yunovaxs-Difficulty-Chart-Obby"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Oyuna Git (Roblox)</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
