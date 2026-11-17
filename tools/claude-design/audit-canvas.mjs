// Audit in the real Design canvas runtime (dc-runtime.js served as support.js):
// each target (an official example, an extended demo, a block, a gabarit) is
// mounted as an artboard through <x-import>, at each width and in each theme,
// and the page is probed for what a designer would see break:
//   errors     exceptions, console errors, x-import placeholders
//   overflow   elements past the artboard's right edge (horizontal scroll)
//   clipped    text wider than its box (cut or spilling out), outside ellipsis
//   icons      lucide icons at 24 px inside buttons, menus, badges, triggers
//   colour     colours outside the grey scale (destructive red reported apart)
//   contrast   text under 4.5:1 (3:1 for large text) on its real background
//   images     images that failed to load
// Screenshots go to audit-run/shots, the report to audit-run/report.json and a
// contact sheet to audit-run/index.html.
// Usage: node audit-canvas.mjs [regex on target] [--widths=1440,390] [--themes=light,dark] [--tabs=6] [--boards=dir]
//   --boards=dir audits the .dc.html artboards of dir as they are (gabarits), instead of generated ones.
import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { spawn } from "node:child_process"

const here = path.dirname(fileURLToPath(import.meta.url))
const args = process.argv.slice(2)
const opt = (k, d) => (args.find((a) => a.startsWith(`--${k}=`)) || "").split("=")[1] || d
const filter = new RegExp(args.find((a) => !a.startsWith("--")) || ".")
const widths = opt("widths", "1440,390").split(",").map(Number)
const themes = opt("themes", "light,dark").split(",")
const tabs = Number(opt("tabs", "6"))
const boardsDir = opt("boards", "")
const runtime = path.join(here, ".cache/dc-runtime.js")
if (!fs.existsSync(runtime)) { console.error("Pas de .cache/dc-runtime.js (voir README)"); process.exit(1) }
if (!fs.existsSync(path.join(here, "dist/project/components/bundle.js"))) { console.error("Lancer d'abord npm run ds:build"); process.exit(1) }

// A canvas project laid out as the Design type does: support.js, artboards, ds/ds4060/.
const root = path.join(here, "audit-run")
const proj = path.join(root, "project")
fs.rmSync(root, { recursive: true, force: true })
fs.mkdirSync(path.join(proj, "ds/ds4060/components"), { recursive: true })
fs.mkdirSync(path.join(root, "shots"), { recursive: true })
fs.copyFileSync(runtime, path.join(proj, "support.js"))
for (const f of ["tokens.css", "tokens.json", "components/bundle.css", "components/bundle.js"]) fs.copyFileSync(path.join(here, "dist/project", f), path.join(proj, "ds/ds4060", f))

