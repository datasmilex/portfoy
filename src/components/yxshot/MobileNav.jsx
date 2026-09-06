import React from 'react';
import { Home, History, HelpCircle } from 'lucide-react';
import { useYxShotStore } from '../../store/useYxShotStore';

export default function MobileNav() {
  const { currentTab, setCurrentTab, history } = useYxShotStore();

  const tabs = [
    { id: 'home', label: 'İndir', icon: Home },
    { id: 'history', label: 'Geçmiş', icon: History, badge: history.length > 0 ? history.length : null },
    { id: 'faq', label: 'SSS', icon: HelpCircle },
  ];

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-md border-t border-zinc-800/80 px-6 py-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-around">
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
              className={`flex flex-col items-center gap-1 relative py-1 px-4 rounded-lg transition-colors ${
                isActive ? 'text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-105' : ''} transition-transform`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 bg-white text-zinc-950 rounded-full text-xs font-mono font-bold">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-xs">{tab.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-white absolute bottom-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
