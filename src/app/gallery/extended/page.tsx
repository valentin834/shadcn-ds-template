import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { demos, sourceLabels, type DemoSource } from "./demos"

const sources: DemoSource[] = ["shadcn", "reui", "diceui"]

export default function ExtendedGalleryPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-14">
      <div className="space-y-3">
        <Link href="/gallery" className="text-sm text-muted-foreground hover:text-foreground">
          ← Gallery
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Extended components</h1>
        <p className="max-w-2xl text-muted-foreground">
          New official shadcn/ui components, plus components from ReUI and Dice UI
          installed in their Base UI (base-nova) variant. They use the same tokens
          as the rest of the design system and stay in grayscale.
        </p>
      </div>

      {sources.map((source) => (
        <section key={source} className="space-y-4">
          <h2 className="text-xl font-semibold">{sourceLabels[source]}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {demos
              .filter((demo) => demo.source === source)
              .map((demo) => (
                <Link key={demo.slug} href={`/gallery/extended/${demo.slug}`} className="group block">
                  <Card className="h-full transition-colors group-hover:border-foreground/30">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between gap-2 text-sm">
                        {demo.label}
                        <Badge variant="outline" className="font-mono text-[10px]">
                          {demo.source}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-xs">{demo.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
          </div>
          <Separator />
        </section>
      ))}
    </div>
  )
}
