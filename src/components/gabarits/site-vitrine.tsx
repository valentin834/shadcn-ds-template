// Gabarits « Site vitrine » : header et navigation, hero, sections, footer.
// Pensés mobile d'abord : SiteVitrineMobile (390) est la référence, SiteVitrine (1440)
// en est l'élargissement, SiteMenuMobile montre la navigation ouverte.
import {
  ArrowRightIcon,
  ChartNoAxesColumnIcon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  GraduationCapIcon,
  ImageIcon,
  MenuIcon,
  PlayCircleIcon,
  XIcon,
} from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"

import { pageStyle, text } from "./parts"

const liens = ["Fonctionnalités", "Tarifs", "Clients", "Ressources"]
const benefices = [
  { titre: "Un référentiel de compétences vivant", detail: "Chaque poste a ses compétences attendues. Les écarts apparaissent dès qu’une évaluation est faite.", Icon: ClipboardCheckIcon },
  { titre: "Des formations qui suivent", detail: "Inscriptions, présences et attestations au même endroit, rattachées à chaque collaborateur.", Icon: GraduationCapIcon },
  { titre: "Des bilans prêts pour la direction", detail: "Taux de couverture, budget consommé, obligations à venir : le rapport se fait seul.", Icon: ChartNoAxesColumnIcon },
]
const etapes = [
  { titre: "Importez vos équipes", detail: "Depuis votre SIRH ou un fichier Excel, en une dizaine de minutes." },
  { titre: "Décrivez les postes", detail: "Partez de nos 60 référentiels métiers, ajustez-les avec les managers." },
  { titre: "Évaluez et formez", detail: "Les managers évaluent, [Marque] propose les formations qui comblent les écarts." },
]
const chiffres = [
  { valeur: "−40 %", detail: "de temps passé sur le reporting formation" },
  { valeur: "3 semaines", detail: "pour déployer, accompagnement compris" },
  { valeur: "98 %", detail: "des clients renouvellent après un an" },
]
const questions = [
  { q: "Combien de temps faut-il pour démarrer ?", r: "Trois semaines en moyenne : une semaine d’import et de paramétrage, deux semaines pour décrire les postes avec les managers. Une cheffe de projet vous accompagne du début à la fin." },
  { q: "Peut-on connecter notre SIRH ?", r: "Oui. [Marque] se synchronise chaque nuit avec les principaux SIRH du marché, ou par fichier sécurisé." },
  { q: "Où sont hébergées nos données ?", r: "En France, chez un hébergeur certifié HDS et ISO 27001." },
  { q: "Comment est calculé le prix ?", r: "Par collaborateur suivi et par an, dégressif à partir de 200 personnes. Les managers et les RH ne sont pas comptés." },
  { q: "Peut-on essayer avant de s’engager ?", r: "Oui, avec un pilote de deux mois sur une équipe, remboursé si vous ne poursuivez pas." },
]
const colonnes = [
  { titre: "Produit", liens: ["Fonctionnalités", "Tarifs", "Sécurité", "Nouveautés"] },
  { titre: "Ressources", liens: ["Guides", "Webinaires", "Centre d’aide", "Statut du service"] },
  { titre: "Entreprise", liens: ["À propos", "Clients", "Recrutement", "Contact"] },
]

const lien = { fontSize: 14, lineHeight: "20px", color: "var(--muted-foreground)", textDecoration: "none" }
const conteneur = (m: boolean) => ({ width: "100%", maxWidth: m ? undefined : 1200, margin: "0 auto", padding: m ? "0 20px" : "0 32px", boxSizing: "border-box" as const })
const titreSection = (m: boolean) => ({ margin: 0, fontSize: m ? 28 : 36, lineHeight: m ? "36px" : "44px", fontWeight: 700, letterSpacing: "-0.02em" })

function Marque() {
  return (
    <a href="#" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--foreground)", textDecoration: "none" }}>
      <span style={{ display: "flex", width: 28, height: 28, borderRadius: "var(--radius-md)", background: "var(--foreground)" }} />
      <span style={{ fontSize: 16, lineHeight: "24px", fontWeight: 700 }}>[Marque]</span>
    </a>
  )
}

