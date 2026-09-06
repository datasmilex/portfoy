import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Gamepad2, ArrowDownRight, Code2 } from 'lucide-react';
import { scrollToSection } from '../utils/scroll';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[75vh] flex items-center justify-center px-4 py-20 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Hero Name Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4"
        >
          <span>Yunus Emre Gedik</span>
          <span className="block text-2xl sm:text-3xl md:text-4xl mt-2 font-medium text-zinc-400">
            Yunovax
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-lg sm:text-xl md:text-2xl font-normal text-zinc-300 mb-6 tracking-wide flex items-center justify-center gap-2.5 flex-wrap"
        >
          <Code2 className="w-5 h-5 text-zinc-400 inline" />
          <span>UI/UX Designer & Interactive Experience Developer</span>
          <Gamepad2 className="w-5 h-5 text-zinc-400 inline" />
        </motion.h2>

        {/* Short Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10 font-normal border border-zinc-800/80 p-6 bg-zinc-900/40 text-balance"
        >
          Roblox üzerinde derin hikayeli psikolojik deneyimler kurgularken, web ve mobil platformlarda kullanıcı odaklı dijital ürünler geliştiriyorum.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection('projects', 1000)}
            className="px-8 py-3.5 bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition-colors flex items-center gap-2.5 group cursor-pointer shadow-sm"
          >
            <Layers className="w-4 h-4 text-zinc-950 group-hover:scale-105 transition-transform" />
            <span>Projeleri Keşfet</span>
            <ArrowDownRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
