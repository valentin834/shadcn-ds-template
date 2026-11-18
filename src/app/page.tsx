import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const examples = [
  { href: "/examples/dashboard", title: "Dashboard", desc: "Sidebar, stat cards, area chart, data table", tags: ["Sidebar", "Chart", "Table", "Breadcrumb"] },
  { href: "/examples/landing",   title: "Landing Page", desc: "Navbar, hero, features, pricing, FAQ, footer", tags: ["Accordion", "Card", "Badge"] },
  { href: "/examples/settings",  title: "Settings",   desc: "Tabs: Profile, Account, Notifications, Billing", tags: ["Tabs", "Input", "Switch", "Select"] },
  { href: "/examples/signin",    title: "Sign In",    desc: "Centered card, email/password, OAuth", tags: ["Card", "Input", "Separator"] },
  { href: "/examples/crm-list",  title: "CRM List",   desc: "Filters, sortable table, side sheet detail", tags: ["Table", "Sheet", "ToggleGroup"] },
]

const shadcnProBlocks = [
  { href: "/dashboard",    title: "dashboard-01", desc: "Sidebar + data table + charts" },
  { href: "/bento-grid-15",title: "bento-grid-15",desc: "Animated bento grid (shadcnstudio)" },
  { href: "/login",        title: "login-01",     desc: "Login form with OAuth" },
  { href: "/signup",       title: "signup-01",    desc: "Sign-up form" },
]

const studioHighlights = [
  { href: "/hero-section-01",       title: "Hero Section" },
  { href: "/features-section-01",   title: "Features Section" },
  { href: "/pricing-component-01",  title: "Pricing" },
  { href: "/faq-component-01",      title: "FAQ" },
  { href: "/dashboard-shell-01",    title: "Dashboard Shell" },
  { href: "/statistics-component-01", title: "Statistics" },
  { href: "/empty-state-01",        title: "Empty State" },
  { href: "/form-layout-01",        title: "Form Layout" },
]

const ecommerceHighlights = [
  { href: "/product-list-02",       title: "Product List" },
  { href: "/product-overview-01",   title: "Product Detail" },
  { href: "/product-quick-view-01", title: "Quick View Modal" },
  { href: "/category-filter-01",    title: "Category Filter" },
  { href: "/shopping-cart-02",      title: "Cart Drawer" },
  { href: "/checkout-page-01",      title: "Checkout" },
  { href: "/order-summary-01",      title: "Order Summary" },
  { href: "/mega-footer-01",        title: "Mega Footer" },
]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14 space-y-14">

      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight">shadcn-ds-4060</h1>
          <Badge variant="secondary">Design System</Badge>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          Component vitrine for <strong className="text-foreground">40-60 Studio</strong> — built with shadcn/ui + shadcnstudio Pro, ReUI and Dice UI, Tailwind CSS v4, Next.js 16.
          Shared with Claude Design as reference for AI-composed screens.
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="text-muted-foreground"><strong className="text-foreground">65</strong> shadcn official components</span>
          <span className="text-muted-foreground"><strong className="text-foreground">11</strong> ReUI / Dice UI components</span>
          <span className="text-muted-foreground"><strong className="text-foreground">608</strong> shadcnstudio variants</span>
          <span className="text-muted-foreground"><strong className="text-foreground">87</strong> shadcnstudio blocks</span>
        </div>
      </div>

      {/* CTA: Gallery */}
      <Link href="/gallery" className="group block">
        <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 px-8 py-6 text-center transition-colors group-hover:border-foreground/40 group-hover:bg-muted/60">
          <p className="text-lg font-semibold">→ Browse Component Gallery</p>
          <p className="text-sm text-muted-foreground mt-1">See all 771 components and blocks organized by category</p>
        </div>
      </Link>

      <Link href="/gallery/extended" className="group block">
        <div className="rounded-xl border bg-card px-8 py-5 transition-colors group-hover:border-foreground/30">
          <p className="font-semibold">→ Extended components</p>
          <p className="text-sm text-muted-foreground mt-1">New official shadcn components (message, bubble, toast, trace…) and ReUI / Dice UI components: kanban, tree, filters, stepper, timeline, tags input…</p>
        </div>
      </Link>

      <Separator />

      {/* Example pages */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Composition Examples</h2>
          <p className="text-sm text-muted-foreground mt-1">5 pages showing how components compose into real screens.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((ex) => (
            <Link key={ex.href} href={ex.href} className="group block">
              <Card className="h-full transition-colors group-hover:border-foreground/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">{ex.title}</CardTitle>
                  <CardDescription className="text-xs">{ex.desc}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1">
                    {ex.tags.map((t) => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Separator />

      {/* shadcn Pro Blocks */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">shadcn Pro Blocks</h2>
          <p className="text-sm text-muted-foreground mt-1">Official blocks from shadcn.com — installed via CLI.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {shadcnProBlocks.map((b) => (
            <Link key={b.href} href={b.href} className="group block">
              <div className="rounded-lg border bg-card p-4 transition-colors group-hover:border-foreground/30">
                <p className="text-sm font-mono font-medium">{b.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Separator />

      {/* shadcnstudio blocks highlights */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">shadcnstudio Pro Blocks — Highlights</h2>
          <p className="text-sm text-muted-foreground mt-1">87 blocks total. <Link href="/gallery" className="underline underline-offset-2">See all in gallery →</Link></p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {studioHighlights.map((b) => (
            <Link key={b.href} href={b.href} className="group block">
              <div className="rounded-lg border bg-card px-3 py-2.5 transition-colors group-hover:border-foreground/30">
                <p className="text-xs font-medium">{b.title}</p>
                <p className="text-xs text-muted-foreground font-mono truncate">{b.href.slice(1)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Separator />

      {/* E-commerce blocks */}
      <section className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">E-commerce Blocks</h2>
            <Badge variant="secondary">17 nouveaux</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Catalogue, fiche produit, panier, checkout — recommandés pour les parcours d&apos;achat.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {ecommerceHighlights.map((b) => (
            <Link key={b.href} href={b.href} className="group block">
              <div className="rounded-lg border bg-card px-3 py-2.5 transition-colors group-hover:border-foreground/30">
                <p className="text-xs font-medium">{b.title}</p>
                <p className="text-xs text-muted-foreground font-mono truncate">{b.href.slice(1)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
