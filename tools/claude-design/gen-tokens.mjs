// tokens.json from src/app/globals.css: every --var of :root (light) and .dark,
// values exactly as written, plus the type scale the components use.
// Usage: node gen-tokens.mjs <repoRoot> <outFile> <branch@shortSha>
import fs from "node:fs"
import path from "node:path"

const [repo, outFile, ref] = process.argv.slice(2)
const css = fs.readFileSync(path.join(repo, "src/app/globals.css"), "utf8")
const block = (sel) => {
  const start = css.indexOf(`${sel} {`)
  const body = css.slice(start, css.indexOf("}", start))
  return Object.fromEntries([...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]))
}
const light = block(":root")
const dark = block(".dark")

const usage = {
  background: "Page and app background. Ground for `foreground` text.",
  foreground: "Default text and icons on `background`, `card`, `popover`.",
  card: "Card, table and panel surfaces (Card, data tables, block sections).",
  "card-foreground": "Text on `card`.",
  popover: "Floating surfaces: popover, dropdown menu, select list, tooltip content, combobox.",
  "popover-foreground": "Text on `popover`.",
  primary: "Primary actions: default Button, selected checkbox / switch / radio, active step, progress fill. Near-black in light, near-white in dark.",
  "primary-foreground": "Text and icons on `primary` (default Button label).",
  secondary: "Secondary Button and secondary Badge fill.",
  "secondary-foreground": "Text on `secondary`.",
  muted: "Quiet fills: skeletons, table row hover, tab list track, empty states, code backgrounds.",
  "muted-foreground": "Secondary text: descriptions, helper text, placeholders, table captions, timestamps. On `background`, `card` and `muted`.",
  accent: "Hover and focus fill of ghost / outline buttons, menu items and list rows.",
  "accent-foreground": "Text on `accent`.",
  destructive: "The only colour of the theme: errors, destructive Button, invalid field borders. Use for danger, never for decoration.",
  border: "Every hairline: cards, inputs, separators, table rows (applied to all elements by default).",
  input: "Border of form controls (Input, Select trigger, Textarea, outline Button); fill of switches when off.",
  ring: "Focus ring (at 50% opacity, 3px) around focused controls.",
  "chart-1": "Chart series 1, lightest grey. Charts stay in greys: tell series apart by lightness and labels.",
  "chart-2": "Chart series 2.",
  "chart-3": "Chart series 3.",
  "chart-4": "Chart series 4.",
  "chart-5": "Chart series 5, darkest grey.",
  sidebar: "Sidebar background (app shell).",
  "sidebar-foreground": "Text and icons in the sidebar.",
  "sidebar-primary": "Active / brand item in the sidebar (logo tile, active indicator). The dark theme value is shadcn's default blue, kept as the code has it.",
  "sidebar-primary-foreground": "Text on `sidebar-primary`.",
  "sidebar-accent": "Hover and active row fill in the sidebar.",
  "sidebar-accent-foreground": "Text on `sidebar-accent`.",
  "sidebar-border": "Sidebar edge and separators.",
  "sidebar-ring": "Focus ring inside the sidebar.",
}

const colors = []
for (const [name, value] of Object.entries(light)) {
  if (name === "radius") continue
  colors.push({ name, value: { light: value, dark: dark[name] ?? value }, usage: usage[name] ?? `Used as var(--${name}).` })
}

const tokens = {
  name: "40-60 · shadcn DS",
  version: 1,
  color: { themes: [{ id: "light", name: "Light" }, { id: "dark", name: "Dark" }], tokens: colors },
  type: {
    fonts: [],
    families: {
      "geist-sans": '"Geist", ui-sans-serif, system-ui, sans-serif',
      "geist-mono": '"Geist Mono", ui-monospace, SFMono-Regular, monospace',
    },
    groups: [
      {
        name: "Text",
        family: "geist-sans",
        styles: [
          { name: "type-caption", fontSize: "12px", lineHeight: "16px", fontWeight: 400, usage: "`text-xs`: helper text, badges and kbd (weight 500 there), table footers." },
          { name: "type-body-sm", fontSize: "14px", lineHeight: "20px", fontWeight: 400, usage: "`text-sm`: the default UI size: inputs, menu items, table cells, descriptions." },
          { name: "type-label", fontSize: "14px", lineHeight: "14px", fontWeight: 500, usage: "`text-sm leading-none font-medium`: Label, Button text, table headers, item titles." },
          { name: "type-body", fontSize: "16px", lineHeight: "24px", fontWeight: 400, usage: "`text-base`: long-form text and body copy of pages." },
          { name: "type-title", fontSize: "16px", lineHeight: "22px", fontWeight: 500, usage: "`text-base leading-snug font-medium`: CardTitle, DialogTitle, SheetTitle, DrawerTitle." },
          { name: "type-heading", fontSize: "24px", lineHeight: "32px", fontWeight: 600, usage: "`text-2xl font-semibold`: page and section titles in the blocks and dashboards." },
          { name: "type-display", fontSize: "30px", lineHeight: "36px", fontWeight: 700, letterSpacing: "-0.025em", usage: "`text-3xl font-bold tracking-tight`: top-of-page titles (hero, gallery headers)." },
        ],
      },
      {
        name: "Code",
        family: "geist-mono",
        styles: [{ name: "type-code", fontSize: "14px", lineHeight: "20px", fontWeight: 400, usage: "`font-mono text-sm`: code blocks, ids, numbers that must align." }],
      },
    ],
  },
  radius: {
    note: "One radius drives the scale: radius-sm = radius × 0.6, -md × 0.8, -lg × 1, -xl × 1.4, -2xl × 1.8, -3xl × 2.2, -4xl × 2.6 (declared by bundle.css from --radius).",
    tokens: [{ name: "radius", value: light.radius, usage: "Base radius (10px). Cards and dialogs use radius-xl (14px), buttons and inputs radius-lg (10px) or radius-md (8px), badges are pills." }],
  },
  meta: {
    source: "github",
    repo: "valentin834/shadcn-ds-template",
    ref,
    paths: { tokens: ["src/app/globals.css"], docs: ["DESIGN-SYSTEM.md"] },
    synced: new Date().toISOString().slice(0, 10),
  },
}
fs.writeFileSync(outFile, JSON.stringify(tokens, null, 2) + "\n")
console.log(`colors ${colors.length} × 2 themes, radius ${light.radius}, type styles ${tokens.type.groups.reduce((n, g) => n + g.styles.length, 0)}`)
