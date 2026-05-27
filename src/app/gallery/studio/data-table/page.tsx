"use client"

import dynamic from 'next/dynamic'

const DataTable01 = dynamic(() => import("@/components/shadcn-studio/data-table/data-table-01"), { ssr: false })
const DataTable02 = dynamic(() => import("@/components/shadcn-studio/data-table/data-table-02"), { ssr: false })
const DataTable03 = dynamic(() => import("@/components/shadcn-studio/data-table/data-table-03"), { ssr: false })
const DataTable04 = dynamic(() => import("@/components/shadcn-studio/data-table/data-table-04"), { ssr: false })
const DataTable05 = dynamic(() => import("@/components/shadcn-studio/data-table/data-table-05"), { ssr: false })
const DataTable06 = dynamic(() => import("@/components/shadcn-studio/data-table/data-table-06"), { ssr: false })
const DataTable07 = dynamic(() => import("@/components/shadcn-studio/data-table/data-table-07"), { ssr: false })
const DataTable08 = dynamic(() => import("@/components/shadcn-studio/data-table/data-table-08"), { ssr: false })
const DataTable09 = dynamic(() => import("@/components/shadcn-studio/data-table/data-table-09"), { ssr: false })
const DataTable10 = dynamic(() => import("@/components/shadcn-studio/data-table/data-table-10"), { ssr: false })
const DataTable11 = dynamic(() => import("@/components/shadcn-studio/data-table/data-table-11"), { ssr: false })
const DataTable12 = dynamic(() => import("@/components/shadcn-studio/data-table/data-table-12"), { ssr: false })
const DataTable13 = dynamic(() => import("@/components/shadcn-studio/data-table/data-table-13"), { ssr: false })

const components = [
  { label: "Data Table 01", Component: DataTable01 },
  { label: "Data Table 02", Component: DataTable02 },
  { label: "Data Table 03", Component: DataTable03 },
  { label: "Data Table 04", Component: DataTable04 },
  { label: "Data Table 05", Component: DataTable05 },
  { label: "Data Table 06", Component: DataTable06 },
  { label: "Data Table 07", Component: DataTable07 },
  { label: "Data Table 08", Component: DataTable08 },
  { label: "Data Table 09", Component: DataTable09 },
  { label: "Data Table 10", Component: DataTable10 },
  { label: "Data Table 11", Component: DataTable11 },
  { label: "Data Table 12", Component: DataTable12 },
  { label: "Data Table 13", Component: DataTable13 },
]

export default function DataTableGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 13 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Data Table</h1>
        <p className="text-muted-foreground mt-1">Full-featured table — sort, filter, pagination, row selection</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/data-table/data-table-{01..13}"`}</code>
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
