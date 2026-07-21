import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gamepad2, ArrowDownRight, Zap, Code2, Orbit, MoveDown } from 'lucide-react';
import { scrollToSection } from '../utils/scroll';

export default function HeroSection({ isGravityOn, toggleGravity, onOpenTerminal }) {
  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none ambient-glow" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Header / Badge Title: İnteraktif Portföy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-violet-500/30 text-xs font-mono text-cyan-300 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>İnteraktif Portföy</span>
        </motion.div>

        {/* Hero Name Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 text-white"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
            Yunus Emre Gedik
          </span>
          <span className="block text-2xl sm:text-4xl md:text-5xl mt-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-500 glow-text-violet">
            (Yunovax)
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-2xl font-medium text-cyan-400 mb-6 tracking-wide flex items-center justify-center gap-2 flex-wrap"
        >
          <Code2 className="w-6 h-6 text-violet-400 inline" />
          <span>UI/UX Designer & Interactive Experience Developer</span>
          <Gamepad2 className="w-6 h-6 text-pink-400 inline" />
        </motion.h2>

        {/* Short Bio (Exact requested text) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10 font-normal glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl"
        >
          "Roblox üzerinde derin hikayeli psikolojik deneyimler kurgularken, web ve mobil tarafında kullanıcı dostu dijital ürünler geliştiriyorum."
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection('projects', 1000)}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-indigo-500 transition-all shadow-lg shadow-violet-600/30 flex items-center gap-2 group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-300 group-hover:rotate-12 transition-transform" />
            <span>Projeleri Keşfet</span>
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          {/* Gravity Button Label strictly "Yerçekimi" */}
          <button
            onClick={toggleGravity}
            className={`px-6 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 border cursor-pointer ${
              isGravityOn
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 hover:bg-rose-500/30 shadow-lg shadow-rose-500/20'
                : 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 shadow-lg shadow-cyan-500/20'
            }`}
          >
            {isGravityOn ? (
              <MoveDown className="w-4 h-4 text-rose-400 animate-bounce" />
            ) : (
              <Orbit className="w-4 h-4 text-cyan-400" />
            )}
            <span>Yerçekimi</span>
          </button>

          <button
            onClick={onOpenTerminal}
            className="px-5 py-3.5 rounded-xl glass-panel border border-violet-500/30 text-violet-300 font-mono text-sm hover:bg-violet-900/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Terminal CLI</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
