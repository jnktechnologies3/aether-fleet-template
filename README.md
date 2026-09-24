# Aether Fleet Template

> An agent-usable website fleet starter from Aether Lab with a polished marketing landing, CSS-variable design tokens, Theme Studio, local Fleet registry, and Agent Kit.

## Version 0.2.0

Aether Fleet Dashboard v0.2.0 is an ops console for the website fleet. It includes overview health cards and fleet snapshots, Theme Studio compare and duplicate modes, section resets, bulk theme assignment, fleet import/export, fleet packs, a command palette, and dashboard Settings at `/dashboard/settings`.

## Quick start

```bash
npm install
npm run dev
```

Open `/` for the landing page and `/dashboard` for the fleet dashboard. The app is client-only and persists fleet data in localStorage.

## Routes

- `/dashboard` — Overview
- `/dashboard/theme` — Theme Studio
- `/dashboard/fleet` — Fleet registry and theme assignments
- `/dashboard/agent` — Agent Kit
- `/dashboard/settings` — density, tips, and localStorage reset

See `CHANGELOG.md` for the release history and `AGENT_TEMPLATE.md` for the agent contract.

## License

MIT © 2026 JNK Technologies.
