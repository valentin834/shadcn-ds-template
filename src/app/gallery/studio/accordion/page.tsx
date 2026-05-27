"use client"

import dynamic from 'next/dynamic'

const Accordion01 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-01"), { ssr: false })
const Accordion02 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-02"), { ssr: false })
const Accordion03 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-03"), { ssr: false })
const Accordion04 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-04"), { ssr: false })
const Accordion05 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-05"), { ssr: false })
const Accordion06 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-06"), { ssr: false })
const Accordion07 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-07"), { ssr: false })
const Accordion08 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-08"), { ssr: false })
const Accordion09 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-09"), { ssr: false })
const Accordion10 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-10"), { ssr: false })
const Accordion11 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-11"), { ssr: false })
const Accordion12 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-12"), { ssr: false })
const Accordion13 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-13"), { ssr: false })
const Accordion14 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-14"), { ssr: false })
const Accordion15 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-15"), { ssr: false })
const Accordion16 = dynamic(() => import("@/components/shadcn-studio/accordion/accordion-16"), { ssr: false })

const components = [
  { label: "Accordion 01", Component: Accordion01 },
  { label: "Accordion 02", Component: Accordion02 },
  { label: "Accordion 03", Component: Accordion03 },
  { label: "Accordion 04", Component: Accordion04 },
  { label: "Accordion 05", Component: Accordion05 },
  { label: "Accordion 06", Component: Accordion06 },
  { label: "Accordion 07", Component: Accordion07 },
  { label: "Accordion 08", Component: Accordion08 },
  { label: "Accordion 09", Component: Accordion09 },
  { label: "Accordion 10", Component: Accordion10 },
  { label: "Accordion 11", Component: Accordion11 },
  { label: "Accordion 12", Component: Accordion12 },
  { label: "Accordion 13", Component: Accordion13 },
  { label: "Accordion 14", Component: Accordion14 },
  { label: "Accordion 15", Component: Accordion15 },
  { label: "Accordion 16", Component: Accordion16 },
]

export default function AccordionGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 16 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Accordion</h1>
        <p className="text-muted-foreground mt-1">Collapsible sections — FAQ, nested content, expandable panels</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/accordion/accordion-{01..16}"`}</code>
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
