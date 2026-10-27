import Link from "next/link"
import { notFound } from "next/navigation"

import { Badge } from "@/components/ui/badge"

import { demos } from "../demos"

export const dynamicParams = false

export function generateStaticParams() {
  return demos.map((demo) => ({ slug: demo.slug }))
}

export default async function ExtendedDemoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const demo = demos.find((d) => d.slug === slug)
  if (!demo) notFound()

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <div className="space-y-2">
        <Link href="/gallery/extended" className="text-sm text-muted-foreground hover:text-foreground">
          ← Extended components
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">{demo.label}</h1>
          <Badge variant="outline" className="font-mono">{demo.source}</Badge>
        </div>
        <p className="text-muted-foreground">{demo.desc}</p>
        <code className="block w-fit rounded-md bg-muted px-2 py-1 font-mono text-xs">
          import … from &quot;{demo.importPath}&quot;
        </code>
      </div>
      {demo.demos.map((Demo, i) => (
        <div key={i} className="flex justify-center rounded-xl border p-6">
          <Demo />
        </div>
      ))}
    </div>
  )
}
