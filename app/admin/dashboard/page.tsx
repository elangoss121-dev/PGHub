"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Users,
  Home,
  DollarSign,
  UtensilsCrossed,
  TrendingUp,
  TrendingDown,
  UserPlus,
  AlertCircle,
  CheckCircle,
  Clock,
  Building,
  CreditCard,
  MessageSquare,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth, ROLE_LABELS } from "@/lib/auth-context"

const stats = [
  {
    title: "Total Residents",
    value: "156",
    change: "+12",
    trend: "up",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Occupancy Rate",
    value: "92%",
    change: "+5%",
    trend: "up",
    icon: Home,
    color: "bg-emerald-500",
  },
  {
    title: "Monthly Revenue",
    value: "Rs 4,68,000",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
    color: "bg-primary",
  },
  {
    title: "Pending Approvals",
    value: "8",
    change: "3 new",
    trend: "neutral",
    icon: UserPlus,
    color: "bg-amber-500",
  },
]

const recentRegistrations = [
  { name: "Rahul Sharma", email: "rahul@email.com", type: "Student", date: "2 hours ago", status: "pending" },
  { name: "Priya Patel", email: "priya@email.com", type: "Professional", date: "5 hours ago", status: "pending" },
  { name: "Amit Kumar", email: "amit@email.com", type: "Student", date: "1 day ago", status: "approved" },
  { name: "Sneha Reddy", email: "sneha@email.com", type: "Professional", date: "1 day ago", status: "approved" },
]

const recentComplaints = [
  { id: "C-001", title: "AC not working", room: "204", priority: "high", status: "open" },
  { id: "C-002", title: "Water leakage", room: "112", priority: "medium", status: "in-progress" },
  { id: "C-003", title: "WiFi issues", room: "305", priority: "low", status: "resolved" },
]

const pendingPayments = [
  { name: "Vikram Singh", room: "201", amount: 8500, dueDate: "May 5" },
  { name: "Ananya Gupta", room: "108", amount: 9000, dueDate: "May 5" },
  { name: "Karthik R", room: "312", amount: 8500, dueDate: "May 10" },
]

