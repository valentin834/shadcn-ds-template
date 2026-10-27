// Writes the design system's component files under dist/project/components:
// one README.md + live preview.html per family and per block, and index.d.ts.
// Usage: node gen-docs.mjs [repoRoot]
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const repo = path.resolve(process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), "../.."))
const here = path.dirname(fileURLToPath(import.meta.url))
const sys = path.join(here, "dist/project")
const meta = JSON.parse(fs.readFileSync(path.join(here, "out/meta.json"), "utf8"))
const inv = JSON.parse(fs.readFileSync(path.join(here, "out/inventory.json"), "utf8"))
const ds = fs.readFileSync(path.join(repo, "DESIGN-SYSTEM.md"), "utf8")
const pascal = (s) => s.split(/[^A-Za-z0-9]+/).filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join("")
const write = (rel, text) => { const p = path.join(sys, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, text) }
const clean = (s) => s.replace(/<br>/g, " ; ").trim()

// Descriptions and groups from DESIGN-SYSTEM.md
const section = (from, to) => ds.slice(ds.indexOf(from), to ? ds.indexOf(to) : undefined)
const officialDesc = {}, officialGroup = {}
{
  let group = null
  for (const line of section("## 2. Composants officiels", "## 3.").split("\n")) {
    const h = line.match(/^### (.+)/); if (h) group = h[1].replace(/\s*\(.*\)$/, "")
    const r = line.match(/^\| `([a-z0-9-]+)` \| [^|]* \| [^|]* \| (.+) \|$/); if (r) { officialDesc[r[1]] = clean(r[2]); officialGroup[r[1]] = group }
  }
}
const blockDesc = {}, blockGroup = {}
{
  let group = null
  for (const line of section("## 6.", "## 7.").split("\n")) {
    const h = line.match(/^### (.+)/); if (h) group = h[1].replace(/\s*\(.*\)$/, "")
    const r = line.match(/^\| `([a-z0-9\/-]+)` \| `[^`]*` \| (.+) \|$/)
    if (r) {
      // "cta-section-01/10/12" lists several blocks in one row
      const [, base, nums] = r[1].match(/^(.*?-)(\d+(?:\/\d+)*)$/) || [null, r[1], ""]
      for (const slug of nums ? nums.split("/").map((x) => base + x) : [r[1]]) { blockDesc[slug] = clean(r[2]); blockGroup[slug] = group }
    }
  }
}
const extendedDemos = fs.readFileSync(path.join(repo, "src/app/gallery/extended/demos.tsx"), "utf8")
const tierDesc = Object.fromEntries([...extendedDemos.matchAll(/slug: "([a-z-]+)", label: "[^"]*", source: "(?:reui|diceui)", importPath: "[^"]*", desc: "([^"]+)"/g)].map((m) => [m[1], m[2]]))
tierDesc.cascader = "Cascading select over nested options (used by Filters for hierarchical fields)."
const studioDesc = {
  "border-beam": "Animated beam running along a container's border.",
  "bounce-button": "Button with a bounce on press.", "craft-button": "Button with an animated icon slot and label.",
  "flow-button": "Button with a flowing fill on hover (primary and secondary).", "glass-button": "Frosted-glass button.",
  "global-tooltip": "Tooltip system that follows the pointer across many triggers.", "grow-button": "Button whose fill grows from the pointer.",
  "magnetic-button": "Button pulled toward the pointer.", marquee: "Infinite horizontal or vertical scroller (logos, testimonials).",
  "matter-button": "Material-like ripple button.", "motion-checkbox": "Checkbox with an animated check mark (Base UI + motion).",
  "motion-highlight": "Animated highlight that slides between items (tabs, menus).", "motion-preset": "Wrapper applying fade / blur / slide-in presets to its children.",
  "motion-radio-group": "Radio group with an animated indicator (Base UI + motion).", "motion-switch": "Switch with a springy thumb (Base UI + motion).",
  "motion-tabs": "Tabs with an animated active indicator and content transitions.", "motion-tooltip": "Stack of avatars with an animated tooltip.",
  "multi-select": "Multi-value select with removable chips and search.", "neural-button": "Button with an animated neural-network glow.",
  "number-ticker": "Number counting up or down to a value.", orbiting: "Items orbiting around a center.",
  "orion-button": "Button with an orbiting light (primary and secondary).", rating: "Star rating, read-only or interactive.",
  "ripple-button": "Button with a ripple from the pointer.", "select-native": "Legacy styled native <select>; prefer NativeSelect.",
  "shimmer-button": "Button with a shimmer sweep.", "swipe-button": "Button whose label swipes on hover (primary and secondary).",
  "copy-code": "Inline code with a copy button.",
}

// Which bundled demo previews which family
const extended = { attachment: "Attachment", bubble: "Bubble", "code-block": "CodeBlock", drawer: "Drawer", marker: "Marker", message: "Message", "message-scroller": "MessageScroller", questionnaire: "Questionnaire", toast: "Toast", trace: "Trace", filters: "Filters", kanban: "Kanban", "number-field": "NumberField", sortable: "Sortable", stepper: "Stepper", "time-picker": "TimePicker", timeline: "Timeline", tree: "Tree", "action-bar": "ActionBar", editable: "Editable", "tags-input": "TagsInput" }
// Which variants and blocks use each shadcnstudio primitive, directly or through
// another ui/ component (button-54 → neural-button → border-beam): the first previews it.
const walk = (d) => (fs.existsSync(d) ? fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])) : [])
const studio = path.join(repo, "src/components/shadcn-studio")
const uiImports = (file) => (fs.existsSync(file) ? [...fs.readFileSync(file, "utf8").matchAll(/["']@\/components\/ui\/([a-z0-9-]+)["']/g)].map((m) => m[1]) : [])
const closure = (slugs, seen = new Set()) => { for (const u of slugs) if (!seen.has(u)) { seen.add(u); closure(uiImports(path.join(repo, "src/components/ui", u + ".tsx")), seen) } return seen }
const users = [
  ...meta.variants.map((v) => [v.slug, closure(uiImports(path.join(studio, v.category, v.slug + ".tsx")))]),
  ...meta.blocks.map((b) => [b.slug, closure([...walk(path.join(studio, "blocks", b.slug)), path.join(repo, "src/app", b.slug, "page.tsx")].flatMap(uiImports))]),
]
const uiUsers = Object.fromEntries(meta.families.filter((f) => f.kind === "studio").map((f) => {
  const using = users.filter(([, deps]) => deps.has(f.slug)).map(([slug]) => slug)
  const isVariant = (u) => meta.variants.some((v) => v.slug === u)
  return [f.slug, [...using.filter(isVariant).sort(), ...using.filter((u) => !isVariant(u)).sort()]]
}))
const variantNames = new Set(meta.variants.map((v) => v.slug))
function previewTarget(f) {
  if (f.slug === "theme") return "Examples.ThemeDark"
  if (extended[f.slug]) return `Examples.Extended${extended[f.slug]}`
  if (meta.examples[f.slug]) return `Examples.${meta.examples[f.slug]}`
  if (f.slug === "sidebar") return "Examples.SidebarExample"
  if (f.slug === "form") return "Variants.Form02"
  if (f.slug === "cascader") return "Examples.ExtendedFilters2"
  if (f.slug === "select-native") return null
  if (f.slug === "direction") return null
  const users = uiUsers[f.slug] || []
  const v = users.find((u) => variantNames.has(u)); if (v) return `Variants.${pascal(v)}`
  const b = users.find((u) => meta.blocks.some((x) => x.slug === u)); if (b) return `Block${pascal(b)}`
  return null
}

// Canvas-specific notes, appended to some READMEs
const notes = {
  select: "**Libellé affiché** : `SelectValue` affiche la `value` de l'item choisi. Pour afficher un libellé, passer la liste à `Select` : `items=\"{{secteurs}}\"` avec `secteurs: [{ value: \"all\", label: \"Tous les secteurs\" }, …]` dans `renderVals()`, et `default-value=\"all\"`.",
  combobox: "**Libellé affiché** : comme `Select`, passer `items` pour afficher des libellés plutôt que des valeurs.",
  filters: "**Sur un canevas** : `Filters` attend une configuration `fields` (`[{ id, label, type: \"select\" | \"multiselect\" | \"text\" | \"date\" …, options }]`), un `query` et `onQueryChange`, à fournir depuis `renderVals()`. Pour une maquette statique, une barre `InputGroup` + `Select` + `Button` suffit. `Ds4060.Examples.ExtendedFilters` monte un exemple complet.",
  theme: "**Sur un canevas** : `<x-import component-from-global-scope=\"Ds4060.Theme\" theme=\"dark\" style=\"min-height: 100%\">…tout l'écran…</x-import>`. Accepte `theme` = `light` (défaut) ou `dark`, et `style` pour la mise en page.",
  sidebar: "**Mise en page** : `SidebarProvider` enveloppe `Sidebar` et `SidebarInset` (le contenu de la page). La largeur de la sidebar est 16rem.",
}
const groupOf = (f) => f.kind === "ds" ? "Thème" : f.kind === "shadcn" ? officialGroup[f.slug] || "Utilitaires" : f.kind === "studio" ? "shadcnstudio · primitives animées" : "Données & BtoB (ReUI, Dice UI)"
const descOf = (f) => f.kind === "ds" ? "Thème clair ou sombre d'un artboard : à mettre autour de tout le contenu, il applique aussi le thème aux menus, listes et popovers ouverts, rendus hors de l'artboard" : f.kind === "shadcn" ? officialDesc[f.slug] : f.kind === "studio" ? studioDesc[f.slug] : tierDesc[f.slug]
const sourceOf = (f) => f.kind === "ds" ? "composant du design system (bundle)" : f.kind === "shadcn" ? "shadcn/ui (style base-nova, Base UI)" : f.kind === "studio" ? "shadcnstudio Pro (registre base-nova)" : f.kind === "reui" ? "ReUI (reui.io, base-nova)" : "Dice UI (diceui.com, base-nova)"
const fileOf = (f) => (f.kind === "ds" ? "components/bundle.js" : f.importPath.replace("@/", "src/") + ".tsx")

const previewHtml = (group, target, { width, height, subtitle }) => `<!-- @dsCard group="${group}" height=${height} width=${width}${subtitle ? ` subtitle="${subtitle.replace(/"/g, "'")}"` : ""} -->
<div id="root"></div>
<script>
(function () {
  var C = ${JSON.stringify(target)}.split(".").reduce(function (o, k) { return o && o[k] }, window.Ds4060)
  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(C))
})()
</script>
`
const staticPreview = (group, html, height) => `<!-- @dsCard group="${group}" height=${height} subtitle="static" -->
<div style="padding: 16px; font-family: var(--font-geist-sans); color: var(--foreground)">${html}</div>
`

const dts = [`// Props of the catalogued components, for documentation. Every component also\n// takes className, children and the props of its Base UI primitive or HTML element.\nimport type * as React from "react"\n`]
const missing = []
for (const f of meta.families) {
  const i = inv[fileOf(f)] || { variants: {}, unions: {} }
  const desc = descOf(f) || `${f.lead} component.`
  const group = groupOf(f)
  const variants = Object.entries(i.variants || {}).filter(([, v]) => v.length)
  const unions = Object.entries(i.unions || {}).filter(([k]) => !(i.variants || {})[k])
  const example = f.kind === "shadcn" && f.slug === "button" ? `<x-import component-from-global-scope="Ds4060.Button" variant="outline">Annuler</x-import>`
    : `<x-import component-from-global-scope="Ds4060.${f.lead}"></x-import>`
  const readme = [
    `${desc}${/[.!?)]$/.test(desc) ? "" : "."}`,
    "",
    `**Sur un canevas** : \`${example}\` — attributs = props (kebab-case), contenu = \`children\`.`,
    "",
    `**Exports** (\`window.Ds4060.<nom>\`) : ${f.exports.map((e) => `\`${e}\``).join(", ")}`,
    variants.length ? `**Variantes** :\n${variants.map(([k, v]) => `- \`${k}\` : ${v.map((x) => `\`${x}\``).join(" · ")}`).join("\n")}${i.defaultVariants ? `\n- par défaut : ${i.defaultVariants.replace(/,$/, "")}` : ""}` : "",
    unions.length ? `**Props à valeurs fixes** :\n${unions.map(([k, v]) => `- \`${k}\` : ${v.map((x) => `\`${x}\``).join(" · ")}`).join("\n")}` : "",
    "",
    notes[f.slug] || "",
    `**Source** : \`${fileOf(f)}\` — ${sourceOf(f)}. Code d'origine : dépôt \`valentin834/shadcn-ds-template\`.`,
  ].filter(Boolean).join("\n\n") + "\n"
  write(`components/${f.lead}/README.md`, readme)
  const target = previewTarget(f)
  if (target) write(`components/${f.lead}/preview.html`, previewHtml(group, target, { width: 1040, height: 420 }))
  else { missing.push(f.slug); write(`components/${f.lead}/preview.html`, staticPreview(group, `<p style="margin:0;font-size:14px;color:var(--muted-foreground)">${desc}</p>`, 80)) }
  const props = [...variants, ...unions].map(([k, v]) => `  ${/^[a-zA-Z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}?: ${v.map((x) => JSON.stringify(x)).join(" | ")}`)
  dts.push(`/** ${desc.replace(/\*\//g, "")} */\nexport interface ${f.lead}Props {\n${[...props, "  className?: string", "  children?: React.ReactNode", "  [prop: string]: unknown"].join("\n")}\n}\n`)
}

