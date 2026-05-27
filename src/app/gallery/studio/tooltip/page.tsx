"use client"

import dynamic from 'next/dynamic'

const Tooltip01 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-01"), { ssr: false })
const Tooltip02 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-02"), { ssr: false })
const Tooltip03 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-03"), { ssr: false })
const Tooltip04 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-04"), { ssr: false })
const Tooltip05 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-05"), { ssr: false })
const Tooltip06 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-06"), { ssr: false })
const Tooltip07 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-07"), { ssr: false })
const Tooltip08 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-08"), { ssr: false })
const Tooltip09 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-09"), { ssr: false })
const Tooltip10 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-10"), { ssr: false })
const Tooltip11 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-11"), { ssr: false })
const Tooltip12 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-12"), { ssr: false })
const Tooltip13 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-13"), { ssr: false })
const Tooltip14 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-14"), { ssr: false })
const Tooltip15 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-15"), { ssr: false })
const Tooltip16 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-16"), { ssr: false })
const Tooltip17 = dynamic(() => import("@/components/shadcn-studio/tooltip/tooltip-17"), { ssr: false })

const components = [
  { label: "Tooltip 01", Component: Tooltip01 },
  { label: "Tooltip 02", Component: Tooltip02 },
  { label: "Tooltip 03", Component: Tooltip03 },
  { label: "Tooltip 04", Component: Tooltip04 },
  { label: "Tooltip 05", Component: Tooltip05 },
  { label: "Tooltip 06", Component: Tooltip06 },
  { label: "Tooltip 07", Component: Tooltip07 },
  { label: "Tooltip 08", Component: Tooltip08 },
  { label: "Tooltip 09", Component: Tooltip09 },
  { label: "Tooltip 10", Component: Tooltip10 },
  { label: "Tooltip 11", Component: Tooltip11 },
  { label: "Tooltip 12", Component: Tooltip12 },
  { label: "Tooltip 13", Component: Tooltip13 },
  { label: "Tooltip 14", Component: Tooltip14 },
  { label: "Tooltip 15", Component: Tooltip15 },
  { label: "Tooltip 16", Component: Tooltip16 },
  { label: "Tooltip 17", Component: Tooltip17 },
]

export default function TooltipGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 17 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Tooltip</h1>
        <p className="text-muted-foreground mt-1">Hover hint — labels, descriptions, keyboard shortcuts</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/tooltip/tooltip-{01..17}"`}</code>
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
