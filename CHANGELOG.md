# Changelog

All notable changes to **Aether Fleet Template** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
