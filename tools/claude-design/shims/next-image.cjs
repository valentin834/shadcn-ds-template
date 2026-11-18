// next/image outside Next: a plain img (fill → absolutely positioned cover).
const React = window.React
const Image = React.forwardRef(function Image({ src, fill, priority, quality, placeholder, blurDataURL, loader, unoptimized, sizes, style, ...props }, ref) {
  const url = typeof src === "object" && src ? src.src : src
  const fillStyle = fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" } : null
  return React.createElement("img", { ref, src: url, loading: priority ? "eager" : "lazy", style: { ...fillStyle, ...style }, ...props })
})
module.exports = Image
module.exports.default = Image
