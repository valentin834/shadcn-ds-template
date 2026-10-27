// Mounts every bundled example, block and variant in the harness under React 18,
// in headless Chrome, and reports render errors, exceptions and console errors.
// Usage: node test-mount.mjs <out.json> [concurrency] [filterRegex] [theme]
import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { spawn } from "node:child_process"

const here = path.dirname(fileURLToPath(import.meta.url))
const [outFile, conc = "6", filter, theme = "light"] = process.argv.slice(2)
const meta = JSON.parse(fs.readFileSync(path.join(here, "out/meta.json"), "utf8"))
const bundle = fs.readFileSync(path.join(here, "out/bundle.js"), "utf8")
const extended = [...bundle.matchAll(/x/g)].length && null
let targets = [
  ...Object.values(meta.examples).map((n) => `Examples.${n}`),
  ...["Attachment", "Bubble", "CodeBlock", "Drawer", "Marker", "Message", "MessageScroller", "Questionnaire", "Toast", "Trace", "Filters", "Filters2", "Kanban", "NumberField", "Sortable", "Stepper", "Stepper2", "TimePicker", "Timeline", "Tree", "ActionBar", "Editable", "TagsInput"].map((n) => `Examples.Extended${n}`),
  ...meta.blocks.map((b) => b.name),
  ...meta.variants.map((v) => `Variants.${v.name}`),
]
if (filter) targets = targets.filter((t) => new RegExp(filter).test(t))

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" }
const server = http.createServer((req, res) => {
  const p = path.join(here, "harness", decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/^\/$/, "/index.html"))
  if (!p.startsWith(path.join(here, "harness")) || !fs.existsSync(p)) { res.writeHead(404); return res.end() }
  res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); fs.createReadStream(p).pipe(res)
}).listen(4060)

const PORT = 9340
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${path.join(here, "chrome-profile")}`, "--window-size=1280,900", "--no-first-run", "about:blank"], { stdio: "ignore" })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
for (let i = 0; i < 100; i++) { try { if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) break } catch {} await sleep(200) }

async function run(target) {
  const res = { target, status: null, error: null, console: [], exceptions: [] }
  const t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" })).json()
  const ws = new WebSocket(t.webSocketDebuggerUrl); let id = 0; const pending = new Map(); let loaded = false
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data)
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); return }
    if (m.method === "Page.loadEventFired") loaded = true
    if (m.method === "Runtime.exceptionThrown") res.exceptions.push((m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).slice(0, 400))
    if (m.method === "Runtime.consoleAPICalled" && (m.params.type === "error" || m.params.type === "warning")) res.console.push(`${m.params.type}: ${m.params.args.map((a) => a.value ?? a.description ?? "").join(" ").slice(0, 300)}`)
  }
  await new Promise((r) => (ws.onopen = r))
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
  await send("Runtime.enable"); await send("Page.enable")
  await send("Page.navigate", { url: `http://localhost:4060/index.html?c=${encodeURIComponent(target)}&theme=${theme}` })
  const t0 = Date.now(); while (!loaded && Date.now() - t0 < 30000) await sleep(50)
  for (let i = 0; i < 40; i++) { await sleep(250); const s = (await send("Runtime.evaluate", { expression: "window.__ds && window.__ds.status", returnByValue: true })).result?.value; if (s && s !== "pending") break }
  await sleep(300)
  const v = (await send("Runtime.evaluate", { expression: "JSON.stringify({ds: window.__ds, h: document.getElementById('root')?.getBoundingClientRect().height || 0, text: (document.getElementById('root')?.innerText || '').length})", returnByValue: true })).result?.value
  const parsed = v ? JSON.parse(v) : {}
  Object.assign(res, { status: parsed.ds?.status, error: parsed.ds?.error, height: parsed.h, text: parsed.text })
  ws.close(); await fetch(`http://127.0.0.1:${PORT}/json/close/${t.id}`).catch(() => {})
  return res
}

const results = []; const queue = [...targets]
await Promise.all(Array.from({ length: Number(conc) }, async () => { while (queue.length) { const t = queue.shift(); try { results.push(await run(t)) } catch (e) { results.push({ target: t, status: "fatal", error: e.message }) } process.stdout.write(`\r${results.length}/${targets.length}   `) } }))
chrome.kill(); server.close()
fs.writeFileSync(outFile, JSON.stringify(results.sort((a, b) => a.target.localeCompare(b.target)), null, 1))
const bad = results.filter((r) => r.status !== "ok" || r.exceptions.length || r.console.some((c) => c.startsWith("error")))
const empty = results.filter((r) => r.status === "ok" && r.height < 8)
console.log(`\n${results.length} mounted, ${bad.length} with errors, ${empty.length} rendered empty`)
const groups = {}
for (const r of bad) { const k = (r.error || r.exceptions[0] || r.console.find((c) => c.startsWith("error")) || r.status || "").replace(/https?:\/\/\S+/g, "").slice(0, 140); (groups[k] = groups[k] || []).push(r.target) }
for (const [k, v] of Object.entries(groups).sort((a, b) => b[1].length - a[1].length)) console.log(`${v.length}× ${k}\n    ${v.slice(0, 8).join(" ")}`)
if (empty.length) console.log("empty:", empty.map((r) => r.target).join(" "))
