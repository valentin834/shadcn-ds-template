"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Bell,
  Search,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  LogOut,
  UserCircle,
  CreditCard,
  MoreHorizontal,
  ArrowUpDown,
} from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const stats = [
  {
    label: "Monthly Revenue",
    value: "$48,295",
    delta: "+12.4%",
    trend: "up",
    sub: "vs last month",
  },
  {
    label: "Active Users",
    value: "3,842",
    delta: "+8.1%",
    trend: "up",
    sub: "7-day active",
  },
  {
    label: "Churn Rate",
    value: "2.3%",
    delta: "-0.4%",
    trend: "down",
    sub: "improved this quarter",
  },
  {
    label: "Avg. Session",
    value: "4m 12s",
    delta: "+0.5%",
    trend: "up",
    sub: "vs previous period",
  },
]

const rows = [
  { id: 1, name: "Acme Corp", plan: "Enterprise", mrr: "$4,200", status: "Active", owner: "Sophie Martin" },
  { id: 2, name: "Bright Ideas SAS", plan: "Pro", mrr: "$890", status: "Active", owner: "Lucas Bernard" },
  { id: 3, name: "DataFlow Inc.", plan: "Pro", mrr: "$890", status: "Trial", owner: "Emma Wilson" },
  { id: 4, name: "Nexus Digital", plan: "Starter", mrr: "$290", status: "Active", owner: "Thomas Leroy" },
  { id: 5, name: "Pivot Labs", plan: "Enterprise", mrr: "$4,200", status: "Churned", owner: "Camille Dubois" },
  { id: 6, name: "Stackr.io", plan: "Pro", mrr: "$890", status: "Active", owner: "Noah Petit" },
  { id: 7, name: "CloudSeed", plan: "Starter", mrr: "$290", status: "Active", owner: "Inès Garcia" },
  { id: 8, name: "Velox Systems", plan: "Enterprise", mrr: "$4,200", status: "Active", owner: "Antoine Roux" },
]

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Active: "default",
  Trial: "secondary",
  Churned: "destructive",
}

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-vertical:h-4 data-vertical:self-auto" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search…" className="pl-8 w-64 h-9" />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium">Sophie Martin</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><UserCircle className="mr-2 h-4 w-4" />Profile</DropdownMenuItem>
                <DropdownMenuItem><CreditCard className="mr-2 h-4 w-4" />Billing</DropdownMenuItem>
                <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive"><LogOut className="mr-2 h-4 w-4" />Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex flex-col gap-6 p-4 lg:p-6">
          {/* Stat cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <Card key={s.label}>
                <CardHeader className="pb-2">
                  <CardDescription>{s.label}</CardDescription>
                  <CardTitle className="text-2xl tabular-nums">{s.value}</CardTitle>
                </CardHeader>
                <CardFooter className="gap-2 text-sm">
                  <Badge variant="outline" className="gap-1">
                    {s.trend === "up"
                      ? <TrendingUp className="h-3 w-3" />
                      : <TrendingDown className="h-3 w-3" />}
                    {s.delta}
                  </Badge>
                  <span className="text-muted-foreground">{s.sub}</span>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Chart */}
          <ChartAreaInteractive />

          {/* Data table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Accounts</CardTitle>
                <CardDescription>All customer accounts and their subscription status.</CardDescription>
              </div>
              <Button size="sm">Export</Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button variant="ghost" size="sm" className="-ml-3 gap-1">
                        Company <ArrowUpDown className="h-3 w-3" />
                      </Button>
                    </TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>MRR</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell className="text-muted-foreground">{row.plan}</TableCell>
                      <TableCell className="tabular-nums">{row.mrr}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[row.status] ?? "outline"}>{row.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{row.owner}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent">
                            <MoreHorizontal className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
