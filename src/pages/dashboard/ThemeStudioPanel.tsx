import { useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { pushActivity, saveThemeToLibrary, setLastSaved } from '../../fleet/storage'
import { useTheme } from '../../theme/ThemeProvider'
import { GOOGLE_FONTS, type ThemeTokens } from '../../theme/tokens'
import { PRESET_IDS } from '../../theme/defaults'
import { Toast, useToast } from './studioShared'

const COLOR_FIELDS: { key: keyof ThemeTokens['colors']; label: string }[] = [
  { key: 'bgDeep', label: 'BG Deep' },
  { key: 'bgMid', label: 'BG Mid' },
  { key: 'violet', label: 'Primary' },
  { key: 'purple', label: 'Primary Soft' },
  { key: 'sky', label: 'Sky' },
  { key: 'cyan', label: 'Cyan / Highlight' },
  { key: 'text', label: 'Text' },
  { key: 'textMuted', label: 'Text Muted' },
  { key: 'border', label: 'Border' },
  { key: 'success', label: 'Success' },
  { key: 'danger', label: 'Danger' },
  { key: 'cardBg', label: 'Card BG' },
]

const GRADIENT_FIELDS: { key: keyof ThemeTokens['gradients']; label: string }[] = [
  { key: 'heroFrom', label: 'Hero From' },
  { key: 'heroTo', label: 'Hero To' },
  { key: 'ctaFrom', label: 'CTA From' },
  { key: 'ctaMid', label: 'CTA Mid' },
  { key: 'ctaTo', label: 'CTA To' },
]

function toColorInput(value: string): string {
  if (value.startsWith('#') && (value.length === 7 || value.length === 4))
    return value.length === 4
      ? `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`
      : value
  return '#888888'
}

function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  const hex = toColorInput(value)
  return (
    <label className="flex items-center gap-3 text-sm">
      <input
        type="color"
        value={hex}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-8 cursor-pointer rounded border-0 bg-transparent"
      />
      <span className="w-28 shrink-0 opacity-70">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="studio-input flex-1 font-mono text-xs"
      />
    </label>
  )
}

function SectionTitle({ children, tip }: { children: ReactNode; tip?: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-2">
      <h2 className="text-xs font-semibold uppercase tracking-widest opacity-50">{children}</h2>
      {tip ? <span className="text-[10px] opacity-35">{tip}</span> : null}
    </div>
  )
}

