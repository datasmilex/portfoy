import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import SocialLinks from './SocialLinks';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const EMAIL = 'iletisim@yunovax.com.tr';

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);

    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#8b5cf6', '#06b6d4', '#ec4899'],
    });

    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <footer id="contact" className="relative z-10 py-20 px-4 md:px-8 border-t border-white/10 glass-panel mt-20">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Section Header: İletişim Bilgileri */}
        <span className="px-3.5 py-1.5 rounded-full bg-violet-950/90 border border-violet-500/40 text-violet-300 font-mono text-xs uppercase tracking-widest mb-4">
          Birlikte Çalışalım
        </span>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
          İletişim Bilgileri
        </h2>

        {/* Social Media Dock */}
        <div className="mb-10">
          <SocialLinks />
        </div>

        {/* Interactive Copy Email Button */}
        <div className="relative mb-12">
          <button
            onClick={handleCopy}
            className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-900/60 via-slate-900 to-indigo-900/60 border border-violet-500/40 hover:border-cyan-400 text-white font-mono text-sm md:text-base shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer"
          >
            <Mail className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold tracking-wide">{EMAIL}</span>
            <div className="ml-2 pl-3 border-l border-white/20 flex items-center gap-1.5 text-xs text-violet-300">
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-sans font-bold">Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400 group-hover:text-cyan-300" />
                  <span className="font-sans">Kopyala</span>
                </>
              )}
            </div>
          </button>

          {/* Toast Notification */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-emerald-500 text-slate-950 font-sans font-bold text-xs shadow-lg flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                E-posta adresi panoya kopyalandı!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>© 2026 Yunus Emre Gedik (Yunovax). Tüm Hakları Saklıdır.</span>
          </div>

          <div className="text-violet-400 font-medium hover:text-cyan-300 transition-colors">
            buraya bakacağını biliyordum :)
          </div>
        </div>

      </div>
    </footer>
  );
}
