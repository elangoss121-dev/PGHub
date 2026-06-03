"use client"

import { motion } from "framer-motion"
import { CreditCard, Home, CalendarCheck, Package, MessageSquare, Bell, TrendingUp, Clock, CheckCircle2, AlertCircle, Utensils } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useAuth } from "@/lib/auth-context"

const PAYMENT_DATA = [
  { month: "Aug", amount: 8500 },
  { month: "Sep", amount: 8500 },
  { month: "Oct", amount: 9000 },
  { month: "Nov", amount: 8500 },
  { month: "Dec", amount: 8500 },
  { month: "Jan", amount: 8500 },
]

const MEAL_DATA = [
  { name: "Breakfast", value: 22, fill: "var(--color-chart-1)" },
  { name: "Lunch", value: 28, fill: "var(--color-chart-2)" },
  { name: "Dinner", value: 25, fill: "var(--color-chart-3)" },
  { name: "Skipped", value: 18, fill: "var(--color-chart-4)" },
]

const ACTIVITY = [
  { icon: CheckCircle2, text: "Rent payment verified for January 2025", time: "2 hours ago", color: "text-success" },
  { icon: Package, text: "Laundry delivered to Room A-204", time: "Yesterday", color: "text-primary" },
  { icon: Utensils, text: "Food poll: Biryani won for tomorrow dinner", time: "Yesterday", color: "text-warning" },
  { icon: MessageSquare, text: "Complaint #TKT-004 status updated", time: "2 days ago", color: "text-destructive" },
  { icon: Bell, text: "Emergency: Water supply off 10AM–2PM on Jan 20", time: "3 days ago", color: "text-destructive" },
]

export default function ResidentDashboard() {
  const { user } = useAuth()
  const firstName = user?.name?.split(" ")[0] || "Resident"
  const roomInfo = user?.room && user?.bed ? `${user.room}-${user.bed}` : "Not assigned"

  const STAT_CARDS = [
    { label: "Room Number", value: roomInfo, sub: user?.bed ? `Bed ${user.bed}` : "", icon: Home, color: "text-primary", bg: "bg-primary/10" },
    { label: "Rent Status", value: "Paid", sub: "Due: Feb 1, 2025", icon: CreditCard, color: "text-success", bg: "bg-success/10" },
    { label: "Food Attendance", value: "87%", sub: "This month", icon: Utensils, color: "text-warning", bg: "bg-warning/10" },
    { label: "Active Complaints", value: "2", sub: "1 in progress", icon: MessageSquare, color: "text-destructive", bg: "bg-destructive/10" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">Good morning, {firstName}!</h1>
        <p className="text-muted-foreground text-sm">Here&apos;s what&apos;s happening in your PG today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-card border border-border rounded-2xl p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", card.bg)}>
                <card.icon className={cn("w-4.5 h-4.5", card.color)} />
              </div>
            </div>
            <p className={cn("text-xl font-bold mb-0.5", card.color)}>{card.value}</p>
            <p className="text-xs font-medium text-foreground">{card.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Payment chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-2xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-sm">Payment History</h2>
              <p className="text-xs text-muted-foreground">Last 6 months rent trend</p>
            </div>
            <Badge className="bg-success/10 text-success border-success/20 text-xs">All Paid</Badge>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PAYMENT_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="var(--color-border)" />
                <YAxis tick={{ fontSize: 11 }} stroke="var(--color-border)" />
                <Tooltip formatter={(v) => [`₹${v}`, "Rent"]} contentStyle={{ borderRadius: "0.75rem", border: "1px solid var(--color-border)", background: "var(--color-card)" }} />
                <Area type="monotone" dataKey="amount" stroke="var(--color-primary)" strokeWidth={2} fill="url(#payGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Meal attendance */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-semibold text-sm mb-1">Meal Attendance</h2>
          <p className="text-xs text-muted-foreground mb-4">This month breakdown</p>
          <div className="h-32 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MEAL_DATA} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={3} dataKey="value">
                  {MEAL_DATA.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid var(--color-border)", background: "var(--color-card)", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 mt-2">
            {MEAL_DATA.map((m) => (
              <div key={m.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{ background: m.fill }} />
                  <span className="text-muted-foreground">{m.name}</span>
                </div>
                <span className="font-medium">{m.value} days</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Activity feed */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-2xl p-5 lg:col-span-2">
          <h2 className="font-semibold text-sm mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex gap-3">
                <div className={cn("w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5")}>
                  <a.icon className={cn("w-3.5 h-3.5", a.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug">{a.text}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />{a.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick info */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="space-y-4">
          {/* Rent due */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Next Rent Due</h3>
              <Badge className="bg-warning/10 text-warning border-warning/20 text-xs">3 days</Badge>
            </div>
            <p className="text-2xl font-bold text-primary mb-1">₹8,500</p>
            <p className="text-xs text-muted-foreground">Due: February 1, 2025</p>
            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-warning rounded-full" style={{ width: "87%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">87% of month elapsed</p>
          </div>
          {/* Laundry status */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <h3 className="font-semibold text-sm mb-3">Laundry Status</h3>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-success">Delivered</p>
                <p className="text-xs text-muted-foreground">Today at 10:30 AM</p>
              </div>
            </div>
          </div>
          {/* Emergency notice */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-destructive">Water Supply Notice</p>
                <p className="text-xs text-muted-foreground mt-0.5">Water will be off tomorrow 10AM–2PM for maintenance.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
