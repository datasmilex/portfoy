import React, { createContext, useContext, useEffect, useState } from 'react';

const LangContext = createContext({ lang: 'tr', setLang: () => {} });

function initialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'tr' || saved === 'en') return saved;
  } catch {
    /* storage unavailable */
  }
  if (typeof navigator !== 'undefined' && !navigator.language?.toLowerCase().startsWith('tr')) return 'en';
  return 'tr';
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

/** Returns { lang, setLang, t } where t picks the current language from a {tr, en} object (or returns strings as-is). */
export function useLang() {
  const { lang, setLang } = useContext(LangContext);
  const t = (value) => (value && typeof value === 'object' ? value[lang] ?? value.tr : value);
  return { lang, setLang, t };
}
