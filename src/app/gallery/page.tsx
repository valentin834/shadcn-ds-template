import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const studioCategories = [
  { slug: "accordion",     label: "Accordion",      count: 16, desc: "Collapsible sections" },
  { slug: "alert",         label: "Alert",          count: 30, desc: "Inline feedback messages" },
  { slug: "avatar",        label: "Avatar",         count: 21, desc: "User profile pictures" },
  { slug: "badge",         label: "Badge",          count: 24, desc: "Status chips and labels" },
  { slug: "breadcrumb",    label: "Breadcrumb",     count:  8, desc: "Page hierarchy navigation" },
  { slug: "button",        label: "Button",         count: 55, desc: "Primary interactive element" },
  { slug: "button-group",  label: "Button Group",   count: 16, desc: "Grouped action buttons" },
  { slug: "calendar",      label: "Calendar",       count: 25, desc: "Date display and selection" },
  { slug: "card",          label: "Card",           count: 17, desc: "Content containers" },
  { slug: "checkbox",      label: "Checkbox",       count: 19, desc: "Boolean input" },
  { slug: "collapsible",   label: "Collapsible",    count: 10, desc: "Single expandable section" },
  { slug: "combobox",      label: "Combobox",       count: 14, desc: "Searchable dropdown" },
  { slug: "data-table",    label: "Data Table",     count: 13, desc: "Full-featured table" },
  { slug: "date-picker",   label: "Date Picker",    count: 13, desc: "Date selector" },
  { slug: "dialog",        label: "Dialog",         count: 26, desc: "Modal overlay" },
  { slug: "dropdown-menu", label: "Dropdown Menu",  count: 16, desc: "Contextual action menu" },
  { slug: "form",          label: "Form",           count: 10, desc: "Form layouts" },
  { slug: "input",         label: "Input",          count: 46, desc: "Text entry variants" },
  { slug: "input-mask",    label: "Input Mask",     count:  6, desc: "Formatted input" },
  { slug: "input-otp",     label: "Input OTP",      count: 10, desc: "One-time password" },
  { slug: "pagination",    label: "Pagination",     count: 15, desc: "Page navigation" },
  { slug: "popover",       label: "Popover",        count: 15, desc: "Floating content panel" },
  { slug: "radio-group",   label: "Radio Group",    count: 15, desc: "Single choice from a set" },
  { slug: "select",        label: "Select",         count: 38, desc: "Dropdown selector" },
  { slug: "sheet",         label: "Sheet",          count:  7, desc: "Side panel drawer" },
  { slug: "sonner",        label: "Sonner",         count: 20, desc: "Toast notifications" },
  { slug: "switch",        label: "Switch",         count: 20, desc: "Toggle on/off" },
  { slug: "table",         label: "Table",          count: 16, desc: "Data display layouts" },
  { slug: "tabs",          label: "Tabs",           count: 29, desc: "Content sections" },
  { slug: "textarea",      label: "Textarea",       count: 21, desc: "Multiline text" },
  { slug: "tooltip",       label: "Tooltip",        count: 17, desc: "Hover hints" },
]

