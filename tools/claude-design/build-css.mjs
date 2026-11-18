// Compiles components/bundle.css with the repo's Tailwind v4: every class the
// bundled sources use, the @theme mappings of globals.css, and no token values
// (those come from the design system's tokens.css, per theme).
// Usage: node build-css.mjs [repoRoot]
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createRequire } from "node:module"
import selectorParser from "postcss-selector-parser"
import { wrapCss } from "./wrap-css.mjs"

const repo = path.resolve(process.argv[2] || path.join(path.dirname(fileURLToPath(import.meta.url)), "../.."))
const here = path.dirname(fileURLToPath(import.meta.url))
const req = createRequire(path.join(repo, "package.json"))
const postcss = req("postcss")
const tailwind = req("@tailwindcss/postcss")

const globals = fs.readFileSync(path.join(repo, "src/app/globals.css"), "utf8")
const theme = globals.slice(globals.indexOf("@theme inline"), globals.indexOf(":root {"))
const property = globals.slice(globals.indexOf("@property --button-angle"))
const fonts = globals.match(/^@import url\([^)]*\);/m)?.[0] ?? ""

const input = `@import url("https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap");
${fonts}
@import "tailwindcss" source(none);
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@source "${path.join(repo, "src/components")}";
@source "${path.join(repo, "src/app")}";
@source "${path.join(repo, "src/assets")}";
@source "${path.join(repo, "src/hooks")}";
@source "${path.join(here, "src")}";

/* The canvas switches themes with data-theme on <html>; .dark kept for the repo's own markup. */
@custom-variant dark (&:is([data-theme="dark"], [data-theme="dark"] *, .dark, .dark *));

${theme}
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  html {
    @apply font-sans;
  }
}

${property}
`
const out = await postcss([tailwind({ base: repo, optimize: { minify: true } })]).process(input, { from: path.join(repo, "src/app/__ds-bundle.css") })
// The canvas wraps each <x-import>: make every structural selector see through it.
const wrapped = wrapCss(out.css, postcss, selectorParser)
console.log("wrapper-aware selectors:", wrapped.stats)
// A canvas puts an x-import's style="…" on its wrapper: when that style sizes
// the slot, the component fills it (shadcn controls are often w-fit). Unlayered,
// so it wins over the utilities.
const slotFill = `
.sc-host-x:is([style^="width"], [style*=" width"], [style*=";width"]) > * { width: 100%; }
.sc-host-x:is([style^="height"], [style*=" height"], [style*=";height"]) > * { height: 100%; }
`
let css = wrapped.css + slotFill
if (/<\/style/i.test(css)) css = css.replace(/<\/style/gi, "<\\/style")
fs.writeFileSync(path.join(here, "out/bundle.css"), css)
console.log(`bundle.css ${(css.length / 1024).toFixed(0)} KB`)
// The token values must not be declared here (one source: tokens.css).
const leaked = [...css.matchAll(/--(background|foreground|primary|border|radius|chart-1|sidebar):/g)].map((m) => m[1])
console.log(leaked.length ? `token values found in bundle.css: ${[...new Set(leaked)].join(", ")}` : "no token values in bundle.css")
