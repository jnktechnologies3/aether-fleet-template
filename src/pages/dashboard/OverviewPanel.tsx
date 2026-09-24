import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  activityKindLabel,
  countThemeTokens,
  formatRelativeTime,
  getLastSaved,
  loadActivity,
  loadSites,
  pushActivity,
  setLastSaved,
} from '../../fleet/storage'
import type { ActivityItem } from '../../fleet/types'
import { useTheme } from '../../theme/ThemeProvider'
import { useToast, Toast } from './studioShared'

export default function OverviewPanel() {
  const { theme, save, exportJson, agentBlob } = useTheme()
  const navigate = useNavigate()
  const { toast, flash } = useToast()
  const [sitesCount, setSitesCount] = useState(0)
  const [lastSaved, setLastSavedState] = useState<string | null>(null)
  const [activity, setActivity] = useState<ActivityItem[]>([])

  const refresh = () => {
    setSitesCount(loadSites().length)
    setLastSavedState(getLastSaved())
    setActivity(loadActivity())
  }

  useEffect(() => {
    refresh()
  }, [])

  const download = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${theme.id || 'theme'}.json`
    a.click()
    URL.revokeObjectURL(url)
    flash('Exported theme.json')
  }

  const copyAgent = async () => {
    await navigator.clipboard.writeText(agentBlob())
    flash('Copied agent prompt')
  }

  const quickSave = () => {
    save()
    setLastSaved()
    pushActivity('theme-save', `Saved “${theme.brand.name}” (${theme.id})`)
    refresh()
    flash('Saved to localStorage')
  }

  const stats = [
    { label: 'Sites in fleet', value: String(sitesCount), hint: 'Local registry' },
    { label: 'Active theme', value: theme.id || theme.brand.name, hint: theme.brand.name },
    { label: 'Token count', value: String(countThemeTokens(theme)), hint: 'Brand · colors · fonts…' },
    { label: 'Last saved', value: formatRelativeTime(lastSaved), hint: lastSaved ? new Date(lastSaved).toLocaleString() : 'Not yet' },
  ]

  return (
    <div className="space-y-6">
      <Toast message={toast} />
      <div>
        <h2 className="text-xl font-bold tracking-tight">Overview</h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Fleet control center — theme, sites, and agent handoff, all local for now.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <p className="text-xs font-semibold uppercase tracking-widest opacity-50">{s.label}</p>
            <p className="mt-2 truncate text-2xl font-bold tracking-tight" title={s.value}>
              {s.value}
            </p>
            <p className="mt-1 truncate text-xs opacity-40" title={s.hint}>
              {s.hint}
            </p>
          </div>
        ))}
      </div>

      <section className="studio-section">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest opacity-50">Quick actions</h3>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="studio-btn studio-btn-primary" onClick={() => navigate('/dashboard/theme')}>
            Open Theme Studio
          </button>
          <button type="button" className="studio-btn" onClick={download}>
            Export theme
          </button>
          <button type="button" className="studio-btn" onClick={() => void copyAgent()}>
            Copy agent prompt
          </button>
          <Link to="/" className="studio-btn inline-flex items-center no-underline">
            Preview landing
          </Link>
          <button type="button" className="studio-btn" onClick={quickSave}>
            Save theme now
          </button>
          <button type="button" className="studio-btn" onClick={() => navigate('/dashboard/fleet')}>
            Manage fleet
          </button>
        </div>
      </section>

      <section className="studio-section">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest opacity-50">Recent activity</h3>
          <span className="text-[11px] opacity-40">Local only</span>
        </div>
        {activity.length === 0 ? (
          <p className="text-sm opacity-50">
            No activity yet. Save a theme, load a preset, or edit a fleet site to populate this list.
          </p>
        ) : (
          <ul className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {activity.slice(0, 12).map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-3 py-2.5 text-sm first:pt-0 last:pb-0"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="min-w-0">
                  <p className="font-medium">{activityKindLabel(item.kind)}</p>
                  <p className="truncate opacity-60">{item.label}</p>
                </div>
                <time className="shrink-0 text-xs opacity-40" dateTime={item.at} title={new Date(item.at).toLocaleString()}>
                  {formatRelativeTime(item.at)}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
