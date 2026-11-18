// Gabarit « Paramètres » : navigation secondaire, sections en cartes, lignes réglage + contrôle, zone sensible.
import type * as React from "react"
import { BellIcon, BuildingIcon, CreditCardIcon, KeyRoundIcon, PlugIcon, ShieldCheckIcon, UserIcon, UsersIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

import { PageHeader, Shell, text } from "./parts"

const sections = [
  { key: "entreprise", label: "Entreprise", Icon: BuildingIcon },
  { key: "profil", label: "Mon profil", Icon: UserIcon },
  { key: "notifications", label: "Notifications", Icon: BellIcon },
  { key: "equipe", label: "Équipe et rôles", Icon: UsersIcon },
  { key: "facturation", label: "Facturation", Icon: CreditCardIcon },
  { key: "securite", label: "Sécurité", Icon: ShieldCheckIcon },
  { key: "integrations", label: "Intégrations", Icon: PlugIcon },
  { key: "api", label: "Clés d’API", Icon: KeyRoundIcon },
]
const fuseaux = [
  { value: "paris", label: "(UTC+01:00) Paris" },
  { value: "londres", label: "(UTC+00:00) Londres" },
  { value: "montreal", label: "(UTC−05:00) Montréal" },
]
const langues = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
]
const notifications = [
  { id: "notif-devis", titre: "Devis signé", detail: "Dès qu’un client signe un devis en ligne.", on: true },
  { id: "notif-retard", titre: "Facture en retard", detail: "Chaque lundi, la liste des factures échues.", on: true },
  { id: "notif-mention", titre: "Mentions", detail: "Quand un collègue vous cite dans une note.", on: true },
  { id: "notif-resume", titre: "Résumé hebdomadaire", detail: "L’activité de la semaine, le vendredi à 17 h.", on: false },
]

/** Ligne de réglage : libellé et aide à gauche, contrôle à droite. */
function Ligne({ id, label, aide, children }: { id: string; label: string; aide: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 320px", gap: 24, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label htmlFor={id} style={text.label}>
          {label}
        </label>
        <p style={text.muted}>{aide}</p>
      </div>
      {children}
    </div>
  )
}

/** Paramètres 1440 : navigation des sections à gauche, cartes de réglages, barre d'enregistrement, zone sensible. */
export function Parametres() {
  return (
    <Shell active="parametres" trail={["Administration", "Paramètres"]}>
      <PageHeader title="Paramètres" description="Les réglages de l’espace de travail Atelier Morel, partagés par toute l’équipe." />
      <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
        <nav aria-label="Sections des paramètres" style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 2, width: 220, flexShrink: 0 }}>
          {sections.map(({ key, label, Icon }) => (
            <a
              key={key}
              href={`#${key}`}
              aria-current={key === "entreprise" ? "page" : undefined}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: "var(--radius-md)", fontSize: 14, lineHeight: "20px", fontWeight: key === "entreprise" ? 500 : 400, color: key === "entreprise" ? "var(--foreground)" : "var(--muted-foreground)", background: key === "entreprise" ? "var(--muted)" : "transparent", textDecoration: "none" }}
            >
              <Icon size="16" />
              {label}
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1, minWidth: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Entreprise</CardTitle>
              <CardDescription>Affichées sur les devis, les factures et les e-mails envoyés aux clients.</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <Ligne id="raison" label="Raison sociale" aide="Telle qu’inscrite au registre du commerce.">
                  <Input id="raison" defaultValue="Atelier Morel SAS" />
                </Ligne>
                <FieldSeparator />
                <Ligne id="logo" label="Logo" aide="PNG ou SVG, 512 × 512 px au minimum.">
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar size="lg">
                      <AvatarFallback>AM</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Changer
                    </Button>
                    <Button variant="ghost" size="sm">
                      Retirer
                    </Button>
                  </div>
                </Ligne>
                <FieldSeparator />
                <Ligne id="fuseau" label="Fuseau horaire" aide="Sert aux rappels, aux échéances et aux relances automatiques.">
                  <Select items={fuseaux} defaultValue="paris">
                    <SelectTrigger id="fuseau" style={{ width: "100%" }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fuseaux.map((f) => (
                        <SelectItem key={f.value} value={f.value}>
                          {f.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Ligne>
                <FieldSeparator />
                <Ligne id="langue" label="Langue des documents" aide="Langue des devis et des factures, quel que soit le client.">
                  <Select items={langues} defaultValue="fr">
                    <SelectTrigger id="langue" style={{ width: "100%" }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {langues.map((l) => (
                        <SelectItem key={l.value} value={l.value}>
                          {l.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Ligne>
              </div>
            </CardContent>
            <CardFooter>
              <div style={{ display: "flex", width: "100%", justifyContent: "flex-end", gap: 8 }}>
                <Button variant="outline">Annuler</Button>
                <Button>Enregistrer</Button>
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Ce que l’équipe reçoit par e-mail. Chacun peut ajuster les siennes dans Mon profil.</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {notifications.map((n) => (
                  <Field key={n.id} orientation="horizontal">
                    <FieldContent>
                      <FieldLabel htmlFor={n.id}>{n.titre}</FieldLabel>
                      <FieldDescription>{n.detail}</FieldDescription>
                    </FieldContent>
                    <Switch id={n.id} defaultChecked={n.on} />
                  </Field>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Zone sensible</CardTitle>
              <CardDescription>Ces actions sont définitives et touchent toute l’équipe.</CardDescription>
            </CardHeader>
            <CardContent>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: 16, border: "1px solid var(--border)", borderRadius: "var(--radius-lg)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={text.label}>Supprimer l’espace de travail</span>
                  <span style={text.muted}>Clients, devis et factures sont effacés après 30 jours. Exportez-les d’abord.</span>
                </div>
                <Button variant="destructive">Supprimer l’espace</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  )
}
