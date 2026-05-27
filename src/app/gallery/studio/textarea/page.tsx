"use client"

import dynamic from 'next/dynamic'

const Textarea01 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-01"), { ssr: false })
const Textarea02 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-02"), { ssr: false })
const Textarea03 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-03"), { ssr: false })
const Textarea04 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-04"), { ssr: false })
const Textarea05 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-05"), { ssr: false })
const Textarea06 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-06"), { ssr: false })
const Textarea07 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-07"), { ssr: false })
const Textarea08 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-08"), { ssr: false })
const Textarea09 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-09"), { ssr: false })
const Textarea10 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-10"), { ssr: false })
const Textarea11 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-11"), { ssr: false })
const Textarea12 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-12"), { ssr: false })
const Textarea13 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-13"), { ssr: false })
const Textarea14 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-14"), { ssr: false })
const Textarea15 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-15"), { ssr: false })
const Textarea16 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-16"), { ssr: false })
const Textarea17 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-17"), { ssr: false })
const Textarea18 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-18"), { ssr: false })
const Textarea19 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-19"), { ssr: false })
const Textarea20 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-20"), { ssr: false })
const Textarea21 = dynamic(() => import("@/components/shadcn-studio/textarea/textarea-21"), { ssr: false })

const components = [
  { label: "Textarea 01", Component: Textarea01 },
  { label: "Textarea 02", Component: Textarea02 },
  { label: "Textarea 03", Component: Textarea03 },
  { label: "Textarea 04", Component: Textarea04 },
  { label: "Textarea 05", Component: Textarea05 },
  { label: "Textarea 06", Component: Textarea06 },
  { label: "Textarea 07", Component: Textarea07 },
  { label: "Textarea 08", Component: Textarea08 },
  { label: "Textarea 09", Component: Textarea09 },
  { label: "Textarea 10", Component: Textarea10 },
  { label: "Textarea 11", Component: Textarea11 },
  { label: "Textarea 12", Component: Textarea12 },
  { label: "Textarea 13", Component: Textarea13 },
  { label: "Textarea 14", Component: Textarea14 },
  { label: "Textarea 15", Component: Textarea15 },
  { label: "Textarea 16", Component: Textarea16 },
  { label: "Textarea 17", Component: Textarea17 },
  { label: "Textarea 18", Component: Textarea18 },
  { label: "Textarea 19", Component: Textarea19 },
  { label: "Textarea 20", Component: Textarea20 },
  { label: "Textarea 21", Component: Textarea21 },
]

export default function TextareaGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 21 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Textarea</h1>
        <p className="text-muted-foreground mt-1">Multiline text — 21 variants including auto-grow and rich patterns</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/textarea/textarea-{01..21}"`}</code>
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
