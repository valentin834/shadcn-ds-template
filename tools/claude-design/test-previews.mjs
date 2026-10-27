// Renders every components/<Comp>/preview.html the way the Design System page
// frames it (tokens.css, bundle.css, React 18, bundle.js preloaded), in light
// and dark, and reports errors and blank previews.
// Usage: node test-previews.mjs <out.json> [concurrency] [filterRegex]
import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { spawn } from "node:child_process"

const here = path.dirname(fileURLToPath(import.meta.url))
const [outFile, conc = "6", filter] = process.argv.slice(2)
const comps = fs.readdirSync(path.join(here, "dist/project/components")).filter((c) => fs.existsSync(path.join(here, "dist/project/components", c, "preview.html"))).filter((c) => !filter || new RegExp(filter).test(c))
const head = (theme) => `<!doctype html><html data-theme="${theme}"><head><meta charset="utf-8"><link rel="stylesheet" href="/tokens.css"><link rel="stylesheet" href="/bundle.css"><script src="/react.js"></script><script src="/react-dom.js"></script><script src="/bundle.js"></script></head><body>`
const server = http.createServer((req, res) => {
  const u = new URL(req.url, "http://x")
  const m = u.pathname.match(/^\/preview\/([^/]+)$/)
  if (m) {
    const body = fs.readFileSync(path.join(here, "dist/project/components", m[1], "preview.html"), "utf8")
    res.writeHead(200, { "content-type": "text/html" }); return res.end(head(u.searchParams.get("theme") || "light") + body + "</body></html>")
  }
  const p = path.join(here, "harness", u.pathname)
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end() }
  res.writeHead(200, { "content-type": p.endsWith(".js") ? "text/javascript" : "text/css" }); fs.createReadStream(p).pipe(res)
}).listen(4062)

const PORT = 9342
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${path.join(here, "chrome-profile-previews")}`, "--window-size=1280,900", "--no-first-run", "about:blank"], { stdio: "ignore" })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
for (let i = 0; i < 100; i++) { try { if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) break } catch {} await sleep(200) }

async function run(comp, theme) {
  const res = { comp, theme, errors: [], height: 0 }
  const t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" })).json()
  const ws = new WebSocket(t.webSocketDebuggerUrl); let id = 0; const pending = new Map(); let loaded = false
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data)
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); return }
    if (m.method === "Page.loadEventFired") loaded = true
    if (m.method === "Runtime.exceptionThrown") res.errors.push((m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).slice(0, 300))
    if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") res.errors.push(m.params.args.map((a) => a.value ?? a.description ?? "").join(" ").slice(0, 300))
  }
  await new Promise((r) => (ws.onopen = r))
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
  await send("Runtime.enable"); await send("Page.enable")
  await send("Page.navigate", { url: `http://localhost:4062/preview/${comp}?theme=${theme}` })
  const t0 = Date.now(); while (!loaded && Date.now() - t0 < 30000) await sleep(50)
  await sleep(2500)
  res.height = (await send("Runtime.evaluate", { expression: "Math.round(document.body.scrollHeight)", returnByValue: true })).result?.value ?? 0
  res.text = (await send("Runtime.evaluate", { expression: "document.body.innerText.trim().length", returnByValue: true })).result?.value ?? 0
  ws.close(); await fetch(`http://127.0.0.1:${PORT}/json/close/${t.id}`).catch(() => {})
  return res
}

const jobs = comps.flatMap((c) => [[c, "light"], [c, "dark"]])
const results = []
await Promise.all(Array.from({ length: Number(conc) }, async () => { while (jobs.length) { const [c, th] = jobs.shift(); try { results.push(await run(c, th)) } catch (e) { results.push({ comp: c, theme: th, errors: ["fatal " + e.message] }) } } }))
chrome.kill(); server.close()
fs.writeFileSync(outFile, JSON.stringify(results, null, 1))
const bad = results.filter((r) => r.errors.length)
const blank = results.filter((r) => !r.errors.length && r.height < 24)
console.log(`${results.length} renders (${comps.length} previews × 2 themes): ${bad.length} with errors, ${blank.length} blank`)
for (const r of bad.slice(0, 20)) console.log(`✗ ${r.comp} [${r.theme}] ${r.errors[0]}`)
for (const r of blank) console.log(`blank ${r.comp} [${r.theme}]`)
