"use client"

import dynamic from 'next/dynamic'

const DatePicker01 = dynamic(() => import("@/components/shadcn-studio/date-picker/date-picker-01"), { ssr: false })
const DatePicker02 = dynamic(() => import("@/components/shadcn-studio/date-picker/date-picker-02"), { ssr: false })
const DatePicker03 = dynamic(() => import("@/components/shadcn-studio/date-picker/date-picker-03"), { ssr: false })
const DatePicker04 = dynamic(() => import("@/components/shadcn-studio/date-picker/date-picker-04"), { ssr: false })
const DatePicker05 = dynamic(() => import("@/components/shadcn-studio/date-picker/date-picker-05"), { ssr: false })
const DatePicker06 = dynamic(() => import("@/components/shadcn-studio/date-picker/date-picker-06"), { ssr: false })
const DatePicker07 = dynamic(() => import("@/components/shadcn-studio/date-picker/date-picker-07"), { ssr: false })
const DatePicker08 = dynamic(() => import("@/components/shadcn-studio/date-picker/date-picker-08"), { ssr: false })
const DatePicker09 = dynamic(() => import("@/components/shadcn-studio/date-picker/date-picker-09"), { ssr: false })
const DatePicker10 = dynamic(() => import("@/components/shadcn-studio/date-picker/date-picker-10"), { ssr: false })
const DatePicker11 = dynamic(() => import("@/components/shadcn-studio/date-picker/date-picker-11"), { ssr: false })
const DatePicker12 = dynamic(() => import("@/components/shadcn-studio/date-picker/date-picker-12"), { ssr: false })
const DatePicker13 = dynamic(() => import("@/components/shadcn-studio/date-picker/date-picker-13"), { ssr: false })

const components = [
  { label: "Date Picker 01", Component: DatePicker01 },
  { label: "Date Picker 02", Component: DatePicker02 },
  { label: "Date Picker 03", Component: DatePicker03 },
  { label: "Date Picker 04", Component: DatePicker04 },
  { label: "Date Picker 05", Component: DatePicker05 },
  { label: "Date Picker 06", Component: DatePicker06 },
  { label: "Date Picker 07", Component: DatePicker07 },
  { label: "Date Picker 08", Component: DatePicker08 },
  { label: "Date Picker 09", Component: DatePicker09 },
  { label: "Date Picker 10", Component: DatePicker10 },
  { label: "Date Picker 11", Component: DatePicker11 },
  { label: "Date Picker 12", Component: DatePicker12 },
  { label: "Date Picker 13", Component: DatePicker13 },
]

export default function DatePickerGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 13 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Date Picker</h1>
        <p className="text-muted-foreground mt-1">Inline or popover date selector with range and preset support</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/date-picker/date-picker-{01..13}"`}</code>
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
