import { useState } from 'react'

const modules = [
  { title: 'Orientation & harness setup', lessons: 5, duration: '22m', items: ['Lab overview & how to practice', 'Install your agent harness', 'Repo layout for agentic work', 'Cheat sheet walkthrough', 'First verified “hello” run'] },
  { title: 'How agents actually fail', lessons: 6, duration: '48m', items: ['Context windows & forgetting', 'Hallucinated APIs', 'Silent requirement drift', 'When tools lie', 'Recovery patterns', 'Lab: break a session on purpose'] },
  { title: 'Thin context engineering', lessons: 5, duration: '35m', items: ['What to load vs leave out', 'Project memory files', 'Nested rules for packages', 'Refreshing stale docs', 'Lab: slim a bloated context pack'] },
  { title: 'The nine-skill system', lessons: 7, duration: '1h 10m', items: ['Why this sequence exists', 'Entry points by situation', '/scope deep dive', '/audit deep dive', '/architect deep dive', 'When to skip a stage', 'Challenge: pick your entry skill'] },
  { title: 'Build: greenfield slice', lessons: 8, duration: '1h 40m', items: ['Scope an MVP', 'Architect the core loop', 'Develop task-by-task', 'Check & test', 'Document decisions', 'Sync the first PR', 'Showcase review', 'Interview notes'] },
  { title: 'Extend a live feature', lessons: 6, duration: '55m', items: ['Audit touch points', 'Design the delta', 'Implement without forking style', 'Regression harness', 'PR summary from plan', 'Challenge: fit-in refactor'] },
  { title: 'Inherit legacy code', lessons: 6, duration: '1h 05m', items: ['Audit an unfamiliar repo', 'Find dead paths', 'Smallest safe change', 'Document findings', 'Add a locking test', 'Challenge: inherited bugfix'] },
  { title: 'Verify like a senior', lessons: 5, duration: '40m', items: ['Two kinds of proof', '/check review habits', '/test behavior not lines', 'Make the suite lie (on purpose)', 'Definition of done'] },
  { title: 'Debug & recover', lessons: 6, duration: '50m', items: ['Reproduce first', 'Root vs symptom', '/debug method', 'Broken session recovery', 'Incident notes', 'Challenge: diagnose cold'] },
  { title: 'Ship with humans', lessons: 4, duration: '28m', items: ['Why a second mind matters', '/document that travels', '/sync for reviewers', 'The loop you’ll actually run'] },
  { title: 'Author your own skills', lessons: 5, duration: '45m', items: ['SKILL format basics', 'Checks your stack needs', 'Skills vs tools vs MCP', 'Versioning team skills', 'Lab: ship one custom skill'] },
  { title: 'Capstone: one feature, full loop', lessons: 4, duration: '1h 20m', items: ['Pick greenfield / live / legacy', 'Run the full sequence', 'Peer review rubric', 'Certificate checklist'] },
]

export default function Curriculum() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="curriculum" className="section-pad scroll-mt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="section-title">
            Curriculum
          </h2>
          <p className="section-sub mx-auto mt-4">
            Twelve modules. Original lesson arcs built around judgment, not tool tourism.
          </p>
        </div>
        <div className="mx-auto max-w-3xl space-y-3">
          {modules.map((m, i) => {
            const isOpen = open === i
            return (
              <div key={m.title} className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                <button
                  type="button"
                  className="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.04] transition"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-sm text-accent-soft/80 w-8">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flex-1 font-semibold">{m.title}</span>
                  <span className="hidden sm:inline text-xs text-white/40">
                    {m.lessons} lessons · {m.duration}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`text-white/40 transition ${isOpen ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {isOpen && (
                  <div className="border-t border-white/10 px-5 py-4 bg-black/20 animate-fade-in">
                    <p className="mb-3 text-xs text-white/40 sm:hidden">
                      {m.lessons} lessons · {m.duration}
                    </p>
                    <ul className="space-y-2">
                      {m.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-white/60">
                          <span className="text-highlight/70">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
