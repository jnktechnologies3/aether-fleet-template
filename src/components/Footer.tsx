import { Link } from 'react-router-dom'
import { site } from '../content/site'
import { useTheme } from '../theme/ThemeProvider'

export default function Footer() {
  const { theme } = useTheme()
  const brand = theme.brand.logoText || site.siteName

  return (
    <footer className="border-t bg-black/30" style={{ borderColor: 'var(--color-border)' }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <a href="/" className="flex items-center gap-2 font-bold">
            <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] brand-gradient">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 3L20 18H4L12 3Z" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="15" r="2" fill="currentColor" />
              </svg>
            </span>
            {brand}
          </a>
          <p className="mt-3 max-w-xs text-sm" style={{ color: 'color-mix(in srgb, var(--color-text) 45%, transparent)' }}>
            {site.footer.blurb}
          </p>
        </div>
        <div className="flex flex-wrap gap-10 text-sm">
          <div>
            <p className="mb-3 font-semibold" style={{ color: 'color-mix(in srgb, var(--color-text) 80%, transparent)' }}>{site.footer.exploreLabel}</p>
            <ul className="space-y-2" style={{ color: 'color-mix(in srgb, var(--color-text) 45%, transparent)' }}>
              {site.nav.links.map((l) => (
                <li key={l.href}><a href={l.href} className="hover:opacity-100" style={{ color: 'inherit' }}>{l.label}</a></li>
              ))}
              <li><Link to="/dashboard" className="hover:opacity-100">Theme Studio</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-semibold" style={{ color: 'color-mix(in srgb, var(--color-text) 80%, transparent)' }}>{site.footer.courseLabel}</p>
            <ul className="space-y-2" style={{ color: 'color-mix(in srgb, var(--color-text) 45%, transparent)' }}>
              <li><a href="#pricing" className="hover:opacity-100">{site.nav.cta}</a></li>
              <li><span className="cursor-default">{site.email}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs" style={{ borderColor: 'color-mix(in srgb, var(--color-text) 5%, transparent)', color: 'color-mix(in srgb, var(--color-text) 35%, transparent)' }}>
        © {site.copyrightYear} {brand}. All rights reserved. {site.footerNote}
      </div>
    </footer>
  )
}
