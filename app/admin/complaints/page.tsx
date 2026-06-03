"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  User,
  Home,
  Wrench,
  Zap,
  Droplets,
  UtensilsCrossed,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const complaints = [
  {
    id: "C-001",
    title: "AC not working properly",
    description: "The AC in my room is making strange noises and not cooling effectively. It has been like this for 2 days.",
    category: "Electrical",
    user: "Rahul Sharma",
    room: "201",
    priority: "high",
    status: "open",
    createdAt: "2 hours ago",
  },
  {
    id: "C-002",
    title: "Water leakage in bathroom",
    description: "There is water leaking from the ceiling in the bathroom. It gets worse when it rains.",
    category: "Plumbing",
    user: "Priya Patel",
    room: "108",
    priority: "high",
    status: "in-progress",
    createdAt: "5 hours ago",
    assignedTo: "Maintenance Team",
  },
  {
    id: "C-003",
    title: "WiFi connectivity issues",
    description: "Internet has been very slow for the past week. Cannot attend online classes properly.",
    category: "General",
    user: "Amit Kumar",
    room: "305",
    priority: "medium",
    status: "in-progress",
    createdAt: "1 day ago",
    assignedTo: "IT Support",
  },
  {
    id: "C-004",
    title: "Food quality complaint",
    description: "The lunch served today was not up to the mark. The dal was too salty.",
    category: "Food",
    user: "Sneha Reddy",
    room: "204",
    priority: "low",
    status: "resolved",
    createdAt: "2 days ago",
    resolvedAt: "1 day ago",
  },
  {
    id: "C-005",
    title: "Broken window latch",
    description: "The window latch in my room is broken. Cannot close the window properly.",
    category: "Maintenance",
    user: "Karthik R",
    room: "312",
    priority: "medium",
    status: "open",
    createdAt: "3 hours ago",
  },
]

const categoryIcons: Record<string, React.ElementType> = {
  Electrical: Zap,
  Plumbing: Droplets,
  Maintenance: Wrench,
  Food: UtensilsCrossed,
  General: MessageSquare,
}

export default function ComplaintsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedComplaint, setSelectedComplaint] = useState<typeof complaints[0] | null>(null)

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.user.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    total: complaints.length,
    open: complaints.filter((c) => c.status === "open").length,
    inProgress: complaints.filter((c) => c.status === "in-progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Complaints & Support</h1>
        <p className="text-muted-foreground mt-1">Manage and resolve resident complaints</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Complaints</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="p-4">
            <p className="text-sm text-destructive">Open</p>
            <p className="text-2xl font-bold text-destructive">{stats.open}</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-amber-600">In Progress</p>
            <p className="text-2xl font-bold text-amber-600">{stats.inProgress}</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-emerald-600">Resolved</p>
            <p className="text-2xl font-bold text-emerald-600">{stats.resolved}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title, ID, or user..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map((complaint, index) => {
          const CategoryIcon = categoryIcons[complaint.category] || MessageSquare
          return (
            <motion.div
              key={complaint.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`${
                complaint.priority === "high" && complaint.status !== "resolved"
                  ? "border-destructive/30"
                  : ""
              }`}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg shrink-0 ${
                      complaint.priority === "high"
                        ? "bg-destructive/10"
                        : complaint.priority === "medium"
                        ? "bg-amber-500/10"
                        : "bg-muted"
                    }`}>
                      <CategoryIcon className={`h-5 w-5 ${
                        complaint.priority === "high"
                          ? "text-destructive"
                          : complaint.priority === "medium"
                          ? "text-amber-600"
                          : "text-muted-foreground"
                      }`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground">{complaint.title}</h3>
                          <Badge variant="outline" className="text-xs">{complaint.id}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={complaint.priority === "high" ? "destructive" : "outline"}
                            className={
                              complaint.priority === "medium"
                                ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                : complaint.priority === "low"
                                ? "bg-muted text-muted-foreground"
                                : ""
                            }
                          >
                            {complaint.priority}
                          </Badge>
                          <Badge
                            variant={
                              complaint.status === "open"
                                ? "destructive"
                                : complaint.status === "in-progress"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              complaint.status === "resolved"
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                : complaint.status === "in-progress"
                                ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                : ""
                            }
                          >
                            {complaint.status === "in-progress" ? "In Progress" : complaint.status}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {complaint.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {complaint.user}
                        </div>
                        <div className="flex items-center gap-1">
                          <Home className="h-4 w-4" />
                          Room {complaint.room}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {complaint.createdAt}
                        </div>
                        {complaint.assignedTo && (
                          <Badge variant="outline" className="font-normal">
                            Assigned: {complaint.assignedTo}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 sm:flex-col">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedComplaint(complaint)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              {complaint.title}
                              <Badge variant="outline" className="text-xs">{complaint.id}</Badge>
                            </DialogTitle>
                            <DialogDescription>
                              Submitted by {complaint.user} • Room {complaint.room}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="rounded-lg bg-muted/50 p-4">
                              <p className="text-foreground">{complaint.description}</p>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div className="space-y-1">
                                <Label className="text-muted-foreground">Category</Label>
                                <p className="font-medium">{complaint.category}</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-muted-foreground">Priority</Label>
                                <p className="font-medium capitalize">{complaint.priority}</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-muted-foreground">Status</Label>
                                <p className="font-medium capitalize">{complaint.status}</p>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-muted-foreground">Created</Label>
                                <p className="font-medium">{complaint.createdAt}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Add Response</Label>
                              <Textarea placeholder="Type your response..." />
                            </div>
                          </div>
                          <DialogFooter className="gap-2 sm:gap-0">
                            <Select>
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Update Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="in-progress">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button>Send Response</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      {complaint.status !== "resolved" && (
                        <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Resolve
                        </Button>
                      )}
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
