# Design System — shadcn-ds-4060
> Référence complète pour Claude Design et tout agent IA composant des écrans.
> Stack : Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · shadcnstudio Pro

---

## 1. Principes d'utilisation

- **Import officiel shadcn** : `import { ComponentName } from "@/components/ui/[name]"`
- **Import shadcnstudio variant** : `import ComponentName from "@/components/shadcn-studio/[category]/[category]-[01]"` (default export)
- **Thème** : neutral, CSS variables oklch, pas de customisation — base pure shadcn
- **Icônes** : `lucide-react` exclusivement (pas de FontAwesome, pas de Material)
- **Charts** : `recharts` via le composant `chart` de shadcn (`ChartContainer`, `ChartTooltip`)
- **Animations** : `framer-motion` (déjà installé via shadcnstudio)
- **Police** : Geist Sans (variable `--font-geist-sans`)

---

## 2. Composants officiels shadcn (55)

Import path : `@/components/ui/[name]`

### Layout & Structure
| Composant | Import | Usage principal |
|---|---|---|
| `card` | `Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction` | Container principal — dashboard tiles, product cards, form containers |
| `separator` | `Separator` | Divider horizontal ou vertical entre sections |
| `resizable` | `ResizablePanelGroup, ResizablePanel, ResizableHandle` | Layouts à panneaux redimensionnables |
| `scroll-area` | `ScrollArea` | Zone de scroll personnalisée avec scrollbar custom |
| `aspect-ratio` | `AspectRatio` | Container avec ratio fixe (images, vidéos) |
| `sidebar` | `SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarTrigger` | Navigation latérale complète avec collapse |

### Navigation
| Composant | Import | Usage principal |
|---|---|---|
| `breadcrumb` | `Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator` | Fil d'Ariane hiérarchique |
| `navigation-menu` | `NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink` | Menu de navigation principal avec sous-menus |
| `menubar` | `Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem` | Barre de menu style application desktop |
| `tabs` | `Tabs, TabsList, TabsTrigger, TabsContent` | Sections tabbées |
| `pagination` | `Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis` | Navigation entre pages |

### Formulaires & Saisie
| Composant | Import | Usage principal |
|---|---|---|
| `input` | `Input` | Champ texte standard |
| `textarea` | `Textarea` | Zone de texte multiligne |
| `select` | `Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel` | Liste déroulante |
| `checkbox` | `Checkbox` | Case à cocher booléenne |
| `radio-group` | `RadioGroup, RadioGroupItem` | Choix unique parmi plusieurs options |
| `switch` | `Switch` | Bascule on/off |
| `slider` | `Slider` | Sélecteur de valeur par glissement |
| `input-otp` | `InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator` | Saisie de code OTP/2FA |
| `combobox` | `Combobox` (base-ui) | Dropdown avec recherche — voir shadcnstudio variants pour API simple |
| `calendar` | `Calendar` | Sélecteur de date (react-day-picker) |
| `label` | `Label` | Étiquette de champ de formulaire |

### Overlays & Popups
| Composant | Import | Usage principal |
|---|---|---|
| `dialog` | `Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose` | Modal overlay — confirmations, formulaires |
| `alert-dialog` | `AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel` | Confirmation d'action destructive |
| `sheet` | `Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose` | Panneau latéral coulissant |
| `drawer` | `Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose` | Tiroir bottom/side (Vaul) |
| `popover` | `Popover, PopoverTrigger, PopoverContent` | Panneau flottant au clic |
| `hover-card` | `HoverCard, HoverCardTrigger, HoverCardContent` | Carte preview au survol |
| `tooltip` | `Tooltip, TooltipTrigger, TooltipContent` | Info-bulle au survol (wrapper app avec TooltipProvider) |
| `dropdown-menu` | `DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem` | Menu contextuel d'actions |
| `context-menu` | `ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem` | Menu clic-droit |

### Feedback & Indicateurs
| Composant | Import | Usage principal |
|---|---|---|
| `alert` | `Alert, AlertTitle, AlertDescription` | Message d'info contextuel inline |
| `badge` | `Badge` | Label d'état, compteur, catégorie. Variants : `default`, `secondary`, `destructive`, `outline` |
| `progress` | `Progress` | Barre de progression |
| `skeleton` | `Skeleton` | Placeholder de chargement |
| `sonner` | `Toaster` (dans layout) + `toast()` de `sonner` | Notifications toast |
| `spinner` | `Spinner` | Indicateur de chargement circulaire |

### Data Display
| Composant | Import | Usage principal |
|---|---|---|
| `table` | `Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption` | Tableau de données — toujours utiliser avec TanStack Table pour les cas complexes |
| `chart` | `ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent` + `recharts` | Graphiques — wrapp recharts avec tokens de couleurs |
| `avatar` | `Avatar, AvatarImage, AvatarFallback` | Photo de profil avec fallback initiales |
| `carousel` | `Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext` | Carrousel de contenu |
| `accordion` | `Accordion, AccordionItem, AccordionTrigger, AccordionContent` | Sections accordéon (base-ui — pas de prop `type="single"`) |
| `collapsible` | `Collapsible, CollapsibleTrigger, CollapsibleContent` | Section unique expandable |

### Actions
| Composant | Import | Usage principal |
|---|---|---|
| `button` | `Button` | Variants : `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`. Sizes : `default`, `sm`, `lg`, `icon` |
| `button-group` | `ButtonGroup` | Groupe de boutons jointifs |
| `toggle` | `Toggle` | Bouton on/off |
| `toggle-group` | `ToggleGroup, ToggleGroupItem` | Groupe de toggles (base-ui — value: `readonly string[]`) |
| `command` | `Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty, CommandSeparator` | Palette de commandes / recherche |

