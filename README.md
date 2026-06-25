# econz Cloud — Marketing Landing Page

Production-grade Next.js 15 marketing site for **econz**, a Google Cloud Premier Partner.

## Tech Stack

- Next.js 15 (App Router) + React 19 + TypeScript (strict)
- CSS Modules + global design tokens
- `next/font/google` (Space Grotesk + Manrope)
- Canvas API particle engine (no animation libraries)

## Local Development

```bash
npm install
npm run dev       # http://localhost:3000
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint via next lint |
| `npm run typecheck` | TypeScript check (no emit) |

## Structure

```
app/              # layout, page, SEO (sitemap, robots)
components/
  layout/         # Navbar, Footer
  sections/       # Hero, ClientMarquee, Stats, Problems,
                  # Solutions, Values, Testimonials, Partners, CtaBanner
  ui/             # Button, Logo, Eyebrow, GradientText
  effects/        # ScrollProgress, AmbientBackground, Reveal
  hero/           # HeroCanvas (particle mesh + data orb)
lib/
  data/           # site.ts (brand/nav/SEO), content.ts (all copy)
  hooks/          # useMediaQuery, usePrefersReducedMotion, useReveal, useCountUp
```

## Deploy to Vercel

### Option A — GitHub import
1. `git init && git add -A && git commit -m "init"` then push to GitHub.
2. Import on [vercel.com](https://vercel.com) — the Next.js preset requires no config.

### Option B — Vercel CLI
```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

### Before going live
- Set `siteConfig.url` in `lib/data/site.ts` to your deployed domain.
- Replace `public/og.png` (1200×630) and `app/favicon.ico` with real assets.
