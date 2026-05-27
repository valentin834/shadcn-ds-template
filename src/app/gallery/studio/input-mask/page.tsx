"use client"

import dynamic from 'next/dynamic'

const InputMask1 = dynamic(() => import("@/components/shadcn-studio/input-mask/input-mask-01"), { ssr: false })
const InputMask2 = dynamic(() => import("@/components/shadcn-studio/input-mask/input-mask-02"), { ssr: false })
const InputMask3 = dynamic(() => import("@/components/shadcn-studio/input-mask/input-mask-03"), { ssr: false })
const InputMask4 = dynamic(() => import("@/components/shadcn-studio/input-mask/input-mask-04"), { ssr: false })
const InputMask5 = dynamic(() => import("@/components/shadcn-studio/input-mask/input-mask-05"), { ssr: false })
const InputMask6 = dynamic(() => import("@/components/shadcn-studio/input-mask/input-mask-06"), { ssr: false })

const components = [
  { label: "Input Mask 1", Component: InputMask1 },
  { label: "Input Mask 2", Component: InputMask2 },
  { label: "Input Mask 3", Component: InputMask3 },
  { label: "Input Mask 4", Component: InputMask4 },
  { label: "Input Mask 5", Component: InputMask5 },
  { label: "Input Mask 6", Component: InputMask6 },
]

export default function InputMaskGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 6 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Input Mask</h1>
        <p className="text-muted-foreground mt-1">Formatted input — phone, IBAN, date, credit card</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/input-mask/input-mask-{01..6}"`}</code>
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
