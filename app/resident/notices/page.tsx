"use client"

import { motion } from "framer-motion"
import { Bell, AlertTriangle, Zap, Droplets, Shield, Megaphone, Clock, CheckCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const NOTICES = [
  { id: 1, type: "Water", icon: Droplets, title: "Water Supply Interruption", message: "Water supply will be interrupted on January 27, 2025 from 10:00 AM to 2:00 PM due to scheduled maintenance of the overhead tank. Please store water accordingly.", priority: "high", date: "Jan 25, 2025", read: false },
  { id: 2, type: "Electricity", icon: Zap, title: "Power Outage Scheduled", message: "There will be a planned power outage on January 28, 2025 from 9:00 AM to 11:00 AM for meter replacement. Generator backup will be available for common areas only.", priority: "high", date: "Jan 24, 2025", read: false },
  { id: 3, type: "Security", icon: Shield, title: "Visitor Policy Reminder", message: "Friendly reminder: All visitors must register at the front desk and vacate the premises by 10:00 PM. Unregistered visitors will not be allowed entry after 8:00 PM.", priority: "medium", date: "Jan 20, 2025", read: true },
  { id: 4, type: "General", icon: Megaphone, title: "Republic Day Holiday Menu", message: "On January 26, 2025 (Republic Day), a special festive menu will be served for lunch. Breakfast timings remain the same. Dinner will be a special thali.", priority: "low", date: "Jan 20, 2025", read: true },
  { id: 5, type: "General", icon: Megaphone, title: "Rent Reminder — February 2025", message: "This is a reminder that February rent of ₹8,500 is due on February 1, 2025. Kindly make the payment before or on the due date to avoid late fees.", priority: "medium", date: "Jan 18, 2025", read: true },
]

const PRIORITY_CONFIG = {
  high: { badge: "bg-destructive/10 text-destructive border-destructive/20", border: "border-l-destructive", icon: "text-destructive" },
  medium: { badge: "bg-warning/10 text-warning border-warning/20", border: "border-l-warning", icon: "text-warning" },
  low: { badge: "bg-success/10 text-success border-success/20", border: "border-l-success", icon: "text-success" },
}

export default function NoticesPage() {
  const unreadCount = NOTICES.filter((n) => !n.read).length

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Emergency Notices</h1>
          <p className="text-sm text-muted-foreground">Important announcements from the PG management</p>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20">{unreadCount} Unread</Badge>
        )}
      </div>

      {/* Filter row */}
      <div className="flex gap-2 flex-wrap">
        {["All", "Water", "Electricity", "Security", "General"].map((f) => (
          <button key={f} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors", f === "All" ? "bg-primary text-white border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/40")}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {NOTICES.map((notice, i) => {
          const config = PRIORITY_CONFIG[notice.priority as keyof typeof PRIORITY_CONFIG]
          return (
            <motion.div key={notice.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className={cn("bg-card border border-border rounded-2xl overflow-hidden border-l-4", config.border, !notice.read && "shadow-sm")}>
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5",
                    notice.priority === "high" ? "bg-destructive/10" : notice.priority === "medium" ? "bg-warning/10" : "bg-success/10")}>
                    <notice.icon className={cn("w-4.5 h-4.5", config.icon)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <p className={cn("text-sm font-semibold", !notice.read && "text-foreground")}>{notice.title}</p>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {!notice.read && <div className="w-2 h-2 rounded-full bg-primary" />}
                        <Badge className={cn("text-xs", config.badge)}>{notice.priority}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">{notice.message}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{notice.date}</span>
                      <span className="flex items-center gap-1 text-muted-foreground/50">{notice.type}</span>
                      {notice.read && <span className="flex items-center gap-1 text-success"><CheckCheck className="w-3 h-3" />Read</span>}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
