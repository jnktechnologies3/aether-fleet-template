import { NavLink, Outlet, useLocation, Link } from 'react-router-dom'
import { StudioStyles } from './dashboard/studioShared'

const NAV = [
  { to: '/dashboard', end: true, label: 'Overview', icon: '◉' },
  { to: '/dashboard/theme', end: false, label: 'Theme Studio', icon: '◐' },
  { to: '/dashboard/fleet', end: false, label: 'Fleet', icon: '▦' },
  { to: '/dashboard/agent', end: false, label: 'Agent Kit', icon: '⌘' },
] as const

export default function Dashboard() {
  const loc = useLocation()

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-deep)' }}>
      <StudioStyles />

      <header
        className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b px-4 py-3 backdrop-blur-xl sm:px-6"
        style={{
          borderColor: 'var(--color-border)',
          background: 'color-mix(in srgb, var(--color-bg-deep) 85%, transparent)',
        }}
      >
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group" title="Landing preview">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-lg)] brand-gradient shadow-lg"
              style={{ boxShadow: '0 8px 24px rgba(var(--color-violet-rgb), 0.3)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 3L20 18H4L12 3Z" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="12" cy="15" r="2" fill="currentColor" />
              </svg>
            </span>
          </Link>
          <div>
            <h1 className="text-base font-bold tracking-tight sm:text-lg">
              Fleet <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="hidden text-[11px] opacity-40 sm:block">Look-and-feel control for your site fleet</p>
          </div>
        </div>
        <Link to="/" className="studio-btn text-sm no-underline">
          ← Landing preview
        </Link>
      </header>

      <div className="mx-auto flex max-w-[1600px] flex-col gap-0 lg:flex-row">
        <nav
          className="flex shrink-0 gap-1 overflow-x-auto border-b p-3 lg:w-56 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-4"
          style={{ borderColor: 'var(--color-border)' }}
          aria-label="Dashboard sections"
        >
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `dash-nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="opacity-70" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="min-w-0 flex-1 p-4 sm:p-6" key={loc.pathname}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
