Design system des maquettes et wireframes de 40-60 studio : shadcn/ui en style `base-nova` (primitives Base UI), thème `neutral` en niveaux de gris, police Geist. Il reflète le template `valentin834/shadcn-ds-template` : mêmes tokens, mêmes composants, montés en vrai sur le canevas.

## Sur un canevas Design

- Charger, après la ligne `support.js` de chaque artboard et dans cet ordre : `tokens.css`, `components/bundle.css`, puis `components/bundle.js`. Le canevas fournit React 18 : ne copier aucun React.
- Le bundle définit `window.Ds4060`. Monter les vrais composants avec `<x-import component-from-global-scope="Ds4060.Button" variant="outline">Annuler</x-import>`. Les attributs sont les props (en kebab-case), le contenu est `children`, et un `x-import` imbriqué est un composant enfant.
- Les parties d'un composant sont des exports à plat : `Ds4060.Card`, `Ds4060.CardHeader`, `Ds4060.CardTitle`, `Ds4060.CardContent`, `Ds4060.CardFooter`. Lire le README du composant avant de le monter.
- Ce qui n'est pas un composant (mise en page, textes, grilles) reste du markup avec les variables du thème : `background: var(--background)`, `color: var(--muted-foreground)`, `border: 1px solid var(--border)`, `border-radius: var(--radius-xl)`.
- Pour une overlay ouverte, monter le composant réel avec `open="{{yes}}"`, par exemple `Ds4060.Dialog` contenant `Ds4060.DialogContent`. Une seule overlay par artboard.
- Thème sombre : envelopper tout le contenu de l'artboard dans `<x-import component-from-global-scope="Ds4060.Theme" theme="dark">`. Il applique le thème à la page entière, donc aussi aux menus, listes de select et popovers ouverts, qui s'affichent hors de l'artboard. Un simple `data-theme="dark"` sur un conteneur ne les atteint pas.
- `Select` et `Combobox` affichent la `value` de l'option choisie. Pour afficher un libellé, leur passer `items="{{options}}"` avec `options: [{ value: "all", label: "Tous les secteurs" }, …]` dans `renderVals()`.
- Les composants sont faits pour être imbriqués en `x-import`, comme dans le code : `Ds4060.Card` > `Ds4060.CardHeader` > `Ds4060.CardTitle`, une icône dans un `Ds4060.Badge` ou un `Ds4060.Button`, des `Ds4060.Button` dans un `Ds4060.ButtonGroup`. Tailles d'icônes, coins des groupes et filets de tableau restent ceux de shadcn.

## Principes des maquettes

- **Niveaux de gris uniquement.** `primary` est presque noir (presque blanc en sombre), les surfaces sont `background`, `card` et `muted`, et le texte est `foreground` ou `muted-foreground`. `destructive` (rouge) est la seule couleur, réservée aux erreurs et aux actions destructrices. N'ajouter aucune autre teinte.
- **Composants avant markup.** Bouton, champ, select, table, onglets, carte, badge, dialog et sidebar sont toujours des `x-import` du bundle, jamais des imitations en HTML.
- **Contenu réaliste, sans lorem ipsum.** Les données manquantes deviennent des repères entre crochets : `[Nom du client]`, `[Montant]`. Les maquettes sont en français, sauf demande contraire.
- **Icônes Lucide uniquement**, par leur nom : `<x-import component-from-global-scope="Ds4060.Icon" name="Search" size="16"></x-import>`. Sans `size`, une icône seule fait 24 px. Dans un bouton ou un élément de menu, elle passe automatiquement à 16 px (12 px pour les petits boutons et les badges). Un bouton icône seul prend `size="icon"` et un `aria-label`. Pas d'emoji.
- **Accessibilité telle que dessinée** : vrais `<button>`, `<a href>` et `<label>`, contraste du texte d'au moins 4.5:1. `muted-foreground` sur `background` le respecte en clair comme en sombre.

## Fondations

**Couleurs** (tokens, clair / sombre) :
- `background` / `foreground` : fond de page et texte courant.
- `card`, `popover` (+ `-foreground`) : cartes, tables, panneaux, et surfaces flottantes (menus, popovers, listes de select).
- `primary` / `primary-foreground` : action principale, éléments cochés ou actifs, barres de progression.
- `secondary`, `muted`, `accent` : remplissages discrets (bouton secondaire, skeleton, survol de ligne ou de menu).
- `muted-foreground` : descriptions, aides, placeholders, métadonnées.
- `border` (tous les filets), `input` (bordure des champs) et `ring` (focus, à 50 %).
- `chart-1` à `chart-5` : séries de graphiques, du gris clair au gris foncé. Distinguer les séries par la luminosité et par des libellés.
- `sidebar-*` : la colonne de navigation de l'application.

**Typographie** : Geist (`--font-geist-sans`) et Geist Mono (`--font-geist-mono`), chargées depuis Google Fonts par `bundle.css`.
- `type-body-sm` (14 px) : taille par défaut de l'interface (champs, menus, cellules).
- `type-label` (14 px, 500) : labels, textes de boutons, en-têtes de colonnes.
- `type-caption` (12 px) : aides, badges.
- `type-body` (16 px) : texte courant d'une page.
- `type-title` (16 px, 500) : titres de cartes et de dialogs.
- `type-heading` (24 px, 600) et `type-display` (30 px, 700) : titres de page.
- `type-code` (Geist Mono 14 px) : identifiants, code.