function Visuel({ label, ratio }: { label: string; ratio: string }) {
  return (
    <div style={{ display: "flex", aspectRatio: ratio, alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-2xl)", background: "var(--muted)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <ImageIcon />
        <span style={text.small}>{label}</span>
      </div>
    </div>
  )
}

function Entete({ m }: { m: boolean }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 10, borderBottom: "1px solid var(--border)", background: "var(--background)" }}>
      <div style={{ ...conteneur(m), display: "flex", height: m ? 56 : 64, alignItems: "center", gap: 32 }}>
        <Marque />
        {m ? null : (
          <nav aria-label="Navigation principale" style={{ display: "flex", gap: 24 }}>
            {liens.map((l) => (
              <a key={l} href="#" style={lien}>
                {l}
              </a>
            ))}
          </nav>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
          {m ? null : <Button variant="ghost">Se connecter</Button>}
          <Button size={m ? "sm" : "default"}>{m ? "Démo" : "Demander une démo"}</Button>
          {m ? (
            <Button variant="ghost" size="icon" aria-label="Ouvrir le menu">
              <MenuIcon />
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  )
}

function Hero({ m }: { m: boolean }) {
  const texte = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: m ? 20 : 24 }}>
      <Badge variant="outline">
        Nouveau · évaluations à 360°
        <ArrowRightIcon data-icon="inline-end" />
      </Badge>
      <h1 style={{ margin: 0, fontSize: m ? 36 : 56, lineHeight: m ? "42px" : "62px", fontWeight: 700, letterSpacing: "-0.03em" }}>Les compétences de vos équipes, suivies au même endroit</h1>
      <p style={{ margin: 0, fontSize: m ? 16 : 18, lineHeight: m ? "24px" : "28px", color: "var(--muted-foreground)" }}>
        [Marque] réunit les formations, les certifications et les évaluations. Vos managers voient qui est prêt, qui doit se former, et quand.
      </p>
      <div style={{ display: "flex", flexDirection: m ? "column" : "row", gap: 12, width: m ? "100%" : "auto" }}>
        <Button size="lg" style={m ? { width: "100%" } : undefined}>
          Demander une démo
        </Button>
        <Button size="lg" variant="outline" style={m ? { width: "100%" } : undefined}>
          <PlayCircleIcon data-icon="inline-start" />
          Voir la visite guidée
        </Button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <AvatarGroup>
          <Avatar size="sm">
            <AvatarFallback>LP</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarFallback>HB</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarFallback>NR</AvatarFallback>
          </Avatar>
        </AvatarGroup>
        <span style={text.muted}>Adopté par 120 entreprises en France</span>
      </div>
    </div>
  )
  return (
    <section style={{ padding: m ? "40px 0 48px" : "96px 0 80px" }}>
      <div style={{ ...conteneur(m), display: "grid", gridTemplateColumns: m ? "minmax(0, 1fr)" : "repeat(2, minmax(0, 1fr))", alignItems: "center", gap: m ? 32 : 64 }}>
        {texte}
        <Visuel label="[Capture du produit]" ratio="4 / 3" />
      </div>
    </section>
  )
}