const head = (title) => `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${title}</title>
<script src="./support.js"></script>
<link rel="stylesheet" href="ds/ds4060/tokens.css">
<link rel="stylesheet" href="ds/ds4060/components/bundle.css">
<script src="ds/ds4060/components/bundle.js"></script>
</head>
<body>
<x-dc>
<helmet>
<style>body{margin:0}</style>
</helmet>
`
const tail = `</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":1440,"height":900}}'>
class Component extends DCLogic {
  renderVals() { return {}; }
}
</script>
</body>
</html>
`
const board = (target, theme, padded) => head(target) + `<x-import component-from-global-scope="Ds4060.Theme" theme="${theme}" style="min-height: 100vh;">
<div style="box-sizing: border-box; width: 100%;${padded ? " padding: 24px;" : ""} background: var(--background); color: var(--foreground); font-family: var(--font-geist-sans);">
<x-import component-from-global-scope="Ds4060.${target}"></x-import>
</div>
</x-import>
` + tail

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json" }
const server = http.createServer((req, res) => {
  const p = path.join(proj, decodeURIComponent(new URL(req.url, "http://x").pathname))
  if (!p.startsWith(proj) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end() }
  res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); fs.createReadStream(p).pipe(res)
}).listen(4066)
const PORT = 9346
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${path.join(here, "chrome-profile-audit")}`, "--window-size=1440,900", "--no-first-run", "--hide-scrollbars", "about:blank"], { stdio: "ignore" })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
for (let i = 0; i < 100; i++) { try { if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) break } catch {} await sleep(200) }

async function openTab() {
  const t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" })).json()
  const ws = new WebSocket(t.webSocketDebuggerUrl); let id = 0; const pending = new Map()
  const tab = { loaded: false, errors: [], net: [] }
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data)
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result ?? { error: m.error }); pending.delete(m.id) }
    else if (m.method === "Page.loadEventFired") tab.loaded = true
    else if (m.method === "Runtime.exceptionThrown") tab.errors.push((m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).split("\n")[0].slice(0, 240))
    else if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") tab.errors.push(m.params.args.map((a) => a.value ?? a.description).join(" ").split("\n")[0].slice(0, 240))
    else if (m.method === "Network.loadingFailed" && m.params.type !== "Other") tab.net.push(m.params.errorText)
    else if (m.method === "Network.responseReceived" && m.params.response.status >= 400) tab.net.push(`${m.params.response.status} ${m.params.response.url.slice(0, 120)}`)
  }
  await new Promise((r) => (ws.onopen = r))
  tab.send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
  tab.eval = async (expression) => (await tab.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result?.value
  await tab.send("Runtime.enable"); await tab.send("Page.enable"); await tab.send("Network.enable")
  tab.close = () => { ws.close(); return fetch(`http://127.0.0.1:${PORT}/json/close/${t.id}`).catch(() => {}) }
  return tab
}

