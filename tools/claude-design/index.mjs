// Writes dist/project/design-system.json for the last publish call: the live
// index (read from the artifact just before publishing, never an old copy) with
// a new lastChange. The page discovers components from the files, so nothing
// else in the index changes.
// Usage: node index.mjs <live design-system.json> "<what changed>"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { execFileSync } from "node:child_process"

const here = path.dirname(fileURLToPath(import.meta.url))
const [liveFile, note] = process.argv.slice(2)
if (!liveFile || !note) {
  console.error('Usage: node index.mjs <design-system.json lu sur l\'artifact> "<ce qui a changé>"')
  process.exit(1)
}
const git = (...args) => execFileSync("git", args, { cwd: path.resolve(here, "../.."), encoding: "utf8" }).trim()
const index = JSON.parse(fs.readFileSync(liveFile, "utf8"))
index.lastChange = {
  by: git("config", "user.name"),
  at: new Date().toISOString().replace(/\.\d+Z$/, "Z"),
  via: `Claude Code · valentin834/shadcn-ds-template@${git("rev-parse", "--short", "HEAD")}`,
  note,
}
const out = path.join(here, "dist/project/design-system.json")
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, JSON.stringify(index, null, 2) + "\n")
console.log(`${path.relative(here, out)} : lastChange ${index.lastChange.at} (${index.lastChange.via})`)
