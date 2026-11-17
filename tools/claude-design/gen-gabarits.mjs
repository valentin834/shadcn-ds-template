// Writes each gabarit (src/components/gabarits, listed in gabarits.json) as a
// Design canvas artboard: dist/project/gabarits/<Nom>.dc.html.
//
// A gabarit is a React component made of the design system's components and
// plain markup. Its element tree is walked in headless Chrome with the bundle
// loaded (never rendered), and written back the way an artboard mounts real
// components: host elements stay markup with their inline styles, components
// become <x-import component-from-global-scope="Ds4060.…">, lucide icons become
// Ds4060.Icon, helpers of the gabarit are expanded in place. Props that are not
// strings (numbers, booleans, arrays, objects) go to renderVals() and are named
// by a {{hole}}; event handlers are dropped (the artboard is static).
// Indentation is tabs: the canvas runtime drops whitespace-only text nodes
// only when they hold no space.
// Usage: node gen-gabarits.mjs   (after gen-harness.mjs)
import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { spawn } from "node:child_process"

const here = path.dirname(fileURLToPath(import.meta.url))
const meta = JSON.parse(fs.readFileSync(path.join(here, "out/meta.json"), "utf8"))
const outDir = path.join(here, "dist/project/gabarits")
fs.mkdirSync(outDir, { recursive: true })

