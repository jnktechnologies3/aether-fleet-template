import { useState } from 'react'

const skills = [
  { cmd: '/scope', blurb: 'Compress a vague ask into one goal and ordered tasks.' },
  { cmd: '/audit', blurb: 'Read the real codebase; write context the next run can trust.' },
  { cmd: '/architect', blurb: 'Decide shape and boundaries before implementation.' },
  { cmd: '/develop', blurb: 'Implement one task with project conventions loaded.' },
  { cmd: '/check', blurb: 'Self-review the diff for types, edges, and security.' },
  { cmd: '/test', blurb: 'Lock behavior with tests that fail when it regresses.' },
  { cmd: '/document', blurb: 'Capture the why in changelog and living docs.' },
  { cmd: '/sync', blurb: 'Open a PR humans can review without archaeology.' },
  { cmd: '/debug', blurb: 'Reproduce, find root cause, fix, and lock with a test.' },
]

export default function SkillsGrid() {
  const [hover, setHover] = useState<string | null>(null)

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="section-title">
            Skills are free. <span className="text-gradient">Judgment isn’t.</span>
          </h2>
          <p className="section-sub mx-auto mt-4">
            Anyone can install commands. Knowing when to run which — and when to stop the agent — is the craft.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s) => {
            const open = hover === s.cmd
            return (
              <div
                key={s.cmd}
                onMouseEnter={() => setHover(s.cmd)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(s.cmd)}
                onBlur={() => setHover(null)}
                tabIndex={0}
                className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 cursor-default outline-none focus:ring-2 focus:ring-violet-400/40 ${
                  open ? 'border-cyan-400/30 bg-white/[0.06] scale-[1.02]' : ''
                }`}
              >
                <p className="font-mono text-accent-soft">{s.cmd}</p>
                <p
                  className={`mt-2 text-sm text-white/55 transition-all duration-300 ${
                    open ? 'opacity-100 max-h-24' : 'opacity-60 max-h-12 overflow-hidden'
                  }`}
                >
                  {s.blurb}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
