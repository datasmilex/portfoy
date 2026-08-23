import { create } from 'zustand';

const HISTORY_KEY = 'yx_shot_history_v1';

function getInitialHistory() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export const useYxShotStore = create((set) => ({
  activeMedia: null,
  isLoading: false,
  downloadProgress: 0,
  history: getInitialHistory(),
  currentTab: 'home',

  setActiveMedia: (media) => set({ activeMedia: media }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setDownloadProgress: (progress) => set({ downloadProgress: progress }),
  setCurrentTab: (tab) => set({ currentTab: tab }),

  addToHistory: (media) =>
    set((state) => {
      if (!media || !media.shortcode) return state;
      const filtered = state.history.filter((i) => i.shortcode !== media.shortcode);
      const updated = [media, ...filtered].slice(0, 50);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('History save error:', e);
      }
      return { history: updated };
    }),

  removeFromHistory: (shortcode) =>
    set((state) => {
      const updated = state.history.filter((i) => i.shortcode !== shortcode);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('History remove error:', e);
      }
      return { history: updated };
    }),

  clearHistory: () => {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.error('History clear error:', e);
    }
    set({ history: [] });
  },
}));
