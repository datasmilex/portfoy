import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Smartphone, Layout, Palette } from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Core & Game Engine',
    icon: Cpu,
    skills: ['Lua Scripting', 'Game Physics & Mechanics', 'Soundscape Design'],
  },
  {
    title: 'Mobile & Web Platforms',
    icon: Smartphone,
    skills: ['FlutterFlow', 'Supabase', 'Vercel & Cloud'],
  },
  {
    title: 'Developer & Tech Tools',
    icon: Layout,
    skills: ['VS Code & CLI Tools', 'Blender', 'Generative AI Workflows'],
  },
  {
    title: 'Tasarım & Medya',
    icon: Palette,
    skills: ['Figma', 'Photoshop', 'Fotoğrafçılık', 'Video Editör'],
  },
];

export default function TechArsenal() {
  return (
    <section id="hakkimda" className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Hakkımda
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl mt-3 text-balance">
          Tasarım, yazılım mimarisi ve interaktif deneyim üretiminde kullandığım temel araçlar ve yetkinlikler.
        </p>
      </div>

      {/* Grid Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 md:p-8 rounded-none bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3.5 mb-6">
                  <Icon className="w-6 h-6 text-zinc-300" />
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-wide">{cat.title}</h3>
                    <span className="text-xs font-mono text-zinc-400">Teknik Yetkinlikler</span>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-2.5">
                  {cat.skills.map((skillName) => (
                    <div
                      key={skillName}
                      className="px-4 py-3 rounded-none bg-zinc-950/60 border border-zinc-800/70 hover:border-zinc-600 transition-colors flex items-center"
                    >
                      <h4 className="font-medium text-zinc-200 text-sm">
                        {skillName}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