Les composants ont déjà leur typographie : ne les surcharger que pour le markup autour.

**Rayons** : `radius` vaut 10 px. L'échelle en découle : `--radius-sm` 6 px, `--radius-md` 8 px, `--radius-lg` 10 px, `--radius-xl` 14 px, `--radius-2xl` 18 px. Les cartes et dialogs sont en `radius-xl`, les boutons et champs en `radius-lg` ou `radius-md`, et les badges sont des pilules.

**Espacements** : pas de 4 px (échelle Tailwind `--spacing: 0.25rem`). 8 px entre un label et son champ, 16 à 24 px dans une carte, 24 à 32 px entre deux sections, 48 à 64 px de marge de page.

**Filets et ombres** : les champs et les boutons n'ont pas d'ombre, seulement des filets `border` ou `input`. Les cartes et les dialogs sont cerclées d'un anneau d'un pixel (`foreground` à 10 %). Les surfaces flottantes (popover, menus, select) ont une ombre moyenne, la sheet une ombre large. Pas de dégradé.

**Mise en page** : une page applicative fait 1280 à 1440 px de large, avec la sidebar de 256 px (`Ds4060.SidebarProvider` > `Ds4060.Sidebar` + `Ds4060.SidebarInset`) ou un contenu centré `max-width` 1024 à 1280 px. En mobile, 390 × 844, les menus s'empilent.

## Catalogue

**Composants officiels shadcn (65)**, par usage :
- Structure : `Card`, `Separator`, `ScrollArea`, `ResizablePanelGroup`, `AspectRatio`, `Sidebar`, `Item`, `Empty`.
- Navigation : `Breadcrumb`, `Tabs`, `NavigationMenu`, `Menubar`, `Pagination`, `Command`, `DropdownMenu`, `ContextMenu`.
- Formulaires : `Field` (label, description, erreur), `Input`, `InputGroup`, `Textarea`, `Select`, `NativeSelect`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `InputOTP`, `Calendar`, `Label`, `Form`.
- Overlays : `Dialog`, `AlertDialog`, `Sheet`, `Drawer`, `Popover`, `HoverCard`, `Tooltip`.
- Feedback : `Alert`, `Progress`, `Spinner`, `Skeleton`, `Toaster` (sonner), `Toast`, `Marker`.
- Données : `Table`, `Badge`, `Avatar`, `Accordion`, `Collapsible`, `Carousel`, `ChartContainer` (recharts), `Kbd`.
- Actions : `Button`, `ButtonGroup`, `Toggle`, `ToggleGroup`.
- IA et conversation : `Message`, `MessageScroller`, `Bubble`, `Attachment`, `CodeBlock`, `Questionnaire`, `Trace`.

**Données et BtoB (ReUI, Dice UI)** : `Kanban`, `Sortable`, `Tree`, `Filters` (+ `Cascader`), `Stepper`, `Timeline`, `NumberField`, `TimePicker`, `TagsInput`, `Editable`, `ActionBar`. Pour les back-offices, ERP et outils métier.

**Primitives shadcnstudio animées (28)** : boutons à effet (`ShimmerButton`, `RippleButton`, `MagneticButton`…), `MotionCheckbox`, `MotionSwitch`, `MotionRadioGroup`, `MotionTabs`, `Marquee`, `NumberTicker`, `Rating`, `MultiSelect`… Elles sont décoratives : à éviter dans les wireframes, à garder pour les pistes créatives.

**Blocs shadcnstudio Pro (87)** : des sections entières avec leurs données d'exemple, prêtes à monter sans props. Par exemple `Ds4060.BlockHeroSection01`, `Ds4060.BlockLoginPage01`, `Ds4060.BlockDashboardShell01`, `Ds4060.BlockPricingComponent01`, `Ds4060.BlockProductList01`. Ce sont de bons points de départ pour une landing, une authentification, un dashboard ou un e-commerce. Pour adapter un bloc, le recomposer en markup avec les composants officiels. Leur contenu est en anglais, certains chargent des images depuis `cdn.shadcnstudio.com` et gardent des couleurs codées en dur.

**Variantes shadcnstudio Pro (608)** : des exemples prêts à l'emploi, sans props, sous `Ds4060.Variants.<Nom>`, par exemple `Ds4060.Variants.Button22`, `Ds4060.Variants.Input12` ou `Ds4060.Variants.DataTable03`. Elles couvrent accordion, alert, avatar, badge, breadcrumb, button, button-group, calendar, card, checkbox, collapsible, combobox, data-table, date-picker, dialog, dropdown-menu, form, input, input-mask, input-otp, pagination, popover, radio-group, select, sheet, sonner, switch, table, tabs, textarea et tooltip. Elles ne sont pas dans le catalogue : les monter par leur nom.

## Choisir un composant

- Plus de 7 options : `Combobox` (recherche). Moins de 7 : `Select`. 2 ou 3 options visibles : `RadioGroup` ou `ToggleGroup`.
- Confirmer une action destructrice : `AlertDialog`. Formulaire court : `Dialog`. Détail d'une ligne de table : `Sheet` à droite.
- Statut : `Badge` (`secondary` ou `outline` en gris, `destructive` pour une erreur). Message de page : `Alert`. Retour après action : toast (`Toaster`).
- Liste filtrable : `Filters` au-dessus d'une `Table`. Pipeline : `Kanban`. Historique : `Timeline`. Parcours en étapes : `Stepper`.
