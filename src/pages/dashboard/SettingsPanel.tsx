import { useState } from 'react'
import {
  loadSettings,
  pushActivity,
  resetAllLocalStorage,
  saveSettings,
} from '../../fleet/storage'
import type { DashboardSettings } from '../../fleet/types'
import { PageHeader, StatusPill, Toast, useToast } from './studioShared'

function emitSettingsChanged() {
  window.dispatchEvent(new Event('aether-settings-changed'))
}

export default function SettingsPanel() {
  const { toast, flash } = useToast()
  const [settings, setSettings] = useState<DashboardSettings>(() => loadSettings())

  const persist = (next: DashboardSettings) => {
    setSettings(next)
    saveSettings(next)
    emitSettingsChanged()
  }

  const resetAll = () => {
    if (
      !window.confirm(
        'Reset ALL dashboard localStorage keys?\n\nThis clears theme, sites, library, activity, and settings. Seeded sites will return on next Fleet load.',
      )
    ) {
      return
    }
    resetAllLocalStorage()
    const defaults = loadSettings()
    setSettings(defaults)
    emitSettingsChanged()
    pushActivity('settings', 'Reset all localStorage keys')
    flash('All local data cleared')
    window.setTimeout(() => window.location.reload(), 600)
  }

  return (
    <div className="space-y-6">
      <Toast message={toast} />
      <PageHeader
        title="Settings"
        subtitle="Dashboard chrome preferences — client-only, stored in localStorage."
        actions={<StatusPill tone="warn">local only</StatusPill>}
      />

      <section className="studio-section space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest opacity-50">Density</h3>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Compact tightens card padding across the dashboard. Landing theming is unchanged.
        </p>
        <div className="flex gap-2">
          {(['comfortable', 'compact'] as const).map((d) => (
            <button
              key={d}
              type="button"
              className="studio-btn flex-1 sm:flex-none sm:min-w-[8rem]"
              style={
                settings.density === d
                  ? {
                      borderColor: 'var(--color-violet)',
                      background: 'color-mix(in srgb, var(--color-violet) 25%, transparent)',
                    }
                  : undefined
              }
              onClick={() => {
                persist({ ...settings, density: d })
                flash(`Density → ${d}`)
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      <section className="studio-section space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest opacity-50">Tips</h3>
        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input
            type="checkbox"
            className="mt-1 accent-[var(--color-violet)]"
            checked={settings.showSeededTips}
            onChange={(e) => {
              persist({ ...settings, showSeededTips: e.target.checked })
              flash(e.target.checked ? 'Tips shown' : 'Tips hidden')
            }}
          />
          <span>
            <span className="font-medium">Show seeded tips</span>
            <span className="mt-0.5 block opacity-55">
              Helper notes about localStorage, presets, and sample fleet sites on Overview / Fleet.
            </span>
          </span>
        </label>
      </section>

      <section className="studio-section space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest opacity-50">Danger zone</h3>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Clears <code className="font-mono text-xs">aether-fleet-*</code> keys including the active
          theme. Page reloads after confirm.
        </p>
        <button type="button" className="studio-btn studio-btn-danger" onClick={resetAll}>
          Reset all localStorage
        </button>
      </section>
    </div>
  )
}
