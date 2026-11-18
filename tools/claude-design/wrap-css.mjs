// Makes bundle.css hold when a Design canvas wraps every <x-import> in
// <div class="sc-host-x" style="display:contents">. A component with no DOM of
// its own (Select, Dialog, Tooltip roots) stacks a second wrapper, so each hop
// may cross up to two:
//   A > B             → also A > W > B, A > W > W > B
//   :has(> B)         → also :has(> W > B), :has(> W > W > B)
//   A + B, A ~ B      → A may be a wrapper holding A; B may sit in wrappers
//   B:first-child …   → read on B's outermost wrapper when B is wrapped
//   B:has(~ C) …      → same: sibling tests are read on the wrapper
// W is :where(.sc-host-x): wrapper parts add no specificity, so the cascade
// order the utilities rely on does not change.

const W = ":where(.sc-host-x)"
const HOPS = ["", `${W} > `, `${W} > ${W} > `]
const STRUCT = new Set([":first-child", ":last-child", ":only-child", ":nth-child", ":nth-last-child", ":first-of-type", ":last-of-type", ":only-of-type", ":nth-of-type", ":nth-last-of-type"])
const OF_TYPE = { ":first-of-type": ":first-child", ":last-of-type": ":last-child", ":only-of-type": ":only-child", ":nth-of-type": ":nth-child", ":nth-last-of-type": ":nth-last-child" }
const NESTED = new Set([":is", ":where", ":not", ":has", ":matches", ":-webkit-any"])
const MAX_VARIANTS = 27

export function wrapCss(css, postcss, sp) {
  const stats = { rules: 0, changed: 0, capped: 0 }

  const firstComb = (sel) => sel.nodes.find((n) => n.type !== "comment")
  // :has() whose relative selectors look at siblings (~ or +): positional.
  const siblingHas = (n) => n.type === "pseudo" && n.value === ":has" && n.nodes?.some((s) => { const f = firstComb(s); return f?.type === "combinator" && /[~+]/.test(f.value) })

  // One selector (complex, or relative inside :has) → list of selector strings.
  function expand(sel) {
    const parts = []
    let cur = []
    for (const node of sel.nodes) {
      if (node.type === "combinator") {
        if (cur.length) parts.push({ kind: "compound", nodes: cur })
        cur = []
        parts.push({ kind: "comb", value: node.value.trim() || " " })
      } else if (node.type !== "comment") cur.push(node)
    }
    if (cur.length) parts.push({ kind: "compound", nodes: cur })

    const strs = parts.map((p) => (p.kind === "comb" ? p : { kind: "compound", str: compound(p.nodes), hasHas: p.nodes.some((n) => n.type === "pseudo" && n.value === ":has"), hasPE: p.nodes.some((n) => n.type === "pseudo" && n.value.startsWith("::")) }))

    // The left side of a sibling combinator may be a wrapper holding it.
    for (let i = 1; i < strs.length; i++) {
      const p = strs[i], left = strs[i - 1]
      if (p.kind === "comb" && (p.value === "+" || p.value === "~") && left.kind === "compound" && !left.hasHas && !left.hasPE) {
        left.str = `:is(${left.str}, ${W}:has(> ${left.str}), ${W}:has(> ${W} > ${left.str}))`
      }
    }

    let variants = [""]
    for (const p of strs) {
      if (p.kind === "compound") { variants = variants.map((v) => v + p.str); continue }
      const c = p.value
      if (c === " ") variants = variants.map((v) => v + " ")
      else if (c === ">" || c === "+" || c === "~") variants = variants.flatMap((v) => HOPS.map((h) => `${v} ${c} ${h}`))
      else variants = variants.map((v) => `${v} ${c} `)
    }
    if (variants.length > MAX_VARIANTS) { stats.capped++; return [String(sel).trim()] }
    return variants.map((v) => v.trim())
  }

  // A compound → string. Positional pseudos (structural ones, sibling :has) are
  // read on the outermost wrapper when the element is wrapped.
  function compound(nodes) {
    const pe = [], pos = [], rest = []
    for (const n of nodes) {
      if (n.type === "pseudo" && n.value.startsWith("::")) pe.push(String(n).trim())
      else if (n.type === "pseudo" && STRUCT.has(n.value)) pos.push(String(n).trim())
      else if (siblingHas(n)) pos.push(`:has(${list(n)})`)
      else if (n.type === "pseudo" && NESTED.has(n.value) && n.nodes?.length) rest.push(`${n.value}(${list(n)})`)
      else rest.push(String(n).trim())
    }
    if (!pos.length) return rest.join("") + pe.join("")
    const base = rest.join("") || "*"
    const own = pos.join("")
    const onWrapper = pos.map((s) => { const k = Object.keys(OF_TYPE).find((t) => s.startsWith(t)); return k ? s.replace(k, OF_TYPE[k]) : s }).join("")
    const w = `:where(.sc-host-x${onWrapper})`
    return `:is(${base}${own}:not(${W} > *), ${w} > ${base}, ${w} > ${W} > ${base})${pe.join("")}`
  }

  // A selector list (rule selector or pseudo argument) → string.
  function list(container) {
    const out = []
    for (const sel of container.nodes) {
      if (sel.type !== "selector") { out.push(String(sel)); continue }
      out.push(...expand(sel))
    }
    return out.join(", ")
  }

  const root = postcss.parse(css)
  root.walkRules((rule) => {
    if (rule.parent?.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return
    stats.rules++
    const before = rule.selector
    if (!/[>+~]|:(first|last|only|nth)-/.test(before)) return
    try {
      const next = list(sp().astSync(before))
      if (next !== before) { rule.selector = next; stats.changed++ }
    } catch { /* leave the rule as it is */ }
  })
  return { css: root.toString(), stats }
}
