"use client"

import dynamic from 'next/dynamic'

const Card01 = dynamic(() => import("@/components/shadcn-studio/card/card-01"), { ssr: false })
const Card02 = dynamic(() => import("@/components/shadcn-studio/card/card-02"), { ssr: false })
const Card03 = dynamic(() => import("@/components/shadcn-studio/card/card-03"), { ssr: false })
const Card04 = dynamic(() => import("@/components/shadcn-studio/card/card-04"), { ssr: false })
const Card05 = dynamic(() => import("@/components/shadcn-studio/card/card-05"), { ssr: false })
const Card06 = dynamic(() => import("@/components/shadcn-studio/card/card-06"), { ssr: false })
const Card07 = dynamic(() => import("@/components/shadcn-studio/card/card-07"), { ssr: false })
const Card08 = dynamic(() => import("@/components/shadcn-studio/card/card-08"), { ssr: false })
const Card09 = dynamic(() => import("@/components/shadcn-studio/card/card-09"), { ssr: false })
const Card10 = dynamic(() => import("@/components/shadcn-studio/card/card-10"), { ssr: false })
const Card11 = dynamic(() => import("@/components/shadcn-studio/card/card-11"), { ssr: false })
const Card12 = dynamic(() => import("@/components/shadcn-studio/card/card-12"), { ssr: false })
const Card13 = dynamic(() => import("@/components/shadcn-studio/card/card-13"), { ssr: false })
const Card14 = dynamic(() => import("@/components/shadcn-studio/card/card-14"), { ssr: false })
const Card15 = dynamic(() => import("@/components/shadcn-studio/card/card-15"), { ssr: false })
const Card16 = dynamic(() => import("@/components/shadcn-studio/card/card-16"), { ssr: false })
const Card17 = dynamic(() => import("@/components/shadcn-studio/card/card-17"), { ssr: false })

const components = [
  { label: "Card 01", Component: Card01 },
  { label: "Card 02", Component: Card02 },
  { label: "Card 03", Component: Card03 },
  { label: "Card 04", Component: Card04 },
  { label: "Card 05", Component: Card05 },
  { label: "Card 06", Component: Card06 },
  { label: "Card 07", Component: Card07 },
  { label: "Card 08", Component: Card08 },
  { label: "Card 09", Component: Card09 },
  { label: "Card 10", Component: Card10 },
  { label: "Card 11", Component: Card11 },
  { label: "Card 12", Component: Card12 },
  { label: "Card 13", Component: Card13 },
  { label: "Card 14", Component: Card14 },
  { label: "Card 15", Component: Card15 },
  { label: "Card 16", Component: Card16 },
  { label: "Card 17", Component: Card17 },
]

export default function CardGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 17 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Card</h1>
        <p className="text-muted-foreground mt-1">Content containers — dashboard tiles, product cards, feature blocks</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/card/card-{01..17}"`}</code>
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
