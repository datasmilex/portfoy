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
  },
  {
    title: 'Discord Sunucumuz',
    subtitle: 'Topluluğa katıl & sohbet et.',
    url: 'https://discord.com/invite/Bgpnjzx2bc',
    badge: 'Discord Server',
    icon: MessageSquare,
  },
];

export default function CommunitySection() {
  return (
    <section id="community" className="relative z-10 py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
          Topluluk & Gruplar
        </h2>
        <p className="text-zinc-400 text-sm md:text-base max-w-xl mt-3 text-balance">
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
              whileHover={{ y: -4 }}
              className="rounded-none bg-zinc-900/40 p-8 border border-zinc-800/80 hover:border-zinc-600 transition-colors flex flex-col justify-between group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-6">
                <Icon className="w-8 h-8 text-zinc-300 group-hover:scale-105 transition-transform" />
                <span className="px-3 py-1 rounded-none text-xs font-mono bg-zinc-950 border border-zinc-800 text-zinc-300 group-hover:text-white transition-colors">
                  {item.badge}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors flex items-center gap-2">
                  <span>{item.title}</span>
                  <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-zinc-400 text-sm mt-2 font-normal">
                  {item.subtitle}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-white">
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
