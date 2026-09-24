import { useEffect, useMemo, useState, type FormEvent } from 'react'
import {
  createSiteDraft,
  deleteSite,
  listAssignableThemes,
  loadLibrary,
  loadSites,
  pushActivity,
  removeFromLibrary,
  resolveThemeLabel,
  upsertSite,
} from '../../fleet/storage'
import type { FleetSite, ThemeLibraryEntry } from '../../fleet/types'
import { Toast, useToast } from './studioShared'

const emptyForm = (): FleetSite => createSiteDraft()

export default function FleetPanel() {
  const { toast, flash } = useToast()
  const [sites, setSites] = useState<FleetSite[]>([])
  const [library, setLibrary] = useState<ThemeLibraryEntry[]>([])
  const [editing, setEditing] = useState<FleetSite | null>(null)
  const [assignPick, setAssignPick] = useState<Record<string, string>>({})

  const refresh = () => {
    setSites(loadSites())
    setLibrary(loadLibrary())
  }

  useEffect(() => {
    refresh()
  }, [])

  const assignables = useMemo(() => listAssignableThemes(library), [library])

  const startAdd = () => setEditing(emptyForm())
  const startEdit = (site: FleetSite) => setEditing({ ...site })
  const cancelEdit = () => setEditing(null)

  const submitForm = (e: FormEvent) => {
    e.preventDefault()
    if (!editing) return
    const name = editing.name.trim()
    const slug = editing.slug.trim() || name.toLowerCase().replace(/\s+/g, '-')
    if (!name) {
      flash('Name is required')
      return
    }
    const isNew = !sites.some((s) => s.id === editing.id)
    const next = { ...editing, name, slug, url: editing.url?.trim() || undefined, notes: editing.notes?.trim() || undefined }
    setSites(upsertSite(next))
    pushActivity(isNew ? 'site-add' : 'site-edit', `${isNew ? 'Added' : 'Updated'} “${name}”`)
    setEditing(null)
    flash(isNew ? 'Site added' : 'Site updated')
  }

  const remove = (site: FleetSite) => {
    if (!window.confirm(`Delete “${site.name}” from the local fleet registry?`)) return
    setSites(deleteSite(site.id))
    pushActivity('site-delete', `Removed “${site.name}”`)
    flash('Site deleted')
  }

  const applyTheme = (site: FleetSite) => {
    const themeId = assignPick[site.id] ?? site.themeId
    if (!themeId) {
      flash('Pick a theme first')
      return
    }
    const next = { ...site, themeId }
    setSites(upsertSite(next))
    const label = resolveThemeLabel(themeId, library)
    pushActivity('theme-assign', `Assigned “${label}” → ${site.name}`)
    flash(`Applied “${label}” to ${site.name}`)
  }

  const removeLib = (id: string, name: string) => {
    if (!window.confirm(`Remove “${name}” from the theme library?`)) return
    setLibrary(removeFromLibrary(id))
    flash('Removed from library')
  }

  return (
    <div className="space-y-6">
      <Toast message={toast} />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Fleet</h2>
          <p className="mt-1 max-w-2xl text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Local site registry + theme library. Assignments are client-side for now — agents still
            use exported JSON per site.
          </p>
        </div>
        <button type="button" className="studio-btn studio-btn-primary" onClick={startAdd}>
          Add site
        </button>
      </div>

      {editing && (
        <form className="studio-section space-y-3" onSubmit={submitForm}>
          <h3 className="text-xs font-semibold uppercase tracking-widest opacity-50">
            {sites.some((s) => s.id === editing.id) ? 'Edit site' : 'New site'}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block text-xs opacity-60">Name</span>
              <input
                className="studio-input w-full"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                required
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-xs opacity-60">Slug</span>
              <input
                className="studio-input w-full font-mono text-xs"
                value={editing.slug}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                placeholder="auto-from-name"
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1 block text-xs opacity-60">URL (optional)</span>
              <input
                className="studio-input w-full font-mono text-xs"
                value={editing.url ?? ''}
                onChange={(e) => setEditing({ ...editing, url: e.target.value })}
                placeholder="https://"
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1 block text-xs opacity-60">Notes</span>
              <textarea
                className="studio-input w-full min-h-[4rem] resize-y"
                value={editing.notes ?? ''}
                onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
              />
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="submit" className="studio-btn studio-btn-primary">
              Save site
            </button>
            <button type="button" className="studio-btn" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <section className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest opacity-50">
          Sites ({sites.length})
        </h3>
        <div className="grid gap-3">
          {sites.map((site) => (
            <article key={site.id} className="studio-section">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-semibold tracking-tight">{site.name}</h4>
                  <p className="mt-0.5 font-mono text-xs opacity-50">{site.slug}</p>
                  {site.url ? (
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-xs text-highlight hover:underline"
                    >
                      {site.url}
                    </a>
                  ) : null}
                  {site.notes ? (
                    <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {site.notes}
                    </p>
                  ) : null}
                  <p className="mt-2 text-xs opacity-60">
                    Assigned theme:{' '}
                    <span className="font-medium text-[var(--color-text)]">
                      {resolveThemeLabel(site.themeId, library)}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className="studio-btn" onClick={() => startEdit(site)}>
                    Edit
                  </button>
                  <button type="button" className="studio-btn studio-btn-danger" onClick={() => remove(site)}>
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-end gap-2 border-t pt-3" style={{ borderColor: 'var(--color-border)' }}>
                <label className="block min-w-[12rem] flex-1 text-sm">
                  <span className="mb-1 block text-xs opacity-60">Assign theme</span>
                  <select
                    className="studio-input w-full"
                    value={assignPick[site.id] ?? site.themeId ?? ''}
                    onChange={(e) =>
                      setAssignPick((prev) => ({ ...prev, [site.id]: e.target.value }))
                    }
                  >
                    <option value="">— select —</option>
                    <optgroup label="Presets">
                      {assignables
                        .filter((a) => a.kind === 'preset')
                        .map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.name}
                          </option>
                        ))}
                    </optgroup>
                    {library.length > 0 && (
                      <optgroup label="Saved library">
                        {assignables
                          .filter((a) => a.kind === 'saved')
                          .map((a) => (
                            <option key={a.id} value={a.id}>
                              {a.name}
                            </option>
                          ))}
                      </optgroup>
                    )}
                  </select>
                </label>
                <button type="button" className="studio-btn studio-btn-primary" onClick={() => applyTheme(site)}>
                  Apply theme to site
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="studio-section space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest opacity-50">
            Theme library
          </h3>
          <span className="text-[11px] opacity-40">
            Presets always available · save from Theme Studio
          </span>
        </div>
        {library.length === 0 ? (
          <p className="text-sm opacity-50">
            No saved snapshots yet. Open Theme Studio → “Save current as…” to add one.
          </p>
        ) : (
          <ul className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
            {library.map((entry) => (
              <li
                key={entry.id}
                className="flex flex-wrap items-center justify-between gap-2 py-2.5 first:pt-0 last:pb-0"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div>
                  <p className="font-medium">{entry.name}</p>
                  <p className="text-xs opacity-45">
                    {entry.theme.id} · saved {new Date(entry.savedAt).toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  className="studio-btn studio-btn-danger"
                  onClick={() => removeLib(entry.id, entry.name)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="rounded-[var(--radius-md)] border px-3 py-2 text-xs" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
          Note: fleet assignments live in <code className="font-mono">localStorage</code> (
          <code className="font-mono">aether-fleet-sites</code>). For real deploys, export theme JSON
          per site and drop it under <code className="font-mono">public/themes/</code>.
        </p>
      </section>
    </div>
  )
}
