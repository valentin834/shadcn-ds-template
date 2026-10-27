// Renders every example twice — plain, and with each public component wrapped
// like a Design canvas wraps an <x-import> (div.sc-host-x, display: contents) —
// and diffs the computed styles of every element. A difference is a component
// that renders differently once mounted from a canvas.
// Usage: node test-wrap.mjs <out.json> <css file in harness/> [concurrency] [filterRegex]
import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { spawn } from "node:child_process"

const here = path.dirname(fileURLToPath(import.meta.url))
const [outFile, cssFile = "bundle.css", conc = "4", filter] = process.argv.slice(2)
const meta = JSON.parse(fs.readFileSync(path.join(here, "out/meta.json"), "utf8"))
let targets = [
  ...Object.values(meta.examples).map((n) => `Examples.${n}`),
  ...["Attachment", "Bubble", "CodeBlock", "Drawer", "Marker", "Message", "MessageScroller", "Questionnaire", "Toast", "Trace", "Filters", "Filters2", "Kanban", "NumberField", "Sortable", "Stepper", "Stepper2", "TimePicker", "Timeline", "Tree", "ActionBar", "Editable", "TagsInput"].map((n) => `Examples.Extended${n}`),
]
if (filter) targets = targets.filter((t) => new RegExp(filter).test(t))

const page = `<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8">
<link rel="stylesheet" href="tokens.css"><link rel="stylesheet" href="${cssFile}">
<script src="react.js"></script><script src="react-dom.js"></script>
<script>window.__DS_WRAP = new URLSearchParams(location.search).get("wrap") === "1"</script>
<script src="bundle-test.js"></script>
<style>body{margin:0;padding:24px;width:1232px}*{animation:none!important;transition:none!important}</style></head>
<body><div id="root"></div><script>
const C = new URLSearchParams(location.search).get("c").split(".").reduce((o, k) => o && o[k], window.Ds4060)
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(C))
</script></body></html>`
fs.writeFileSync(path.join(here, "harness/wrap.html"), page)

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" }
const server = http.createServer((req, res) => {
  const p = path.join(here, "harness", decodeURIComponent(new URL(req.url, "http://x").pathname))
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end() }
  res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); fs.createReadStream(p).pipe(res)
}).listen(4063)
const PORT = 9343
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${path.join(here, "chrome-profile-wrap")}`, "--window-size=1280,900", "--no-first-run", "about:blank"], { stdio: "ignore" })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
for (let i = 0; i < 100; i++) { try { if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) break } catch {} await sleep(200) }

const PROBE = `(() => {
  const props = ["display","width","height","font-size","font-weight","line-height","padding-top","padding-right","padding-bottom","padding-left","margin-top","margin-right","margin-bottom","margin-left","border-top-width","border-right-width","border-bottom-width","border-left-width","border-top-left-radius","border-top-right-radius","border-bottom-left-radius","border-bottom-right-radius","color","background-color","opacity","gap","flex-direction","grid-template-columns","position","z-index","box-shadow","outline-style","text-decoration-line","visibility"]
  const out = []
  for (const el of document.getElementById("root").querySelectorAll("*")) {
    if (el.classList.contains("sc-host-x")) continue
    const cs = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    const v = {}
    for (const p of props) v[p] = cs.getPropertyValue(p)
    v.w = Math.round(r.width); v.h = Math.round(r.height)
    out.push({ tag: el.tagName.toLowerCase(), slot: el.getAttribute("data-slot") || "", cls: (el.getAttribute("class") || "").slice(0, 80), v })
  }
  return out
})()`

async function render(target, wrap) {
  const t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" })).json()
  const ws = new WebSocket(t.webSocketDebuggerUrl); let id = 0; const pending = new Map(); let loaded = false; const errors = []
  ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id) } else if (m.method === "Page.loadEventFired") loaded = true; else if (m.method === "Runtime.exceptionThrown") errors.push((m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).slice(0, 200)) }
  await new Promise((r) => (ws.onopen = r))
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
  await send("Runtime.enable"); await send("Page.enable")
  await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false })
  await send("Page.navigate", { url: `http://localhost:4063/wrap.html?c=${encodeURIComponent(target)}&wrap=${wrap ? 1 : 0}` })
  const t0 = Date.now(); while (!loaded && Date.now() - t0 < 30000) await sleep(50)
  await sleep(2200)
  const els = (await send("Runtime.evaluate", { expression: PROBE, returnByValue: true })).result?.value || []
  ws.close(); await fetch(`http://127.0.0.1:${PORT}/json/close/${t.id}`).catch(() => {})
  return { els, errors }
}

const near = (a, b) => a === b || (/^-?[\d.]+px$/.test(a) && /^-?[\d.]+px$/.test(b) && Math.abs(parseFloat(a) - parseFloat(b)) <= 1)
async function compare(target) {
  const [A, B] = [await render(target, false), await render(target, true)]
  const res = { target, countA: A.els.length, countB: B.els.length, errors: [...A.errors.map((e) => "plain: " + e), ...B.errors.map((e) => "wrapped: " + e)], diffs: [] }
  const n = Math.min(A.els.length, B.els.length)
  for (let i = 0; i < n; i++) {
    const a = A.els[i], b = B.els[i]
    if (a.tag !== b.tag || a.slot !== b.slot) { res.diffs.push({ i, el: `${a.tag}[${a.slot}] vs ${b.tag}[${b.slot}]`, props: ["structure"] }); break }
    const props = Object.keys(a.v).filter((p) => !(p === "w" || p === "h" ? Math.abs(a.v[p] - b.v[p]) <= 1 : near(a.v[p], b.v[p])))
    if (props.length) res.diffs.push({ i, el: `${a.tag}${a.slot ? `[${a.slot}]` : ""} .${a.cls.split(" ").slice(0, 3).join(".")}`, props: props.map((p) => `${p}: ${a.v[p]} → ${b.v[p]}`) })
  }
  return res
}

const results = []; const queue = [...targets]
await Promise.all(Array.from({ length: Number(conc) }, async () => { while (queue.length) { const t = queue.shift(); try { results.push(await compare(t)) } catch (e) { results.push({ target: t, fatal: e.message, diffs: [] }) } } }))
chrome.kill(); server.close()
results.sort((a, b) => a.target.localeCompare(b.target))
fs.writeFileSync(outFile, JSON.stringify(results, null, 1))
const bad = results.filter((r) => r.diffs.length || r.countA !== r.countB || r.errors?.length || r.fatal)
console.log(`${results.length} examples compared with ${cssFile}: ${bad.length} render differently when wrapped, ${results.reduce((s, r) => s + r.diffs.length, 0)} differing elements`)
for (const r of bad) console.log(`✗ ${r.target}: ${r.diffs.length} elements${r.countA !== r.countB ? ` (element count ${r.countA} → ${r.countB})` : ""}${r.errors?.length ? " errors: " + r.errors[0] : ""}${r.fatal ? " fatal: " + r.fatal : ""}\n    ${r.diffs.slice(0, 2).map((d) => `${d.el}: ${d.props.slice(0, 3).join("; ")}`).join("\n    ")}`)