### Utilitaires
| Composant | Import | Usage principal |
|---|---|---|
| `kbd` | `Kbd` | Affichage de raccourcis clavier |
| `empty` | `Empty` | État vide générique |
| `field` | `Field` | Wrapper de champ de formulaire |
| `item` | `Item` | Élément de liste générique |
| `input-group` | `InputGroup, InputGroupInput, InputGroupAddon` | Input avec préfixe/suffixe |
| `native-select` | `NativeSelect` | Select HTML natif |
| `direction` | `DirectionProvider` | RTL support |

---

## 3. shadcnstudio Pro — Variants par catégorie

Import : `import Component from "@/components/shadcn-studio/[category]/[category]-[01]"`
Galerie visuelle : `/gallery/studio/[category]`

> Tous ces composants sont des **default exports**. Ils utilisent les composants shadcn officiels comme base.

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

## 4. shadcnstudio Blocks — Pages complètes (85)

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

## 5. Composition patterns — Reference pages

| Page | URL | Composants démontrés |
|---|---|---|
| Dashboard SaaS | `/examples/dashboard` | `SidebarProvider`, `AppSidebar`, `Breadcrumb`, `Avatar`, `DropdownMenu`, `Card` (stat), `ChartAreaInteractive`, `Table` |
| Landing page | `/examples/landing` | Navbar, Hero, `Card` (features/pricing), `Accordion` (FAQ), Footer |
| Settings | `/examples/settings` | `Tabs`, `Input`, `Textarea`, `Select`, `Switch`, `RadioGroup`, `Button`, `Card`, `Badge` |
| Sign In | `/examples/signin` | `Card`, `Input`, `Button`, `Separator`, OAuth buttons |
| CRM List | `/examples/crm-list` | `Table`, `Checkbox`, `Sheet` (détail), `Select` (filter), `ToggleGroup`, `Badge`, `DropdownMenu` |

---

## 6. Patterns d'import recommandés

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

### shadcnstudio variant
```tsx
// default export — pas de destructuring
import Accordion05 from "@/components/shadcn-studio/accordion/accordion-05"
import Button22 from "@/components/shadcn-studio/button/button-22"
```

### Chart avec recharts
```tsx
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, CartesianGrid } from "recharts"
// ChartConfig type pour les couleurs
```

### Sidebar layout
```tsx
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar" // Pro Block dashboard-01
// Wrap page avec <SidebarProvider><AppSidebar /><SidebarInset>...</SidebarInset></SidebarProvider>
```

---

## 7. Règles de sélection de composant

| Besoin | Composant recommandé |
|---|---|
| Confirmation irréversible | `AlertDialog` |
| Formulaire secondaire | `Dialog` ou `Sheet` |
| Détail d'un item | `Sheet` (droite) |
| Navigation principale | `Sidebar` + `NavigationMenu` |
| Filtres avancés | `Sheet` ou `Popover` |
| Sélection simple | `Select` |
| Sélection avec recherche | `Combobox` (shadcnstudio variants plus simples) |
| Sélection multiple | `combobox` variant multi ou `Checkbox` group |
| Date unique | `date-picker` shadcnstudio |
| Plage de dates | `calendar` avec range |
| Actions sur une ligne | `DropdownMenu` avec `MoreHorizontal` |
| État d'un objet | `Badge` |
| Feedback utilisateur | `sonner` (toast) |
| État de chargement | `Skeleton` ou `Spinner` |
| Données tabulaires simples | `Table` |
| Données tabulaires complexes | `data-table` shadcnstudio (TanStack Table intégré) |
| KPIs/stats | `Card` + `CardHeader` + `Badge` trend |
| Graphique | `ChartContainer` + recharts |
| Onboarding | `onboarding-feed-01` (shadcnstudio block) |
| Tunnel / wizard multi-étapes | `multi-step-form-01` |
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

## 8. Variables de thème (CSS)

```css
/* Couleurs principales */
--background    /* Fond de page */
--foreground    /* Texte principal */
--primary       /* Actions principales */
--secondary     /* Actions secondaires */
--muted         /* Fond doux, texte secondaire */
--accent        /* Hover states */
--destructive   /* Actions dangereuses, erreurs */
--border        /* Bordures */
--input         /* Fond d'input */
--ring          /* Focus ring */

/* Couleurs de composants */
--card          /* Fond de card */
--popover       /* Fond de popover/dialog */
--sidebar       /* Fond de sidebar */

/* Charts */
--chart-1 .. --chart-5

/* Radius */
--radius        /* Base: 0.625rem */
--radius-sm --radius-md --radius-lg --radius-xl
```

---

## 9. Quickstart pour créer un écran

1. **Structure** : Choisir un layout (sidebar, centré, full-width)
2. **Navigation** : `Sidebar` pour app, `NavigationMenu` pour landing, `Breadcrumb` pour pages internes
3. **Contenu** : Composer avec `Card`, `Table`, `Chart` selon les données
4. **Formulaires** : `Input` + `Label` + `Select` + `Button` en `Card`
5. **Feedback** : `Badge` pour statuts, `Alert` pour messages, `sonner` pour toasts
6. **Actions** : `Button` primary pour CTA, `DropdownMenu` pour actions contextuelles
7. **Overlays** : `Dialog` pour modals, `Sheet` pour panneaux de détail