export default function ThemeStudioPanel() {
  const {
    theme,
    updateTheme,
    loadPreset,
    save,
    reset,
    exportJson,
    importJson,
    agentBlob,
  } = useTheme()
  const fileRef = useRef<HTMLInputElement>(null)
  const { toast, flash } = useToast()
  const [activePreset, setActivePreset] = useState(theme.id)
  const [libraryName, setLibraryName] = useState('')

  const doSave = () => {
    save()
    setLastSaved()
    pushActivity('theme-save', `Saved “${theme.brand.name}” (${theme.id})`)
    flash('Saved to localStorage')
  }

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
    flash('Copied agent prompt blob')
  }

  const onImport = async (file: File) => {
    try {
      const raw = await file.text()
      importJson(raw)
      pushActivity('theme-import', `Imported ${file.name}`)
      flash('Theme imported')
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Import failed')
    }
  }

  const saveToLibrary = () => {
    const name = libraryName.trim() || `${theme.brand.name} snapshot`
    const entry = saveThemeToLibrary(name, theme)
    pushActivity('library-save', `Library: “${entry.name}”`)
    setLibraryName('')
    flash(`Saved “${entry.name}” to theme library`)
  }

  const sansFonts = GOOGLE_FONTS.filter((f) => f.kind === 'sans')
  const monoFonts = GOOGLE_FONTS.filter((f) => f.kind === 'mono')

  return (
    <div className="space-y-4">
      <Toast message={toast} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Theme Studio</h2>
          <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Tune tokens live — export JSON for agents, or save into the fleet theme library.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input
            className="studio-input w-44 text-sm"
            placeholder="Library name…"
            value={libraryName}
            onChange={(e) => setLibraryName(e.target.value)}
          />
          <button type="button" className="studio-btn" onClick={saveToLibrary}>
            Save current as…
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[400px_1fr] xl:grid-cols-[420px_1fr]">
        <aside className="flex max-h-[calc(100vh-10rem)] flex-col overflow-hidden rounded-[var(--radius-xl)] border" style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}>
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            <section>
              <SectionTitle tip="Click to apply">Presets</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {PRESET_IDS.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className="studio-btn"
                    style={
                      activePreset === id
                        ? {
                            borderColor: 'var(--color-violet)',
                            background: 'color-mix(in srgb, var(--color-violet) 25%, transparent)',
                          }
                        : undefined
                    }
                    onClick={() => {
                      void loadPreset(id).then(() => {
                        setActivePreset(id)
                        pushActivity('preset-load', `Loaded preset ${id}`)
                        flash(`Loaded ${id}`)
                      })
                    }}
                  >
                    {id}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs opacity-40">
                Tip: open landing with <code className="font-mono">?theme=ocean-teal</code>
              </p>
            </section>

            <section>
              <SectionTitle>Brand</SectionTitle>
              <div className="space-y-2">
                {(['name', 'tagline', 'logoText'] as const).map((k) => (
                  <label key={k} className="block text-sm">
                    <span className="mb-1 block text-xs opacity-60">{k}</span>
                    <input
                      className="studio-input w-full"
                      value={theme.brand[k]}
                      onChange={(e) => updateTheme({ brand: { [k]: e.target.value } })}
                    />
                  </label>
                ))}
              </div>
            </section>

            <section>
              <SectionTitle tip="12 tokens">Colors</SectionTitle>
              <div className="space-y-2">
                {COLOR_FIELDS.map(({ key, label }) => (
                  <ColorRow
                    key={key}
                    label={label}
                    value={theme.colors[key]}
                    onChange={(v) => updateTheme({ colors: { [key]: v } })}
                  />
                ))}
              </div>
            </section>

            <section>
              <SectionTitle tip="Hero + CTA">Gradients</SectionTitle>
              <div className="space-y-2">
                {GRADIENT_FIELDS.map(({ key, label }) => (
                  <ColorRow
                    key={key}
                    label={label}
                    value={theme.gradients[key]}
                    onChange={(v) => updateTheme({ gradients: { [key]: v } })}
                  />
                ))}
              </div>
            </section>

            <section>
              <SectionTitle>Fonts</SectionTitle>
              <div className="space-y-2">
                <label className="block text-sm">
                  <span className="mb-1 block text-xs opacity-60">Sans</span>
                  <select
                    className="studio-input w-full"
                    value={theme.fonts.sans.family}
                    onChange={(e) => {
                      const f = sansFonts.find((x) => x.family === e.target.value)
                      if (!f) return
                      updateTheme({ fonts: { sans: { family: f.family, url: f.url } } })
                    }}
                  >
                    {sansFonts.map((f) => (
                      <option key={f.family} value={f.family}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-xs opacity-60">Mono</span>
                  <select
                    className="studio-input w-full"
                    value={theme.fonts.mono.family}
                    onChange={(e) => {
                      const f = monoFonts.find((x) => x.family === e.target.value)
                      if (!f) return
                      updateTheme({ fonts: { mono: { family: f.family, url: f.url } } })
                    }}
                  >
                    {monoFonts.map((f) => (
                      <option key={f.family} value={f.family}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </section>

            <section>
              <SectionTitle>Radius</SectionTitle>
              <div className="space-y-2">
                {(['sm', 'md', 'lg', 'xl'] as const).map((k) => (
                  <label key={k} className="flex items-center gap-3 text-sm">
                    <span className="w-8 opacity-60">{k}</span>
                    <input
                      className="studio-input flex-1 font-mono text-xs"
                      value={theme.radius[k]}
                      onChange={(e) => updateTheme({ radius: { [k]: e.target.value } })}
                    />
                  </label>
                ))}
              </div>
            </section>

            <section>
              <SectionTitle>Density & effects</SectionTitle>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {(['comfortable', 'compact'] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      className="studio-btn flex-1"
                      style={
                        theme.spacingDensity === d
                          ? {
                              borderColor: 'var(--color-violet)',
                              background: 'color-mix(in srgb, var(--color-violet) 25%, transparent)',
                            }
                          : undefined
                      }
                      onClick={() => updateTheme({ spacingDensity: d })}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <label className="block text-sm">
                  <span className="mb-1 flex justify-between text-xs opacity-60">
                    <span>Glow intensity</span>
                    <span className="font-mono">{theme.effects.glowIntensity.toFixed(2)}</span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={theme.effects.glowIntensity}
                    onChange={(e) =>
                      updateTheme({ effects: { glowIntensity: Number(e.target.value) } })
                    }
                    className="w-full accent-[var(--color-violet)]"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 flex justify-between text-xs opacity-60">
                    <span>Glass opacity</span>
                    <span className="font-mono">{theme.effects.glassOpacity.toFixed(3)}</span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={0.15}
                    step={0.005}
                    value={theme.effects.glassOpacity}
                    onChange={(e) =>
                      updateTheme({ effects: { glassOpacity: Number(e.target.value) } })
                    }
                    className="w-full accent-[var(--color-violet)]"
                  />
                </label>
              </div>
            </section>
          </div>

          <div className="sticky-save-bar">
            <button type="button" className="studio-btn studio-btn-primary" onClick={doSave}>
              Save
            </button>
            <button type="button" className="studio-btn" onClick={download}>
              Export
            </button>
            <button type="button" className="studio-btn" onClick={() => fileRef.current?.click()}>
              Import
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) void onImport(f)
                e.target.value = ''
              }}
            />
            <button type="button" className="studio-btn" onClick={() => void copyAgent()}>
              Copy for agent
            </button>
            <button
              type="button"
              className="studio-btn studio-btn-danger"
              onClick={() => {
                reset()
                setActivePreset('aether-purple')
                pushActivity('preset-load', 'Reset to aether-purple')
                flash('Reset to aether-purple')
              }}
            >
              Reset
            </button>
          </div>
        </aside>

        <main className="space-y-4">
          <div className="studio-section">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-widest opacity-50">Live preview</h2>
              <Link to="/" className="text-xs text-highlight hover:underline">
                Open full landing →
              </Link>
            </div>

            <div
              className="relative overflow-hidden rounded-[var(--radius-xl)] border p-8 mesh-hero"
              style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-mid)' }}
            >
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-accent-soft">
                {theme.brand.tagline}
              </p>
              <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {theme.brand.name} <span className="text-gradient">preview</span>
              </h3>
              <p className="mt-3 max-w-lg text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Colors, fonts, radius, glow, and glass update instantly. Export JSON for agents
                building fleet sites from this template.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className="btn-primary glow-violet text-sm">
                  Primary CTA
                </button>
                <button type="button" className="btn-secondary text-sm">
                  Secondary
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`card ${i === 2 ? 'glow-violet' : ''}`}>
                  <p className="font-mono text-xs text-highlight">/skill-{i}</p>
                  <p className="mt-2 font-semibold">Sample card</p>
                  <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    Card uses radius, border, and glass tokens.
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="glass rounded-[var(--radius-lg)] p-4 text-sm">
                <span className="text-accent-soft">Glass panel</span> — opacity {theme.effects.glassOpacity}
              </div>
              <div
                className="rounded-[var(--radius-lg)] border p-4 font-mono text-xs"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <span className="text-highlight">mono</span> · {theme.fonts.mono.family}
                <br />
                <span style={{ fontFamily: 'var(--font-sans)' }}>sans · {theme.fonts.sans.family}</span>
              </div>
            </div>
          </div>

          <div className="studio-section">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest opacity-50">
              Theme JSON (live)
            </h2>
            <pre
              className="max-h-80 overflow-auto rounded-[var(--radius-md)] p-3 font-mono text-[11px] leading-relaxed"
              style={{ background: 'color-mix(in srgb, black 40%, transparent)', color: 'var(--color-sky)' }}
            >
              {exportJson()}
            </pre>
          </div>
        </main>
      </div>
    </div>
  )
}
