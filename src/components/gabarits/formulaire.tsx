// Gabarits « Formulaire en étapes » : création guidée avec Stepper, et sa version mobile.
import { CheckIcon, PencilIcon, XIcon } from "lucide-react"

import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperNav, StepperSeparator, StepperTitle, StepperTrigger } from "@/components/reui/stepper"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import { pageStyle, text } from "./parts"

const etapes = [
  { n: 1, titre: "Entreprise", detail: "Identité et adresse" },
  { n: 2, titre: "Contact", detail: "Interlocuteur principal" },
  { n: 3, titre: "Offre", detail: "Formule et démarrage" },
  { n: 4, titre: "Validation", detail: "Relire et créer" },
]
const formules = [
  { value: "essentiel", titre: "Essentiel", detail: "Maintenance corrective, intervention sous 72 h.", prix: "490 € / mois" },
  { value: "pro", titre: "Pro", detail: "Préventif trimestriel, intervention sous 24 h, rapport mensuel.", prix: "1 150 € / mois" },
  { value: "sur-mesure", titre: "Sur mesure", detail: "Équipe dédiée et engagements définis ensemble.", prix: "Sur devis" },
]
const options = [
  { id: "astreinte", titre: "Astreinte le week-end", detail: "+ 180 € / mois" },
  { id: "formation", titre: "Formation des opérateurs", detail: "2 sessions par an, sur site" },
]
const durees = [
  { value: "12", label: "12 mois" },
  { value: "24", label: "24 mois" },
  { value: "36", label: "36 mois" },
]
const recap = [
  { etape: "Entreprise", lignes: ["Atelier Morel SAS", "SIRET 812 345 678 00021", "42000 Saint-Étienne"] },
  { etape: "Contact", lignes: ["Julien Morel, directeur général", "julien.morel@atelier-morel.fr"] },
]

