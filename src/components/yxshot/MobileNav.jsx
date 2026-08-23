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
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-2xl border-t border-white/10 px-6 py-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
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
              className={`flex flex-col items-center gap-1 relative py-1 px-4 rounded-xl transition-all ${
                isActive ? 'text-pink-400 font-bold' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 bg-pink-600 text-white rounded-full text-[10px] font-bold">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px]">{tab.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-pink-500 absolute bottom-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
