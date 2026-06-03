"use client"

import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  UtensilsCrossed,
  Home,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">View detailed statistics and generate reports</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="may2024">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="may2024">May 2024</SelectItem>
              <SelectItem value="apr2024">April 2024</SelectItem>
              <SelectItem value="mar2024">March 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Revenue",
            value: "Rs 4,68,000",
            change: "+12%",
            trend: "up",
            icon: DollarSign,
            color: "bg-emerald-500",
          },
          {
            title: "Occupancy Rate",
            value: "92%",
            change: "+5%",
            trend: "up",
            icon: Home,
            color: "bg-blue-500",
          },
          {
            title: "Total Residents",
            value: "156",
            change: "+8",
            trend: "up",
            icon: Users,
            color: "bg-primary",
          },
          {
            title: "Avg Food Rating",
            value: "4.3/5",
            change: "+0.2",
            trend: "up",
            icon: UtensilsCrossed,
            color: "bg-amber-500",
          },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === "up" ? (
                      <ArrowUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-destructive" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.trend === "up" ? "text-emerald-500" : "text-destructive"
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="financial" className="space-y-6">
        <TabsList>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="food">Food</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-6">
          {/* Revenue Breakdown */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Monthly collection status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="h-48 flex items-center justify-center rounded-lg bg-muted/50">
                  <BarChart3 className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-500">Rs 4.2L</p>
                    <p className="text-sm text-muted-foreground">Collected</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber-500">Rs 48K</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-destructive">Rs 12K</p>
                    <p className="text-sm text-muted-foreground">Overdue</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collection Trend</CardTitle>
                <CardDescription>Last 6 months performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "May 2024", collected: 420000, total: 480000 },
                    { month: "April 2024", collected: 465000, total: 475000 },
                    { month: "March 2024", collected: 450000, total: 470000 },
                    { month: "February 2024", collected: 440000, total: 460000 },
                    { month: "January 2024", collected: 455000, total: 455000 },
                  ].map((item) => (
                    <div key={item.month} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.month}</span>
                        <span className="font-medium">
                          {Math.round((item.collected / item.total) * 100)}%
                        </span>
                      </div>
                      <Progress value={(item.collected / item.total) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Defaulters */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Defaulters</CardTitle>
              <CardDescription>Residents with overdue payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Resident</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Room</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Outstanding</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Months Due</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { name: "Rohan Mehta", room: "302", amount: 17000, months: 2, status: "critical" },
                      { name: "Ankit Verma", room: "215", amount: 8500, months: 1, status: "warning" },
                      { name: "Neha Singh", room: "109", amount: 8500, months: 1, status: "warning" },
                    ].map((defaulter, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3 font-medium">{defaulter.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{defaulter.room}</td>
                        <td className="px-4 py-3 font-medium">Rs {defaulter.amount.toLocaleString()}</td>
                        <td className="px-4 py-3 text-muted-foreground">{defaulter.months}</td>
                        <td className="px-4 py-3">
                          <Badge variant={defaulter.status === "critical" ? "destructive" : "outline"}
                            className={defaulter.status === "warning" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : ""}>
                            {defaulter.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="occupancy" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Occupancy by Floor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { floor: "Floor 1", occupied: 48, total: 52 },
                  { floor: "Floor 2", occupied: 50, total: 52 },
                  { floor: "Floor 3", occupied: 46, total: 52 },
                ].map((floor) => (
                  <div key={floor.floor} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{floor.floor}</span>
                      <span className="font-medium">{floor.occupied}/{floor.total} beds</span>
                    </div>
                    <Progress value={(floor.occupied / floor.total) * 100} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Room Type Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-xl bg-muted/50 p-4">
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Single</p>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-4">
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-sm text-muted-foreground">Double</p>
                  </div>
                  <div className="rounded-xl bg-muted/50 p-4">
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-sm text-muted-foreground">Triple</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="food" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Meal Attendance Average</CardTitle>
                <CardDescription>This month&apos;s statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { meal: "Breakfast", attendance: 85 },
                  { meal: "Lunch", attendance: 92 },
                  { meal: "Snacks", attendance: 65 },
                  { meal: "Dinner", attendance: 88 },
                ].map((meal) => (
                  <div key={meal.meal} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{meal.meal}</span>
                      <span className="font-medium">{meal.attendance}%</span>
                    </div>
                    <Progress value={meal.attendance} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Food Ratings</CardTitle>
                <CardDescription>Average ratings by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Taste", rating: 4.3 },
                    { category: "Quality", rating: 4.1 },
                    { category: "Quantity", rating: 4.5 },
                    { category: "Hygiene", rating: 4.6 },
                  ].map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <span className="text-muted-foreground">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.rating}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={star <= Math.round(item.rating) ? "text-amber-500" : "text-muted"}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resident Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-blue-500/10 p-4 text-center">
                    <p className="text-3xl font-bold text-blue-500">98</p>
                    <p className="text-sm text-muted-foreground">Students</p>
                  </div>
                  <div className="rounded-xl bg-emerald-500/10 p-4 text-center">
                    <p className="text-3xl font-bold text-emerald-500">58</p>
                    <p className="text-sm text-muted-foreground">Professionals</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Registration Trend</CardTitle>
                <CardDescription>New registrations this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-foreground">24</p>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-500">18</p>
                    <p className="text-sm text-muted-foreground">Approved</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-amber-500">6</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
