import { type ThemeTokens, cssStack, hexToRgb } from './tokens'

const FONT_LINK_ID = 'aether-theme-font'

function ensureFontLink(urls: string[]) {
  const unique = [...new Set(urls.filter(Boolean))]
  if (unique.length === 0) return
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.id = FONT_LINK_ID
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  const params = unique.flatMap((u) => {
    try {
      return new URL(u).searchParams.getAll('family')
    } catch {
      return []
    }
  }).filter(Boolean)

  if (params.length > 1) {
    link.href = `https://fonts.googleapis.com/css2?${params.map((f) => `family=${encodeURIComponent(f)}`).join('&')}&display=swap`
  } else if (unique[0]) {
    link.href = unique[0]
  }
}

/** Apply ThemeTokens as CSS custom properties on documentElement. */
export function applyTheme(tokens: ThemeTokens): void {
  const root = document.documentElement
  const { colors, gradients, fonts, radius, effects, spacingDensity } = tokens
  const glow = effects.glowIntensity
  const glass = effects.glassOpacity
  const set = (k: string, v: string) => root.style.setProperty(k, v)

  // Fleet vars (source of truth) + legacy aliases used by utilities
  const colorMap: Record<string, string> = {
    'bg-deep': colors.bgDeep,
    'bg-mid': colors.bgMid,
    violet: colors.violet,
    purple: colors.purple,
    sky: colors.sky,
    cyan: colors.cyan,
    text: colors.text,
    'text-muted': colors.textMuted,
    border: colors.border,
    success: colors.success,
    danger: colors.danger,
    'card-bg': colors.cardBg,
  }
  for (const [k, v] of Object.entries(colorMap)) {
    set(`--fleet-color-${k}`, v)
    set(`--color-${k}`, v)
  }

  set('--fleet-color-violet-rgb', hexToRgb(colors.violet))
  set('--fleet-color-purple-rgb', hexToRgb(colors.purple))
  set('--fleet-color-sky-rgb', hexToRgb(colors.sky))
  set('--fleet-color-cyan-rgb', hexToRgb(colors.cyan))
  set('--fleet-color-danger-rgb', hexToRgb(colors.danger))
  set('--color-violet-rgb', hexToRgb(colors.violet))
  set('--color-purple-rgb', hexToRgb(colors.purple))
  set('--color-sky-rgb', hexToRgb(colors.sky))
  set('--color-cyan-rgb', hexToRgb(colors.cyan))
  set('--color-danger-rgb', hexToRgb(colors.danger))

  set('--gradient-hero-from', gradients.heroFrom)
  set('--gradient-hero-to', gradients.heroTo)
  set('--gradient-cta-from', gradients.ctaFrom)
  set('--gradient-cta-mid', gradients.ctaMid)
  set('--gradient-cta-to', gradients.ctaTo)

  set('--fleet-font-sans', cssStack(fonts.sans.family, false))
  set('--fleet-font-mono', cssStack(fonts.mono.family, true))
  set('--font-sans', cssStack(fonts.sans.family, false))
  set('--font-mono', cssStack(fonts.mono.family, true))

  set('--fleet-radius-sm', radius.sm)
  set('--fleet-radius-md', radius.md)
  set('--fleet-radius-lg', radius.lg)
  set('--fleet-radius-xl', radius.xl)
  set('--radius-sm', radius.sm)
  set('--radius-md', radius.md)
  set('--radius-lg', radius.lg)
  set('--radius-xl', radius.xl)

  set('--glow-intensity', String(glow))
  set('--glass-opacity', String(glass))
  set('--density-scale', spacingDensity === 'compact' ? '0.85' : '1')

  root.dataset.density = spacingDensity
  root.dataset.themeId = tokens.id

  const urls = [fonts.sans.url, fonts.mono.url].filter((u): u is string => Boolean(u))
  ensureFontLink(urls)
}
