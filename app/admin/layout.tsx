"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  Home,
  UtensilsCrossed,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Shield,
  UserPlus,
  ClipboardList,
  FileText,
  BarChart3,
  Building,
  KeyRound,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ChangePasswordModal } from "@/components/change-password-modal"
import { useAuth, ROLE_LABELS, ROLE_COLORS, ROLE_PERMISSIONS } from "@/lib/auth-context"

const allNavigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, permission: null },
  { name: "User Management", href: "/admin/users", icon: Users, permission: "view_users" },
  { name: "Registrations", href: "/admin/registrations", icon: UserPlus, permission: "view_registrations" },
  { name: "Property", href: "/admin/property", icon: Building, permission: "manage_rooms" },
  { name: "Food Management", href: "/admin/food", icon: UtensilsCrossed, permission: "manage_menu" },
  { name: "Payments", href: "/admin/payments", icon: CreditCard, permission: "view_payment_history" },
  { name: "Complaints", href: "/admin/complaints", icon: ClipboardList, permission: "view_complaints" },
  { name: "Notices", href: "/admin/notices", icon: FileText, permission: "view_notices" },
  { name: "Reports", href: "/admin/reports", icon: BarChart3, permission: "view_financial_reports" },
  { name: "Role Management", href: "/admin/roles", icon: Shield, permission: "*" }, // Super admin only
  { name: "Settings", href: "/admin/settings", icon: Settings, permission: null },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout, hasPermission, isSuperAdmin } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)

  // Filter navigation based on user permissions
  const navigation = allNavigation.filter((item) => {
    if (item.permission === null) return true // Always show
    if (item.permission === "*") return isSuperAdmin() // Super admin only
    return hasPermission(item.permission) || isSuperAdmin()
  })

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, user, router])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (isLoading || !isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const initials = user.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "AD"
  const roleLabel = user.adminRole ? ROLE_LABELS[user.adminRole] : "Admin"
  const roleColor = user.adminRole ? ROLE_COLORS[user.adminRole] : "bg-primary"

  return (
    <div className="min-h-screen bg-background">
      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        userEmail={user.email}
      />
      
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-border">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Building className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold text-foreground">PGHub</span>
                <span className="block text-xs text-muted-foreground">Admin Panel</span>
              </div>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-border p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-xl p-3 hover:bg-accent transition-colors">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={cn("w-2 h-2 rounded-full", roleColor)}></span>
                      <p className="text-xs text-muted-foreground truncate">{roleLabel}</p>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setChangePasswordOpen(true)}>
                  <KeyRound className="mr-2 h-4 w-4" />
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 backdrop-blur-lg px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1" />

          <Badge variant="outline" className={cn("hidden sm:flex gap-1.5 py-1", roleColor === "bg-amber-500" && "border-amber-500/30 text-amber-600")}>
            <span className={cn("w-2 h-2 rounded-full", roleColor)}></span>
            {roleLabel}
          </Badge>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              3
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="font-normal">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{roleLabel}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
