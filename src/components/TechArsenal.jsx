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
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase">
          HAKKIMDA
        </h2>
        <p className="text-slate-300 text-base md:text-lg max-w-xl mt-3 font-medium">
          Hakkımda bilmeniz gerekenler...
        </p>
      </div>

      {/* Grid Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 md:p-8 rounded-none bg-[#0A0A0A] border border-white/20 relative overflow-hidden group hover:border-white transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-none bg-white/20 p-[1px]`}>
                    <div className="w-full h-full bg-[#050505] rounded-none flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                    <span className="text-xs font-mono text-slate-400">Teknik Yetkinlikler</span>
                  </div>
                </div>

                {/* Minimalist Skills List */}
                <div className="space-y-2.5">
                  {cat.skills.map((skillName) => (
                    <div
                      key={skillName}
                      className="px-4 py-3 rounded-none bg-[#111] border border-white/10 hover:border-white/50 hover:bg-white/5 transition-all flex items-center group/item"
                    >
                      <h4 className="font-semibold text-slate-100 group-hover/item:text-white transition-colors text-sm md:text-base">
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
