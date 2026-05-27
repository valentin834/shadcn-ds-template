"use client"

import dynamic from 'next/dynamic'

const Sonner01 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-01"), { ssr: false })
const Sonner02 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-02"), { ssr: false })
const Sonner03 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-03"), { ssr: false })
const Sonner04 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-04"), { ssr: false })
const Sonner05 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-05"), { ssr: false })
const Sonner06 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-06"), { ssr: false })
const Sonner07 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-07"), { ssr: false })
const Sonner08 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-08"), { ssr: false })
const Sonner09 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-09"), { ssr: false })
const Sonner10 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-10"), { ssr: false })
const Sonner11 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-11"), { ssr: false })
const Sonner12 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-12"), { ssr: false })
const Sonner13 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-13"), { ssr: false })
const Sonner14 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-14"), { ssr: false })
const Sonner15 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-15"), { ssr: false })
const Sonner16 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-16"), { ssr: false })
const Sonner17 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-17"), { ssr: false })
const Sonner18 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-18"), { ssr: false })
const Sonner19 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-19"), { ssr: false })
const Sonner20 = dynamic(() => import("@/components/shadcn-studio/sonner/sonner-20"), { ssr: false })

const components = [
  { label: "Sonner 01", Component: Sonner01 },
  { label: "Sonner 02", Component: Sonner02 },
  { label: "Sonner 03", Component: Sonner03 },
  { label: "Sonner 04", Component: Sonner04 },
  { label: "Sonner 05", Component: Sonner05 },
  { label: "Sonner 06", Component: Sonner06 },
  { label: "Sonner 07", Component: Sonner07 },
  { label: "Sonner 08", Component: Sonner08 },
  { label: "Sonner 09", Component: Sonner09 },
  { label: "Sonner 10", Component: Sonner10 },
  { label: "Sonner 11", Component: Sonner11 },
  { label: "Sonner 12", Component: Sonner12 },
  { label: "Sonner 13", Component: Sonner13 },
  { label: "Sonner 14", Component: Sonner14 },
  { label: "Sonner 15", Component: Sonner15 },
  { label: "Sonner 16", Component: Sonner16 },
  { label: "Sonner 17", Component: Sonner17 },
  { label: "Sonner 18", Component: Sonner18 },
  { label: "Sonner 19", Component: Sonner19 },
  { label: "Sonner 20", Component: Sonner20 },
]

export default function SonnerGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 20 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Sonner</h1>
        <p className="text-muted-foreground mt-1">Toast notifications — 20 variants for all feedback patterns</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/sonner/sonner-{01..20}"`}</code>
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
