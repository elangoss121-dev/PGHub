"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Building2, LayoutDashboard, User, CreditCard, Utensils, CalendarCheck,
  Package, MessageSquare, Bell, Settings, LogOut, Menu, X, ChevronRight, KeyRound
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChangePasswordModal } from "@/components/change-password-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/resident/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/resident/profile", icon: User },
  { label: "Rent & Payments", href: "/resident/payments", icon: CreditCard },
  { label: "Food Management", href: "/resident/food", icon: Utensils },
  { label: "Meal Attendance", href: "/resident/attendance", icon: CalendarCheck },
  { label: "Laundry Tracking", href: "/resident/laundry", icon: Package },
  { label: "Complaints", href: "/resident/complaints", icon: MessageSquare, badge: "2" },
  { label: "Emergency Notices", href: "/resident/notices", icon: Bell, badge: "1", badgeColor: "bg-destructive" },
  { label: "Settings", href: "/resident/settings", icon: Settings },
]

export default function ResidentLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout } = useAuth()

  // Redirect if not authenticated or not resident
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "resident")) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, user, router])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  if (isLoading || !isAuthenticated || user?.role !== "resident") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  const initials = user.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "U"
  const roomInfo = user.room && user.bed ? `Room ${user.room} - Bed ${user.bed}` : "Room not assigned"

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn("flex flex-col h-full", mobile ? "p-4" : "p-4")}>
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
          <Building2 className="w-4.5 h-4.5 text-white" />
        </div>
        <span className="text-base font-bold text-sidebar-foreground">PGHub</span>
      </div>

      {/* Resident info card */}
      <div className="bg-sidebar-accent rounded-xl p-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0 overflow-hidden">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              initials
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-sidebar-foreground truncate">{user.name}</p>
            <p className="text-xs text-sidebar-foreground/50">{roomInfo}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href} onClick={() => mobile && setSidebarOpen(false)}
              className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                active ? "bg-primary text-white" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground")}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white", item.badgeColor || "bg-warning", active && "bg-white/20")}>
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="pt-4 border-t border-sidebar-border mt-4 space-y-1">
        <button
          type="button"
          onClick={() => { if (mobile) setSidebarOpen(false); setChangePasswordOpen(true) }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground w-full transition-all"
        >
          <KeyRound className="w-4 h-4" />
          Change Password
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground w-full transition-all"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        userEmail={user.email}
      />
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 bg-sidebar flex-col flex-shrink-0 border-r border-sidebar-border">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }} transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-60 bg-sidebar z-50 lg:hidden">
              <div className="absolute top-3 right-3">
                <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg text-sidebar-foreground/60 hover:bg-sidebar-accent">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <Sidebar mobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between h-14 px-4 sm:px-6 border-b border-border bg-background flex-shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1.5 rounded-lg hover:bg-muted" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
              <span>PGHub</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium capitalize">{pathname.split("/").pop()?.replace(/-/g, " ") || "Dashboard"}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/resident/notices">
              <button className="relative p-2 rounded-lg hover:bg-muted">
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary hover:ring-2 hover:ring-primary/30 transition-all overflow-hidden">
                  {user.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-full w-full object-cover" />
                  ) : (
                    initials
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/resident/profile">
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setChangePasswordOpen(true)}>
                  <KeyRound className="mr-2 h-4 w-4" />
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
