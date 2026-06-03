"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Building2, Clock, CheckCircle2, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md text-center">
        <Link href="/" className="flex items-center gap-2 justify-center mb-10">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">PGHub</span>
        </Link>

        <div className="bg-card border border-border rounded-2xl p-8">
          <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <Clock className="w-8 h-8 text-warning" />
          </div>
          <Badge className="mb-4 bg-warning/10 text-warning border-warning/20">Pending Approval</Badge>
          <h1 className="text-2xl font-bold mb-3">Your account is awaiting administrator approval.</h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            Thank you for registering with PGHub. Your application has been submitted and is currently under review by the PG administrator. You will receive an email notification once your account is approved.
          </p>
          <div className="bg-muted/50 rounded-xl p-4 text-left mb-6 space-y-2">
            {[
              { icon: CheckCircle2, text: "Registration submitted successfully", color: "text-success" },
              { icon: Clock, text: "Admin review in progress (1-2 business days)", color: "text-warning" },
              { icon: Mail, text: "Email confirmation will be sent on approval", color: "text-muted-foreground" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <item.icon className={`w-4 h-4 flex-shrink-0 ${item.color}`} />
                <span className="text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Need help? Contact your PG administrator</p>
            <div className="flex items-center justify-center gap-1 text-xs text-primary">
              <Phone className="w-3 h-3" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>

        <Link href="/" className="block mt-6">
          <Button variant="ghost" className="text-muted-foreground">Back to Home</Button>
        </Link>
      </motion.div>
    </div>
  )
}
