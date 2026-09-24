# Agent fleet template contract

Use this repo as a **starter for themed marketing sites**. Agents should follow these steps — do not invent a parallel styling system.

## 1. Copy the starter

```bash
cp -R aether-agentic-course my-new-site
cd my-new-site
```

## 2. Drop a theme

Option A — export from Fleet Theme Studio (`/dashboard` → **Export JSON**), save as:

```
public/themes/<slug>.json
```

Option B — hand-write JSON matching `src/theme/agent-schema.json`.

Option C — paste the **Copy for agent** markdown blob from the dashboard into your build prompt and materialize `theme.json` from it.

Load a preset at runtime with `?theme=<slug>` (e.g. `?theme=ocean-teal`) or persist via localStorage key `aether-fleet-theme`.

Ship presets already in-repo:

| File | Look |
|------|------|
| `public/themes/aether-purple.json` | Purple / cyan (default) |
| `public/themes/ocean-teal.json` | Deep teal + light blue |
| `public/themes/sunset-rose.json` | Warm rose + amber |

## 3. Swap copy

Edit **only** `src/content/site.ts` for marketing strings agents typically customize:

- `siteName`, `courseName`, `email`
- `nav.links`, `nav.cta`
- `hero.*` (title parts, subtitle, CTAs)
- `pricing.tiers` (names, prices, features, CTAs)
- `footer.blurb`

Brand display name / tagline / logo text also live on `ThemeTokens.brand` and override nav/hero brand chrome when set in the theme JSON.

## 4. Install & build

```bash
npm install
npm run build
npm run preview   # optional
```

Dev:

```bash
npm run dev
# Landing:  http://localhost:5173/
# Theme Studio: http://localhost:5173/dashboard
```

## 5. Schema

JSON Schema for themes: **`src/theme/agent-schema.json`**

TypeScript interface: **`src/theme/tokens.ts` → `ThemeTokens`**

### Tunable attributes

- **brand**: `name`, `tagline`, `logoText`
- **colors**: `bgDeep`, `bgMid`, `violet`, `purple`, `sky`, `cyan`, `text`, `textMuted`, `border`, `success`, `danger`, `cardBg`
- **gradients**: `heroFrom`, `heroTo`, `ctaFrom`, `ctaMid`, `ctaTo` (hex)
- **fonts**: `sans.family` + optional Google Fonts `url`; `mono` same
- **radius**: `sm` / `md` / `lg` / `xl` (rem strings)
- **spacingDensity**: `comfortable` | `compact`
- **effects**: `glowIntensity` (0–1), `glassOpacity`

## 6. Do / don’t

**Do**

- Drive visuals through theme tokens + CSS variables (`applyTheme`)
- Put agent-facing copy in `src/content/site.ts`
- Keep landing sections; theme them

**Don’t**

- Hard-code hex colors in new components — use `var(--color-*)` or token utility classes (`text-accent`, `text-highlight`, `brand-gradient`, `.btn-primary`, `.card`, `.glass`)
- Fork a second theme system alongside `src/theme/`

## Quick agent checklist

- [ ] Theme JSON validates against `agent-schema.json`
- [ ] `site.ts` updated for the client brand
- [ ] `npm run build` succeeds
- [ ] Spot-check `/` and `/dashboard`
