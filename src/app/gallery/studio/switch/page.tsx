"use client"

import dynamic from 'next/dynamic'

const Switch01 = dynamic(() => import("@/components/shadcn-studio/switch/switch-01"), { ssr: false })
const Switch02 = dynamic(() => import("@/components/shadcn-studio/switch/switch-02"), { ssr: false })
const Switch03 = dynamic(() => import("@/components/shadcn-studio/switch/switch-03"), { ssr: false })
const Switch04 = dynamic(() => import("@/components/shadcn-studio/switch/switch-04"), { ssr: false })
const Switch05 = dynamic(() => import("@/components/shadcn-studio/switch/switch-05"), { ssr: false })
const Switch06 = dynamic(() => import("@/components/shadcn-studio/switch/switch-06"), { ssr: false })
const Switch07 = dynamic(() => import("@/components/shadcn-studio/switch/switch-07"), { ssr: false })
const Switch08 = dynamic(() => import("@/components/shadcn-studio/switch/switch-08"), { ssr: false })
const Switch09 = dynamic(() => import("@/components/shadcn-studio/switch/switch-09"), { ssr: false })
const Switch10 = dynamic(() => import("@/components/shadcn-studio/switch/switch-10"), { ssr: false })
const Switch11 = dynamic(() => import("@/components/shadcn-studio/switch/switch-11"), { ssr: false })
const Switch12 = dynamic(() => import("@/components/shadcn-studio/switch/switch-12"), { ssr: false })
const Switch13 = dynamic(() => import("@/components/shadcn-studio/switch/switch-13"), { ssr: false })
const Switch14 = dynamic(() => import("@/components/shadcn-studio/switch/switch-14"), { ssr: false })
const Switch15 = dynamic(() => import("@/components/shadcn-studio/switch/switch-15"), { ssr: false })
const Switch16 = dynamic(() => import("@/components/shadcn-studio/switch/switch-16"), { ssr: false })
const Switch17 = dynamic(() => import("@/components/shadcn-studio/switch/switch-17"), { ssr: false })
const Switch18 = dynamic(() => import("@/components/shadcn-studio/switch/switch-18"), { ssr: false })
const Switch19 = dynamic(() => import("@/components/shadcn-studio/switch/switch-19"), { ssr: false })
const Switch20 = dynamic(() => import("@/components/shadcn-studio/switch/switch-20"), { ssr: false })

const components = [
  { label: "Switch 01", Component: Switch01 },
  { label: "Switch 02", Component: Switch02 },
  { label: "Switch 03", Component: Switch03 },
  { label: "Switch 04", Component: Switch04 },
  { label: "Switch 05", Component: Switch05 },
  { label: "Switch 06", Component: Switch06 },
  { label: "Switch 07", Component: Switch07 },
  { label: "Switch 08", Component: Switch08 },
  { label: "Switch 09", Component: Switch09 },
  { label: "Switch 10", Component: Switch10 },
  { label: "Switch 11", Component: Switch11 },
  { label: "Switch 12", Component: Switch12 },
  { label: "Switch 13", Component: Switch13 },
  { label: "Switch 14", Component: Switch14 },
  { label: "Switch 15", Component: Switch15 },
  { label: "Switch 16", Component: Switch16 },
  { label: "Switch 17", Component: Switch17 },
  { label: "Switch 18", Component: Switch18 },
  { label: "Switch 19", Component: Switch19 },
  { label: "Switch 20", Component: Switch20 },
]

export default function SwitchGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 20 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Switch</h1>
        <p className="text-muted-foreground mt-1">Toggle on/off — settings, feature flags, preferences</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/switch/switch-{01..20}"`}</code>
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
