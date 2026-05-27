"use client"

import dynamic from 'next/dynamic'

const Input01 = dynamic(() => import("@/components/shadcn-studio/input/input-01"), { ssr: false })
const Input02 = dynamic(() => import("@/components/shadcn-studio/input/input-02"), { ssr: false })
const Input03 = dynamic(() => import("@/components/shadcn-studio/input/input-03"), { ssr: false })
const Input04 = dynamic(() => import("@/components/shadcn-studio/input/input-04"), { ssr: false })
const Input05 = dynamic(() => import("@/components/shadcn-studio/input/input-05"), { ssr: false })
const Input06 = dynamic(() => import("@/components/shadcn-studio/input/input-06"), { ssr: false })
const Input07 = dynamic(() => import("@/components/shadcn-studio/input/input-07"), { ssr: false })
const Input08 = dynamic(() => import("@/components/shadcn-studio/input/input-08"), { ssr: false })
const Input09 = dynamic(() => import("@/components/shadcn-studio/input/input-09"), { ssr: false })
const Input10 = dynamic(() => import("@/components/shadcn-studio/input/input-10"), { ssr: false })
const Input11 = dynamic(() => import("@/components/shadcn-studio/input/input-11"), { ssr: false })
const Input12 = dynamic(() => import("@/components/shadcn-studio/input/input-12"), { ssr: false })
const Input13 = dynamic(() => import("@/components/shadcn-studio/input/input-13"), { ssr: false })
const Input14 = dynamic(() => import("@/components/shadcn-studio/input/input-14"), { ssr: false })
const Input15 = dynamic(() => import("@/components/shadcn-studio/input/input-15"), { ssr: false })
const Input16 = dynamic(() => import("@/components/shadcn-studio/input/input-16"), { ssr: false })
const Input17 = dynamic(() => import("@/components/shadcn-studio/input/input-17"), { ssr: false })
const Input18 = dynamic(() => import("@/components/shadcn-studio/input/input-18"), { ssr: false })
const Input19 = dynamic(() => import("@/components/shadcn-studio/input/input-19"), { ssr: false })
const Input20 = dynamic(() => import("@/components/shadcn-studio/input/input-20"), { ssr: false })
const Input21 = dynamic(() => import("@/components/shadcn-studio/input/input-21"), { ssr: false })
const Input22 = dynamic(() => import("@/components/shadcn-studio/input/input-22"), { ssr: false })
const Input23 = dynamic(() => import("@/components/shadcn-studio/input/input-23"), { ssr: false })
const Input24 = dynamic(() => import("@/components/shadcn-studio/input/input-24"), { ssr: false })
const Input25 = dynamic(() => import("@/components/shadcn-studio/input/input-25"), { ssr: false })
const Input26 = dynamic(() => import("@/components/shadcn-studio/input/input-26"), { ssr: false })
const Input27 = dynamic(() => import("@/components/shadcn-studio/input/input-27"), { ssr: false })
const Input28 = dynamic(() => import("@/components/shadcn-studio/input/input-28"), { ssr: false })
const Input29 = dynamic(() => import("@/components/shadcn-studio/input/input-29"), { ssr: false })
const Input30 = dynamic(() => import("@/components/shadcn-studio/input/input-30"), { ssr: false })
const Input31 = dynamic(() => import("@/components/shadcn-studio/input/input-31"), { ssr: false })
const Input32 = dynamic(() => import("@/components/shadcn-studio/input/input-32"), { ssr: false })
const Input33 = dynamic(() => import("@/components/shadcn-studio/input/input-33"), { ssr: false })
const Input34 = dynamic(() => import("@/components/shadcn-studio/input/input-34"), { ssr: false })
const Input35 = dynamic(() => import("@/components/shadcn-studio/input/input-35"), { ssr: false })
const Input36 = dynamic(() => import("@/components/shadcn-studio/input/input-36"), { ssr: false })
const Input37 = dynamic(() => import("@/components/shadcn-studio/input/input-37"), { ssr: false })
const Input38 = dynamic(() => import("@/components/shadcn-studio/input/input-38"), { ssr: false })
const Input39 = dynamic(() => import("@/components/shadcn-studio/input/input-39"), { ssr: false })
const Input40 = dynamic(() => import("@/components/shadcn-studio/input/input-40"), { ssr: false })
const Input41 = dynamic(() => import("@/components/shadcn-studio/input/input-41"), { ssr: false })
const Input42 = dynamic(() => import("@/components/shadcn-studio/input/input-42"), { ssr: false })
const Input43 = dynamic(() => import("@/components/shadcn-studio/input/input-43"), { ssr: false })
const Input44 = dynamic(() => import("@/components/shadcn-studio/input/input-44"), { ssr: false })
const Input45 = dynamic(() => import("@/components/shadcn-studio/input/input-45"), { ssr: false })
const Input46 = dynamic(() => import("@/components/shadcn-studio/input/input-46"), { ssr: false })

const components = [
  { label: "Input 01", Component: Input01 },
  { label: "Input 02", Component: Input02 },
  { label: "Input 03", Component: Input03 },
  { label: "Input 04", Component: Input04 },
  { label: "Input 05", Component: Input05 },
  { label: "Input 06", Component: Input06 },
  { label: "Input 07", Component: Input07 },
  { label: "Input 08", Component: Input08 },
  { label: "Input 09", Component: Input09 },
  { label: "Input 10", Component: Input10 },
  { label: "Input 11", Component: Input11 },
  { label: "Input 12", Component: Input12 },
  { label: "Input 13", Component: Input13 },
  { label: "Input 14", Component: Input14 },
  { label: "Input 15", Component: Input15 },
  { label: "Input 16", Component: Input16 },
  { label: "Input 17", Component: Input17 },
  { label: "Input 18", Component: Input18 },
  { label: "Input 19", Component: Input19 },
  { label: "Input 20", Component: Input20 },
  { label: "Input 21", Component: Input21 },
  { label: "Input 22", Component: Input22 },
  { label: "Input 23", Component: Input23 },
  { label: "Input 24", Component: Input24 },
  { label: "Input 25", Component: Input25 },
  { label: "Input 26", Component: Input26 },
  { label: "Input 27", Component: Input27 },
  { label: "Input 28", Component: Input28 },
  { label: "Input 29", Component: Input29 },
  { label: "Input 30", Component: Input30 },
  { label: "Input 31", Component: Input31 },
  { label: "Input 32", Component: Input32 },
  { label: "Input 33", Component: Input33 },
  { label: "Input 34", Component: Input34 },
  { label: "Input 35", Component: Input35 },
  { label: "Input 36", Component: Input36 },
  { label: "Input 37", Component: Input37 },
  { label: "Input 38", Component: Input38 },
  { label: "Input 39", Component: Input39 },
  { label: "Input 40", Component: Input40 },
  { label: "Input 41", Component: Input41 },
  { label: "Input 42", Component: Input42 },
  { label: "Input 43", Component: Input43 },
  { label: "Input 44", Component: Input44 },
  { label: "Input 45", Component: Input45 },
  { label: "Input 46", Component: Input46 },
]

export default function InputGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 46 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Input</h1>
        <p className="text-muted-foreground mt-1">Text entry — 46 variants covering all input patterns and addons</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/input/input-{01..46}"`}</code>
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
