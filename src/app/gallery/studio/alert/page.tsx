"use client"

import dynamic from 'next/dynamic'

const Alert01 = dynamic(() => import("@/components/shadcn-studio/alert/alert-01"), { ssr: false })
const Alert02 = dynamic(() => import("@/components/shadcn-studio/alert/alert-02"), { ssr: false })
const Alert03 = dynamic(() => import("@/components/shadcn-studio/alert/alert-03"), { ssr: false })
const Alert04 = dynamic(() => import("@/components/shadcn-studio/alert/alert-04"), { ssr: false })
const Alert05 = dynamic(() => import("@/components/shadcn-studio/alert/alert-05"), { ssr: false })
const Alert06 = dynamic(() => import("@/components/shadcn-studio/alert/alert-06"), { ssr: false })
const Alert07 = dynamic(() => import("@/components/shadcn-studio/alert/alert-07"), { ssr: false })
const Alert08 = dynamic(() => import("@/components/shadcn-studio/alert/alert-08"), { ssr: false })
const Alert09 = dynamic(() => import("@/components/shadcn-studio/alert/alert-09"), { ssr: false })
const Alert10 = dynamic(() => import("@/components/shadcn-studio/alert/alert-10"), { ssr: false })
const Alert11 = dynamic(() => import("@/components/shadcn-studio/alert/alert-11"), { ssr: false })
const Alert12 = dynamic(() => import("@/components/shadcn-studio/alert/alert-12"), { ssr: false })
const Alert13 = dynamic(() => import("@/components/shadcn-studio/alert/alert-13"), { ssr: false })
const Alert14 = dynamic(() => import("@/components/shadcn-studio/alert/alert-14"), { ssr: false })
const Alert15 = dynamic(() => import("@/components/shadcn-studio/alert/alert-15"), { ssr: false })
const Alert16 = dynamic(() => import("@/components/shadcn-studio/alert/alert-16"), { ssr: false })
const Alert17 = dynamic(() => import("@/components/shadcn-studio/alert/alert-17"), { ssr: false })
const Alert18 = dynamic(() => import("@/components/shadcn-studio/alert/alert-18"), { ssr: false })
const Alert19 = dynamic(() => import("@/components/shadcn-studio/alert/alert-19"), { ssr: false })
const Alert20 = dynamic(() => import("@/components/shadcn-studio/alert/alert-20"), { ssr: false })
const Alert21 = dynamic(() => import("@/components/shadcn-studio/alert/alert-21"), { ssr: false })
const Alert22 = dynamic(() => import("@/components/shadcn-studio/alert/alert-22"), { ssr: false })
const Alert23 = dynamic(() => import("@/components/shadcn-studio/alert/alert-23"), { ssr: false })
const Alert24 = dynamic(() => import("@/components/shadcn-studio/alert/alert-24"), { ssr: false })
const Alert25 = dynamic(() => import("@/components/shadcn-studio/alert/alert-25"), { ssr: false })
const Alert26 = dynamic(() => import("@/components/shadcn-studio/alert/alert-26"), { ssr: false })
const Alert27 = dynamic(() => import("@/components/shadcn-studio/alert/alert-27"), { ssr: false })
const Alert28 = dynamic(() => import("@/components/shadcn-studio/alert/alert-28"), { ssr: false })
const Alert29 = dynamic(() => import("@/components/shadcn-studio/alert/alert-29"), { ssr: false })
const Alert30 = dynamic(() => import("@/components/shadcn-studio/alert/alert-30"), { ssr: false })

const components = [
  { label: "Alert 01", Component: Alert01 },
  { label: "Alert 02", Component: Alert02 },
  { label: "Alert 03", Component: Alert03 },
  { label: "Alert 04", Component: Alert04 },
  { label: "Alert 05", Component: Alert05 },
  { label: "Alert 06", Component: Alert06 },
  { label: "Alert 07", Component: Alert07 },
  { label: "Alert 08", Component: Alert08 },
  { label: "Alert 09", Component: Alert09 },
  { label: "Alert 10", Component: Alert10 },
  { label: "Alert 11", Component: Alert11 },
  { label: "Alert 12", Component: Alert12 },
  { label: "Alert 13", Component: Alert13 },
  { label: "Alert 14", Component: Alert14 },
  { label: "Alert 15", Component: Alert15 },
  { label: "Alert 16", Component: Alert16 },
  { label: "Alert 17", Component: Alert17 },
  { label: "Alert 18", Component: Alert18 },
  { label: "Alert 19", Component: Alert19 },
  { label: "Alert 20", Component: Alert20 },
  { label: "Alert 21", Component: Alert21 },
  { label: "Alert 22", Component: Alert22 },
  { label: "Alert 23", Component: Alert23 },
  { label: "Alert 24", Component: Alert24 },
  { label: "Alert 25", Component: Alert25 },
  { label: "Alert 26", Component: Alert26 },
  { label: "Alert 27", Component: Alert27 },
  { label: "Alert 28", Component: Alert28 },
  { label: "Alert 29", Component: Alert29 },
  { label: "Alert 30", Component: Alert30 },
]

export default function AlertGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 30 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Alert</h1>
        <p className="text-muted-foreground mt-1">Inline feedback messages — info, success, warning, error banners</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/alert/alert-{01..30}"`}</code>
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
