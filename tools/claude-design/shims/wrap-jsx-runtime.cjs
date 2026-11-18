// Test-only JSX runtime for the examples. With window.__DS_WRAP set it mimics a
// Design canvas: a public Ds4060 component placed as a CHILD of another element
// is wrapped in <div class="sc-host-x" data-dc-tpl style="display:contents">,
// the way the canvas wraps a nested <x-import>. Elements passed through other
// props (render={<Button />}) are not wrapped, as on the canvas. The canvas
// mounts the namespace export, which may be the children-unwrapping version.
const React = window.React
const base = require("./jsx-runtime.cjs")
const publicEls = new WeakSet()
let n = 0

const isPublic = (type) => window.__DS_PUBLIC && window.__DS_PUBLIC.has(type)
const wrapDeep = (c) => (Array.isArray(c) ? c.map(wrapDeep) : wrap(c))
const wrap = (child) => (child && typeof child === "object" && publicEls.has(child)
  ? React.createElement("div", { key: child.key, className: "sc-host-x", "data-dc-tpl": String(n++), style: { display: "contents" } }, child)
  : child)

function jsx(type, props, key) {
  if (!window.__DS_WRAP) return base.jsx(type, props, key)
  let p = props
  if (props && props.children !== undefined) {
    const c = props.children
    p = Object.assign({}, props, { children: wrapDeep(c) })
  }
  const mounted = isPublic(type) ? (window.__DS_SWAP && window.__DS_SWAP.get(type)) || type : type
  const el = base.jsx(mounted, p, key)
  if (isPublic(type)) publicEls.add(el)
  return el
}

module.exports = { jsx, jsxs: jsx, jsxDEV: jsx, Fragment: React.Fragment }
