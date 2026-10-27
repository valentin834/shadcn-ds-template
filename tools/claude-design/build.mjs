// Bundles src/entry.tsx into ONE classic script assigning window.Ds4060,
// reading window.React / window.ReactDOM (React 18, supplied by the canvas).
// Usage: node build.mjs [repoRoot] [--dev] [--test]
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import * as esbuild from "esbuild"

const repo = path.resolve(process.argv.slice(2).find((a) => !a.startsWith("--")) || path.join(path.dirname(fileURLToPath(import.meta.url)), "../.."))
const dev = process.argv.includes("--dev")
// --test: the examples go through shims/wrap-jsx-runtime.cjs, which can wrap every
// public component like a Design canvas does (window.__DS_WRAP), for test-wrap.mjs.
const test = process.argv.includes("--test")
const here = path.dirname(fileURLToPath(import.meta.url))
const shim = (f) => path.join(here, "shims", f)

const globals = {
  name: "globals",
  setup(b) {
    b.onResolve({ filter: /^react$/ }, () => ({ path: shim("react.cjs") }))
    b.onResolve({ filter: /^react\/jsx(-dev)?-runtime$/ }, () => ({ path: shim("jsx-runtime.cjs") }))
    b.onResolve({ filter: /^@dswrap\/jsx(-dev)?-runtime$/ }, () => ({ path: shim("wrap-jsx-runtime.cjs") }))
    b.onResolve({ filter: /^react-dom(\/client)?$/ }, () => ({ path: shim("react-dom.cjs") }))
    b.onResolve({ filter: /^next-themes$/ }, () => ({ path: shim("next-themes.cjs") }))
    b.onResolve({ filter: /^next\/link$/ }, () => ({ path: shim("next-link.cjs") }))
    b.onResolve({ filter: /^next\/image$/ }, () => ({ path: shim("next-image.cjs") }))
    b.onResolve({ filter: /^xlsx$/ }, () => ({ path: shim("xlsx.cjs") }))
    b.onResolve({ filter: /^@\/lib\/highlighter$/ }, () => ({ path: shim("highlighter.cjs") }))
    b.onResolve({ filter: /^@ds-examples\// }, (a) => ({ path: path.join(here, "src/examples", a.path.slice("@ds-examples/".length) + ".tsx") }))
    b.onResolve({ filter: /^@\/components\/example$/ }, () => ({ path: path.join(here, "src/example.tsx") }))
    b.onResolve({ filter: /^@\// }, async (a) => {
      const base = path.join(repo, "src", a.path.slice(2))
      for (const ext of [".tsx", ".ts", "/index.tsx", "/index.ts", ".js"]) if (fs.existsSync(base + ext)) return { path: base + ext }
      return { errors: [{ text: `cannot resolve ${a.path}` }] }
    })
  },
}

// Flags every top-level PascalCase component of the repo's sources so the JSX
// runtime can hand it a ref under React 18 (see shims/jsx-runtime.cjs).
const markComponents = {
  name: "mark-components",
  setup(b) {
    b.onLoad({ filter: /\.(tsx|ts)$/ }, async (a) => {
      if (a.path.includes("node_modules") || (!a.path.startsWith(path.join(repo, "src")) && !a.path.startsWith(path.join(here, "src")))) return
      let code = await fs.promises.readFile(a.path, "utf8")
      const names = new Set()
      for (const m of code.matchAll(/^(?:export\s+)?(?:default\s+)?function\s+([A-Z][A-Za-z0-9_]*)\s*[(<]/gm)) names.add(m[1])
      for (const m of code.matchAll(/^(?:export\s+)?const\s+([A-Z][A-Za-z0-9_]*)\s*(?::[^=]+)?=\s*(?:\(|async\s*\(|[a-z_$][\w$]*\s*=>|function\b)/gm)) names.add(m[1])
      if (test && (a.path.startsWith(path.join(here, "src/examples")) || a.path.startsWith(path.join(repo, "src/components/examples")))) code = "/** @jsxImportSource @dswrap */\n" + code
      if (names.size) code += `\n;${[...names].map((n) => `try { ${n}.__dsRef = true } catch {}`).join(" ")}\n`
      return { contents: code, loader: a.path.endsWith(".tsx") ? "tsx" : "ts" }
    })
  },
}

const result = await esbuild.build({
  entryPoints: [path.join(here, "src/entry.tsx")],
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["es2020"],
  minify: !dev,
  legalComments: "none",
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"', "process.env": "{}", global: "window" },
  nodePaths: [path.join(repo, "node_modules")],
  plugins: [globals, markComponents],
  outfile: path.join(here, test ? "out/bundle-test.raw.js" : "out/bundle.raw.js"),
  metafile: true,
  logLevel: "warning",
  loader: { ".svg": "dataurl", ".png": "dataurl", ".jpg": "dataurl", ".webp": "dataurl" },
})

const meta = JSON.parse(fs.readFileSync(path.join(here, "out/meta.json"), "utf8"))
const components = [...meta.families.map((f) => f.lead), ...meta.blocks.map((b) => b.name)]
const header = `/* @ds-bundle: ${JSON.stringify({ format: 4, namespace: "Ds4060", components: components.map((name) => ({ name })) })} */\n`
let js = fs.readFileSync(path.join(here, test ? "out/bundle-test.raw.js" : "out/bundle.raw.js"), "utf8")
// Consumers inline the bundle: no literal "</script" or "<!--" may survive.
js = js.replace(/<\/script/gi, "<\\/script").replace(/<!--/g, "\\x3C!--")
const outName = test ? "out/bundle-test.js" : "out/bundle.js"
fs.writeFileSync(path.join(here, outName), header + js)
fs.writeFileSync(path.join(here, "out/metafile.json"), JSON.stringify(result.metafile))
const size = fs.statSync(path.join(here, outName)).size
console.log(`bundle.js ${(size / 1024 / 1024).toFixed(2)} MB, ${components.length} catalogued components`)
const byPkg = {}
for (const [f, i] of Object.entries(result.metafile.outputs[Object.keys(result.metafile.outputs)[0]].inputs)) {
  const k = f.includes("node_modules/") ? f.split("node_modules/").pop().split("/").slice(0, f.split("node_modules/").pop().startsWith("@") ? 2 : 1).join("/") : f.includes("/src/components/shadcn-studio/") ? "(shadcn-studio)" : f.includes("/src/app/") ? "(blocks pages)" : "(repo/other)"
  byPkg[k] = (byPkg[k] || 0) + i.bytesInOutput
}
console.log(Object.entries(byPkg).sort((a, b) => b[1] - a[1]).slice(0, 15).map(([k, v]) => `${k} ${(v / 1024).toFixed(0)}k`).join(" · "))
