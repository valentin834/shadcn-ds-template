"use client"

import dynamic from 'next/dynamic'

const ButtonGroup01 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-01"), { ssr: false })
const ButtonGroup02 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-02"), { ssr: false })
const ButtonGroup03 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-03"), { ssr: false })
const ButtonGroup04 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-04"), { ssr: false })
const ButtonGroup05 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-05"), { ssr: false })
const ButtonGroup06 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-06"), { ssr: false })
const ButtonGroup07 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-07"), { ssr: false })
const ButtonGroup08 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-08"), { ssr: false })
const ButtonGroup09 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-09"), { ssr: false })
const ButtonGroup10 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-10"), { ssr: false })
const ButtonGroup11 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-11"), { ssr: false })
const ButtonGroup12 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-12"), { ssr: false })
const ButtonGroup13 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-13"), { ssr: false })
const ButtonGroup14 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-14"), { ssr: false })
const ButtonGroup15 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-15"), { ssr: false })
const ButtonGroup16 = dynamic(() => import("@/components/shadcn-studio/button-group/button-group-16"), { ssr: false })

const components = [
  { label: "Button Group 01", Component: ButtonGroup01 },
  { label: "Button Group 02", Component: ButtonGroup02 },
  { label: "Button Group 03", Component: ButtonGroup03 },
  { label: "Button Group 04", Component: ButtonGroup04 },
  { label: "Button Group 05", Component: ButtonGroup05 },
  { label: "Button Group 06", Component: ButtonGroup06 },
  { label: "Button Group 07", Component: ButtonGroup07 },
  { label: "Button Group 08", Component: ButtonGroup08 },
  { label: "Button Group 09", Component: ButtonGroup09 },
  { label: "Button Group 10", Component: ButtonGroup10 },
  { label: "Button Group 11", Component: ButtonGroup11 },
  { label: "Button Group 12", Component: ButtonGroup12 },
  { label: "Button Group 13", Component: ButtonGroup13 },
  { label: "Button Group 14", Component: ButtonGroup14 },
  { label: "Button Group 15", Component: ButtonGroup15 },
  { label: "Button Group 16", Component: ButtonGroup16 },
]

export default function ButtonGroupGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 16 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Button Group</h1>
        <p className="text-muted-foreground mt-1">Grouped action buttons — toolbars, segmented controls</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/button-group/button-group-{01..16}"`}</code>
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
