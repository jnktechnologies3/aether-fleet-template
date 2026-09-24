/** Fleet design tokens — single source of truth for visual identity. */
export interface ThemeTokens {
  id: string
  brand: {
    name: string
    tagline: string
    logoText: string
  }
  colors: {
    bgDeep: string
    bgMid: string
    violet: string
    purple: string
    sky: string
    cyan: string
    text: string
    textMuted: string
    border: string
    success: string
    danger: string
    cardBg: string
  }
  gradients: {
    heroFrom: string
    heroTo: string
    ctaFrom: string
    ctaMid: string
    ctaTo: string
  }
  fonts: {
    sans: { family: string; url?: string }
    mono: { family: string; url?: string }
  }
  radius: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  spacingDensity: 'comfortable' | 'compact'
  effects: {
    glowIntensity: number
    glassOpacity: number
  }
}

export const STORAGE_KEY = 'aether-fleet-theme'
export const DEFAULT_THEME_ID = 'aether-purple'

export const GOOGLE_FONTS: { label: string; family: string; url: string; kind: 'sans' | 'mono' }[] = [
  { label: 'Inter', family: 'Inter', url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap', kind: 'sans' },
  { label: 'Space Grotesk', family: 'Space Grotesk', url: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap', kind: 'sans' },
  { label: 'DM Sans', family: 'DM Sans', url: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap', kind: 'sans' },
  { label: 'Outfit', family: 'Outfit', url: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap', kind: 'sans' },
  { label: 'Plus Jakarta Sans', family: 'Plus Jakarta Sans', url: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap', kind: 'sans' },
  { label: 'Manrope', family: 'Manrope', url: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap', kind: 'sans' },
  { label: 'JetBrains Mono', family: 'JetBrains Mono', url: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap', kind: 'mono' },
  { label: 'Fira Code', family: 'Fira Code', url: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap', kind: 'mono' },
  { label: 'IBM Plex Mono', family: 'IBM Plex Mono', url: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap', kind: 'mono' },
]

export function hexToRgb(hex: string): string {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  if (Number.isNaN(n)) return '0, 0, 0'
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}

export function cssStack(family: string, mono = false): string {
  const fallback = mono ? 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' : 'ui-sans-serif, system-ui, sans-serif'
  return `"${family}", ${fallback}`
}
