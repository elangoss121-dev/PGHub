"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Users,
  Check,
  Crown,
  Building,
  UtensilsCrossed,
  UserPlus,
  CreditCard,
  ChevronDown,
  X,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"
import { useAuth, AdminRole, ROLE_LABELS, ROLE_COLORS, ROLE_PERMISSIONS } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

const ROLE_ICONS: Record<AdminRole, typeof Crown> = {
  super_admin: Crown,
  property_manager: Building,
  food_admin: UtensilsCrossed,
  guest_credential_creator: UserPlus,
  fee_maintainer: CreditCard,
}

const ROLE_DESCRIPTIONS: Record<AdminRole, string> = {
  super_admin: "Full system access with all permissions",
  property_manager: "Manage rooms, beds, check-ins, and maintenance",
  food_admin: "Manage menus, polls, and food attendance",
  guest_credential_creator: "Review and create login credentials for new registrations",
  fee_maintainer: "Manage payments, QR codes, and financial reports",
}

const permissionGroups = [
  {
    name: "User Management",
    permissions: [
      { id: "view_users", label: "View Users" },
      { id: "create_users", label: "Create Users" },
      { id: "edit_users", label: "Edit Users" },
      { id: "delete_users", label: "Delete Users" },
    ],
  },
  {
    name: "Property Management",
    permissions: [
      { id: "manage_rooms", label: "Manage Rooms" },
      { id: "manage_beds", label: "Manage Beds" },
      { id: "checkin_checkout", label: "Check-in/Check-out" },
      { id: "room_transfers", label: "Room Transfers" },
    ],
  },
  {
    name: "Food Management",
    permissions: [
      { id: "manage_menu", label: "Manage Menu" },
      { id: "create_polls", label: "Create Polls" },
      { id: "view_food_attendance", label: "View Food Attendance" },
      { id: "mark_food_attendance", label: "Mark Food Attendance" },
      { id: "view_feedback", label: "View Feedback" },
    ],
  },
  {
    name: "Payment Management",
    permissions: [
      { id: "upload_qr", label: "Upload QR Codes" },
      { id: "verify_payments", label: "Verify Payments" },
      { id: "view_financial_reports", label: "Financial Reports" },
      { id: "view_payment_history", label: "Payment History" },
    ],
  },
  {
    name: "Communication",
    permissions: [
      { id: "view_complaints", label: "View Complaints" },
      { id: "manage_complaints", label: "Manage Complaints" },
      { id: "view_notices", label: "View Notices" },
      { id: "create_notices", label: "Create Notices" },
    ],
  },
  {
    name: "Registrations",
    permissions: [
      { id: "view_registrations", label: "View Registrations" },
      { id: "approve_registrations", label: "Approve Registrations" },
      { id: "reject_registrations", label: "Reject Registrations" },
      { id: "verify_documents", label: "Verify Documents" },
      { id: "create_credentials", label: "Create Credentials" },
    ],
  },
]

