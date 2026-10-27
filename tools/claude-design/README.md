# Design system Claude Design « 40-60 · shadcn DS »

Ce dossier construit, à partir des composants de ce repo, le design system des maquettes Claude Design :
https://claude.ai/artifact/Bb9RN7fVcuHY63aQwaC3uD (namespace `Ds4060`). Les canevas Design y montent les vrais
composants (`<x-import component-from-global-scope="Ds4060.Button">`), voir `CLAUDE.md` à la racine.

Il est hors de l'app Next : `tsconfig.json`, ESLint (`globalIgnores`) et Tailwind (`@source not` dans `globals.css`)
l'excluent. Il a ses propres dépendances (esbuild, React 18 : celui que fournit le canevas).

## Quand republier

Après toute modification de ce que les maquettes utilisent :

- les composants de `src/components/` (`ui`, `reui`, `diceui`, `shadcn-studio`) et `src/hooks/` ;
- les blocs `src/app/<bloc>-NN/` ;
- les tokens de `src/app/globals.css` ;
- les descriptions de `DESIGN-SYSTEM.md` (elles deviennent les README des composants) ;
- les consignes de `system/project/README.md` (le README du design system lu par Claude Design).

## Commandes

À lancer à la racine du repo. Une fois, pour installer les dépendances du build :

```bash
npm run ds:install
```

Reconstruire `dist/project/` (les fichiers publiés), puis comparer à la dernière publication (`published-manifest.json`) :

```bash
npm run ds:build
```

Tester le build dans Chrome headless (Google Chrome doit être installé) :

```bash
npm run ds:test
```

Republier : dans Claude Code, lancer `/publier-ds`. La commande enchaîne le build, les tests, la publication et le
commit du manifeste. La publication passe par l'outil Artifact de Claude Code (il n'existe pas d'API en ligne de
commande) et demande les droits d'édition sur l'artifact. La procédure détaillée se trouve dans
`.claude/skills/publier-ds/SKILL.md`.

## Ce que fait `npm run ds:build`

| Étape | Script | Produit |
| --- | --- | --- |
| Namespace | `gen-entry.mjs` | `src/entry.tsx` (tout ce que `window.Ds4060` expose), `out/meta.json` |
| Inventaire | `inventory.mjs` | `out/inventory.json` (exports et variantes cva de chaque composant) |
| Bundle | `build.mjs` | `out/bundle.js` (IIFE esbuild, React 18 du canevas), `out/bundle-test.js` (`--test`) |
| CSS | `build-css.mjs` + `wrap-css.mjs` | `out/bundle.css` (Tailwind v4 du repo, sélecteurs adaptés au canevas) |
| Tokens | `gen-tokens.mjs` | `dist/project/tokens.json` (depuis `globals.css`) |
| Docs | `gen-docs.mjs` | `README.md` et `preview.html` par composant et par bloc, `components/index.d.ts` |
| Harnais | `gen-harness.mjs` | `harness/` (page de test) et `tokens.css` tel que la page le compile |
| Diff | `build-all.mjs` | `out/manifest.json`, `out/publish-plan.json` (fichiers modifiés et appels de publication) |

`build-all.mjs` enchaîne tout. `index.mjs` écrit `design-system.json` au moment de publier, à partir de l'index en
ligne, et `mark-published.mjs` met à jour `published-manifest.json` après la publication.

## Ajouter un composant

Le build trouve seul la plupart des composants :

- **officiels shadcn** : les noms de `shadcnOfficial` dans `src/app/gallery/page.tsx` (fichiers `src/components/ui/`).
  L'aperçu vient de `src/examples/<nom>-example.tsx`, à copier depuis `npx shadcn@latest add @shadcn/<nom>-example`
  (registre base-nova). La description vient du tableau de la section 2 de `DESIGN-SYSTEM.md` ;
- **primitives shadcnstudio** : les autres fichiers de `src/components/ui/`. Leur description est dans `studioDesc`
  (`gen-docs.mjs`), leur aperçu est la première variante ou le premier bloc qui les utilise ;