function Formules({ idPrefix }: { idPrefix: string }) {
  return (
    <FieldSet>
      <FieldLegend variant="label">Formule</FieldLegend>
      <FieldDescription>Modifiable à chaque date anniversaire du contrat.</FieldDescription>
      <RadioGroup defaultValue="pro">
        {formules.map((f) => (
          <FieldLabel key={f.value} htmlFor={`${idPrefix}-${f.value}`}>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>{f.titre}</FieldTitle>
                <FieldDescription>{f.detail}</FieldDescription>
              </FieldContent>
              <span style={{ ...text.label, whiteSpace: "nowrap" }}>{f.prix}</span>
              <RadioGroupItem value={f.value} id={`${idPrefix}-${f.value}`} />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </FieldSet>
  )
}

function Demarrage({ columns, idPrefix }: { columns: number; idPrefix: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gap: 16 }}>
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-debut`}>Date de démarrage</FieldLabel>
        <Input id={`${idPrefix}-debut`} defaultValue="05/01/2027" />
        <FieldDescription>Au plus tôt dans 10 jours ouvrés.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-duree`}>Durée d’engagement</FieldLabel>
        <Select items={durees} defaultValue="24">
          <SelectTrigger id={`${idPrefix}-duree`} style={{ width: "100%" }}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {durees.map((d) => (
              <SelectItem key={d.value} value={d.value}>
                {d.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </div>
  )
}

function Options({ idPrefix }: { idPrefix: string }) {
  return (
    <FieldSet>
      <FieldLegend variant="label">Options</FieldLegend>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {options.map((o, i) => (
          <Field key={o.id} orientation="horizontal">
            <Checkbox id={`${idPrefix}-${o.id}`} defaultChecked={i === 0} />
            <FieldContent>
              <FieldLabel htmlFor={`${idPrefix}-${o.id}`}>{o.titre}</FieldLabel>
              <FieldDescription>{o.detail}</FieldDescription>
            </FieldContent>
          </Field>
        ))}
      </div>
    </FieldSet>
  )
}

function Remarques({ idPrefix }: { idPrefix: string }) {
  return (
    <Field>
      <FieldLabel htmlFor={`${idPrefix}-remarques`}>Remarques pour l’équipe</FieldLabel>
      <Textarea id={`${idPrefix}-remarques`} placeholder="Contraintes d’accès au site, horaires, interlocuteurs sur place…" />
    </Field>
  )
}

/** Formulaire en étapes 1440 : barre de sortie, Stepper, étape courante en carte, récapitulatif des étapes faites. */
export function FormulaireEtapes() {
  return (
    <div style={{ ...pageStyle, display: "flex", flexDirection: "column", minHeight: 900 }}>
      <header style={{ display: "flex", height: 64, flexShrink: 0, alignItems: "center", gap: 12, padding: "0 24px", borderBottom: "1px solid var(--border)", boxSizing: "border-box" }}>
        <Button variant="ghost" size="icon" aria-label="Fermer sans créer">
          <XIcon />
        </Button>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ ...text.label, fontSize: 16, lineHeight: "24px", fontWeight: 600 }}>Nouveau client</span>
          <span style={text.small}>Brouillon enregistré à 10 h 42</span>
        </div>
        <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
          <Button variant="ghost">Enregistrer le brouillon</Button>
        </div>
      </header>
      <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%", maxWidth: 1040, margin: "0 auto", padding: "32px 32px 48px", boxSizing: "border-box" }}>
        <Stepper defaultValue={3}>
          <StepperNav>
            {etapes.map((e) => (
              <StepperItem key={e.n} step={e.n}>
                <StepperTrigger>
                  <StepperIndicator>{e.n < 3 ? <CheckIcon size="14" /> : e.n}</StepperIndicator>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, textAlign: "left" }}>
                    <StepperTitle>{e.titre}</StepperTitle>
                    <StepperDescription>{e.detail}</StepperDescription>
                  </div>
                </StepperTrigger>
                {e.n < etapes.length ? <StepperSeparator /> : null}
              </StepperItem>
            ))}
          </StepperNav>
        </Stepper>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Offre</CardTitle>
                <CardDescription>Étape 3 sur 4 · Choisissez la formule et la date de démarrage du contrat.</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Formules idPrefix="offre" />
                  <Demarrage columns={2} idPrefix="offre" />
                  <Options idPrefix="offre" />
                  <Remarques idPrefix="offre" />
                </FieldGroup>
              </CardContent>
              <CardFooter>
                <div style={{ display: "flex", width: "100%", alignItems: "center", gap: 8 }}>
                  <Button variant="outline">Précédent</Button>
                  <span style={{ ...text.small, marginLeft: "auto" }}>Les champs sont obligatoires sauf mention contraire.</span>
                  <Button>Continuer</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          <aside style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 16, width: 300, flexShrink: 0 }}>
            <Card size="sm">
              <CardHeader>
                <CardTitle>Récapitulatif</CardTitle>
                <CardDescription>Ce qui est déjà renseigné.</CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {recap.map((r, i) => (
                    <div key={r.etape} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {i > 0 ? <Separator /> : null}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={text.label}>{r.etape}</span>
                        <Button variant="ghost" size="xs">
                          <PencilIcon data-icon="inline-start" />
                          Modifier
                        </Button>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {r.lignes.map((l) => (
                          <span key={l} style={text.muted}>
                            {l}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Separator />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={text.label}>Offre</span>
                    <Badge variant="outline">En cours</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}

/** Formulaire en étapes mobile 390 : progression en barre, champs empilés, actions collées en bas. */
export function FormulaireEtapesMobile() {
  return (
    <div style={{ ...pageStyle, display: "flex", flexDirection: "column", minHeight: 844 }}>
      <header style={{ display: "flex", height: 56, flexShrink: 0, alignItems: "center", gap: 8, padding: "0 16px 0 4px", borderBottom: "1px solid var(--border)", boxSizing: "border-box" }}>
        <Button variant="ghost" size="icon" aria-label="Fermer sans créer">
          <XIcon />
        </Button>
        <span style={{ flex: 1, fontSize: 16, lineHeight: "24px", fontWeight: 600 }}>Nouveau client</span>
        <span style={text.small}>3 sur 4</span>
      </header>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "16px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={text.label}>Offre</span>
          <span style={text.small}>Ensuite : validation</span>
        </div>
        <Progress value={75} aria-label="Étape 3 sur 4" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "24px 16px" }}>
        <FieldGroup>
          <Formules idPrefix="offre-m" />
          <Demarrage columns={1} idPrefix="offre-m" />
          <Options idPrefix="offre-m" />
          <Remarques idPrefix="offre-m" />
        </FieldGroup>
      </div>
      <div style={{ position: "sticky", bottom: 0, display: "flex", gap: 8, padding: "12px 16px 24px", borderTop: "1px solid var(--border)", background: "var(--background)" }}>
        <Button variant="outline">Précédent</Button>
        <div style={{ flex: 1 }}>
          <Button style={{ width: "100%" }}>Continuer</Button>
        </div>
      </div>
    </div>
  )
}
