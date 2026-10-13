import React, { useState, useEffect, useCallback } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import LoreModal from './components/LoreModal';
import ContactSection from './components/ContactSection';
import YxShotApp from './components/yxshot/YxShotApp';

export default function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [isLoreOpen, setIsLoreOpen] = useState(false);
  const closeLore = useCallback(() => setIsLoreOpen(false), []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // YX Shot Sub-Application Route (/yxshot)
  if (currentPath === '/yxshot' || currentPath.startsWith('/yxshot/')) {
    return <YxShotApp onBackToPortfolio={() => navigate('/')} />;
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-ink font-sans text-paper selection:bg-paper selection:text-ink">
        <Navbar />

        <main>
          <HeroSection />

          <ProjectsSection
            onOpenLore={() => setIsLoreOpen(true)}
            onNavigateToYxShot={() => navigate('/yxshot')}
          />

          <AboutSection />
        </main>

        <ContactSection />

        <LoreModal isOpen={isLoreOpen} onClose={closeLore} />

        <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.055]" />
      </div>
    </MotionConfig>
  );
}
