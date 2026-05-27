"use client"

import dynamic from 'next/dynamic'

const Badge01 = dynamic(() => import("@/components/shadcn-studio/badge/badge-01"), { ssr: false })
const Badge02 = dynamic(() => import("@/components/shadcn-studio/badge/badge-02"), { ssr: false })
const Badge03 = dynamic(() => import("@/components/shadcn-studio/badge/badge-03"), { ssr: false })
const Badge04 = dynamic(() => import("@/components/shadcn-studio/badge/badge-04"), { ssr: false })
const Badge05 = dynamic(() => import("@/components/shadcn-studio/badge/badge-05"), { ssr: false })
const Badge06 = dynamic(() => import("@/components/shadcn-studio/badge/badge-06"), { ssr: false })
const Badge07 = dynamic(() => import("@/components/shadcn-studio/badge/badge-07"), { ssr: false })
const Badge08 = dynamic(() => import("@/components/shadcn-studio/badge/badge-08"), { ssr: false })
const Badge09 = dynamic(() => import("@/components/shadcn-studio/badge/badge-09"), { ssr: false })
const Badge10 = dynamic(() => import("@/components/shadcn-studio/badge/badge-10"), { ssr: false })
const Badge11 = dynamic(() => import("@/components/shadcn-studio/badge/badge-11"), { ssr: false })
const Badge12 = dynamic(() => import("@/components/shadcn-studio/badge/badge-12"), { ssr: false })
const Badge13 = dynamic(() => import("@/components/shadcn-studio/badge/badge-13"), { ssr: false })
const Badge14 = dynamic(() => import("@/components/shadcn-studio/badge/badge-14"), { ssr: false })
const Badge15 = dynamic(() => import("@/components/shadcn-studio/badge/badge-15"), { ssr: false })
const Badge16 = dynamic(() => import("@/components/shadcn-studio/badge/badge-16"), { ssr: false })
const Badge17 = dynamic(() => import("@/components/shadcn-studio/badge/badge-17"), { ssr: false })
const Badge18 = dynamic(() => import("@/components/shadcn-studio/badge/badge-18"), { ssr: false })
const Badge19 = dynamic(() => import("@/components/shadcn-studio/badge/badge-19"), { ssr: false })
const Badge20 = dynamic(() => import("@/components/shadcn-studio/badge/badge-20"), { ssr: false })
const Badge21 = dynamic(() => import("@/components/shadcn-studio/badge/badge-21"), { ssr: false })
const Badge22 = dynamic(() => import("@/components/shadcn-studio/badge/badge-22"), { ssr: false })
const Badge23 = dynamic(() => import("@/components/shadcn-studio/badge/badge-23"), { ssr: false })
const Badge24 = dynamic(() => import("@/components/shadcn-studio/badge/badge-24"), { ssr: false })

const components = [
  { label: "Badge 01", Component: Badge01 },
  { label: "Badge 02", Component: Badge02 },
  { label: "Badge 03", Component: Badge03 },
  { label: "Badge 04", Component: Badge04 },
  { label: "Badge 05", Component: Badge05 },
  { label: "Badge 06", Component: Badge06 },
  { label: "Badge 07", Component: Badge07 },
  { label: "Badge 08", Component: Badge08 },
  { label: "Badge 09", Component: Badge09 },
  { label: "Badge 10", Component: Badge10 },
  { label: "Badge 11", Component: Badge11 },
  { label: "Badge 12", Component: Badge12 },
  { label: "Badge 13", Component: Badge13 },
  { label: "Badge 14", Component: Badge14 },
  { label: "Badge 15", Component: Badge15 },
  { label: "Badge 16", Component: Badge16 },
  { label: "Badge 17", Component: Badge17 },
  { label: "Badge 18", Component: Badge18 },
  { label: "Badge 19", Component: Badge19 },
  { label: "Badge 20", Component: Badge20 },
  { label: "Badge 21", Component: Badge21 },
  { label: "Badge 22", Component: Badge22 },
  { label: "Badge 23", Component: Badge23 },
  { label: "Badge 24", Component: Badge24 },
]

export default function BadgeGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 24 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Badge</h1>
        <p className="text-muted-foreground mt-1">Status chips, labels, counters — categories, states, notifications</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/badge/badge-{01..24}"`}</code>
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
