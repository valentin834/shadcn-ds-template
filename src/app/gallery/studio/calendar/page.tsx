"use client"

import dynamic from 'next/dynamic'

const Calendar01 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-01"), { ssr: false })
const Calendar02 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-02"), { ssr: false })
const Calendar03 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-03"), { ssr: false })
const Calendar04 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-04"), { ssr: false })
const Calendar05 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-05"), { ssr: false })
const Calendar06 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-06"), { ssr: false })
const Calendar07 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-07"), { ssr: false })
const Calendar08 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-08"), { ssr: false })
const Calendar09 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-09"), { ssr: false })
const Calendar10 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-10"), { ssr: false })
const Calendar11 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-11"), { ssr: false })
const Calendar12 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-12"), { ssr: false })
const Calendar13 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-13"), { ssr: false })
const Calendar14 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-14"), { ssr: false })
const Calendar15 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-15"), { ssr: false })
const Calendar16 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-16"), { ssr: false })
const Calendar17 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-17"), { ssr: false })
const Calendar18 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-18"), { ssr: false })
const Calendar19 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-19"), { ssr: false })
const Calendar20 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-20"), { ssr: false })
const Calendar21 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-21"), { ssr: false })
const Calendar22 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-22"), { ssr: false })
const Calendar23 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-23"), { ssr: false })
const Calendar24 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-24"), { ssr: false })
const Calendar25 = dynamic(() => import("@/components/shadcn-studio/calendar/calendar-25"), { ssr: false })

const components = [
  { label: "Calendar 01", Component: Calendar01 },
  { label: "Calendar 02", Component: Calendar02 },
  { label: "Calendar 03", Component: Calendar03 },
  { label: "Calendar 04", Component: Calendar04 },
  { label: "Calendar 05", Component: Calendar05 },
  { label: "Calendar 06", Component: Calendar06 },
  { label: "Calendar 07", Component: Calendar07 },
  { label: "Calendar 08", Component: Calendar08 },
  { label: "Calendar 09", Component: Calendar09 },
  { label: "Calendar 10", Component: Calendar10 },
  { label: "Calendar 11", Component: Calendar11 },
  { label: "Calendar 12", Component: Calendar12 },
  { label: "Calendar 13", Component: Calendar13 },
  { label: "Calendar 14", Component: Calendar14 },
  { label: "Calendar 15", Component: Calendar15 },
  { label: "Calendar 16", Component: Calendar16 },
  { label: "Calendar 17", Component: Calendar17 },
  { label: "Calendar 18", Component: Calendar18 },
  { label: "Calendar 19", Component: Calendar19 },
  { label: "Calendar 20", Component: Calendar20 },
  { label: "Calendar 21", Component: Calendar21 },
  { label: "Calendar 22", Component: Calendar22 },
  { label: "Calendar 23", Component: Calendar23 },
  { label: "Calendar 24", Component: Calendar24 },
  { label: "Calendar 25", Component: Calendar25 },
]

export default function CalendarGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 25 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground mt-1">Date display and selection — single, range, with presets</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/calendar/calendar-{01..25}"`}</code>
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
