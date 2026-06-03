"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  Edit,
  Trash2,
  Bell,
  AlertTriangle,
  Info,
  Megaphone,
  Pin,
  Eye,
  Calendar,
  Clock,
  Send,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

const notices = [
  {
    id: 1,
    title: "Water Supply Interruption",
    content: "There will be a scheduled water supply interruption on May 10th from 10 AM to 2 PM for maintenance work. Please store sufficient water.",
    priority: "high",
    type: "emergency",
    pinned: true,
    publishedAt: "2 hours ago",
    views: 142,
  },
  {
    id: 2,
    title: "Monthly Rent Reminder",
    content: "This is a reminder that the rent for May 2024 is due by May 5th. Please ensure timely payment to avoid late fees.",
    priority: "medium",
    type: "announcement",
    pinned: true,
    publishedAt: "1 day ago",
    views: 156,
  },
  {
    id: 3,
    title: "New WiFi Password",
    content: "The WiFi password has been updated for security reasons. New password: PGHub@2024. Please update your devices.",
    priority: "low",
    type: "info",
    pinned: false,
    publishedAt: "3 days ago",
    views: 148,
  },
  {
    id: 4,
    title: "Weekend Special Menu",
    content: "This weekend we will be serving special biryani for lunch! Mark your attendance in the food section.",
    priority: "low",
    type: "announcement",
    pinned: false,
    publishedAt: "5 days ago",
    views: 134,
  },
]

const priorityColors = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  low: "bg-muted text-muted-foreground border-border",
}

const typeIcons = {
  emergency: AlertTriangle,
  announcement: Megaphone,
  info: Info,
}

export default function NoticesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notice Board</h1>
          <p className="text-muted-foreground mt-1">Publish and manage announcements</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Notice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Notice</DialogTitle>
              <DialogDescription>Publish an announcement to all residents</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input placeholder="Enter notice title..." />
              </div>
              <div className="grid gap-2">
                <Label>Content</Label>
                <Textarea placeholder="Enter notice content..." className="min-h-32" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="info">Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label>Pin to Top</Label>
                  <p className="text-sm text-muted-foreground">Keep this notice at the top of the board</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="space-y-0.5">
                  <Label>Send Push Notification</Label>
                  <p className="text-sm text-muted-foreground">Notify all residents immediately</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>
                <Send className="mr-2 h-4 w-4" />
                Publish Notice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Notices</p>
            <p className="text-2xl font-bold text-foreground">{notices.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="p-4">
            <p className="text-sm text-destructive">Emergency</p>
            <p className="text-2xl font-bold text-destructive">
              {notices.filter((n) => n.type === "emergency").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pinned</p>
            <p className="text-2xl font-bold text-foreground">
              {notices.filter((n) => n.pinned).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">This Week</p>
            <p className="text-2xl font-bold text-foreground">3</p>
          </CardContent>
        </Card>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((notice, index) => {
          const TypeIcon = typeIcons[notice.type as keyof typeof typeIcons] || Info
          return (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`overflow-hidden ${
                notice.priority === "high" ? "border-destructive/30" : ""
              }`}>
                {notice.pinned && (
                  <div className="bg-primary/5 px-4 py-2 flex items-center gap-2 border-b border-border">
                    <Pin className="h-3 w-3 text-primary" />
                    <span className="text-xs font-medium text-primary">Pinned Notice</span>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl shrink-0 ${
                      notice.priority === "high"
                        ? "bg-destructive/10"
                        : notice.type === "announcement"
                        ? "bg-primary/10"
                        : "bg-muted"
                    }`}>
                      <TypeIcon className={`h-6 w-6 ${
                        notice.priority === "high"
                          ? "text-destructive"
                          : notice.type === "announcement"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="font-semibold text-lg text-foreground">{notice.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={priorityColors[notice.priority as keyof typeof priorityColors]}>
                            {notice.priority}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {notice.type}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{notice.content}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {notice.publishedAt}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {notice.views} views
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 sm:flex-col">
                      <Button variant="outline" size="sm">
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
