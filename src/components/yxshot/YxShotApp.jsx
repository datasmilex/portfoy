import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import Header from './Header';
import LightningDownloadButton from './LightningDownloadButton';
import VideoPreview from './VideoPreview';
import HistoryList from './HistoryList';
import FAQSection from './FAQSection';
import BottomNav from './BottomNav';
import { useYxShotStore } from '../../store/useYxShotStore';

export default function YxShotApp({ onBackToPortfolio }) {
  const { activeMedia, currentTab } = useYxShotStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'YX Shot - Reels & Video İndirici | Yunovax';
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white relative overflow-x-hidden">
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header Navigation */}
        <Header onBackToPortfolio={onBackToPortfolio} />

        {/* Main View Area */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-4 pb-28 sm:pb-24 flex flex-col">
          {/* TAB 1: Home / 1-Click Lightning Downloader */}
          {currentTab === 'home' && (
            <div className="flex-1 flex flex-col items-center justify-center my-auto min-h-[60vh] gap-8">
              {/* Centerpiece Hero Lightning Button */}
              <LightningDownloadButton />

              {/* Active Video Preview Card (Shows once fetched/downloaded) */}
              {activeMedia && (
                <div className="w-full pt-4 animate-in fade-in duration-300">
                  <VideoPreview media={activeMedia} />
                </div>
              )}
            </div>
          )}

          {/* TAB 2: History */}
          {currentTab === 'history' && (
            <div className="pt-6 sm:pt-10">
              <HistoryList />
            </div>
          )}

          {/* TAB 3: FAQ */}
          {currentTab === 'faq' && (
            <div className="pt-6 sm:pt-10">
              <FAQSection />
            </div>
          )}
        </main>

        {/* Persistent Bottom Navigation Tabs */}
        <BottomNav />
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
