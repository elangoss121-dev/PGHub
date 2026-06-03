"use client"

import { useState } from "react"
import {
  Bell,
  Shield,
  Moon,
  Sun,
  KeyRound,
  Smartphone,
  Globe,
  Eye,
  Trash2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChangePasswordModal } from "@/components/change-password-modal"

export default function ResidentSettingsPage() {
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)

  return (
    <div className="space-y-6 max-w-2xl">
      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        userEmail="ramesh@example.com"
      />

      <div>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your account preferences and security</p>
      </div>

      {/* Password & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4 text-primary" />
            Password &amp; Security
          </CardTitle>
          <CardDescription>Keep your account secure</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <KeyRound className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">Account Password</p>
              <p className="text-xs text-muted-foreground">ramesh@example.com · Last changed: Never</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setChangePasswordOpen(true)}
            >
              Change Password
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm">Login Alerts</Label>
              <p className="text-xs text-muted-foreground">Get notified when someone logs into your account</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4 text-primary" />
            Notifications
          </CardTitle>
          <CardDescription>Choose what you want to be notified about</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { title: "Payment Reminders", description: "Remind me 5 days before rent due", defaultOn: true },
            { title: "Meal Poll Alerts", description: "Notify when a new food poll is live", defaultOn: true },
            { title: "Complaint Updates", description: "Updates on my complaint status", defaultOn: true },
            { title: "Notice Board", description: "New notices from management", defaultOn: false },
            { title: "Laundry Ready", description: "Notify when laundry slot is available", defaultOn: false },
          ].map((item) => (
            <div key={item.title} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm">{item.title}</Label>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <Switch defaultChecked={item.defaultOn} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Eye className="h-4 w-4 text-primary" />
            Appearance
          </CardTitle>
          <CardDescription>Customize how PGHub looks for you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm">Dark Mode</Label>
              <p className="text-xs text-muted-foreground">Switch to dark theme</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label className="text-sm">Language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
                <SelectItem value="kn">Kannada</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-destructive">
            <Trash2 className="h-4 w-4" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible actions. Proceed with caution.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/30 bg-destructive/5">
            <div>
              <p className="text-sm font-medium text-foreground">Delete Account</p>
              <p className="text-xs text-muted-foreground mt-0.5">Permanently remove your account and all data</p>
            </div>
            <Button variant="destructive" size="sm">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
