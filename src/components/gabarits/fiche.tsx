// Gabarits « Fiche détail » : en-tête titre + actions, corps, colonne latérale sticky,
// blocs de redirection, bloc de rebond ; et sa version mobile.
import {
  ArrowLeftIcon,
  CalendarPlusIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  EllipsisIcon,
  FileTextIcon,
  FolderKanbanIcon,
  MailIcon,
  PencilIcon,
  PhoneIcon,
  PlusIcon,
  ReceiptTextIcon,
  SendIcon,
  TrendingUpIcon,
} from "lucide-react"

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/reui/timeline"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { pageStyle, Shell, text } from "./parts"

const infos = [
  { label: "Raison sociale", value: "Atelier Morel SAS" },
  { label: "Secteur", value: "Industrie · usinage de précision" },
  { label: "Effectif", value: "85 salariés" },
  { label: "Adresse", value: "12 rue des Forges, 42000 Saint-Étienne" },
  { label: "Site web", value: "atelier-morel.fr" },
  { label: "TVA intracommunautaire", value: "FR 32 812345678" },
]
const acces = [
  { titre: "Devis en cours", detail: "3 devis · 48 500 €", Icon: FileTextIcon },
  { titre: "Factures à encaisser", detail: "1 facture · 12 400 €", Icon: ReceiptTextIcon },
  { titre: "Projets actifs", detail: "2 projets · livraison en janvier", Icon: FolderKanbanIcon },
]
const historique = [
  { date: "Aujourd’hui, 10 h 12", titre: "Devis D-2026-114 consulté", detail: "Julien Morel a ouvert le devis pour la seconde fois." },
  { date: "5 nov. 2026", titre: "Devis D-2026-114 envoyé", detail: "Maintenance annuelle du parc machines · 18 400 €." },
  { date: "28 oct. 2026", titre: "Rendez-vous sur site", detail: "Visite de l’atelier avec Camille Martin et le responsable production." },
  { date: "14 oct. 2026", titre: "Facture F-2026-388 payée", detail: "32 900 €, réglée en 31 jours." },
]
const suites = [
  { titre: "Relancer le devis D-2026-114", detail: "Envoyé il y a 12 jours, sans réponse · 18 400 €", action: "Relancer", Icon: SendIcon },
  { titre: "Planifier la revue annuelle", detail: "Dernière revue le 14 novembre 2025", action: "Planifier", Icon: CalendarPlusIcon },
]
const similaires = [
  { nom: "Kerlan Équipements", detail: "Industrie · Brest", ini: "KE" },
  { nom: "Fonderie Valette", detail: "Industrie · Roanne", ini: "FV" },
  { nom: "Mécanique Durand", detail: "Industrie · Annecy", ini: "MD" },
]
const resume = [
  { label: "Encours", value: "12 400 €" },
  { label: "Délai de paiement moyen", value: "38 jours" },
  { label: "Devis signés", value: "7 sur 9" },
]

function Identite({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: compact ? 12 : 16, minWidth: 0 }}>
      <div style={{ display: "flex", width: compact ? 48 : 56, height: compact ? 48 : 56, flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-xl)", background: "var(--muted)", fontSize: compact ? 16 : 18, fontWeight: 600 }}>AM</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
          <h1 style={compact ? { ...text.h1, fontSize: 20, lineHeight: "28px" } : text.h1}>Atelier Morel</h1>
          <Badge variant="secondary">
            <CircleCheckIcon data-icon="inline-start" />
            Actif
          </Badge>
          {compact ? null : <Badge variant="outline">Client depuis 2019</Badge>}
        </div>
        <p style={text.muted}>{compact ? "Industrie · Saint-Étienne" : "Industrie · Saint-Étienne · SIRET 812 345 678 00021"}</p>
      </div>
    </div>
  )
}

