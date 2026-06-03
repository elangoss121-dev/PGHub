"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  MoreHorizontal,
  UserPlus,
  Download,
  Phone,
  Home,
  Shield,
  Ban,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Mail,
  X,
  Users,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AvatarUpload } from "@/components/avatar-upload"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth, User, ROLE_LABELS, ROLE_COLORS, AdminRole } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

export default function UsersPage() {
  const { users, user: currentUser, isSuperAdmin, hasPermission, addUser, updateUser, deleteUser, canManageUser } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  
  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "resident" as "admin" | "resident",
    adminRole: "" as AdminRole | "",
    room: "",
    bed: "",
    status: "active" as "active" | "pending" | "suspended",
    avatar: "" as string,
  })

  const residents = users.filter(u => u.role === "resident")
  const admins = users.filter(u => u.role === "admin")

  const filteredUsers = residents.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.room && u.room.includes(searchQuery))
    const matchesStatus = statusFilter === "all" || u.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: residents.length,
    active: residents.filter(u => u.status === "active").length,
    pending: residents.filter(u => u.status === "pending").length,
    suspended: residents.filter(u => u.status === "suspended").length,
  }

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "resident",
      adminRole: "",
      room: "",
      bed: "",
      status: "active",
      avatar: "",
    })
  }

  const handleAddUser = () => {
    if (!formData.name || !formData.email) return
    
    addUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      adminRole: formData.role === "admin" ? (formData.adminRole as AdminRole) : undefined,
      room: formData.role === "resident" ? formData.room : undefined,
      bed: formData.role === "resident" ? formData.bed : undefined,
      status: formData.status,
      avatar: formData.avatar || undefined,
    })
    
    setAddDialogOpen(false)
    resetForm()
  }

  const handleEditUser = () => {
    if (!selectedUser || !formData.name || !formData.email) return
    
    updateUser(selectedUser.id, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      room: formData.room,
      bed: formData.bed,
      status: formData.status,
      avatar: formData.avatar || undefined,
    })
    
    setEditDialogOpen(false)
    setSelectedUser(null)
    resetForm()
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return
    deleteUser(selectedUser.id)
    setDeleteDialogOpen(false)
    setSelectedUser(null)
  }

  const openEditDialog = (user: User) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      adminRole: user.adminRole || "",
      room: user.room || "",
      bed: user.bed || "",
      status: user.status,
      avatar: user.avatar || "",
    })
    setEditDialogOpen(true)
  }

  const openViewDialog = (user: User) => {
    setSelectedUser(user)
    setViewDialogOpen(true)
  }

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user)
    setDeleteDialogOpen(true)
  }

  const toggleUserStatus = (user: User, newStatus: "active" | "suspended") => {
    updateUser(user.id, { status: newStatus })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage resident accounts and permissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {(isSuperAdmin() || hasPermission("create_users")) && (
            <Button size="sm" onClick={() => { resetForm(); setAddDialogOpen(true) }}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Users", value: stats.total, color: "text-foreground" },
          { label: "Active", value: stats.active, color: "text-emerald-600" },
          { label: "Pending", value: stats.pending, color: "text-amber-600" },
          { label: "Suspended", value: stats.suspended, color: "text-destructive" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <p className={cn("text-2xl font-bold mt-1", stat.color)}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or room..."
                className="pl-9 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-36 h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Room</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <AnimatePresence>
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {user.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium text-foreground text-sm truncate">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-sm text-muted-foreground">{user.phone || "—"}</p>
                      </td>
                      <td className="px-4 py-3">
                        {user.room ? (
                          <div className="flex items-center gap-1.5">
                            <Home className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-sm font-medium">{user.room}-{user.bed}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs font-medium capitalize",
                            user.status === "active" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                            user.status === "pending" && "bg-amber-500/10 text-amber-600 border-amber-500/20",
                            user.status === "suspended" && "bg-destructive/10 text-destructive border-destructive/20"
                          )}
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openViewDialog(user)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {canManageUser(user) && (
                              <>
                                <DropdownMenuItem onClick={() => openEditDialog(user)}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {user.status === "active" ? (
                                  <DropdownMenuItem onClick={() => toggleUserStatus(user, "suspended")} className="text-amber-600">
                                    <Ban className="mr-2 h-4 w-4" />
                                    Suspend User
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => toggleUserStatus(user, "active")} className="text-emerald-600">
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Activate User
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => openDeleteDialog(user)} className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete User
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No users found matching your filters.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new resident or admin account</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>User Type</Label>
              <Select value={formData.role} onValueChange={(v) => setFormData({ ...formData, role: v as "admin" | "resident", adminRole: "" })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resident">Resident</SelectItem>
                  {isSuperAdmin() && <SelectItem value="admin">Admin</SelectItem>}
                </SelectContent>
              </Select>
            </div>
            {formData.role === "admin" && (
              <div className="grid gap-2">
                <Label>Admin Role</Label>
                <Select value={formData.adminRole} onValueChange={(v) => setFormData({ ...formData, adminRole: v as AdminRole })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="property_manager">Property Manager</SelectItem>
                    <SelectItem value="food_admin">Food Admin</SelectItem>
                    <SelectItem value="guest_credential_creator">Guest Credential Creator</SelectItem>
                    <SelectItem value="fee_maintainer">Fee Maintainer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            {formData.role === "resident" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label>Room</Label>
                  <Input placeholder="201" value={formData.room} onChange={(e) => setFormData({ ...formData, room: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>Bed</Label>
                  <Input placeholder="A" value={formData.bed} onChange={(e) => setFormData({ ...formData, bed: e.target.value })} />
                </div>
              </div>
            )}
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as "active" | "pending" | "suspended" })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddUser} disabled={!formData.name || !formData.email || (formData.role === "admin" && !formData.adminRole)}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-2">
              <AvatarUpload
                src={formData.avatar || undefined}
                fallback={(formData.name || "U").split(" ").map((n) => n[0]).join("").toUpperCase()}
                onChange={(dataUrl) => setFormData({ ...formData, avatar: dataUrl })}
                size="lg"
              />
              <p className="text-xs text-muted-foreground">Upload a profile photo. Any image format is supported.</p>
            </div>
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            {selectedUser?.role === "resident" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <Label>Room</Label>
                  <Input value={formData.room} onChange={(e) => setFormData({ ...formData, room: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>Bed</Label>
                  <Input value={formData.bed} onChange={(e) => setFormData({ ...formData, bed: e.target.value })} />
                </div>
              </div>
            )}
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as "active" | "pending" | "suspended" })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {selectedUser.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedUser.name}</h3>
                  <Badge variant="outline" className={cn(
                    "text-xs capitalize mt-1",
                    selectedUser.status === "active" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                  )}>
                    {selectedUser.status}
                  </Badge>
                </div>
              </div>
              <div className="grid gap-3 text-sm">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedUser.email}</span>
                </div>
                {selectedUser.phone && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedUser.phone}</span>
                  </div>
                )}
                {selectedUser.room && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Home className="h-4 w-4 text-muted-foreground" />
                    <span>Room {selectedUser.room}, Bed {selectedUser.bed}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-medium text-foreground">{selectedUser?.name}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteUser}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