function Logos({ m }: { m: boolean }) {
  return (
    <section style={{ padding: m ? "0 0 48px" : "0 0 80px" }}>
      <div style={{ ...conteneur(m), display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <span style={text.small}>Ils suivent les compétences de leurs équipes avec [Marque]</span>
        <div style={{ display: "grid", width: "100%", gridTemplateColumns: m ? "repeat(3, minmax(0, 1fr))" : "repeat(6, minmax(0, 1fr))", gap: 12 }}>
          {["[Logo]", "[Logo]", "[Logo]", "[Logo]", "[Logo]", "[Logo]"].map((l, i) => (
            <div key={i} style={{ display: "flex", height: 48, alignItems: "center", justifyContent: "center", borderRadius: "var(--radius-lg)", background: "var(--muted)", fontSize: 12, fontWeight: 600, color: "var(--muted-foreground)" }}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Benefices({ m }: { m: boolean }) {
  return (
    <section style={{ padding: m ? "48px 0" : "80px 0", borderTop: "1px solid var(--border)" }}>
      <div style={{ ...conteneur(m), display: "flex", flexDirection: "column", gap: m ? 24 : 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 640 }}>
          <h2 style={titreSection(m)}>Moins de tableurs, plus de temps pour former</h2>
          <p style={{ ...text.muted, fontSize: 16, lineHeight: "24px" }}>Ce que les équipes RH et les managers gagnent dès le premier trimestre.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: m ? "minmax(0, 1fr)" : "repeat(3, minmax(0, 1fr))", gap: 16 }}>
          {benefices.map(({ titre, detail, Icon }) => (
            <Card key={titre}>
              <CardHeader>
                <div style={{ display: "flex", width: 40, height: 40, alignItems: "center", justifyContent: "center", marginBottom: 8, borderRadius: "var(--radius-lg)", background: "var(--muted)" }}>
                  <Icon size="20" />
                </div>
                <CardTitle>{titre}</CardTitle>
                <CardDescription>{detail}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function Etapes({ m }: { m: boolean }) {
  return (
    <section style={{ padding: m ? "48px 0" : "80px 0" }}>
      <div style={{ ...conteneur(m), display: "grid", gridTemplateColumns: m ? "minmax(0, 1fr)" : "repeat(2, minmax(0, 1fr))", alignItems: "center", gap: m ? 32 : 64 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <h2 style={titreSection(m)}>En place en trois semaines</h2>
          <ol style={{ display: "flex", flexDirection: "column", gap: 24, margin: 0, padding: 0, listStyle: "none" }}>
            {etapes.map((e, i) => (
              <li key={e.titre} style={{ display: "flex", gap: 16 }}>
                <span style={{ display: "flex", width: 32, height: 32, flexShrink: 0, alignItems: "center", justifyContent: "center", borderRadius: 999, background: "var(--primary)", color: "var(--primary-foreground)", fontSize: 14, fontWeight: 600 }}>{i + 1}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <h3 style={{ ...text.h2, fontSize: 18, lineHeight: "28px" }}>{e.titre}</h3>
                  <p style={{ ...text.muted, fontSize: 16, lineHeight: "24px" }}>{e.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <Visuel label="[Visuel : un référentiel de poste]" ratio={m ? "4 / 3" : "5 / 4"} />
      </div>
    </section>
  )
}

function Chiffres({ m }: { m: boolean }) {
  return (
    <section style={{ padding: m ? "48px 0" : "72px 0", background: "var(--muted)" }}>
      <div style={{ ...conteneur(m), display: "grid", gridTemplateColumns: m ? "minmax(0, 1fr)" : "repeat(3, minmax(0, 1fr))", gap: m ? 32 : 24 }}>
        {chiffres.map((c) => (
          <div key={c.valeur} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: m ? 40 : 48, lineHeight: 1.1, fontWeight: 700, letterSpacing: "-0.03em" }}>{c.valeur}</span>
            <span style={{ ...text.muted, fontSize: 16, lineHeight: "24px" }}>{c.detail}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Temoignage({ m }: { m: boolean }) {
  return (
    <section style={{ padding: m ? "48px 0" : "96px 0" }}>
      <figure style={{ ...conteneur(m), display: "flex", flexDirection: "column", alignItems: m ? "flex-start" : "center", gap: 24, maxWidth: m ? undefined : 820, margin: "0 auto", textAlign: m ? "left" : "center" }}>
        <blockquote style={{ margin: 0, fontSize: m ? 22 : 28, lineHeight: m ? "32px" : "40px", fontWeight: 500, letterSpacing: "-0.01em" }}>« Avant, préparer le plan de formation prenait un mois de relances. Cette année, les managers l’ont bouclé en une semaine. »</blockquote>
        <figcaption style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar>
            <AvatarFallback>SG</AvatarFallback>
          </Avatar>
          <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
            <span style={text.label}>Sophie Garnier</span>
            <span style={text.small}>Responsable formation, [Client], 1 200 salariés</span>
          </div>
        </figcaption>
      </figure>
    </section>
  )
}

function Faq({ m }: { m: boolean }) {
  return (
    <section style={{ padding: m ? "48px 0" : "80px 0", borderTop: "1px solid var(--border)" }}>
      <div style={{ ...conteneur(m), display: "grid", gridTemplateColumns: m ? "minmax(0, 1fr)" : "minmax(0, 2fr) minmax(0, 3fr)", gap: m ? 24 : 64 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2 style={titreSection(m)}>Questions fréquentes</h2>
          <p style={{ ...text.muted, fontSize: 16, lineHeight: "24px" }}>
            Une autre question ? <a href="#">Écrivez-nous</a>, on répond sous 24 h.
          </p>
        </div>
        <Accordion defaultValue={["q0"]}>
          {questions.map((q, i) => (
            <AccordionItem key={q.q} value={`q${i}`}>
              <AccordionTrigger>{q.q}</AccordionTrigger>
              <AccordionContent>{q.r}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

function Appel({ m }: { m: boolean }) {
  return (
    <section style={{ padding: m ? "0 0 48px" : "0 0 96px" }}>
      <div style={conteneur(m)}>
        <div style={{ display: "flex", flexDirection: m ? "column" : "row", alignItems: m ? "flex-start" : "center", justifyContent: "space-between", gap: 24, padding: m ? 28 : 56, borderRadius: "var(--radius-2xl)", background: "var(--primary)", color: "var(--primary-foreground)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 560 }}>
            <h2 style={{ ...titreSection(m), color: "var(--primary-foreground)" }}>Voyez [Marque] sur vos propres postes</h2>
            <p style={{ margin: 0, fontSize: 16, lineHeight: "24px", opacity: 0.8 }}>30 minutes en visio avec un consultant, à partir de deux fiches de poste que vous nous envoyez.</p>
          </div>
          <Button size="lg" variant="secondary" style={m ? { width: "100%" } : undefined}>
            Demander une démo
          </Button>
        </div>
      </div>
    </section>
  )
}

function Pied({ m }: { m: boolean }) {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: m ? "40px 0 32px" : "64px 0 40px" }}>
      <div style={{ ...conteneur(m), display: "flex", flexDirection: "column", gap: m ? 32 : 48 }}>
        <div style={{ display: "grid", gridTemplateColumns: m ? "repeat(2, minmax(0, 1fr))" : "minmax(0, 2fr) repeat(3, minmax(0, 1fr))", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, gridColumn: m ? "span 2" : undefined, maxWidth: 380 }}>
            <Marque />
            <p style={text.muted}>Les nouveautés et nos guides, une fois par mois.</p>
            <InputGroup>
              <InputGroupInput type="email" placeholder="Votre e-mail professionnel" aria-label="E-mail pour la lettre d’information" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton variant="secondary">S’inscrire</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
          {colonnes.map((c) => (
            <nav key={c.titre} aria-label={c.titre} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={text.label}>{c.titre}</span>
              {c.liens.map((l) => (
                <a key={l} href="#" style={lien}>
                  {l}
                </a>
              ))}
            </nav>
          ))}
        </div>
        <Separator />
        <div style={{ display: "flex", flexDirection: m ? "column" : "row", justifyContent: "space-between", gap: 12 }}>
          <span style={text.small}>© 2026 [Marque]. Tous droits réservés.</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {["Mentions légales", "Confidentialité", "Cookies", "Accessibilité : partiellement conforme"].map((l) => (
              <a key={l} href="#" style={{ ...lien, fontSize: 12, lineHeight: "16px" }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function Page({ m }: { m: boolean }) {
  return (
    <div style={pageStyle}>
      <Entete m={m} />
      <main>
        <Hero m={m} />
        <Logos m={m} />
        <Benefices m={m} />
        <Etapes m={m} />
        <Chiffres m={m} />
        <Temoignage m={m} />
        <Faq m={m} />
        <Appel m={m} />
      </main>
      <Pied m={m} />
    </div>
  )
}

/** Site vitrine mobile 390, la référence : header compact, hero empilé, sections en une colonne, footer. */
export function SiteVitrineMobile() {
  return <Page m />
}

/** Site vitrine 1440 : header avec navigation, hero en deux colonnes, sections en grilles, footer en colonnes. */
export function SiteVitrine() {
  return <Page m={false} />
}

/** Menu mobile ouvert 390 × 844 : la navigation du site en plein écran. */
export function SiteMenuMobile() {
  return (
    <div style={{ ...pageStyle, display: "flex", flexDirection: "column", minHeight: 844 }}>
      <div style={{ display: "flex", height: 56, alignItems: "center", gap: 8, padding: "0 12px 0 20px", borderBottom: "1px solid var(--border)" }}>
        <Marque />
        <div style={{ marginLeft: "auto" }}>
          <Button variant="ghost" size="icon" aria-label="Fermer le menu">
            <XIcon />
          </Button>
        </div>
      </div>
      <nav aria-label="Navigation principale" style={{ display: "flex", flexDirection: "column", padding: "8px 20px" }}>
        {liens.map((l) => (
          <a key={l} href="#" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid var(--border)", fontSize: 20, lineHeight: "28px", fontWeight: 600, color: "var(--foreground)", textDecoration: "none" }}>
            {l}
            <ChevronRightIcon size="20" />
          </a>
        ))}
      </nav>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "16px 20px" }}>
        {["Centre d’aide", "Contact", "Statut du service"].map((l) => (
          <a key={l} href="#" style={lien}>
            {l}
          </a>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: "auto", padding: "16px 20px 32px" }}>
        <Button size="lg" style={{ width: "100%" }}>
          Demander une démo
        </Button>
        <Button size="lg" variant="outline" style={{ width: "100%" }}>
          Se connecter
        </Button>
      </div>
    </div>
  )
}
