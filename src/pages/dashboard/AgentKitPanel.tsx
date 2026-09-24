import { useState } from 'react'
import { AGENT_TEMPLATE_MD as agentTemplateMd } from '../../content/agentTemplate'
import agentSchema from '../../theme/agent-schema.json'
import { useTheme } from '../../theme/ThemeProvider'
import { Toast, useToast } from './studioShared'

const AGENT_BRIEF = `# Fleet site spin-up brief

Use the Aether fleet template to clone a new themed marketing site.

## Steps
1. Copy the starter repo (\`aether-agentic-course\`) to a new folder.
2. Drop the theme JSON below at \`public/themes/<slug>.json\` (or Import it in Fleet Theme Studio).
3. Edit marketing copy in \`src/content/site.ts\` (siteName, hero, pricing, nav, footer).
4. Optionally set brand chrome via ThemeTokens.brand (name / tagline / logoText).
5. Run \`npm install && npm run build\`. Spot-check \`/\` and \`/dashboard\`.

## Do / don't
- Do: drive visuals through theme tokens + CSS variables (\`applyTheme\`).
- Don't: hard-code hex colors — use \`var(--color-*)\` / utility classes.
- Don't: invent a parallel theme system beside \`src/theme/\`.

## Schema
See \`src/theme/agent-schema.json\` and \`src/theme/tokens.ts\` (ThemeTokens).

## Recommended prompt (paste to an agent)

\`\`\`
Clone the Aether fleet template. Drop the attached theme.json into public/themes/<slug>.json.
Update src/content/site.ts for this brand. Keep the ThemeProvider / CSS-variable system.
npm install && npm run build must pass. Do not hard-code colors.
\`\`\`
`

const SPIN_PROMPT = `You are spinning a new fleet marketing site from the Aether agentic course template.

1. Copy the template repo to a new project folder.
2. Save the provided theme.json to public/themes/<client-slug>.json (validate against src/theme/agent-schema.json).
3. Rewrite src/content/site.ts for the client (name, hero, nav, pricing, footer, email).
4. Keep ThemeProvider, applyTheme, and CSS-variable utilities — do not invent a second styling system.
5. Run npm install && npm run build. Confirm / and /dashboard render.
6. Optional: link the landing with ?theme=<client-slug> or persist via localStorage key aether-fleet-theme.`

export default function AgentKitPanel() {
  const { theme, exportJson, agentBlob } = useTheme()
  const { toast, flash } = useToast()
  const [showTemplate, setShowTemplate] = useState(false)
  const [showSchema, setShowSchema] = useState(true)

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text)
    flash(label)
  }

  const downloadTheme = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${theme.id || 'theme'}.json`
    a.click()
    URL.revokeObjectURL(url)
    flash('Downloaded theme.json')
  }

  const downloadBrief = () => {
    const body = `${AGENT_BRIEF}\n\n## Current theme JSON\n\n\`\`\`json\n${exportJson()}\n\`\`\`\n`
    const blob = new Blob([body], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'fleet-agent-brief.md'
    a.click()
    URL.revokeObjectURL(url)
    flash('Downloaded agent brief')
  }

  const schemaSummary = [
    { key: 'id', detail: 'Stable theme slug' },
    { key: 'brand', detail: 'name · tagline · logoText' },
    { key: 'colors', detail: '12 tokens (bg, accents, text, border…)' },
    { key: 'gradients', detail: 'heroFrom/To · ctaFrom/Mid/To' },
    { key: 'fonts', detail: 'sans + mono (family + optional Google URL)' },
    { key: 'radius', detail: 'sm · md · lg · xl' },
    { key: 'spacingDensity', detail: 'comfortable | compact' },
    { key: 'effects', detail: 'glowIntensity (0–1) · glassOpacity' },
  ]

  return (
    <div className="space-y-6">
      <Toast message={toast} />
      <div>
        <h2 className="text-xl font-bold tracking-tight">Agent Kit</h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Hand an agent everything needed to clone a fleet site: schema, theme JSON, and a clear brief.
        </p>
      </div>

      <section className="studio-section space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest opacity-50">One-click handoff</h3>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="studio-btn studio-btn-primary"
            onClick={() => void copy(`${AGENT_BRIEF}\n\n## Theme JSON\n\n\`\`\`json\n${exportJson()}\n\`\`\`\n`, 'Copied full agent brief')}
          >
            Copy full agent brief
          </button>
          <button type="button" className="studio-btn" onClick={() => void copy(agentBlob(), 'Copied theme agent blob')}>
            Copy theme blob
          </button>
          <button type="button" className="studio-btn" onClick={downloadTheme}>
            Download theme.json
          </button>
          <button type="button" className="studio-btn" onClick={downloadBrief}>
            Download brief.md
          </button>
          <button
            type="button"
            className="studio-btn"
            onClick={() => void copy(SPIN_PROMPT, 'Copied spin-up prompt')}
          >
            Copy spin-up prompt
          </button>
        </div>
      </section>

      <section className="studio-section space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest opacity-50">
            JSON schema summary
          </h3>
          <button type="button" className="studio-btn" onClick={() => setShowSchema((v) => !v)}>
            {showSchema ? 'Hide details' : 'Show details'}
          </button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {schemaSummary.map((row) => (
            <div
              key={row.key}
              className="rounded-[var(--radius-md)] border px-3 py-2"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <p className="font-mono text-sm font-semibold text-highlight">{row.key}</p>
              <p className="text-xs opacity-60">{row.detail}</p>
            </div>
          ))}
        </div>
        {showSchema && (
          <pre
            className="max-h-72 overflow-auto rounded-[var(--radius-md)] p-3 font-mono text-[11px] leading-relaxed"
            style={{ background: 'color-mix(in srgb, black 40%, transparent)', color: 'var(--color-sky)' }}
          >
            {JSON.stringify(agentSchema, null, 2)}
          </pre>
        )}
      </section>

      <section className="studio-section space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest opacity-50">
          Recommended spin-up prompt
        </h3>
        <pre
          className="overflow-auto rounded-[var(--radius-md)] p-3 font-mono text-[11px] leading-relaxed whitespace-pre-wrap"
          style={{ background: 'color-mix(in srgb, black 40%, transparent)', color: 'var(--color-text-muted)' }}
        >
          {SPIN_PROMPT}
        </pre>
      </section>

      <section className="studio-section space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest opacity-50">
            AGENT_TEMPLATE.md
          </h3>
          <div className="flex gap-2">
            <button
              type="button"
              className="studio-btn"
              onClick={() => void copy(agentTemplateMd, 'Copied AGENT_TEMPLATE.md')}
            >
              Copy
            </button>
            <button type="button" className="studio-btn" onClick={() => setShowTemplate((v) => !v)}>
              {showTemplate ? 'Collapse' : 'Expand in-app'}
            </button>
          </div>
        </div>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Full agent contract from the repo root — clone, drop theme, edit{' '}
          <code className="font-mono">site.ts</code>, build.
        </p>
        {showTemplate && (
          <pre
            className="max-h-[28rem] overflow-auto rounded-[var(--radius-md)] p-3 font-mono text-[11px] leading-relaxed whitespace-pre-wrap"
            style={{ background: 'color-mix(in srgb, black 40%, transparent)', color: 'var(--color-sky)' }}
          >
            {agentTemplateMd}
          </pre>
        )}
      </section>
    </div>
  )
}