const studioBlocks = [
  { slug: "hero-section-01",          label: "Hero Section 01" },
  { slug: "hero-section-35",          label: "Hero Section 35" },
  { slug: "hero-section-41",          label: "Hero Section 41" },
  { slug: "navbar-component-01",      label: "Navbar 01" },
  { slug: "features-section-01",      label: "Features Section" },
  { slug: "pricing-component-01",     label: "Pricing" },
  { slug: "faq-component-01",         label: "FAQ 01" },
  { slug: "faq-component-17",         label: "FAQ 17" },
  { slug: "footer-component-01",      label: "Footer" },
  { slug: "cta-section-01",           label: "CTA 01" },
  { slug: "cta-section-10",           label: "CTA 10" },
  { slug: "cta-section-12",           label: "CTA 12" },
  { slug: "testimonials-component-01",label: "Testimonials 01" },
  { slug: "testimonials-component-18",label: "Testimonials 18" },
  { slug: "social-proof-01",          label: "Social Proof 01" },
  { slug: "social-proof-07",          label: "Social Proof 07" },
  { slug: "logo-cloud-01",            label: "Logo Cloud" },
  { slug: "blog-component-01",        label: "Blog 01" },
  { slug: "blog-component-15",        label: "Blog 15" },
  { slug: "blog-component-17",        label: "Blog 17" },
  { slug: "gallery-component-01",     label: "Gallery" },
  { slug: "team-section-01",          label: "Team Section" },
  { slug: "compare-07",               label: "Compare" },
  { slug: "timeline-component-05",    label: "Timeline" },
  { slug: "portfolio-01",             label: "Portfolio" },
  { slug: "about-us-page-01",         label: "About Us" },
  { slug: "contact-us-page-01",       label: "Contact Us" },
  { slug: "login-page-01",            label: "Login Page" },
  { slug: "register-01",              label: "Register" },
  { slug: "forgot-password-01",       label: "Forgot Password" },
  { slug: "reset-password-01",        label: "Reset Password" },
  { slug: "two-factor-authentication-01", label: "2FA" },
  { slug: "verify-email-01",          label: "Verify Email" },
  { slug: "app-integration-01",       label: "App Integration" },
  { slug: "application-shell-01",     label: "App Shell" },
  { slug: "dashboard-shell-01",       label: "Dashboard Shell" },
  { slug: "dashboard-sidebar-01",     label: "Dashboard Sidebar" },
  { slug: "dashboard-header-01",      label: "Dashboard Header" },
  { slug: "dashboard-footer-01",      label: "Dashboard Footer" },
  { slug: "dashboard-dropdown-01",    label: "Dashboard Dropdown 01" },
  { slug: "dashboard-dropdown-02",    label: "Dashboard Dropdown 02" },
  { slug: "dashboard-dialog-01",      label: "Dashboard Dialog 01" },
  { slug: "dashboard-dialog-02",      label: "Dashboard Dialog 02" },
  { slug: "dashboard-dialog-21",      label: "Dashboard Dialog 21" },
  { slug: "dashboard-dialog-22",      label: "Dashboard Dialog 22" },
  { slug: "chart-component-01",       label: "Chart" },
  { slug: "statistics-component-01",  label: "Statistics 01" },
  { slug: "statistics-component-12",  label: "Statistics 12" },
  { slug: "widget-component-01",      label: "Widget 01" },
  { slug: "widget-component-02",      label: "Widget 02" },
  { slug: "form-layout-01",           label: "Form Layout 01" },
  { slug: "form-layout-02",           label: "Form Layout 02" },
  { slug: "account-settings-01",      label: "Account Settings" },
  { slug: "file-upload-01",           label: "File Upload" },
  { slug: "onboarding-feed-01",       label: "Onboarding Feed" },
  { slug: "empty-state-01",           label: "Empty State" },
  { slug: "product-list-01",          label: "Product List 01" },
  // E-commerce (17 blocs)
  { slug: "product-list-02",          label: "Product List 02" },
  { slug: "product-list-03",          label: "Product List 03" },
  { slug: "product-overview-01",      label: "Product Overview 01" },
  { slug: "product-overview-02",      label: "Product Overview 02" },
  { slug: "product-quick-view-01",    label: "Product Quick View 01" },
  { slug: "product-quick-view-02",    label: "Product Quick View 02" },
  { slug: "product-category-01",      label: "Product Category" },
  { slug: "category-filter-01",       label: "Category Filter" },
  { slug: "shopping-cart-01",         label: "Shopping Cart 01" },
  { slug: "shopping-cart-02",         label: "Shopping Cart 02" },
  { slug: "checkout-page-01",         label: "Checkout Page 01" },
  { slug: "checkout-page-02",         label: "Checkout Page 02" },
  { slug: "order-summary-01",         label: "Order Summary 01" },
  { slug: "order-summary-02",         label: "Order Summary 02" },
  { slug: "offer-modal-01",           label: "Offer Modal" },
  { slug: "announcement-banner-01",   label: "Announcement Banner 01" },
  { slug: "announcement-banner-02",   label: "Announcement Banner 02" },
  { slug: "mega-footer-01",           label: "Mega Footer" },
  { slug: "product-reviews-01",       label: "Product Reviews 01" },
  { slug: "product-reviews-02",       label: "Product Reviews 02" },
  { slug: "gift-card-01",             label: "Gift Card" },
  // Utilitaires (8 blocs)
  { slug: "multi-step-form-01",       label: "Multi Step Form" },
  { slug: "cookies-consent-01",       label: "Cookies Consent 01" },
  { slug: "cookies-consent-02",       label: "Cookies Consent 02" },
  { slug: "error-page-01",            label: "Error Page 01" },
  { slug: "error-page-02",            label: "Error Page 02" },
  { slug: "card-nav-01",              label: "Card Nav" },
  { slug: "download-01",              label: "Download Page" },
  { slug: "user-schedule-01",         label: "User Schedule" },
]

