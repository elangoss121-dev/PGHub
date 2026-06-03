"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  UtensilsCrossed,
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Clock,
  BarChart3,
  Vote,
  MessageSquare,
  Users,
  TrendingUp,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

const todayMenu = [
  {
    meal: "Breakfast",
    time: "7:00 AM - 9:00 AM",
    items: ["Poha", "Bread & Butter", "Boiled Eggs", "Tea/Coffee"],
    status: "completed",
    attendance: 142,
    rating: 4.2,
  },
  {
    meal: "Lunch",
    time: "12:30 PM - 2:30 PM",
    items: ["Rice", "Dal Fry", "Paneer Butter Masala", "Roti", "Salad"],
    status: "serving",
    attendance: 138,
    rating: 4.5,
  },
  {
    meal: "Snacks",
    time: "5:00 PM - 6:00 PM",
    items: ["Samosa", "Tea/Coffee"],
    status: "upcoming",
    attendance: 0,
    rating: null,
  },
  {
    meal: "Dinner",
    time: "8:00 PM - 10:00 PM",
    items: ["Jeera Rice", "Rajma", "Mixed Veg", "Roti", "Sweet"],
    status: "upcoming",
    attendance: 0,
    rating: null,
  },
]

const activePoll = {
  question: "What would you prefer for tomorrow's dinner?",
  options: [
    { name: "Biryani", votes: 67 },
    { name: "Chapati & Curry", votes: 45 },
    { name: "Fried Rice", votes: 32 },
  ],
  deadline: "Today, 6:00 PM",
  totalVotes: 144,
}

const recentFeedback = [
  { user: "Rahul S.", meal: "Lunch", rating: 5, comment: "Paneer was excellent!", time: "1 hour ago" },
  { user: "Priya P.", meal: "Lunch", rating: 4, comment: "Good food, could use more variety", time: "2 hours ago" },
  { user: "Amit K.", meal: "Breakfast", rating: 3, comment: "Poha was cold", time: "5 hours ago" },
]

export default function FoodManagementPage() {
  const [foodAvailable, setFoodAvailable] = useState(true)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Food Management</h1>
          <p className="text-muted-foreground mt-1">Manage menus, polls, and food attendance</p>
        </div>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Vote className="mr-2 h-4 w-4" />
                Create Poll
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Food Poll</DialogTitle>
                <DialogDescription>Let residents vote on tomorrow&apos;s menu</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Question</Label>
                  <Input placeholder="What would you prefer for dinner?" />
                </div>
                <div className="grid gap-2">
                  <Label>Options</Label>
                  <Input placeholder="Option 1" />
                  <Input placeholder="Option 2" />
                  <Input placeholder="Option 3" />
                  <Button variant="outline" size="sm" className="w-fit">
                    <Plus className="mr-1 h-3 w-3" /> Add Option
                  </Button>
                </div>
                <div className="grid gap-2">
                  <Label>Voting Deadline</Label>
                  <Input type="datetime-local" />
                </div>
              </div>
              <DialogFooter>
                <Button>Create Poll</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Update Menu
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Update Today&apos;s Menu</DialogTitle>
                <DialogDescription>Edit meals and upload food images</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {["Breakfast", "Lunch", "Snacks", "Dinner"].map((meal) => (
                  <div key={meal} className="grid gap-2">
                    <Label>{meal}</Label>
                    <div className="flex gap-2">
                      <Textarea placeholder="Enter food items..." className="flex-1" />
                      <Button variant="outline" size="icon">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button>Save Menu</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Food Availability Toggle */}
      <Card className={foodAvailable ? "border-emerald-500/30 bg-emerald-500/5" : "border-destructive/30 bg-destructive/5"}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                foodAvailable ? "bg-emerald-500" : "bg-destructive"
              }`}>
                <UtensilsCrossed className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Food Availability</h3>
                <p className={`text-sm ${foodAvailable ? "text-emerald-600" : "text-destructive"}`}>
                  {foodAvailable ? "Food is currently available" : "Food is currently unavailable"}
                </p>
              </div>
            </div>
            <Switch checked={foodAvailable} onCheckedChange={setFoodAvailable} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="menu" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="menu">Today&apos;s Menu</TabsTrigger>
          <TabsTrigger value="polls">Polls</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {todayMenu.map((meal, index) => (
              <motion.div
                key={meal.meal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`overflow-hidden ${
                  meal.status === "serving" ? "border-emerald-500/50 ring-2 ring-emerald-500/20" : ""
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {meal.meal}
                        {meal.status === "serving" && (
                          <Badge className="bg-emerald-500">Serving Now</Badge>
                        )}
                      </CardTitle>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {meal.time}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {meal.items.map((item) => (
                          <Badge key={item} variant="outline" className="bg-background">
                            {item}
                          </Badge>
                        ))}
                      </div>
                      {meal.status === "completed" && (
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{meal.attendance} attended</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-amber-500">★</span>
                            <span className="text-sm font-medium">{meal.rating}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="polls" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Poll</CardTitle>
                  <CardDescription>Voting ends: {activePoll.deadline}</CardDescription>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {activePoll.totalVotes} votes
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium text-lg mb-4">{activePoll.question}</h3>
              <div className="space-y-4">
                {activePoll.options.map((option) => {
                  const percentage = Math.round((option.votes / activePoll.totalVotes) * 100)
                  return (
                    <div key={option.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{option.name}</span>
                        <span className="text-muted-foreground">{option.votes} votes ({percentage}%)</span>
                      </div>
                      <Progress value={percentage} className="h-3" />
                    </div>
                  )
                })}
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1">Close Poll</Button>
                <Button variant="outline" className="flex-1">View Details</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {todayMenu.map((meal) => (
              <Card key={meal.meal}>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground">{meal.meal}</h4>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Expected</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Attended</span>
                      <span className="font-medium">{meal.attendance || "-"}</span>
                    </div>
                    <Progress value={meal.attendance ? (meal.attendance / 156) * 100 : 0} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Trend</CardTitle>
              <CardDescription>Meal consumption analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <BarChart3 className="h-8 w-8 mr-2" />
                Chart visualization would go here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-amber-500">4.3</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
                <div className="flex justify-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={star <= 4 ? "text-amber-500" : "text-muted"}>★</span>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-foreground">89</p>
                <p className="text-sm text-muted-foreground">Total Reviews Today</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-emerald-500">+0.2</p>
                <p className="text-sm text-muted-foreground">vs Last Week</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFeedback.map((feedback, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{feedback.user}</span>
                        <Badge variant="outline" className="text-xs">{feedback.meal}</Badge>
                        <span className="text-xs text-muted-foreground">{feedback.time}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className={star <= feedback.rating ? "text-amber-500" : "text-muted"}>★</span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
