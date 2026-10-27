// JSX runtime over React 18's createElement.
//
// The repo's components are written for React 19, where `ref` is a plain prop of
// function components. React 18 strips `ref` before calling a function component,
// so Base UI's `render={<Button />}` composition would lose its ref (popovers
// anchored nowhere, focus not returned). Components defined in the repo are
// flagged at build time (`__dsRef`); here they are wrapped once in forwardRef,
// which hands the ref back as a prop, the React 19 way.
const React = window.React
const wrappers = new WeakMap()

function withRef(type) {
  if (typeof type !== "function" || !type.__dsRef) return type
  let wrapper = wrappers.get(type)
  if (!wrapper) {
    wrapper = React.forwardRef(function (props, ref) {
      return type(ref == null ? props : Object.assign({}, props, { ref }))
    })
    wrapper.displayName = type.displayName || type.name
    wrappers.set(type, wrapper)
  }
  return wrapper
}

function jsx(type, props, key) {
  return React.createElement(withRef(type), key === undefined ? props : Object.assign({}, props, { key }))
}

module.exports = { jsx, jsxs: jsx, jsxDEV: jsx, Fragment: React.Fragment }
