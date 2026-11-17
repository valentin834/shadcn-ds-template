"use client"

import { Example, ExampleWrapper } from "@/components/example"
import { SimpleChart } from "@/components/ds/simple-chart"

const mois = [
  { mois: "Juin", ca: 142000, objectif: 150000 },
  { mois: "Juil.", ca: 168000, objectif: 150000 },
  { mois: "Août", ca: 121000, objectif: 140000 },
  { mois: "Sept.", ca: 176000, objectif: 160000 },
  { mois: "Oct.", ca: 189000, objectif: 170000 },
  { mois: "Nov.", ca: 184200, objectif: 180000 },
]
const series = [
  { key: "ca", label: "Chiffre d’affaires" },
  { key: "objectif", label: "Objectif" },
]

export default function SimpleChartExample() {
  return (
    <ExampleWrapper>
      <Example title="Aires (défaut)">
        <SimpleChart data={mois} index="mois" series={series} legend />
      </Example>
      <Example title="Barres">
        <SimpleChart type="bar" data={mois} index="mois" series={series} yAxis />
      </Example>
      <Example title="Courbes">
        <SimpleChart type="line" data={mois} index="mois" series={series} height={200} />
      </Example>
    </ExampleWrapper>
  )
}
