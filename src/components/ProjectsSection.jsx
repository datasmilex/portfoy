import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Skull, AlertTriangle, Smartphone, Globe, Terminal, Clock, Play, Video, ArrowUpRight, Download } from 'lucide-react';

export default function ProjectsSection({ onOpenLore, onNavigateToYxShot }) {
  const [glitchActive, setGlitchActive] = useState(false);

  return (
    <section id="projects" className="relative z-10 py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <span className="px-3 py-1 rounded-none bg-[#111] border border-white/20 text-gray-300 font-mono text-xs uppercase tracking-widest mb-3">
          Öne Çıkan Çalışmalar
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          İnteraktif Deneyimler & Ürünler
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mt-3">
          Roblox üzerindeki psikolojik atmosferlerden web ve mobil platformlardaki özel çözümlere.
        </p>
      </div>

      {/* Grid of Projects (Ordered: YX Shot -> Muzikors -> The Pier -> YDCO) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        
        {/* PROJECT 1: YX Shot - Shorts & Reels İndirici */}
        <motion.div
          whileHover={{ y: -6 }}
          className="glass-card rounded-none overflow-hidden flex flex-col border border-pink-500/30 hover:border-pink-500/60 relative group transition-all duration-300"
        >
          {/* Header Banner */}
          <div className="relative h-52 bg-[#0A0A0A] border-b border-white/10 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-pink-900/20 to-amber-900/10 opacity-40" />
            <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:18px_18px] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent z-10" />

            <div className="relative z-20 text-center p-6 flex flex-col items-center">
              <div className="w-12 h-12 rounded-none bg-black border border-pink-500/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/10">
                <Video className="w-6 h-6 text-pink-400" />
              </div>
              <span className="text-xs font-mono tracking-widest text-pink-400 uppercase">
                Web & Mobil Araç
              </span>
              <h3 className="text-xl font-bold text-white tracking-wide mt-1">
                Shorts & Reels İndirici (YX Shot)
              </h3>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-none text-xs font-mono bg-pink-500/10 text-pink-300 border border-pink-500/20">
                  Reels & Shorts
                </span>
                <span className="px-2.5 py-1 rounded-none text-xs font-mono bg-[#111] text-gray-300 border border-white/10">
                  1080p HD
                </span>
                <span className="px-2.5 py-1 rounded-none text-xs font-mono bg-[#111] text-gray-300 border border-white/10">
                  Fast CDN
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Sosyal medya Reels ve video içeriklerini filigransız, en yüksek çözünürlükte (HD) ve tek tıkla doğrudan cihazınıza indiren modern, hızlı ve reklamsız video aracı.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="py-1.5 px-4 rounded-none bg-[#111] border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Yayında & Kullanıma Hazır</span>
                </div>
                <span className="text-[11px] text-gray-400 font-mono">yunovax.com/yxshot</span>
              </div>

              {/* Action Button: Go to /yxshot */}
              <a
                href="/yxshot"
                onClick={(e) => {
                  if (onNavigateToYxShot) {
                    e.preventDefault();
                    onNavigateToYxShot();
                  }
                }}
                className="w-full py-3 rounded-none bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:via-rose-500 hover:to-amber-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-pink-500/20 cursor-pointer"
              >
                <Download className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
                <span>Uygulamayı Aç (Shorts İndirici)</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* PROJECT 2: Muzikors */}
        <motion.div
          whileHover={{ y: -6 }}
          className="glass-card rounded-none overflow-hidden flex flex-col border border-purple-500/30 hover:border-purple-500/60 relative group transition-all duration-300"
        >
          {/* Header Banner */}
          <div className="relative h-52 bg-[#0A0A0A] border-b border-white/10 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-indigo-900/20 to-blue-900/10 opacity-40" />
            <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent z-10" />

            <div className="relative z-20 text-center p-6 flex flex-col items-center">
              <div className="w-12 h-12 rounded-none bg-black border border-purple-500/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/10">
                <Smartphone className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">Modern Müzik Platformu</span>
              <h3 className="text-xl font-bold text-white tracking-wide mt-1">Muzikors</h3>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-none text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Mobile & Web
                </span>
                <span className="px-2.5 py-1 rounded-none text-xs font-mono bg-[#111] text-gray-300 border border-white/10">
                  Audio Streaming
                </span>
                <span className="px-2.5 py-1 rounded-none text-xs font-mono bg-[#111] text-gray-300 border border-white/10">
                  Cross-Platform
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Müzik keşfini ve dinleme deneyimini modern bir arayüzle buluşturan; kesintisiz akış, özel çalma listeleri ve sosyal paylaşım özelliklerine sahip yeni nesil cross-platform müzik platformu.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="py-1.5 px-4 rounded-none bg-[#111] border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Yayında & Canlı</span>
                </div>
                <span className="text-[11px] text-gray-400 font-mono">muzikors.com.tr</span>
              </div>

              {/* Action Button: Visit muzikors.com.tr */}
              <a
                href="https://muzikors.com.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-none bg-white hover:bg-gray-200 text-black font-semibold text-xs transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
              >
                <Globe className="w-4 h-4 text-black" />
                <span>Siteye Git (muzikors.com.tr)</span>
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* PROJECT 3: The Pier: Endless Depths */}
        <motion.div
          whileHover={{ y: -6 }}
          className="glass-card rounded-none overflow-hidden flex flex-col border border-white/20 relative group"
        >
          {/* Header Banner */}
          <div className="relative h-52 bg-[#0A0A0A] border-b border-white/10 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent z-10" />
            
            <div className="relative z-20 text-center p-6 flex flex-col items-center">
              <div className="w-12 h-12 rounded-none bg-black border border-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Skull className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">Roblox Experience</span>
              <h3 className="text-xl font-bold text-white tracking-wide mt-1">The Pier: Endless Depths</h3>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-none text-xs font-mono bg-[#111] text-gray-300 border border-white/10">
                  Psychological Horror
                </span>
                <span className="px-2.5 py-1 rounded-none text-xs font-mono bg-[#111] text-gray-300 border border-white/10">
                  Lua Scripting
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Sisle kaplı sonsuz bir okyanusun ortasında, nereye uzandığı bilinmeyen ahşap bir iskelede geçen, klostrofobik atmosferi ve psikolojik anlatımıyla oyuncuyu içine çeken Roblox deneyimi.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="py-1.5 px-3 rounded-none bg-[#111] border border-white/20 text-gray-400 font-mono text-xs flex items-center justify-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Yapım aşamasında</span>
              </div>

              {/* Action buttons: Play Game + Read Lore */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://www.roblox.com/games/104035534286177/The-Pier"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 rounded-none bg-white hover:bg-gray-200 text-black font-semibold text-xs transition-all flex items-center justify-center gap-1.5 group/play"
                >
                  <Play className="w-3.5 h-3.5 fill-current group-hover/play:scale-110 transition-transform" />
                  <span>Oyuna Git</span>
                </a>

                <button
                  onClick={onOpenLore}
                  className="py-3 px-3 rounded-none bg-[#111] border border-white/20 text-white font-semibold text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-white group-hover/btn:scale-110 transition-transform" />
                  <span>Lore Oku</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PROJECT 4: YDCO (Yunovax's Difficulty Chart Obby) */}
        <motion.div
          whileHover={{ y: -6 }}
          onMouseEnter={() => setGlitchActive(true)}
          onMouseLeave={() => setGlitchActive(false)}
          className={`glass-card rounded-none overflow-hidden flex flex-col border transition-all duration-300 relative group ${
            glitchActive ? 'border-white bg-[#111]' : 'border-white/20'
          }`}
        >
          {/* Glitch Header Banner */}
          <div className="relative h-52 bg-[#0A0A0A] border-b border-white/10 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent z-10" />

            <div className="relative z-20 text-center p-6 flex flex-col items-center">
              <div className="w-12 h-12 rounded-none bg-black border border-white/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">Meta-Horror Obby</span>
              <h3 className="text-xl font-bold tracking-wide mt-1 text-white">
                YDCO - Difficulty Chart
              </h3>
            </div>

            {/* Terminal Glitch Popup Message */}
            {glitchActive && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-3 py-1.5 rounded-none bg-black border border-white text-white font-mono text-xs flex items-center gap-2 shadow-2xl animate-bounce">
                <Terminal className="w-3.5 h-3.5" />
                <span>"You shouldn't be here."</span>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-none text-xs font-mono bg-[#111] text-gray-300 border border-white/10">
                  Meta Horror
                </span>
                <span className="px-2.5 py-1 rounded-none text-xs font-mono bg-[#111] text-gray-300 border border-white/10">
                  Advanced Parkour
                </span>
                <span className="px-2.5 py-1 rounded-none text-xs font-mono bg-[#111] text-gray-300 border border-white/10">
                  Lua
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Standart obby mekaniklerini bozan, seviyeler ilerledikçe kendi kod dünyasını sorgulatan meta-korku ve zorluk parkuru deneyimi.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="py-1.5 px-3 rounded-none bg-[#111] border border-white/20 text-gray-400 font-mono text-xs flex items-center justify-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-400 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Yapım aşamasında</span>
              </div>

              {/* Play Game CTA Button */}
              <a
                href="https://www.roblox.com/games/97672403225593/Yunovaxs-Difficulty-Chart-Obby"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-none bg-white hover:bg-gray-200 text-black font-semibold text-xs transition-all flex items-center justify-center gap-1.5 group/play"
              >
                <Play className="w-3.5 h-3.5 fill-current group-hover/play:scale-110 transition-transform" />
                <span>Oyuna Git (Roblox)</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
