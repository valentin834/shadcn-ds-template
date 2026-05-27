"use client"

import dynamic from 'next/dynamic'

const Dialog01 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-01"), { ssr: false })
const Dialog02 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-02"), { ssr: false })
const Dialog03 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-03"), { ssr: false })
const Dialog04 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-04"), { ssr: false })
const Dialog05 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-05"), { ssr: false })
const Dialog06 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-06"), { ssr: false })
const Dialog07 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-07"), { ssr: false })
const Dialog08 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-08"), { ssr: false })
const Dialog09 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-09"), { ssr: false })
const Dialog10 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-10"), { ssr: false })
const Dialog11 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-11"), { ssr: false })
const Dialog12 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-12"), { ssr: false })
const Dialog13 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-13"), { ssr: false })
const Dialog14 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-14"), { ssr: false })
const Dialog15 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-15"), { ssr: false })
const Dialog16 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-16"), { ssr: false })
const Dialog17 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-17"), { ssr: false })
const Dialog18 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-18"), { ssr: false })
const Dialog19 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-19"), { ssr: false })
const Dialog20 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-20"), { ssr: false })
const Dialog21 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-21"), { ssr: false })
const Dialog22 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-22"), { ssr: false })
const Dialog23 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-23"), { ssr: false })
const Dialog24 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-24"), { ssr: false })
const Dialog25 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-25"), { ssr: false })
const Dialog26 = dynamic(() => import("@/components/shadcn-studio/dialog/dialog-26"), { ssr: false })

const components = [
  { label: "Dialog 01", Component: Dialog01 },
  { label: "Dialog 02", Component: Dialog02 },
  { label: "Dialog 03", Component: Dialog03 },
  { label: "Dialog 04", Component: Dialog04 },
  { label: "Dialog 05", Component: Dialog05 },
  { label: "Dialog 06", Component: Dialog06 },
  { label: "Dialog 07", Component: Dialog07 },
  { label: "Dialog 08", Component: Dialog08 },
  { label: "Dialog 09", Component: Dialog09 },
  { label: "Dialog 10", Component: Dialog10 },
  { label: "Dialog 11", Component: Dialog11 },
  { label: "Dialog 12", Component: Dialog12 },
  { label: "Dialog 13", Component: Dialog13 },
  { label: "Dialog 14", Component: Dialog14 },
  { label: "Dialog 15", Component: Dialog15 },
  { label: "Dialog 16", Component: Dialog16 },
  { label: "Dialog 17", Component: Dialog17 },
  { label: "Dialog 18", Component: Dialog18 },
  { label: "Dialog 19", Component: Dialog19 },
  { label: "Dialog 20", Component: Dialog20 },
  { label: "Dialog 21", Component: Dialog21 },
  { label: "Dialog 22", Component: Dialog22 },
  { label: "Dialog 23", Component: Dialog23 },
  { label: "Dialog 24", Component: Dialog24 },
  { label: "Dialog 25", Component: Dialog25 },
  { label: "Dialog 26", Component: Dialog26 },
]

export default function DialogGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 26 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Dialog</h1>
        <p className="text-muted-foreground mt-1">Modal overlay — confirmations, forms, detail views</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/dialog/dialog-{01..26}"`}</code>
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
