# Aether Fleet Template — Agentic Engineering System

Agent-usable **website fleet starter**: a polished marketing landing plus a live **Fleet Theme Studio** that retokens colors, fonts, radius, density, glow, and glass across the whole site.

Inspired by premium course-site UX patterns — **all branding and copy are original**.

## Stack

- Vite + React 19 + TypeScript
- React Router (`/` landing, `/dashboard` Theme Studio)
- Tailwind CSS v4 (`@tailwindcss/vite`) with **CSS-variable design tokens**
- Google Fonts injected by the theme engine

## Quick start

```bash
npm install
npm run dev
```

| Route | Purpose |
|-------|---------|
| `/` | Marketing landing (all existing sections, themed) |
| `/dashboard` | **Fleet Theme Studio** — live controls, export/import, copy-for-agent |
| `/?theme=ocean-teal` | Load a preset from `public/themes/` |

```bash
npm run build
npm run preview
```

## Fleet / template usage

Agents: follow **[`AGENT_TEMPLATE.md`](./AGENT_TEMPLATE.md)**.

1. Copy this repo  
2. Drop `public/themes/<slug>.json` (schema: `src/theme/agent-schema.json`)  
3. Edit copy in `src/content/site.ts`  
4. `npm i && npm run build`

### Theme Studio features

- Live preview (hero, buttons, cards, glass)
- Color pickers for every color + gradient token
- Google font selectors (sans + mono) with live `<link>` injection
- Preset buttons: `aether-purple`, `ocean-teal`, `sunset-rose`
- Brand name / tagline / logo text
- Radius fields + density (comfortable / compact)
- Glow + glass sliders
- **Export JSON** · **Import JSON** · **Copy for agent** · Save (`localStorage` key `aether-fleet-theme`) · Reset

### Tunable attributes

`brand` · `colors` (12) · `gradients` (5) · `fonts` · `radius` · `spacingDensity` · `effects.glowIntensity` · `effects.glassOpacity`

## Project layout

```
src/
  content/site.ts          # Agent-facing marketing copy
  theme/
    tokens.ts              # ThemeTokens type + font catalog
    applyTheme.ts          # Sets CSS vars on :root
    ThemeProvider.tsx      # Context + useTheme()
    defaults.ts            # Inlined aether-purple
    agent-schema.json      # JSON Schema for agents
  pages/
    Landing.tsx
    Dashboard.tsx          # Fleet Theme Studio
  components/              # Landing sections (token-aware)
  index.css                # Utilities bound to CSS variables
public/themes/             # Preset JSON themes
AGENT_TEMPLATE.md          # Agent contract
```

## Note

Pricing CTAs are demo-only (`alert`). No backend or checkout.