for (const b of meta.blocks) {
  const group = `Blocs · ${blockGroup[b.slug] || "Pages"}`
  const desc = blockDesc[b.slug] || `Bloc ${b.slug}`
  write(`components/${b.name}/README.md`, [
    `${desc}${/[.!?)]$/.test(desc) ? "" : "."} Section complète shadcnstudio Pro, avec ses données d'exemple.`,
    "",
    `**Sur un canevas** : \`<x-import component-from-global-scope="Ds4060.${b.name}"></x-import>\`, sans props, dans un artboard pleine largeur. Pour l'adapter, la recomposer en markup avec les composants officiels plutôt que de la modifier.`,
    "",
    `**Attention** : contenu d'exemple en anglais ; certaines sections chargent des images depuis \`cdn.shadcnstudio.com\` (absentes si le canevas les bloque) et gardent des couleurs codées en dur.`,
    "",
    `**Source** : \`src/app/${b.slug}/page.tsx\` et \`src/components/shadcn-studio/blocks/\` — dépôt \`valentin834/shadcn-ds-template\`, route \`/${b.slug}\`.`,
  ].join("\n") + "\n")
  write(`components/${b.name}/preview.html`, previewHtml(group, b.name, { width: 1280, height: 720 }))
  dts.push(`/** ${desc} (bloc, sans props) */\nexport interface ${b.name}Props {}\n`)
}
dts.push(`/** Lucide icon by name (\"Search\", \"ChevronRight\", \"CircleCheck\"…). 24px alone; 16px inside a Button or a menu item, 12px in a Badge. */\nexport interface IconProps {\n  name: string\n  size?: number | string\n  strokeWidth?: number | string\n  className?: string\n  \"aria-label\"?: string\n}\n`)
write("components/index.d.ts", dts.join("\n"))
console.log(`families ${meta.families.length}, blocks ${meta.blocks.length}, static previews: ${missing.join(", ") || "none"}`)
console.log(`no description: ${meta.families.filter((f) => !descOf(f)).map((f) => f.slug).join(", ") || "none"}; blocks without description: ${meta.blocks.filter((b) => !blockDesc[b.slug]).map((b) => b.slug).join(", ") || "none"}`)