const shadcnOfficial = [
  { name: "accordion",       desc: "Collapsible content sections" },
  { name: "alert",           desc: "Inline contextual messages" },
  { name: "alert-dialog",    desc: "Destructive action confirmation" },
  { name: "aspect-ratio",    desc: "Fixed-ratio media container" },
  { name: "avatar",          desc: "User image with fallback" },
  { name: "badge",           desc: "Status and count labels" },
  { name: "breadcrumb",      desc: "Hierarchical location indicator" },
  { name: "button",          desc: "Primary action element" },
  { name: "button-group",    desc: "Grouped buttons" },
  { name: "calendar",        desc: "Date selection" },
  { name: "card",            desc: "Content container" },
  { name: "carousel",        desc: "Sliding content panels" },
  { name: "chart",           desc: "Recharts wrapper for data viz" },
  { name: "checkbox",        desc: "Boolean selection" },
  { name: "collapsible",     desc: "Single expandable section" },
  { name: "combobox",        desc: "Searchable select" },
  { name: "command",         desc: "Command palette / search" },
  { name: "context-menu",    desc: "Right-click menu" },
  { name: "dialog",          desc: "Modal overlay" },
  { name: "drawer",          desc: "Vaul side/bottom drawer" },
  { name: "dropdown-menu",   desc: "Action menu" },
  { name: "hover-card",      desc: "Hover preview card" },
  { name: "input",           desc: "Text input field" },
  { name: "input-otp",       desc: "OTP code input" },
  { name: "label",           desc: "Form field label" },
  { name: "menubar",         desc: "Application menu bar" },
  { name: "navigation-menu", desc: "Site navigation" },
  { name: "pagination",      desc: "Page controls" },
  { name: "popover",         desc: "Floating panel" },
  { name: "progress",        desc: "Progress indicator" },
  { name: "radio-group",     desc: "Single choice selection" },
  { name: "resizable",       desc: "Resizable panel layout" },
  { name: "scroll-area",     desc: "Custom scrollbar container" },
  { name: "select",          desc: "Dropdown selection" },
  { name: "separator",       desc: "Visual divider" },
  { name: "sheet",           desc: "Side panel" },
  { name: "sidebar",         desc: "App sidebar with sections" },
  { name: "skeleton",        desc: "Loading placeholder" },
  { name: "slider",          desc: "Range input" },
  { name: "sonner",          desc: "Toast notifications" },
  { name: "switch",          desc: "Toggle" },
  { name: "table",           desc: "Tabular data display" },
  { name: "tabs",            desc: "Tabbed content sections" },
  { name: "textarea",        desc: "Multiline text input" },
  { name: "toggle",          desc: "On/off button" },
  { name: "toggle-group",    desc: "Group of toggles" },
  { name: "tooltip",         desc: "Hover label" },
]

export default function GalleryIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 space-y-16">
      <div className="space-y-2">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">← Home</Link>
        <h1 className="text-4xl font-bold tracking-tight">Component Gallery</h1>
        <p className="text-muted-foreground">
          Visual reference for all installed components.{" "}
          <strong className="text-foreground">55</strong> shadcn official ·{" "}
          <strong className="text-foreground">608</strong> shadcnstudio variants ·{" "}
          <strong className="text-foreground">85</strong> shadcnstudio blocks.
        </p>
      </div>

      {/* shadcn official */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">shadcn/ui — Official Components</h2>
          <Badge variant="secondary">55</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Import from <code className="font-mono">@/components/ui/[name]</code></p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {shadcnOfficial.map((c) => (
            <div key={c.name} className="rounded-lg border bg-card p-3 space-y-0.5">
              <p className="text-sm font-medium font-mono">{c.name}</p>
              <p className="text-xs text-muted-foreground leading-tight">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* shadcnstudio component variants */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">shadcnstudio — Component Variants</h2>
          <Badge variant="secondary">608</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Import from <code className="font-mono">@/components/shadcn-studio/[category]/[category]-[01]</code> — click a category to see all variants</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {studioCategories.map((cat) => (
            <Link key={cat.slug} href={`/gallery/studio/${cat.slug}`} className="group block">
              <div className="rounded-lg border bg-card p-4 transition-colors group-hover:border-foreground/30 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{cat.label}</p>
                  <p className="text-xs text-muted-foreground">{cat.desc}</p>
                </div>
                <Badge variant="outline" className="shrink-0 ml-3">{cat.count}</Badge>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Separator />

      {/* shadcnstudio blocks */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">shadcnstudio — Full-page Blocks</h2>
          <Badge variant="secondary">85</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Complete sections: hero, features, pricing, auth, dashboard, CRM, etc.</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {studioBlocks.map((b) => (
            <Link key={b.slug} href={`/${b.slug}`} className="group block">
              <div className="rounded-lg border bg-card px-3 py-2.5 transition-colors group-hover:border-foreground/30">
                <p className="text-xs font-medium">{b.label}</p>
                <p className="text-xs text-muted-foreground font-mono">{b.slug}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
