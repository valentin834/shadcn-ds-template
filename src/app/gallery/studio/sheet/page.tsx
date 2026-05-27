"use client"

import dynamic from 'next/dynamic'

const Sheet1 = dynamic(() => import("@/components/shadcn-studio/sheet/sheet-01"), { ssr: false })
const Sheet2 = dynamic(() => import("@/components/shadcn-studio/sheet/sheet-02"), { ssr: false })
const Sheet3 = dynamic(() => import("@/components/shadcn-studio/sheet/sheet-03"), { ssr: false })
const Sheet4 = dynamic(() => import("@/components/shadcn-studio/sheet/sheet-04"), { ssr: false })
const Sheet5 = dynamic(() => import("@/components/shadcn-studio/sheet/sheet-05"), { ssr: false })
const Sheet6 = dynamic(() => import("@/components/shadcn-studio/sheet/sheet-06"), { ssr: false })
const Sheet7 = dynamic(() => import("@/components/shadcn-studio/sheet/sheet-07"), { ssr: false })

const components = [
  { label: "Sheet 1", Component: Sheet1 },
  { label: "Sheet 2", Component: Sheet2 },
  { label: "Sheet 3", Component: Sheet3 },
  { label: "Sheet 4", Component: Sheet4 },
  { label: "Sheet 5", Component: Sheet5 },
  { label: "Sheet 6", Component: Sheet6 },
  { label: "Sheet 7", Component: Sheet7 },
]

export default function SheetGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 7 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Sheet</h1>
        <p className="text-muted-foreground mt-1">Side panel drawer — detail view, filters, secondary navigation</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/sheet/sheet-{01..7}"`}</code>
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
