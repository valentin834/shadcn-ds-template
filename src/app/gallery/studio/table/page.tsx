"use client"

import dynamic from 'next/dynamic'

const Table01 = dynamic(() => import("@/components/shadcn-studio/table/table-01"), { ssr: false })
const Table02 = dynamic(() => import("@/components/shadcn-studio/table/table-02"), { ssr: false })
const Table03 = dynamic(() => import("@/components/shadcn-studio/table/table-03"), { ssr: false })
const Table04 = dynamic(() => import("@/components/shadcn-studio/table/table-04"), { ssr: false })
const Table05 = dynamic(() => import("@/components/shadcn-studio/table/table-05"), { ssr: false })
const Table06 = dynamic(() => import("@/components/shadcn-studio/table/table-06"), { ssr: false })
const Table07 = dynamic(() => import("@/components/shadcn-studio/table/table-07"), { ssr: false })
const Table08 = dynamic(() => import("@/components/shadcn-studio/table/table-08"), { ssr: false })
const Table09 = dynamic(() => import("@/components/shadcn-studio/table/table-09"), { ssr: false })
const Table10 = dynamic(() => import("@/components/shadcn-studio/table/table-10"), { ssr: false })
const Table11 = dynamic(() => import("@/components/shadcn-studio/table/table-11"), { ssr: false })
const Table12 = dynamic(() => import("@/components/shadcn-studio/table/table-12"), { ssr: false })
const Table13 = dynamic(() => import("@/components/shadcn-studio/table/table-13"), { ssr: false })
const Table14 = dynamic(() => import("@/components/shadcn-studio/table/table-14"), { ssr: false })
const Table15 = dynamic(() => import("@/components/shadcn-studio/table/table-15"), { ssr: false })
const Table16 = dynamic(() => import("@/components/shadcn-studio/table/table-16"), { ssr: false })

const components = [
  { label: "Table 01", Component: Table01 },
  { label: "Table 02", Component: Table02 },
  { label: "Table 03", Component: Table03 },
  { label: "Table 04", Component: Table04 },
  { label: "Table 05", Component: Table05 },
  { label: "Table 06", Component: Table06 },
  { label: "Table 07", Component: Table07 },
  { label: "Table 08", Component: Table08 },
  { label: "Table 09", Component: Table09 },
  { label: "Table 10", Component: Table10 },
  { label: "Table 11", Component: Table11 },
  { label: "Table 12", Component: Table12 },
  { label: "Table 13", Component: Table13 },
  { label: "Table 14", Component: Table14 },
  { label: "Table 15", Component: Table15 },
  { label: "Table 16", Component: Table16 },
]

export default function TableGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 16 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Table</h1>
        <p className="text-muted-foreground mt-1">Data display — 16 layouts from simple lists to complex grids</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/table/table-{01..16}"`}</code>
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
