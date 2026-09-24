const cards = [
  {
    q: 'You can ship a small feature solo?',
    a: 'Yes — a component, an API route, a tiny app. You don’t need senior title; you need basic fluency.',
    fit: true,
  },
  {
    q: 'You’re open to changing how you work?',
    a: 'This system asks you to slow down at the start so you don’t thrash later. Mindset beats tooling.',
    fit: true,
  },
  {
    q: 'You’ve never written a line of code?',
    a: 'Not yet — learn the basics first. Agentic engineering assumes you can read and write code.',
    fit: false,
  },
  {
    q: 'You only want prompt tricks for demos?',
    a: 'Wrong room. We optimize for production judgment, not one-shot viral screenshots.',
    fit: false,
  },
]

export default function FitCheck() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="section-title">
            Fit <span className="text-gradient">check</span>
          </h2>
          <p className="section-sub mx-auto mt-4">
            Honest filters beat disappointed students. Scan these before you enroll.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map((c) => (
            <div
              key={c.q}
              className={`card ${c.fit ? 'border-emerald-400/20' : 'border-white/10 opacity-90'}`}
            >
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  c.fit ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/10 text-white/50'
                }`}
              >
                {c.fit ? 'Good fit' : 'Not yet'}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{c.q}</h3>
              <p className="mt-2 text-sm text-white/55 leading-relaxed">{c.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
