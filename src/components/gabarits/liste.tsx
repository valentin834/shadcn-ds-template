// Gabarits « Liste » : page liste avec filtres et table, ses états vides, sa version mobile.
import {
  ArrowUpDownIcon,
  Building2Icon,
  ChevronRightIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  CirclePauseIcon,
  Columns3Icon,
  DownloadIcon,
  EllipsisIcon,
  FileUpIcon,
  ListFilterIcon,
  PlusIcon,
  SearchIcon,
  SearchXIcon,
} from "lucide-react"

import { filtersLabelsFr, filtersOperatorLabelsFr } from "@/components/ds/filters-fr"
import { Filters } from "@/components/reui/filters/filters"
import type { FilterField, FilterQuery } from "@/components/reui/filters/filters-types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { MobileShell, PageHeader, Shell, text } from "./parts"

const statuts = {
  actif: { label: "Actif", variant: "secondary", Icon: CircleCheckIcon },
  prospect: { label: "Prospect", variant: "outline", Icon: CircleDashedIcon },
  pause: { label: "En pause", variant: "ghost", Icon: CirclePauseIcon },
  impaye: { label: "Impayé", variant: "destructive", Icon: CircleAlertIcon },
} as const

const clients = [
  { nom: "Atelier Morel", ville: "Saint-Étienne", secteur: "Industrie", resp: "Hugo Bernard", ini: "HB", statut: "actif", ca: "1 250 000 €", activite: "Aujourd’hui" },
  { nom: "Boréal Logistique", ville: "Le Havre", secteur: "Transport", resp: "Camille Martin", ini: "CM", statut: "actif", ca: "842 500 €", activite: "Hier" },
  { nom: "Clinique des Tilleuls", ville: "Lille", secteur: "Santé", resp: "Léa Petit", ini: "LP", statut: "prospect", ca: "—", activite: "12 nov." },
  { nom: "Éditions du Quai", ville: "Paris", secteur: "Médias", resp: "Léa Petit", ini: "LP", statut: "actif", ca: "214 800 €", activite: "10 nov." },
  { nom: "Néosphère Santé", ville: "Lyon", secteur: "Santé", resp: "Nathan Robert", ini: "NR", statut: "impaye", ca: "96 500 €", activite: "8 nov." },
  { nom: "Campus Horizon", ville: "Nantes", secteur: "Éducation", resp: "Camille Martin", ini: "CM", statut: "actif", ca: "157 300 €", activite: "5 nov." },
  { nom: "Maison Castel", ville: "Bordeaux", secteur: "Commerce", resp: "Léa Petit", ini: "LP", statut: "pause", ca: "38 200 €", activite: "28 oct." },
  { nom: "Kerlan Équipements", ville: "Brest", secteur: "Industrie", resp: "Nathan Robert", ini: "NR", statut: "actif", ca: "689 000 €", activite: "21 oct." },
] as const

const filtres: { fields: FilterField[]; query: FilterQuery } = {
  fields: [
    { id: "statut", label: "Statut", type: "select", options: [{ value: "actif", label: "Actif" }, { value: "prospect", label: "Prospect" }, { value: "pause", label: "En pause" }, { value: "impaye", label: "Impayé" }] },
    { id: "secteur", label: "Secteur", type: "select", options: [{ value: "industrie", label: "Industrie" }, { value: "sante", label: "Santé" }, { value: "medias", label: "Médias" }, { value: "transport", label: "Transport" }] },
    { id: "responsable", label: "Responsable", type: "select", options: [{ value: "cm", label: "Camille Martin" }, { value: "hb", label: "Hugo Bernard" }, { value: "lp", label: "Léa Petit" }, { value: "nr", label: "Nathan Robert" }] },
    { id: "ca", label: "CA 12 mois", type: "number" },
  ],
  query: { id: "racine", type: "group", combinator: "and", rules: [{ id: "f1", type: "rule", path: ["statut"], operator: "is_any_of", value: ["actif", "prospect"] }] },
}

