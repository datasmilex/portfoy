import React, { useEffect } from 'react';
import { Sparkles, Shield, Zap, History, HelpCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-[#050507] text-slate-100 flex flex-col font-sans selection:bg-pink-500/30 selection:text-white relative overflow-x-hidden">
      
      {/* Background Ambience Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-700/20 via-pink-600/20 to-amber-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 -left-40 w-[400px] h-[300px] bg-pink-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-0 w-[450px] h-[350px] bg-purple-900/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header Navigation */}
        <Header onBackToPortfolio={onBackToPortfolio} />

        {/* Main Content Area */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-6 pb-24 sm:pb-16 flex flex-col gap-10">
          
          {/* Desktop Tab Switcher */}
          <div className="hidden sm:flex items-center justify-center gap-2">
            <div className="p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-1 shadow-lg">
              <button
                onClick={() => setCurrentTab('home')}
                className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  currentTab === 'home'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Video İndir</span>
              </button>

              <button
                onClick={() => setCurrentTab('history')}
                className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  currentTab === 'history'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Geçmiş</span>
              </button>

              <button
                onClick={() => setCurrentTab('faq')}
                className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  currentTab === 'faq'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
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
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Filigransız & Orijinal HD Kalite</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Reels & Video{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300">
                    İndirici
                  </span>
                </h1>

                <p className="text-xs sm:text-base text-gray-400 max-w-lg mx-auto leading-relaxed">
                  Sosyal medya Reels, Shorts ve videolarını tek tıkla doğrudan cihazınıza indirin.
                </p>
              </div>

              {/* Link Input Card */}
              <LinkInput />

              {/* Skeleton Loader during fetch */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-lg mx-auto rounded-3xl bg-white/5 border border-white/10 p-6 space-y-4 shadow-2xl backdrop-blur-xl animate-pulse"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10" />
                      <div className="space-y-2 flex-1">
                        <div className="h-3.5 bg-white/10 rounded w-1/3" />
                        <div className="h-2.5 bg-white/10 rounded w-1/4" />
                      </div>
                    </div>
                    <div className="w-full aspect-[9/12] max-h-[380px] bg-white/10 rounded-2xl flex flex-col items-center justify-center gap-2">
                      <Sparkles className="w-8 h-8 text-pink-500/40 animate-spin" />
                      <span className="text-xs text-gray-400 font-mono">Video Bilgileri Çözümleniyor...</span>
                    </div>
                    <div className="h-12 bg-white/10 rounded-2xl w-full" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active Media Result Preview */}
              {!isLoading && activeMedia && (
                <div className="pt-2">
                  <VideoPreview media={activeMedia} />
                </div>
              )}

              {/* Value Props Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto pt-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Yüksek Hız</h4>
                    <p className="text-[11px] text-gray-400">Doğrudan CDN akışı</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Güvenli & Gizli</h4>
                    <p className="text-[11px] text-gray-400">Kayıtsız ve şifresiz</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">1080p HD</h4>
                    <p className="text-[11px] text-gray-400">Orijinal kalitede MP4</p>
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
        <footer className="border-t border-white/10 bg-black/60 py-6 px-4 text-center text-xs text-gray-400 mb-14 sm:mb-0">
          <div className="max-w-4xl mx-auto space-y-2">
            <p className="font-mono text-gray-300">
              © {new Date().getFullYear()} YX Shot • Yunovax Lab
            </p>
            <p className="text-[11px] text-gray-400">
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
            borderRadius: '16px',
            background: '#0e0e12',
            border: '1px solid rgba(255,255,255,0.15)',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}
