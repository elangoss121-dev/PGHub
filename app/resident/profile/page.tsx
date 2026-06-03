"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit2, Save, X, GraduationCap, Phone, Mail, MapPin, Calendar, Home, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AvatarUpload } from "@/components/avatar-upload"
import { useAuth } from "@/lib/auth-context"

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.name || "")

  const displayName = user?.name || "Resident"
  const initials = displayName.split(" ").map((n) => n[0]).join("").toUpperCase() || "U"
  const roomInfo = user?.room && user?.bed ? `Room ${user.room}, Bed ${user.bed}` : "Room not assigned"

  const handleAvatarChange = (dataUrl: string) => {
    if (!user) return
    updateUser(user.id, { avatar: dataUrl })
  }

  const handleSave = () => {
    if (user && name.trim()) {
      updateUser(user.id, { name: name.trim() })
    }
    setEditing(false)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">My Profile</h1>
          <p className="text-sm text-muted-foreground">Manage your personal information and PG details</p>
        </div>
        <Button
          variant={editing ? "outline" : "default"}
          size="sm"
          className="gap-2"
          onClick={() => {
            if (editing) {
              setName(user?.name || "")
            }
            setEditing(!editing)
          }}
        >
          {editing ? <><X className="w-4 h-4" />Cancel</> : <><Edit2 className="w-4 h-4" />Edit Profile</>}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Profile card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="mb-4">
            <AvatarUpload
              src={user?.avatar}
              fallback={initials}
              onChange={handleAvatarChange}
              size="md"
            />
          </div>
          <h2 className="font-bold text-lg">{displayName}</h2>
          <p className="text-sm text-muted-foreground mb-3">{user?.email || "—"}</p>
          <Badge className="bg-success/10 text-success border-success/20 mb-4">Active Resident</Badge>
          <div className="w-full border-t border-border pt-4 space-y-2">
            {[
              { icon: Home, text: roomInfo },
              { icon: Calendar, text: "Check-in: Jan 1, 2024" },
              { icon: GraduationCap, text: "Student – IIT Bangalore" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Details */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-5">
          {/* Personal details */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Personal Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
                {editing ? (
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                ) : (
                  <p className="text-sm font-medium">{displayName}</p>
                )}
              </div>
              {[
                { label: "Email Address", value: user?.email || "ramesh@example.com", icon: Mail },
                { label: "Phone Number", value: user?.phone || "+91 98765 43210", icon: Phone },
                { label: "Address", value: "Koramangala, Bangalore", icon: MapPin },
                { label: "Emergency Contact", value: "Suresh Kumar (Father)", icon: User },
                { label: "Emergency Phone", value: "+91 91234 56789", icon: Phone },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                  {editing ? (
                    <input defaultValue={field.value} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  ) : (
                    <p className="text-sm font-medium">{field.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Resident info */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
              <Home className="w-4 h-4 text-primary" /> Resident Information
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Room Number", value: "A-204" },
                { label: "Bed Number", value: "Bed 1" },
                { label: "Check-in Date", value: "Jan 1, 2024" },
                { label: "Occupancy Status", value: "Active" },
                { label: "Monthly Rent", value: "₹8,500" },
                { label: "Resident Since", value: "12 months" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs text-muted-foreground mb-1 block">{f.label}</label>
                  <p className="text-sm font-medium">{f.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Academic/Professional info */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-primary" /> Academic Information
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "College", value: "IIT Bangalore" },
                { label: "Course", value: "B.Tech CSE" },
                { label: "Academic Year", value: "3rd Year" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-xs text-muted-foreground mb-1 block">{f.label}</label>
                  {editing ? (
                    <input defaultValue={f.value} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  ) : (
                    <p className="text-sm font-medium">{f.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {editing && (
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => { setName(user?.name || ""); setEditing(false) }}>Cancel</Button>
              <Button className="gap-2" onClick={handleSave}><Save className="w-4 h-4" />Save Changes</Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
