"use client"

import dynamic from 'next/dynamic'

const Select01 = dynamic(() => import("@/components/shadcn-studio/select/select-01"), { ssr: false })
const Select02 = dynamic(() => import("@/components/shadcn-studio/select/select-02"), { ssr: false })
const Select03 = dynamic(() => import("@/components/shadcn-studio/select/select-03"), { ssr: false })
const Select04 = dynamic(() => import("@/components/shadcn-studio/select/select-04"), { ssr: false })
const Select05 = dynamic(() => import("@/components/shadcn-studio/select/select-05"), { ssr: false })
const Select06 = dynamic(() => import("@/components/shadcn-studio/select/select-06"), { ssr: false })
const Select07 = dynamic(() => import("@/components/shadcn-studio/select/select-07"), { ssr: false })
const Select08 = dynamic(() => import("@/components/shadcn-studio/select/select-08"), { ssr: false })
const Select09 = dynamic(() => import("@/components/shadcn-studio/select/select-09"), { ssr: false })
const Select10 = dynamic(() => import("@/components/shadcn-studio/select/select-10"), { ssr: false })
const Select11 = dynamic(() => import("@/components/shadcn-studio/select/select-11"), { ssr: false })
const Select12 = dynamic(() => import("@/components/shadcn-studio/select/select-12"), { ssr: false })
const Select13 = dynamic(() => import("@/components/shadcn-studio/select/select-13"), { ssr: false })
const Select14 = dynamic(() => import("@/components/shadcn-studio/select/select-14"), { ssr: false })
const Select15 = dynamic(() => import("@/components/shadcn-studio/select/select-15"), { ssr: false })
const Select16 = dynamic(() => import("@/components/shadcn-studio/select/select-16"), { ssr: false })
const Select17 = dynamic(() => import("@/components/shadcn-studio/select/select-17"), { ssr: false })
const Select18 = dynamic(() => import("@/components/shadcn-studio/select/select-18"), { ssr: false })
const Select19 = dynamic(() => import("@/components/shadcn-studio/select/select-19"), { ssr: false })
const Select20 = dynamic(() => import("@/components/shadcn-studio/select/select-20"), { ssr: false })
const Select21 = dynamic(() => import("@/components/shadcn-studio/select/select-21"), { ssr: false })
const Select22 = dynamic(() => import("@/components/shadcn-studio/select/select-22"), { ssr: false })
const Select23 = dynamic(() => import("@/components/shadcn-studio/select/select-23"), { ssr: false })
const Select24 = dynamic(() => import("@/components/shadcn-studio/select/select-24"), { ssr: false })
const Select25 = dynamic(() => import("@/components/shadcn-studio/select/select-25"), { ssr: false })
const Select26 = dynamic(() => import("@/components/shadcn-studio/select/select-26"), { ssr: false })
const Select27 = dynamic(() => import("@/components/shadcn-studio/select/select-27"), { ssr: false })
const Select28 = dynamic(() => import("@/components/shadcn-studio/select/select-28"), { ssr: false })
const Select29 = dynamic(() => import("@/components/shadcn-studio/select/select-29"), { ssr: false })
const Select30 = dynamic(() => import("@/components/shadcn-studio/select/select-30"), { ssr: false })
const Select31 = dynamic(() => import("@/components/shadcn-studio/select/select-31"), { ssr: false })
const Select32 = dynamic(() => import("@/components/shadcn-studio/select/select-32"), { ssr: false })
const Select33 = dynamic(() => import("@/components/shadcn-studio/select/select-33"), { ssr: false })
const Select34 = dynamic(() => import("@/components/shadcn-studio/select/select-34"), { ssr: false })
const Select35 = dynamic(() => import("@/components/shadcn-studio/select/select-35"), { ssr: false })
const Select36 = dynamic(() => import("@/components/shadcn-studio/select/select-36"), { ssr: false })
const Select37 = dynamic(() => import("@/components/shadcn-studio/select/select-37"), { ssr: false })
const Select38 = dynamic(() => import("@/components/shadcn-studio/select/select-38"), { ssr: false })

const components = [
  { label: "Select 01", Component: Select01 },
  { label: "Select 02", Component: Select02 },
  { label: "Select 03", Component: Select03 },
  { label: "Select 04", Component: Select04 },
  { label: "Select 05", Component: Select05 },
  { label: "Select 06", Component: Select06 },
  { label: "Select 07", Component: Select07 },
  { label: "Select 08", Component: Select08 },
  { label: "Select 09", Component: Select09 },
  { label: "Select 10", Component: Select10 },
  { label: "Select 11", Component: Select11 },
  { label: "Select 12", Component: Select12 },
  { label: "Select 13", Component: Select13 },
  { label: "Select 14", Component: Select14 },
  { label: "Select 15", Component: Select15 },
  { label: "Select 16", Component: Select16 },
  { label: "Select 17", Component: Select17 },
  { label: "Select 18", Component: Select18 },
  { label: "Select 19", Component: Select19 },
  { label: "Select 20", Component: Select20 },
  { label: "Select 21", Component: Select21 },
  { label: "Select 22", Component: Select22 },
  { label: "Select 23", Component: Select23 },
  { label: "Select 24", Component: Select24 },
  { label: "Select 25", Component: Select25 },
  { label: "Select 26", Component: Select26 },
  { label: "Select 27", Component: Select27 },
  { label: "Select 28", Component: Select28 },
  { label: "Select 29", Component: Select29 },
  { label: "Select 30", Component: Select30 },
  { label: "Select 31", Component: Select31 },
  { label: "Select 32", Component: Select32 },
  { label: "Select 33", Component: Select33 },
  { label: "Select 34", Component: Select34 },
  { label: "Select 35", Component: Select35 },
  { label: "Select 36", Component: Select36 },
  { label: "Select 37", Component: Select37 },
  { label: "Select 38", Component: Select38 },
]

export default function SelectGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 38 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Select</h1>
        <p className="text-muted-foreground mt-1">Dropdown selector — 38 variants for all selection patterns</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/select/select-{01..38}"`}</code>
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
