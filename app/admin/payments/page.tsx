"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  CreditCard,
  Search,
  Filter,
  Upload,
  Download,
  Check,
  X,
  Eye,
  QrCode,
  Clock,
  AlertCircle,
  CheckCircle,
  MoreHorizontal,
  FileText,
  Image as ImageIcon,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const pendingVerifications = [
  {
    id: 1,
    name: "Rahul Sharma",
    room: "201",
    amount: 8500,
    month: "May 2024",
    submittedAt: "2 hours ago",
    screenshot: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Priya Patel",
    room: "108",
    amount: 9000,
    month: "May 2024",
    submittedAt: "4 hours ago",
    screenshot: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Amit Kumar",
    room: "305",
    amount: 8500,
    month: "May 2024",
    submittedAt: "1 day ago",
    screenshot: "/placeholder.svg",
  },
]

const paymentHistory = [
  { id: 1, name: "Sneha Reddy", room: "204", amount: 9000, month: "May 2024", status: "paid", date: "May 1" },
  { id: 2, name: "Karthik R", room: "312", amount: 8500, month: "May 2024", status: "pending", dueDate: "May 10" },
  { id: 3, name: "Vikram Singh", room: "201", amount: 8500, month: "April 2024", status: "paid", date: "Apr 3" },
  { id: 4, name: "Ananya Gupta", room: "108", amount: 9000, month: "April 2024", status: "paid", date: "Apr 5" },
  { id: 5, name: "Rohan Mehta", room: "302", amount: 8000, month: "May 2024", status: "overdue", dueDate: "May 5" },
]

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const stats = {
    collected: 420000,
    pending: 48000,
    overdue: 12000,
    total: 480000,
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payment Management</h1>
          <p className="text-muted-foreground mt-1">Verify payments and manage rent collection</p>
        </div>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <QrCode className="mr-2 h-4 w-4" />
                Manage QR Code
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Payment QR Code</DialogTitle>
                <DialogDescription>Upload or update the payment QR code</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-8">
                  <QrCode className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">Current QR Code Active</p>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New QR
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Accepted formats: PNG, JPG, JPEG (max 5MB)
                </p>
              </div>
            </DialogContent>
          </Dialog>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Expected</p>
            <p className="text-2xl font-bold text-foreground">Rs {(stats.total / 1000).toFixed(0)}K</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-emerald-600">Collected</p>
            <p className="text-2xl font-bold text-emerald-600">Rs {(stats.collected / 1000).toFixed(0)}K</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-amber-600">Pending</p>
            <p className="text-2xl font-bold text-amber-600">Rs {(stats.pending / 1000).toFixed(0)}K</p>
          </CardContent>
        </Card>
        <Card className="bg-destructive/5 border-destructive/20">
          <CardContent className="p-4">
            <p className="text-sm text-destructive">Overdue</p>
            <p className="text-2xl font-bold text-destructive">Rs {(stats.overdue / 1000).toFixed(0)}K</p>
          </CardContent>
        </Card>
      </div>

      {/* Collection Progress */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">May 2024 Collection Progress</span>
            <span className="text-sm text-muted-foreground">
              {Math.round((stats.collected / stats.total) * 100)}% collected
            </span>
          </div>
          <Progress value={(stats.collected / stats.total) * 100} className="h-3" />
        </CardContent>
      </Card>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            Pending Verification
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-600">
              {pendingVerifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingVerifications.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingVerifications.map((payment, index) => (
                <motion.div
                  key={payment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {payment.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{payment.name}</p>
                            <p className="text-sm text-muted-foreground">Room {payment.room}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                          <Clock className="mr-1 h-3 w-3" />
                          Pending
                        </Badge>
                      </div>

                      <div className="rounded-lg bg-muted/50 p-3 mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Amount</span>
                          <span className="font-semibold">Rs {payment.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Month</span>
                          <span className="text-sm">{payment.month}</span>
                        </div>
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full mb-3">
                            <ImageIcon className="mr-2 h-4 w-4" />
                            View Screenshot
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Payment Screenshot</DialogTitle>
                            <DialogDescription>
                              Submitted by {payment.name} • {payment.submittedAt}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="rounded-lg bg-muted aspect-video flex items-center justify-center">
                            <ImageIcon className="h-16 w-16 text-muted-foreground" />
                          </div>
                          <DialogFooter className="gap-2 sm:gap-0">
                            <Button variant="outline" className="text-destructive">
                              <X className="mr-2 h-4 w-4" />
                              Reject
                            </Button>
                            <Button className="bg-emerald-500 hover:bg-emerald-600">
                              <Check className="mr-2 h-4 w-4" />
                              Approve Payment
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 text-destructive hover:bg-destructive/10">
                          <X className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                        <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600">
                          <Check className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium">All caught up!</h3>
                <p className="text-muted-foreground">No pending payment verifications</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or room..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Resident</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Room</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Month</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {payment.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-foreground">{payment.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">{payment.room}</td>
                        <td className="px-6 py-4 text-sm">{payment.month}</td>
                        <td className="px-6 py-4 text-sm font-medium">Rs {payment.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={payment.status === "paid" ? "default" : "outline"}
                            className={
                              payment.status === "paid"
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20"
                                : payment.status === "overdue"
                                ? "bg-destructive/10 text-destructive border-destructive/20"
                                : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                            }
                          >
                            {payment.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {payment.date || `Due: ${payment.dueDate}`}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Generate Receipt
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
