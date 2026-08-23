import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gamepad2, ArrowDownRight, Code2 } from 'lucide-react';
import { scrollToSection } from '../utils/scroll';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[75vh] flex items-center justify-center px-4 py-16 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Header / Badge Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none border border-white/20 bg-black text-xs font-mono text-gray-300 mb-8"
        >
          <img src="/favicon.svg" alt="Yunovax" className="w-3.5 h-3.5 object-contain" />
          <span>Kişisel Portföy</span>
        </motion.div>

        {/* Hero Name Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 text-white uppercase"
        >
          <span>
            Yunus Emre Gedik
          </span>
          <span className="block text-2xl sm:text-4xl md:text-5xl mt-2 font-bold text-gray-400">
            (Yunovax)
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg sm:text-2xl font-medium text-gray-300 mb-6 tracking-wide flex items-center justify-center gap-2 flex-wrap"
        >
          <Code2 className="w-6 h-6 text-white inline" />
          <span>UI/UX Designer & Interactive Experience Developer</span>
          <Gamepad2 className="w-6 h-6 text-white inline" />
        </motion.h2>

        {/* Short Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg text-gray-400 max-w-2xl leading-relaxed mb-10 font-normal border border-white/20 p-6 rounded-none bg-[#0A0A0A]"
        >
          "Roblox üzerinde derin hikayeli psikolojik deneyimler kurgularken, web ve mobil tarafında kullanıcı dostu dijital ürünler geliştiriyorum."
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection('projects', 1000)}
            className="px-8 py-3.5 rounded-none bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-all flex items-center gap-2 group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
            <span>Projeleri Keşfet</span>
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
