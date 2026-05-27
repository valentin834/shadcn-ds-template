# shadcn-ds-4060

Design System component showcase for **40-60 Studio** — built with [shadcn/ui](https://ui.shadcn.com), Tailwind CSS v4, and Next.js 15 (App Router).

This repo is a **pure component vitrine**: no business logic, no backend. Its purpose is to give an AI agent a complete reference of the shadcn component language so it can reuse these patterns consistently across all UI generations.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui + shadcnstudio Pro |
| Charts | Recharts (via shadcn `chart`) |
| Icons | Lucide React |
| Package manager | npm |

---

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the component index.

---

## Example pages

| URL | What it demonstrates |
|---|---|
| `/examples/dashboard` | SaaS dashboard — `SidebarProvider`, `AppSidebar`, `Breadcrumb`, `Avatar`, `DropdownMenu`, 4 stat `Card`s, `ChartAreaInteractive` (Recharts), `Table` with pagination |
| `/examples/landing` | Marketing landing — navbar, hero, features grid with Lucide icons, 3-column pricing `Card`s, `Accordion` FAQ, footer |
| `/examples/settings` | Settings page — `Tabs` (Profile / Account / Notifications / Billing), `Input`, `Select`, `Switch`, `RadioGroup`, `Textarea`, `Button` |
| `/examples/signin` | Sign-in — centered `Card`, email/password `Input`s, OAuth buttons (Google + GitHub), `Separator`, forgot-password link |
| `/examples/crm-list` | CRM contact list — `Table` with row selection (`Checkbox`), `Combobox` filter, `ToggleGroup` status filter, `Sheet` detail panel |

---

## Pro Blocks (shadcn + shadcnstudio)

| URL | Block |
|---|---|
| `/dashboard` | `dashboard-01` — shadcn official Pro Block |
| `/bento-grid-15` | `bento-grid-15` — shadcnstudio Pro Block |
| `/login` | `login-01` — shadcn official Pro Block |
| `/signup` | `signup-01` — shadcn official Pro Block |

---

## shadcn/ui components installed (55 official)

`accordion` · `alert` · `alert-dialog` · `aspect-ratio` · `avatar` · `badge` · `breadcrumb` · `button` · `button-group` · `calendar` · `card` · `carousel` · `chart` · `checkbox` · `collapsible` · `combobox` · `command` · `context-menu` · `dialog` · `direction` · `drawer` · `dropdown-menu` · `empty` · `field` · `hover-card` · `input` · `input-group` · `input-otp` · `item` · `kbd` · `label` · `menubar` · `native-select` · `navigation-menu` · `separator` · `sheet` · `sidebar` · `skeleton` · `slider` · `sonner` · `spinner` · `switch` · `table` · `tabs` · `textarea` · `toggle` · `toggle-group` · `tooltip`

---

## shadcnstudio Pro components installed (608 variants)

Accordion (×16) · Alert (×30) · Avatar (×21) · Badge (×24) · Breadcrumb (×8) · Button (×55) · Button Group (×16) · Calendar (×25) · Card (×17) · Checkbox (×19) · Collapsible (×10) · Combobox (×14) · Data Table (×13) · Date Picker (×13) · Dialog (×26) · Dropdown Menu (×16) · Form (×10) · Input (×46) · Input Mask (×6) · Input OTP (×10) · Pagination (×15) · Popover (×15) · Radio Group (×15) · Select (×38) · Sheet (×7) · Sonner (×20) · Switch (×20) · Table (×16) · Tabs (×29) · Textarea (×21) · Tooltip (×17)

## shadcnstudio Pro Blocks installed (57)

`about-us-page-01` · `app-integration-01` · `blog-component-01/15/17` · `contact-us-page-01` · `cta-section-01/10/12` · `faq-component-01/17` · `features-section-01` · `footer-component-01` · `forgot-password-01` · `gallery-component-01` · `hero-section-01/35/41` · `login-page-01` · `logo-cloud-01` · `navbar-component-01` · `portfolio-01` · `pricing-component-01` · `register-01` · `reset-password-01` · `social-proof-01/07` · `team-section-01` · `testimonials-component-01/18` · `two-factor-authentication-01` · `verify-email-01` · `compare-07` · `timeline-component-05` · `application-shell-01` · `chart-component-01` · `form-layout-01/02` · `account-settings-01` · `dashboard-dialog-01/02/21/22` · `file-upload-01` · `onboarding-feed-01` · `empty-state-01` · `dashboard-shell-01` · `dashboard-dropdown-01/02` · `dashboard-footer-01` · `dashboard-header-01` · `dashboard-sidebar-01` · `statistics-component-01/12` · `widget-component-01/02` · `product-list-01`
