"use client"

import dynamic from 'next/dynamic'

const Form01 = dynamic(() => import("@/components/shadcn-studio/form/form-01"), { ssr: false })
const Form02 = dynamic(() => import("@/components/shadcn-studio/form/form-02"), { ssr: false })
const Form03 = dynamic(() => import("@/components/shadcn-studio/form/form-03"), { ssr: false })
const Form04 = dynamic(() => import("@/components/shadcn-studio/form/form-04"), { ssr: false })
const Form05 = dynamic(() => import("@/components/shadcn-studio/form/form-05"), { ssr: false })
const Form06 = dynamic(() => import("@/components/shadcn-studio/form/form-06"), { ssr: false })
const Form07 = dynamic(() => import("@/components/shadcn-studio/form/form-07"), { ssr: false })
const Form08 = dynamic(() => import("@/components/shadcn-studio/form/form-08"), { ssr: false })
const Form09 = dynamic(() => import("@/components/shadcn-studio/form/form-09"), { ssr: false })
const Form10 = dynamic(() => import("@/components/shadcn-studio/form/form-10"), { ssr: false })

const components = [
  { label: "Form 01", Component: Form01 },
  { label: "Form 02", Component: Form02 },
  { label: "Form 03", Component: Form03 },
  { label: "Form 04", Component: Form04 },
  { label: "Form 05", Component: Form05 },
  { label: "Form 06", Component: Form06 },
  { label: "Form 07", Component: Form07 },
  { label: "Form 08", Component: Form08 },
  { label: "Form 09", Component: Form09 },
  { label: "Form 10", Component: Form10 },
]

export default function FormGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 10 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Form</h1>
        <p className="text-muted-foreground mt-1">Form layouts — login, registration, settings with validation</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/form/form-{01..10}"`}</code>
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
