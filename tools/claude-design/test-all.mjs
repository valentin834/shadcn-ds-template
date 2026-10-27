// Runs every check on the last build (npm run ds:build) in headless Chrome and
// exits non-zero on any problem not listed in KNOWN.
//   mount     each example and block mounts under React 18 without error (--all: the 608 variants too)
//   wrap      each example renders the same flat and wrapped in sc-host-x as on a canvas
//   anchor    menus, popovers, tooltips open next to their trigger
//   previews  each component card of the design system renders, light and dark
//   canvas    a real artboard with dc-runtime.js, if .cache/dc-runtime.js exists
// Usage: node test-all.mjs [--all]
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"

const here = path.dirname(fileURLToPath(import.meta.url))
const out = (f) => path.join(here, "out", f)
const run = (script, ...args) => {
  console.log(`\n› node ${script} ${args.map((a) => (path.isAbsolute(a) ? path.relative(here, a) : a)).join(" ")}`)
  const text = execFileSync(process.execPath, [path.join(here, script), ...args], { cwd: here, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"], maxBuffer: 64 << 20 })
  process.stdout.write(text.replace(/^.*\r(?!\n)/gm, ""))
  return text
}
if (!fs.existsSync(path.join(here, "harness/bundle-test.js"))) {
  console.error("Aucun build : lancer d'abord `npm run ds:build`.")
  process.exit(1)
}

// Accepted differences, each checked by hand (see README).
const KNOWN = {
  wrap: {
    "Examples.ChartExample": "animations JS de recharts: le nombre d'éléments dépend du moment de la mesure",
    "Examples.ExtendedMessageScroller": "content-visibility: les hauteurs dépendent du moment de la mesure",
    "Examples.ExtendedSortable": "régions cachées de dnd-kit (annonces lecteur d'écran) comptées comme enfants",
    "Examples.FieldExample": "inputs cachés: 4 px de marge de description",
    "Examples.InputOtpExample": "input caché: 4 px de marge de description",
  },
  anchor: { "Examples.SelectExample": "Base UI pose la liste sur le déclencheur (alignItemWithTrigger)" },
  previews: { MotionCheckbox: "case animée vide au repos, hauteur sous le seuil" },
}
const problems = []
const flag = (test, id, what) => (KNOWN[test]?.[id] ? console.log(`  connu  ${id} : ${KNOWN[test][id]}`) : problems.push(`${test} ${id} : ${what}`))

// mount
run("test-mount.mjs", out("test-mount.json"), "6", process.argv.includes("--all") ? "" : "^(Examples\\.|Block)")
for (const r of JSON.parse(fs.readFileSync(out("test-mount.json"), "utf8"))) {
  const err = r.status !== "ok" ? r.error || r.status : r.exceptions[0] || r.console.find((c) => c.startsWith("error"))
  if (err) flag("mount", r.target, err)
  else if (r.height < 8) flag("mount", r.target, "rendu vide")
}

// wrap
run("test-wrap.mjs", out("test-wrap.json"), "bundle.css", "4")
for (const r of JSON.parse(fs.readFileSync(out("test-wrap.json"), "utf8"))) {
  if (r.fatal || r.errors?.length) flag("wrap", r.target, r.fatal || r.errors[0])
  else if (r.diffs.length || r.countA !== r.countB) flag("wrap", r.target, `${r.diffs.length} éléments différents une fois enveloppé`)
}

// anchor
for (const line of run("test-anchor.mjs").split("\n")) {
  const m = line.match(/^(PASS|FAIL) (\S+): (.*)$/)
  if (m && (m[1] === "FAIL" || / errors: /.test(m[3]))) flag("anchor", m[2], m[3])
}

// previews
run("test-previews.mjs", out("test-previews.json"), "6")
for (const r of JSON.parse(fs.readFileSync(out("test-previews.json"), "utf8"))) {
  if (r.errors.length) flag("previews", `${r.comp} [${r.theme}]`, r.errors[0])
  else if (r.height < 24) flag("previews", r.comp, `aperçu vide [${r.theme}]`)
}

// canvas: the real Design runtime on the artboards of canvas/
const runtime = path.join(here, ".cache/dc-runtime.js")
if (fs.existsSync(runtime)) {
  // A canvas project as the Design type lays it out: support.js, the artboards, and the
  // design system copied under ds/ds4060/.
  const dir = path.join(here, "canvas-run/project")
  const ds = path.join(dir, "ds/ds4060")
  fs.rmSync(path.dirname(dir), { recursive: true, force: true })
  fs.mkdirSync(path.join(ds, "components"), { recursive: true })
  fs.mkdirSync(path.join(here, "canvas-run/out"))
  for (const f of fs.readdirSync(path.join(here, "canvas"))) fs.copyFileSync(path.join(here, "canvas", f), path.join(dir, f))
  fs.copyFileSync(runtime, path.join(dir, "support.js"))
  fs.copyFileSync(path.join(here, "dist/project/tokens.css"), path.join(ds, "tokens.css"))
  fs.copyFileSync(path.join(here, "dist/project/components/bundle.js"), path.join(ds, "components/bundle.js"))
  // test-canvas.mjs compares two stylesheets: here the same one twice, the probe is what matters.
  for (const name of ["bundle-orig.css", "bundle-fix.css"]) fs.copyFileSync(path.join(here, "dist/project/components/bundle.css"), path.join(ds, "components", name))
  for (const board of fs.readdirSync(path.join(here, "canvas"))) {
    const text = run("test-canvas.mjs", dir, board)
    for (const line of text.split("\n")) if (/ errors: /.test(line)) problems.push(`canvas ${board} : ${line.split(" errors: ")[1]}`)
  }
  console.log("  captures : canvas-run/out/canvas-<artboard>-fix.png")
} else console.log("\n(canvas ignoré : pas de .cache/dc-runtime.js, voir README)")

console.log(problems.length ? `\n✗ ${problems.length} problème(s) :\n  ${problems.join("\n  ")}` : "\n✓ Tous les tests passent (écarts connus listés ci-dessus).")
process.exit(problems.length ? 1 : 0)
