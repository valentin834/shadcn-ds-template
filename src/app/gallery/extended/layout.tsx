import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toast"

// Some demos fire toasts: Base UI `toast` (ui/toast) and `sonner` (ui/sonner).
export default function ExtendedGalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Toaster>
      {children}
      <SonnerToaster />
    </Toaster>
  )
}
