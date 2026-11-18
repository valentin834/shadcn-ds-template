// Renders each gabarit twice and compares them: as React (the card preview,
// Ds4060.Gabarits.<Nom> in the harness) and as its artboard
// gabarits/<Nom>.dc.html with the real Design runtime (dc-runtime.js). Every
// visible [data-slot] element must sit at the same place with the same size
// (2 px of tolerance): what differs is a canvas bug (wrappers, styles on slots)
// or a gabarit written against the rules. Screenshots in gabarits-run/shots.
// Usage: node test-gabarits.mjs [out.json] [regex]
import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { spawn } from "node:child_process"

const here = path.dirname(fileURLToPath(import.meta.url))
const outFile = process.argv[2] || path.join(here, "out/test-gabarits.json")
const filter = new RegExp(process.argv[3] || ".")
const runtime = path.join(here, ".cache/dc-runtime.js")
if (!fs.existsSync(runtime)) { console.log("(gabarits ignorés : pas de .cache/dc-runtime.js, voir README)"); fs.writeFileSync(outFile, "[]"); process.exit(0) }
const meta = JSON.parse(fs.readFileSync(path.join(here, "out/meta.json"), "utf8"))
const root = path.join(here, "gabarits-run")
const proj = path.join(root, "project")
fs.rmSync(root, { recursive: true, force: true })
fs.mkdirSync(path.join(proj, "ds/ds4060/components"), { recursive: true })
fs.mkdirSync(path.join(root, "shots"), { recursive: true })
fs.copyFileSync(runtime, path.join(proj, "support.js"))
for (const f of ["tokens.css", "tokens.json", "components/bundle.css", "components/bundle.js"]) fs.copyFileSync(path.join(here, "dist/project", f), path.join(proj, "ds/ds4060", f))
for (const f of fs.readdirSync(path.join(here, "dist/project/gabarits"))) fs.copyFileSync(path.join(here, "dist/project/gabarits", f), path.join(proj, f))

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json" }
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname)
  const base = url.startsWith("/h/") ? path.join(here, "harness") : proj
  const p = path.join(base, url.replace(/^\/[hc]\//, "/"))
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end() }
  res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); fs.createReadStream(p).pipe(res)
}).listen(4068)
const PORT = 9348
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${path.join(here, "chrome-profile-gabarits")}`, "--no-first-run", "--hide-scrollbars", "about:blank"], { stdio: "ignore" })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let up = false
for (let i = 0; i < 100 && !up; i++) { try { up = (await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok } catch {} if (!up) await sleep(200) }

async function render(url, width, height, shot) {
  const t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" })).json()
  const ws = new WebSocket(t.webSocketDebuggerUrl); let id = 0; const pending = new Map(); let loaded = false; const errors = []
  ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id) } else if (m.method === "Page.loadEventFired") loaded = true; else if (m.method === "Runtime.exceptionThrown") errors.push((m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).split("\n")[0].slice(0, 200)); else if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") errors.push(m.params.args.map((a) => a.value ?? a.description).join(" ").split("\n")[0].slice(0, 200)) }
  await new Promise((r) => (ws.onopen = r))
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
  await send("Runtime.enable"); await send("Page.enable")
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false })
  await send("Page.navigate", { url })
  for (let i = 0; i < 600 && !loaded; i++) await sleep(50)
  let last = "", stable = 0
  for (let i = 0; i < 40 && stable < 3; i++) { await sleep(250); const s = (await send("Runtime.evaluate", { expression: "document.querySelectorAll('[data-slot]').length + ':' + document.documentElement.scrollHeight", returnByValue: true })).result?.value; stable = s === last ? stable + 1 : 0; last = s }
  await sleep(500)
  const geo = (await send("Runtime.evaluate", { returnByValue: true, expression: `(() => {
    const vis = (e) => { const r = e.getBoundingClientRect(); const c = getComputedStyle(e); return r.width > 0 && r.height > 0 && c.visibility !== "hidden" }
    return [...document.querySelectorAll("[data-slot]")].filter((e) => vis(e) && e.getAttribute("data-slot") !== "theme").map((e) => { const r = e.getBoundingClientRect(); return { s: e.getAttribute("data-slot"), t: (e.textContent || "").trim().replace(/\\s+/g, " ").slice(0, 24), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } })
  })()` })).result?.value || []
  const contentHeight = (await send("Runtime.evaluate", { returnByValue: true, expression: "Math.max(...[...document.body.querySelectorAll('*')].filter((e) => !e.closest('[data-slot=sidebar-container]') && e.getBoundingClientRect().height > 0).map((e) => e.getBoundingClientRect().bottom + scrollY), 0)" })).result?.value || 0
  const shotData = await send("Page.captureScreenshot", { format: "jpeg", quality: 75 })
  if (shotData?.data) fs.writeFileSync(path.join(root, "shots", shot), Buffer.from(shotData.data, "base64"))
  ws.close(); await fetch(`http://127.0.0.1:${PORT}/json/close/${t.id}`).catch(() => {})
  return { geo, errors: [...new Set(errors)], contentHeight: Math.round(contentHeight) }
}

const results = []
for (const g of (meta.gabarits || []).filter((g) => filter.test(g.name))) {
  const a = await render(`http://localhost:4068/h/index.html?c=Gabarits.${g.name}&pad=0`, g.width, g.height, `${g.name}-react.jpg`)
  const b = await render(`http://localhost:4068/c/${g.name}.dc.html`, g.width, g.height, `${g.name}-canvas.jpg`)
  const diffs = []
  const n = Math.max(a.geo.length, b.geo.length)
  for (let i = 0; i < n && diffs.length < 12; i++) {
    const x = a.geo[i], y = b.geo[i]
    if (!x || !y || x.s !== y.s) { diffs.push(`#${i} ${x ? x.s : "—"} ≠ ${y ? y.s : "—"}`); break }
    if (Math.abs(x.x - y.x) > 2 || Math.abs(x.y - y.y) > 2 || Math.abs(x.w - y.w) > 2 || Math.abs(x.h - y.h) > 2) diffs.push(`${x.s} "${x.t}" React ${x.x},${x.y} ${x.w}×${x.h} / canevas ${y.x},${y.y} ${y.w}×${y.h}`)
  }
  // the artboard's height (gabarits.json) should hold the content without much empty space
  const tall = b.contentHeight > g.height + 2 ? `contenu de ${b.contentHeight} px pour un artboard de ${g.height}` : g.height - b.contentHeight > 160 && g.height > 844 ? `artboard de ${g.height} px pour ${b.contentHeight} px de contenu` : ""
  results.push({ gabarit: g.name, react: a.geo.length, canvas: b.geo.length, diffs, errors: b.errors, reactErrors: a.errors, height: tall })
  console.log(`${diffs.length || b.errors.length ? "FAIL" : "PASS"} ${g.name} : ${b.geo.length} éléments${diffs.length ? `, ${diffs.length} écart(s)` : ""}${b.errors.length ? `, erreurs canevas : ${b.errors.slice(0, 2).join(" | ")}` : ""}${tall ? ` (hauteur : ${tall})` : ""}`)
  for (const d of diffs.slice(0, 6)) console.log(`  ${d}`)
}
chrome.kill(); server.close()
fs.writeFileSync(outFile, JSON.stringify(results, null, 1))
