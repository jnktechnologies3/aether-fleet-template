# Aether Fleet Template — Agentic Engineering System

Agent-usable **website fleet starter**: a polished marketing landing plus a multi-panel **Fleet Dashboard** for managing look-and-feel across a local site fleet.

Inspired by premium course-site UX patterns — **all branding and copy are original**.

## Stack

- Vite + React 19 + TypeScript
- React Router (`/` landing, `/dashboard/*` Fleet Dashboard)
- Tailwind CSS v4 (`@tailwindcss/vite`) with **CSS-variable design tokens**
- Google Fonts injected by the theme engine

## Quick start

```bash
npm install
npm run dev
```

| Route | Purpose |
|-------|---------|
| `/` | Marketing landing (all sections, themed) |
| `/dashboard` | **Overview** — fleet stats, quick actions, recent activity |
| `/dashboard/theme` | **Theme Studio** — live token controls, export/import, library save |
| `/dashboard/fleet` | **Fleet** — site registry + theme library + assignments |
| `/dashboard/agent` | **Agent Kit** — schema, briefs, downloadable theme JSON |
| `/?theme=ocean-teal` | Load a preset from `public/themes/` |

```bash
npm run build
npm run preview
```

## Fleet Dashboard

Top bar: brand mark, “Fleet Dashboard”, link back to landing preview.  
Left nav: **Overview** · **Theme Studio** · **Fleet** · **Agent Kit**.

### Overview

- Stats: sites in fleet (local registry), active theme name, token count, last saved time
- Quick actions: Open Theme Studio, Export theme, Copy agent prompt, Preview landing, Save, Manage fleet
- Recent activity list (local only — theme saves, imports, preset loads, site edits, assignments)

### Theme Studio

- Live preview (hero, buttons, cards, glass)
- Color pickers for every color + gradient token
- Google font selectors (sans + mono) with live `<link>` injection
- Presets: `aether-purple`, `ocean-teal`, `sunset-rose`
- Brand name / tagline / logo text
- Radius + density (comfortable / compact)
- Glow + glass sliders
- Sticky save bar: **Save** · **Export** · **Import** · **Copy for agent** · **Reset**
- **Save current as…** → named snapshot in the theme library (`aether-fleet-theme-library`)
- Current working theme persisted at `localStorage` key `aether-fleet-theme`

### Fleet

- Local **fleet registry** (`aether-fleet-sites`): `{ id, name, slug, url?, notes?, themeId? }`
- Seeded with 3 editable placeholders: Aether Course, Movie Nexus Marketing, Login-X Docs
- Add / edit / delete sites
- Per site: assign a saved theme or preset; **Apply theme to site** confirms locally
- Theme library lists presets + user snapshots (manage/remove saved entries)
- UI note: assignments are client-side; agents still use exported JSON per site

### Agent Kit

- JSON schema summary (+ expandable full `agent-schema.json`)
- One-click **Copy full agent brief** (clone → drop theme → edit `site.ts`)
- Download `theme.json` and `fleet-agent-brief.md`
- In-app `AGENT_TEMPLATE.md` viewer + copy
- Recommended spin-up prompt snippet

## Fleet / template usage

Agents: follow **[`AGENT_TEMPLATE.md`](./AGENT_TEMPLATE.md)`**.

1. Copy this repo  
2. Drop `public/themes/<slug>.json` (schema: `src/theme/agent-schema.json`)  
3. Edit copy in `src/content/site.ts`  
4. `npm i && npm run build`

### Tunable attributes

`brand` · `colors` (12) · `gradients` (5) · `fonts` · `radius` · `spacingDensity` · `effects.glowIntensity` · `effects.glassOpacity`

### localStorage keys

| Key | Purpose |
|-----|---------|
| `aether-fleet-theme` | Active Theme Studio theme |
| `aether-fleet-sites` | Fleet site registry |
| `aether-fleet-theme-library` | Named theme snapshots |
| `aether-fleet-activity` | Recent activity feed |
| `aether-fleet-last-saved` | Last theme save ISO timestamp |

## Project layout

```
src/
  content/site.ts              # Agent-facing marketing copy
  fleet/
    types.ts                   # FleetSite, library, activity types
    storage.ts                 # localStorage helpers + seeds
  theme/
    tokens.ts                  # ThemeTokens type + font catalog
    applyTheme.ts              # Sets CSS vars on :root
    ThemeProvider.tsx          # Context + useTheme()
    defaults.ts                # Inlined aether-purple
    agent-schema.json          # JSON Schema for agents
  pages/
    Landing.tsx
    Dashboard.tsx              # Fleet Dashboard shell (top bar + left nav)
    dashboard/
      OverviewPanel.tsx
      ThemeStudioPanel.tsx
      FleetPanel.tsx
      AgentKitPanel.tsx
      studioShared.tsx
  components/                  # Landing sections (token-aware)
  index.css                    # Utilities bound to CSS variables
public/themes/                 # Preset JSON themes
AGENT_TEMPLATE.md              # Agent contract
```

## Note

Pricing CTAs are demo-only (`alert`). No backend or checkout — fleet registry and theme library are browser-local.
