import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Smartphone, Layout, Palette } from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Core & Game Engine',
    icon: Cpu,
    color: 'from-violet-500 to-indigo-500',
    skills: [
      { name: 'Lua Scripting', level: 'Uzman (Expert)', tag: 'Roblox Engine' },
      { name: 'Game Physics & Mechanics', level: 'Gelişmiş', tag: 'Roblox / 2D/3D' },
      { name: 'Soundscape Design', level: 'Atmosferik', tag: 'Procedural Audio' },
    ],
  },
  {
    title: 'Mobile & Web Platforms',
    icon: Smartphone,
    color: 'from-cyan-500 to-blue-500',
    skills: [
      { name: 'Flutter (Dart)', level: 'İleri Seviye', tag: 'Cross-Platform' },
      { name: 'Supabase', level: 'Backend & DB', tag: 'PostgreSQL / Auth' },
      { name: 'Vercel & Cloud', level: 'Deployment', tag: 'CI/CD' },
    ],
  },
  {
    title: 'Developer & Tech Tools',
    icon: Layout,
    color: 'from-pink-500 to-rose-500',
    skills: [
      { name: 'HTML5 / CSS3 / Modern JS', level: 'İleri Seviye', tag: 'Frontend' },
      { name: 'VS Code & CLI Tools', level: 'Günlük Workflow', tag: 'IDE' },
      { name: 'Blender', level: '3D Modelleme', tag: 'Assets & Props' },
      { name: 'Generative AI Workflows', level: 'İleri Seviye', tag: 'Prompt Engineering' },
    ],
  },
  {
    title: 'Tasarım & Medya',
    icon: Palette,
    color: 'from-amber-500 to-orange-500',
    skills: [
      { name: 'Figma', level: 'UI/UX Prototipleme', tag: 'Design System' },
      { name: 'Photoshop', level: 'Orta Düzey', tag: 'Görsel Tasarım' },
      { name: 'Fotoğrafçılık', level: 'Kreatif', tag: 'Kare & Işık' },
      { name: 'Video Editör', level: 'Kurgu & Montaj', tag: 'Medya' },
    ],
  },
];

export default function TechArsenal() {
  return (
    <section id="hakkimda" className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <span className="px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
          HAKKIMDA
        </span>
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
              className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-violet-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.color} p-[1px] shadow-lg`}>
                    <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                    <span className="text-xs font-mono text-slate-400">Teknik Yetkinlikler</span>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-3.5">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 transition-all flex items-center justify-between group/item"
                    >
                      <div>
                        <h4 className="font-semibold text-slate-100 group-hover/item:text-cyan-300 transition-colors">
                          {skill.name}
                        </h4>
                        <span className="text-xs text-slate-400">{skill.level}</span>
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-violet-950/80 text-violet-300 border border-violet-800/40">
                        {skill.tag}
                      </span>
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
