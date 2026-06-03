"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, Download, Upload, Clock, CheckCircle2, AlertTriangle, QrCode, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const PAYMENTS = [
  { id: "PAY-001", month: "January 2025", amount: 8500, due: "Jan 1, 2025", paid: "Jan 3, 2025", status: "paid" },
  { id: "PAY-002", month: "December 2024", amount: 8500, due: "Dec 1, 2024", paid: "Dec 2, 2024", status: "paid" },
  { id: "PAY-003", month: "November 2024", amount: 8500, due: "Nov 1, 2024", paid: "Nov 5, 2024", status: "paid" },
  { id: "PAY-004", month: "October 2024", amount: 9000, due: "Oct 1, 2024", paid: "Sep 28, 2024", status: "paid" },
  { id: "PAY-005", month: "September 2024", amount: 8500, due: "Sep 1, 2024", paid: "Sep 4, 2024", status: "paid" },
]

const STATUS_STYLES = {
  paid: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  overdue: "bg-destructive/10 text-destructive border-destructive/20",
  verification: "bg-primary/10 text-primary border-primary/20",
}

export default function PaymentsPage() {
  const [showQR, setShowQR] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold">Rent &amp; Payments</h1>
        <p className="text-sm text-muted-foreground">Manage your rent payments and view payment history</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Current Month Rent", value: "₹8,500", sub: "February 2025", icon: CreditCard, color: "text-primary", bg: "bg-primary/10", badge: "Due Feb 1", badgeStyle: "bg-warning/10 text-warning border-warning/20" },
          { label: "Total Paid (2024)", value: "₹1,02,000", sub: "12 months", icon: CheckCircle2, color: "text-success", bg: "bg-success/10", badge: "On time", badgeStyle: "bg-success/10 text-success border-success/20" },
          { label: "Security Deposit", value: "₹17,000", sub: "2 months advance", icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", badge: "Refundable", badgeStyle: "bg-warning/10 text-warning border-warning/20" },
        ].map((c) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", c.bg)}>
                <c.icon className={cn("w-4.5 h-4.5", c.color)} />
              </div>
              <Badge className={cn("text-xs", c.badgeStyle)}>{c.badge}</Badge>
            </div>
            <p className={cn("text-xl font-bold", c.color)}>{c.value}</p>
            <p className="text-xs font-medium mt-0.5">{c.label}</p>
            <p className="text-xs text-muted-foreground">{c.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Pay now section */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Pay Rent via QR Code</h2>
          <Button size="sm" className="gap-2" onClick={() => setShowQR(!showQR)}>
            <QrCode className="w-4 h-4" /> {showQR ? "Hide QR" : "Show QR"}
          </Button>
        </div>
        {showQR && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* QR Placeholder */}
              <div className="w-40 h-40 bg-muted border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 flex-shrink-0">
                <QrCode className="w-12 h-12 text-muted-foreground" />
                <p className="text-xs text-muted-foreground text-center">Admin QR Code</p>
              </div>
              <div className="flex-1 space-y-3">
                <div className="p-3 bg-muted/50 rounded-xl">
                  <p className="text-sm font-medium mb-1">Payment Instructions</p>
                  <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Scan the QR code with any UPI app (GPay, PhonePe, Paytm)</li>
                    <li>Enter amount: ₹8,500 for February 2025</li>
                    <li>Add note: Your name and room number (A-204)</li>
                    <li>Complete the payment and take a screenshot</li>
                    <li>Upload the screenshot below for verification</li>
                  </ol>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Upload Payment Screenshot</p>
                  <label className="block">
                    <div className={cn("border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors", uploadedFile ? "border-success bg-success/5" : "border-border hover:border-primary/50")}>
                      {uploadedFile ? (
                        <div className="flex items-center justify-center gap-2 text-success">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="text-sm font-medium">{uploadedFile} — Uploaded</span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <Upload className="w-6 h-6 mx-auto text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">Click to upload screenshot</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setUploadedFile(e.target.files?.[0]?.name || null)} />
                  </label>
                </div>
                {uploadedFile && (
                  <Button className="w-full gap-2">
                    <Upload className="w-4 h-4" /> Submit for Verification
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Payment history */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Payment History</h2>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input placeholder="Search..." className="bg-muted border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-ring w-36" />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {["ID", "Month", "Amount", "Due Date", "Paid On", "Status", "Receipt"].map((h) => (
                  <th key={h} className="text-left text-xs text-muted-foreground font-medium py-2 px-2 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAYMENTS.map((p) => (
                <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-2 text-xs text-muted-foreground font-mono">{p.id}</td>
                  <td className="py-3 px-2 font-medium whitespace-nowrap">{p.month}</td>
                  <td className="py-3 px-2 font-semibold text-primary">₹{p.amount.toLocaleString()}</td>
                  <td className="py-3 px-2 text-muted-foreground whitespace-nowrap">{p.due}</td>
                  <td className="py-3 px-2 text-muted-foreground whitespace-nowrap">{p.paid}</td>
                  <td className="py-3 px-2">
                    <Badge className={cn("text-xs", STATUS_STYLES[p.status as keyof typeof STATUS_STYLES])}>{p.status}</Badge>
                  </td>
                  <td className="py-3 px-2">
                    <button className="text-primary hover:underline text-xs flex items-center gap-1">
                      <Download className="w-3 h-3" />PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}
