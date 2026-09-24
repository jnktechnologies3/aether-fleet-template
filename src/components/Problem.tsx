export default function Problem() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <h2 className="section-title">
            Great for 30 minutes,{' '}
            <span className="text-gradient">then it collapses</span>
          </h2>
          <p className="section-sub mt-4">
            Prompt-and-hope ships a demo. A structured workflow ships something you can
            still debug at 2am six months later.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent pointer-events-none" />
            <p className="text-sm font-medium uppercase tracking-wider text-rose-300/80">Prompt & hope</p>
            <h3 className="mt-2 text-xl font-semibold">Fast start · silent decay</h3>
            <svg viewBox="0 0 320 120" className="mt-6 w-full" aria-hidden>
              <defs>
                <linearGradient id="failGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="var(--color-danger)" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M10 90 C 40 20, 80 25, 110 40 S 180 100, 220 95 S 280 110, 310 105"
                fill="none"
                stroke="url(#failGrad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text x="10" y="115" fill="rgba(255,255,255,0.35)" fontSize="10">t=0</text>
              <text x="250" y="115" fill="rgba(255,255,255,0.35)" fontSize="10">chaos</text>
            </svg>
            <ul className="mt-4 space-y-2 text-sm text-white/55">
              <li>• Context balloons until the model invents APIs</li>
              <li>• No written decisions — only chat scrollback</li>
              <li>• Breaks quietly when requirements shift</li>
            </ul>
          </div>

          <div className="card relative overflow-hidden border-[color-mix(in_srgb,var(--color-violet)_20%,transparent)]">
            <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--color-violet)_15%,transparent)] to-[color-mix(in_srgb,var(--color-cyan)_5%,transparent)] pointer-events-none" />
            <p className="text-sm font-medium uppercase tracking-wider text-highlight/80">Structured workflow</p>
            <h3 className="mt-2 text-xl font-semibold">Slower open · durable close</h3>
            <svg viewBox="0 0 320 120" className="mt-6 w-full" aria-hidden>
              <defs>
                <linearGradient id="okGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--color-violet)" />
                  <stop offset="100%" stopColor="var(--color-cyan)" />
                </linearGradient>
              </defs>
              <path
                d="M10 95 C 50 90, 70 70, 100 65 S 160 50, 200 45 S 260 35, 310 30"
                fill="none"
                stroke="url(#okGrad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <text x="10" y="115" fill="rgba(255,255,255,0.35)" fontSize="10">t=0</text>
              <text x="260" y="115" fill="rgba(255,255,255,0.35)" fontSize="10">ship</text>
            </svg>
            <ul className="mt-4 space-y-2 text-sm text-white/55">
              <li>• One goal per run; context stays intentional</li>
              <li>• Decisions written before implementation</li>
              <li>• Verify + document so the next change has rails</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
