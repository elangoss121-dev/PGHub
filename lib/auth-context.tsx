"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Role types
export type AdminRole = "super_admin" | "property_manager" | "food_admin" | "guest_credential_creator" | "fee_maintainer"
export type UserRole = "admin" | "resident"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  adminRole?: AdminRole
  avatar?: string
  phone?: string
  room?: string
  bed?: string
  status: "active" | "pending" | "suspended"
  createdAt: string
  createdBy?: string
}

export interface AdminUser extends User {
  role: "admin"
  adminRole: AdminRole
  permissions: string[]
}

// Permission definitions for each admin role
export const ROLE_PERMISSIONS: Record<AdminRole, string[]> = {
  super_admin: ["*"], // All permissions
  property_manager: [
    "view_users", "edit_users", "manage_rooms", "manage_beds", 
    "checkin_checkout", "room_transfers", "view_complaints", "manage_complaints", "view_notices", "create_notices"
  ],
  food_admin: [
    "view_users", "manage_menu", "create_polls", "view_food_attendance", 
    "mark_food_attendance", "view_feedback", "manage_food_settings"
  ],
  guest_credential_creator: [
    "view_registrations", "approve_registrations", "reject_registrations",
    "verify_documents", "create_credentials", "view_users"
  ],
  fee_maintainer: [
    "view_users", "upload_qr", "verify_payments", "view_financial_reports",
    "generate_receipts", "manage_payment_settings", "view_payment_history"
  ],
}

export const ROLE_LABELS: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  property_manager: "Property Manager",
  food_admin: "Food Admin",
  guest_credential_creator: "Guest Credential Creator",
  fee_maintainer: "Fee Maintainer",
}

export const ROLE_COLORS: Record<AdminRole, string> = {
  super_admin: "bg-amber-500",
  property_manager: "bg-blue-500",
  food_admin: "bg-emerald-500",
  guest_credential_creator: "bg-purple-500",
  fee_maintainer: "bg-primary",
}

// Initial demo users
const INITIAL_USERS: User[] = [
  {
    id: "1",
    email: "sivakumarelango10@gmail.com",
    name: "Sivakumar",
    role: "admin",
    adminRole: "super_admin",
    status: "active",
    createdAt: "2024-01-01",
    phone: "+91 6379883404",
  },
  {
    id: "2",
    email: "rajesh@pghub.com",
    name: "Rajesh Kumar",
    role: "admin",
    adminRole: "property_manager",
    status: "active",
    createdAt: "2024-02-15",
    createdBy: "1",
    phone: "+91 98765 43211",
  },
  {
    id: "3",
    email: "anita@pghub.com",
    name: "Anita Sharma",
    role: "admin",
    adminRole: "food_admin",
    status: "active",
    createdAt: "2024-02-20",
    createdBy: "1",
    phone: "+91 98765 43212",
  },
  {
    id: "4",
    email: "vikram@pghub.com",
    name: "Vikram Patel",
    role: "admin",
    adminRole: "guest_credential_creator",
    status: "active",
    createdAt: "2024-03-01",
    createdBy: "1",
    phone: "+91 98765 43213",
  },
  {
    id: "5",
    email: "priya@pghub.com",
    name: "Priya Gupta",
    role: "admin",
    adminRole: "fee_maintainer",
    status: "active",
    createdAt: "2024-03-10",
    createdBy: "1",
    phone: "+91 98765 43214",
  },
  // Residents
  {
    id: "6",
    email: "rahul@email.com",
    name: "Rahul Sharma",
    role: "resident",
    status: "active",
    createdAt: "2024-01-15",
    phone: "+91 98765 43210",
    room: "201",
    bed: "A",
  },
  {
    id: "7",
    email: "priya.patel@email.com",
    name: "Priya Patel",
    role: "resident",
    status: "active",
    createdAt: "2024-02-01",
    phone: "+91 98765 43215",
    room: "108",
    bed: "B",
  },
  {
    id: "8",
    email: "amit@email.com",
    name: "Amit Kumar",
    role: "resident",
    status: "suspended",
    createdAt: "2023-12-10",
    phone: "+91 98765 43216",
    room: "305",
    bed: "A",
  },
  {
    id: "9",
    email: "sneha@email.com",
    name: "Sneha Reddy",
    role: "resident",
    status: "active",
    createdAt: "2024-03-05",
    phone: "+91 98765 43217",
    room: "204",
    bed: "C",
  },
  {
    id: "10",
    email: "karthik@email.com",
    name: "Karthik R",
    role: "resident",
    status: "pending",
    createdAt: "2024-04-20",
    phone: "+91 98765 43218",
    room: "312",
    bed: "B",
  },
]

