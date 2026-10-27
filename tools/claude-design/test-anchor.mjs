// Opens overlays in the harness (React 18) with a real click and checks the
// popup sits next to its trigger — i.e. the trigger's ref reached Base UI.
import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { spawn } from "node:child_process"

const here = path.dirname(fileURLToPath(import.meta.url))
const cases = [
  { c: "Examples.DropdownMenuExample", trigger: "[data-slot=dropdown-menu-trigger]", popup: "[data-slot=dropdown-menu-content]" },
  { c: "Examples.PopoverExample", trigger: "[data-slot=popover-trigger]", popup: "[data-slot=popover-content]" },
  { c: "Examples.SelectExample", trigger: "[data-slot=select-trigger]", popup: "[data-slot=select-content]" },
  { c: "Examples.TooltipExample", trigger: "[data-slot=tooltip-trigger]", popup: "[data-slot=tooltip-content]", hover: true },
  { c: "Examples.ComboboxExample", trigger: "[data-slot=combobox-trigger], [data-slot=input-group] input", popup: "[data-slot=combobox-content]" },
  { c: "Examples.HoverCardExample", trigger: "[data-slot=hover-card-trigger]", popup: "[data-slot=hover-card-content]", hover: true },
  { c: "Examples.DialogExample", trigger: "[data-slot=dialog-trigger]", popup: "[data-slot=dialog-content]", centered: true },
  { c: "Examples.SheetExample", trigger: "[data-slot=sheet-trigger]", popup: "[data-slot=sheet-content]", centered: true },
]
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" }
const server = http.createServer((req, res) => {
  const p = path.join(here, "harness", decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/^\/$/, "/index.html"))
  if (!fs.existsSync(p)) { res.writeHead(404); return res.end() }
  res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); fs.createReadStream(p).pipe(res)
}).listen(4061)
const PORT = 9341
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${path.join(here, "chrome-profile-anchor")}`, "--window-size=1280,900", "--no-first-run", "about:blank"], { stdio: "ignore" })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
for (let i = 0; i < 100; i++) { try { if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) break } catch {} await sleep(200) }

for (const k of cases) {
  const t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" })).json()
  const ws = new WebSocket(t.webSocketDebuggerUrl); let id = 0; const pending = new Map(); let loaded = false; const errors = []
  ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id) } else if (m.method === "Page.loadEventFired") loaded = true; else if (m.method === "Runtime.exceptionThrown") errors.push(m.params.exceptionDetails.exception?.description?.slice(0, 200)); else if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") errors.push(m.params.args.map((a) => a.value ?? a.description).join(" ").slice(0, 200)) }
  await new Promise((r) => (ws.onopen = r))
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
  const ev = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true })).result?.value
  await send("Runtime.enable"); await send("Page.enable")
  await send("Page.navigate", { url: `http://localhost:4061/index.html?c=${k.c}` })
  const t0 = Date.now(); while (!loaded && Date.now() - t0 < 30000) await sleep(50)
  await sleep(2500)
  const r = await ev(`(() => { const e = [...document.querySelectorAll(${JSON.stringify(k.trigger)})].find(x => x.getBoundingClientRect().width > 0); if (!e) return null; e.scrollIntoView({block: "center"}); const b = e.getBoundingClientRect(); return { x: b.x + b.width / 2, y: b.y + b.height / 2, l: b.left, t: b.top, r: b.right, b: b.bottom } })()`)
  if (!r) { console.log(`?? ${k.c}: trigger not found`); continue }
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: r.x, y: r.y })
  if (!k.hover) { await send("Input.dispatchMouseEvent", { type: "mousePressed", x: r.x, y: r.y, button: "left", clickCount: 1 }); await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: r.x, y: r.y, button: "left", clickCount: 1 }) }
  await sleep(1500)
  const p = await ev(`(() => { const e = document.querySelector(${JSON.stringify(k.popup)}); if (!e) return null; const b = e.getBoundingClientRect(); return { l: b.left, t: b.top, r: b.right, b: b.bottom, w: b.width, h: b.height } })()`)
  let verdict
  if (!p) verdict = "✗ popup did not open"
  else if (k.centered) verdict = p.w > 0 ? "✓ open" : "✗ zero size"
  else {
    const gap = Math.min(Math.abs(p.t - r.b), Math.abs(r.t - p.b), Math.abs(p.l - r.r), Math.abs(r.l - p.r))
    const overlapX = p.l < r.r + 40 && p.r > r.l - 40
    const overlapY = p.t < r.b + 40 && p.b > r.t - 40
    verdict = gap < 24 && (overlapX || overlapY) ? `✓ anchored (gap ${gap.toFixed(0)}px)` : `✗ not next to trigger (trigger ${JSON.stringify(r)} popup ${JSON.stringify(p)})`
  }
  console.log(`${verdict.startsWith("✓") ? "PASS" : "FAIL"} ${k.c}: ${verdict}${errors.length ? " errors: " + errors.join(" | ") : ""}`)
  ws.close(); await fetch(`http://127.0.0.1:${PORT}/json/close/${t.id}`).catch(() => {})
}
chrome.kill(); server.close()
