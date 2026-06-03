"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Building2, Menu, X, ChevronRight, Star, Shield, Zap, Users, CreditCard,
  Utensils, Package, MessageSquare, Bell, BarChart3, CheckCircle2,
  ArrowRight, Quote, ChevronDown, Mail, Phone, MapPin, Github, Twitter, Linkedin
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Benefits", href: "#benefits" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
]

const FEATURES = [
  { icon: CreditCard, title: "Smart Rent Payments", desc: "QR-based payments, automated reminders, digital receipts, and complete payment history in one place.", color: "text-primary", bg: "bg-primary/10" },
  { icon: Utensils, title: "Food Management", desc: "Daily menus, meal attendance tracking, food polls, and resident feedback for a seamless dining experience.", color: "text-success", bg: "bg-success/10" },
  { icon: Package, title: "Laundry Tracking", desc: "End-to-end laundry status — from request to delivery — with real-time timeline notifications.", color: "text-warning", bg: "bg-warning/10" },
  { icon: MessageSquare, title: "Complaint System", desc: "Ticket-based support with priority levels, admin responses, and full resolution tracking.", color: "text-destructive", bg: "bg-destructive/10" },
  { icon: Bell, title: "Emergency Notices", desc: "Priority alerts for water, electricity, security, and medical situations with push notifications.", color: "text-primary", bg: "bg-primary/10" },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Occupancy rates, revenue trends, food analytics, and resident insights all in beautiful charts.", color: "text-success", bg: "bg-success/10" },
  { icon: Shield, title: "Role-Based Access", desc: "Granular permissions for Super Admin, Property Manager, Food Admin, and Fee Maintainer roles.", color: "text-warning", bg: "bg-warning/10" },
  { icon: Users, title: "Resident Profiles", desc: "Student and professional profiles with emergency contacts, room/bed allocation, and check-in history.", color: "text-destructive", bg: "bg-destructive/10" },
]

