import React from 'react';
import { motion } from 'framer-motion';
import { Users, ExternalLink, Gamepad2, MessageSquare } from 'lucide-react';

const COMMUNITIES = [
  {
    title: 'Roblox Geliştirici Grubu',
    subtitle: 'Projeleri yakından takip et.',
    url: 'https://www.roblox.com/communities/3958018/yunovax#!/about',
    badge: 'Roblox Community',
    icon: Gamepad2,
    gradient: 'from-rose-600 to-red-600',
    borderHover: 'hover:border-rose-500/60',
    shadowGlow: 'hover:shadow-rose-500/20',
  },
  {
    title: 'Discord Sunucumuz',
    subtitle: 'Topluluğa katıl & sohbet et.',
    url: 'https://discord.com/invite/Bgpnjzx2bc',
    badge: 'Discord Server',
    icon: MessageSquare,
    gradient: 'from-indigo-600 to-violet-600',
    borderHover: 'hover:border-indigo-500/60',
    shadowGlow: 'hover:shadow-indigo-500/20',
  },
];

export default function CommunitySection() {
  return (
    <section id="community" className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <span className="px-3.5 py-1 rounded-full bg-violet-950/80 border border-violet-500/40 text-violet-300 font-mono text-xs uppercase tracking-widest mb-3">
          Sohbet & Katılım
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Topluluk & Gruplar
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mt-3">
          Geliştirme süreçlerine ortak olmak, fikir paylaşmak ve etkinliklere katılmak için topluluğumuza adım atın.
        </p>
      </div>

      {/* Community Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {COMMUNITIES.map((item) => {
          const Icon = item.icon;
          return (
            <motion.a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`glass-panel p-8 rounded-3xl border border-white/10 ${item.borderHover} transition-all duration-300 shadow-xl ${item.shadowGlow} flex flex-col justify-between group cursor-pointer relative overflow-hidden`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.gradient} p-[1px] shadow-lg group-hover:scale-105 transition-transform`}>
                  <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-slate-300 group-hover:text-white transition-colors">
                  {item.badge}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span>{item.title}</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-cyan-400" />
                </h3>
                <p className="text-slate-300 text-sm mt-2 font-medium">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-cyan-300">
                <span>Topluluğa Katıl</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
