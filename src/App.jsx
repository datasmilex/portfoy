import React, { useState, useEffect } from 'react';
import AntigravityCanvas from './components/AntigravityCanvas';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import TechArsenal from './components/TechArsenal';
import CommunitySection from './components/CommunitySection';
import LoreModal from './components/LoreModal';
import DeveloperTerminal from './components/DeveloperTerminal';
import ContactSection from './components/ContactSection';
import YxShotApp from './components/yxshot/YxShotApp';

export default function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [isGravityOn, setIsGravityOn] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isLoreOpen, setIsLoreOpen] = useState(false);

  const toggleGravity = () => {
    setIsGravityOn((prev) => !prev);
  };

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // YX Shot Sub-Application Route (/yxshot)
  if (currentPath === '/yxshot' || currentPath.startsWith('/yxshot/')) {
    return <YxShotApp onBackToPortfolio={() => navigate('/')} />;
  }

  return (
    <div className="relative min-h-screen bg-[#050505] text-slate-200 overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Antigravity Physics Interactive Hero Canvas */}
      <AntigravityCanvas isGravityOn={isGravityOn} />

      {/* SEO Hidden Text */}
      <h1 className="sr-only">
        Yunus Emre Gedik Portföy - UI/UX Designer & Interactive Developer. Yunus Emre Gedik, Yunovax Portföy, Roblox Developer Yunus Emre Gedik.
      </h1>

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          isGravityOn={isGravityOn}
          toggleGravity={toggleGravity}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        <main className="flex-1">
          <HeroSection
            isGravityOn={isGravityOn}
            toggleGravity={toggleGravity}
            onOpenTerminal={() => setIsTerminalOpen(true)}
          />

          <ProjectsSection
            onOpenLore={() => setIsLoreOpen(true)}
            onNavigateToYxShot={() => navigate('/yxshot')}
          />

          <TechArsenal />

          <CommunitySection />

          <ContactSection />
        </main>

        {/* Cinematic Lore Modal for The Pier */}
        <LoreModal isOpen={isLoreOpen} onClose={() => setIsLoreOpen(false)} />

        {/* Developer Terminal CLI Easter Egg */}
        <DeveloperTerminal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          toggleGravity={toggleGravity}
        />
      </div>
    </div>
  );
}

