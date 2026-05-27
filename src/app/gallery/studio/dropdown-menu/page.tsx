"use client"

import dynamic from 'next/dynamic'

const DropdownMenu01 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-01"), { ssr: false })
const DropdownMenu02 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-02"), { ssr: false })
const DropdownMenu03 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-03"), { ssr: false })
const DropdownMenu04 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-04"), { ssr: false })
const DropdownMenu05 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-05"), { ssr: false })
const DropdownMenu06 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-06"), { ssr: false })
const DropdownMenu07 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-07"), { ssr: false })
const DropdownMenu08 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-08"), { ssr: false })
const DropdownMenu09 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-09"), { ssr: false })
const DropdownMenu10 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-10"), { ssr: false })
const DropdownMenu11 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-11"), { ssr: false })
const DropdownMenu12 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-12"), { ssr: false })
const DropdownMenu13 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-13"), { ssr: false })
const DropdownMenu14 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-14"), { ssr: false })
const DropdownMenu15 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-15"), { ssr: false })
const DropdownMenu16 = dynamic(() => import("@/components/shadcn-studio/dropdown-menu/dropdown-menu-16"), { ssr: false })

const components = [
  { label: "Dropdown Menu 01", Component: DropdownMenu01 },
  { label: "Dropdown Menu 02", Component: DropdownMenu02 },
  { label: "Dropdown Menu 03", Component: DropdownMenu03 },
  { label: "Dropdown Menu 04", Component: DropdownMenu04 },
  { label: "Dropdown Menu 05", Component: DropdownMenu05 },
  { label: "Dropdown Menu 06", Component: DropdownMenu06 },
  { label: "Dropdown Menu 07", Component: DropdownMenu07 },
  { label: "Dropdown Menu 08", Component: DropdownMenu08 },
  { label: "Dropdown Menu 09", Component: DropdownMenu09 },
  { label: "Dropdown Menu 10", Component: DropdownMenu10 },
  { label: "Dropdown Menu 11", Component: DropdownMenu11 },
  { label: "Dropdown Menu 12", Component: DropdownMenu12 },
  { label: "Dropdown Menu 13", Component: DropdownMenu13 },
  { label: "Dropdown Menu 14", Component: DropdownMenu14 },
  { label: "Dropdown Menu 15", Component: DropdownMenu15 },
  { label: "Dropdown Menu 16", Component: DropdownMenu16 },
]

export default function DropdownMenuGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 16 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Dropdown Menu</h1>
        <p className="text-muted-foreground mt-1">Contextual action menu — user menu, row actions, settings</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/dropdown-menu/dropdown-menu-{01..16}"`}</code>
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
