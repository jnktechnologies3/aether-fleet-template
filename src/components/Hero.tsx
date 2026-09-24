import { site } from '../content/site'
import { useTheme } from '../theme/ThemeProvider'

export default function Hero() {
  const { theme } = useTheme()
  const tagline = theme.brand.tagline

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="pointer-events-none absolute inset-0 mesh-hero" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm animate-fade-in"
          style={{
            borderColor: 'var(--color-border)',
            background: 'color-mix(in srgb, var(--color-text) 5%, transparent)',
            color: 'var(--color-sky)',
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-highlight animate-pulse" />
          {site.hero.badge}
        </div>

        {tagline && (
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent-soft">
            {tagline}
          </p>
        )}

        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {site.hero.titleBefore}{' '}
          <span className="text-gradient">{site.hero.titleHighlight}</span>
          {' '}{site.hero.titleAfter}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl" style={{ color: 'var(--color-text-muted)' }}>
          {site.hero.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href={site.hero.primaryHref} className="btn-primary glow-violet w-full sm:w-auto">
            {site.hero.primaryCta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a href={site.hero.secondaryHref} className="btn-secondary w-full sm:w-auto">
            {site.hero.secondaryCta}
          </a>
        </div>

        <p className="mt-8 text-sm" style={{ color: 'color-mix(in srgb, var(--color-text) 40%, transparent)' }}>
          {site.hero.footnote}
        </p>
      </div>
    </section>
  )
}
