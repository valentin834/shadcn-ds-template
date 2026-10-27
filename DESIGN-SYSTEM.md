# Design System — shadcn-ds-4060
> Référence complète pour Claude Design et tout agent IA qui compose des écrans.
> Stack : Next.js 16.4 (App Router) · React 19.3 · TypeScript · Tailwind CSS v4 · shadcn/ui (style `base-nova`, primitives Base UI) · shadcnstudio Pro · ReUI · Dice UI
> Inventaire vérifié le 27/10/2026 : **65** composants shadcn officiels · **11** composants ReUI / Dice UI · **28** primitives shadcnstudio · **608** variantes shadcnstudio · **87** blocs shadcnstudio · **3** blocs shadcn officiels.
>
> **Maquettes** : sur un canevas Claude Design, avec le design system **40-60 · shadcn DS** (https://claude.ai/artifact/Bb9RN7fVcuHY63aQwaC3uD). Il porte les mêmes tokens et les mêmes composants que ce repo, montés en vrai (`window.Ds4060`, par exemple `<x-import component-from-global-scope="Ds4060.Button">`). `CLAUDE.md` impose de l'utiliser pour toute demande de maquette.

---

## 1. Principes d'utilisation

### Sources et imports

| Source | Dossier | Import | Export |
|---|---|---|---|
| shadcn/ui officiel | `src/components/ui/` | `import { Button } from "@/components/ui/button"` | nommé |
| ReUI ([reui.io](https://reui.io), variante base-nova) | `src/components/reui/` | `import { Kanban } from "@/components/reui/kanban"` | nommé |
| Dice UI ([diceui.com](https://diceui.com), variante base-nova) | `src/components/diceui/` | `import { TagsInput } from "@/components/diceui/tags-input"` | nommé |
| Primitives shadcnstudio | `src/components/ui/` (§ 4) | `import { Rating } from "@/components/ui/rating"` | nommé (`multi-select` : default) |
| Variantes shadcnstudio | `src/components/shadcn-studio/[category]/` | `import Button22 from "@/components/shadcn-studio/button/button-22"` | **default** |
| Blocs shadcnstudio | `src/components/shadcn-studio/blocks/[block]/` | `import HeroSection01 from "@/components/shadcn-studio/blocks/hero-section-01/hero-section-01"` | **default** |
| Blocs shadcn officiels | `src/components/` | `import { AppSidebar } from "@/components/app-sidebar"` | nommé |

### Règles

- **Thème** : `neutral`, variables CSS oklch, **niveaux de gris uniquement** — aucune personnalisation. Ne pas ajouter de tokens colorés (`--success`, `--info`, `--warning`…) : certains registres tiers en installent, ils ont été écartés. Seul `--destructive` est coloré (rouge shadcn par défaut).
- **Primitives** : Base UI (`@base-ui/react`). Différences avec l'API Radix qu'on trouve dans beaucoup d'exemples en ligne :
  - pas d'`asChild` → prop `render` : `<DialogTrigger render={<Button variant="outline" />}>Ouvrir</DialogTrigger>` ; un `Button` rendu en lien prend aussi `nativeButton={false}`
  - `Accordion` : `multiple` (booléen) et valeurs en tableau (`defaultValue={['item-1']}`) ; pas de `type="single"` ni de `collapsible`
  - `ToggleGroup` : `value` / `defaultValue` en `string[]`
  - `Select`, `Slider`, `Combobox` : `onValueChange(value, eventDetails)`
  - `Drawer` : `swipeDirection="down" | "right" | "left" | "up"` (plus de prop `direction`, plus de Vaul)
- **Pas de Radix** : `radix-ui` n'est plus installé. Les variantes et blocs shadcnstudio viennent eux aussi du registre `base-nova` (Base UI natif). Un exemple trouvé en ligne avec `asChild` est à adapter avec `render`.
- **Icônes** : `lucide-react` exclusivement.
- **Charts** : `recharts` via le composant `chart` (`ChartContainer`, `ChartTooltip`). Les couleurs `--chart-1..5` sont des gris.
- **Animations** : `motion` (`import { motion } from "motion/react"`), utilisé par shadcnstudio.
- **Police** : Geist Sans (`--font-geist-sans`) et Geist Mono.
- **`cn()`** : toujours `import { cn } from "@/lib/utils"` (clsx + tailwind-merge). La CLI shadcn 4.22 écrit `import { cn } from "cn"` : remplacer cet import après chaque `shadcn add` (voir README).
- **Toasts** : deux systèmes coexistent. `sonner` (utilisé par shadcnstudio) et `ui/toast` (Base UI, nouveau composant officiel). En choisir un par projet. Aucun `Toaster` n'est monté dans le layout racine : l'ajouter dans le layout du projet.

### Galeries

- `/gallery` — index de tous les composants et blocs
- `/gallery/studio/[category]` — les 608 variantes shadcnstudio
- `/gallery/extended` — démos des nouveaux composants officiels, de ReUI et de Dice UI (une page par composant : `/gallery/extended/kanban`, etc.)

---

## 2. Composants officiels shadcn (65)

Import : `@/components/ui/[name]`. Exports et variantes extraits du code.

### Layout & structure
| Composant | Exports | Variantes / props | Usage |
|---|---|---|---|
| `card` | `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardAction`, `CardDescription`, `CardContent` | `size`: `default` · `sm` | Conteneur principal : tuiles de dashboard, cartes produit, formulaires. `size="sm"` pour une version compacte. |
| `separator` | `Separator` | — | Séparateur horizontal ou vertical. |
| `resizable` | `ResizableHandle`, `ResizablePanel`, `ResizablePanelGroup` | — | Panneaux redimensionnables (react-resizable-panels). |
| `scroll-area` | `ScrollArea`, `ScrollBar` | — | Zone de défilement avec scrollbar stylée. |
| `aspect-ratio` | `AspectRatio` | — | Conteneur à ratio fixe (images, vidéos). |
| `sidebar` | `Sidebar`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarGroupAction`, `SidebarGroupContent`, `SidebarGroupLabel`, `SidebarHeader`, `SidebarInput`, `SidebarInset`, `SidebarMenu`, `SidebarMenuAction`, `SidebarMenuBadge`, `SidebarMenuButton`, `SidebarMenuItem`, `SidebarMenuSkeleton`, `SidebarMenuSub`, `SidebarMenuSubButton`, `SidebarMenuSubItem`, `SidebarProvider`, `SidebarRail`, `SidebarSeparator`, `SidebarTrigger`, `useSidebar` | `variant`: `default` · `outline`<br>`size`: `default` · `sm` · `lg`<br>`state`: `expanded` · `collapsed`<br>`side`: `left` · `right`<br>`collapsible`: `offcanvas` · `icon` · `none` | Navigation latérale complète, repliable (icônes) — voir le bloc `dashboard-01`. |
| `item` | `Item`, `ItemMedia`, `ItemContent`, `ItemActions`, `ItemGroup`, `ItemSeparator`, `ItemTitle`, `ItemDescription`, `ItemHeader`, `ItemFooter` | `variant`: `default` · `icon` · `image`<br>`size`: `default` · `sm` · `xs` | Ligne de liste générique : média, titre, description, actions. |
| `empty` | `Empty`, `EmptyHeader`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`, `EmptyMedia` | `variant`: `default` · `icon` | État vide : icône, titre, description, actions. |

### Navigation
| Composant | Exports | Variantes / props | Usage |
|---|---|---|---|
| `breadcrumb` | `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis` | — | Fil d'Ariane. |
| `navigation-menu` | `NavigationMenu`, `NavigationMenuContent`, `NavigationMenuIndicator`, `NavigationMenuItem`, `NavigationMenuLink`, `NavigationMenuList`, `NavigationMenuTrigger`, `NavigationMenuPositioner` | — | Menu principal de site avec sous-menus. |
| `menubar` | `Menubar`, `MenubarPortal`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarGroup`, `MenubarSeparator`, `MenubarLabel`, `MenubarItem`, `MenubarShortcut`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent` | — | Barre de menus type application desktop. |
| `tabs` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `tabsListVariants` | `variant`: `default` · `line` | Onglets. `TabsList variant="line"` pour des onglets soulignés. |
| `pagination` | `Pagination`, `PaginationContent`, `PaginationEllipsis`, `PaginationItem`, `PaginationLink`, `PaginationNext`, `PaginationPrevious` | — | Navigation entre pages. |

### Formulaires & saisie
| Composant | Exports | Variantes / props | Usage |
|---|---|---|---|
| `field` | `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldLegend`, `FieldSeparator`, `FieldSet`, `FieldContent`, `FieldTitle` | `orientation`: `vertical` · `horizontal` · `responsive`<br>`variant`: `legend` · `label` | **Wrapper recommandé** pour un champ : label, description, erreur, groupes et fieldsets. |
| `form` | `useFormField`, `Form`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `FormField` | — | Wrapper react-hook-form historique (le registre base-nova ne le fournit plus : préférer `field`). |
| `input` | `Input` | — | Champ texte. |
| `input-group` | `InputGroup`, `InputGroupAddon`, `InputGroupButton`, `InputGroupText`, `InputGroupInput`, `InputGroupTextarea` | `align`: `inline-start` · `inline-end` · `block-start` · `block-end`<br>`size`: `xs` · `sm` · `icon-xs` · `icon-sm` | Champ avec préfixe / suffixe (icône, texte, bouton). |
| `textarea` | `Textarea` | — | Texte multiligne. |
| `select` | `Select`, `SelectContent`, `SelectGroup`, `SelectItem`, `SelectLabel`, `SelectScrollDownButton`, `SelectScrollUpButton`, `SelectSeparator`, `SelectTrigger`, `SelectValue` | `size`: `sm` · `default` | Liste déroulante (Base UI). `onValueChange(value, eventDetails)`. |
| `native-select` | `NativeSelect`, `NativeSelectOptGroup`, `NativeSelectOption` | `size`: `sm` · `default` | Select HTML natif stylé. |
| `combobox` | `Combobox`, `ComboboxInput`, `ComboboxContent`, `ComboboxList`, `ComboboxItem`, `ComboboxGroup`, `ComboboxLabel`, `ComboboxCollection`, `ComboboxEmpty`, `ComboboxSeparator`, `ComboboxChips`, `ComboboxChip`, `ComboboxChipsInput`, `ComboboxTrigger`, `ComboboxValue`, `useComboboxAnchor` | — | Liste avec recherche, multi-sélection en chips (Base UI). |
| `checkbox` | `Checkbox` | — | Case à cocher. |
| `radio-group` | `RadioGroup`, `RadioGroupItem` | — | Choix unique. |
| `switch` | `Switch` | `size`: `sm` · `default` | Interrupteur on/off. |
| `slider` | `Slider` | — | Valeur ou plage par glissement. |
| `input-otp` | `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator` | — | Code OTP / 2FA. |
| `calendar` | `Calendar`, `CalendarDayButton` | — | Calendrier (react-day-picker v10), simple ou plage. |
| `label` | `Label` | — | Étiquette de champ. |

### Overlays & popups
| Composant | Exports | Variantes / props | Usage |
|---|---|---|---|
| `dialog` | `Dialog`, `DialogClose`, `DialogContent`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogOverlay`, `DialogPortal`, `DialogTitle`, `DialogTrigger` | — | Modale : formulaires secondaires, confirmations simples. |
| `alert-dialog` | `AlertDialog`, `AlertDialogAction`, `AlertDialogCancel`, `AlertDialogContent`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogHeader`, `AlertDialogMedia`, `AlertDialogOverlay`, `AlertDialogPortal`, `AlertDialogTitle`, `AlertDialogTrigger` | `size`: `default` · `sm` | Confirmation d'action destructive ou irréversible. |
| `sheet` | `Sheet`, `SheetTrigger`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription` | `side`: `top` · `right` · `bottom` · `left` | Panneau latéral (détail d'un objet, filtres). |
| `drawer` | `Drawer`, `DrawerPortal`, `DrawerOverlay`, `DrawerSwipeHandle`, `DrawerTrigger`, `DrawerClose`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription` | — | Tiroir bas / côté, **désormais sur Base UI** (plus Vaul) : `swipeDirection="down" | "right" | "left" | "up"`. |
| `popover` | `Popover`, `PopoverContent`, `PopoverDescription`, `PopoverHeader`, `PopoverTitle`, `PopoverTrigger` | — | Panneau flottant au clic. |
| `hover-card` | `HoverCard`, `HoverCardTrigger`, `HoverCardContent` | — | Aperçu au survol. |
| `tooltip` | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` | — | Info-bulle (le layout racine fournit `TooltipProvider`). |
| `dropdown-menu` | `DropdownMenu`, `DropdownMenuPortal`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuGroup`, `DropdownMenuLabel`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent` | `variant`: `default` · `destructive` | Menu d'actions (sous-menus, cases, radios). |
| `context-menu` | `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuGroup`, `ContextMenuPortal`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuRadioGroup` | `variant`: `default` · `destructive` | Menu clic droit. |
| `command` | `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator` | — | Palette de commandes / recherche (cmdk). |

### Feedback & indicateurs
| Composant | Exports | Variantes / props | Usage |
|---|---|---|---|
| `alert` | `Alert`, `AlertTitle`, `AlertDescription`, `AlertAction` | `variant`: `default` · `destructive` | Message contextuel inline. |
| `badge` | `Badge`, `badgeVariants` | `variant`: `default` · `secondary` · `destructive` · `outline` · `ghost` · `link` | Statut, compteur, catégorie. |
| `progress` | `Progress`, `ProgressTrack`, `ProgressIndicator`, `ProgressLabel`, `ProgressValue` | — | Barre de progression. |
| `skeleton` | `Skeleton` | — | Placeholder de chargement. |
| `spinner` | `Spinner` | — | Indicateur de chargement. |
| `sonner` | `Toaster` | — | Toasts `sonner` : `<Toaster />` + `toast()` importé de `sonner`. Utilisé par les variantes et blocs shadcnstudio. |
| `toast` | `Toaster`, `Toast`, `ToastAction`, `ToastClose`, `ToastContent`, `ToastDescription`, `ToastPortal`, `ToastProvider`, `ToastTitle`, `ToastViewport`, `createToastManager`, `toast`, `useToastManager` | — | **Nouveau** — toasts Base UI : `<Toaster>` (wrapper) + `toast.add({ title, description })`, `toast.promise()`. |
| `kbd` | `Kbd`, `KbdGroup` | — | Raccourci clavier. |

### Data display
| Composant | Exports | Variantes / props | Usage |
|---|---|---|---|
| `table` | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption` | — | Tableau HTML stylé. Pour tri / filtres / pagination : TanStack Table v8 (voir `data-table` shadcnstudio et `src/components/data-table.tsx`). |
| `chart` | `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent` | `indicator`: `line` · `dot` · `dashed` | Graphiques recharts avec tokens de couleur (`ChartContainer`, `ChartTooltip`, `ChartLegend`). |
| `avatar` | `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarGroup`, `AvatarGroupCount`, `AvatarBadge` | `size`: `default` · `sm` · `lg` | Photo avec initiales en fallback, groupes et badge. |
| `carousel` | `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`, `useCarousel` | `orientation`: `horizontal` · `vertical` | Carrousel (Embla). |
| `accordion` | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | — | Sections dépliables (Base UI : `multiple`, valeurs en tableau). |
| `collapsible` | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` | — | Section unique dépliable. |

### Actions
| Composant | Exports | Variantes / props | Usage |
|---|---|---|---|
| `button` | `Button`, `buttonVariants` | `variant`: `default` · `outline` · `secondary` · `ghost` · `destructive` · `link`<br>`size`: `default` · `xs` · `sm` · `lg` · `icon` · `icon-xs` · `icon-sm` · `icon-lg` | Bouton. Avec Base UI, un lien se fait via `render={<a href="…" />}` (pas d'`asChild`). |
| `button-group` | `ButtonGroup`, `ButtonGroupSeparator`, `ButtonGroupText`, `buttonGroupVariants` | `orientation`: `horizontal` · `vertical` | Boutons jointifs, séparateur et texte. |
| `toggle` | `Toggle`, `toggleVariants` | `variant`: `default` · `outline`<br>`size`: `default` · `sm` · `lg` | Bouton on/off. |
| `toggle-group` | `ToggleGroup`, `ToggleGroupItem` | `orientation`: `horizontal` · `vertical` | Groupe de toggles (Base UI : `value: string[]`). |

### IA & conversation (nouveaux)
| Composant | Exports | Variantes / props | Usage |
|---|---|---|---|
| `message` | `MessageGroup`, `Message`, `MessageAvatar`, `MessageContent`, `MessageFooter`, `MessageHeader` | `align`: `start` · `end` | Mise en page d'un message : avatar, en-tête, contenu, pied. `align="end"` pour l'utilisateur. |
| `bubble` | `BubbleGroup`, `Bubble`, `BubbleContent`, `BubbleReactions` | `variant`: `default` · `secondary` · `muted` · `tinted` · `outline` · `ghost` · `destructive`<br>`side`: `top` · `bottom`<br>`align`: `start` · `end` | Bulle de chat : 7 variantes, groupes, réactions. |
| `message-scroller` | `MessageScrollerProvider`, `MessageScroller`, `MessageScrollerViewport`, `MessageScrollerContent`, `MessageScrollerItem`, `MessageScrollerButton`, `useMessageScroller`, `useMessageScrollerScrollable`, `useMessageScrollerVisibility` | — | Zone de conversation qui suit le dernier message, bouton « revenir en bas ». |
| `attachment` | `Attachment`, `AttachmentGroup`, `AttachmentMedia`, `AttachmentContent`, `AttachmentTitle`, `AttachmentDescription`, `AttachmentActions`, `AttachmentAction`, `AttachmentTrigger` | `size`: `default` · `sm` · `xs`<br>`orientation`: `horizontal` · `vertical`<br>`variant`: `icon` · `image`<br>`state`: `idle` · `uploading` · `processing` · `error` · `done` | Pièces jointes (fichier, image) : tailles, états d'upload, actions. |
| `marker` | `Marker`, `MarkerIcon`, `MarkerContent`, `markerVariants` | `variant`: `default` · `separator` · `border` | Ligne de statut inline (« Thinking… », spinner, shimmer). |
| `trace` | `Trace`, `TraceLine`, `TraceIcon`, `TraceTitle`, `TraceDescription`, `TraceCollapsible`, `TraceCollapsibleTrigger`, `TraceCollapsibleContent` | `status`: `running` · `error` · `pending` | Journal d'activité d'un agent : étapes en cours / erreur / en attente, repliables. |
| `questionnaire` | `Questionnaire`, `QuestionnaireActions`, `QuestionnaireChoice`, `QuestionnaireChoiceDescription`, `QuestionnaireChoices`, `QuestionnaireDescription`, `QuestionnaireError`, `QuestionnaireInput`, `QuestionnaireItem`, `QuestionnaireNext`, `QuestionnairePrevious`, `QuestionnaireProgress`, `QuestionnaireSkip`, `QuestionnaireSubmit`, `QuestionnaireTitle` | — | Questions pas à pas avec choix, progression, passer / précédent. |
| `code-block` | `CodeBlock`, `CodeBlockHeader`, `CodeBlockTitle`, `CodeBlockActions`, `CodeBlockCopyButton`, `CodeBlockContent`, `CodeBlockLine`, `CodeBlockFooter` | `variant`: `default` · `added` · `removed` · `highlighted`<br>`size`: `default` · `sm` | Bloc de code surligné (Shiki), copie, numéros de ligne, diff. |

### Utilitaires
| Composant | Exports | Variantes / props | Usage |
|---|---|---|---|
| `direction` | `DirectionProvider`, `useDirection` | — | `DirectionProvider` pour le RTL. |

---

## 3. Composants étendus — ReUI et Dice UI (11)

Ce sont des composants qui manquent à shadcn et qui reviennent souvent dans les SaaS BtoB et les back-offices. Ils sont installés dans leur variante **base-nova** (Base UI), réutilisent les composants `ui/` du repo et les mêmes tokens, et restent en gris. Démo et code d'exemple de chacun : `/gallery/extended/[slug]`, source dans `src/components/examples/`.

| Composant | Import | Exports principaux | Variantes / props | Démo (source) | Usage |
|---|---|---|---|---|---|
| Kanban | `@/components/reui/kanban` | `Kanban`, `KanbanBoard`, `KanbanColumn`, `KanbanColumnHandle`, `KanbanColumnContent`, `KanbanItem`, `KanbanItemHandle`, `KanbanOverlay` | — | `examples/c-kanban-1.tsx` | Tableau de tâches / pipeline en colonnes, glisser-déposer (dnd-kit) |
| Sortable | `@/components/reui/sortable` | `Sortable`, `SortableItem`, `SortableItemHandle`, `SortableOverlay` | `strategy`: `vertical` · `horizontal` · `grid` | `examples/c-sortable-1.tsx` | Liste réordonnable (priorités, étapes, menus) |
| Tree | `@/components/reui/tree` | `Tree`, `TreeItem`, `TreeItemLabel`, `TreeDragLine` | — | `examples/c-tree-1.tsx` | Arborescence : dossiers, catégories, organigramme (headless-tree) |
| Filters | `@/components/reui/filters/filters` | `Filters`, `FiltersRow` (+ types dans `filters-types`, helpers dans `filters-query`) | — | `examples/c-filters-8.tsx`, `examples/c-filters-2.tsx` | Barre de filtres façon Linear : champ → opérateur → valeur, chips, groupes |
| Stepper | `@/components/reui/stepper` | `Stepper`, `StepperItem`, `StepperTrigger`, `StepperIndicator`, `StepperSeparator`, `StepperTitle`, `StepperDescription`, `StepperNav`, `StepperPanel`, `StepperContent` | `orientation`: `horizontal` · `vertical` | `examples/c-stepper-5.tsx`, `examples/c-stepper-13.tsx` | Wizard, onboarding, suivi de process |
| Timeline | `@/components/reui/timeline` | `Timeline`, `TimelineItem`, `TimelineHeader`, `TimelineTitle`, `TimelineDate`, `TimelineContent`, `TimelineIndicator`, `TimelineSeparator` | `orientation`: `vertical` · `horizontal` | `examples/c-timeline-1.tsx` | Historique, journal d'activité, suivi de commande |
| Number Field | `@/components/reui/number-field` | `NumberField`, `NumberFieldGroup`, `NumberFieldInput`, `NumberFieldIncrement`, `NumberFieldDecrement`, `NumberFieldScrubArea` | `size`: `sm` · `default` · `lg` | `examples/c-number-field-1.tsx` | Quantité, montant, seuil (Base UI NumberField) |
| Time Picker | `@/components/reui/time-picker` | `TimePicker`, `TimePickerTrigger`, `TimePickerValue`, `TimePickerContent`, `TimePickerColumns`, `TimePickerInput`, `TimePickerFooter`, `TimePickerNow` | — | `examples/c-time-picker-2.tsx` | Heure de rendez-vous, d'envoi, de créneau |
| Tags Input | `@/components/diceui/tags-input` | `TagsInput`, `TagsInputLabel`, `TagsInputList`, `TagsInputItem`, `TagsInputInput`, `TagsInputClear` | — | `examples/tags-input-demo.tsx` | Saisie de tags, destinataires, mots-clés |
| Editable | `@/components/diceui/editable` | `Editable`, `EditableLabel`, `EditableArea`, `EditablePreview`, `EditableInput`, `EditableTrigger`, `EditableToolbar`, `EditableSubmit`, `EditableCancel` | `triggerMode`: `click` · `dblclick` · `focus` | `examples/editable-demo.tsx` | Édition en place d'une valeur (titre, nom, champ de fiche) |
| Action Bar | `@/components/diceui/action-bar` | `ActionBar`, `ActionBarSelection`, `ActionBarGroup`, `ActionBarItem`, `ActionBarSeparator`, `ActionBarClose` | `side`: `top` · `bottom` · `align`: `start` · `center` · `end` | `examples/action-bar-demo.tsx` | Barre flottante d'actions groupées sur une sélection (tableaux, listes) |

**Ajouter un composant ReUI ou Dice UI** : `npx shadcn@latest add @reui/<name>` ou `@diceui/<name>`. Ensuite :
- répondre **non** aux propositions d'écraser des fichiers `ui/` existants ;
- remplacer `import { cn } from "cn"` par `@/lib/utils` ;
- pour Dice UI, déplacer le fichier de `ui/` vers `diceui/` ;
- vérifier qu'aucune couleur codée en dur et aucun token coloré n'a été ajouté (`git diff src/app/globals.css`).

**Adaptations locales** (à refaire après une mise à jour de ces fichiers) :
- `reui/tree.tsx` : surlignage de recherche `bg-blue-50` → `bg-primary/10`.
- `diceui/action-bar.tsx` : types explicites sur les paramètres `event` des handlers (TypeScript ne les inférait pas avec le `Button` base-nova).
- `diceui/editable.tsx` : import de `@/components/diceui/visually-hidden-input`.
- Démos `c-kanban-1` et `c-sortable-1` : badges shadcn (`ui/badge`) à la place de `reui/badge`, sans couleurs ; avatars sans photos externes.

---

## 4. Primitives shadcnstudio dans `ui/` (28)

Installées par les variantes et blocs shadcnstudio, à côté des composants officiels. Import : `@/components/ui/[name]`.

| Composant | Exports |
|---|---|
| Boutons animés : `bounce-button`, `craft-button`, `flow-button`, `glass-button`, `grow-button`, `magnetic-button`, `matter-button`, `neural-button`, `orion-button`, `ripple-button`, `shimmer-button`, `swipe-button` | `BounceButton`, `CraftButton` (+ `CraftButtonLabel`, `CraftButtonIcon`), `PrimaryFlowButton` / `SecondaryFlowButton`, `GlassButton`, `PrimaryGrowButton` / `SecondaryGrowButton`, `MagneticButton`, `MatterButton`, `NeuralButton`, `PrimaryOrionButton` / `SecondaryOrionButton`, `RippleButton`, `ShimmerButton`, `PrimarySwipeButton` / `SecondarySwipeButton` |
| `motion-checkbox`, `motion-radio-group`, `motion-switch` (primitives Base UI animées avec `motion`), `motion-tabs`, `motion-tooltip`, `motion-highlight`, `motion-preset` | `Checkbox`, `RadioGroup` / `RadioGroupItem`, `Switch`, `Tabs` / `TabsList` / `TabsTrigger` / `TabsContents` / `TabsContent`, `AnimatedTooltip`, `MotionHighlight` / `MotionHighlightItem`, `MotionPreset` |
| `global-tooltip` | `TooltipProvider`, `Tooltip`, `TooltipTrigger`, `TooltipContent`, `useGlobalTooltip`, `useTooltip` |
| `multi-select` | default export (+ `useDebounce`) |
| `select-native` | `SelectNative` — ancienne primitive, plus utilisée par shadcnstudio : préférer `native-select` (officiel) |
| `rating` | `Rating`, `ratingVariants` — `variant`: `default` · `destructive` · `outline` · `secondary` · `yellow` · `dark` |
| `marquee`, `number-ticker`, `orbiting`, `border-beam`, `copy-code` | `Marquee`, `NumberTicker`, `Orbiting`, `BorderBeam`, `CopyCode` |

> Pour des wireframes, préférer les composants officiels : ces primitives sont surtout décoratives (animations, effets).

---

## 5. shadcnstudio Pro — Variantes par catégorie (608)

Import : `import Component from "@/components/shadcn-studio/[category]/[category]-[01]"`
Galerie visuelle : `/gallery/studio/[category]`

> Tous ces composants sont des **default exports**. Ils utilisent les composants shadcn officiels comme base et sont vérifiés par TypeScript comme le reste du repo.

### Accordion (16 variants) — `/gallery/studio/accordion`
- `accordion-01` : Basic FAQ collapsible
- `accordion-02` : Card-style avec séparation et shadow
- `accordion-03` : Avec icônes de catégorie
- `accordion-04` : Icône +/- animée
- `accordion-05` : Surlignage amber sur item actif
- `accordion-06` : Icône + indicateur expand
- `accordion-07` : Avatar-based (profils utilisateurs)
- `accordion-08` : Icône circulaire + sous-titre
- `accordion-09` : Style outline bordé
- `accordion-10` : Box style container unifié
- `accordion-11` : Tab-style avec fond accent
- `accordion-12` : Tab + outline + shadow
- `accordion-13..16` : Variantes supplémentaires

### Alert (30 variants) — `/gallery/studio/alert`
Couvre : info, success, warning, error, avec icônes, actions, dismiss button, gradients.
- `alert-01..05` : Styles de base (info, warning, success, error)
- `alert-06..10` : Avec icônes Lucide
- `alert-11..15` : Avec bouton d'action
- `alert-16..20` : Avec bouton dismiss
- `alert-21..30` : Variantes avancées (gradient, outlined, filled)

### Avatar (21 variants) — `/gallery/studio/avatar`
Couvre : online status, groupe, taille variable, badge de notification, with name.
- `avatar-01..05` : Basic avec tailles
- `avatar-06..10` : Avec status indicator (online/offline/away)
- `avatar-11..15` : Groupe d'avatars stackés
- `avatar-16..21` : Avec badge, nom, role

### Badge (24 variants) — `/gallery/studio/badge`
Couvre : solid, outline, soft, gradient, avec icône, dot indicator, dismissible.

### Breadcrumb (8 variants) — `/gallery/studio/breadcrumb`
Styles : minimal, avec icônes, avec séparateur custom, dropdown pour mobile.

### Button (55 variants) — `/gallery/studio/button`
Couvre : solid, outline, ghost, gradient, shimmer, glow, ripple, magnetic, bounce, loading states, avec icônes, icon-only, animated CTA.
- `button-01..10` : Styles de base
- `button-11..20` : Avec icônes et états
- `button-21..30` : Effets visuels (shimmer, gradient, glow)
- `button-31..40` : Animations (ripple, bounce, magnetic)
- `button-41..55` : Patterns avancés (loading, split, social OAuth)

### Button Group (16 variants) — `/gallery/studio/button-group`
Couvre : segmented control, toolbar, actions groupées, mixed sizes.

### Calendar (25 variants) — `/gallery/studio/calendar`
Couvre : simple, range, avec presets, booking, inline, avec events.

### Card (17 variants) — `/gallery/studio/card`
Couvre : product card, stat card, pricing, profile, feature card, avec image, CTA.

### Checkbox (19 variants) — `/gallery/studio/checkbox`
Couvre : basic, avec label, avec description, indeterminate, group, card-style.

### Collapsible (10 variants) — `/gallery/studio/collapsible`
Plus simple qu'accordion — section unique avec différents styles de trigger.

### Combobox (14 variants) — `/gallery/studio/combobox`
Couvre : basic select, multi-select, async search, avec groupes, avec créer.

### Data Table (13 variants) — `/gallery/studio/data-table`
Couvre : simple, avec sort, avec filtres, avec pagination, avec row selection, avec actions.

### Date Picker (13 variants) — `/gallery/studio/date-picker`
Couvre : inline, popover, range, avec presets (last 7 days, this month), datetime.

### Dialog (26 variants) — `/gallery/studio/dialog`
Couvre : confirmation, formulaire, image preview, deletion warning, loading, multi-step.

### Dropdown Menu (16 variants) — `/gallery/studio/dropdown-menu`
Couvre : simple actions, avec icônes, avec submenus, avec checkboxes, user menu, context actions.

### Form (10 variants) — `/gallery/studio/form`
Layouts complets : login, registration, settings, payment, contact, multi-step.

### Input (46 variants) — `/gallery/studio/input`
Couvre : basic, avec label, avec icône préfixe/suffixe, avec bouton, search, password, tags, currency, avec validation.
- `input-01..10` : Styles de base
- `input-11..20` : Avec addons (icônes, boutons)
- `input-21..30` : États (focus, error, success, disabled)
- `input-31..46` : Patterns avancés (search, tags, file, currency)

### Input Mask (6 variants) — `/gallery/studio/input-mask`
Phone, IBAN, date, credit card, numéro de sécu, custom mask.

### Input OTP (10 variants) — `/gallery/studio/input-otp`
6-digit, 4-digit, avec séparateur, avec timer, avec resend.

### Pagination (15 variants) — `/gallery/studio/pagination`
Couvre : basic, avec ellipsis, compact, avec infos (1-10 of 100), infinite scroll trigger.

### Popover (15 variants) — `/gallery/studio/popover`
Couvre : tooltip-like, formulaire inline, user card, color picker, date picker popover.

### Radio Group (15 variants) — `/gallery/studio/radio-group`
Couvre : vertical, horizontal, card-style, avec description, plan selector, avec images.

### Select (38 variants) — `/gallery/studio/select`
Couvre : basic, avec groupes, avec icônes, multi-select, avec recherche, avec créer, country select.

### Sheet (7 variants) — `/gallery/studio/sheet`
Left/right/top/bottom + avec formulaire, avec navigation, avec détail d'objet.

### Sonner (20 variants) — `/gallery/studio/sonner`
Couvre : success, error, info, warning, loading, avec action, avec undo, promise toast.

### Switch (20 variants) — `/gallery/studio/switch`
Couvre : basic, avec label, avec description, avec icône, group de settings, card-style.

### Table (16 variants) — `/gallery/studio/table`
Couvre : simple, striped, avec actions, avec pagination, compact, avec frozen column.

### Tabs (29 variants) — `/gallery/studio/tabs`
Couvre : underline, pill, box, vertical, avec icônes, avec badge, scrollable, card-style.

### Textarea (21 variants) — `/gallery/studio/textarea`
Couvre : basic, auto-grow, avec compteur, avec toolbar, avec mentions (@), avec emoji.

### Tooltip (17 variants) — `/gallery/studio/tooltip`
Couvre : simple, avec arrow, multiline, avec raccourci clavier, rich tooltip, avec action.

---

## 6. shadcnstudio Pro — Blocs pages complètes (87)

Import : `import BlockName from "@/components/shadcn-studio/blocks/[block-name]/[block-name]"`
Chaque block a sa propre page Next.js : `/[block-name]`

### Marketing & Landing
| Block | URL | Description |
|---|---|---|
| `hero-section-01` | `/hero-section-01` | Hero minimaliste texte centré |
| `hero-section-35` | `/hero-section-35` | Hero avec image et CTA |
| `hero-section-41` | `/hero-section-41` | Hero avec animation |
| `navbar-component-01` | `/navbar-component-01` | Navbar responsive avec mega-menu |
| `features-section-01` | `/features-section-01` | Features 3 colonnes avec icônes |
| `bento-grid-15` | `/bento-grid-15` | Grille bento animée (features, chiffres clés) |
| `pricing-component-01` | `/pricing-component-01` | Pricing 3 plans |
| `faq-component-01` | `/faq-component-01` | FAQ accordéon |
| `faq-component-17` | `/faq-component-17` | FAQ variante |
| `footer-component-01` | `/footer-component-01` | Footer multi-colonnes |
| `cta-section-01/10/12` | `/cta-section-01` | CTA variantes |
| `testimonials-component-01/18` | `/testimonials-component-01` | Témoignages clients |
| `social-proof-01/07` | `/social-proof-01` | Logos clients, stats |
| `logo-cloud-01` | `/logo-cloud-01` | Cloud de logos partenaires |
| `blog-component-01/15/17` | `/blog-component-01` | Grilles d'articles |
| `gallery-component-01` | `/gallery-component-01` | Galerie d'images |
| `team-section-01` | `/team-section-01` | Grille d'équipe |
| `compare-07` | `/compare-07` | Comparateur avant/après |
| `timeline-component-05` | `/timeline-component-05` | Timeline verticale |
| `portfolio-01` | `/portfolio-01` | Portfolio projets |
| `about-us-page-01` | `/about-us-page-01` | Page À propos complète |
| `contact-us-page-01` | `/contact-us-page-01` | Page contact avec formulaire |
| `app-integration-01` | `/app-integration-01` | Section intégrations |

### Authentification
| Block | URL | Description |
|---|---|---|
| `login-page-01` | `/login-page-01` | Login complet avec OAuth |
| `register-01` | `/register-01` | Inscription |
| `forgot-password-01` | `/forgot-password-01` | Mot de passe oublié |
| `reset-password-01` | `/reset-password-01` | Réinitialisation MDP |
| `two-factor-authentication-01` | `/two-factor-authentication-01` | 2FA avec OTP |
| `verify-email-01` | `/verify-email-01` | Vérification email |

### Dashboard & App
| Block | URL | Description |
|---|---|---|
| `application-shell-01` | `/application-shell-01` | Shell d'application avec sidebar |
| `dashboard-shell-01` | `/dashboard-shell-01` | Shell de dashboard |
| `dashboard-sidebar-01` | `/dashboard-sidebar-01` | Sidebar de dashboard |
| `dashboard-header-01` | `/dashboard-header-01` | Header de dashboard |
| `dashboard-footer-01` | `/dashboard-footer-01` | Footer de dashboard |
| `dashboard-dropdown-01/02` | `/dashboard-dropdown-01` | Menus dropdown dashboard |
| `dashboard-dialog-01/02/21/22` | `/dashboard-dialog-01` | Modals dashboard |
| `chart-component-01` | `/chart-component-01` | Composant graphique |
| `statistics-component-01/12` | `/statistics-component-01` | KPIs et statistiques |
| `widget-component-01/02` | `/widget-component-01` | Widgets dashboard |
| `form-layout-01/02` | `/form-layout-01` | Layouts de formulaires |
| `account-settings-01` | `/account-settings-01` | Page paramètres compte |
| `file-upload-01` | `/file-upload-01` | Upload de fichiers |
| `onboarding-feed-01` | `/onboarding-feed-01` | Feed onboarding |
| `empty-state-01` | `/empty-state-01` | État vide |

### E-commerce (17 blocs)

Briques complètes pour composer un parcours d'achat : catalogue → fiche produit → panier → checkout → confirmation.

#### Catalogue & fiche produit
| Block | URL | Quand l'utiliser |
|---|---|---|
| `product-list-01` | `/product-list-01` | Grille de produits compacte |
| `product-list-02` | `/product-list-02` | Grille avec filtres latéraux |
| `product-list-03` | `/product-list-03` | Grille avec animations |
| `product-overview-01` | `/product-overview-01` | Fiche produit — layout 2 colonnes standard |
| `product-overview-02` | `/product-overview-02` | Fiche produit — layout alternatif |
| `product-quick-view-01` | `/product-quick-view-01` | Modal aperçu rapide depuis catalogue |
| `product-quick-view-02` | `/product-quick-view-02` | Modal aperçu rapide variante |
| `product-category-01` | `/product-category-01` | Header de catégorie / breadcrumb produit |
| `category-filter-01` | `/category-filter-01` | Sidebar filtres catalogue (multi-critères) |

#### Panier & checkout
| Block | URL | Quand l'utiliser |
|---|---|---|
| `shopping-cart-01` | `/shopping-cart-01` | Panier — variante popover compact |
| `shopping-cart-02` | `/shopping-cart-02` | Panier — variante Sheet drawer |
| `checkout-page-01` | `/checkout-page-01` | Tunnel coordonnées — flow multi-étapes |
| `checkout-page-02` | `/checkout-page-02` | Tunnel coordonnées — variante simplifiée |
| `order-summary-01` | `/order-summary-01` | Récap commande + confirmation |
| `order-summary-02` | `/order-summary-02` | Récap commande avec items détaillés |

#### Marketing & conversion
| Block | URL | Quand l'utiliser |
|---|---|---|
| `offer-modal-01` | `/offer-modal-01` | Modale offre / promotion (au scroll, intent exit) |
| `announcement-banner-01` | `/announcement-banner-01` | Bandeau haut de page (livraison offerte, etc.) |
| `announcement-banner-02` | `/announcement-banner-02` | Variante avec CTA |
| `mega-footer-01` | `/mega-footer-01` | Footer étendu pour landing catalogue |

#### E-commerce extension
| Block | URL | Quand l'utiliser |
|---|---|---|
| `product-reviews-01` | `/product-reviews-01` | Avis clients avec rating étoiles (layout 1) |
| `product-reviews-02` | `/product-reviews-02` | Avis clients avec rating étoiles (layout 2) |
| `gift-card-01` | `/gift-card-01` | Cartes cadeaux — achat / personnalisation |

### Utilitaires (8 blocs)

Composants transverses pour parcours d'achat, formulaires, et pages systèmes.

| Block | URL | Quand l'utiliser |
|---|---|---|
| `multi-step-form-01` | `/multi-step-form-01` | Tunnel/wizard multi-étapes (onboarding, demande de devis, configuration) |
| `cookies-consent-01` | `/cookies-consent-01` | Bandeau RGPD (variant 1) |
| `cookies-consent-02` | `/cookies-consent-02` | Bandeau RGPD (variant 2) |
| `error-page-01` | `/error-page-01` | Page 404 / erreur (illustration centrale) |
| `error-page-02` | `/error-page-02` | Page 404 / erreur (variant alternatif) |
| `card-nav-01` | `/card-nav-01` | Navigation alternative en cards (mobile/tablette) |
| `download-01` | `/download-01` | Section téléchargement (app stores, brochures, PDF) |
| `user-schedule-01` | `/user-schedule-01` | Calendrier de créneaux / prise de rendez-vous |

---

---

## 7. Pages de référence

### Pages de composition
| Page | URL | Composants démontrés |
|---|---|---|
| Dashboard SaaS | `/examples/dashboard` | `SidebarProvider`, `AppSidebar`, `Breadcrumb`, `Avatar`, `DropdownMenu`, `Card` (stat), `ChartAreaInteractive`, `Table` |
| Landing page | `/examples/landing` | Navbar, Hero, `Card` (features/pricing), `Accordion` (FAQ), Footer |
| Settings | `/examples/settings` | `Tabs`, `Input`, `Textarea`, `Select`, `Switch`, `RadioGroup`, `Button`, `Card`, `Badge` |
| Sign In | `/examples/signin` | `Card`, `Input`, `Button`, `Separator`, boutons OAuth |
| CRM List | `/examples/crm-list` | `Table`, `Checkbox`, `Sheet` (détail), `Select` (filtre), `ToggleGroup`, `Badge`, `DropdownMenu` |

### Blocs shadcn officiels
| Bloc | URL | Fichiers |
|---|---|---|
| `dashboard-01` | `/dashboard` | `app-sidebar`, `nav-main`, `nav-documents`, `nav-secondary`, `nav-user`, `site-header`, `section-cards`, `chart-area-interactive`, `data-table` (TanStack Table v8, tri, colonnes, drag & drop, drawer de détail) dans `src/components/` ; données : `src/app/dashboard/data.json` |
| `login-01` | `/login` | `src/components/login-form.tsx` |
| `signup-01` | `/signup` | `src/components/signup-form.tsx` |

---

## 8. Patterns d'import recommandés

### Server Component (RSC)
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
```

### Client Component (interactif)
```tsx
"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
```

### Composition Base UI (`render` au lieu d'`asChild`)
```tsx
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Modifier</DialogTrigger>
  <DialogContent>
    <DialogTitle>Modifier le client</DialogTitle>
  </DialogContent>
</Dialog>

// Un bouton qui est un lien
<Button render={<a href="/clients" />} nativeButton={false}>Clients</Button>
```

### Variante shadcnstudio
```tsx
// default export — pas de destructuring
import Accordion05 from "@/components/shadcn-studio/accordion/accordion-05"
import Button22 from "@/components/shadcn-studio/button/button-22"
```

### Composant ReUI / Dice UI
```tsx
import { Timeline, TimelineItem, TimelineHeader, TimelineTitle, TimelineDate, TimelineContent, TimelineIndicator, TimelineSeparator } from "@/components/reui/timeline"
import { TagsInput, TagsInputList, TagsInputItem, TagsInputInput } from "@/components/diceui/tags-input"
// Exemples complets : src/components/examples/
```

### Chart avec recharts
```tsx
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, CartesianGrid } from "recharts"
```

### Sidebar layout
```tsx
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar" // bloc dashboard-01
// <SidebarProvider><AppSidebar variant="inset" /><SidebarInset>…</SidebarInset></SidebarProvider>
```

### Toasts
```tsx
// sonner (variantes et blocs shadcnstudio)
import { Toaster } from "@/components/ui/sonner"   // dans le layout
import { toast } from "sonner"
toast.success("Client enregistré")

// ou Base UI (nouveau composant officiel)
import { Toaster, toast } from "@/components/ui/toast" // <Toaster>{children}</Toaster> dans le layout
toast.add({ title: "Client enregistré", description: "Les modifications sont visibles par l'équipe." })
```

---

## 9. Règles de sélection de composant

| Besoin | Composant recommandé |
|---|---|
| Confirmation irréversible | `AlertDialog` |
| Formulaire secondaire | `Dialog` ou `Sheet` |
| Détail d'un item | `Sheet` (droite) ; sur mobile `Drawer` (`swipeDirection="down"`) |
| Navigation principale | `Sidebar` (app) + `NavigationMenu` (site) |
| Champ de formulaire | `Field` + `FieldLabel` + contrôle + `FieldError` |
| Filtres simples | `Select`, `ToggleGroup`, `Popover` |
| Filtres avancés (champ / opérateur / valeur) | `Filters` (ReUI) |
| Sélection simple | `Select` |
| Sélection avec recherche | `Combobox` (ou variantes shadcnstudio) |
| Sélection multiple | `Combobox` en chips, `multi-select` shadcnstudio, groupe de `Checkbox` |
| Saisie de tags / destinataires | `TagsInput` (Dice UI) |
| Nombre, quantité, montant | `NumberField` (ReUI) |
| Date unique | `date-picker` shadcnstudio |
| Plage de dates | `Calendar` avec `mode="range"` |
| Heure | `TimePicker` (ReUI) |
| Actions sur une ligne | `DropdownMenu` avec `MoreHorizontal` |
| Actions groupées sur une sélection | `ActionBar` (Dice UI) |
| Édition en place | `Editable` (Dice UI) |
| État d'un objet | `Badge` |
| Feedback utilisateur | toast (`sonner` ou `ui/toast`) |
| État de chargement | `Skeleton` ou `Spinner` |
| État vide | `Empty` ou `empty-state-01` |
| Données tabulaires simples | `Table` |
| Données tabulaires complexes | `data-table` shadcnstudio ou `src/components/data-table.tsx` (TanStack Table v8) |
| Tableau de tâches / pipeline | `Kanban` (ReUI) |
| Liste réordonnable | `Sortable` (ReUI) |
| Arborescence (dossiers, catégories) | `Tree` (ReUI) |
| Wizard / process en étapes | `Stepper` (ReUI) ou `multi-step-form-01` |
| Historique / activité | `Timeline` (ReUI) ou `timeline-component-05` |
| KPIs / stats | `Card` + `CardHeader` + `Badge` (tendance) |
| Graphique | `ChartContainer` + recharts |
| Interface de chat / assistant IA | `Message` + `Bubble` + `MessageScroller`, `Attachment`, `Marker` (« Thinking… »), `Trace` (étapes d'un agent) |
| Questionnaire guidé | `Questionnaire` |
| Code / JSON à afficher | `CodeBlock` |
| Onboarding | `onboarding-feed-01` |
| Page 404 / erreur | `error-page-01` ou `error-page-02` |
| Bandeau cookies (RGPD) | `cookies-consent-01` ou `cookies-consent-02` |
| Page de téléchargement | `download-01` |
| Calendrier de créneaux | `user-schedule-01` |
| Catalogue produits | `product-list-01/02/03` |
| Fiche produit | `product-overview-01/02` |
| Aperçu produit (modale) | `product-quick-view-01/02` |
| Panier latéral | `shopping-cart-02` (drawer) ou `shopping-cart-01` (popover) |
| Checkout multi-étapes | `checkout-page-01` |
| Récap commande | `order-summary-01/02` |
| Avis clients | `product-reviews-01/02` |
| Filtres catalogue | `category-filter-01` |

---

## 10. Variables de thème (CSS)

Définies dans `src/app/globals.css` (`:root` et `.dark`), toutes en niveaux de gris sauf `--destructive`.

```css
/* Couleurs principales */
--background --foreground
--primary --primary-foreground
--secondary --secondary-foreground
--muted --muted-foreground
--accent --accent-foreground
--destructive
--border --input --ring

/* Surfaces */
--card --card-foreground
--popover --popover-foreground
--sidebar --sidebar-foreground --sidebar-primary --sidebar-primary-foreground
--sidebar-accent --sidebar-accent-foreground --sidebar-border --sidebar-ring

/* Charts (gris) */
--chart-1 .. --chart-5

/* Radius — base 0.625rem */
--radius --radius-sm --radius-md --radius-lg --radius-xl --radius-2xl --radius-3xl --radius-4xl

/* Typo */
--font-sans --font-mono --font-heading
```

---

## 11. Quickstart pour créer un écran

1. **Structure** : choisir un layout (sidebar, centré, pleine largeur)
2. **Navigation** : `Sidebar` pour une app, `NavigationMenu` pour un site, `Breadcrumb` pour les pages internes
3. **Contenu** : composer avec `Card`, `Table`, `Chart`, `Kanban`, `Timeline`, `Tree` selon les données
4. **Formulaires** : `Field` + `Input` / `Select` / `NumberField` / `TagsInput` + `Button`, dans une `Card`
5. **Filtres** : `Filters` (ReUI) au-dessus d'une table ou d'une liste
6. **Feedback** : `Badge` pour les statuts, `Alert` pour les messages, toast pour les confirmations
7. **Actions** : `Button` (primary) pour le CTA, `DropdownMenu` pour les actions de ligne, `ActionBar` pour les actions groupées
8. **Overlays** : `Dialog` pour les modales, `Sheet` pour les panneaux de détail

---

## 12. Limites connues

- **shadcnstudio en Base UI natif** : variantes, blocs et primitives viennent du registre `base-nova` de shadcnstudio (réinstallés en octobre 2026). Plus aucun fichier ne porte `// @ts-nocheck` : tout le repo est vérifié par TypeScript.
- **Lint** : les règles qui échouent dans le code copié des registres (`src/components/**`, `src/hooks/**`) sont des avertissements, pas des erreurs (voir `eslint.config.mjs`). Le code de l'app (`src/app`, `src/lib`) reste en erreur.
- **Locale fixée à `en-US`** : `ui/progress`, `ui/slider` et `reui/number-field` passent `locale="en-US"` à Base UI, et les variantes et blocs shadcnstudio appellent `toLocaleString('en-US')` / `toLocaleDateString('en-US')`. Sans locale explicite, le serveur (Node, en-US) et un navigateur français formatent différemment (« 75% » / « 75 % », « 1,234 » / « 1 234 »), ce qui casse l'hydratation. Pour un projet en français, passer `locale="fr-FR"` partout : il suffit que la valeur soit la même côté serveur et côté client.
- **Modifications locales des composants officiels** : `progress` et `slider` (locale), `chart-area-interactive` (type du `labelFormatter` avec recharts 3.10) et `data-table` (drawer Base UI, TanStack Table v8 conservé, alors que le bloc officiel est passé en v9). À vérifier avant toute réinstallation avec `--overwrite`.
- **Corrections dans le code shadcnstudio** (à refaire si ces fichiers sont réinstallés avec `--overwrite`) :
  - Locale `en-US` explicite (voir ci-dessus) : `blocks/bento-grid-15/accounting-of-transaction`, `blocks/pricing-component-01`, `date-picker-01`, `-02`, `-03`, `-07`, `-10`, `-11`, `-13`.
  - API zod 4 : `required_error` / `invalid_type_error` (zod 3) remplacés par `error` dans `form-01`, `form-07`, `form-08`, `form-09`, `form-10` et `sheet-05`. Le registre réclame `zod@3.25.76`, le repo reste en zod 4.
  - `date-picker-13` : `labelFormatter` du graphique typé avec recharts 3.10 (`String(value)`).
  - Mise en forme : après l'installation, les fichiers ont été reformatés avec le style Prettier de shadcnstudio (guillemets simples, sans point-virgule, 120 colonnes). La CLI laisse sinon des icônes coupées sur deux lignes. Commande : `npx prettier@3.6.2 --no-semi --single-quote --jsx-single-quote --print-width 120 --trailing-comma none --arrow-parens avoid --write <fichiers>`.
- **Contenu shadcnstudio non neutre** : le thème est gris, mais 122 fichiers de variantes et blocs gardent des classes Tailwind colorées codées en dur (montants verts et rouges, `checkbox-10` / `-12`, alertes…). 138 fichiers chargent aussi des images ou avatars depuis `cdn.shadcnstudio.com`. C'est le contenu d'exemple livré par le registre, pas un réglage du thème. Pour un wireframe en gris, préférer les composants officiels ou retirer ces classes dans le projet.
- **Dépendances** : après un `shadcn add @ss-…`, vérifier `git diff package.json`. La CLI ajoute le paquet `cn`, passe zod en 3.25 et peut rétrograder `recharts` : ne pas garder ces changements.
- **`cn`** : le paquet `cn` proposé par la CLI shadcn 4.22 n'est pas adopté. Sur les combinaisons de classes du repo, il donne un résultat différent de tailwind-merge dans environ 0,3 % des cas (dégradés, ombres des variantes shadcnstudio).
