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

export default function App() {
  const [isGravityOn, setIsGravityOn] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isLoreOpen, setIsLoreOpen] = useState(false);

  const toggleGravity = () => {
    setIsGravityOn((prev) => !prev);
  };

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

  return (
    <div className="relative min-h-screen bg-[#0A0A0C] text-slate-100 overflow-x-hidden selection:bg-violet-600/30 selection:text-cyan-300">
      {/* Antigravity Physics Interactive Hero Canvas */}
      <AntigravityCanvas isGravityOn={isGravityOn} />

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

          <ProjectsSection onOpenLore={() => setIsLoreOpen(true)} />

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
