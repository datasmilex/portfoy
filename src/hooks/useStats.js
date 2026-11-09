import { useEffect, useState } from 'react';
import { PROJECTS } from '../data/portfolio';

const roblox = PROJECTS.map((p) => p.robloxPlaceId).filter(Boolean);
const play = PROJECTS.map((p) => p.playStoreId).filter(Boolean);

let cache = null;

/** Live numbers from /api/stats. Returns { roblox: {placeId: {...}}, play: {appId: {...}} } or empty objects. */
export default function useStats() {
  const [stats, setStats] = useState(cache || { roblox: {}, play: {} });

  useEffect(() => {
    if (cache || (!roblox.length && !play.length)) return;
    const ctrl = new AbortController();
    fetch(`/api/stats?roblox=${roblox.join(',')}&play=${play.join(',')}`, { signal: ctrl.signal })
      .then((r) => (r.ok && r.headers.get('content-type')?.includes('json') ? r.json() : null))
      .then((data) => {
        if (data) {
          cache = { roblox: data.roblox || {}, play: data.play || {} };
          setStats(cache);
        }
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  return stats;
}

export function formatCount(n, lang) {
  if (typeof n !== 'number') return n;
  return new Intl.NumberFormat(lang === 'en' ? 'en' : 'tr', { notation: 'compact', maximumFractionDigits: 1 }).format(n);
}
