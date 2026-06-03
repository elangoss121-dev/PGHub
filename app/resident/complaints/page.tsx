"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Plus, Clock, CheckCircle2, AlertCircle, ChevronDown, Paperclip, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const COMPLAINTS = [
  { id: "TKT-006", title: "AC not cooling properly in room A-204", category: "Room Issues", priority: "High", status: "In Progress", created: "Jan 22, 2025", updated: "Jan 23, 2025", response: "Technician scheduled for Jan 25, 2025 between 10AM–12PM." },
  { id: "TKT-005", title: "Food quality in dinner was below standard", category: "Food Issues", priority: "Medium", status: "Resolved", created: "Jan 18, 2025", updated: "Jan 20, 2025", response: "We apologize for the inconvenience. Kitchen staff has been instructed." },
  { id: "TKT-004", title: "Bathroom tap leaking since 2 days", category: "Plumbing", priority: "High", status: "Resolved", created: "Jan 10, 2025", updated: "Jan 12, 2025", response: "Plumber fixed the tap on Jan 12. Please confirm if issue is resolved." },
]

const PRIORITY_STYLES: Record<string, string> = {
  "High": "bg-destructive/10 text-destructive border-destructive/20",
  "Medium": "bg-warning/10 text-warning border-warning/20",
  "Low": "bg-success/10 text-success border-success/20",
}
const STATUS_STYLES: Record<string, string> = {
  "Open": "bg-primary/10 text-primary border-primary/20",
  "In Progress": "bg-warning/10 text-warning border-warning/20",
  "Resolved": "bg-success/10 text-success border-success/20",
  "Closed": "bg-muted text-muted-foreground border-border",
}

export default function ComplaintsPage() {
  const [showForm, setShowForm] = useState(false)
  const [expanded, setExpanded] = useState<string | null>("TKT-006")

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Complaints</h1>
          <p className="text-sm text-muted-foreground">Submit and track your support tickets</p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" />New Complaint
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: "6", color: "text-foreground" },
          { label: "Active", value: "1", color: "text-warning" },
          { label: "Resolved", value: "5", color: "text-success" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-3 text-center">
            <p className={cn("text-2xl font-bold", s.color)}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* New complaint form */}
      {showForm && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-semibold text-sm mb-4">Submit New Complaint</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Title</label>
              <input placeholder="Brief description of the issue" className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Category</label>
                <select className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  {["Room Issues", "Food Issues", "Plumbing", "Electrical", "Maintenance", "General"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Priority</label>
                <select className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  {["Low", "Medium", "High"].map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Description</label>
              <textarea rows={4} placeholder="Describe the issue in detail..." className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                <Paperclip className="w-4 h-4" /> Attach photo (optional)
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button size="sm" className="gap-2" onClick={() => setShowForm(false)}>
                <Send className="w-4 h-4" />Submit Complaint
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Complaints list */}
      <div className="space-y-3">
        {COMPLAINTS.map((complaint, i) => (
          <motion.div key={complaint.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-card border border-border rounded-2xl overflow-hidden">
            <button className="w-full flex items-start gap-4 p-4 text-left" onClick={() => setExpanded(expanded === complaint.id ? null : complaint.id)}>
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", complaint.status === "Resolved" ? "bg-success/10" : "bg-warning/10")}>
                {complaint.status === "Resolved" ? <CheckCircle2 className="w-4 h-4 text-success" /> : <AlertCircle className="w-4 h-4 text-warning" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <p className="text-sm font-medium leading-snug">{complaint.title}</p>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Badge className={cn("text-xs", PRIORITY_STYLES[complaint.priority])}>{complaint.priority}</Badge>
                    <Badge className={cn("text-xs", STATUS_STYLES[complaint.status])}>{complaint.status}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground font-mono">{complaint.id}</span>
                  <span className="text-xs text-muted-foreground">{complaint.category}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{complaint.created}</span>
                </div>
              </div>
              <ChevronDown className={cn("w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 transition-transform", expanded === complaint.id && "rotate-180")} />
            </button>
            {expanded === complaint.id && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 pb-4 border-t border-border pt-3">
                <div className="bg-muted/40 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-primary" />
                    <p className="text-xs font-semibold text-primary">Admin Response</p>
                    <span className="text-xs text-muted-foreground ml-auto">{complaint.updated}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{complaint.response}</p>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
