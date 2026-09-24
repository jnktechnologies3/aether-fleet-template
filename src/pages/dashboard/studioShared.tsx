import { useState } from 'react'

/** Shared Fleet Dashboard chrome styles (injected once in layout). */
export function StudioStyles() {
  return (
    <style>{`
      .studio-input {
        background: color-mix(in srgb, var(--color-text) 5%, transparent);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 0.4rem 0.65rem;
        color: var(--color-text);
        outline: none;
      }
      .studio-input:focus {
        border-color: color-mix(in srgb, var(--color-violet) 50%, transparent);
      }
      .studio-section {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        background: var(--color-card-bg);
        padding: 1rem;
      }
      .studio-btn {
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
        padding: 0.45rem 0.75rem;
        font-size: 0.8rem;
        font-weight: 600;
        background: color-mix(in srgb, var(--color-text) 5%, transparent);
        color: var(--color-text);
        transition: 0.15s;
        cursor: pointer;
      }
      .studio-btn:hover {
        background: color-mix(in srgb, var(--color-violet) 20%, transparent);
        border-color: color-mix(in srgb, var(--color-violet) 40%, transparent);
      }
      .studio-btn-primary {
        background: linear-gradient(135deg, var(--gradient-cta-from), var(--gradient-cta-to));
        border: none;
        color: white;
      }
      .studio-btn-primary:hover {
        filter: brightness(1.08);
      }
      .studio-btn-danger:hover {
        background: color-mix(in srgb, var(--color-danger) 25%, transparent);
        border-color: color-mix(in srgb, var(--color-danger) 50%, transparent);
      }
      .dash-nav-item {
        display: flex;
        align-items: center;
        gap: 0.65rem;
        width: 100%;
        text-align: left;
        border-radius: var(--radius-md);
        padding: 0.55rem 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color-text-muted);
        transition: 0.15s;
        border: 1px solid transparent;
      }
      .dash-nav-item:hover {
        color: var(--color-text);
        background: color-mix(in srgb, var(--color-text) 5%, transparent);
      }
      .dash-nav-item.active {
        color: var(--color-text);
        background: color-mix(in srgb, var(--color-violet) 18%, transparent);
        border-color: color-mix(in srgb, var(--color-violet) 35%, transparent);
      }
      .stat-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        background: var(--color-card-bg);
        padding: 1.1rem 1.25rem;
      }
      .sticky-save-bar {
        position: sticky;
        bottom: 0;
        z-index: 20;
        margin-top: auto;
        border-top: 1px solid var(--color-border);
        background: color-mix(in srgb, var(--color-bg-deep) 92%, transparent);
        backdrop-filter: blur(12px);
        padding: 0.75rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        border-radius: 0 0 var(--radius-xl) var(--radius-xl);
      }
    `}</style>
  )
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <div
      className="fixed bottom-6 right-6 z-50 rounded-[var(--radius-lg)] px-4 py-2 text-sm font-medium shadow-lg"
      style={{
        background: 'var(--color-violet)',
        color: 'white',
        boxShadow: '0 8px 32px rgba(var(--color-violet-rgb), 0.4)',
      }}
    >
      {message}
    </div>
  )
}

export function useToast() {
  const [toast, setToast] = useState<string | null>(null)
  const flash = (msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2200)
  }
  return { toast, flash }
}
