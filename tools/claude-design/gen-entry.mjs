// Generates src/entry.tsx (the bundle's namespace) and out/meta.json (the
// component inventory used for READMEs and previews).
// Usage: node gen-entry.mjs [repoRoot]
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repo = path.resolve(process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), "../.."))
const here = path.dirname(fileURLToPath(import.meta.url))
const src = (p) => path.join(repo, "src", p)
const pascal = (s) => s.split(/[^A-Za-z0-9]+/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join("")

// Named exports of a module, read from its export statements.
function namedExports(file) {
  const code = fs.readFileSync(file, "utf8")
  const names = new Set()
  for (const m of code.matchAll(/^export\s+(?:async\s+)?(?:function|const|let|class)\s+([A-Za-z_$][\w$]*)/gm)) names.add(m[1])
  for (const m of code.matchAll(/^export\s*\{([^}]*)\}/gm)) {
    for (const part of m[1].split(",")) {
      const p = part.trim()
      if (!p || p.startsWith("type ")) continue
      const as = p.split(/\s+as\s+/)
      names.add((as[1] || as[0]).trim())
    }
  }
  names.delete("default")
  return [...names].filter((n) => /^[A-Za-z_$][\w$]*$/.test(n))
}
const hasDefault = (file) => /^export\s+default\b/m.test(fs.readFileSync(file, "utf8"))

const gallery = fs.readFileSync(src("app/gallery/page.tsx"), "utf8")
const official = [...gallery.slice(gallery.indexOf("const shadcnOfficial")).split("];")[0].matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1])
const uiFiles = fs.readdirSync(src("components/ui")).filter((f) => f.endsWith(".tsx")).map((f) => f.slice(0, -4))
const primitives = uiFiles.filter((f) => !official.includes(f)).sort()
const tiers = [
  ["reui", "kanban", "kanban"], ["reui", "sortable", "sortable"], ["reui", "tree", "tree"],
  ["reui", "filters", "filters/filters"], ["reui", "cascader", "cascader/cascader"],
  ["reui", "stepper", "stepper"], ["reui", "timeline", "timeline"],
  ["reui", "number-field", "number-field"], ["reui", "time-picker", "time-picker"],
  ["diceui", "tags-input", "tags-input"], ["diceui", "editable", "editable"], ["diceui", "action-bar", "action-bar"],
]
// shadcnstudio blocks: the app routes named like a block (hero-section-01…), one page each
const blocks = fs.readdirSync(src("app"), { withFileTypes: true }).filter((d) => d.isDirectory() && /-\d{2}$/.test(d.name) && fs.existsSync(src(`app/${d.name}/page.tsx`))).map((d) => d.name).sort()
const variantCats = fs.readdirSync(src("components/shadcn-studio"), { withFileTypes: true }).filter((d) => d.isDirectory() && d.name !== "blocks").map((d) => d.name).sort()
const exampleFiles = fs.readdirSync(path.join(here, "src/examples")).filter((f) => f.endsWith(".tsx")).map((f) => f.slice(0, -4)).sort()

const lines = ['import * as React from "react"', 'import * as Lucide from "lucide-react"', 'import { demos as extendedDemos } from "@/app/gallery/extended/demos"']
const body = [`// A Design canvas wraps each <x-import> in <div class="sc-host-x" style="display:contents">.
// Components that read their children (count, clone or match them) get those
// children back unwrapped; the wrapper\x27s data-dc-tpl moves onto the child so the
// editor can still select it.
function unwrapOne(child: any): any {
  if (!React.isValidElement(child)) return child
  const p: any = child.props
  if (child.type !== "div" || p.className !== "sc-host-x" || !React.isValidElement(p.children)) return child
  const inner: any = p.children
  const style = p.style && p.style.display !== "contents" ? { ...p.style, ...(inner.props.style || {}) } : inner.props.style
  return React.cloneElement(inner, { key: child.key ?? inner.key, "data-dc-tpl": p["data-dc-tpl"], ...(style ? { style } : {}) })
}
function unwrapChildren(C: any): any {
  if (typeof C !== "function" && !(C && C.$$typeof)) return C
  const U = React.forwardRef(function Unwrapped(props: any, ref: any) {
    const children = Array.isArray(props.children) ? React.Children.map(props.children, unwrapOne) : unwrapOne(props.children)
    return <C {...props} ref={ref}>{children}</C>
  }) as any
  U.displayName = C.displayName || C.name
  ;((window as any).__DS_SWAP ||= new Map()).set(C, U)
  return U
}`]
const UNWRAP = new Set(["carousel", "stepper", "sortable", "motion-tabs", "motion-highlight", "global-tooltip", "orbiting"])
const taken = new Map() // name -> owner
const meta = { namespace: "Ds4060", families: [], variants: [], examples: {}, blocks: [] }
let n = 0

