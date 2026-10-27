// Rebuilds the whole Claude Design design system from the repo into dist/project
// (the files published under project/ in the artifact), then compares it with
// published-manifest.json and writes out/publish-plan.json: what changed, and
// the Artifact publish calls to send.
// Usage: node build-all.mjs
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import crypto from "node:crypto"
import { execFileSync } from "node:child_process"

const here = path.dirname(fileURLToPath(import.meta.url))
const repo = path.resolve(here, "../..")
const dist = path.join(here, "dist")
const project = path.join(dist, "project")
const git = (...args) => execFileSync("git", args, { cwd: repo, encoding: "utf8" }).trim()
const node = (script, ...args) => {
  console.log(`\n› node ${script} ${args.map((a) => (path.isAbsolute(a) ? path.relative(here, a) || "." : a)).join(" ")}`)
  return execFileSync(process.execPath, [path.join(here, script), ...args], { cwd: here, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"], maxBuffer: 64 << 20 })
}
const copy = (from, to) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to) }

if (!fs.existsSync(path.join(here, "node_modules/esbuild"))) {
  console.error("Dépendances absentes : lancer d'abord `npm run ds:install` à la racine du repo.")
  process.exit(1)
}
const ref = `${git("rev-parse", "--abbrev-ref", "HEAD")}@${git("rev-parse", "--short", "HEAD")}`
const dirty = git("status", "--porcelain", "--", "src", "DESIGN-SYSTEM.md")
if (dirty) console.warn(`Attention : src/ ou DESIGN-SYSTEM.md a des modifications non commitées, la référence ${ref} ne les décrit pas.`)

fs.rmSync(dist, { recursive: true, force: true })
fs.mkdirSync(path.join(here, "out"), { recursive: true })
fs.mkdirSync(project, { recursive: true })

// 1. Namespace and inventory
process.stdout.write(node("gen-entry.mjs", repo))
const meta = JSON.parse(fs.readFileSync(path.join(here, "out/meta.json"), "utf8"))
const sources = meta.families.filter((f) => f.kind !== "ds").map((f) => f.importPath.replace("@/", "src/") + ".tsx")
fs.writeFileSync(path.join(here, "out/inventory.json"), node("inventory.mjs", repo, ...sources))

// 2. Bundles: the published one, and the test one (examples wrapped as on a canvas)
process.stdout.write(node("build.mjs", repo))
process.stdout.write(node("build.mjs", repo, "--test"))
process.stdout.write(node("build-css.mjs", repo))

// 3. Design system files
node("gen-tokens.mjs", repo, path.join(project, "tokens.json"), ref)
process.stdout.write(node("gen-docs.mjs", repo))
copy(path.join(here, "system/project/README.md"), path.join(project, "README.md"))
copy(path.join(here, "system/project/components/Cover/preview.html"), path.join(project, "components/Cover/preview.html"))
node("gen-harness.mjs")
copy(path.join(here, "harness/tokens.css"), path.join(project, "tokens.css"))
copy(path.join(here, "out/bundle-test.js"), path.join(here, "harness/bundle-test.js"))
copy(path.join(here, "out/bundle.js"), path.join(project, "components/bundle.js"))
copy(path.join(here, "out/bundle.css"), path.join(project, "components/bundle.css"))

// 4. What changed since the last publish
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]))
const files = Object.fromEntries(walk(project).map((p) => [path.relative(dist, p), crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex")]).sort(([a], [b]) => a.localeCompare(b)))
const manifestFile = path.join(here, "published-manifest.json")
const published = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, "utf8")) : { files: {} }
const changed = Object.keys(files).filter((p) => published.files[p] && published.files[p] !== files[p])
const added = Object.keys(files).filter((p) => !published.files[p])
const removed = Object.keys(published.files).filter((p) => !files[p])

// Publish calls: at most 255 paths and 16 MiB each; index.d.ts is served as
// text (.ts is not a web type); design-system.json goes alone in the last call.
const size = (p) => fs.statSync(path.join(dist, p)).size
const entry = (p) => (p.endsWith(".d.ts") ? { from: p, contentType: "text/plain" } : p)
const calls = []
let call = null
for (const p of [...changed, ...added].sort((a, b) => size(b) - size(a))) {
  if (!call || Object.keys(call).length >= 250 || Object.keys(call).reduce((s, k) => s + (call[k] ? size(k) : 0), 0) + size(p) > 15 << 20) calls.push((call = {}))
  call[p] = entry(p)
}
if (removed.length) { if (!call) calls.push((call = {})); for (const p of removed) call[p] = null }

const plan = { artifact: published.artifact, ref, root: path.relative(repo, dist), changed, added, removed, calls }
fs.writeFileSync(path.join(here, "out/publish-plan.json"), JSON.stringify(plan, null, 1))
fs.writeFileSync(path.join(here, "out/manifest.json"), JSON.stringify({ artifact: published.artifact, ref, files }, null, 1) + "\n")

const total = Object.keys(files).length
console.log(`\ndist/project : ${total} fichiers (${meta.families.length} composants, ${meta.blocks.length} blocs, ${meta.variants.length} variantes), ${ref}`)
if (!changed.length && !added.length && !removed.length) console.log("Identique à la version publiée : rien à republier.")
else {
  console.log(`Depuis la dernière publication : ${changed.length} modifiés, ${added.length} ajoutés, ${removed.length} supprimés → ${calls.length} appel(s) de publication (out/publish-plan.json).`)
  for (const [label, list] of [["modifié", changed], ["ajouté", added], ["supprimé", removed]]) for (const p of list.slice(0, 15)) console.log(`  ${label} ${p}`)
}
