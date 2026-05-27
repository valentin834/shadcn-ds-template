"use client"

import dynamic from 'next/dynamic'

const RadioGroup01 = dynamic(() => import("@/components/shadcn-studio/radio-group/radio-group-01"), { ssr: false })
const RadioGroup02 = dynamic(() => import("@/components/shadcn-studio/radio-group/radio-group-02"), { ssr: false })
const RadioGroup03 = dynamic(() => import("@/components/shadcn-studio/radio-group/radio-group-03"), { ssr: false })
const RadioGroup04 = dynamic(() => import("@/components/shadcn-studio/radio-group/radio-group-04"), { ssr: false })
const RadioGroup05 = dynamic(() => import("@/components/shadcn-studio/radio-group/radio-group-05"), { ssr: false })
const RadioGroup06 = dynamic(() => import("@/components/shadcn-studio/radio-group/radio-group-06"), { ssr: false })
const RadioGroup07 = dynamic(() => import("@/components/shadcn-studio/radio-group/radio-group-07"), { ssr: false })
const RadioGroup08 = dynamic(() => import("@/components/shadcn-studio/radio-group/radio-group-08"), { ssr: false })
const RadioGroup09 = dynamic(() => import("@/components/shadcn-studio/radio-group/radio-group-09"), { ssr: false })
const RadioGroup10 = dynamic(() => import("@/components/shadcn-studio/radio-group/radio-group-10"), { ssr: false })
const RadioGroup11 = dynamic(() => import("@/components/shadcn-studio/radio-group/radio-group-11"), { ssr: false })
const RadioGroup12 = dynamic(() => import("@/components/shadcn-studio/radio-group/radio-group-12"), { ssr: false })
const RadioGroup13 = dynamic(() => import("@/components/shadcn-studio/radio-group/radio-group-13"), { ssr: false })
const RadioGroup14 = dynamic(() => import("@/components/shadcn-studio/radio-group/radio-group-14"), { ssr: false })
const RadioGroup15 = dynamic(() => import("@/components/shadcn-studio/radio-group/radio-group-15"), { ssr: false })

const components = [
  { label: "Radio Group 01", Component: RadioGroup01 },
  { label: "Radio Group 02", Component: RadioGroup02 },
  { label: "Radio Group 03", Component: RadioGroup03 },
  { label: "Radio Group 04", Component: RadioGroup04 },
  { label: "Radio Group 05", Component: RadioGroup05 },
  { label: "Radio Group 06", Component: RadioGroup06 },
  { label: "Radio Group 07", Component: RadioGroup07 },
  { label: "Radio Group 08", Component: RadioGroup08 },
  { label: "Radio Group 09", Component: RadioGroup09 },
  { label: "Radio Group 10", Component: RadioGroup10 },
  { label: "Radio Group 11", Component: RadioGroup11 },
  { label: "Radio Group 12", Component: RadioGroup12 },
  { label: "Radio Group 13", Component: RadioGroup13 },
  { label: "Radio Group 14", Component: RadioGroup14 },
  { label: "Radio Group 15", Component: RadioGroup15 },
]

export default function RadioGroupGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 15 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Radio Group</h1>
        <p className="text-muted-foreground mt-1">Single choice from a set — plan selection, configuration</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/radio-group/radio-group-{01..15}"`}</code>
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