// A clashing export takes its family's name as a prefix, merging the words they
// share: motion-tabs' TabsList → MotionTabsList, motion-checkbox' Checkbox → MotionCheckbox.
function rename(family, e) {
  if (!/^[A-Z]/.test(e)) return e.startsWith("use") ? `use${family}${e.slice(3)}` : `${family}${e}`
  const fw = family.match(/[A-Z][a-z0-9]*/g) || [family]
  const ew = e.match(/[A-Z][a-z0-9]*/g) || [e]
  for (let k = Math.min(fw.length, ew.length); k > 0; k--) {
    if (fw.slice(-k).join("") === ew.slice(0, k).join("")) return fw.slice(0, fw.length - k).join("") + e
  }
  return family + e
}

function addFamily(kind, slug, importPath, file, group) {
  const id = `m${n++}`
  lines.push(`import * as ${id} from ${JSON.stringify(importPath)}`)
  const exports = namedExports(file)
  const mapped = []
  for (const e of exports) {
    let name = e
    if (taken.has(name)) name = rename(pascal(slug), e)
    if (taken.has(name)) { console.warn(`skip duplicate ${name} from ${importPath} (kept ${taken.get(name)})`); continue }
    taken.set(name, importPath)
    body.push(UNWRAP.has(slug) ? `NS[${JSON.stringify(name)}] = unwrapChildren(${id}[${JSON.stringify(e)}])` : `NS[${JSON.stringify(name)}] = ${id}[${JSON.stringify(e)}]`)
    mapped.push(name)
  }
  // A default export (multi-select's MultipleSelector) is exposed under the family's name.
  if (hasDefault(file) && !mapped.some((m) => m.toLowerCase() === pascal(slug).toLowerCase()) && !taken.has(pascal(slug))) {
    taken.set(pascal(slug), importPath)
    body.push(`NS[${JSON.stringify(pascal(slug))}] = ${id}.default`)
    mapped.unshift(pascal(slug))
  }
  const leads = { resizable: "ResizablePanelGroup", chart: "ChartContainer", sonner: "Toaster", direction: "DirectionProvider" }
  const lead = leads[slug] || mapped.find((m) => m.toLowerCase() === pascal(slug).toLowerCase()) || mapped.find((m) => /^[A-Z]/.test(m)) || pascal(slug)
  meta.families.push({ kind, slug, importPath, group, name: pascal(slug), lead, exports: mapped })
}

for (const o of official) addFamily("shadcn", o, `@/components/ui/${o}`, src(`components/ui/${o}.tsx`), "shadcn")
for (const [kind, slug, p] of tiers) addFamily(kind, slug, `@/components/${kind}/${p}`, src(`components/${kind}/${p}.tsx`), kind)
for (const p of primitives) addFamily("studio", p, `@/components/ui/${p}`, src(`components/ui/${p}.tsx`), "studio")

