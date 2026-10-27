# shadcn-ds-4060

Design System component showcase for **40-60 Studio** — built with [shadcn/ui](https://ui.shadcn.com) (style `base-nova`, Base UI primitives), shadcnstudio Pro, [ReUI](https://reui.io) and [Dice UI](https://diceui.com), Tailwind CSS v4 and Next.js 16 (App Router).

This repo is a **pure component vitrine**: no business logic, no backend. It is the frozen template for client projects and the design-system source for Claude Design grayscale wireframes. The full reference for AI agents is [`DESIGN-SYSTEM.md`](./DESIGN-SYSTEM.md).

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16.4 (App Router, Turbopack, TypeScript) · React 19.3 |
| Styling | Tailwind CSS v4 — theme `neutral`, grayscale only |
| Components | shadcn/ui (`base-nova`, Base UI) + shadcnstudio Pro + ReUI + Dice UI |
| Charts | Recharts (via shadcn `chart`) |
| Tables | TanStack Table v8 |
| Icons | Lucide React |
| Package manager | npm |

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the component index.

```bash
npm run build   # production build (type-check included)
npm run lint    # ESLint — registry code is reported as warnings, app code as errors
```

---

## Example pages

| URL | What it demonstrates |
|---|---|
| `/examples/dashboard` | SaaS dashboard — `SidebarProvider`, `AppSidebar`, `Breadcrumb`, `Avatar`, `DropdownMenu`, 4 stat `Card`s, `ChartAreaInteractive` (Recharts), `Table` with pagination |
| `/examples/landing` | Marketing landing — navbar, hero, features grid with Lucide icons, 3-column pricing `Card`s, `Accordion` FAQ, footer |
| `/examples/settings` | Settings page — `Tabs` (Profile / Account / Notifications / Billing), `Input`, `Select`, `Switch`, `RadioGroup`, `Textarea`, `Button` |
| `/examples/signin` | Sign-in — centered `Card`, email/password `Input`s, OAuth buttons (Google + GitHub), `Separator`, forgot-password link |
| `/examples/crm-list` | CRM contact list — `Table` with row selection (`Checkbox`), `Combobox` filter, `ToggleGroup` status filter, `Sheet` detail panel |

## Blocks

| URL | Block |
|---|---|
| `/dashboard` | `dashboard-01` — shadcn official block (sidebar, KPI cards, area chart, data table with detail drawer) |
| `/login` | `login-01` — shadcn official block |
| `/signup` | `signup-01` — shadcn official block |
| `/bento-grid-15` | `bento-grid-15` — shadcnstudio Pro block |
| `/[block-name]` | the 87 shadcnstudio Pro blocks, see `/gallery` |

## Galleries

| URL | Content |
|---|---|
| `/gallery` | Index of every component and block |
| `/gallery/studio/[category]` | The 608 shadcnstudio variants, by category |
| `/gallery/extended` | Live demos of the new official components and of the ReUI / Dice UI components |

---

## shadcn/ui official components (65)

`accordion` · `alert` · `alert-dialog` · `aspect-ratio` · `attachment` · `avatar` · `badge` · `breadcrumb` · `bubble` · `button` · `button-group` · `calendar` · `card` · `carousel` · `chart` · `checkbox` · `code-block` · `collapsible` · `combobox` · `command` · `context-menu` · `dialog` · `direction` · `drawer` · `dropdown-menu` · `empty` · `field` · `form` · `hover-card` · `input` · `input-group` · `input-otp` · `item` · `kbd` · `label` · `marker` · `menubar` · `message` · `message-scroller` · `native-select` · `navigation-menu` · `pagination` · `popover` · `progress` · `questionnaire` · `radio-group` · `resizable` · `scroll-area` · `select` · `separator` · `sheet` · `sidebar` · `skeleton` · `slider` · `sonner` · `spinner` · `switch` · `table` · `tabs` · `textarea` · `toast` · `toggle` · `toggle-group` · `tooltip` · `trace`

## ReUI and Dice UI components (11)

ReUI (`src/components/reui/`): `kanban` · `sortable` · `tree` · `filters` · `stepper` · `timeline` · `number-field` · `time-picker`
Dice UI (`src/components/diceui/`): `tags-input` · `editable` · `action-bar`

## shadcnstudio Pro components installed (608 variants)

Accordion (×16) · Alert (×30) · Avatar (×21) · Badge (×24) · Breadcrumb (×8) · Button (×55) · Button Group (×16) · Calendar (×25) · Card (×17) · Checkbox (×19) · Collapsible (×10) · Combobox (×14) · Data Table (×13) · Date Picker (×13) · Dialog (×26) · Dropdown Menu (×16) · Form (×10) · Input (×46) · Input Mask (×6) · Input OTP (×10) · Pagination (×15) · Popover (×15) · Radio Group (×15) · Select (×38) · Sheet (×7) · Sonner (×20) · Switch (×20) · Table (×16) · Tabs (×29) · Textarea (×21) · Tooltip (×17)

Plus 28 shadcnstudio primitives in `src/components/ui/` (animated buttons, `motion-*`, `rating`, `multi-select`, `marquee`…).

## shadcnstudio Pro blocks installed (87)

`about-us-page-01` · `account-settings-01` · `announcement-banner-01/02` · `app-integration-01` · `application-shell-01` · `bento-grid-15` · `blog-component-01/15/17` · `card-nav-01` · `category-filter-01` · `chart-component-01` · `checkout-page-01/02` · `compare-07` · `contact-us-page-01` · `cookies-consent-01/02` · `cta-section-01/10/12` · `dashboard-dialog-01/02/21/22` · `dashboard-dropdown-01/02` · `dashboard-footer-01` · `dashboard-header-01` · `dashboard-shell-01` · `dashboard-sidebar-01` · `download-01` · `empty-state-01` · `error-page-01/02` · `faq-component-01/17` · `features-section-01` · `file-upload-01` · `footer-component-01` · `forgot-password-01` · `form-layout-01/02` · `gallery-component-01` · `gift-card-01` · `hero-section-01/35/41` · `login-page-01` · `logo-cloud-01` · `mega-footer-01` · `multi-step-form-01` · `navbar-component-01` · `offer-modal-01` · `onboarding-feed-01` · `order-summary-01/02` · `portfolio-01` · `pricing-component-01` · `product-category-01` · `product-list-01/02/03` · `product-overview-01/02` · `product-quick-view-01/02` · `product-reviews-01/02` · `register-01` · `reset-password-01` · `shopping-cart-01/02` · `social-proof-01/07` · `statistics-component-01/12` · `team-section-01` · `testimonials-component-01/18` · `timeline-component-05` · `two-factor-authentication-01` · `user-schedule-01` · `verify-email-01` · `widget-component-01/02`

---

## Adding components

```bash
npx shadcn@latest add <name>            # shadcn official
npx shadcn@latest add @reui/<name>      # ReUI
npx shadcn@latest add @diceui/<name>    # Dice UI (then move the file from ui/ to diceui/)
npx shadcn@latest add @ss-components/<name>   # shadcnstudio variant (e.g. button-01)
npx shadcn@latest add @ss-blocks/<name>       # shadcnstudio block (e.g. hero-section-01)
```

After each `add`:
- answer **no** when the CLI offers to overwrite an existing official `ui/` file — `progress.tsx` and `slider.tsx` carry a local fix (fixed locale), and the CLI would switch every file to the `cn` package;
- replace `import { cn } from "cn"` with `import { cn } from "@/lib/utils"` (shadcn CLI 4.22+ imports the new `cn` package, which is not used here);
- check `git diff package.json`: shadcnstudio items ask for `zod@3.25.76` and the CLI can downgrade `recharts` — the repo stays on zod 4 and recharts 3.10;
- check that `src/app/globals.css` gained no colored token (`--success`, `--info`, `--warning`…): the theme must stay grayscale.

shadcnstudio registries (`@ss-components`, `@ss-blocks`, `@ss-pages`, `@ss-illustrations`, `@ss-themes`) are declared in `components.json` and point at the `base-nova` (Base UI) version of each item. Premium items need `EMAIL` and `LICENSE_KEY`: put them in `.env.local` (gitignored), never in a committed file.
