import Link from "next/link"
import {
  Zap,
  Shield,
  BarChart3,
  Globe,
  Layers,
  Headphones,
  Check,
  ArrowRight,
  Share2,
  Code2,
  Briefcase,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const features = [
  {
    icon: Zap,
    title: "Blazing Fast",
    description: "Optimised infrastructure delivers sub-100ms response times globally, keeping your users happy.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified. End-to-end encryption, SSO, and granular role-based access control.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track every event as it happens. Build custom dashboards and set alerts in minutes.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Deploy to 30+ regions. Auto-scaling handles traffic spikes without manual intervention.",
  },
  {
    icon: Layers,
    title: "Modular API",
    description: "REST and GraphQL APIs with comprehensive SDKs for JavaScript, Python, Go, and Ruby.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer success managers for Enterprise plans. Average reply time under 2 hours.",
  },
]

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "For individuals and small teams getting started.",
    features: ["Up to 5 users", "10 GB storage", "API access", "Community support", "Basic analytics"],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$89",
    period: "/month",
    description: "For growing teams that need more power and collaboration.",
    features: ["Up to 25 users", "100 GB storage", "Priority API access", "Email support", "Advanced analytics", "Custom integrations", "SSO"],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organisations with advanced security and compliance needs.",
    features: ["Unlimited users", "Unlimited storage", "Dedicated infrastructure", "24/7 SLA support", "Custom contracts", "On-premise option", "Audit logs"],
    cta: "Contact sales",
    highlighted: false,
  },
]

const faqs = [
  {
    q: "Do you offer a free trial?",
    a: "Yes. All plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    q: "Can I change my plan later?",
    a: "Absolutely. You can upgrade or downgrade at any time. Changes take effect at the next billing cycle.",
  },
  {
    q: "Where is my data stored?",
    a: "By default, data is stored in the EU (Frankfurt). Enterprise customers can choose their preferred region.",
  },
  {
    q: "What integrations do you support?",
    a: "We integrate with Slack, Salesforce, HubSpot, Zapier, and 100+ tools via our native connectors or the REST API.",
  },
  {
    q: "Is there an on-premise option?",
    a: "Yes, available on our Enterprise plan. Contact sales for deployment requirements and pricing.",
  },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <span className="text-lg font-bold tracking-tight">Acme SaaS</span>
            <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
              <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Docs</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">Sign in</Button>
            <Button size="sm">Get started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 py-24 text-center space-y-6">
          <Badge variant="secondary" className="mb-2">Now in public beta</Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Ship faster.<br className="hidden sm:block" /> Scale with confidence.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Acme SaaS gives your team the infrastructure, analytics, and integrations to move from idea to production in days — not months.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button size="lg" className="gap-2">
              Start for free <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">Book a demo</Button>
          </div>
          <p className="text-sm text-muted-foreground">No credit card required · 14-day free trial</p>
        </section>

        <Separator />

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-6 py-20 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">Everything you need to scale</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              One platform. All the tools your team needs to build, ship, and grow.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title}>
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Pricing */}
        <section id="pricing" className="mx-auto max-w-6xl px-6 py-20 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">Simple, transparent pricing</h2>
            <p className="text-muted-foreground">Start free. Scale as you grow. No hidden fees.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={plan.highlighted ? "border-primary shadow-lg relative" : ""}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <Badge>Most popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="flex items-baseline gap-1 pt-2">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {feat}
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-6 py-20 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">Frequently asked questions</h2>
            <p className="text-muted-foreground">Can&apos;t find the answer? <Link href="#" className="underline underline-offset-4">Chat with us.</Link></p>
          </div>
          <Accordion className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 gap-8 sm:grid-cols-4">
          <div className="space-y-3 sm:col-span-1">
            <span className="font-bold">Acme SaaS</span>
            <p className="text-sm text-muted-foreground">Building the future of developer infrastructure.</p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="h-8 w-8"><Share2 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Code2 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Briefcase className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium">Product</p>
            {["Features", "Pricing", "Changelog", "Roadmap"].map((l) => (
              <Link key={l} href="#" className="block text-sm text-muted-foreground hover:text-foreground">{l}</Link>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium">Company</p>
            {["About", "Blog", "Careers", "Press"].map((l) => (
              <Link key={l} href="#" className="block text-sm text-muted-foreground hover:text-foreground">{l}</Link>
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium">Legal</p>
            {["Privacy", "Terms", "Cookie policy", "Security"].map((l) => (
              <Link key={l} href="#" className="block text-sm text-muted-foreground hover:text-foreground">{l}</Link>
            ))}
          </div>
        </div>
        <Separator />
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>© 2025 Acme SaaS, Inc. All rights reserved.</span>
          <span>Made with shadcn/ui</span>
        </div>
      </footer>
    </div>
  )
}
