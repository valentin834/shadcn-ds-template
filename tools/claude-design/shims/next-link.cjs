// next/link outside Next: a plain anchor.
const React = window.React
const Link = React.forwardRef(function Link({ href, prefetch, replace, scroll, shallow, passHref, legacyBehavior, ...props }, ref) {
  return React.createElement("a", { ref, href: typeof href === "object" && href ? href.pathname || "#" : href, ...props })
})
module.exports = Link
module.exports.default = Link
