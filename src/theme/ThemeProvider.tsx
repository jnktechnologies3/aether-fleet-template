import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { applyTheme } from './applyTheme'
import { aetherPurple, type PresetId } from './defaults'
import { STORAGE_KEY, type ThemeTokens } from './tokens'

type ThemeContextValue = {
  theme: ThemeTokens
  setTheme: (next: ThemeTokens | ((prev: ThemeTokens) => ThemeTokens)) => void
  updateTheme: (partial: DeepPartial<ThemeTokens>) => void
  loadPreset: (id: PresetId | string) => Promise<void>
  save: () => void
  reset: () => void
  exportJson: () => string
  importJson: (raw: string) => void
  agentBlob: () => string
}

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function deepMerge<T extends object>(base: T, partial: DeepPartial<T>): T {
  const out = { ...base } as T
  for (const key of Object.keys(partial) as (keyof T)[]) {
    const pv = partial[key]
    const bv = base[key]
    if (
      pv &&
      typeof pv === 'object' &&
      !Array.isArray(pv) &&
      bv &&
      typeof bv === 'object' &&
      !Array.isArray(bv)
    ) {
      out[key] = deepMerge(bv as object, pv as DeepPartial<object>) as T[keyof T]
    } else if (pv !== undefined) {
      out[key] = pv as T[keyof T]
    }
  }
  return out
}

function readStored(): ThemeTokens | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ThemeTokens
  } catch {
    return null
  }
}

function queryThemeId(): string | null {
  if (typeof window === 'undefined') return null
  const q = new URLSearchParams(window.location.search).get('theme')
  return q
}

async function fetchPreset(id: string): Promise<ThemeTokens> {
  if (id === 'aether-purple') return structuredClone(aetherPurple)
  const res = await fetch(`/themes/${id}.json`)
  if (!res.ok) throw new Error(`Theme preset not found: ${id}`)
  return (await res.json()) as ThemeTokens
}

function resolveInitial(): ThemeTokens {
  const stored = readStored()
  if (stored?.colors?.bgDeep) return stored
  return structuredClone(aetherPurple)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeTokens>(resolveInitial)

  // Apply on every theme change
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Honor ?theme= on first mount (overrides localStorage once)
  useEffect(() => {
    const q = queryThemeId()
    if (!q) return
    void fetchPreset(q)
      .then((t) => setThemeState(t))
      .catch(() => {
        /* keep current */
      })
  }, [])

  const setTheme = useCallback((next: ThemeTokens | ((prev: ThemeTokens) => ThemeTokens)) => {
    setThemeState((prev) => (typeof next === 'function' ? next(prev) : next))
  }, [])

  const updateTheme = useCallback((partial: DeepPartial<ThemeTokens>) => {
    setThemeState((prev) => deepMerge(prev, partial))
  }, [])

  const loadPreset = useCallback(async (id: string) => {
    const t = await fetchPreset(id)
    setThemeState(t)
  }, [])

  const save = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme))
  }, [theme])

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setThemeState(structuredClone(aetherPurple))
  }, [])

  const exportJson = useCallback(() => JSON.stringify(theme, null, 2), [theme])

  const importJson = useCallback((raw: string) => {
    const parsed = JSON.parse(raw) as ThemeTokens
    if (!parsed?.colors?.bgDeep || !parsed?.fonts?.sans) {
      throw new Error('Invalid theme JSON — missing required fields')
    }
    setThemeState(parsed)
  }, [])

  const agentBlob = useCallback(() => {
    return [
      '# Fleet theme for agent build',
      '',
      'Drop this JSON at `public/themes/custom.json` (or paste into Fleet Theme Studio → Import),',
      'then set brand copy in `src/content/site.ts`.',
      '',
      '```json',
      JSON.stringify(theme, null, 2),
      '```',
      '',
      '## Tunable attributes',
      '- brand.name / tagline / logoText',
      '- colors.* (bgDeep, bgMid, violet, purple, sky, cyan, text, textMuted, border, success, danger, cardBg)',
      '- gradients.* (heroFrom/To, ctaFrom/Mid/To)',
      '- fonts.sans / fonts.mono (family + Google Fonts URL)',
      '- radius.sm|md|lg|xl',
      '- spacingDensity: comfortable | compact',
      '- effects.glowIntensity (0–1), effects.glassOpacity',
    ].join('\n')
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      updateTheme,
      loadPreset,
      save,
      reset,
      exportJson,
      importJson,
      agentBlob,
    }),
    [theme, setTheme, updateTheme, loadPreset, save, reset, exportJson, importJson, agentBlob],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
