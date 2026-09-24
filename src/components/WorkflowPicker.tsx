import { useState } from 'react'

const workflows = [
  {
    id: 'product',
    label: 'New product',
    steps: ['/scope the MVP outcome', '/architect core modules', '/develop first vertical slice', '/test the happy path', '/document decisions', '/sync open the first PR'],
  },
  {
    id: 'feature',
    label: 'New feature',
    steps: ['/audit touch points', '/scope the change boundary', '/architect the delta', '/develop task-by-task', '/check the diff', '/test + /sync'],
  },
  {
    id: 'legacy',
    label: 'Legacy',
    steps: ['/audit the real graph', 'Write findings to context docs', '/scope the smallest safe change', '/architect against existing seams', '/develop + /check', '/document what you learned'],
  },
  {
    id: 'broke',
    label: 'Something broke',
    steps: ['/debug reproduce first', 'Name the root cause', 'Patch the cause (not the symptom)', '/test add a locking case', '/document the failure mode', '/sync share the incident note'],
  },
]

export default function WorkflowPicker() {
  const [active, setActive] = useState(workflows[0].id)
  const wf = workflows.find((w) => w.id === active)!

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="section-title">
            Workflow <span className="text-gradient">picker</span>
          </h2>
          <p className="section-sub mx-auto mt-4">
            Pick your situation — get the step list. Same skills, different entry points.
          </p>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="flex flex-wrap gap-1 border-b border-white/10 p-2 bg-black/30">
            {workflows.map((w) => (
              <button
                key={w.id}
                type="button"
                onClick={() => setActive(w.id)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  active === w.id
                    ? 'bg-gradient-to-r from-[color-mix(in_srgb,var(--color-violet)_40%,transparent)] to-[color-mix(in_srgb,var(--color-cyan)_30%,transparent)] text-white'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
          <ol className="grid gap-3 p-6 sm:grid-cols-2" key={active}>
            {wf.steps.map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 animate-fade-in"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--color-violet)_20%,transparent)] font-mono text-xs text-accent-soft">
                  {i + 1}
                </span>
                <span className="text-sm text-white/75 pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
