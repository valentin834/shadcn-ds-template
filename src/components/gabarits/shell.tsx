// Gabarit « Shell applicatif » : la coquille vide d'une page d'application.
import { LayoutTemplateIcon, PlusIcon, SlidersHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

import { PageHeader, Shell } from "./parts"

/** Shell applicatif 1440 : sidebar, barre du haut, en-tête de page et zone de contenu à remplir. */
export function ShellApplicatif() {
  return (
    <Shell active="tableau-de-bord" trail={["Activité", "[Titre de la page]"]}>
      <PageHeader title="[Titre de la page]" description="[Une phrase qui dit ce que la personne trouve ou fait sur cette page.]">
        <Button variant="outline">
          <SlidersHorizontalIcon data-icon="inline-start" />
          [Action secondaire]
        </Button>
        <Button>
          <PlusIcon data-icon="inline-start" />
          [Action principale]
        </Button>
      </PageHeader>
      <div style={{ display: "flex", minHeight: 560, alignItems: "center", justifyContent: "center", border: "1px dashed var(--border)", borderRadius: "var(--radius-xl)" }}>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <LayoutTemplateIcon />
            </EmptyMedia>
            <EmptyTitle>Zone de contenu</EmptyTitle>
            <EmptyDescription>Remplacer ce cadre par le contenu de la page : cartes, table, formulaire. Largeur utile 1120 px, marges de 32 px.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    </Shell>
  )
}
