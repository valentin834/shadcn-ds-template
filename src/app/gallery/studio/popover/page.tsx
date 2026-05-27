"use client"

import dynamic from 'next/dynamic'

const Popover01 = dynamic(() => import("@/components/shadcn-studio/popover/popover-01"), { ssr: false })
const Popover02 = dynamic(() => import("@/components/shadcn-studio/popover/popover-02"), { ssr: false })
const Popover03 = dynamic(() => import("@/components/shadcn-studio/popover/popover-03"), { ssr: false })
const Popover04 = dynamic(() => import("@/components/shadcn-studio/popover/popover-04"), { ssr: false })
const Popover05 = dynamic(() => import("@/components/shadcn-studio/popover/popover-05"), { ssr: false })
const Popover06 = dynamic(() => import("@/components/shadcn-studio/popover/popover-06"), { ssr: false })
const Popover07 = dynamic(() => import("@/components/shadcn-studio/popover/popover-07"), { ssr: false })
const Popover08 = dynamic(() => import("@/components/shadcn-studio/popover/popover-08"), { ssr: false })
const Popover09 = dynamic(() => import("@/components/shadcn-studio/popover/popover-09"), { ssr: false })
const Popover10 = dynamic(() => import("@/components/shadcn-studio/popover/popover-10"), { ssr: false })
const Popover11 = dynamic(() => import("@/components/shadcn-studio/popover/popover-11"), { ssr: false })
const Popover12 = dynamic(() => import("@/components/shadcn-studio/popover/popover-12"), { ssr: false })
const Popover13 = dynamic(() => import("@/components/shadcn-studio/popover/popover-13"), { ssr: false })
const Popover14 = dynamic(() => import("@/components/shadcn-studio/popover/popover-14"), { ssr: false })
const Popover15 = dynamic(() => import("@/components/shadcn-studio/popover/popover-15"), { ssr: false })

const components = [
  { label: "Popover 01", Component: Popover01 },
  { label: "Popover 02", Component: Popover02 },
  { label: "Popover 03", Component: Popover03 },
  { label: "Popover 04", Component: Popover04 },
  { label: "Popover 05", Component: Popover05 },
  { label: "Popover 06", Component: Popover06 },
  { label: "Popover 07", Component: Popover07 },
  { label: "Popover 08", Component: Popover08 },
  { label: "Popover 09", Component: Popover09 },
  { label: "Popover 10", Component: Popover10 },
  { label: "Popover 11", Component: Popover11 },
  { label: "Popover 12", Component: Popover12 },
  { label: "Popover 13", Component: Popover13 },
  { label: "Popover 14", Component: Popover14 },
  { label: "Popover 15", Component: Popover15 },
]

export default function PopoverGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 15 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Popover</h1>
        <p className="text-muted-foreground mt-1">Floating content panel — tooltips, inline forms, previews</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/popover/popover-{01..15}"`}</code>
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
