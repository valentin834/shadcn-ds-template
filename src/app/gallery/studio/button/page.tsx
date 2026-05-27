"use client"

import dynamic from 'next/dynamic'

const Button01 = dynamic(() => import("@/components/shadcn-studio/button/button-01"), { ssr: false })
const Button02 = dynamic(() => import("@/components/shadcn-studio/button/button-02"), { ssr: false })
const Button03 = dynamic(() => import("@/components/shadcn-studio/button/button-03"), { ssr: false })
const Button04 = dynamic(() => import("@/components/shadcn-studio/button/button-04"), { ssr: false })
const Button05 = dynamic(() => import("@/components/shadcn-studio/button/button-05"), { ssr: false })
const Button06 = dynamic(() => import("@/components/shadcn-studio/button/button-06"), { ssr: false })
const Button07 = dynamic(() => import("@/components/shadcn-studio/button/button-07"), { ssr: false })
const Button08 = dynamic(() => import("@/components/shadcn-studio/button/button-08"), { ssr: false })
const Button09 = dynamic(() => import("@/components/shadcn-studio/button/button-09"), { ssr: false })
const Button10 = dynamic(() => import("@/components/shadcn-studio/button/button-10"), { ssr: false })
const Button11 = dynamic(() => import("@/components/shadcn-studio/button/button-11"), { ssr: false })
const Button12 = dynamic(() => import("@/components/shadcn-studio/button/button-12"), { ssr: false })
const Button13 = dynamic(() => import("@/components/shadcn-studio/button/button-13"), { ssr: false })
const Button14 = dynamic(() => import("@/components/shadcn-studio/button/button-14"), { ssr: false })
const Button15 = dynamic(() => import("@/components/shadcn-studio/button/button-15"), { ssr: false })
const Button16 = dynamic(() => import("@/components/shadcn-studio/button/button-16"), { ssr: false })
const Button17 = dynamic(() => import("@/components/shadcn-studio/button/button-17"), { ssr: false })
const Button18 = dynamic(() => import("@/components/shadcn-studio/button/button-18"), { ssr: false })
const Button19 = dynamic(() => import("@/components/shadcn-studio/button/button-19"), { ssr: false })
const Button20 = dynamic(() => import("@/components/shadcn-studio/button/button-20"), { ssr: false })
const Button21 = dynamic(() => import("@/components/shadcn-studio/button/button-21"), { ssr: false })
const Button22 = dynamic(() => import("@/components/shadcn-studio/button/button-22"), { ssr: false })
const Button23 = dynamic(() => import("@/components/shadcn-studio/button/button-23"), { ssr: false })
const Button24 = dynamic(() => import("@/components/shadcn-studio/button/button-24"), { ssr: false })
const Button25 = dynamic(() => import("@/components/shadcn-studio/button/button-25"), { ssr: false })
const Button26 = dynamic(() => import("@/components/shadcn-studio/button/button-26"), { ssr: false })
const Button27 = dynamic(() => import("@/components/shadcn-studio/button/button-27"), { ssr: false })
const Button28 = dynamic(() => import("@/components/shadcn-studio/button/button-28"), { ssr: false })
const Button29 = dynamic(() => import("@/components/shadcn-studio/button/button-29"), { ssr: false })
const Button30 = dynamic(() => import("@/components/shadcn-studio/button/button-30"), { ssr: false })
const Button31 = dynamic(() => import("@/components/shadcn-studio/button/button-31"), { ssr: false })
const Button32 = dynamic(() => import("@/components/shadcn-studio/button/button-32"), { ssr: false })
const Button33 = dynamic(() => import("@/components/shadcn-studio/button/button-33"), { ssr: false })
const Button34 = dynamic(() => import("@/components/shadcn-studio/button/button-34"), { ssr: false })
const Button35 = dynamic(() => import("@/components/shadcn-studio/button/button-35"), { ssr: false })
const Button36 = dynamic(() => import("@/components/shadcn-studio/button/button-36"), { ssr: false })
const Button37 = dynamic(() => import("@/components/shadcn-studio/button/button-37"), { ssr: false })
const Button38 = dynamic(() => import("@/components/shadcn-studio/button/button-38"), { ssr: false })
const Button39 = dynamic(() => import("@/components/shadcn-studio/button/button-39"), { ssr: false })
const Button40 = dynamic(() => import("@/components/shadcn-studio/button/button-40"), { ssr: false })
const Button41 = dynamic(() => import("@/components/shadcn-studio/button/button-41"), { ssr: false })
const Button42 = dynamic(() => import("@/components/shadcn-studio/button/button-42"), { ssr: false })
const Button43 = dynamic(() => import("@/components/shadcn-studio/button/button-43"), { ssr: false })
const Button44 = dynamic(() => import("@/components/shadcn-studio/button/button-44"), { ssr: false })
const Button45 = dynamic(() => import("@/components/shadcn-studio/button/button-45"), { ssr: false })
const Button46 = dynamic(() => import("@/components/shadcn-studio/button/button-46"), { ssr: false })
const Button47 = dynamic(() => import("@/components/shadcn-studio/button/button-47"), { ssr: false })
const Button48 = dynamic(() => import("@/components/shadcn-studio/button/button-48"), { ssr: false })
const Button49 = dynamic(() => import("@/components/shadcn-studio/button/button-49"), { ssr: false })
const Button50 = dynamic(() => import("@/components/shadcn-studio/button/button-50"), { ssr: false })
const Button51 = dynamic(() => import("@/components/shadcn-studio/button/button-51"), { ssr: false })
const Button52 = dynamic(() => import("@/components/shadcn-studio/button/button-52"), { ssr: false })
const Button53 = dynamic(() => import("@/components/shadcn-studio/button/button-53"), { ssr: false })
const Button54 = dynamic(() => import("@/components/shadcn-studio/button/button-54"), { ssr: false })
const Button55 = dynamic(() => import("@/components/shadcn-studio/button/button-55"), { ssr: false })

