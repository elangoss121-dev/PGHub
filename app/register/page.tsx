"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Building2, Eye, EyeOff, ArrowRight, Mail, Lock, User, Phone, GraduationCap, Briefcase, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AiSuggestInput } from "@/components/ai-suggest-input"
import { cn } from "@/lib/utils"

type Step = 1 | 2 | 3

export default function RegisterPage() {
  const [step, setStep] = useState<Step>(1)
  const [showPassword, setShowPassword] = useState(false)
  const [residentType, setResidentType] = useState<"student" | "professional">("student")
  const [college, setCollege] = useState("")
  const [company, setCompany] = useState("")

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-sidebar flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <Link href="/" className="flex items-center gap-2 relative z-10">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">PGHub</span>
        </Link>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4 text-balance">Join thousands of residents managing their PG life smarter</h2>
          <p className="text-sidebar-foreground/60 leading-relaxed mb-8">Register in minutes and get access to your digital PG dashboard after admin approval.</p>
          <div className="space-y-3">
            {[
              "Register and submit your details",
              "Admin reviews your application",
              "Get approved and access your dashboard",
              "Pay rent, track food, manage laundry",
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">{i + 1}</span>
                </div>
                <p className="text-sm text-sidebar-foreground/70">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-sidebar-foreground/40 relative z-10">© 2025 PGHub. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg py-8">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">PGHub</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Create your account</h1>
            <p className="text-muted-foreground text-sm">Fill in your details to register as a PG resident</p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {([1, 2, 3] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all",
                  step > s ? "bg-success text-white" : step === s ? "bg-primary text-white" : "bg-muted text-muted-foreground")}>
                  {step > s ? "✓" : s}
                </div>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {s === 1 ? "Account" : s === 2 ? "Personal" : "Profile"}
                </div>
                {i < 2 && <div className={cn("flex-1 h-0.5 rounded", step > s ? "bg-success" : "bg-border")} />}
              </div>
            ))}
          </div>

          {/* Step 1: Account */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input placeholder="Ramesh Kumar" className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" placeholder="ramesh@example.com" className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="tel" placeholder="+91 98765 43210" className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type={showPassword ? "text" : "password"} placeholder="Create a strong password"
                    className="w-full bg-background border border-border rounded-xl pl-9 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button className="w-full gap-2 mt-2" onClick={() => setStep(2)}>
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">or</span></div>
              </div>
              <Button variant="outline" className="w-full gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Sign up with Google
              </Button>
            </motion.div>
          )}

          {/* Step 2: Personal */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Room Number</label>
                  <input placeholder="A-204" className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Bed Number</label>
                  <input placeholder="Bed 1" className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Check-in Date</label>
                <input type="date" className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Emergency Contact Name</label>
                <input placeholder="Parent / Guardian name" className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Emergency Contact Phone</label>
                <input type="tel" placeholder="+91 98765 43210" className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="flex gap-3 mt-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1 gap-2" onClick={() => setStep(3)}>Continue <ArrowRight className="w-4 h-4" /></Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Profile */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Resident Type</label>
                <div className="flex gap-3">
                  {(["student", "professional"] as const).map((t) => (
                    <button key={t} onClick={() => setResidentType(t)}
                      className={cn("flex-1 flex items-center gap-2 p-3 rounded-xl border-2 transition-all text-sm font-medium",
                        residentType === t ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/40")}>
                      {t === "student" ? <GraduationCap className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                      <span className="capitalize">{t}</span>
                    </button>
                  ))}
                </div>
              </div>
              {residentType === "student" ? (
                <>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">College / University</label>
                    <AiSuggestInput type="college" value={college} onChange={setCollege} placeholder="Start typing, e.g. IIT B..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Course</label>
                      <input placeholder="B.Tech CSE" className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Academic Year</label>
                      <select className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring appearance-none">
                        {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((y) => <option key={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Company Name</label>
                    <AiSuggestInput type="company" value={company} onChange={setCompany} placeholder="Start typing, e.g. Infos..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Designation</label>
                      <input placeholder="Software Engineer" className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Office Location</label>
                      <input placeholder="Whitefield, Bangalore" className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                  </div>
                </>
              )}
              <div className="flex gap-3 mt-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
                <Link href="/pending-approval" className="flex-1">
                  <Button className="w-full gap-2">Register <ArrowRight className="w-4 h-4" /></Button>
                </Link>
              </div>
            </motion.div>
          )}

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
