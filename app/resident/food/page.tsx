"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, ThumbsUp, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const MEAL_CARDS = [
  { label: "Breakfast", time: "7:30 – 9:30 AM", items: ["Idli Sambar", "Coconut Chutney", "Filter Coffee"], available: true, color: "text-warning", bg: "bg-warning/10" },
  { label: "Lunch", time: "12:30 – 2:30 PM", items: ["Rice", "Dal Tadka", "Rajma", "Papad", "Salad"], available: true, color: "text-success", bg: "bg-success/10" },
  { label: "Snacks", time: "5:00 – 6:00 PM", items: ["Samosa (2 pcs)", "Chai"], available: false, color: "text-destructive", bg: "bg-destructive/10" },
  { label: "Dinner", time: "8:00 – 10:00 PM", items: ["Chapati (4)", "Paneer Butter Masala", "Rice", "Curd"], available: true, color: "text-primary", bg: "bg-primary/10" },
]

const WEEKLY_MENU = [
  { day: "Mon", breakfast: "Poha + Chai", lunch: "Rice + Dal + Aloo Gobi", dinner: "Chapati + Chicken Curry" },
  { day: "Tue", breakfast: "Idli + Sambar", lunch: "Rice + Rajma + Salad", dinner: "Chapati + Paneer" },
  { day: "Wed", breakfast: "Paratha + Curd", lunch: "Rice + Chole", dinner: "Biryani + Raita" },
  { day: "Thu", breakfast: "Upma + Coffee", lunch: "Rice + Dal Makhani", dinner: "Chapati + Kadai Veg" },
  { day: "Fri", breakfast: "Poori + Sabji", lunch: "Rice + Fish Curry", dinner: "Noodles + Spring Roll" },
  { day: "Sat", breakfast: "Bread + Omelette", lunch: "Pulao + Raita", dinner: "Special Biryani" },
  { day: "Sun", breakfast: "Puri Bhaji", lunch: "Rice + Mixed Dal + Papad", dinner: "Chapati + Mutton" },
]

const POLL_OPTIONS = ["Biryani", "Fried Rice", "Chapati & Dal", "Noodles"]

export default function FoodPage() {
  const [feedbackRatings, setFeedbackRatings] = useState({ taste: 0, quantity: 0, quality: 0, hygiene: 0 })
  const [voted, setVoted] = useState<number | null>(null)
  const [votes] = useState([42, 28, 18, 12])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Food Management</h1>
        <p className="text-sm text-muted-foreground">Today&apos;s menu, weekly schedule, and food feedback</p>
      </div>

      {/* Today's menu */}
      <div>
        <h2 className="font-semibold text-sm mb-3">Today&apos;s Menu — Thursday, Jan 23</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MEAL_CARDS.map((meal, i) => (
            <motion.div key={meal.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={cn("px-2.5 py-1 rounded-lg text-xs font-semibold", meal.bg, meal.color)}>{meal.label}</div>
                <Badge className={meal.available ? "bg-success/10 text-success border-success/20 text-xs" : "bg-destructive/10 text-destructive border-destructive/20 text-xs"}>
                  {meal.available ? "Available" : "Finished"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{meal.time}</p>
              <ul className="space-y-1">
                {meal.items.map((item) => (
                  <li key={item} className="text-xs flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-muted-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Weekly menu */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-semibold text-sm mb-4">Weekly Menu</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  {["Day", "Breakfast", "Lunch", "Dinner"].map((h) => (
                    <th key={h} className="text-left text-muted-foreground font-medium py-2 pr-3 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {WEEKLY_MENU.map((day, i) => (
                  <tr key={day.day} className={cn("border-b border-border/50", i === 3 && "bg-primary/5")}>
                    <td className={cn("py-2 pr-3 font-semibold whitespace-nowrap", i === 3 ? "text-primary" : "")}>
                      {day.day} {i === 3 && <span className="text-primary text-[10px] ml-1">Today</span>}
                    </td>
                    <td className="py-2 pr-3 text-muted-foreground">{day.breakfast}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{day.lunch}</td>
                    <td className="py-2 pr-3 text-muted-foreground">{day.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Food poll */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-sm">Food Poll</h2>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Active</Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-4">What would you like for tomorrow&apos;s dinner? Ends in 4 hours</p>
          <div className="space-y-2 mb-4">
            {POLL_OPTIONS.map((opt, i) => {
              const total = votes.reduce((a, b) => a + b, 0)
              const pct = Math.round((votes[i] / total) * 100)
              const isVoted = voted === i
              return (
                <button key={opt} onClick={() => setVoted(i)} className={cn("w-full text-left rounded-xl border-2 p-3 transition-all relative overflow-hidden", isVoted ? "border-primary" : "border-border hover:border-primary/40")}>
                  <div className="absolute left-0 top-0 bottom-0 rounded-xl transition-all" style={{ width: `${pct}%`, background: isVoted ? "var(--color-primary)" : "var(--color-muted)", opacity: 0.15 }} />
                  <div className="relative flex items-center justify-between">
                    <span className={cn("text-sm font-medium", isVoted && "text-primary")}>{opt}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{votes[i]} votes</span>
                      <span className={cn("text-xs font-bold", isVoted ? "text-primary" : "text-muted-foreground")}>{pct}%</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
          {voted !== null && <p className="text-xs text-success text-center">Your vote has been recorded!</p>}
        </motion.div>
      </div>

      {/* Food feedback */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-2xl p-5">
        <h2 className="font-semibold text-sm mb-4">Rate Today&apos;s Food</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {(["taste", "quantity", "quality", "hygiene"] as const).map((cat) => (
            <div key={cat}>
              <p className="text-xs text-muted-foreground mb-2 capitalize">{cat}</p>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setFeedbackRatings(r => ({ ...r, [cat]: star }))}>
                    <Star className={cn("w-5 h-5 transition-colors", star <= feedbackRatings[cat] ? "fill-warning text-warning" : "text-muted fill-muted")} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <textarea rows={3} placeholder="Additional feedback or suggestions..." className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none mb-3" />
        <Button size="sm" className="gap-2"><MessageSquare className="w-4 h-4" />Submit Feedback</Button>
      </motion.div>
    </div>
  )
}