body.push("NS.Examples = {}")
// Theme: sets data-theme on the artboard document too, so portaled overlays
// (menus, select lists, popovers, dialogs) follow the dark theme.
body.push(`NS.Theme = function Theme({ theme = "light", style, children, ...props }: any) {
  React.useEffect(() => {
    const el = document.documentElement
    const prev = el.getAttribute("data-theme")
    el.setAttribute("data-theme", theme)
    return () => { if (prev == null) el.removeAttribute("data-theme"); else el.setAttribute("data-theme", prev) }
  }, [theme])
  return <div data-slot="theme" data-theme={theme} {...props} style={{ background: "var(--background)", color: "var(--foreground)", fontFamily: "var(--font-geist-sans)", ...style }}>{children}</div>
}
NS.Examples.ThemeDark = function ThemeDark() {
  return (
    <NS.Theme theme="dark" style={{ padding: 24, display: "flex", gap: 12, alignItems: "center" }}>
      <NS.Button>Enregistrer</NS.Button>
      <NS.Button variant="outline">Annuler</NS.Button>
      <NS.Badge variant="secondary">Brouillon</NS.Badge>
      <NS.Input placeholder="Rechercher" style={{ width: 200 }} />
    </NS.Theme>
  )
}`)
meta.families.push({ kind: "ds", slug: "theme", importPath: "(bundle)", group: "Thème", name: "Theme", lead: "Theme", exports: ["Theme"] })
taken.set("Theme", "(bundle)")

// Blocks: the page of each block, which carries the block's sample data.
for (const b of blocks) {
  const id = `b${n++}`
  const name = `Block${pascal(b)}`
  lines.push(`import ${id} from ${JSON.stringify(`@/app/${b}/page`)}`)
  body.push(`NS[${JSON.stringify(name)}] = ${id}`)
  taken.set(name, b)
  meta.blocks.push({ slug: b, name })
}

// Variants: default exports, under NS.Variants.
body.push("NS.Variants = {}")
for (const c of variantCats) {
  for (const f of fs.readdirSync(src(`components/shadcn-studio/${c}`)).filter((f) => f.endsWith(".tsx")).sort()) {
    const file = src(`components/shadcn-studio/${c}/${f}`)
    if (!hasDefault(file)) continue
    const id = `v${n++}`
    const name = pascal(f.slice(0, -4))
    lines.push(`import ${id} from ${JSON.stringify(`@/components/shadcn-studio/${c}/${f.slice(0, -4)}`)}`)
    body.push(`NS.Variants[${JSON.stringify(name)}] = ${id}`)
    meta.variants.push({ category: c, name, slug: f.slice(0, -4) })
  }
}

// Official examples (previews only) and the extended gallery demos.
body.push("NS.Examples = NS.Examples || {}")
for (const e of exampleFiles) {
  const id = `e${n++}`
  lines.push(`import ${id} from ${JSON.stringify(`@ds-examples/${e}`)}`)
  body.push(`NS.Examples[${JSON.stringify(pascal(e))}] = ${id}`)
  meta.examples[e.replace(/-example$/, "")] = pascal(e)
}
body.push("for (const d of extendedDemos) d.demos.forEach((C, i) => { NS.Examples[`Extended${d.slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('')}${i ? i + 1 : ''}`] = C })")

// Icons: every lucide icon, by name.
body.push(`NS.Icons = Lucide.icons
NS.Icon = function Icon({ name, ...props }) {
  const C = Lucide.icons[name] || Lucide[name] || Lucide[name + "Icon"] || Lucide.icons[String(name).replace(/Icon$/, "")]
  return C ? React.createElement(C, { "aria-hidden": props["aria-label"] ? undefined : true, ...props }) : null
}`)

const out = `${lines.join("\n")}\n\nconst NS: any = {}\n${body.join("\n")}\n\n;(window as any).Ds4060 = NS\n// The public components (used by the wrap test to mimic x-import wrappers)\n;(window as any).__DS_PUBLIC = new Set([...Object.values(NS), ...(((window as any).__DS_SWAP || new Map()).keys())].filter((v: any) => typeof v === "function" || (v && v.$$typeof)))\n`
fs.writeFileSync(path.join(here, "src/entry.tsx"), out)
fs.writeFileSync(path.join(here, "out/meta.json"), JSON.stringify(meta, null, 1))
console.log(`families ${meta.families.length} (exports ${taken.size - meta.blocks.length}), blocks ${meta.blocks.length}, variants ${meta.variants.length}, examples ${exampleFiles.length}`)
