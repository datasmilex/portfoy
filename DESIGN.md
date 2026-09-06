# Design System (DESIGN.md)

This document formalizes the design tokens, rules, and visual vocabulary for Yunus Emre Gedik's personal portfolio and tools ecosystem (Yunovax & YX Shot), following the standards defined by [impeccable.style](https://impeccable.style).

---

## 1. Aesthetic Principles
- **Intentional & Confident:** No AI slop, no unmotivated multi-stop rainbow gradients, no blurry ambient orbs, and no decorative dot-matrix grids.
- **Dark Tinted Neutrals:** Avoid pure `#000` void black. Use rich zinc dark neutrals (`zinc-950` `#09090b` base, `zinc-900` elevated surfaces).
- **Typographic Hierarchy:** Strong, crisp contrast between display headings, section subtitles, and body text. No tracked uppercase kicker pills borrowing unearned authority.
- **Form Follows Function:** Icons sit in flow beside text, never inside redundant stacked container tiles. Primary CTAs have unmistakable visual weight and clear contrast.

---

## 2. Color Palette & Tokens

### Base & Surfaces
- **App Background:** `var(--bg-surface)` / `zinc-950` (`#09090b`)
- **Card Background:** `zinc-900/40` (`#18181b` with alpha)
- **Header / Nav Background:** `zinc-950/85` with `backdrop-blur-md`
- **Elevated Surfaces:** `zinc-900` (`#18181b`)
- **Interactive Hover Surfaces:** `zinc-800/80` (`#27272a`)

### Borders & Dividers
- **Default Borders:** `border-zinc-800/80` (`rgba(39, 39, 42, 0.8)`)
- **Hover / Active Borders:** `border-zinc-600` (`#52525b`)
- **Focus Rings:** `focus-within:border-zinc-500`

### Text & Contrast
- **Primary Headings & Titles:** `text-white` (`#ffffff`)
- **High Emphasis Body:** `text-zinc-200` (`#e4e4e7`)
- **Secondary / Descriptive Text:** `text-zinc-400` (`#a1a1aa`)
- **Muted Labels & Metadata:** `text-zinc-500` (`#71717a`)
- **Minimum Readable Font Size:** `12px` (`text-xs`). Zero text under 11px.

### Action Colors
- **Primary CTA:** Solid White (`#ffffff`) with `text-zinc-950` (`#09090b`), hover `bg-zinc-200`.
- **Secondary Actions:** `bg-zinc-800` border `border-zinc-700`, text `text-zinc-200`.
- **Status Badges:** `bg-zinc-800` border `border-zinc-700` text `text-zinc-300`, success `text-emerald-400`.

---

## 3. Typography Scale
- **Display Headings (H1):** `text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight`
- **Section Titles (H2):** `text-3xl md:text-5xl font-bold tracking-tight`
- **Card / Item Titles (H3):** `text-xl font-bold tracking-wide`
- **Sub-headings / Body (H4, p):** `text-base` / `text-sm leading-relaxed`
- **Mono / Metadata / Labels:** `text-xs font-mono`

---

## 4. Anti-Patterns Strictly Prohibited
- ❌ No multi-stop gradient text (`bg-clip-text text-transparent bg-gradient-to-r...`).
- ❌ No AI rainbow gradient borders or buttons (purple via pink to amber).
- ❌ No decorative grid/radial-dot patterns covering cards.
- ❌ No decorative kicker/eyebrow pills stacked directly above headlines.
- ❌ No blurry floating glow orbs (`blur-xl rounded-full scale-150`).
- ❌ No nested icon tiles inside parent tiles.
- ❌ No micro text under 11px.
