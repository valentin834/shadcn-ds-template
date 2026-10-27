// Renders a real .dc.html artboard with the Design canvas runtime (dc-runtime.js
// served as support.js), once with the original bundle.css and once with the
// wrapper-aware one, and reports what differs: wrappers found, icon sizes in
// badges and buttons, row borders, errors. Saves a screenshot of each.
// Usage: node test-canvas.mjs <canvasDir> <artboard.dc.html>
import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import { spawn } from "node:child_process"

const [dir, board = "Main.dc.html"] = process.argv.slice(2)
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json" }
const serve = (port, cssName) => http.createServer((req, res) => {
  let rel = decodeURIComponent(new URL(req.url, "http://x").pathname)
  if (rel.endsWith("/components/bundle.css")) rel = rel.replace("bundle.css", cssName)
  const p = path.join(dir, rel)
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end() }
  res.writeHead(200, { "content-type": types[path.extname(p)] || "application/octet-stream" }); fs.createReadStream(p).pipe(res)
}).listen(port)
const servers = [serve(4064, "bundle-orig.css"), serve(4065, "bundle-fix.css")]
const PORT = 9344
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${path.join(dir, "..", "chrome-profile-canvas")}`, "--window-size=1440,960", "--no-first-run", "about:blank"], { stdio: "ignore" })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
for (let i = 0; i < 100; i++) { try { if ((await fetch(`http://127.0.0.1:${PORT}/json/version`)).ok) break } catch {} await sleep(200) }

const PROBE = `(() => {
  const r = (e) => { const b = e.getBoundingClientRect(); return Math.round(b.width) + "x" + Math.round(b.height) }
  const count = (sel) => document.querySelectorAll(sel).length
  const sizes = (sel) => { const m = {}; for (const e of document.querySelectorAll(sel)) { const k = r(e); m[k] = (m[k] || 0) + 1 } return m }
  const rows = [...document.querySelectorAll("[data-slot=table-body] [data-slot=table-row]")]
  return {
    wrappers: count(".sc-host-x"), xImports: count("[data-slot]"),
    badgeIcons: sizes("[data-slot=badge] svg"), buttonIcons: sizes("[data-slot=button] svg"), sidebarIcons: sizes("[data-slot=sidebar-menu-button] svg"),
    rowBottomBorders: rows.map((e) => getComputedStyle(e).borderBottomWidth).join(" "),
    selectTriggers: [...document.querySelectorAll("[data-slot=select-trigger]")].map(r).join(" "),
    groupRadii: [...document.querySelectorAll("[data-slot=button-group] [data-slot=button]")].map((e) => { const c = getComputedStyle(e); return c.borderTopLeftRadius + "/" + c.borderTopRightRadius }).join(" "),
    stepper: [...document.querySelectorAll("[data-slot=stepper-item]")].map((e) => e.getAttribute("data-state")).join(" "),
    dialog: !!document.querySelector("[data-slot=dialog-content]"),
    alertIcon: [...document.querySelectorAll("[data-slot=alert] > svg, [data-slot=alert] svg")].map((e) => { const b = e.getBoundingClientRect(); return Math.round(b.width) }).join(" "),
    alertGridCols: (() => { const a = document.querySelector("[data-slot=alert]"); return a ? getComputedStyle(a).gridTemplateColumns : "" })(),
    toggleRadii: [...document.querySelectorAll("[data-slot=toggle-group-item]")].map((e) => getComputedStyle(e).borderTopLeftRadius).join(" "),
    selectPopupBg: (() => { const e = document.querySelector("[data-slot=select-content]"); return e ? getComputedStyle(e).backgroundColor : "" })(),
    selectValue: (() => { const e = document.querySelector("[data-slot=select-value]"); return e ? e.textContent : "" })(),
    htmlTheme: document.documentElement.getAttribute("data-theme"),
    cardBg: (() => { const e = document.querySelector("[data-slot=card]"); return e ? getComputedStyle(e).backgroundColor : "" })(),
    text: document.body.innerText.length,
  }
})()`

for (const [port, name] of [[4064, "orig"], [4065, "fix"]]) {
  const t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" })).json()
  const ws = new WebSocket(t.webSocketDebuggerUrl); let id = 0; const pending = new Map(); let loaded = false; const errors = []
  ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id) } else if (m.method === "Page.loadEventFired") loaded = true; else if (m.method === "Runtime.exceptionThrown") errors.push((m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).slice(0, 300)); else if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") errors.push(m.params.args.map((a) => a.value ?? a.description).join(" ").slice(0, 300)) }
  await new Promise((r) => (ws.onopen = r))
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
  await send("Runtime.enable"); await send("Page.enable")
  await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 960, deviceScaleFactor: 1, mobile: false })
  await send("Page.navigate", { url: `http://localhost:${port}/${board}` })
  const t0 = Date.now(); while (!loaded && Date.now() - t0 < 30000) await sleep(50)
  await sleep(5000)
  const v = (await send("Runtime.evaluate", { expression: PROBE, returnByValue: true })).result?.value
  const shot = await send("Page.captureScreenshot", { format: "png" })
  fs.writeFileSync(path.join(dir, "..", "out", `canvas-${path.basename(board, ".dc.html")}-${name}.png`), Buffer.from(shot.data, "base64"))
  console.log(name, JSON.stringify(v), errors.length ? "errors: " + errors.slice(0, 3).join(" | ") : "")
  ws.close()
}
chrome.kill(); servers.forEach((s) => s.close())
