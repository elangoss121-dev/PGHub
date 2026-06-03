"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Package, CheckCircle2, Clock, Truck, ArrowRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const STATUSES = ["Requested", "Collected", "Washing", "Ready for Pickup", "Delivered"] as const
type Status = typeof STATUSES[number]

const STATUS_COLORS: Record<Status, string> = {
  "Requested": "bg-warning/10 text-warning border-warning/20",
  "Collected": "bg-primary/10 text-primary border-primary/20",
  "Washing": "bg-primary/10 text-primary border-primary/20",
  "Ready for Pickup": "bg-success/10 text-success border-success/20",
  "Delivered": "bg-success/10 text-success border-success/20",
}

const HISTORY = [
  { id: "LND-018", date: "Jan 22, 2025", items: "5 clothes", status: "Delivered" as Status, completed: "Jan 24, 2025" },
  { id: "LND-017", date: "Jan 15, 2025", items: "7 clothes", status: "Delivered" as Status, completed: "Jan 17, 2025" },
  { id: "LND-016", date: "Jan 8, 2025", items: "4 clothes", status: "Delivered" as Status, completed: "Jan 10, 2025" },
]

const CURRENT_TIMELINE: { step: Status; done: boolean; time: string }[] = [
  { step: "Requested", done: true, time: "Jan 25 · 9:00 AM" },
  { step: "Collected", done: true, time: "Jan 25 · 11:30 AM" },
  { step: "Washing", done: true, time: "Jan 25 · 2:00 PM" },
  { step: "Ready for Pickup", done: false, time: "Expected Jan 26" },
  { step: "Delivered", done: false, time: "Expected Jan 26" },
]

export default function LaundryPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Laundry Tracking</h1>
          <p className="text-sm text-muted-foreground">Track your laundry request status in real-time</p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" />New Request
        </Button>
      </div>

      {/* New request form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-semibold text-sm mb-4">New Laundry Request</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Number of Items</label>
              <input type="number" placeholder="e.g. 5" className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Preferred Pickup Time</label>
              <select className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Morning (8–10 AM)</option>
                <option>Afternoon (12–2 PM)</option>
                <option>Evening (5–7 PM)</option>
              </select>
            </div>
          </div>
          <textarea rows={2} placeholder="Special instructions (optional)..." className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none mb-4" />
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button size="sm" className="gap-2" onClick={() => setShowForm(false)}>
              Submit Request <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Current request */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-sm">Current Request — LND-019</h2>
            <p className="text-xs text-muted-foreground">6 clothes · Submitted Jan 25, 2025</p>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">Washing</Badge>
        </div>
        {/* Timeline */}
        <div className="relative">
          {CURRENT_TIMELINE.map((step, i) => (
            <div key={step.step} className="flex gap-4 mb-4 last:mb-0">
              <div className="flex flex-col items-center">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10", step.done ? "bg-success text-white" : "bg-muted text-muted-foreground border-2 border-border")}>
                  {step.done ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                </div>
                {i < CURRENT_TIMELINE.length - 1 && (
                  <div className={cn("w-0.5 flex-1 mt-1", step.done ? "bg-success" : "bg-border")} style={{ minHeight: "24px" }} />
                )}
              </div>
              <div className="pt-1 pb-4 last:pb-0">
                <p className={cn("text-sm font-medium", step.done ? "text-foreground" : "text-muted-foreground")}>{step.step}</p>
                <p className="text-xs text-muted-foreground">{step.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* History */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-2xl p-5">
        <h2 className="font-semibold text-sm mb-4">Request History</h2>
        <div className="space-y-3">
          {HISTORY.map((h) => (
            <div key={h.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium">{h.id} — {h.items}</p>
                  <p className="text-xs text-muted-foreground">Requested: {h.date} · Delivered: {h.completed}</p>
                </div>
              </div>
              <Badge className={cn("text-xs", STATUS_COLORS[h.status])}>{h.status}</Badge>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