const components = [
  { label: "Button 01", Component: Button01 },
  { label: "Button 02", Component: Button02 },
  { label: "Button 03", Component: Button03 },
  { label: "Button 04", Component: Button04 },
  { label: "Button 05", Component: Button05 },
  { label: "Button 06", Component: Button06 },
  { label: "Button 07", Component: Button07 },
  { label: "Button 08", Component: Button08 },
  { label: "Button 09", Component: Button09 },
  { label: "Button 10", Component: Button10 },
  { label: "Button 11", Component: Button11 },
  { label: "Button 12", Component: Button12 },
  { label: "Button 13", Component: Button13 },
  { label: "Button 14", Component: Button14 },
  { label: "Button 15", Component: Button15 },
  { label: "Button 16", Component: Button16 },
  { label: "Button 17", Component: Button17 },
  { label: "Button 18", Component: Button18 },
  { label: "Button 19", Component: Button19 },
  { label: "Button 20", Component: Button20 },
  { label: "Button 21", Component: Button21 },
  { label: "Button 22", Component: Button22 },
  { label: "Button 23", Component: Button23 },
  { label: "Button 24", Component: Button24 },
  { label: "Button 25", Component: Button25 },
  { label: "Button 26", Component: Button26 },
  { label: "Button 27", Component: Button27 },
  { label: "Button 28", Component: Button28 },
  { label: "Button 29", Component: Button29 },
  { label: "Button 30", Component: Button30 },
  { label: "Button 31", Component: Button31 },
  { label: "Button 32", Component: Button32 },
  { label: "Button 33", Component: Button33 },
  { label: "Button 34", Component: Button34 },
  { label: "Button 35", Component: Button35 },
  { label: "Button 36", Component: Button36 },
  { label: "Button 37", Component: Button37 },
  { label: "Button 38", Component: Button38 },
  { label: "Button 39", Component: Button39 },
  { label: "Button 40", Component: Button40 },
  { label: "Button 41", Component: Button41 },
  { label: "Button 42", Component: Button42 },
  { label: "Button 43", Component: Button43 },
  { label: "Button 44", Component: Button44 },
  { label: "Button 45", Component: Button45 },
  { label: "Button 46", Component: Button46 },
  { label: "Button 47", Component: Button47 },
  { label: "Button 48", Component: Button48 },
  { label: "Button 49", Component: Button49 },
  { label: "Button 50", Component: Button50 },
  { label: "Button 51", Component: Button51 },
  { label: "Button 52", Component: Button52 },
  { label: "Button 53", Component: Button53 },
  { label: "Button 54", Component: Button54 },
  { label: "Button 55", Component: Button55 },
]

export default function ButtonGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 55 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Button</h1>
        <p className="text-muted-foreground mt-1">Primary interactive element — 55 variants covering all CTA patterns</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/button/button-{01..55}"`}</code>
      </div>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {components.map(({ label, Component }) => (
          <div key={label} className="space-y-3">
            <p className="text-xs font-mono text-muted-foreground">{label}</p>
            <div className="rounded-xl border bg-card p-6 min-h-20 flex items-center justify-center">
              <div className="w-full">
                <Component />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
