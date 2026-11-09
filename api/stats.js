// Live project numbers: Roblox visits / players / thumbnail, Google Play installs.
// GET /api/stats?roblox=placeId,placeId&play=com.package.id
// Cached at the edge for 1 hour.

async function json(url) {
  const r = await fetch(url, { headers: { accept: 'application/json' } });
  if (!r.ok) throw new Error(`${url} -> ${r.status}`);
  return r.json();
}

async function robloxStats(placeIds) {
  const out = {};
  const universes = {};
  await Promise.all(
    placeIds.map(async (placeId) => {
      try {
        const { universeId } = await json(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
        if (universeId) universes[universeId] = placeId;
      } catch {
        /* skip this game */
      }
    })
  );
  const ids = Object.keys(universes);
  if (!ids.length) return out;

  const [games, thumbs] = await Promise.all([
    json(`https://games.roblox.com/v1/games?universeIds=${ids.join(',')}`).catch(() => ({ data: [] })),
    json(
      `https://thumbnails.roblox.com/v1/games/multiget/thumbnails?universeIds=${ids.join(',')}&countPerUniverse=1&size=768x432&format=Png`
    ).catch(() => ({ data: [] })),
  ]);

  for (const g of games.data || []) {
    out[universes[g.id]] = { visits: g.visits, playing: g.playing, favorites: g.favoritedCount };
  }
  for (const t of thumbs.data || []) {
    const placeId = universes[t.universeId];
    const img = t.thumbnails?.[0]?.imageUrl;
    if (placeId && img) out[placeId] = { ...out[placeId], image: img };
  }
  return out;
}

async function playStats(appIds) {
  const out = {};
  await Promise.all(
    appIds.map(async (id) => {
      try {
        const r = await fetch(`https://play.google.com/store/apps/details?id=${encodeURIComponent(id)}&hl=en&gl=US`);
        if (!r.ok) return;
        const html = await r.text();
        const installs = html.match(/>([\d.,]+[KMB]?\+)<\/div><div[^>]*>Downloads</)?.[1];
        const rating = html.match(/>([0-5]\.\d)<\/div>[\s\S]{0,400}?star/)?.[1];
        const icon = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
        out[id] = { installs: installs || null, rating: rating || null, image: icon || null };
      } catch {
        /* skip */
      }
    })
  );
  return out;
}

const clean = (v) =>
  String(v || '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => /^[\w.]+$/.test(s))
    .slice(0, 10);

export default async function handler(req, res) {
  const roblox = clean(req.query.roblox);
  const play = clean(req.query.play);

  const [r, p] = await Promise.all([robloxStats(roblox), playStats(play)]);

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).json({ roblox: r, play: p });
}