function Informations({ columns }: { columns: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations</CardTitle>
        <CardDescription>Données légales et coordonnées de l’entreprise.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            <PencilIcon data-icon="inline-start" />
            Modifier
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <dl style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: "16px 24px", margin: 0 }}>
          {infos.map((i) => (
            <div key={i.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <dt style={text.small}>{i.label}</dt>
              <dd style={{ ...text.body, margin: 0 }}>{i.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}

function Acces({ columns }: { columns: number }) {
  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h2 style={text.h2}>Accès rapides</h2>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: 12 }}>
        {acces.map(({ titre, detail, Icon }) => (
          <Item key={titre} variant="outline">
            <ItemMedia variant="icon">
              <Icon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{titre}</ItemTitle>
              <ItemDescription>{detail}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon size="16" />
            </ItemActions>
          </Item>
        ))}
      </div>
    </section>
  )
}

function Historique() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
        <CardAction>
          <Button variant="link" size="sm">
            Tout l’historique
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Timeline defaultValue={4}>
          {historique.map((h, i) => (
            <TimelineItem key={h.titre} step={i + 1}>
              <TimelineHeader>
                <TimelineDate>{h.date}</TimelineDate>
                <TimelineTitle>{h.titre}</TimelineTitle>
              </TimelineHeader>
              <TimelineIndicator />
              <TimelineSeparator />
              <TimelineContent>{h.detail}</TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  )
}

function Rebond({ columns }: { columns: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Et ensuite ?</CardTitle>
        <CardDescription>Les prochaines actions suggérées pour ce client.</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <ItemGroup>
            {suites.map(({ titre, detail, action, Icon }) => (
              <Item key={titre} variant="muted" size="sm">
                <ItemMedia variant="icon">
                  <Icon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{titre}</ItemTitle>
                  <ItemDescription>{detail}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button variant="outline" size="sm">
                    {action}
                  </Button>
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
          <Separator />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={text.label}>Clients similaires</span>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: 8 }}>
              {similaires.map((c) => (
                <Item key={c.nom} variant="outline" size="xs">
                  <Avatar size="sm">
                    <AvatarFallback>{c.ini}</AvatarFallback>
                  </Avatar>
                  <ItemContent>
                    <ItemTitle>{c.nom}</ItemTitle>
                    <ItemDescription>{c.detail}</ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Resume() {
  return (
    <Card size="sm">
      <CardHeader>
        <CardDescription>Chiffre d’affaires 12 mois</CardDescription>
        <CardTitle>
          <span style={{ fontSize: 24, lineHeight: "32px", fontVariantNumeric: "tabular-nums" }}>1 250 000 €</span>
        </CardTitle>
        <CardAction>
          <Badge variant="secondary">
            <TrendingUpIcon data-icon="inline-start" />
            +8 %
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {resume.map((r) => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <span style={text.muted}>{r.label}</span>
              <span style={{ ...text.label, fontVariantNumeric: "tabular-nums" }}>{r.value}</span>
            </div>
          ))}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={text.muted}>Objectif 2026</span>
              <span style={text.label}>78 %</span>
            </div>
            <Progress value={78} aria-label="Objectif 2026 atteint à 78 %" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Personne({ titre, ini, nom, role, lignes }: { titre: string; ini: string; nom: string; role: string; lignes?: string[] }) {
  return (
    <Card size="sm">
      <CardHeader>
        <CardDescription>{titre}</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar size="lg">
              <AvatarFallback>{ini}</AvatarFallback>
            </Avatar>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
              <span style={text.label}>{nom}</span>
              <span style={text.small}>{role}</span>
            </div>
            <Button variant="outline" size="icon-sm" aria-label={`Écrire à ${nom}`}>
              <MailIcon />
            </Button>
            <Button variant="outline" size="icon-sm" aria-label={`Appeler ${nom}`}>
              <PhoneIcon />
            </Button>
          </div>
          {lignes ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {lignes.map((l) => (
                <span key={l} style={text.muted}>
                  {l}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}

/** Fiche détail 1440 : en-tête, onglets, corps (informations, accès rapides, activité, rebond), colonne latérale sticky. */
export function FicheDetail() {
  return (
    <Shell active="clients" trail={["Activité", "Clients", "Atelier Morel"]}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <Button variant="ghost" size="sm">
            <ArrowLeftIcon data-icon="inline-start" />
            Clients
          </Button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <Identite />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Button variant="outline">
              <PencilIcon data-icon="inline-start" />
              Modifier
            </Button>
            <Button variant="outline" size="icon" aria-label="Plus d’actions">
              <EllipsisIcon />
            </Button>
            <Button>
              <PlusIcon data-icon="inline-start" />
              Nouveau devis
            </Button>
          </div>
        </div>
        <Tabs defaultValue="apercu">
          <TabsList variant="line">
            <TabsTrigger value="apercu">Aperçu</TabsTrigger>
            <TabsTrigger value="contacts">Contacts · 4</TabsTrigger>
            <TabsTrigger value="devis">Devis · 9</TabsTrigger>
            <TabsTrigger value="factures">Factures · 23</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1, minWidth: 0 }}>
          <Informations columns={2} />
          <Acces columns={3} />
          <Historique />
          <Rebond columns={3} />
        </div>
        <aside style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 16, width: 320, flexShrink: 0 }}>
          <Resume />
          <Personne titre="Responsable du compte" ini="CM" nom="Camille Martin" role="Chargée de compte" />
          <Personne titre="Contact principal" ini="JM" nom="Julien Morel" role="Directeur général" lignes={["julien.morel@atelier-morel.fr", "04 77 12 34 56"]} />
        </aside>
      </div>
    </Shell>
  )
}

/** Fiche détail mobile 390 : retour, identité, actions, onglets, résumé, puis le corps en une colonne. */
export function FicheDetailMobile() {
  return (
    <div style={{ ...pageStyle, display: "flex", flexDirection: "column", minHeight: 844 }}>
      <header style={{ display: "flex", height: 56, flexShrink: 0, alignItems: "center", gap: 8, padding: "0 8px 0 4px", borderBottom: "1px solid var(--border)", boxSizing: "border-box" }}>
        <Button variant="ghost" size="icon" aria-label="Retour aux clients">
          <ArrowLeftIcon />
        </Button>
        <span style={{ flex: 1, minWidth: 0, fontSize: 16, lineHeight: "24px", fontWeight: 600 }}>Clients</span>
        <Button variant="ghost" size="icon" aria-label="Plus d’actions">
          <EllipsisIcon />
        </Button>
      </header>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
        <Identite compact />
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ flex: 1 }}>
            <Button style={{ width: "100%" }}>
              <PlusIcon data-icon="inline-start" />
              Nouveau devis
            </Button>
          </div>
          <Button variant="outline" size="icon" aria-label="Appeler Julien Morel">
            <PhoneIcon />
          </Button>
          <Button variant="outline" size="icon" aria-label="Écrire à Julien Morel">
            <MailIcon />
          </Button>
        </div>
        <Tabs defaultValue="apercu">
          <TabsList variant="line">
            <TabsTrigger value="apercu">Aperçu</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="devis">Devis</TabsTrigger>
            <TabsTrigger value="factures">Factures</TabsTrigger>
          </TabsList>
        </Tabs>
        <Resume />
        <Acces columns={1} />
        <Informations columns={1} />
        <Rebond columns={1} />
      </div>
    </div>
  )
}
