import React, { useEffect } from 'react';
import { Shield, Zap, History, HelpCircle, Film, ArrowDownToLine } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import Header from './Header';
import LinkInput from './LinkInput';
import VideoPreview from './VideoPreview';
import HistoryList from './HistoryList';
import FAQSection from './FAQSection';
import MobileNav from './MobileNav';
import { useYxShotStore } from '../../store/useYxShotStore';

export default function YxShotApp({ onBackToPortfolio }) {
  const { activeMedia, isLoading, currentTab, setCurrentTab } = useYxShotStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'YX Shot - Reels & Shorts Video İndirici | Yunovax';
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white relative overflow-x-hidden">
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header Navigation */}
        <Header onBackToPortfolio={onBackToPortfolio} />

        {/* Main Content Area */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-8 pb-24 sm:pb-16 flex flex-col gap-10">
          
          {/* Desktop Tab Switcher */}
          <div className="hidden sm:flex items-center justify-center">
            <div className="p-1 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-1">
              <button
                onClick={() => setCurrentTab('home')}
                className={`px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  currentTab === 'home'
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <ArrowDownToLine className="w-3.5 h-3.5" />
                <span>Video İndir</span>
              </button>

              <button
                onClick={() => setCurrentTab('history')}
                className={`px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  currentTab === 'history'
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Geçmiş</span>
              </button>

              <button
                onClick={() => setCurrentTab('faq')}
                className={`px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  currentTab === 'faq'
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>SSS</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Home / Downloader */}
          {currentTab === 'home' && (
            <div className="flex flex-col gap-10">
              {/* Hero Banner */}
              <div className="text-center space-y-3 pt-2 sm:pt-4">
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                  Reels & Video İndirici
                </h1>

                <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto leading-relaxed text-balance">
                  Sosyal medya Reels, Shorts ve videolarını doğrudan cihazınıza yüksek kalitede indirin.
                </p>
              </div>

              {/* Link Input Card */}
              <LinkInput />

              {/* Skeleton Loader during fetch */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="w-full max-w-lg mx-auto rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 space-y-4 shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 animate-pulse" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3.5 bg-zinc-800 rounded w-1/3 animate-pulse" />
                        <div className="h-2.5 bg-zinc-800/60 rounded w-1/4 animate-pulse" />
                      </div>
                    </div>
                    <div className="w-full aspect-[9/12] max-h-[380px] bg-zinc-950 rounded-xl flex flex-col items-center justify-center gap-3 border border-zinc-800/50">
                      <img
                        src="/favicon.svg"
                        alt="Yunovax Logo"
                        className="w-10 h-10 animate-bounce"
                      />
                      <span className="text-xs text-zinc-300 font-mono tracking-wider font-semibold">Video Çözümleniyor...</span>
                    </div>
                    <div className="h-12 bg-zinc-800/80 rounded-xl w-full animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active Media Result Preview */}
              {!isLoading && activeMedia && (
                <div className="pt-2">
                  <VideoPreview media={activeMedia} />
                </div>
              )}

              {/* Value Props */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
                <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-center gap-3.5">
                  <Zap className="w-5 h-5 text-zinc-300 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Yüksek Hız</h4>
                    <p className="text-xs text-zinc-400">Doğrudan CDN akışı</p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-center gap-3.5">
                  <Shield className="w-5 h-5 text-zinc-300 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">Güvenli & Gizli</h4>
                    <p className="text-xs text-zinc-400">Kayıtsız ve şifresiz</p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-center gap-3.5">
                  <Film className="w-5 h-5 text-zinc-300 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-white">1080p HD</h4>
                    <p className="text-xs text-zinc-400">Orijinal kalitede MP4</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: History */}
          {currentTab === 'history' && (
            <div className="pt-2">
              <HistoryList />
            </div>
          )}

          {/* TAB 3: FAQ */}
          {currentTab === 'faq' && (
            <div className="pt-2">
              <FAQSection />
            </div>
          )}
        </main>

        {/* Bottom Mobile Tab Bar */}
        <MobileNav />

        {/* Footer */}
        <footer className="border-t border-zinc-800/80 bg-zinc-950 py-6 px-4 text-center text-xs text-zinc-400 mb-14 sm:mb-0">
          <div className="max-w-4xl mx-auto space-y-2">
            <p className="font-mono text-zinc-300">
              © {new Date().getFullYear()} YX Shot • Yunovax Lab
            </p>
            <p className="text-xs text-zinc-500">
              Bu uygulama herhangi bir sosyal medya platformu ile resmi olarak ilişkili değildir. Yalnızca herkese açık içerikleri indirmek amacıyla geliştirilmiştir.
            </p>
          </div>
        </footer>
      </div>

      {/* Global Toast Notifications */}
      <Toaster
        position="bottom-center"
        richColors
        closeButton
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: '12px',
            background: '#18181b',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}
