"use client"

import { useState } from "react"
import {
  Settings,
  Building,
  Bell,
  Shield,
  Palette,
  Mail,
  Save,
  KeyRound,
  User,
  Check,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ChangePasswordModal } from "@/components/change-password-modal"
import { AvatarUpload } from "@/components/avatar-upload"
import { useAuth, ROLE_LABELS } from "@/lib/auth-context"

export default function SettingsPage() {
  const { user, updateUser } = useAuth()
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)

  // Profile editing state
  const [name, setName] = useState(user?.name || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [profileSaved, setProfileSaved] = useState(false)

  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "AD"
  const roleLabel = user?.adminRole ? ROLE_LABELS[user.adminRole] : "Admin"
  const nameChanged = name.trim() !== (user?.name || "") || phone.trim() !== (user?.phone || "")

  const handleAvatarChange = (dataUrl: string) => {
    if (!user) return
    updateUser(user.id, { avatar: dataUrl })
  }

  const handleProfileSave = () => {
    if (!user || !name.trim()) return
    updateUser(user.id, { name: name.trim(), phone: phone.trim() })
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2000)
  }

  return (
    <div className="space-y-8">
      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        userEmail={user?.email || ""}
      />
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage system configuration and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                My Profile
              </CardTitle>
              <CardDescription>Update your display name and profile photo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:gap-6">
                <AvatarUpload
                  src={user?.avatar}
                  fallback={initials}
                  onChange={handleAvatarChange}
                  size="lg"
                />
                <div className="text-center sm:text-left">
                  <p className="text-sm font-medium text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{roleLabel}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click the camera icon to upload a photo. Any image format is supported.
                  </p>
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="profileName">Display Name</Label>
                  <Input
                    id="profileName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profilePhone">Phone Number</Label>
                  <Input
                    id="profilePhone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profileEmail">Email</Label>
                  <Input id="profileEmail" value={user?.email || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profileRole">Role</Label>
                  <Input id="profileRole" value={roleLabel} disabled />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleProfileSave} disabled={!name.trim() || (!nameChanged && !profileSaved)}>
              {profileSaved ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Saved
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Profile
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Property Information
              </CardTitle>
              <CardDescription>Basic details about your PG property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pgName">PG Name</Label>
                  <Input id="pgName" defaultValue="PGHub Residency" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input id="contactNumber" defaultValue="+91 98765 43210" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue="123, Main Street, Bangalore - 560001" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="contact@pghub.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="www.pghub.com" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
              <CardDescription>Customize the look and feel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable dark theme for the dashboard</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  {["#4F46E5", "#2563EB", "#059669", "#DC2626", "#7C3AED"].map((color) => (
                    <button
                      key={color}
                      className="h-8 w-8 rounded-full border-2 border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure when and how to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { title: "New Registration", description: "Get notified when a new user registers" },
                { title: "Payment Received", description: "Get notified when a payment is submitted" },
                { title: "Complaint Filed", description: "Get notified when a new complaint is filed" },
                { title: "Low Occupancy Alert", description: "Get notified when occupancy drops below 70%" },
                { title: "Overdue Payments", description: "Daily summary of overdue payments" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{item.title}</Label>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <Switch defaultChecked={i < 3} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Settings
              </CardTitle>
              <CardDescription>Configure email notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Notification Email</Label>
                <Input type="email" defaultValue="admin@pghub.com" />
              </div>
              <div className="space-y-2">
                <Label>Email Frequency</Label>
                <Select defaultValue="instant">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instant">Instant</SelectItem>
                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure rent and payment options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Default Rent Amount (Single)</Label>
                  <Input type="number" defaultValue="9000" />
                </div>
                <div className="space-y-2">
                  <Label>Default Rent Amount (Double)</Label>
                  <Input type="number" defaultValue="8500" />
                </div>
                <div className="space-y-2">
                  <Label>Default Rent Amount (Triple)</Label>
                  <Input type="number" defaultValue="8000" />
                </div>
                <div className="space-y-2">
                  <Label>Due Date (Day of Month)</Label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 5, 10, 15].map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          {day}th of every month
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Late Fee</Label>
                <div className="flex gap-4">
                  <Input type="number" defaultValue="500" className="w-32" />
                  <span className="text-muted-foreground self-center">per day after due date</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5">
                  <Label>Auto-send Payment Reminders</Label>
                  <p className="text-sm text-muted-foreground">Send automatic reminders before due date</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage security and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Require 2FA for admin logins</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Login Attempt Limit</Label>
                  <p className="text-sm text-muted-foreground">Lock account after failed attempts</p>
                </div>
                <Select defaultValue="5">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 attempts</SelectItem>
                    <SelectItem value="5">5 attempts</SelectItem>
                    <SelectItem value="10">10 attempts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-3">
                <div>
                  <Label>Admin Password</Label>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Update your account password. You&apos;ll be prompted to enter your current password first.
                  </p>
                </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <KeyRound className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{user?.email}</p>
                    <p className="text-xs text-muted-foreground">Password last changed: Never</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => setChangePasswordOpen(true)}>
                    Change Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