const trier = [
  { value: "activite", label: "Dernière activité" },
  { value: "nom", label: "Nom" },
  { value: "ca", label: "Chiffre d’affaires" },
]
const parPage = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
]

function Statut({ statut }: { statut: keyof typeof statuts }) {
  const { label, variant, Icon } = statuts[statut]
  return (
    <Badge variant={variant}>
      <Icon data-icon="inline-start" />
      {label}
    </Badge>
  )
}

function ListeEntete() {
  return (
    <PageHeader title="Clients" description="248 comptes, dont 186 actifs. Le chiffre d’affaires porte sur les 12 derniers mois.">
      <Button variant="outline">
        <DownloadIcon data-icon="inline-start" />
        Exporter
      </Button>
      <Button>
        <PlusIcon data-icon="inline-start" />
        Nouveau client
      </Button>
    </PageHeader>
  )
}

function ListeOnglets() {
  return (
    <Tabs defaultValue="tous">
      <TabsList variant="line">
        <TabsTrigger value="tous">Tous · 248</TabsTrigger>
        <TabsTrigger value="actifs">Actifs · 186</TabsTrigger>
        <TabsTrigger value="prospects">Prospects · 41</TabsTrigger>
        <TabsTrigger value="archives">Archivés · 21</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

function ListeOutils({ filtrer = true }: { filtrer?: boolean }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 8 }}>
      <InputGroup style={{ width: 280 }}>
        <InputGroupInput placeholder="Rechercher un client, une ville" aria-label="Rechercher un client" />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <div style={{ flex: 1, minWidth: 0 }}>
        {filtrer ? (
          <Filters fields={filtres.fields} defaultQuery={filtres.query} labels={filtersLabelsFr} operatorLabels={filtersOperatorLabelsFr} />
        ) : (
          <Button variant="outline">
            <ListFilterIcon data-icon="inline-start" />
            Filtrer
          </Button>
        )}
      </div>
      <Select items={trier} defaultValue="activite">
        <SelectTrigger aria-label="Trier par">
          <ArrowUpDownIcon />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {trier.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant="outline">
        <Columns3Icon data-icon="inline-start" />
        Colonnes
      </Button>
    </div>
  )
}