// The probe: runs in the artboard once it has settled.
const PROBE = String.raw`(() => {
  const W = innerWidth
  const cv = document.createElement("canvas"); cv.width = cv.height = 1
  const cx = cv.getContext("2d", { willReadFrequently: true })
  const cache = new Map()
  const rgba = (c) => { if (cache.has(c)) return cache.get(c); cx.clearRect(0, 0, 1, 1); cx.fillStyle = "#000"; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const d = cx.getImageData(0, 0, 1, 1).data; let a = 1; const m = c.match(/\/\s*([\d.]+%?)\s*\)$|,\s*([\d.]+)\s*\)$/); if (m) a = (m[1] || m[2]).endsWith("%") ? parseFloat(m[1] || m[2]) / 100 : parseFloat(m[1] || m[2]); if (/^(rgba?|hsla?)\(/.test(c) && !/,.*,.*,/.test(c) && !/\//.test(c)) a = 1; if (c === "transparent" || c === "rgba(0, 0, 0, 0)") a = 0; const v = [d[0], d[1], d[2], a]; cache.set(c, v); return v }
  const lum = ([r, g, b]) => { const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4) }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b) }
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }
  const chroma = ([r, g, b]) => (Math.max(r, g, b) - Math.min(r, g, b))
  const hue = ([r, g, b]) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; if (!d) return 0; let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return Math.round((h * 60 + 360) % 360) }
  const label = (e) => { const s = e.getAttribute("data-slot"); const up = e.closest("[data-slot]"); const t = (e.innerText || e.textContent || "").trim().replace(/\s+/g, " ").slice(0, 28); return e.tagName.toLowerCase() + (s ? "[" + s + "]" : up ? " in " + up.getAttribute("data-slot") : "") + (t ? ' "' + t + '"' : "") }
  const visible = (e) => { const r = e.getBoundingClientRect(); if (r.width <= 0 || r.height <= 0) return false; const cs = getComputedStyle(e); return cs.visibility !== "hidden" && cs.display !== "none" }
  const all = [...document.body.querySelectorAll("*")].filter(visible)
  const opacity = (e) => { let o = 1; for (let x = e; x && x !== document.documentElement; x = x.parentElement) o *= parseFloat(getComputedStyle(x).opacity); return o }
  const bgOf = (e) => { const layers = []; for (let x = e; x; x = x.parentElement) { const c = rgba(getComputedStyle(x).backgroundColor); if (c[3] > 0) { layers.push(c); if (c[3] >= 0.99) break } } let base = [255, 255, 255]; if (layers.length && layers[layers.length - 1][3] < 0.99) base = document.documentElement.getAttribute("data-theme") === "dark" ? [10, 10, 10] : [255, 255, 255]; for (const c of layers.reverse()) base = base.map((v, i) => v * (1 - c[3]) + c[i] * c[3]); return base }
  const out = { width: W, docWidth: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight, theme: document.documentElement.getAttribute("data-theme"), overflow: [], clipped: [], icons: {}, badIcons: [], colours: {}, contrast: [], images: [], placeholders: [], fonts: document.fonts.check("14px Geist"), text: document.body.innerText.length }
  // overflow: the outermost elements past the right edge
  if (out.docWidth > W + 1) for (const e of all) { const r = e.getBoundingClientRect(); if (r.right > W + 1) { const p = e.parentElement && e.parentElement.getBoundingClientRect(); if (!p || p.right <= W + 1) out.overflow.push(label(e) + " → " + Math.round(r.right)) } }
  for (const e of all) {
    const cs = getComputedStyle(e)
    const own = [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
    // clipped or spilling text
    if (own && e.clientWidth > 2 && cs.clip === "auto" && cs.clipPath === "none" && e.scrollWidth > e.clientWidth + 2 && cs.textOverflow !== "ellipsis" && !/^(auto|scroll)$/.test(cs.overflowX) && !e.closest("[data-slot=scroll-area-viewport],[data-slot=table-container],[style*=overflow]")) out.clipped.push(label(e) + " " + e.scrollWidth + ">" + e.clientWidth)
    // icons
    if (e.tagName === "svg" && e.classList.contains("lucide")) {
      const r = e.getBoundingClientRect(); const k = Math.round(r.width) + "x" + Math.round(r.height)
      const ctx = e.closest("[data-slot=button],[data-slot=badge],[role=menuitem],[role=menuitemcheckbox],[role=menuitemradio],[role=option],[data-slot=select-trigger],[data-slot=tabs-trigger],[data-slot=sidebar-menu-button],[data-slot=toggle],[data-slot=toggle-group-item],[data-slot=input-group-addon],[data-slot=breadcrumb-item],[data-slot=alert],[data-slot=item-media],[data-slot=empty-icon],[data-slot=accordion-trigger],[data-slot=pagination-link],[data-slot=navigation-menu-trigger]")
      const where = ctx ? (ctx.getAttribute("data-slot") || ctx.getAttribute("role")) : "seule"
      out.icons[where + " " + k] = (out.icons[where + " " + k] || 0) + 1
      const expected = where === "badge" ? 12 : /alert|item-media|seule|empty/.test(where) ? null : 16
      if (expected && Math.round(r.width) > expected + 2) out.badIcons.push(where + " " + k + " " + label(e.parentElement))
      if (Math.abs(r.width - r.height) > 1) out.badIcons.push("déformée " + k + " " + label(e.parentElement))
    }
    // colours outside the grey scale
    const paints = [["color", cs.color, own], ["background", cs.backgroundColor, true], ["border", parseFloat(cs.borderTopWidth) || parseFloat(cs.borderBottomWidth) || parseFloat(cs.borderLeftWidth) ? cs.borderTopColor : null, true]]
    if (e instanceof SVGElement) paints.push(["stroke", cs.stroke !== "none" ? cs.stroke : null, true], ["fill", cs.fill !== "none" && !/^url/.test(cs.fill) ? cs.fill : null, true])
    for (const [prop, c, use] of paints) {
      if (!c || !use || /url\(/.test(c)) continue
      const v = rgba(c); if (v[3] < 0.05 || chroma(v) < 18) continue
      const h = hue(v); const red = h < 40 || h > 330
      const key = (red ? "rouge " : "teinte ") + "rgb(" + v.slice(0, 3).join(",") + ")"
      if (!out.colours[key]) out.colours[key] = { n: 0, ex: prop + " " + label(e) }
      out.colours[key].n++
    }
    // contrast of own text
    if (own && opacity(e) > 0.95 && !e.closest("[disabled],[aria-disabled=true],[data-disabled]")) {
      const fg = rgba(cs.color); const bg = bgOf(e)
      const fgc = fg.slice(0, 3).map((v, i) => v * fg[3] + bg[i] * (1 - fg[3]))
      const r = ratio(fgc, bg); const size = parseFloat(cs.fontSize); const large = size >= 24 || (size >= 18.6 && parseInt(cs.fontWeight) >= 700)
      if (r < (large ? 3 : 4.5)) out.contrast.push(r.toFixed(2) + ":1 " + label(e))
    }
  }
  for (const i of document.images) if (i.complete && i.naturalWidth === 0) out.images.push((i.currentSrc || i.src).replace(/^https?:\/\//, "").slice(0, 80))
  for (const e of document.querySelectorAll("[data-dc-error], .dc-error, [data-placeholder-error]")) out.placeholders.push((e.textContent || "").slice(0, 120))
  const dedupe = (a, n) => [...new Set(a)].slice(0, n)
  out.overflow = dedupe(out.overflow, 8); out.clipped = dedupe(out.clipped, 12); out.badIcons = dedupe(out.badIcons, 12); out.contrast = dedupe(out.contrast, 12); out.images = dedupe(out.images, 6)
  return out
})()`

