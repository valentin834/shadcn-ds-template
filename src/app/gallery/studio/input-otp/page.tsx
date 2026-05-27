"use client"

import dynamic from 'next/dynamic'

const InputOtp01 = dynamic(() => import("@/components/shadcn-studio/input-otp/input-otp-01"), { ssr: false })
const InputOtp02 = dynamic(() => import("@/components/shadcn-studio/input-otp/input-otp-02"), { ssr: false })
const InputOtp03 = dynamic(() => import("@/components/shadcn-studio/input-otp/input-otp-03"), { ssr: false })
const InputOtp04 = dynamic(() => import("@/components/shadcn-studio/input-otp/input-otp-04"), { ssr: false })
const InputOtp05 = dynamic(() => import("@/components/shadcn-studio/input-otp/input-otp-05"), { ssr: false })
const InputOtp06 = dynamic(() => import("@/components/shadcn-studio/input-otp/input-otp-06"), { ssr: false })
const InputOtp07 = dynamic(() => import("@/components/shadcn-studio/input-otp/input-otp-07"), { ssr: false })
const InputOtp08 = dynamic(() => import("@/components/shadcn-studio/input-otp/input-otp-08"), { ssr: false })
const InputOtp09 = dynamic(() => import("@/components/shadcn-studio/input-otp/input-otp-09"), { ssr: false })
const InputOtp10 = dynamic(() => import("@/components/shadcn-studio/input-otp/input-otp-10"), { ssr: false })

const components = [
  { label: "Input Otp 01", Component: InputOtp01 },
  { label: "Input Otp 02", Component: InputOtp02 },
  { label: "Input Otp 03", Component: InputOtp03 },
  { label: "Input Otp 04", Component: InputOtp04 },
  { label: "Input Otp 05", Component: InputOtp05 },
  { label: "Input Otp 06", Component: InputOtp06 },
  { label: "Input Otp 07", Component: InputOtp07 },
  { label: "Input Otp 08", Component: InputOtp08 },
  { label: "Input Otp 09", Component: InputOtp09 },
  { label: "Input Otp 10", Component: InputOtp10 },
]

export default function InputOtpGalleryPage() {
  return (
    <div className="space-y-12 px-6 py-10 max-w-6xl mx-auto">
      <div className="border-b pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">shadcnstudio — 10 variants</p>
        <h1 className="text-3xl font-bold tracking-tight">Input Otp</h1>
        <p className="text-muted-foreground mt-1">One-time password entry — 6-digit verification codes</p>
        <code className="text-xs mt-2 block text-muted-foreground">{`import Component from "@/components/shadcn-studio/input-otp/input-otp-{01..10}"`}</code>
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
