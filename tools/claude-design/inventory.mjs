import fs from "node:fs"; import path from "node:path"
const root = process.argv[2]
const files = process.argv.slice(3)
const out = {}
for (const rel of files) {
  const t = fs.readFileSync(path.join(root, rel), "utf8")
  const exps = new Set()
  for (const m of t.matchAll(/export\s*\{([^}]*)\}/g)) for (const n of m[1].split(",")) { const s = n.trim().replace(/^type\s+/, "").split(/\s+as\s+/).pop(); if (s) exps.add(s) }
  for (const m of t.matchAll(/export\s+(?:default\s+)?(?:function|const|class)\s+(\w+)/g)) exps.add(m[1])
  if (/export\s+default/.test(t)) exps.add("(default)")
  // cva variants: find "variants: {" blocks and list keys + options
  const variants = {}
  for (const m of t.matchAll(/variants:\s*\{/g)) {
    let i = m.index + m[0].length, depth = 1, start = i
    while (depth && i < t.length) { if (t[i] === "{") depth++; else if (t[i] === "}") depth--; i++ }
    const body = t.slice(start, i - 1)
    // top-level keys of body
    let d = 0, key = null, buf = ""
    for (let j = 0; j < body.length; j++) {
      const c = body[j]
      if (c === "{") { if (d === 0) { key = buf.match(/([\w-]+)\s*:\s*$/)?.[1]; buf = ""; variants[key] = [] } d++; continue }
      if (c === "}") { d--; if (d === 0) key = null; continue }
      if (d === 0) buf += c
      if (d === 1 && key) { const sub = body.slice(j).match(/^([\w-]+|"[^"]+")\s*:/); if (sub && /[\s,{]/.test(body[j-1] ?? " ")) { variants[key].push(sub[1].replace(/"/g, "")); j += sub[0].length - 1 } else if (body[j] === '"') { const e = body.indexOf('"', j + 1); j = e } }
    }
  }
  const unions = {}
  for (const m of t.matchAll(/(\w+)\??:\s*("[\w-]+"(?:\s*\|\s*"[\w-]+")+)/g)) unions[m[1]] = [...new Set([...(unions[m[1]]||[]), ...m[2].split("|").map(s=>s.trim().replace(/"/g,""))])]
  const def = t.match(/defaultVariants:\s*\{([^}]*)\}/)?.[1]?.replace(/\s+/g, " ").trim()
  out[rel] = { exports: [...exps], variants, unions, defaultVariants: def }
}
console.log(JSON.stringify(out, null, 1))