// Targets
let jobs = []
if (boardsDir) {
  for (const f of fs.readdirSync(boardsDir).filter((f) => f.endsWith(".dc.html") && filter.test(f))) {
    const src = fs.readFileSync(path.join(boardsDir, f), "utf8")
    for (const theme of themes) {
      const name = f.replace(/\.dc\.html$/, "") + "__" + theme
      // dark: the artboard's content wrapped in Ds4060.Theme, as the README says
      const themed = src.includes('component-from-global-scope="Ds4060.Theme" theme="light"')
      const text = theme === "dark" && themed ? src.replace('component-from-global-scope="Ds4060.Theme" theme="light"', 'component-from-global-scope="Ds4060.Theme" theme="dark"') : theme === "dark" ? src.replace(/(<\/helmet>\s*)([\s\S]*?)(\s*<\/x-dc>)/, `$1<x-import component-from-global-scope="Ds4060.Theme" theme="dark" style="min-height: 100vh;">\n$2\n</x-import>$3`) : src
      fs.writeFileSync(path.join(proj, name + ".dc.html"), text)
      const w = Number((src.match(/"\$preview":\{"width":(\d+)/) || [])[1]) || 1440
      jobs.push({ target: f.replace(/\.dc\.html$/, ""), theme, file: name + ".dc.html", widths: args.some((a) => a.startsWith("--widths=")) ? widths : [w] })
    }
  }
} else {
  const meta = JSON.parse(fs.readFileSync(path.join(here, "out/meta.json"), "utf8"))
  // The example names come from the bundle itself.
  fs.writeFileSync(path.join(proj, "_names.dc.html"), head("noms") + "<div></div>\n" + tail)
  const t = await openTab(); await t.send("Page.navigate", { url: "http://localhost:4066/_names.dc.html" })
  for (let i = 0; i < 100 && !(await t.eval("!!(window.Ds4060 && window.Ds4060.Examples)")); i++) await sleep(100)
  const examples = (await t.eval("Object.keys(window.Ds4060.Examples)")).filter((k) => k !== "ThemeDark").map((k) => `Examples.${k}`)
  const gabarits = (await t.eval("Object.keys(window.Ds4060.Gabarits || {})")).map((k) => `Gabarits.${k}`)
  await t.close()
  const targets = [...examples, ...meta.blocks.map((b) => b.name), ...gabarits].filter((x) => filter.test(x))
  for (const target of targets) for (const theme of themes) {
    const file = `${target.replace(/\./g, "_")}__${theme}.dc.html`
    fs.writeFileSync(path.join(proj, file), board(target, theme, target.startsWith("Examples.")))
    jobs.push({ target, theme, file, widths })
  }
}
jobs = jobs.flatMap((j) => j.widths.map((w) => ({ ...j, width: w })))
console.log(`${jobs.length} rendus (${[...new Set(jobs.map((j) => j.target))].length} cibles × largeurs × thèmes), ${tabs} onglets`)

const results = []
let done = 0
async function worker() {
  const tab = await openTab()
  while (jobs.length) {
    const j = jobs.shift()
    tab.loaded = false; tab.errors = []; tab.net = []
    await tab.send("Emulation.setDeviceMetricsOverride", { width: j.width, height: 900, deviceScaleFactor: 1, mobile: false })
    await tab.send("Page.navigate", { url: `http://localhost:4066/${j.file}` })
    const t0 = Date.now(); while (!tab.loaded && Date.now() - t0 < 30000) await sleep(50)
    // settle: the body's size stops changing (animations, images, fonts)
    let last = "", stable = 0
    for (let i = 0; i < 40 && stable < 3; i++) { await sleep(250); const s = await tab.eval("document.body.innerText.length + ':' + document.documentElement.scrollHeight + ':' + document.querySelectorAll('*').length"); stable = s === last ? stable + 1 : 0; last = s }
    await sleep(400)
    const r = (await tab.eval(PROBE)) || { error: "probe failed" }
    const h = Math.min(Math.max(r.height || 900, 200), 3200)
    await tab.send("Emulation.setDeviceMetricsOverride", { width: j.width, height: h, deviceScaleFactor: 1, mobile: false })
    await sleep(300)
    const shot = await tab.send("Page.captureScreenshot", { format: "jpeg", quality: 70 })
    const png = `${j.target.replace(/\./g, "_")}-${j.width}-${j.theme}.jpg`
    if (shot.data) fs.writeFileSync(path.join(root, "shots", png), Buffer.from(shot.data, "base64"))
    results.push({ target: j.target, width: j.width, theme: j.theme, shot: png, errors: [...new Set(tab.errors)].slice(0, 5), net: [...new Set(tab.net)].slice(0, 5), ...r })
    process.stdout.write(`\r${++done} rendus`)
  }
  await tab.close()
}
await Promise.all(Array.from({ length: tabs }, worker))
chrome.kill(); server.close()
results.sort((a, b) => a.target.localeCompare(b.target) || b.width - a.width || a.theme.localeCompare(b.theme))
fs.writeFileSync(path.join(root, "report.json"), JSON.stringify(results, null, 1))

// Summary: one line per render with a problem.
const issues = (r) => [
  ...r.errors.map((e) => "erreur " + e),
  ...r.placeholders.map((e) => "x-import " + e),
  ...(r.overflow.length ? ["déborde " + r.docWidth + "px : " + r.overflow.slice(0, 3).join(" ; ")] : []),
  ...r.clipped.slice(0, 3).map((e) => "texte coupé " + e),
  ...r.badIcons.slice(0, 3).map((e) => "icône " + e),
  ...r.contrast.slice(0, 3).map((e) => "contraste " + e),
  ...Object.entries(r.colours || {}).filter(([k]) => k.startsWith("teinte")).slice(0, 3).map(([k, v]) => `couleur ${k} ×${v.n} (${v.ex})`),
  ...r.images.map((e) => "image " + e),
  ...(r.text < 1 && r.height < 40 ? ["rendu vide"] : []),
]
let n = 0
for (const r of results) { const i = issues(r); if (i.length) { n++; console.log(`\n${r.target} ${r.width} ${r.theme}\n  ${i.join("\n  ")}`) } }
console.log(`\n${results.length} rendus, ${n} avec au moins un point. Rapport : audit-run/report.json, planche : audit-run/index.html`)
fs.writeFileSync(path.join(root, "index.html"), `<!doctype html><meta charset="utf-8"><title>Audit</title><style>body{font:12px system-ui;margin:16px;background:#f4f4f5}div.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:12px}figure{margin:0;background:#fff;padding:6px;border:1px solid #ddd}img{width:100%;max-height:420px;object-fit:cover;object-position:top;display:block}figcaption{padding-top:4px}ul{margin:4px 0 0;padding-left:16px;color:#b00}</style><div class="g">${results.map((r) => `<figure><img loading="lazy" src="shots/${r.shot}"><figcaption><b>${r.target}</b> ${r.width} ${r.theme}${issues(r).length ? `<ul>${issues(r).slice(0, 6).map((i) => `<li>${i.replace(/</g, "&lt;")}</li>`).join("")}</ul>` : ""}</figcaption></figure>`).join("")}</div>`)