const SERIALIZE = String.raw`(name) => {
  const React = window.React, NS = window.Ds4060
  const names = new Map()
  for (const [k, v] of Object.entries(NS)) if ((typeof v === "function" || (v && v.$$typeof)) && /^[A-Z]/.test(k) && !names.has(v)) names.set(v, k)
  for (const [orig, swapped] of window.__DS_SWAP || new Map()) if (names.has(swapped)) names.set(orig, names.get(swapped))
  const icons = new Map()
  for (const [k, v] of Object.entries(NS.Icons)) if (!icons.has(v)) icons.set(v, k)
  const vals = {}, keyOf = new Map()
  // a value is named after its prop (items, items2…); true is {{yes}}, as artboards write it
  const hole = (v, prop) => {
    const json = JSON.stringify(v)
    if (keyOf.has(json)) return keyOf.get(json)
    const base = v === true ? "yes" : v === false ? "no" : prop.replace(/-([a-z])/g, (m, c) => c.toUpperCase())
    let key = base
    for (let i = 2; key in vals; i++) key = base + i
    vals[key] = v; keyOf.set(json, key)
    return key
  }
  // props the bundle already defaults (Filters speaks French on a canvas)
  const OMIT = { Filters: ["labels", "operatorLabels"] }
  const kebab = (s) => (/^(aria|data)-/.test(s) ? s : s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()))
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  const attrEsc = (s) => esc(s).replace(/"/g, "&quot;")
  const UNITLESS = new Set(["flex", "flexGrow", "flexShrink", "fontWeight", "lineHeight", "opacity", "order", "zIndex", "zoom", "aspectRatio", "gridRow", "gridColumn", "gridRowStart", "gridRowEnd", "gridColumnStart", "gridColumnEnd", "columnCount", "fillOpacity", "strokeOpacity", "orphans", "widows", "tabSize"])
  const css = (o) => Object.entries(o).filter(([, v]) => v != null && v !== false && v !== "").map(([k, v]) => (k.startsWith("--") ? k : kebab(k)) + ": " + (typeof v === "number" && v !== 0 && !UNITLESS.has(k) ? v + "px" : v) + ";").join(" ")
  const VOID = new Set(["img", "input", "br", "hr", "area", "col", "source", "wbr"])
  const problems = []
  const attrs = (props, host, where) => {
    let out = ""
    for (const [k, v] of Object.entries(props)) {
      if (k === "children" || k === "key" || k === "ref" || v === undefined || v === null || typeof v === "function" || (OMIT[where] || []).includes(k)) continue
      if (React.isValidElement(v)) { problems.push(where + " : élément React dans la prop " + k); continue }
      if (k === "className") { problems.push(where + " : className " + v); out += ' class="' + attrEsc(v) + '"'; continue }
      if (k === "style") { out += ' style="' + attrEsc(css(v)) + '"'; continue }
      const a = host ? (k === "htmlFor" ? "for" : /^(aria|data)-/.test(k) ? k : k.toLowerCase()) : kebab(k)
      if (typeof v === "string") { if (v.includes("{{")) problems.push(where + " : {{ dans " + k); out += " " + a + '="' + attrEsc(v) + '"' }
      else if (host && typeof v === "number") out += " " + a + '="' + v + '"'
      else out += " " + a + '="{{' + hole(typeof v === "object" ? JSON.parse(JSON.stringify(v)) : v, k) + '}}"'
    }
    return out
  }
  const flat = (c) => (Array.isArray(c) ? c.flatMap(flat) : c == null || c === false || c === true || c === "" ? [] : [c])
  const isText = (c) => typeof c === "string" || typeof c === "number"
  function element(el, depth) {
    const t = el.type, p = el.props || {}
    if (t === React.Fragment) return children(p.children, depth, false)
    if (typeof t === "string") {
      const open = "<" + t + attrs(p, true, t) + ">"
      if (VOID.has(t)) return open
      return open + children(p.children, depth, true) + "</" + t + ">"
    }
    const base = (t && t.__dsOrig) || t
    if (icons.has(t) || icons.has(base)) return '<x-import component-from-global-scope="Ds4060.Icon" name="' + (icons.get(t) || icons.get(base)) + '"' + attrs(p, false, "Icon") + "></x-import>"
    const n = names.get(base) || names.get(t)
    if (n) return '<x-import component-from-global-scope="Ds4060.' + n + '"' + attrs(p, false, n) + ">" + children(p.children, depth, true) + "</x-import>"
    const fn = typeof base === "function" ? base : base && base.render
    if (typeof fn === "function") return node(fn(p, null), depth) // a helper of the gabarit
    problems.push("composant inconnu " + ((t && (t.displayName || t.name)) || String(t)))
    return ""
  }
  function node(c, depth) {
    const list = flat(c)
    return list.map((x) => (isText(x) ? esc(x) : React.isValidElement(x) ? element(x, depth) : "")).join("")
  }
  function children(c, depth, wrap) {
    const list = flat(c)
    if (!list.length) return ""
    // inline when any child is text: no new line may change what renders
    if (list.some(isText)) return node(list, depth + 1)
    const pad = "\n" + "\t".repeat(depth + 1)
    return list.map((x) => pad + node(x, depth + 1)).join("") + (wrap ? "\n" + "\t".repeat(depth) : "")
  }
  const G = NS.Gabarits[name]
  const markup = node(React.createElement(G), 0)
  return { markup, vals, problems }
}`

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" }
const server = http.createServer((req, res) => {
  const p = path.join(here, "harness", decodeURIComponent(new URL(req.url, "http://x").pathname))
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end() }
  res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); fs.createReadStream(p).pipe(res)
}).listen(4067)
const PORT = 9347
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${path.join(here, "chrome-profile-gabarits")}`, "--no-first-run", "about:blank"], { stdio: "ignore" })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let ready = false
for (let i = 0; i < 100 && !ready; i++) { try { ready = (await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok } catch {} if (!ready) await sleep(200) }
const t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" })).json()
const ws = new WebSocket(t.webSocketDebuggerUrl); let id = 0; const pending = new Map(); let loaded = false
ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id) } else if (m.method === "Page.loadEventFired") loaded = true }
await new Promise((r) => (ws.onopen = r))
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
await send("Page.enable")
await send("Page.navigate", { url: "http://localhost:4067/index.html?c=Theme" })
for (let i = 0; i < 300 && !loaded; i++) await sleep(50)

const header = (g) => `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${g.title || g.name}</title>
<script src="./support.js"></script>
<link rel="stylesheet" href="ds/ds4060/tokens.css">
<link rel="stylesheet" href="ds/ds4060/components/bundle.css">
<script src="ds/ds4060/components/bundle.js"></script>
</head>
<body>
<x-dc>
<helmet>
<style>body { margin: 0; }</style>
</helmet>
`
let failed = 0
for (const g of meta.gabarits) {
  const r = await send("Runtime.evaluate", { expression: `(${SERIALIZE})(${JSON.stringify(g.name)})`, returnByValue: true })
  if (r.exceptionDetails || !r.result?.value) { failed++; console.error(`✗ ${g.name} : ${r.exceptionDetails?.exception?.description?.split("\n")[0] || "rien"}`); continue }
  const { markup, vals, problems } = r.result.value
  for (const p of problems) console.warn(`  ${g.name} : ${p}`)
  if (problems.length) failed++
  const props = JSON.stringify({ $preview: { width: g.width, height: g.height } })
  // one value per line, compact: easy to find and edit
  const renderVals = ("{" + Object.entries(vals).map(([k, v]) => `\n\t\t\t${k}: ${JSON.stringify(v)}`).join(",") + "\n\t\t}").replace(/<\//g, "<\\/")
  const text = header(g) +
    `<x-import component-from-global-scope="Ds4060.Theme" theme="light">\n\t${markup.replace(/\n/g, "\n\t")}\n</x-import>\n</x-dc>\n` +
    `<script type="text/x-dc" data-dc-script data-props='${props}'>\nclass Component extends DCLogic {\n\trenderVals() {\n\t\treturn ${renderVals};\n\t}\n}\n</script>\n</body>\n</html>\n`
  fs.writeFileSync(path.join(outDir, `${g.name}.dc.html`), text)
  console.log(`${g.name}.dc.html ${(text.length / 1024).toFixed(0)} Ko, ${(markup.match(/<x-import/g) || []).length} x-import, ${Object.keys(vals).length} valeurs`)
}
ws.close(); chrome.kill(); server.close()
if (failed) { console.error(`${failed} gabarit(s) en erreur`); process.exit(1) }
