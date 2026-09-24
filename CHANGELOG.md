# Changelog

All notable changes to **Aether Fleet Template** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.1] — 2026-09-24

### Added

- **Fleet Dashboard operator guide** — [`docs/FLEET_DASHBOARD.md`](./docs/FLEET_DASHBOARD.md) covering Overview, Theme Studio, Fleet, Agent Kit, Settings, command palette, localStorage keys, and typical workflows
- **Docs index** — [`docs/README.md`](./docs/README.md)

### Changed

- README links the full dashboard guide under Usage and the Table of Contents

## [0.2.0] — 2026-09-24

### Added

- **Overview upgrades** — health cards (Sites · Themes in library · Active theme · Last save), fleet snapshot table, quick theme-apply-to-all with confirm, activity clear, CTA row (New site / Theme Studio / Export fleet pack)
- **Theme Studio compare mode** — side-by-side mini preview of current theme vs a selected preset
- **Duplicate theme** — one-click library snapshot with auto name (`… copy`)
- **Reset section** — colors/gradients, fonts, and effects/density/radius reset to aether-purple defaults
- **Fleet bulk select** — multi-select sites + apply one theme to the selection
- **Fleet export / import** — `fleet.json` round-trip (sites + library + optional activity/theme)
- **Agent Kit fleet pack** — download `aether-fleet-pack.json` (`{ version, exportedAt, theme, sites, library }`)
- **Spin N sites prompt** — copy button using current fleet site names
- **Command palette** — `/` or `Cmd/Ctrl+K` jump to Overview/Theme/Fleet/Agent/Settings + Save/Export actions (~50 lines, no extra deps)
- **Settings** — `/dashboard/settings` density, show/hide seeded tips, danger reset of all `aether-fleet-*` localStorage keys; Settings in left nav
- **Visual polish** — page headers, status pills, empty states with CTAs; mobile top-tab nav retained

### Changed

- Dashboard framing as an ops console for the website fleet (still client-only / localStorage)
- Activity kinds extended for fleet export/import and settings

## [0.1.0] — 2026-09-24

### Added

- **Marketing landing** (`/`) — full token-aware sections (Hero, Problem, Middle Path, Skills, Curriculum, Workflow, Scenarios, Pricing, FAQ, Testimonials, Footer)
- **CSS-variable design tokens** — colors, gradients, fonts, radius, density, glow, and glass effects applied via `applyTheme`
- **Theme presets** — `aether-purple` (default), `ocean-teal`, `sunset-rose` in `public/themes/`
- **Theme Studio** (`/dashboard/theme`) — live color/font/radius/effect controls, export/import JSON, save to library, copy-for-agent, reset
- **Fleet Dashboard shell** — top bar + left nav (Overview · Theme Studio · Fleet · Agent Kit)
- **Overview panel** (`/dashboard`) — fleet stats, quick actions, recent activity feed
- **Fleet panel** (`/dashboard/fleet`) — local site registry, theme library, per-site theme assignment
- **Agent Kit** (`/dashboard/agent`) — schema viewer, agent brief download, in-app `AGENT_TEMPLATE.md`, spin-up prompt
- **Agent schema** — `src/theme/agent-schema.json` + `ThemeTokens` TypeScript interface
- **Query-param themes** — `?theme=<slug>` loads a preset from `public/themes/` on first mount
- **Client persistence** — localStorage keys for active theme, sites, library, activity, last-saved
- **Agent contract** — root `AGENT_TEMPLATE.md` for cloning / theme drop / copy swap workflow
- **Docker packaging** — multi-stage Vite build → nginx:alpine SPA with `try_files` for React Router
- **docker-compose** — `aether-fleet` service on host port `8080`
- **Polished docs** — README badges, feature tables, env/theme keys, structure tree, roadmap

### Notes

- Pricing CTAs are demo-only (`alert`); no backend or checkout
- Fleet registry and theme library are browser-local only in this release
