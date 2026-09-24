const quotes = [
  {
    name: 'Priya N.',
    role: 'Platform engineer',
    text: 'I finally stopped pasting entire repos into chat. Thin context + /check cut my rewrite cycles in half.',
  },
  {
    name: 'Marcus Ellison',
    role: 'Indie SaaS founder',
    text: 'The legacy module was the unlock. Inherited a client app and made a safe change in a day instead of a week of guessing.',
  },
  {
    name: 'Helena Vogt',
    role: 'Staff frontend',
    text: 'Not another “prompt pack.” It taught me when to refuse the agent’s plan — that’s the skill I was missing.',
  },
  {
    name: 'Jamal Reed',
    role: 'Backend contractor',
    text: 'Workflow picker for “something broke” is taped above my monitor. Reproduce → root → lock. Simple and sticky.',
  },
  {
    name: 'Sofia Almeida',
    role: 'Full-stack at a Series B',
    text: 'Our team adopted the same skill names. PRs got clearer overnight because summaries come from the plan, not vibes.',
  },
  {
    name: 'Kenji Morita',
    role: 'DevRel engineer',
    text: 'I came for agents, stayed for judgment. The cost-comparison framing alone changed how I sell process to stakeholders.',
  },
]

export default function Testimonials() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="section-title">
            From builders in the <span className="text-gradient">lab</span>
          </h2>
          <p className="section-sub mx-auto mt-4">
            Fictional composites for this demo site — original voices, not lifted quotes.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.name} className="card flex flex-col">
              <blockquote className="flex-1 text-sm leading-relaxed text-white/70">“{q.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[color-mix(in_srgb,var(--color-violet)_40%,transparent)] to-[color-mix(in_srgb,var(--color-cyan)_30%,transparent)] text-sm font-semibold">
                  {q.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                </span>
                <div>
                  <p className="text-sm font-semibold">{q.name}</p>
                  <p className="text-xs text-white/45">{q.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
