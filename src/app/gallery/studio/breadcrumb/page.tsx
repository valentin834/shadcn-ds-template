"use client"

import dynamic from 'next/dynamic'

const Breadcrumb1 = dynamic(() => import("@/components/shadcn-studio/breadcrumb/breadcrumb-01"), { ssr: false })
const Breadcrumb2 = dynamic(() => import("@/components/shadcn-studio/breadcrumb/breadcrumb-02"), { ssr: false })
const Breadcrumb3 = dynamic(() => import("@/components/shadcn-studio/breadcrumb/breadcrumb-03"), { ssr: false })
const Breadcrumb4 = dynamic(() => import("@/components/shadcn-studio/breadcrumb/breadcrumb-04"), { ssr: false })
const Breadcrumb5 = dynamic(() => import("@/components/shadcn-studio/breadcrumb/breadcrumb-05"), { ssr: false })
const Breadcrumb6 = dynamic(() => import("@/components/shadcn-studio/breadcrumb/breadcrumb-06"), { ssr: false })
const Breadcrumb7 = dynamic(() => import("@/components/shadcn-studio/breadcrumb/breadcrumb-07"), { ssr: false })
const Breadcrumb8 = dynamic(() => import("@/components/shadcn-studio/breadcrumb/breadcrumb-08"), { ssr: false })

const components = [
  { label: "Breadcrumb 1", Component: Breadcrumb1 },
  { label: "Breadcrumb 2", Component: Breadcrumb2 },
  { label: "Breadcrumb 3", Component: Breadcrumb3 },
  { label: "Breadcrumb 4", Component: Breadcrumb4 },
  { label: "Breadcrumb 5", Component: Breadcrumb5 },
  { label: "Breadcrumb 6", Component: Breadcrumb6 },
  { label: "Breadcrumb 7", Component: Breadcrumb7 },
  { label: "Breadcrumb 8", Component: Breadcrumb8 },
]

export default function BreadcrumbGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 8 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Breadcrumb</h1>
        <p className="text-muted-foreground mt-1">Page hierarchy navigation trail</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/breadcrumb/breadcrumb-{01..8}"`}</code>
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