function ListeTable() {
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", background: "var(--card)", overflow: "hidden" }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div style={{ display: "flex", width: 32, paddingLeft: 8 }}>
                <Checkbox aria-label="Sélectionner toute la page" />
              </div>
            </TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Secteur</TableHead>
            <TableHead>Responsable</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>
              <div style={{ textAlign: "right" }}>CA 12 mois</div>
            </TableHead>
            <TableHead>Dernière activité</TableHead>
            <TableHead>
              <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((c) => (
            <TableRow key={c.nom}>
              <TableCell>
                <div style={{ display: "flex", width: 32, paddingLeft: 8 }}>
                  <Checkbox aria-label={`Sélectionner ${c.nom}`} />
                </div>
              </TableCell>
              <TableCell>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: 500 }}>{c.nom}</span>
                  <span style={text.small}>{c.ville}</span>
                </div>
              </TableCell>
              <TableCell>{c.secteur}</TableCell>
              <TableCell>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar size="sm">
                    <AvatarFallback>{c.ini}</AvatarFallback>
                  </Avatar>
                  {c.resp}
                </div>
              </TableCell>
              <TableCell>
                <Statut statut={c.statut} />
              </TableCell>
              <TableCell>
                <div style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{c.ca}</div>
              </TableCell>
              <TableCell>
                <span style={{ color: "var(--muted-foreground)" }}>{c.activite}</span>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon-sm" aria-label={`Actions pour ${c.nom}`}>
                  <EllipsisIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function ListePied() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
      <p style={text.muted}>Clients 1 à 8 sur 248</p>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={text.label}>Lignes par page</span>
          <Select items={parPage} defaultValue="10">
            <SelectTrigger size="sm" aria-label="Lignes par page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {parPage.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" text="Précédent" aria-label="Page précédente" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">31</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" text="Suivant" aria-label="Page suivante" />
            </PaginationItem>
          </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

/** Page liste : en-tête et actions, onglets de vues, recherche + Filters, table, pagination. */
export function Liste() {
  return (
    <Shell active="clients" trail={["Activité", "Clients"]}>
      <ListeEntete />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <ListeOnglets />
        <ListeOutils />
        <ListeTable />
        <ListePied />
      </div>
    </Shell>
  )
}

/** État vide de première utilisation : aucune donnée, on invite à créer ou importer. */
export function ListeVide() {
  return (
    <Shell active="clients" trail={["Activité", "Clients"]}>
      <PageHeader title="Clients" description="Retrouvez ici les entreprises que vous suivez, leur statut et leur chiffre d’affaires.">
        <Button>
          <PlusIcon data-icon="inline-start" />
          Nouveau client
        </Button>
      </PageHeader>
      <div style={{ border: "1px dashed var(--border)", borderRadius: "var(--radius-xl)", padding: "48px 24px" }}>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Building2Icon />
            </EmptyMedia>
            <EmptyTitle>Aucun client pour l’instant</EmptyTitle>
            <EmptyDescription>Créez votre premier client ou importez une liste existante (CSV ou Excel, jusqu’à 5 000 lignes).</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="outline">
                <FileUpIcon data-icon="inline-start" />
                Importer un fichier
              </Button>
              <Button>
                <PlusIcon data-icon="inline-start" />
                Nouveau client
              </Button>
            </div>
            <Button variant="link" size="sm">
              Voir le modèle d’import
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    </Shell>
  )
}

/** État vide après filtrage : les filtres restent visibles, on propose de les effacer. */
export function ListeSansResultat() {
  return (
    <Shell active="clients" trail={["Activité", "Clients"]}>
      <ListeEntete />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <ListeOnglets />
        <ListeOutils />
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", background: "var(--card)", padding: "56px 24px" }}>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchXIcon />
              </EmptyMedia>
              <EmptyTitle>Aucun client ne correspond</EmptyTitle>
              <EmptyDescription>Aucun résultat pour « Statut est l’un de Actif, Prospect » et « Kerval ». Vérifiez l’orthographe ou élargissez les filtres.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline">Effacer les filtres</Button>
            </EmptyContent>
          </Empty>
        </div>
      </div>
    </Shell>
  )
}

/** Liste mobile 390 : recherche, filtres en bouton, lignes en Item, chargement progressif. */
export function ListeMobile() {
  return (
    <MobileShell
      title="Clients"
      actions={
        <Button size="icon" aria-label="Nouveau client">
          <PlusIcon />
        </Button>
      }
    >
      <InputGroup>
        <InputGroupInput placeholder="Rechercher un client" aria-label="Rechercher un client" />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Button variant="outline" size="sm">
          <ListFilterIcon data-icon="inline-start" />
          Filtres · 1
        </Button>
        <Button variant="ghost" size="sm">
          <ArrowUpDownIcon data-icon="inline-start" />
          Dernière activité
        </Button>
        <span style={{ ...text.small, marginLeft: "auto" }}>248 clients</span>
      </div>
      <ItemGroup>
        {clients.slice(0, 6).map((c) => (
          <Item key={c.nom} variant="outline" size="sm">
            <ItemContent>
              <ItemTitle>{c.nom}</ItemTitle>
              <ItemDescription>
                {c.ville} · {c.secteur}
              </ItemDescription>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <Statut statut={c.statut} />
                <span style={{ ...text.small, color: "var(--foreground)", fontVariantNumeric: "tabular-nums" }}>{c.ca}</span>
              </div>
            </ItemContent>
            <ItemActions>
              <ChevronRightIcon size="16" />
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
      <Button variant="outline">Afficher 20 clients de plus</Button>
    </MobileShell>
  )
}
