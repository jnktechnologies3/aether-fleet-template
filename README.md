<p align="center">
  <img src="https://img.shields.io/badge/version-0.2.1-6366f1?style=flat-square" alt="Version" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square" alt="License" />
</p>

<h1 align="center">Aether Fleet Template</h1>

> An agent-usable **website fleet starter** from **Aether Lab** — polished marketing landing, CSS-variable design tokens, live **Theme Studio**, local **Fleet** registry, and an **Agent Kit** for spinning themed sites from JSON.

---

## Table of Contents

- [Core Features](#core-features)
- [All Features](#all-features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [npm](#npm)
  - [Docker](#docker)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Fleet Dashboard guide](./docs/FLEET_DASHBOARD.md)
- [Agent Contract](#agent-contract)
- [Version History](#version-history)
- [Roadmap](#roadmap)
- [License](#license)

---

## Core Features

| Feature | Description |
|---------|-------------|
| **Marketing Landing** | Full token-aware course-style landing (`/`) — hero, curriculum, pricing, FAQ, and more |
| **Design Tokens** | CSS variables for colors, gradients, fonts, radius, density, glow, and glass |
| **Theme Studio** | Live controls at `/dashboard/theme` — pickers, presets, export/import, library save |
| **Fleet Registry** | Local site list + theme assignments at `/dashboard/fleet` (browser `localStorage`) |
| **Agent Kit** | Schema, briefs, fleet pack download, spin-N prompt, and in-app [`AGENT_TEMPLATE.md`](./AGENT_TEMPLATE.md) |
| **Command palette** | `/` or `⌘K` — jump to panels + Save / Export actions (no extra deps) |
| **Settings** | Density, seeded tips toggle, danger reset of all fleet localStorage keys |
| **Preset Themes** | Ship with `aether-purple`, `ocean-teal`, `sunset-rose` under `public/themes/` |
| **Query Themes** | Load a preset with `/?theme=ocean-teal` on first mount |
| **Docker SPA** | Multi-stage Vite build served by nginx:alpine with React Router `try_files` |

---

## All Features

### Landing

- **Hero** — branded gradient hero with CTAs driven by `src/content/site.ts` + theme tokens
- **Problem / Middle Path** — narrative sections for the product story
- **Skills grid & terminal** — visual skill callouts and terminal-style demo
- **Curriculum / Workflow / Scenarios** — structured content blocks
- **Pricing** — tier cards (demo CTAs use `alert` — no checkout backend)
- **FAQ / Testimonials / Footer** — closing sections, all token-aware
- **Nav** — sticky navigation with brand chrome from theme `brand.*`

### Theme Studio

- **Live preview** — hero, buttons, cards, glass surfaces update as you edit
- **Color pickers** — every color + gradient token
- **Google Fonts** — sans + mono selectors with live `<link>` injection
- **Presets** — one-click `aether-purple`, `ocean-teal`, `sunset-rose`
- **Brand chrome** — name, tagline, logo text
- **Radius + density** — comfortable / compact spacing
- **Glow + glass** — intensity / opacity sliders
- **Sticky actions** — Save · Export · Import · Copy for agent · Reset
- **Library** — “Save current as…” named snapshots (`aether-fleet-theme-library`)
- **Compare mode** — side-by-side mini preview vs a selected preset
- **Duplicate theme** — auto-named copy into the library
- **Reset section** — colors / fonts / effects-only restore to defaults

### Fleet

- **Site registry** — `{ id, name, slug, url?, notes?, themeId? }` in `aether-fleet-sites`
- **Seeded placeholders** — Aether Course, Movie Nexus Marketing, Login-X Docs (editable)
- **CRUD** — add / edit / delete sites with inline slug validation
- **Bulk select** — apply one theme to the selection
- **Export / Import** — `fleet.json` (sites + library + optional activity/theme)
- **Assignments** — assign a saved theme or preset per site; apply confirms locally
- **Theme library** — presets + user snapshots (manage / remove)
- **Client-only note** — assignments stay in the browser; agents still use exported JSON per site

### Overview

- **Health cards** — Sites · Themes in library · Active theme · Last save
- **Fleet snapshot** table with theme pills + URL links
- **Quick theme apply** — one theme → all sites (confirm)
- **Activity feed** with clear
- **CTA row** — New site · Theme Studio · Export fleet pack

### Agent Kit

- **Fleet pack download** — `aether-fleet-pack.json` (`version`, `exportedAt`, `theme`, `sites`, `library`)
- **Spin N sites prompt** — copy using current fleet names
- **JSON schema summary** + expandable full `agent-schema.json`
- **Copy full agent brief** — clone → drop theme → edit `site.ts`
- **Downloads** — `theme.json` and `fleet-agent-brief.md`
- **In-app viewer** — [`AGENT_TEMPLATE.md`](./AGENT_TEMPLATE.md) + copy button
- **Spin-up prompt** — recommended agent checklist snippet

### Settings & chrome

- **Command palette** — `/` or `Cmd/Ctrl+K`
- **Settings** — density, show/hide seeded tips, reset all localStorage
- **Status pills / empty states** — consistent page headers across panels

### Design tokens

- **brand** — `name`, `tagline`, `logoText`
- **colors** — `bgDeep`, `bgMid`, `violet`, `purple`, `sky`, `cyan`, `text`, `textMuted`, `border`, `success`, `danger`, `cardBg`
- **gradients** — `heroFrom`, `heroTo`, `ctaFrom`, `ctaMid`, `ctaTo`
- **fonts** — sans / mono family + optional Google Fonts URL
- **radius** — `sm` / `md` / `lg` / `xl`
- **spacingDensity** — `comfortable` | `compact`
- **effects** — `glowIntensity` (0–1), `glassOpacity`
- **Apply path** — `ThemeProvider` → `applyTheme` sets CSS vars on `:root`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Bundler | Vite 8 |
| UI | React 19 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Language | TypeScript |
| Lint | Oxlint |
| Serve (prod) | nginx:alpine (Docker) or `vite preview` |

---

## Quick Start

### Prerequisites

- **Node.js 18+** — [download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** — [download](https://git-scm.com/)
- **Docker** (optional) — [download](https://www.docker.com/)

### npm

```bash
# 1. Clone
git clone https://github.com/jnktechnologies3/aether-fleet-template.git
cd aether-fleet-template

# 2. Install
npm install

# 3. Dev server
npm run dev
```

> Open **http://localhost:5173** — landing at `/`, Fleet Dashboard at `/dashboard`.

```bash
# Production build + local preview
npm run build
npm run preview
```

### Docker

```bash
docker compose up --build
```

> Open **http://localhost:8080**

The image is a static SPA: Vite `build` → copy `dist` into **nginx:alpine** with `try_files` for client-side routes.

---

## Environment Variables

This template is **client-only**. No server secrets are required.

| Variable / Key | Required | Description |
|----------------|----------|-------------|
| `VITE_*` | No | Optional Vite public vars (see [`.env.example`](./.env.example)) |
| `?theme=<slug>` | No | Query param — loads `public/themes/<slug>.json` on first mount |
| `aether-fleet-theme` | No | localStorage — active Theme Studio theme JSON |
| `aether-fleet-sites` | No | localStorage — fleet site registry |
| `aether-fleet-theme-library` | No | localStorage — named theme snapshots |
| `aether-fleet-activity` | No | localStorage — recent activity feed |
| `aether-fleet-last-saved` | No | localStorage — last theme save ISO timestamp |
| `aether-fleet-settings` | No | localStorage — dashboard density + tip visibility |

```bash
cp .env.example .env   # only needed if you add real VITE_* vars
```

---

## Project Structure

```
aether-fleet-template/
├── public/
│   └── themes/                 # Preset theme JSON (aether-purple, ocean-teal, sunset-rose)
├── screenshots/                # Optional marketing captures
├── docs/
│   ├── README.md               # Docs index
│   └── FLEET_DASHBOARD.md      # Operator guide for all dashboard panels
├── src/
│   ├── content/
│   │   ├── site.ts             # Agent-facing marketing copy
│   │   └── agentTemplate.ts    # Inlined AGENT_TEMPLATE for Agent Kit
│   ├── fleet/
│   │   ├── types.ts            # FleetSite, library, activity types + storage keys
│   │   └── storage.ts          # localStorage helpers + seeds
│   ├── theme/
│   │   ├── tokens.ts           # ThemeTokens + STORAGE_KEY
│   │   ├── applyTheme.ts       # Sets CSS vars on :root
│   │   ├── ThemeProvider.tsx   # Context + ?theme= honor
│   │   ├── defaults.ts         # Inlined aether-purple
│   │   └── agent-schema.json   # JSON Schema for agents
│   ├── pages/
│   │   ├── Landing.tsx
│   │   ├── Dashboard.tsx       # Fleet Dashboard shell
│   │   └── dashboard/
│   │       ├── OverviewPanel.tsx
│   │       ├── ThemeStudioPanel.tsx
│   │       ├── FleetPanel.tsx
│   │       ├── AgentKitPanel.tsx
│   │       ├── SettingsPanel.tsx
│   │       ├── CommandPalette.tsx
│   │       └── studioShared.tsx
│   ├── components/             # Landing sections (token-aware)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css               # Utilities bound to CSS variables
├── AGENT_TEMPLATE.md           # Agent clone / theme / copy contract
├── CHANGELOG.md
├── VERSION
├── LICENSE
├── Dockerfile                  # deps → vite build → nginx:alpine
├── docker-compose.yml          # aether-fleet on :8080
├── nginx.conf                  # SPA try_files
├── .env.example
└── package.json
```

---

## Usage

### Routes

| Route | Purpose |
|-------|---------|
| `/` | Marketing landing (all sections, themed) |
| `/dashboard` | **Overview** — fleet stats, quick actions, recent activity |
| `/dashboard/theme` | **Theme Studio** — live token controls, export/import, library |
| `/dashboard/fleet` | **Fleet** — site registry + theme library + assignments |
| `/dashboard/agent` | **Agent Kit** — fleet pack, schema, briefs, spin-N prompt |
| `/dashboard/settings` | **Settings** — density, tips, localStorage reset |
| `/?theme=ocean-teal` | Load a preset from `public/themes/` |

### Typical workflow

1. Open **Theme Studio**, tweak tokens, **Export** or **Save current as…**
2. Register sites under **Fleet** and assign themes (local only)
3. From **Agent Kit**, copy the brief or download `theme.json`
4. For a new site: clone → drop `public/themes/<slug>.json` → edit `src/content/site.ts` → `npm run build`

**Full guide:** [`docs/FLEET_DASHBOARD.md`](./docs/FLEET_DASHBOARD.md) — every panel, control, localStorage key, and workflow. Docs index: [`docs/README.md`](./docs/README.md).

---

## Agent Contract

Agents should follow **[`AGENT_TEMPLATE.md`](./AGENT_TEMPLATE.md)** — do not invent a parallel styling system.

1. Copy this repo  
2. Drop `public/themes/<slug>.json` (schema: `src/theme/agent-schema.json`)  
3. Edit copy in `src/content/site.ts`  
4. `npm i && npm run build`

---

## Version History

See **[CHANGELOG.md](./CHANGELOG.md)** for the full Keep a Changelog history.

| Version | Date | Highlights |
|---------|------|------------|
| **0.2.1** | 2026-09-24 | Docs — Fleet Dashboard operator guide (`docs/FLEET_DASHBOARD.md`) |
| **0.2.0** | 2026-09-24 | Ops console — overview health/snapshot, compare/duplicate, fleet import-export, fleet pack, command palette, settings |
| **0.1.0** | 2026-09-24 | Initial release — landing, tokens, Theme Studio, Fleet, Agent Kit, Docker |

---

## Roadmap

- [ ] **Multi-site remote sync** — optional backend or sync API for fleet registry beyond localStorage
- [ ] **Vercel / static hosting guide** — one-click deploy docs and `vercel.json` rewrites for SPA
- [ ] **trickdaddy mirror** — polish parity / published mirror under companion orgs
- [ ] **Theme marketplace pack** — more presets + import from URL
- [ ] **CI** — GitHub Actions for `npm run build` + Docker image publish
- [ ] **Live site preview iframe** — Theme Studio preview against assigned fleet URLs

---

## License

MIT © 2026 [JNK Technologies](https://github.com/jnktechnologies3) — see [LICENSE](./LICENSE).
