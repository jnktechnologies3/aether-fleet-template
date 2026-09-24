# Fleet Dashboard — Operator Guide

Client-side ops console for designing themes and managing a local website fleet registry. Everything persists in the browser’s `localStorage` only — nothing is synced to a server.

**Version covered:** 0.2.1 (UI from 0.2.0 + this guide)

---

## Table of contents

1. [What it is](#1-what-it-is)
2. [Getting started](#2-getting-started)
3. [Navigation](#3-navigation)
4. [Overview](#4-overview)
5. [Theme Studio](#5-theme-studio)
6. [Fleet](#6-fleet)
7. [Agent Kit](#7-agent-kit)
8. [Settings](#8-settings)
9. [localStorage keys](#9-localstorage-keys)
10. [Typical workflows](#10-typical-workflows)
11. [Limits / not included](#11-limits--not-included)
12. [Related docs](#12-related-docs)

---

## 1. What it is

The **Fleet Dashboard** is the ops console at `/dashboard`. It lets you:

- Tune design tokens live (colors, fonts, radius, glow, glass) in **Theme Studio**
- Register marketing sites and assign themes in **Fleet**
- Hand an agent a pack, schema, and prompts in **Agent Kit**
- Adjust chrome density and reset local data in **Settings**

All site lists, theme snapshots, activity, and the active theme live in **browser `localStorage`**. Export JSON when you need a file for deploys or agents.

---

## 2. Getting started

### Routes

| Environment | Landing | Dashboard |
|-------------|---------|-----------|
| Dev (`npm run dev`) | http://127.0.0.1:5173/ | http://127.0.0.1:5173/dashboard |
| Preview (`npm run preview`) | Same host/port Vite prints | `/dashboard` |
| Docker (`docker compose up`) | http://localhost:8080/ | http://localhost:8080/dashboard |

Kenny’s current local preview: **http://127.0.0.1:5173/dashboard** (leave **4173** free for God’s Eye View).

### First open

1. Run `npm install && npm run dev` (or use an already-running preview on **5173**).
2. Open `/dashboard`.
3. On first Fleet load, three **seeded placeholder sites** appear (Aether Course, Movie Nexus Marketing, Login-X Docs). Edit or delete them anytime.

### Load a preset from the URL

Open the landing with a query param:

```
http://127.0.0.1:5173/?theme=ocean-teal
```

That loads `public/themes/<slug>.json` on first mount. Built-in presets: `aether-purple`, `ocean-teal`, `sunset-rose`.

---

## 3. Navigation

### Left nav (and mobile top tabs)

| Label | Route | Purpose |
|-------|-------|---------|
| **Overview** | `/dashboard` | Health cards, fleet snapshot, quick apply, activity |
| **Theme Studio** | `/dashboard/theme` | Live token editor |
| **Fleet** | `/dashboard/fleet` | Site registry + theme library |
| **Agent Kit** | `/dashboard/agent` | Packs, prompts, schema, AGENT_TEMPLATE |
| **Settings** | `/dashboard/settings` | Density, tips, danger reset |

Header also has **⌘K** (opens the palette) and **← Landing**.

### Command palette

Press **`/`** or **Cmd/Ctrl+K** (when not typing in an input). Type to filter, ↑↓ to move, Enter to run, Esc to close.

| Group | Commands |
|-------|----------|
| **Navigate** | Go to Overview · Theme Studio · Fleet · Agent Kit · Settings |
| **Actions** | Save theme · Export theme JSON · Export fleet pack |

---

## 4. Overview

Subtitle in UI: *Ops console for Kenny’s website fleet — health, snapshot, and quick applies.*

### Health cards

Four **stat cards** (each shows a “live” pill):

| Card | Shows | Hint |
|------|-------|------|
| **Sites** | Count from fleet registry | “Fleet registry” |
| **Themes in library** | Saved library count | How many presets are always on |
| **Active theme** | Current theme `id` | Brand name |
| **Last save** | Relative time of last theme save | Full timestamp, or “Not yet” |

Header pills: **client-only** and the active theme id.

### CTA row

Buttons:

1. **New site** → opens Fleet
2. **Open Theme Studio**
3. **Export fleet pack** → downloads `aether-fleet-pack.json` (theme + sites + library; no activity)
4. **Save theme** → writes active theme to `localStorage`
5. **Preview landing** → `/`

### Fleet snapshot

Table of all sites: **Name · Slug · Assigned theme · URL**.

- Empty state: “No sites yet” with **Add sample site** (navigates to Fleet).
- **Manage →** jumps to Fleet.
- Theme pills show resolved labels (preset name or library name).
- URL column links **Open ↗** when set.

### Quick theme apply

1. Choose a theme from **Presets** or **Library**.
2. Click **Apply to all sites**.
3. Confirm the dialog — writes that theme id onto every site.

Disabled when the fleet has zero sites.

### Recent activity

Local-only feed (newest first, up to 12 shown). Kinds include theme save/import, preset load, library save, site add/edit/delete, theme assign, fleet export/import, settings.

- **Clear** confirms, then wipes the feed.
- Empty state explains how to populate it.

### Tips banner

If **Show seeded tips** is on (Settings), Overview shows a tip about `/` and `⌘K`.

---

## 5. Theme Studio

Subtitle: *Tune tokens live — compare presets, duplicate into the library, reset by section.*

### Header actions

| Control | What it does |
|---------|----------------|
| Theme id pill | Shows current `theme.id` |
| **Compare** / **Exit compare** | Toggle compare mode |
| **Duplicate theme** | Saves an auto-named copy into the theme library |
| Library name field | Optional name for “Save current as…” |
| **Save current as…** | Named snapshot into `aether-fleet-theme-library` |

### Compare mode

When on:

1. Pick a **Preset** from the dropdown (`aether-purple`, `ocean-teal`, `sunset-rose`).
2. See side-by-side mini previews: **Current** vs the selected preset (swatches, brand, CTA, font).

### Left editor (scrollable)

#### Presets

One-click buttons for each preset id. Tip in UI: open landing with `?theme=ocean-teal`.

#### Brand

Text fields: **name**, **tagline**, **logoText**.

#### Colors (12 tokens)

Each row: color picker + hex/text field.

| UI label | Token key |
|----------|-----------|
| BG Deep | `bgDeep` |
| BG Mid | `bgMid` |
| Primary | `violet` |
| Primary Soft | `purple` |
| Sky | `sky` |
| Cyan / Highlight | `cyan` |
| Text | `text` |
| Text Muted | `textMuted` |
| Border | `border` |
| Success | `success` |
| Danger | `danger` |
| Card BG | `cardBg` |

Section **Reset** restores colors **and** gradients to `aether-purple` defaults.

#### Gradients

Hero From / Hero To · CTA From / CTA Mid / CTA To. Same shared **Reset** as Colors.

#### Fonts

- **Sans** and **Mono** selects from built-in Google Fonts lists (family + URL applied live).
- Section **Reset** restores default fonts only.

#### Radius

Editable `sm` / `md` / `lg` / `xl` (CSS length strings). Reset is shared with effects.

#### Density & effects

- Density buttons: **comfortable** | **compact** (theme spacing, not dashboard chrome).
- **Glow intensity** slider (0–1).
- **Glass opacity** slider (0–0.15).
- Section **Reset** restores effects, density, and radius.

### Sticky save bar

Always visible at the bottom of the left column:

| Button | Effect |
|--------|--------|
| **Save** | Persist theme to `aether-fleet-theme`, update last-saved, log activity |
| **Export** | Download `{theme.id}.json` |
| **Import** | Choose a `.json` theme file and load it |
| **Copy for agent** | Clipboard: agent prompt blob for the current theme |
| **Reset** | Full reset to `aether-purple` (clears stored theme) |

### Live preview (right column)

- Mini hero with brand tagline/name, Primary CTA / Secondary, sample cards, glass panel, font demo.
- **Open full landing →** link to `/`.
- **Theme JSON (live)** — pretty-printed current tokens.

---

## 6. Fleet

Subtitle: *Local site registry + theme library. Bulk-assign, export, and import fleet packs.*

### Header actions

| Button | Effect |
|--------|--------|
| Sites pill | Live site count |
| **Export fleet.json** | Download pack with theme + sites + library + **activity** |
| **Import fleet.json** | Merge/replace from a pack; may also import embedded theme |
| **Add site** | Opens the new-site form |

### Add / edit site form

Fields:

| Field | Rules |
|-------|--------|
| **Name** | Required |
| **Slug** | Lowercase letters, numbers, hyphens only (`a-z0-9` segments). Auto-filled from name on create. Must be unique. Hint: “lowercase · numbers · hyphens” |
| **URL** | Optional (`https://…`) |
| **Notes** | Optional free text |

Actions: **Save site** · **Cancel**.

Delete confirms: *Delete “{name}” from the local fleet registry?*

### Bulk select · apply theme

When sites exist:

1. Check sites (or **Select all**).
2. Choose a theme (Presets / Library).
3. **Apply to selection** — confirms, then assigns.

### Per-site cards

Each site shows name, theme pill, slug, URL, notes, **Edit** / **Delete**, plus:

- **Assign theme** select (Presets / Saved library)
- **Apply theme to site**

### Theme library section

Lists named snapshots saved from Theme Studio (**Duplicate theme** or **Save current as…**).

- Empty: points you to Theme Studio.
- **Remove** confirms and deletes that library entry (presets always remain available separately).

Tips note (if enabled): assignments live in `aether-fleet-sites`; for real deploys export theme JSON under `public/themes/`.

### Empty fleet

“Fleet is empty” with **Add your first site**. Seeded sites normally appear on first visit unless you cleared storage.

---

## 7. Agent Kit

Subtitle: *Hand an agent everything needed to clone fleet sites: pack, schema, theme JSON, and prompts.*

### One-click handoff

| Button | Output |
|--------|--------|
| **Download fleet pack** | `aether-fleet-pack.json` → `{ version, exportedAt, theme, sites, library }` |
| **Copy spin-N sites prompt** | Prompt listing current fleet site names (N = count) |
| **Copy full agent brief** | Brief markdown + current theme JSON |
| **Copy theme blob** | Theme agent blob (same idea as Theme Studio “Copy for agent”) |
| **Download theme.json** | Current theme file |
| **Download brief.md** | `fleet-agent-brief.md` |
| **Copy spin-up prompt** | Single-site recommended checklist prompt |

### Spin N sites prompt

Editable preview of the multi-site prompt built from current fleet names. Copy via the handoff button above.

### JSON schema summary

Cards for: `id`, `brand`, `colors`, `gradients`, `fonts`, `radius`, `spacingDensity`, `effects`.

**Show details** / **Hide details** toggles the full embedded `agent-schema.json`.

### Recommended spin-up prompt

Fixed single-site agent checklist (clone → theme → `site.ts` → build).

### AGENT_TEMPLATE.md

In-app copy of the repo-root agent contract.

- **Copy** — clipboard full markdown
- **Expand in-app** / **Collapse** — viewer

---

## 8. Settings

Subtitle: *Dashboard chrome preferences — client-only, stored in localStorage.*

### Density

**comfortable** | **compact** — tightens card padding across the dashboard shell (`dash-compact`). Does **not** change landing theme density (that lives in Theme Studio).

### Tips

Checkbox **Show seeded tips** — helper notes on Overview / Fleet about localStorage, presets, and sample sites.

### Danger zone

**Reset all localStorage** — confirms, then clears every `aether-fleet-*` key (theme, sites, library, activity, last-saved, settings). Page reloads afterward. Seeded sites return on the next Fleet load.

---

## 9. localStorage keys

| Key | Stores |
|-----|--------|
| `aether-fleet-theme` | Active Theme Studio theme JSON (`ThemeTokens`) |
| `aether-fleet-sites` | Fleet site registry (`FleetSite[]`) |
| `aether-fleet-theme-library` | Named theme snapshots (`ThemeLibraryEntry[]`) |
| `aether-fleet-activity` | Recent activity feed (`ActivityItem[]`) |
| `aether-fleet-last-saved` | ISO timestamp of last theme save |
| `aether-fleet-settings` | `{ density, showSeededTips }` |

Preset theme **files** are not in localStorage — they live under `public/themes/*.json`. Fleet assignments often use ids like `preset:aether-purple` or a library entry id.

---

## 10. Typical workflows

### Design a theme

1. Open **Theme Studio**.
2. Click a **Preset** or start from the current theme.
3. Edit Brand, Colors, Gradients, Fonts, Radius, Density & effects.
4. Use section **Reset** if one group goes wrong; use sticky **Reset** only for a full default restore.
5. Optional: **Compare** against another preset.
6. **Save** (local) and/or **Export** / **Save current as…** / **Duplicate theme**.

### Register a fleet

1. Open **Fleet** → **Add site**.
2. Set name (slug auto-fills); fix slug if needed; optional URL/notes.
3. **Save site**.
4. Assign a theme per site (**Apply theme to site**) or bulk-select and **Apply to selection**.
5. Optional: Overview **Apply to all sites** for one theme everywhere.
6. **Export fleet.json** as a backup.

### Hand off to an agent

1. Finish the theme and fleet list.
2. Open **Agent Kit**.
3. **Download fleet pack** and/or **Download theme.json**.
4. **Copy spin-N sites prompt** (or spin-up / full brief).
5. Point the agent at [`AGENT_TEMPLATE.md`](../AGENT_TEMPLATE.md) and `src/theme/agent-schema.json`.
6. Agent: clone template → drop `public/themes/<slug>.json` → edit `src/content/site.ts` → `npm install && npm run build`.

### Reset everything

1. **Settings** → **Reset all localStorage** → confirm.
2. Or clear keys manually in DevTools.
3. Reload; seeded tips/sites return per defaults.

---

## 11. Limits / not included

| Limitation | Notes |
|------------|--------|
| **No remote sync** | Fleet and library are this browser only |
| **No live iframe of remote sites** | Theme Studio previews tokens locally; fleet URLs are open-in-new-tab only (roadmap: live preview iframe) |
| **No checkout / backend** | Landing pricing CTAs are demo alerts |
| **Assignments ≠ deploys** | Assigning a theme in Fleet does not push to a hosted site — export JSON for agents/CI |

See README **Roadmap** for multi-site sync, hosting guides, more presets, CI, and iframe preview.

---

## 12. Related docs

| Doc | Location |
|-----|----------|
| This guide | [`docs/FLEET_DASHBOARD.md`](./FLEET_DASHBOARD.md) |
| Docs index | [`docs/README.md`](./README.md) |
| Project README | [`../README.md`](../README.md) |
| Agent contract | [`../AGENT_TEMPLATE.md`](../AGENT_TEMPLATE.md) |
| Theme JSON Schema | [`../src/theme/agent-schema.json`](../src/theme/agent-schema.json) |
| Changelog | [`../CHANGELOG.md`](../CHANGELOG.md) |

---

*Aether Lab / JNK Technologies — MIT*
