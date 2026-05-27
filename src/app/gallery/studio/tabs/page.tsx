"use client"

import dynamic from 'next/dynamic'

const Tabs01 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-01"), { ssr: false })
const Tabs02 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-02"), { ssr: false })
const Tabs03 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-03"), { ssr: false })
const Tabs04 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-04"), { ssr: false })
const Tabs05 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-05"), { ssr: false })
const Tabs06 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-06"), { ssr: false })
const Tabs07 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-07"), { ssr: false })
const Tabs08 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-08"), { ssr: false })
const Tabs09 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-09"), { ssr: false })
const Tabs10 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-10"), { ssr: false })
const Tabs11 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-11"), { ssr: false })
const Tabs12 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-12"), { ssr: false })
const Tabs13 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-13"), { ssr: false })
const Tabs14 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-14"), { ssr: false })
const Tabs15 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-15"), { ssr: false })
const Tabs16 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-16"), { ssr: false })
const Tabs17 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-17"), { ssr: false })
const Tabs18 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-18"), { ssr: false })
const Tabs19 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-19"), { ssr: false })
const Tabs20 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-20"), { ssr: false })
const Tabs21 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-21"), { ssr: false })
const Tabs22 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-22"), { ssr: false })
const Tabs23 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-23"), { ssr: false })
const Tabs24 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-24"), { ssr: false })
const Tabs25 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-25"), { ssr: false })
const Tabs26 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-26"), { ssr: false })
const Tabs27 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-27"), { ssr: false })
const Tabs28 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-28"), { ssr: false })
const Tabs29 = dynamic(() => import("@/components/shadcn-studio/tabs/tabs-29"), { ssr: false })

const components = [
  { label: "Tabs 01", Component: Tabs01 },
  { label: "Tabs 02", Component: Tabs02 },
  { label: "Tabs 03", Component: Tabs03 },
  { label: "Tabs 04", Component: Tabs04 },
  { label: "Tabs 05", Component: Tabs05 },
  { label: "Tabs 06", Component: Tabs06 },
  { label: "Tabs 07", Component: Tabs07 },
  { label: "Tabs 08", Component: Tabs08 },
  { label: "Tabs 09", Component: Tabs09 },
  { label: "Tabs 10", Component: Tabs10 },
  { label: "Tabs 11", Component: Tabs11 },
  { label: "Tabs 12", Component: Tabs12 },
  { label: "Tabs 13", Component: Tabs13 },
  { label: "Tabs 14", Component: Tabs14 },
  { label: "Tabs 15", Component: Tabs15 },
  { label: "Tabs 16", Component: Tabs16 },
  { label: "Tabs 17", Component: Tabs17 },
  { label: "Tabs 18", Component: Tabs18 },
  { label: "Tabs 19", Component: Tabs19 },
  { label: "Tabs 20", Component: Tabs20 },
  { label: "Tabs 21", Component: Tabs21 },
  { label: "Tabs 22", Component: Tabs22 },
  { label: "Tabs 23", Component: Tabs23 },
  { label: "Tabs 24", Component: Tabs24 },
  { label: "Tabs 25", Component: Tabs25 },
  { label: "Tabs 26", Component: Tabs26 },
  { label: "Tabs 27", Component: Tabs27 },
  { label: "Tabs 28", Component: Tabs28 },
  { label: "Tabs 29", Component: Tabs29 },
]

export default function TabsGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 29 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Tabs</h1>
        <p className="text-muted-foreground mt-1">Content sections — 29 tab styles for navigation and segmentation</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/tabs/tabs-{01..29}"`}</code>
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
