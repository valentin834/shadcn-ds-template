"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account, preferences, and billing.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Public profile</CardTitle>
              <CardDescription>This information will be displayed to other team members.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <Button variant="outline" size="sm">Change avatar</Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2 MB.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" defaultValue="Sophie" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" defaultValue="Martin" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">acmesaas.com/</span>
                  <Input id="username" defaultValue="sophie.martin" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Tell your team a bit about yourself…" defaultValue="Product designer at Acme. Based in Paris." rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="europe-paris">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-paris">Europe/Paris (GMT+2)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (GMT+1)</SelectItem>
                    <SelectItem value="us-eastern">US/Eastern (GMT-4)</SelectItem>
                    <SelectItem value="us-pacific">US/Pacific (GMT-7)</SelectItem>
                    <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email address</CardTitle>
              <CardDescription>Change the email associated with your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Current email</Label>
                <Input id="email" type="email" defaultValue="sophie.martin@acmecorp.io" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-email">New email</Label>
                <Input id="new-email" type="email" placeholder="new@example.com" />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Update email</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Use a strong, unique password you don&apos;t use elsewhere.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-pw">Current password</Label>
                <Input id="current-pw" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-pw">New password</Label>
                <Input id="new-pw" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-pw">Confirm new password</Label>
                <Input id="confirm-pw" type="password" />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Update password</Button>
            </CardFooter>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle>Delete account</CardTitle>
              <CardDescription>Permanently delete your account and all associated data. This cannot be undone.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="destructive">Delete my account</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Email notifications</CardTitle>
              <CardDescription>Choose which emails you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: "marketing", label: "Product updates", desc: "News, features, and announcements." },
                { id: "security", label: "Security alerts", desc: "Sign-ins from new devices or unusual activity." },
                { id: "billing", label: "Billing receipts", desc: "Invoices and payment confirmations." },
                { id: "digest", label: "Weekly digest", desc: "A summary of your team's activity every Monday." },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={item.id}>{item.label}</Label>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch id={item.id} defaultChecked={item.id !== "digest"} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification frequency</CardTitle>
              <CardDescription>How often should we bundle non-urgent notifications?</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="instant">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="instant" id="r-instant" />
                  <Label htmlFor="r-instant">Instantly</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="daily" id="r-daily" />
                  <Label htmlFor="r-daily">Daily digest</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="weekly" id="r-weekly" />
                  <Label htmlFor="r-weekly">Weekly digest</Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="justify-end">
              <Button>Save preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Billing */}
        <TabsContent value="billing" className="space-y-6 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle>Current plan</CardTitle>
                <CardDescription>You are on the Pro plan.</CardDescription>
              </div>
              <Badge>Pro</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">$89</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">Next billing date: <strong>June 15, 2025</strong></p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline">Change plan</Button>
              <Button variant="ghost" className="text-destructive hover:text-destructive">Cancel subscription</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment method</CardTitle>
              <CardDescription>Manage your saved payment methods.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-12 items-center justify-center rounded border bg-muted text-xs font-bold">VISA</div>
                  <div>
                    <p className="text-sm font-medium">Visa ending in 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 08/2027</p>
                  </div>
                </div>
                <Badge variant="secondary">Default</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Add payment method</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing history</CardTitle>
              <CardDescription>Download past invoices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { date: "May 15, 2025", amount: "$89.00", status: "Paid" },
                { date: "Apr 15, 2025", amount: "$89.00", status: "Paid" },
                { date: "Mar 15, 2025", amount: "$89.00", status: "Paid" },
              ].map((inv) => (
                <div key={inv.date} className="flex items-center justify-between text-sm py-2">
                  <span className="text-muted-foreground">{inv.date}</span>
                  <span className="font-medium">{inv.amount}</span>
                  <Badge variant="outline">{inv.status}</Badge>
                  <Button variant="ghost" size="sm">Download</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