export default function RolesPage() {
  const { users, isSuperAdmin, addUser, updateUser, deleteUser, user: currentUser } = useAuth()
  const [openGroups, setOpenGroups] = useState<string[]>(["User Management"])
  const [addAdminOpen, setAddAdminOpen] = useState(false)
  const [editAdminOpen, setEditAdminOpen] = useState(false)
  const [deleteAdminOpen, setDeleteAdminOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<typeof users[0] | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adminRole: "" as AdminRole | "",
  })

  const adminUsers = users.filter(u => u.role === "admin")
  
  // Group admins by role for role cards
  const roleStats = (Object.keys(ROLE_LABELS) as AdminRole[]).map(role => ({
    role,
    label: ROLE_LABELS[role],
    description: ROLE_DESCRIPTIONS[role],
    icon: ROLE_ICONS[role],
    color: ROLE_COLORS[role],
    users: adminUsers.filter(u => u.adminRole === role).length,
    permissions: ROLE_PERMISSIONS[role],
  }))

  const toggleGroup = (name: string) => {
    setOpenGroups((prev) =>
      prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name]
    )
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", adminRole: "" })
  }

  const handleAddAdmin = () => {
    if (!formData.name || !formData.email || !formData.adminRole) return
    
    addUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: "admin",
      adminRole: formData.adminRole as AdminRole,
      status: "active",
    })
    
    setAddAdminOpen(false)
    resetForm()
  }

  const handleEditAdmin = () => {
    if (!selectedAdmin || !formData.name || !formData.email) return
    
    updateUser(selectedAdmin.id, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      adminRole: formData.adminRole as AdminRole,
    })
    
    setEditAdminOpen(false)
    setSelectedAdmin(null)
    resetForm()
  }

  const handleDeleteAdmin = () => {
    if (!selectedAdmin) return
    deleteUser(selectedAdmin.id)
    setDeleteAdminOpen(false)
    setSelectedAdmin(null)
  }

  const openEdit = (admin: typeof users[0]) => {
    setSelectedAdmin(admin)
    setFormData({
      name: admin.name,
      email: admin.email,
      phone: admin.phone || "",
      adminRole: admin.adminRole || "",
    })
    setEditAdminOpen(true)
  }

  const openDelete = (admin: typeof users[0]) => {
    setSelectedAdmin(admin)
    setDeleteAdminOpen(true)
  }

  // Only super admin can access this page
  if (!isSuperAdmin()) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold mb-2">Access Restricted</h2>
            <p className="text-sm text-muted-foreground">Only Super Admins can manage roles and permissions.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Role Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage admin roles and permissions (RBAC)</p>
        </div>
        <Button size="sm" onClick={() => { resetForm(); setAddAdminOpen(true) }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Admin User
        </Button>
      </div>

      {/* Roles Overview */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Roles Overview</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roleStats.map((role, index) => (
            <motion.div
              key={role.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="relative overflow-hidden h-full">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", role.color)}>
                      <role.icon className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs font-normal">
                      <Users className="mr-1 h-3 w-3" />
                      {role.users} {role.users === 1 ? "user" : "users"}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground">{role.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{role.description}</p>
                  {role.role !== "super_admin" && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {role.permissions.length} permissions
                      </span>
                    </div>
                  )}
                  {role.role === "super_admin" && (
                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border text-amber-600">
                      <Check className="h-3.5 w-3.5" />
                      <span className="text-xs font-medium">All permissions</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Admin Users Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Admin Users</CardTitle>
          <CardDescription>Users with administrative access to the system</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-y border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <AnimatePresence>
                  {adminUsers.map((admin, index) => {
                    const roleData = roleStats.find(r => r.role === admin.adminRole)
                    const isSelf = admin.id === currentUser?.id
                    const isSuperAdminUser = admin.adminRole === "super_admin"
                    
                    return (
                      <motion.tr 
                        key={admin.id} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.03 }}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarFallback className={cn("text-white text-sm", roleData?.color || "bg-primary")}>
                                {admin.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground text-sm truncate">{admin.name}</span>
                                {isSelf && (
                                  <Badge variant="outline" className="text-[10px] py-0 px-1.5">You</Badge>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground sm:hidden">{admin.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell">
                          <span className="text-sm text-muted-foreground">{admin.email}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {roleData && (
                              <div className={cn("flex h-6 w-6 items-center justify-center rounded", roleData.color)}>
                                <roleData.icon className="h-3.5 w-3.5 text-white" />
                              </div>
                            )}
                            <span className="text-sm font-medium">{roleData?.label || "Unknown"}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20 text-xs">
                            Active
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          {!isSuperAdminUser && (
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(admin)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => openDelete(admin)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                          {isSuperAdminUser && (
                            <span className="text-xs text-muted-foreground">Protected</span>
                          )}
                        </td>
                      </motion.tr>
                    )
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Permission Matrix */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Permission Matrix</CardTitle>
          <CardDescription>View permissions assigned to each role</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {permissionGroups.map((group) => (
              <Collapsible
                key={group.name}
                open={openGroups.includes(group.name)}
                onOpenChange={() => toggleGroup(group.name)}
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors text-sm">
                  <span className="font-medium">{group.name}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform text-muted-foreground",
                      openGroups.includes(group.name) && "rotate-180"
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="overflow-x-auto mt-2 border border-border rounded-lg">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                            Permission
                          </th>
                          {roleStats.map((role) => (
                            <th
                              key={role.role}
                              className="px-3 py-2 text-center text-xs font-medium text-muted-foreground whitespace-nowrap"
                            >
                              {role.label.split(" ")[0]}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {group.permissions.map((permission) => (
                          <tr key={permission.id} className="hover:bg-muted/20">
                            <td className="px-3 py-2 text-sm">{permission.label}</td>
                            {roleStats.map((role) => {
                              const hasPermission = role.permissions.includes("*") || role.permissions.includes(permission.id)
                              return (
                                <td key={role.role} className="px-3 py-2 text-center">
                                  {hasPermission ? (
                                    <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                                  ) : (
                                    <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                                  )}
                                </td>
                              )
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Admin Dialog */}
      <Dialog open={addAdminOpen} onOpenChange={setAddAdminOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Admin User</DialogTitle>
            <DialogDescription>Create a new administrator with specific role permissions</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input placeholder="Enter name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" placeholder="admin@pghub.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Phone (Optional)</Label>
              <Input placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Role</Label>
              <Select value={formData.adminRole} onValueChange={(v) => setFormData({ ...formData, adminRole: v as AdminRole })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roleStats.filter(r => r.role !== "super_admin").map((role) => (
                    <SelectItem key={role.role} value={role.role}>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", role.color)}></div>
                        {role.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                New admin users will receive login credentials via email. Default password is <code className="bg-muted px-1 rounded">password123</code>.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddAdminOpen(false)}>Cancel</Button>
            <Button onClick={handleAddAdmin} disabled={!formData.name || !formData.email || !formData.adminRole}>
              Add Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Admin Dialog */}
      <Dialog open={editAdminOpen} onOpenChange={setEditAdminOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Admin User</DialogTitle>
            <DialogDescription>Update admin information and role</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
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
            <div className="grid gap-2">
              <Label>Role</Label>
              <Select value={formData.adminRole} onValueChange={(v) => setFormData({ ...formData, adminRole: v as AdminRole })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roleStats.filter(r => r.role !== "super_admin").map((role) => (
                    <SelectItem key={role.role} value={role.role}>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", role.color)}></div>
                        {role.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditAdminOpen(false)}>Cancel</Button>
            <Button onClick={handleEditAdmin}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteAdminOpen} onOpenChange={setDeleteAdminOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove Admin Access</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove admin access for <span className="font-medium text-foreground">{selectedAdmin?.name}</span>? This will revoke all their administrative permissions.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteAdminOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteAdmin}>Remove Access</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
