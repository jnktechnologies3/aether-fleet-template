import { PRESET_IDS } from '../theme/defaults'
import type { ThemeTokens } from '../theme/tokens'
import {
  ACTIVITY_KEY,
  FLEET_SITES_KEY,
  LAST_SAVED_KEY,
  SEED_SITES,
  THEME_LIBRARY_KEY,
  type ActivityItem,
  type ActivityKind,
  type FleetSite,
  type ThemeLibraryEntry,
} from './types'

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

/* ── Sites ─────────────────────────────────────────────────────────────── */

export function loadSites(): FleetSite[] {
  const stored = safeParse<FleetSite[] | null>(localStorage.getItem(FLEET_SITES_KEY), null)
  if (stored && Array.isArray(stored) && stored.length > 0) return stored
  localStorage.setItem(FLEET_SITES_KEY, JSON.stringify(SEED_SITES))
  return structuredClone(SEED_SITES)
}

export function saveSites(sites: FleetSite[]): void {
  localStorage.setItem(FLEET_SITES_KEY, JSON.stringify(sites))
}

export function upsertSite(site: FleetSite): FleetSite[] {
  const sites = loadSites()
  const idx = sites.findIndex((s) => s.id === site.id)
  if (idx >= 0) sites[idx] = site
  else sites.push(site)
  saveSites(sites)
  return sites
}

export function deleteSite(id: string): FleetSite[] {
  const sites = loadSites().filter((s) => s.id !== id)
  saveSites(sites)
  return sites
}

export function createSiteDraft(): FleetSite {
  return {
    id: uid('site'),
    name: '',
    slug: '',
    url: '',
    notes: '',
    themeId: undefined,
  }
}

/* ── Theme library ─────────────────────────────────────────────────────── */

export function loadLibrary(): ThemeLibraryEntry[] {
  return safeParse<ThemeLibraryEntry[]>(localStorage.getItem(THEME_LIBRARY_KEY), [])
}

export function saveLibrary(entries: ThemeLibraryEntry[]): void {
  localStorage.setItem(THEME_LIBRARY_KEY, JSON.stringify(entries))
}

export function saveThemeToLibrary(name: string, theme: ThemeTokens): ThemeLibraryEntry {
  const entry: ThemeLibraryEntry = {
    id: uid('lib'),
    name: name.trim() || theme.id || 'Untitled theme',
    source: 'saved',
    savedAt: new Date().toISOString(),
    theme: structuredClone({ ...theme, id: theme.id || name.trim().toLowerCase().replace(/\s+/g, '-') }),
  }
  const lib = loadLibrary()
  lib.unshift(entry)
  saveLibrary(lib)
  return entry
}

export function removeFromLibrary(id: string): ThemeLibraryEntry[] {
  const lib = loadLibrary().filter((e) => e.id !== id)
  saveLibrary(lib)
  return lib
}

/** Presets (virtual) + user-saved library entries for pickers. */
export function listAssignableThemes(
  library: ThemeLibraryEntry[],
): { id: string; name: string; kind: 'preset' | 'saved' }[] {
  const presets = PRESET_IDS.map((id) => ({
    id: `preset:${id}`,
    name: id,
    kind: 'preset' as const,
  }))
  const saved = library.map((e) => ({
    id: e.id,
    name: e.name,
    kind: 'saved' as const,
  }))
  return [...presets, ...saved]
}

export function resolveThemeLabel(
  themeId: string | undefined,
  library: ThemeLibraryEntry[],
): string {
  if (!themeId) return '— none —'
  if (themeId.startsWith('preset:')) return themeId.replace('preset:', '')
  const found = library.find((e) => e.id === themeId)
  return found?.name ?? themeId
}

/* ── Activity + last saved ─────────────────────────────────────────────── */

export function loadActivity(): ActivityItem[] {
  return safeParse<ActivityItem[]>(localStorage.getItem(ACTIVITY_KEY), [])
}

export function pushActivity(kind: ActivityKind, label: string): ActivityItem[] {
  const item: ActivityItem = {
    id: uid('act'),
    kind,
    label,
    at: new Date().toISOString(),
  }
  const list = [item, ...loadActivity()].slice(0, 40)
  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(list))
  return list
}

export function getLastSaved(): string | null {
  return localStorage.getItem(LAST_SAVED_KEY)
}

export function setLastSaved(iso = new Date().toISOString()): void {
  localStorage.setItem(LAST_SAVED_KEY, iso)
}

export function countThemeTokens(theme: ThemeTokens): number {
  return (
    Object.keys(theme.brand).length +
    Object.keys(theme.colors).length +
    Object.keys(theme.gradients).length +
    2 + // sans + mono
    Object.keys(theme.radius).length +
    1 + // spacingDensity
    Object.keys(theme.effects).length
  )
}

export function formatRelativeTime(iso: string | null): string {
  if (!iso) return 'Never'
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return 'Never'
  const diff = Date.now() - then
  const sec = Math.floor(diff / 1000)
  if (sec < 45) return 'Just now'
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min}m ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr}h ago`
  const day = Math.floor(hr / 24)
  if (day < 7) return `${day}d ago`
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function activityKindLabel(kind: ActivityKind): string {
  const map: Record<ActivityKind, string> = {
    'theme-save': 'Theme saved',
    'theme-import': 'Theme imported',
    'preset-load': 'Preset loaded',
    'library-save': 'Saved to library',
    'site-add': 'Site added',
    'site-edit': 'Site updated',
    'site-delete': 'Site removed',
    'theme-assign': 'Theme assigned',
  }
  return map[kind]
}
