@AGENTS.md

# Maquettes et wireframes : Claude Design + design system 40-60

Toute demande de maquette, wireframe, écran, parcours, piste créative ou prototype visuel (en particulier sur les branches `phase/*`) se fait ainsi, sans demander confirmation :

1. **Sur un canevas Claude Design** : un Artifact du type « Design » (Artifact `quickstart` avec `intent: "design"` et `design_systems: false`, puis création depuis le type Design). Pas de page HTML à part, pas de code dans ce repo.
2. **Avec le design system « 40-60 · shadcn DS »** : https://claude.ai/artifact/Bb9RN7fVcuHY63aQwaC3uD. Ne pas demander lequel utiliser, et n'en prendre un autre que si la personne le demande. Lire son `project/README.md` et son `project/tokens.json`, l'installer sur le canevas, puis monter ses vrais composants (`<x-import component-from-global-scope="Ds4060.Button" variant="outline">`) comme son README l'explique. Pas d'imitation en markup.
3. **Règles 40-60** : niveaux de gris (seul `destructive` est coloré), textes en français et réalistes (`[Nom du client]` plutôt que du lorem ipsum), icônes Lucide (`Ds4060.Icon`). Les blocs shadcnstudio (`Ds4060.Block…`) servent de point de départ pour une landing, une auth, un dashboard ou un e-commerce. Pour une version sombre, envelopper l'écran dans `Ds4060.Theme` avec `theme="dark"`.

Ce design system est construit à partir de ce repo : mêmes tokens (`src/app/globals.css`), mêmes composants (`src/components/`), inventaire dans `DESIGN-SYSTEM.md`. Quand les composants changent, il faut le republier.
