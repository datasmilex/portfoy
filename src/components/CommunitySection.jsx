import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Gamepad2, MessageSquare } from 'lucide-react';

const COMMUNITIES = [
  {
    title: 'Roblox Geliştirici Grubu',
    subtitle: 'Projeleri yakından takip et.',
    url: 'https://www.roblox.com/communities/3958018/yunovax#!/about',
    badge: 'Roblox Community',
    icon: Gamepad2,
    gradient: 'from-gray-700 to-gray-900',
    borderHover: 'hover:border-white',
    shadowGlow: '',
  },
  {
    title: 'Discord Sunucumuz',
    subtitle: 'Topluluğa katıl & sohbet et.',
    url: 'https://discord.com/invite/Bgpnjzx2bc',
    badge: 'Discord Server',
    icon: MessageSquare,
    gradient: 'from-gray-700 to-gray-900',
    borderHover: 'hover:border-white',
    shadowGlow: '',
  },
];

export default function CommunitySection() {
  return (
    <section id="community" className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <span className="px-3.5 py-1 rounded-none bg-[#111] border border-white/20 text-gray-300 font-mono text-xs uppercase tracking-widest mb-3">
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
              className={`rounded-none bg-[#0A0A0A] p-8 border border-white/20 ${item.borderHover} transition-all duration-300 shadow-none flex flex-col justify-between group cursor-pointer relative overflow-hidden`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-none bg-white/20 p-[1px] group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-[#050505] rounded-none flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <span className="px-3 py-1 rounded-none text-xs font-mono bg-[#111] border border-white/10 text-slate-300 group-hover:text-white transition-colors">
                  {item.badge}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors flex items-center gap-2">
                  <span>{item.title}</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-white" />
                </h3>
                <p className="text-slate-300 text-sm mt-2 font-medium">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400 group-hover:text-white">
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
