import React from 'react';
import { Download, History, HelpCircle } from 'lucide-react';
import { useYxShotStore } from '../../store/useYxShotStore';

export default function BottomNav() {
  const { currentTab, setCurrentTab, history } = useYxShotStore();

  const tabs = [
    { id: 'home', label: 'İndir', icon: Download },
    {
      id: 'history',
      label: 'Geçmiş',
      icon: History,
      badge: history.length > 0 ? history.length : null,
    },
    { id: 'faq', label: 'SSS', icon: HelpCircle },
  ];

  return (
    <nav
      aria-label="Alt Sekmeler"
      className="fixed bottom-0 sm:bottom-6 left-0 right-0 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-40 bg-zinc-950/95 sm:bg-zinc-900/90 backdrop-blur-md border-t sm:border border-zinc-800 sm:rounded-2xl sm:shadow-2xl px-4 py-2 sm:py-1.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-all"
    >
      <div className="flex items-center justify-around sm:justify-center sm:gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex sm:flex-row flex-col items-center gap-1 sm:gap-2 relative py-1.5 px-4 sm:px-5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-zinc-800/80 text-white font-medium shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
              }`}
            >
              <div className="relative flex items-center">
                <Icon className={`w-4 h-4 ${isActive ? 'scale-110 text-white' : 'text-zinc-400'}`} />
                {tab.badge && (
                  <span className="absolute -top-2 -right-3 px-1.5 py-0.2 bg-purple-500 text-white rounded-full text-xs font-mono font-bold">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-xs">{tab.label}</span>
              {isActive && (
                <span className="sm:hidden w-1 h-1 rounded-full bg-white absolute bottom-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