export default function AdminDashboard() {
  const { user, getResidentUsers, getAdminUsers, isSuperAdmin, hasPermission } = useAuth()
  const residents = getResidentUsers()
  const admins = getAdminUsers()
  const roleLabel = user?.adminRole ? ROLE_LABELS[user.adminRole] : "Admin"

  // Dynamic stats based on actual data
  const dynamicStats: {
    title: string
    value: string
    change: string
    trend: "up" | "down" | "neutral"
    icon: typeof Users
    color: string
  }[] = [
    {
      title: "Total Residents",
      value: residents.length.toString(),
      change: "+2",
      trend: "up" as const,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Occupancy Rate",
      value: `${Math.round((residents.filter(r => r.status === "active").length / Math.max(residents.length, 1)) * 100)}%`,
      change: "+5%",
      trend: "up" as const,
      icon: Home,
      color: "bg-emerald-500",
    },
    {
      title: "Monthly Revenue",
      value: "Rs 4,68,000",
      change: "+8%",
      trend: "up" as const,
      icon: DollarSign,
      color: "bg-primary",
    },
    {
      title: "Pending Approvals",
      value: residents.filter(r => r.status === "pending").length.toString(),
      change: "new",
      trend: "neutral" as const,
      icon: UserPlus,
      color: "bg-amber-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back, {user?.name}! You&apos;re logged in as <span className="font-medium">{roleLabel}</span>.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {dynamicStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      {stat.trend === "up" ? (
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                      ) : stat.trend === "down" ? (
                        <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                      ) : (
                        <Clock className="h-3.5 w-3.5 text-amber-500" />
                      )}
                      <span className={`text-xs font-medium ${
                        stat.trend === "up" ? "text-emerald-500" : stat.trend === "down" ? "text-destructive" : "text-amber-500"
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Occupancy & Revenue */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Building className="h-4 w-4 text-primary" />
              Room Occupancy
            </CardTitle>
            <CardDescription className="text-xs">Current occupancy status across all floors</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-emerald-500/10 p-3">
                <p className="text-xl font-bold text-emerald-500">144</p>
                <p className="text-xs text-muted-foreground">Occupied</p>
              </div>
              <div className="rounded-xl bg-amber-500/10 p-3">
                <p className="text-xl font-bold text-amber-500">8</p>
                <p className="text-xs text-muted-foreground">Reserved</p>
              </div>
              <div className="rounded-xl bg-muted p-3">
                <p className="text-xl font-bold text-muted-foreground">12</p>
                <p className="text-xs text-muted-foreground">Vacant</p>
              </div>
            </div>
            <div className="space-y-2">
              {["Floor 1", "Floor 2", "Floor 3"].map((floor, i) => (
                <div key={floor} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{floor}</span>
                    <span className="font-medium">{95 - i * 5}%</span>
                  </div>
                  <Progress value={95 - i * 5} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="h-4 w-4 text-primary" />
              Payment Overview
            </CardTitle>
            <CardDescription className="text-xs">This month&apos;s payment collection status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-emerald-500/10 p-3">
                <p className="text-xl font-bold text-emerald-500">Rs 4.2L</p>
                <p className="text-xs text-muted-foreground">Collected</p>
              </div>
              <div className="rounded-xl bg-amber-500/10 p-3">
                <p className="text-xl font-bold text-amber-500">Rs 48K</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
              <div className="rounded-xl bg-destructive/10 p-3">
                <p className="text-xl font-bold text-destructive">Rs 12K</p>
                <p className="text-xs text-muted-foreground">Overdue</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Collection Progress</span>
                <span className="font-medium">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <Button asChild className="w-full h-9 text-sm">
              <Link href="/admin/payments">View All Payments</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent Registrations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Recent Registrations</CardTitle>
              <CardDescription className="text-xs">New user sign-ups</CardDescription>
            </div>
            <Badge variant="secondary" className="text-xs">{recentRegistrations.filter(r => r.status === "pending").length} Pending</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentRegistrations.map((user, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.type} - {user.date}</p>
                  </div>
                  {user.status === "pending" ? (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]">
                      Pending
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">
                      Approved
                    </Badge>
                  )}
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 h-9 text-sm" asChild>
              <Link href="/admin/registrations">View All Registrations</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Complaints */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Recent Complaints</CardTitle>
              <CardDescription className="text-xs">Support tickets</CardDescription>
            </div>
            <Badge variant="secondary" className="text-xs">{recentComplaints.filter(c => c.status === "open").length} Open</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentComplaints.map((complaint) => (
                <div key={complaint.id} className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/50">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full flex-shrink-0 ${
                    complaint.priority === "high" ? "bg-destructive/10" :
                    complaint.priority === "medium" ? "bg-amber-500/10" : "bg-muted"
                  }`}>
                    {complaint.status === "resolved" ? (
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                    ) : complaint.priority === "high" ? (
                      <AlertCircle className="h-3.5 w-3.5 text-destructive" />
                    ) : (
                      <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{complaint.title}</p>
                    <p className="text-xs text-muted-foreground">Room {complaint.room} - {complaint.id}</p>
                  </div>
                  <Badge variant={
                    complaint.status === "open" ? "destructive" :
                    complaint.status === "in-progress" ? "default" : "secondary"
                  } className="text-[10px]">
                    {complaint.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 h-9 text-sm" asChild>
              <Link href="/admin/complaints">View All Complaints</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Pending Payments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Pending Payments</CardTitle>
              <CardDescription className="text-xs">Awaiting verification</CardDescription>
            </div>
            <Badge variant="secondary" className="text-xs">{pendingPayments.length} Due</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingPayments.map((payment, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-amber-500/10 text-amber-600 text-xs">
                      {payment.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{payment.name}</p>
                    <p className="text-xs text-muted-foreground">Room {payment.room} - Due: {payment.dueDate}</p>
                  </div>
                  <p className="text-sm font-semibold text-foreground">Rs {payment.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 h-9 text-sm" asChild>
              <Link href="/admin/payments">View All Payments</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Food Stats */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <UtensilsCrossed className="h-4 w-4 text-primary" />
            Today&apos;s Food Statistics
          </CardTitle>
          <CardDescription className="text-xs">Meal attendance and feedback overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { meal: "Breakfast", attended: 142, total: 156, rating: 4.2 },
              { meal: "Lunch", attended: 138, total: 156, rating: 4.5 },
              { meal: "Snacks", attended: 98, total: 156, rating: 4.0 },
              { meal: "Dinner", attended: 0, total: 156, rating: null },
            ].map((meal) => (
              <div key={meal.meal} className="rounded-xl border border-border p-4">
                <h4 className="font-medium text-foreground text-sm">{meal.meal}</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Attendance</span>
                    <span className="font-medium">{meal.attended}/{meal.total}</span>
                  </div>
                  <Progress value={(meal.attended / meal.total) * 100} className="h-1.5" />
                  {meal.rating && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="text-amber-500 text-sm">★</span>
                      <span className="text-xs font-medium">{meal.rating}</span>
                      <span className="text-[10px] text-muted-foreground">avg</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
