export default function CostComparison() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-amber-200/70">
            Illustrative example figures — not a benchmark
          </p>
          <h2 className="section-title">
            Same feature. <span className="text-gradient">Two bills.</span>
          </h2>
          <p className="section-sub mx-auto mt-4">
            Pay a little more attention up front — or pay archaeology later. Numbers below are
            made-up classroom examples for shape, not spend advice.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="card">
            <p className="text-sm font-medium text-rose-300/90">Vibe-coded path</p>
            <h3 className="mt-1 text-2xl font-bold">Cheap open · expensive close</h3>
            <div className="mt-6 space-y-4">
              <Bar label="Upfront tokens / time" width="28%" color="bg-rose-400/70" value="~2h" />
              <Bar label="Debug & rewrite later" width="92%" color="bg-rose-500" value="~3 weeks" />
              <Bar label="Onboarding next hire" width="80%" color="bg-rose-400/50" value="high" />
            </div>
            <p className="mt-6 text-sm text-white/45">
              Example: “working” demo in an afternoon; behavioral gaps surface after launch.
            </p>
          </div>

          <div className="card border-[color-mix(in_srgb,var(--color-violet)_25%,transparent)]">
            <p className="text-sm font-medium text-highlight/90">Workflow path</p>
            <h3 className="mt-1 text-2xl font-bold">Intentional open · calm close</h3>
            <div className="mt-6 space-y-4">
              <Bar label="Upfront tokens / time" width="55%" color="bg-accent" value="~1 day" />
              <Bar label="Debug & rewrite later" width="22%" color="bg-highlight" value="~2 days" />
              <Bar label="Onboarding next hire" width="30%" color="bg-[color-mix(in_srgb,var(--color-sky)_80%,transparent)]" value="low" />
            </div>
            <p className="mt-6 text-sm text-white/45">
              Example: scope + design + verify before merge; docs travel with the change.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Bar({
  label,
  width,
  color,
  value,
}: {
  label: string
  width: string
  color: string
  value: string
}) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs text-white/50">
        <span>{label}</span>
        <span className="font-mono text-white/70">{value}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width }} />
      </div>
    </div>
  )
}
