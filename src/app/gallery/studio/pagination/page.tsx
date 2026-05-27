"use client"

import dynamic from 'next/dynamic'

const Pagination01 = dynamic(() => import("@/components/shadcn-studio/pagination/pagination-01"), { ssr: false })
const Pagination02 = dynamic(() => import("@/components/shadcn-studio/pagination/pagination-02"), { ssr: false })
const Pagination03 = dynamic(() => import("@/components/shadcn-studio/pagination/pagination-03"), { ssr: false })
const Pagination04 = dynamic(() => import("@/components/shadcn-studio/pagination/pagination-04"), { ssr: false })
const Pagination05 = dynamic(() => import("@/components/shadcn-studio/pagination/pagination-05"), { ssr: false })
const Pagination06 = dynamic(() => import("@/components/shadcn-studio/pagination/pagination-06"), { ssr: false })
const Pagination07 = dynamic(() => import("@/components/shadcn-studio/pagination/pagination-07"), { ssr: false })
const Pagination08 = dynamic(() => import("@/components/shadcn-studio/pagination/pagination-08"), { ssr: false })
const Pagination09 = dynamic(() => import("@/components/shadcn-studio/pagination/pagination-09"), { ssr: false })
const Pagination10 = dynamic(() => import("@/components/shadcn-studio/pagination/pagination-10"), { ssr: false })
const Pagination11 = dynamic(() => import("@/components/shadcn-studio/pagination/pagination-11"), { ssr: false })
const Pagination12 = dynamic(() => import("@/components/shadcn-studio/pagination/pagination-12"), { ssr: false })
const Pagination13 = dynamic(() => import("@/components/shadcn-studio/pagination/pagination-13"), { ssr: false })
const Pagination14 = dynamic(() => import("@/components/shadcn-studio/pagination/pagination-14"), { ssr: false })
const Pagination15 = dynamic(() => import("@/components/shadcn-studio/pagination/pagination-15"), { ssr: false })

const components = [
  { label: "Pagination 01", Component: Pagination01 },
  { label: "Pagination 02", Component: Pagination02 },
  { label: "Pagination 03", Component: Pagination03 },
  { label: "Pagination 04", Component: Pagination04 },
  { label: "Pagination 05", Component: Pagination05 },
  { label: "Pagination 06", Component: Pagination06 },
  { label: "Pagination 07", Component: Pagination07 },
  { label: "Pagination 08", Component: Pagination08 },
  { label: "Pagination 09", Component: Pagination09 },
  { label: "Pagination 10", Component: Pagination10 },
  { label: "Pagination 11", Component: Pagination11 },
  { label: "Pagination 12", Component: Pagination12 },
  { label: "Pagination 13", Component: Pagination13 },
  { label: "Pagination 14", Component: Pagination14 },
  { label: "Pagination 15", Component: Pagination15 },
]

export default function PaginationGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 15 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Pagination</h1>
        <p className="text-muted-foreground mt-1">Page navigation for long lists and tables</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/pagination/pagination-{01..15}"`}</code>
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
