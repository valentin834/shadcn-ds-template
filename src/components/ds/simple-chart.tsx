"use client"

// Graphique prêt à l'emploi bâti sur ChartContainer (recharts) : un type, des
// données et des séries passés en props simples, ce qu'un canevas Claude Design
// sait écrire (`data="{{ventes}}"`). Séries en gris : la première est la plus
// marquée (chart-5), les suivantes de plus en plus discrètes.
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

type SimpleChartSeries = { key: string; label: string }

export type SimpleChartProps = {
  /** "area" (défaut), "bar" ou "line". */
  type?: "area" | "bar" | "line"
  /** Une ligne par point : `{ mois: "Janv.", ca: 182000 }`. */
  data: Record<string, string | number>[]
  /** Clé de l'axe horizontal dans `data` (`mois`). */
  index: string
  /** Séries à tracer, dans l'ordre d'importance : `[{ key: "ca", label: "Chiffre d'affaires" }]`. */
  series: SimpleChartSeries[]
  /** Hauteur en px (240 par défaut). */
  height?: number
  /** Légende sous le graphique. */
  legend?: boolean
  /** Axe vertical avec ses graduations. */
  yAxis?: boolean
  /** Barres empilées (type "bar"). */
  stacked?: boolean
  className?: string
}

const tones = ["var(--chart-5)", "var(--chart-3)", "var(--chart-1)", "var(--chart-4)", "var(--chart-2)"]
const compact = new Intl.NumberFormat("fr-FR", { notation: "compact", maximumFractionDigits: 1 })

function SimpleChart({ type = "area", data, index, series, height = 240, legend = false, yAxis = false, stacked = false, className }: SimpleChartProps) {
  const config = Object.fromEntries(series.map((s, i) => [s.key, { label: s.label, color: tones[i % tones.length] }])) satisfies ChartConfig
  const axes = [
    <CartesianGrid key="grid" vertical={false} />,
    <XAxis key="x" dataKey={index} tickLine={false} axisLine={false} tickMargin={8} minTickGap={16} />,
    yAxis ? <YAxis key="y" tickLine={false} axisLine={false} tickMargin={8} width={48} tickFormatter={(v: number) => compact.format(v)} /> : null,
    <ChartTooltip key="tooltip" cursor={false} content={<ChartTooltipContent indicator={type === "line" ? "line" : "dot"} />} />,
    legend ? <ChartLegend key="legend" content={<ChartLegendContent />} /> : null,
  ]
  return (
    <ChartContainer config={config} className={cn("aspect-auto w-full", className)} style={{ height }}>
      {type === "bar" ? (
        <BarChart data={data} accessibilityLayer>
          {axes}
          {series.map((s) => (
            <Bar key={s.key} dataKey={s.key} fill={`var(--color-${s.key})`} radius={stacked ? 0 : 4} stackId={stacked ? "a" : undefined} isAnimationActive={false} />
          ))}
        </BarChart>
      ) : type === "line" ? (
        <LineChart data={data} accessibilityLayer>
          {axes}
          {series.map((s) => (
            <Line key={s.key} dataKey={s.key} type="monotone" stroke={`var(--color-${s.key})`} strokeWidth={2} dot={false} isAnimationActive={false} />
          ))}
        </LineChart>
      ) : (
        <AreaChart data={data} accessibilityLayer>
          {axes}
          {series.map((s) => (
            <Area key={s.key} dataKey={s.key} type="monotone" stroke={`var(--color-${s.key})`} fill={`var(--color-${s.key})`} fillOpacity={0.12} strokeWidth={2} isAnimationActive={false} />
          ))}
        </AreaChart>
      )}
    </ChartContainer>
  )
}

export { SimpleChart }
