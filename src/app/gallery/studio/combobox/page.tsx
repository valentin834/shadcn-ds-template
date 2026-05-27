"use client"

import dynamic from 'next/dynamic'

const Combobox01 = dynamic(() => import("@/components/shadcn-studio/combobox/combobox-01"), { ssr: false })
const Combobox02 = dynamic(() => import("@/components/shadcn-studio/combobox/combobox-02"), { ssr: false })
const Combobox03 = dynamic(() => import("@/components/shadcn-studio/combobox/combobox-03"), { ssr: false })
const Combobox04 = dynamic(() => import("@/components/shadcn-studio/combobox/combobox-04"), { ssr: false })
const Combobox05 = dynamic(() => import("@/components/shadcn-studio/combobox/combobox-05"), { ssr: false })
const Combobox06 = dynamic(() => import("@/components/shadcn-studio/combobox/combobox-06"), { ssr: false })
const Combobox07 = dynamic(() => import("@/components/shadcn-studio/combobox/combobox-07"), { ssr: false })
const Combobox08 = dynamic(() => import("@/components/shadcn-studio/combobox/combobox-08"), { ssr: false })
const Combobox09 = dynamic(() => import("@/components/shadcn-studio/combobox/combobox-09"), { ssr: false })
const Combobox10 = dynamic(() => import("@/components/shadcn-studio/combobox/combobox-10"), { ssr: false })
const Combobox11 = dynamic(() => import("@/components/shadcn-studio/combobox/combobox-11"), { ssr: false })
const Combobox12 = dynamic(() => import("@/components/shadcn-studio/combobox/combobox-12"), { ssr: false })
const Combobox13 = dynamic(() => import("@/components/shadcn-studio/combobox/combobox-13"), { ssr: false })
const Combobox14 = dynamic(() => import("@/components/shadcn-studio/combobox/combobox-14"), { ssr: false })

const components = [
  { label: "Combobox 01", Component: Combobox01 },
  { label: "Combobox 02", Component: Combobox02 },
  { label: "Combobox 03", Component: Combobox03 },
  { label: "Combobox 04", Component: Combobox04 },
  { label: "Combobox 05", Component: Combobox05 },
  { label: "Combobox 06", Component: Combobox06 },
  { label: "Combobox 07", Component: Combobox07 },
  { label: "Combobox 08", Component: Combobox08 },
  { label: "Combobox 09", Component: Combobox09 },
  { label: "Combobox 10", Component: Combobox10 },
  { label: "Combobox 11", Component: Combobox11 },
  { label: "Combobox 12", Component: Combobox12 },
  { label: "Combobox 13", Component: Combobox13 },
  { label: "Combobox 14", Component: Combobox14 },
]

export default function ComboboxGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 14 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Combobox</h1>
        <p className="text-muted-foreground mt-1">Searchable dropdown — autocomplete, multi-select, async search</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/combobox/combobox-{01..14}"`}</code>
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
