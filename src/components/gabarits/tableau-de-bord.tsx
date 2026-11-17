// Gabarits « Tableau de bord » : indicateurs, graphique, objectifs, listes à traiter ; et sa version mobile.
import {
  ArrowRightIcon,
  BellRingIcon,
  CalendarClockIcon,
  DownloadIcon,
  FileWarningIcon,
  MessageSquareIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react"

import { SimpleChart } from "@/components/ds/simple-chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { MobileShell, PageHeader, Shell, text } from "./parts"

const kpis = [
  { label: "Chiffre d’affaires facturé", value: "184 200 €", delta: "+12 %", up: true, detail: "164 300 € en octobre" },
  { label: "Devis signés", value: "18", delta: "−3", up: false, detail: "21 en octobre" },
  { label: "Taux de transformation", value: "32 %", delta: "+4 pts", up: true, detail: "Devis signés sur devis envoyés" },
  { label: "Encours clients", value: "46 800 €", delta: "+6 %", up: false, detail: "Dont 12 400 € en retard" },
]
const ventes = [
  { mois: "Déc.", ca: 131000, objectif: 140000 },
  { mois: "Janv.", ca: 118000, objectif: 140000 },
  { mois: "Févr.", ca: 126000, objectif: 140000 },
  { mois: "Mars", ca: 149000, objectif: 150000 },
  { mois: "Avr.", ca: 157000, objectif: 150000 },
  { mois: "Mai", ca: 151000, objectif: 150000 },
  { mois: "Juin", ca: 142000, objectif: 160000 },
  { mois: "Juil.", ca: 168000, objectif: 160000 },
  { mois: "Août", ca: 121000, objectif: 140000 },
  { mois: "Sept.", ca: 176000, objectif: 170000 },
  { mois: "Oct.", ca: 164300, objectif: 170000 },
  { mois: "Nov.", ca: 184200, objectif: 180000 },
]
const series = [
  { key: "ca", label: "Facturé" },
  { key: "objectif", label: "Objectif" },
]
const objectifs = [
  { label: "Chiffre d’affaires du trimestre", value: 72, detail: "524 500 € sur 730 000 €" },
  { label: "Nouveaux clients", value: 60, detail: "9 sur 15" },
  { label: "Devis relancés sous 7 jours", value: 85, detail: "34 sur 40" },
]
const devis = [
  { n: "D-2026-118", client: "Boréal Logistique", montant: "24 600 €", statut: "Envoyé", variant: "outline", date: "Aujourd’hui" },
  { n: "D-2026-117", client: "Campus Horizon", montant: "8 900 €", statut: "Signé", variant: "secondary", date: "Hier" },
  { n: "D-2026-116", client: "Kerlan Équipements", montant: "41 200 €", statut: "Signé", variant: "secondary", date: "14 nov." },
  { n: "D-2026-115", client: "Maison Castel", montant: "3 400 €", statut: "Refusé", variant: "ghost", date: "12 nov." },
  { n: "D-2026-114", client: "Atelier Morel", montant: "18 400 €", statut: "Sans réponse", variant: "destructive", date: "5 nov." },
] as const
const aTraiter = [
  { titre: "3 factures en retard de paiement", detail: "12 400 € au total, la plus ancienne de 45 jours", Icon: FileWarningIcon },
  { titre: "Devis D-2026-114 sans réponse", detail: "Atelier Morel, envoyé il y a 12 jours", Icon: BellRingIcon },
  { titre: "Rendez-vous demain à 9 h 30", detail: "Revue annuelle avec Campus Horizon", Icon: CalendarClockIcon },
  { titre: "2 messages de clients", detail: "Néosphère Santé, Éditions du Quai", Icon: MessageSquareIcon },
]

function Kpi({ k, size }: { k: (typeof kpis)[number]; size: number }) {
  const Icon = k.up ? TrendingUpIcon : TrendingDownIcon
  return (
    <Card size="sm">
      <CardHeader>
        <CardDescription>{k.label}</CardDescription>
        <CardTitle>
          <span style={{ fontSize: size, lineHeight: 1.25, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{k.value}</span>
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <Icon data-icon="inline-start" />
            {k.delta}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter>
        <span style={text.small}>{k.detail}</span>
      </CardFooter>
    </Card>
  )
}

function Ventes({ type, height }: { type: "area" | "bar"; height: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chiffre d’affaires</CardTitle>
        <CardDescription>Facturé par mois et objectif, sur 12 mois.</CardDescription>
      </CardHeader>
      <CardContent>
        <SimpleChart type={type} data={ventes} index="mois" series={series} height={height} legend yAxis={type === "area"} />
      </CardContent>
    </Card>
  )
}

function ATraiter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>À traiter</CardTitle>
        <CardDescription>4 points demandent votre attention.</CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {aTraiter.map(({ titre, detail, Icon }) => (
            <Item key={titre} size="xs">
              <ItemMedia variant="icon">
                <Icon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{titre}</ItemTitle>
                <ItemDescription>{detail}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}

/** Tableau de bord 1440 : période, 4 indicateurs, graphique, objectifs, derniers devis, points à traiter. */
export function TableauDeBord() {
  return (
    <Shell active="tableau-de-bord" trail={["Activité", "Tableau de bord"]}>
      <PageHeader title="Bonjour Camille" description="L’activité de novembre 2026, comparée à octobre.">
        <ToggleGroup variant="outline" defaultValue={["30j"]}>
          <ToggleGroupItem value="7j">7 jours</ToggleGroupItem>
          <ToggleGroupItem value="30j">30 jours</ToggleGroupItem>
          <ToggleGroupItem value="12m">12 mois</ToggleGroupItem>
        </ToggleGroup>
        <Button variant="outline">
          <DownloadIcon data-icon="inline-start" />
          Exporter
        </Button>
      </PageHeader>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16 }}>
        {kpis.map((k) => (
          <Kpi key={k.label} k={k} size={28} />
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
        <div style={{ gridColumn: "span 2", display: "grid" }}>
          <Ventes type="area" height={260} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Objectifs du trimestre</CardTitle>
            <CardDescription>Au 17 novembre, 59 % du trimestre écoulé.</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {objectifs.map((o) => (
                <div key={o.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <span style={text.label}>{o.label}</span>
                    <span style={{ ...text.label, fontVariantNumeric: "tabular-nums" }}>{o.value} %</span>
                  </div>
                  <Progress value={o.value} aria-label={`${o.label} : ${o.value} %`} />
                  <span style={text.small}>{o.detail}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }}>
        <div style={{ gridColumn: "span 2", display: "grid" }}>
          <Card>
            <CardHeader>
              <CardTitle>Derniers devis</CardTitle>
              <CardDescription>Les 5 devis les plus récents.</CardDescription>
              <CardAction>
                <Button variant="ghost" size="sm">
                  Tous les devis
                  <ArrowRightIcon data-icon="inline-end" />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Devis</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>
                      <div style={{ textAlign: "right" }}>Montant</div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devis.map((d) => (
                    <TableRow key={d.n}>
                      <TableCell>
                        <span style={{ fontFamily: "var(--font-geist-mono)", fontSize: 13 }}>{d.n}</span>
                      </TableCell>
                      <TableCell>{d.client}</TableCell>
                      <TableCell>
                        <Badge variant={d.variant}>{d.statut}</Badge>
                      </TableCell>
                      <TableCell>
                        <span style={{ color: "var(--muted-foreground)" }}>{d.date}</span>
                      </TableCell>
                      <TableCell>
                        <div style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{d.montant}</div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <ATraiter />
      </div>
    </Shell>
  )
}

/** Tableau de bord mobile 390 : période, indicateurs en 2 × 2, graphique en barres, points à traiter, derniers devis. */
export function TableauDeBordMobile() {
  return (
    <MobileShell title="Tableau de bord">
      <ToggleGroup variant="outline" defaultValue={["30j"]}>
        <ToggleGroupItem value="7j">7 jours</ToggleGroupItem>
        <ToggleGroupItem value="30j">30 jours</ToggleGroupItem>
        <ToggleGroupItem value="12m">12 mois</ToggleGroupItem>
      </ToggleGroup>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
        {kpis.map((k) => (
          <Kpi key={k.label} k={k} size={20} />
        ))}
      </div>
      <Ventes type="bar" height={180} />
      <ATraiter />
      <Card>
        <CardHeader>
          <CardTitle>Derniers devis</CardTitle>
        </CardHeader>
        <CardContent>
          <ItemGroup>
            {devis.slice(0, 4).map((d) => (
              <Item key={d.n} variant="outline" size="xs">
                <ItemContent>
                  <ItemTitle>{d.client}</ItemTitle>
                  <ItemDescription>
                    {d.n} · {d.date}
                  </ItemDescription>
                </ItemContent>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <span style={{ ...text.label, fontVariantNumeric: "tabular-nums" }}>{d.montant}</span>
                  <Badge variant={d.variant}>{d.statut}</Badge>
                </div>
              </Item>
            ))}
          </ItemGroup>
        </CardContent>
        <CardFooter>
          <Button variant="outline" style={{ width: "100%" }}>
            Tous les devis
          </Button>
        </CardFooter>
      </Card>
    </MobileShell>
  )
}