- **ReUI et Dice UI** : à ajouter à la liste `tiers` de `gen-entry.mjs` ;
- **blocs** : chaque `src/app/<nom>-NN/page.tsx` (description dans la section 6 de `DESIGN-SYSTEM.md`) ;
- **variantes** : chaque `src/components/shadcn-studio/<catégorie>/*.tsx`.

Un composant qui compte ou clone ses enfants (comme Carousel, Stepper ou Sortable) va dans `UNWRAP` (`gen-entry.mjs`),
voir plus bas.

## Le canevas Design et ses contraintes

- **React 18** : le canevas fournit React 18, le repo est en React 19. `shims/jsx-runtime.cjs` enveloppe en `forwardRef`
  les composants du repo (marqués `__dsRef` au build) pour que Base UI reçoive les `ref` de `render={<Button />}`.
- **Cales** : `next/link`, `next/image`, `next-themes`, `xlsx` et le highlighter Shiki sont remplacés par des cales
  légères (`shims/`).
- **Chaque `x-import` est enveloppé** : le runtime (`dc-runtime.js`) pose `data-dc-tpl` sur les éléments du template.
  Chaque `<x-import>` se retrouve donc dans un `<div class="sc-host-x" style="display:contents">`, et le `style` de
  l'x-import passe sur ce wrapper. Sans correction, les sélecteurs `>`, `+`, `~`, `:first/last/nth-child` et
  `:has(~ …)` de shadcn ne marchent plus : icônes de 24 px dans les badges, filets de tableau absents, coins de
  ButtonGroup faux. Les composants qui comptent leurs enfants cassent aussi.
  - `wrap-css.mjs` fait traverser jusqu'à 2 wrappers à chaque sélecteur et lit les positions sur le wrapper. Le
    wrapper est en `:where()`, donc la spécificité ne change pas. Un slot dimensionné (`style="width: …"`) est rempli
    par le composant ;
  - `unwrapChildren` (`gen-entry.mjs`, liste `UNWRAP`) retire le wrapper autour des enfants des composants qui les
    comptent ;
  - `Ds4060.Theme theme="dark"` applique le thème à tout le document, y compris aux menus et popovers en portail.
- **tokens.css** : la première ligne `/* 40-60 · shadcn DS — generated from tokens.json */` indique à la page qu'elle
  peut le régénérer depuis `tokens.json`.

## Tests (`npm run ds:test`)

| Test | Vérifie |
| --- | --- |
| `test-mount.mjs` | chaque exemple et chaque bloc se monte sous React 18 sans erreur. `npm run ds:test -- --all` ajoute les 608 variantes |
| `test-wrap.mjs` | chaque exemple rendu à plat et enveloppé comme sur un canevas a les mêmes styles calculés |
| `test-anchor.mjs` | menus, popovers et tooltips s'ouvrent à côté de leur déclencheur |
| `test-previews.mjs` | chaque carte du design system s'affiche, en clair et en sombre |
| `test-canvas.mjs` | les artboards de `canvas/` avec le vrai runtime Design, si `.cache/dc-runtime.js` existe |

Pour le test canevas, enregistrer le runtime dans `.cache/dc-runtime.js`. Dans Claude Code, lire avec l'outil Artifact
le fichier `artifact-type/dc-runtime.js` d'un canevas Design, puis copier le fichier obtenu.

Écarts connus et acceptés (liste `KNOWN` de `test-all.mjs`) :

- `ExtendedMessageScroller` : `content-visibility` fait dépendre les hauteurs du moment de la mesure ;
- `ExtendedSortable` : les régions cachées de dnd-kit comptent comme des enfants ;
- `FieldExample` et `InputOtpExample` : 4 px d'écart sur la marge des descriptions, à cause des inputs cachés ;
- l'ancrage de `SelectExample` : Base UI pose la liste sur le déclencheur (`alignItemWithTrigger`) ;
- l'aperçu de `MotionCheckbox` : vide au repos.

## Canevas existants

Un canevas Design copie les fichiers du design system à son installation et ne se met pas à jour seul. Pour qu'un
canevas existant profite d'une nouvelle version, recopier ses fichiers `ds/ds4060/…` depuis l'artifact du design
system (outil Artifact, `files` : `{"artifact": "<url du DS>", "path": "…"}`). Les nouveaux canevas prennent la
dernière version.
