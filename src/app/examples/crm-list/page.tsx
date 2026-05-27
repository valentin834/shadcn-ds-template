"use client"

import * as React from "react"
import { Search, SlidersHorizontal, Plus, MoreHorizontal, Mail, Phone, Building2, MapPin, Tag } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
type Contact = {
  id: number
  name: string
  email: string
  company: string
  role: string
  status: "Lead" | "Prospect" | "Customer" | "Churned"
  location: string
  phone: string
  tags: string[]
  lastContact: string
}

const contacts: Contact[] = [
  { id: 1, name: "Sophie Martin", email: "s.martin@acmecorp.io", company: "Acme Corp", role: "Head of Product", status: "Customer", location: "Paris, FR", phone: "+33 6 12 34 56 78", tags: ["Enterprise", "Renewal"], lastContact: "2 days ago" },
  { id: 2, name: "Lucas Bernard", email: "l.bernard@brightideas.fr", company: "Bright Ideas SAS", role: "CEO", status: "Prospect", location: "Lyon, FR", phone: "+33 6 98 76 54 32", tags: ["SMB"], lastContact: "1 week ago" },
  { id: 3, name: "Emma Wilson", email: "emma@dataflow.io", company: "DataFlow Inc.", role: "CTO", status: "Lead", location: "London, UK", phone: "+44 7700 900123", tags: ["Tech", "Trial"], lastContact: "3 days ago" },
  { id: 4, name: "Thomas Leroy", email: "t.leroy@nexusdigital.com", company: "Nexus Digital", role: "VP Sales", status: "Customer", location: "Nantes, FR", phone: "+33 6 55 44 33 22", tags: ["Starter"], lastContact: "Today" },
  { id: 5, name: "Camille Dubois", email: "c.dubois@pivotlabs.co", company: "Pivot Labs", role: "Product Manager", status: "Churned", location: "Bordeaux, FR", phone: "+33 6 11 22 33 44", tags: ["At risk"], lastContact: "1 month ago" },
  { id: 6, name: "Noah Petit", email: "noah@stackr.io", company: "Stackr.io", role: "Founder", status: "Customer", location: "Berlin, DE", phone: "+49 151 23456789", tags: ["Pro", "Active"], lastContact: "5 days ago" },
  { id: 7, name: "Inès Garcia", email: "ines@cloudseed.dev", company: "CloudSeed", role: "Engineering Lead", status: "Prospect", location: "Barcelona, ES", phone: "+34 612 345 678", tags: ["Inbound"], lastContact: "2 weeks ago" },
  { id: 8, name: "Antoine Roux", email: "a.roux@velox.systems", company: "Velox Systems", role: "CEO", status: "Customer", location: "Paris, FR", phone: "+33 6 77 88 99 00", tags: ["Enterprise", "Champion"], lastContact: "Yesterday" },
]

const statusVariant: Record<Contact["status"], "default" | "secondary" | "destructive" | "outline"> = {
  Customer: "default",
  Prospect: "secondary",
  Lead: "outline",
  Churned: "destructive",
}

const ownerOptions = [
  { value: "all", label: "All owners" },
  { value: "sophie", label: "Sophie Martin" },
  { value: "lucas", label: "Lucas Bernard" },
  { value: "thomas", label: "Thomas Leroy" },
]

export default function CrmListPage() {
  const [search, setSearch] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<readonly string[]>(["all"])
  const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null)
  const [selected, setSelected] = React.useState<number[]>([])

  const filtered = contacts.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter.includes("all") || statusFilter.length === 0 || statusFilter.includes(c.status)
    return matchSearch && matchStatus
  })

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    setSelected(selected.length === filtered.length ? [] : filtered.map((c) => c.id))
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Contacts</h1>
          <p className="text-sm text-muted-foreground">{contacts.length} contacts total</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add contact
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts, companies…"
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Owner" />
          </SelectTrigger>
          <SelectContent>
            {ownerOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ToggleGroup
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v.length ? v : ["all"])}
          className="flex-wrap"
        >
          <ToggleGroupItem value="all" className="text-xs">All</ToggleGroupItem>
          <ToggleGroupItem value="Lead" className="text-xs">Lead</ToggleGroupItem>
          <ToggleGroupItem value="Prospect" className="text-xs">Prospect</ToggleGroupItem>
          <ToggleGroupItem value="Customer" className="text-xs">Customer</ToggleGroupItem>
          <ToggleGroupItem value="Churned" className="text-xs">Churned</ToggleGroupItem>
        </ToggleGroup>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {selected.length > 0 && (
        <div className="flex items-center gap-3 rounded-lg border bg-muted/50 px-4 py-2 text-sm">
          <span className="font-medium">{selected.length} selected</span>
          <Separator orientation="vertical" className="h-4" />
          <Button variant="ghost" size="sm">Send email</Button>
          <Button variant="ghost" size="sm">Export</Button>
          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Delete</Button>
        </div>
      )}

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={selected.length === filtered.length && filtered.length > 0}
                    onCheckedChange={toggleAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Company</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead className="hidden xl:table-cell">Tags</TableHead>
                <TableHead className="hidden lg:table-cell">Last contact</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    No contacts match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((contact) => (
                  <TableRow
                    key={contact.id}
                    className="cursor-pointer"
                    onClick={() => setSelectedContact(contact)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selected.includes(contact.id)}
                        onCheckedChange={() => toggleSelect(contact.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {contact.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium leading-none">{contact.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{contact.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div>
                        <p className="text-sm font-medium">{contact.company}</p>
                        <p className="text-xs text-muted-foreground">{contact.role}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant={statusVariant[contact.status]}>{contact.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {contact.lastContact}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent">
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedContact(contact)}>View details</DropdownMenuItem>
                          <DropdownMenuItem>Send email</DropdownMenuItem>
                          <DropdownMenuItem>Log activity</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Sheet */}
      <Sheet open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          {selectedContact && (
            <>
              <SheetHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {selectedContact.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle>{selectedContact.name}</SheetTitle>
                    <SheetDescription>{selectedContact.role}</SheetDescription>
                  </div>
                </div>
                <Badge variant={statusVariant[selectedContact.status]} className="w-fit">
                  {selectedContact.status}
                </Badge>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Contact info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span>{selectedContact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4 shrink-0" />
                      <span>{selectedContact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4 shrink-0" />
                      <span>{selectedContact.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span>{selectedContact.location}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Tags</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedContact.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        <Tag className="h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold">Activity</h3>
                  <div className="space-y-3 text-sm">
                    {[
                      { type: "Email", note: "Follow-up on Q3 proposal", date: "2 days ago" },
                      { type: "Call", note: "Intro call — 32 min", date: "1 week ago" },
                      { type: "Note", note: "Interested in Enterprise plan, needs approval from board.", date: "2 weeks ago" },
                    ].map((act, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                          {act.type[0]}
                        </div>
                        <div>
                          <p className="font-medium">{act.type}</p>
                          <p className="text-muted-foreground">{act.note}</p>
                          <p className="text-xs text-muted-foreground">{act.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button className="flex-1">Send email</Button>
                  <Button variant="outline" className="flex-1">Log activity</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
