// Pièces communes des gabarits applicatifs : sidebar, barre du haut, en-tête de page.
// Règles des gabarits (ils deviennent des artboards Claude Design, voir
// tools/claude-design/gen-gabarits.mjs) : composants du design system + markup en
// styles en ligne avec les variables du thème, pas de hook, pas de className, pas
// d'élément React passé en prop. Un `style` sur un composant ne sert qu'à le placer
// ou le dimensionner (width, flex, margin) : sur un canevas, il s'applique à son slot.
import type * as React from "react"
import {
  BellIcon,
  Building2Icon,
  ChevronsUpDownIcon,
  CircleHelpIcon,
  FileTextIcon,
  FolderKanbanIcon,
  LayersIcon,
  LayoutDashboardIcon,
  MenuIcon,
  ReceiptTextIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

/** Racine d'une page : fond, texte et police du thème. */
export const pageStyle: React.CSSProperties = {
  background: "var(--background)",
  color: "var(--foreground)",
  fontFamily: "var(--font-geist-sans)",
}

export const text = {
  h1: { margin: 0, fontSize: 24, lineHeight: "32px", fontWeight: 600, letterSpacing: "-0.01em" },
  h2: { margin: 0, fontSize: 16, lineHeight: "24px", fontWeight: 600 },
  body: { margin: 0, fontSize: 14, lineHeight: "20px" },
  muted: { margin: 0, fontSize: 14, lineHeight: "20px", color: "var(--muted-foreground)" },
  small: { margin: 0, fontSize: 12, lineHeight: "16px", color: "var(--muted-foreground)" },
  label: { margin: 0, fontSize: 14, lineHeight: "20px", fontWeight: 500 },
} satisfies Record<string, React.CSSProperties>

const navigation = [
  { key: "tableau-de-bord", label: "Tableau de bord", Icon: LayoutDashboardIcon },
  { key: "clients", label: "Clients", Icon: Building2Icon, count: "248" },
  { key: "devis", label: "Devis", Icon: FileTextIcon, count: "12" },
  { key: "factures", label: "Factures", Icon: ReceiptTextIcon },
  { key: "projets", label: "Projets", Icon: FolderKanbanIcon },
]
const administration = [
  { key: "equipe", label: "Équipe", Icon: UsersIcon },
  { key: "parametres", label: "Paramètres", Icon: SettingsIcon },
]

/** Sidebar de l'application : produit, navigation principale, administration, compte. */
export function ShellSidebar({ active }: { active: string }) {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div style={{ display: "flex", width: 32, height: 32, flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-lg)", background: "var(--sidebar-primary)", color: "var(--sidebar-primary-foreground)" }}>
                <LayersIcon />
              </div>
              <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, textAlign: "left" }}>
                <span style={{ fontSize: 14, lineHeight: "18px", fontWeight: 600 }}>[Produit]</span>
                <span style={{ fontSize: 12, lineHeight: "16px", color: "var(--muted-foreground)" }}>[Nom de l’entreprise]</span>
              </div>
              <ChevronsUpDownIcon />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Activité</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map(({ key, label, Icon, count }) => (
                <SidebarMenuItem key={key}>
                  <SidebarMenuButton isActive={key === active}>
                    <Icon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                  {count ? <SidebarMenuBadge>{count}</SidebarMenuBadge> : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {administration.map(({ key, label, Icon }) => (
                <SidebarMenuItem key={key}>
                  <SidebarMenuButton isActive={key === active}>
                    <Icon />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <CircleHelpIcon />
              <span>Aide et support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" aria-label="Compte de Camille Martin">
              <Avatar>
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, textAlign: "left" }}>
                <span style={{ fontSize: 14, lineHeight: "18px", fontWeight: 500 }}>Camille Martin</span>
                <span style={{ fontSize: 12, lineHeight: "16px", color: "var(--muted-foreground)" }}>camille@entreprise.fr</span>
              </div>
              <ChevronsUpDownIcon />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

/** Barre du haut : bascule de la sidebar, fil d'Ariane, recherche, notifications. */
export function ShellHeader({ trail }: { trail: string[] }) {
  return (
    <header style={{ display: "flex", height: 56, flexShrink: 0, alignItems: "center", gap: 8, padding: "0 16px", borderBottom: "1px solid var(--border)", boxSizing: "border-box" }}>
      <SidebarTrigger aria-label="Afficher ou masquer la navigation" />
      <div style={{ display: "flex", height: 16, margin: "0 4px" }}>
        <Separator orientation="vertical" />
      </div>
      <Breadcrumb>
        <BreadcrumbList>
          {trail.map((step, i) =>
            i < trail.length - 1 ? (
              [
                <BreadcrumbItem key={step}>
                  <BreadcrumbLink href="#">{step}</BreadcrumbLink>
                </BreadcrumbItem>,
                <BreadcrumbSeparator key={`${step}-sep`} />,
              ]
            ) : (
              <BreadcrumbItem key={step}>
                <BreadcrumbPage>{step}</BreadcrumbPage>
              </BreadcrumbItem>
            )
          )}
        </BreadcrumbList>
      </Breadcrumb>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
        <InputGroup style={{ width: 280 }}>
          <InputGroupInput placeholder="Rechercher" aria-label="Rechercher dans [Produit]" />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>⌘K</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <BellIcon />
        </Button>
      </div>
    </header>
  )
}

/** En-tête de page : titre, description, actions à droite. */
export function PageHeader({ title, description, children }: { title: string; description?: string; children?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
        <h1 style={text.h1}>{title}</h1>
        {description ? <p style={text.muted}>{description}</p> : null}
      </div>
      {children ? <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>{children}</div> : null}
    </div>
  )
}

/** Page applicative 1440 : sidebar + contenu (barre du haut, puis la page). */
export function Shell({ active, trail, children }: { active: string; trail: string[]; children?: React.ReactNode }) {
  return (
    <div style={pageStyle}>
      <SidebarProvider>
        <ShellSidebar active={active} />
        <SidebarInset>
          <ShellHeader trail={trail} />
          <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%", maxWidth: 1184, padding: "32px 32px 48px", boxSizing: "border-box" }}>
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

/** Barre du haut mobile (390) : menu, titre de la page, action. */
export function MobileHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <header style={{ display: "flex", height: 56, flexShrink: 0, alignItems: "center", gap: 8, padding: "0 8px 0 4px", borderBottom: "1px solid var(--border)", background: "var(--background)", boxSizing: "border-box" }}>
      <Button variant="ghost" size="icon" aria-label="Ouvrir le menu">
        <MenuIcon />
      </Button>
      <span style={{ flex: 1, minWidth: 0, fontSize: 16, lineHeight: "24px", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</span>
      {children}
    </header>
  )
}

/** Page mobile 390 × 844 : barre du haut, puis la page. */
export function MobileShell({ title, actions, children }: { title: string; actions?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div style={{ ...pageStyle, display: "flex", flexDirection: "column", minHeight: 844 }}>
      <MobileHeader title={title}>{actions}</MobileHeader>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>{children}</div>
    </div>
  )
}
