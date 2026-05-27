"use client"

import dynamic from 'next/dynamic'

const Avatar01 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-01"), { ssr: false })
const Avatar02 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-02"), { ssr: false })
const Avatar03 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-03"), { ssr: false })
const Avatar04 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-04"), { ssr: false })
const Avatar05 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-05"), { ssr: false })
const Avatar06 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-06"), { ssr: false })
const Avatar07 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-07"), { ssr: false })
const Avatar08 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-08"), { ssr: false })
const Avatar09 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-09"), { ssr: false })
const Avatar10 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-10"), { ssr: false })
const Avatar11 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-11"), { ssr: false })
const Avatar12 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-12"), { ssr: false })
const Avatar13 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-13"), { ssr: false })
const Avatar14 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-14"), { ssr: false })
const Avatar15 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-15"), { ssr: false })
const Avatar16 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-16"), { ssr: false })
const Avatar17 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-17"), { ssr: false })
const Avatar18 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-18"), { ssr: false })
const Avatar19 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-19"), { ssr: false })
const Avatar20 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-20"), { ssr: false })
const Avatar21 = dynamic(() => import("@/components/shadcn-studio/avatar/avatar-21"), { ssr: false })

const components = [
  { label: "Avatar 01", Component: Avatar01 },
  { label: "Avatar 02", Component: Avatar02 },
  { label: "Avatar 03", Component: Avatar03 },
  { label: "Avatar 04", Component: Avatar04 },
  { label: "Avatar 05", Component: Avatar05 },
  { label: "Avatar 06", Component: Avatar06 },
  { label: "Avatar 07", Component: Avatar07 },
  { label: "Avatar 08", Component: Avatar08 },
  { label: "Avatar 09", Component: Avatar09 },
  { label: "Avatar 10", Component: Avatar10 },
  { label: "Avatar 11", Component: Avatar11 },
  { label: "Avatar 12", Component: Avatar12 },
  { label: "Avatar 13", Component: Avatar13 },
  { label: "Avatar 14", Component: Avatar14 },
  { label: "Avatar 15", Component: Avatar15 },
  { label: "Avatar 16", Component: Avatar16 },
  { label: "Avatar 17", Component: Avatar17 },
  { label: "Avatar 18", Component: Avatar18 },
  { label: "Avatar 19", Component: Avatar19 },
  { label: "Avatar 20", Component: Avatar20 },
  { label: "Avatar 21", Component: Avatar21 },
]

export default function AvatarGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 21 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Avatar</h1>
        <p className="text-muted-foreground mt-1">User profile pictures with fallback initials and status indicators</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/avatar/avatar-{01..21}"`}</code>
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
