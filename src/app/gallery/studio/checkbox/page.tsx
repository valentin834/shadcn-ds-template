"use client"

import dynamic from 'next/dynamic'

const Checkbox01 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-01"), { ssr: false })
const Checkbox02 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-02"), { ssr: false })
const Checkbox03 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-03"), { ssr: false })
const Checkbox04 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-04"), { ssr: false })
const Checkbox05 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-05"), { ssr: false })
const Checkbox06 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-06"), { ssr: false })
const Checkbox07 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-07"), { ssr: false })
const Checkbox08 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-08"), { ssr: false })
const Checkbox09 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-09"), { ssr: false })
const Checkbox10 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-10"), { ssr: false })
const Checkbox11 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-11"), { ssr: false })
const Checkbox12 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-12"), { ssr: false })
const Checkbox13 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-13"), { ssr: false })
const Checkbox14 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-14"), { ssr: false })
const Checkbox15 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-15"), { ssr: false })
const Checkbox16 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-16"), { ssr: false })
const Checkbox17 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-17"), { ssr: false })
const Checkbox18 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-18"), { ssr: false })
const Checkbox19 = dynamic(() => import("@/components/shadcn-studio/checkbox/checkbox-19"), { ssr: false })

const components = [
  { label: "Checkbox 01", Component: Checkbox01 },
  { label: "Checkbox 02", Component: Checkbox02 },
  { label: "Checkbox 03", Component: Checkbox03 },
  { label: "Checkbox 04", Component: Checkbox04 },
  { label: "Checkbox 05", Component: Checkbox05 },
  { label: "Checkbox 06", Component: Checkbox06 },
  { label: "Checkbox 07", Component: Checkbox07 },
  { label: "Checkbox 08", Component: Checkbox08 },
  { label: "Checkbox 09", Component: Checkbox09 },
  { label: "Checkbox 10", Component: Checkbox10 },
  { label: "Checkbox 11", Component: Checkbox11 },
  { label: "Checkbox 12", Component: Checkbox12 },
  { label: "Checkbox 13", Component: Checkbox13 },
  { label: "Checkbox 14", Component: Checkbox14 },
  { label: "Checkbox 15", Component: Checkbox15 },
  { label: "Checkbox 16", Component: Checkbox16 },
  { label: "Checkbox 17", Component: Checkbox17 },
  { label: "Checkbox 18", Component: Checkbox18 },
  { label: "Checkbox 19", Component: Checkbox19 },
]

export default function CheckboxGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 19 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Checkbox</h1>
        <p className="text-muted-foreground mt-1">Boolean input — single selection, indeterminate state, grouped lists</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/checkbox/checkbox-{01..19}"`}</code>
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
