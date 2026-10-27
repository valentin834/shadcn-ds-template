// Builds harness/: a page reproducing a Design canvas frame (React 18 UMD,
// tokens.css compiled from tokens.json, bundle.css, bundle.js) that mounts one
// component given as ?c=Path.In.Namespace (&theme=dark).
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const h = path.join(here, "harness")
fs.mkdirSync(h, { recursive: true })
const tokens = JSON.parse(fs.readFileSync(path.join(here, "dist/project/tokens.json"), "utf8"))

// tokens.css, laid out as the Design System page compiles it.
const [first, ...rest] = tokens.color.themes.map((t) => t.id)
const val = (t, theme) => (typeof t.value === "string" ? t.value : t.value[theme] ?? t.value[first])
let css = `/* 40-60 · shadcn DS — generated from tokens.json */\n:root, [data-theme="${first}"] {\n${tokens.color.tokens.map((t) => `  --${t.name}: ${val(t, first)};`).join("\n")}\n}\n`
for (const th of rest) css += `[data-theme="${th}"] {\n${tokens.color.tokens.map((t) => `  --${t.name}: ${val(t, th)};`).join("\n")}\n}\n`
css += `:root {\n${tokens.radius.tokens.map((t) => `  --${t.name}: ${t.value};`).join("\n")}\n${Object.entries(tokens.type.families).map(([k, v]) => `  --font-${k}: ${v};`).join("\n")}\n}\n`
for (const g of tokens.type.groups) for (const s of g.styles) {
  css += `.${s.name} { font-family: var(--font-${s.family ?? g.family}); font-size: ${s.fontSize}; line-height: ${s.lineHeight}; font-weight: ${s.fontWeight};${s.letterSpacing ? ` letter-spacing: ${s.letterSpacing};` : ""} }\n`
}
fs.writeFileSync(path.join(h, "tokens.css"), css)
fs.copyFileSync(path.join(here, "out/bundle.css"), path.join(h, "bundle.css"))
fs.copyFileSync(path.join(here, "out/bundle.js"), path.join(h, "bundle.js"))
fs.copyFileSync(path.join(here, "node_modules/react/umd/react.production.min.js"), path.join(h, "react.js"))
fs.copyFileSync(path.join(here, "node_modules/react-dom/umd/react-dom.production.min.js"), path.join(h, "react-dom.js"))

fs.writeFileSync(path.join(h, "index.html"), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<script>document.documentElement.dataset.theme = new URLSearchParams(location.search).get("theme") || "light"</script>
<link rel="stylesheet" href="tokens.css">
<link rel="stylesheet" href="bundle.css">
<script src="react.js"></script>
<script src="react-dom.js"></script>
<script src="bundle.js"></script>
<style>body{margin:0;padding:24px}</style>
</head>
<body>
<div id="root"></div>
<script>
const q = new URLSearchParams(location.search)
const pathName = q.get("c")
const C = pathName.split(".").reduce((o, k) => (o ? o[k] : undefined), window.Ds4060)
window.__ds = { status: "pending", error: null }
class Boundary extends React.Component {
  constructor(p) { super(p); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error) { window.__ds = { status: "error", error: String(error && (error.stack || error)).slice(0, 800) } }
  render() { return this.state.error ? React.createElement("pre", { id: "ds-error" }, String(this.state.error)) : this.props.children }
}
if (!C) window.__ds = { status: "missing", error: "not found: " + pathName }
else {
  ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(Boundary, null, React.createElement(C)))
  setTimeout(() => { if (window.__ds.status === "pending") window.__ds.status = "ok" }, 1500)
}
</script>
</body>
</html>
`)
console.log("harness ready:", fs.readdirSync(h).join(" "))
