// After a successful publish: out/manifest.json (the files just published)
// becomes published-manifest.json, the base of the next build's diff.
// Usage: node mark-published.mjs [artifact version from the publish result]
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const here = path.dirname(fileURLToPath(import.meta.url))
const manifest = JSON.parse(fs.readFileSync(path.join(here, "out/manifest.json"), "utf8"))
const version = process.argv[2]
const out = { artifact: manifest.artifact, ref: manifest.ref, ...(version ? { version } : {}), publishedAt: new Date().toISOString().slice(0, 10), files: manifest.files }
fs.writeFileSync(path.join(here, "published-manifest.json"), JSON.stringify(out, null, 1) + "\n")
console.log(`published-manifest.json : ${Object.keys(out.files).length} fichiers, ${out.ref}${version ? `, version ${version}` : ""}`)
