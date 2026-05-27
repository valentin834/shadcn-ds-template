"use client"

import dynamic from 'next/dynamic'

const Collapsible01 = dynamic(() => import("@/components/shadcn-studio/collapsible/collapsible-01"), { ssr: false })
const Collapsible02 = dynamic(() => import("@/components/shadcn-studio/collapsible/collapsible-02"), { ssr: false })
const Collapsible03 = dynamic(() => import("@/components/shadcn-studio/collapsible/collapsible-03"), { ssr: false })
const Collapsible04 = dynamic(() => import("@/components/shadcn-studio/collapsible/collapsible-04"), { ssr: false })
const Collapsible05 = dynamic(() => import("@/components/shadcn-studio/collapsible/collapsible-05"), { ssr: false })
const Collapsible06 = dynamic(() => import("@/components/shadcn-studio/collapsible/collapsible-06"), { ssr: false })
const Collapsible07 = dynamic(() => import("@/components/shadcn-studio/collapsible/collapsible-07"), { ssr: false })
const Collapsible08 = dynamic(() => import("@/components/shadcn-studio/collapsible/collapsible-08"), { ssr: false })
const Collapsible09 = dynamic(() => import("@/components/shadcn-studio/collapsible/collapsible-09"), { ssr: false })
const Collapsible10 = dynamic(() => import("@/components/shadcn-studio/collapsible/collapsible-10"), { ssr: false })

const components = [
  { label: "Collapsible 01", Component: Collapsible01 },
  { label: "Collapsible 02", Component: Collapsible02 },
  { label: "Collapsible 03", Component: Collapsible03 },
  { label: "Collapsible 04", Component: Collapsible04 },
  { label: "Collapsible 05", Component: Collapsible05 },
  { label: "Collapsible 06", Component: Collapsible06 },
  { label: "Collapsible 07", Component: Collapsible07 },
  { label: "Collapsible 08", Component: Collapsible08 },
  { label: "Collapsible 09", Component: Collapsible09 },
  { label: "Collapsible 10", Component: Collapsible10 },
]

export default function CollapsibleGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 10 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Collapsible</h1>
        <p className="text-muted-foreground mt-1">Single expandable section — simpler than accordion</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/collapsible/collapsible-{01..10}"`}</code>
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
