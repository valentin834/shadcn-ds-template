// Gabarits « Connexion » : écran d'authentification en deux colonnes, et sa version mobile.
import { Building2Icon, ImageIcon, LayersIcon, MailIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { pageStyle, text } from "./parts"

function Marque() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex", width: 32, height: 32, alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-lg)", background: "var(--primary)", color: "var(--primary-foreground)" }}>
        <LayersIcon size="16" />
      </div>
      <span style={{ fontSize: 16, lineHeight: "24px", fontWeight: 600 }}>[Produit]</span>
    </div>
  )
}

function FormulaireConnexion({ idPrefix }: { idPrefix: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h1 style={text.h1}>Se connecter</h1>
        <p style={text.muted}>Content de vous revoir. Saisissez vos identifiants ou passez par le compte de votre entreprise.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Button variant="outline" style={{ width: "100%" }}>
          <Building2Icon data-icon="inline-start" />
          Continuer avec le compte de l’entreprise (SSO)
        </Button>
        <Button variant="outline" style={{ width: "100%" }}>
          <MailIcon data-icon="inline-start" />
          Recevoir un lien de connexion par e-mail
        </Button>
      </div>
      <FieldSeparator>ou</FieldSeparator>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor={`${idPrefix}-email`}>Adresse e-mail</FieldLabel>
          <Input id={`${idPrefix}-email`} type="email" placeholder="prenom.nom@entreprise.fr" />
        </Field>
        <Field>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <FieldLabel htmlFor={`${idPrefix}-mdp`}>Mot de passe</FieldLabel>
            <a href="#" style={{ fontSize: 14, lineHeight: "20px", color: "var(--foreground)", textDecoration: "underline", textUnderlineOffset: 4 }}>
              Mot de passe oublié ?
            </a>
          </div>
          <Input id={`${idPrefix}-mdp`} type="password" defaultValue="motdepasse" />
        </Field>
        <Field orientation="horizontal">
          <Checkbox id={`${idPrefix}-rester`} defaultChecked />
          <FieldLabel htmlFor={`${idPrefix}-rester`}>Rester connecté 30 jours</FieldLabel>
        </Field>
        <Button style={{ width: "100%" }}>Se connecter</Button>
        <FieldDescription>
          Pas encore de compte ? <a href="#">Demander un accès</a>
        </FieldDescription>
      </FieldGroup>
    </div>
  )
}

/** Connexion 1440 : formulaire à gauche (SSO, lien magique, identifiants), panneau d'illustration et témoignage à droite. */
export function Connexion() {
  return (
    <div style={{ ...pageStyle, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minHeight: 900 }}>
      <div style={{ display: "flex", flexDirection: "column", padding: "32px 48px" }}>
        <Marque />
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", padding: "48px 0" }}>
          <div style={{ display: "flex", width: "100%", maxWidth: 380 }}>
            <FormulaireConnexion idPrefix="cx" />
          </div>
        </div>
        <p style={text.small}>En vous connectant, vous acceptez les conditions d’utilisation et la politique de confidentialité de [Produit].</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32, margin: 16, padding: 40, borderRadius: "var(--radius-2xl)", background: "var(--muted)" }}>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-xl)", border: "1px dashed var(--border)", color: "var(--muted-foreground)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <ImageIcon />
            <span style={text.small}>[Visuel : capture du produit ou illustration]</span>
          </div>
        </div>
        <figure style={{ display: "flex", flexDirection: "column", gap: 16, margin: 0 }}>
          <blockquote style={{ margin: 0, fontSize: 20, lineHeight: "30px", fontWeight: 500 }}>« Nous avons divisé par deux le temps passé sur les relances, et plus aucune facture ne passe entre les mailles. »</blockquote>
          <figcaption style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar>
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={text.label}>Claire Dubois</span>
              <span style={text.small}>Directrice administrative, Atelier Morel</span>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  )
}

/** Connexion mobile 390 : marque, formulaire pleine largeur, mentions en bas. */
export function ConnexionMobile() {
  return (
    <div style={{ ...pageStyle, display: "flex", flexDirection: "column", gap: 32, minHeight: 844, padding: "24px 20px", boxSizing: "border-box" }}>
      <Marque />
      <FormulaireConnexion idPrefix="cxm" />
      <p style={{ ...text.small, marginTop: "auto" }}>En vous connectant, vous acceptez les conditions d’utilisation et la politique de confidentialité de [Produit].</p>
    </div>
  )
}