const PRICING = [
  {
    name: "Starter",
    price: "₹999",
    period: "/month",
    desc: "Perfect for small PGs with up to 20 residents",
    features: ["Up to 20 residents", "Rent management", "Food menu", "Basic complaints", "Email support"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Professional",
    price: "₹2,499",
    period: "/month",
    desc: "For growing PGs with full feature access",
    features: ["Up to 100 residents", "All Starter features", "QR payments", "Analytics dashboard", "Laundry tracking", "Priority support"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "₹5,999",
    period: "/month",
    desc: "For large PG chains with multiple properties",
    features: ["Unlimited residents", "All Professional features", "Multi-property support", "RBAC & Audit logs", "Custom integrations", "Dedicated manager"],
    cta: "Contact Sales",
    highlight: false,
  },
]

const TESTIMONIALS = [
  { name: "Ramesh Kumar", role: "PG Owner, Bangalore", content: "PGHub transformed how I manage my 80-resident PG. Rent collection used to take 2 weeks — now it&apos;s done in 2 days.", avatar: "RK", rating: 5 },
  { name: "Priya Sharma", role: "Resident, Mumbai", content: "The food voting feature is amazing! We actually get to eat what we like now. The laundry tracker saves me so much time.", avatar: "PS", rating: 5 },
  { name: "Ajay Mehta", role: "Property Manager, Pune", content: "The admin dashboard gives me a 360° view of everything. I can manage complaints, payments and notices from a single screen.", avatar: "AM", rating: 5 },
]

const FAQS = [
  { q: "How does the approval workflow work?", a: "After registration, new residents are placed in 'Pending Approval' status. Admin receives a notification and can review and approve/reject the request. Once approved, the resident gains full access." },
  { q: "Can residents pay rent via UPI?", a: "Yes! Admins upload a QR code and residents can pay via any UPI app, then upload a screenshot for verification. Admin approves and the status is automatically updated." },
  { q: "Is there a mobile app?", a: "PGHub is fully responsive and works perfectly on mobile browsers. A dedicated mobile app is on our roadmap for Q3 2025." },
  { q: "How secure is my data?", a: "We use industry-standard encryption, JWT-based authentication, role-based access control, and complete audit logs. Your data is stored securely on MongoDB Atlas." },
  { q: "Can I manage multiple PG properties?", a: "Yes, with our Enterprise plan you can manage multiple properties from a single dashboard with property-specific analytics and staff assignments." },
]

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">PGHub</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((l) => (
                <a key={l.label} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</a>
              ))}
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register Now <ChevronRight className="w-4 h-4 ml-1" /></Button>
              </Link>
            </div>
            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden bg-background border-b border-border px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => <a key={l.label} href={l.href} className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setMenuOpen(false)}>{l.label}</a>)}
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1"><Button variant="outline" size="sm" className="w-full">Login</Button></Link>
              <Link href="/register" className="flex-1"><Button size="sm" className="w-full">Register</Button></Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15">
              <Zap className="w-3 h-3 mr-1" /> Smart PG Management Made Simple
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6 leading-tight">
              Manage Your PG With{" "}
              <span className="text-primary">Intelligence</span>{" "}
              &amp;{" "}
              <span className="text-primary">Efficiency</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 text-pretty max-w-2xl mx-auto">
              PGHub is the all-in-one SaaS platform that modernizes Paying Guest management — from rent collection and food planning to laundry tracking and emergency notices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="gap-2 text-base px-8">
                  Register Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8">
                  Login to Dashboard
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" />14-day free trial</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" />No credit card required</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-success" />Cancel anytime</div>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-16 relative">
            <div className="bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
                <div className="flex-1 mx-4 bg-background rounded-md h-6 flex items-center px-3">
                  <span className="text-xs text-muted-foreground">app.pghub.in/dashboard</span>
                </div>
              </div>
              <div className="grid grid-cols-4 min-h-[360px]">
                <div className="bg-sidebar col-span-1 p-4 hidden sm:block">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-sidebar-foreground">PGHub</span>
                  </div>
                  {["Dashboard", "Payments", "Food", "Laundry", "Complaints", "Notices"].map((item, i) => (
                    <div key={item} className={cn("flex items-center gap-2 px-2 py-1.5 rounded-md mb-1 text-xs", i === 0 ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-foreground/60")}>
                      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="col-span-4 sm:col-span-3 p-5 bg-background">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {[
                      { label: "Rent Status", value: "Paid", color: "text-success" },
                      { label: "Room", value: "A-204", color: "text-primary" },
                      { label: "Complaints", value: "2 Open", color: "text-warning" },
                      { label: "Food Today", value: "Available", color: "text-success" },
                    ].map((s) => (
                      <div key={s.label} className="bg-card border border-border rounded-xl p-3">
                        <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                        <p className={cn("text-sm font-semibold", s.color)}>{s.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 bg-card border border-border rounded-xl p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Payment History</p>
                      <div className="space-y-1.5">
                        {["Jan 2025 — ₹8,500", "Dec 2024 — ₹8,500", "Nov 2024 — ₹8,500"].map((t) => (
                          <div key={t} className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">{t}</span>
                            <Badge className="text-[10px] bg-success/10 text-success border-success/20 h-4">Paid</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Quick Stats</p>
                      <div className="space-y-2">
                        <div><p className="text-xs text-muted-foreground">Meal Attendance</p><p className="text-sm font-semibold text-primary">87%</p></div>
                        <div><p className="text-xs text-muted-foreground">Laundry</p><p className="text-sm font-semibold text-success">Delivered</p></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Everything You Need to Run a Modern PG</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-pretty">A comprehensive suite of tools designed for PG owners, managers, and residents alike.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-card border border-border rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", f.bg)}>
                  <f.icon className={cn("w-5 h-5", f.color)} />
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Badge className="mb-3 bg-success/10 text-success border-success/20">Why PGHub?</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">Built for the Real Challenges of PG Management</h2>
              <div className="space-y-5">
                {[
                  { title: "Reduce Rent Collection Time by 80%", desc: "QR codes, automated reminders, and instant payment verification eliminate the manual chase." },
                  { title: "Zero Food Wastage", desc: "Meal attendance tracking and food polls help kitchens prepare exactly the right quantity." },
                  { title: "Happy Residents, Lower Turnover", desc: "Transparent communication, quick complaint resolution, and a modern app keeps residents satisfied." },
                  { title: "Complete Audit Trail", desc: "Every action is logged — payments, approvals, complaints — giving you full accountability." },
                ].map((b) => (
                  <div key={b.title} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5">{b.title}</p>
                      <p className="text-sm text-muted-foreground">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {[
                { value: "500+", label: "PGs using PGHub", color: "text-primary" },
                { value: "25K+", label: "Residents managed", color: "text-success" },
                { value: "₹12Cr+", label: "Rent collected", color: "text-warning" },
                { value: "99.9%", label: "Uptime SLA", color: "text-primary" },
              ].map((s) => (
                <div key={s.label} className="bg-card border border-border rounded-2xl p-6 text-center">
                  <p className={cn("text-3xl font-bold mb-1", s.color)}>{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">No hidden fees. Pick the plan that fits your PG size.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={cn("rounded-2xl p-6 flex flex-col", p.highlight ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105" : "bg-card border border-border")}>
                {p.highlight && <Badge className="w-fit mb-3 bg-white/20 text-white border-white/20 text-xs">Most Popular</Badge>}
                <h3 className={cn("text-xl font-bold mb-1", p.highlight ? "text-white" : "")}>{p.name}</h3>
                <p className={cn("text-sm mb-4", p.highlight ? "text-white/70" : "text-muted-foreground")}>{p.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold">{p.price}</span>
                  <span className={cn("text-sm", p.highlight ? "text-white/70" : "text-muted-foreground")}>{p.period}</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className={cn("w-4 h-4 flex-shrink-0", p.highlight ? "text-white/80" : "text-success")} />
                      <span className={p.highlight ? "text-white/90" : ""}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register">
                  <Button className={cn("w-full", p.highlight ? "bg-white text-primary hover:bg-white/90" : "")} variant={p.highlight ? "secondary" : "default"}>
                    {p.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <Badge className="mb-3 bg-warning/10 text-warning border-warning/20">Testimonials</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Loved by PG Owners and Residents</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6">
                <Quote className="w-8 h-8 text-primary/20 mb-3" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.content}</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, idx) => <Star key={idx} className="w-4 h-4 fill-warning text-warning" />)}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{t.avatar}</div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">FAQ</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Frequently Asked Questions</h2>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-card border border-border rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left gap-4">
                  <span className="font-medium text-sm">{faq.q}</span>
                  <ChevronDown className={cn("w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform", openFaq === i && "rotate-180")} />
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Contact</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Get in Touch</h2>
              <p className="text-muted-foreground mb-8">Have questions? Our team is here to help you get started with PGHub.</p>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "sivakumarelango10@gmail.com" },
                  { icon: Phone, label: "+91 6379883404" },
                  { icon: MapPin, label: "Bangalore, Karnataka, India" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-3 text-sm">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <c.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl p-6">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  toast.success("Message sent!", { description: "Our team will get back to you within 24 hours." })
                  e.currentTarget.reset()
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">First Name</label>
                    <input required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Ramesh" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Last Name</label>
                    <input required className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Kumar" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <input required type="email" className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="ramesh@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Message</label>
                  <textarea required rows={4} className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Tell us about your PG..." />
                </div>
                <Button type="submit" className="w-full">Send Message <ArrowRight className="w-4 h-4 ml-2" /></Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">Ready to Modernize Your PG?</h2>
            <p className="text-white/80 mb-8 text-lg">Join 500+ PG owners who trust PGHub for seamless management.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register"><Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8">Start Free Trial</Button></Link>
              <Link href="/login"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">Login</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">PGHub</span>
              </Link>
              <p className="text-xs text-muted-foreground leading-relaxed">Smart PG Management Made Simple. The all-in-one platform for modern PG operations.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Security", "Roadmap"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Support", links: ["Documentation", "API Reference", "Help Center", "Contact"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold mb-3">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((l) => <li key={l}><a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© 2025 PGHub. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Icon className="w-4 h-4" /></a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