interface AuthContextType {
  user: User | null
  users: User[]
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: string) => boolean
  isSuperAdmin: () => boolean
  canManageUser: (targetUser: User) => boolean
  addUser: (userData: Omit<User, "id" | "createdAt" | "createdBy">) => User
  updateUser: (userId: string, updates: Partial<User>) => void
  deleteUser: (userId: string) => void
  getAdminUsers: () => User[]
  getResidentUsers: () => User[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>(INITIAL_USERS)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Restore persisted users list (name changes, uploaded DPs, added users)
    const storedUsers = localStorage.getItem("pghub_users")
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers))
      } catch {
        localStorage.removeItem("pghub_users")
      }
    }

    // Check for stored session
    const storedUser = localStorage.getItem("pghub_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("pghub_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Persist the users list whenever it changes so name/DP edits survive reloads
  useEffect(() => {
    if (isLoading) return
    localStorage.setItem("pghub_users", JSON.stringify(users))
  }, [users, isLoading])

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Find user by email
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    
    if (foundUser && foundUser.role === role && foundUser.status === "active") {
      // For demo: super admin password is "Manju1303", others use "password123"
      const validPassword = foundUser.adminRole === "super_admin" 
        ? password === "Manju1303"
        : password === "password123"
      
      if (validPassword) {
        setUser(foundUser)
        localStorage.setItem("pghub_user", JSON.stringify(foundUser))
        setIsLoading(false)
        return true
      }
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("pghub_user")
  }

  const hasPermission = (permission: string): boolean => {
    if (!user || user.role !== "admin") return false
    if (!user.adminRole) return false
    
    const permissions = ROLE_PERMISSIONS[user.adminRole]
    return permissions.includes("*") || permissions.includes(permission)
  }

  const isSuperAdmin = (): boolean => {
    return user?.role === "admin" && user?.adminRole === "super_admin"
  }

  const canManageUser = (targetUser: User): boolean => {
    if (!user) return false
    if (isSuperAdmin()) return true
    
    // Only super admin can manage other admins
    if (targetUser.role === "admin") return false
    
    // Property managers and guest credential creators can manage residents
    if (user.adminRole === "property_manager" || user.adminRole === "guest_credential_creator") {
      return targetUser.role === "resident"
    }
    
    return false
  }

  const addUser = (userData: Omit<User, "id" | "createdAt" | "createdBy">): User => {
    const newUser: User = {
      ...userData,
      id: String(Date.now()),
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: user?.id,
    }
    setUsers(prev => [...prev, newUser])
    return newUser
  }

  const updateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updates } : u))
    // Update current user if they updated themselves
    if (user?.id === userId) {
      setUser(prev => prev ? { ...prev, ...updates } : null)
      localStorage.setItem("pghub_user", JSON.stringify({ ...user, ...updates }))
    }
  }

  const deleteUser = (userId: string) => {
    // Prevent deleting super admin
    const targetUser = users.find(u => u.id === userId)
    if (targetUser?.adminRole === "super_admin") return
    
    setUsers(prev => prev.filter(u => u.id !== userId))
  }

  const getAdminUsers = () => users.filter(u => u.role === "admin")
  const getResidentUsers = () => users.filter(u => u.role === "resident")

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasPermission,
        isSuperAdmin,
        canManageUser,
        addUser,
        updateUser,
        deleteUser,
        getAdminUsers,
        getResidentUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
