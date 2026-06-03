"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Check,
  X,
  Eye,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Calendar,
  FileText,
  User,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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

const registrations = [
  {
    id: 1,
    name: "Vikram Singh",
    email: "vikram@email.com",
    phone: "+91 98765 43215",
    type: "Student",
    college: "IIT Delhi",
    course: "B.Tech Computer Science",
    year: "3rd Year",
    emergencyContact: "+91 98765 00001",
    registeredAt: "2 hours ago",
    documents: ["ID Proof", "College ID"],
  },
  {
    id: 2,
    name: "Ananya Gupta",
    email: "ananya@email.com",
    phone: "+91 98765 43216",
    type: "Professional",
    company: "TCS",
    designation: "Software Engineer",
    officeLocation: "Noida",
    emergencyContact: "+91 98765 00002",
    registeredAt: "5 hours ago",
    documents: ["ID Proof", "Company ID"],
  },
  {
    id: 3,
    name: "Rohan Mehta",
    email: "rohan@email.com",
    phone: "+91 98765 43217",
    type: "Student",
    college: "Delhi University",
    course: "MBA",
    year: "2nd Year",
    emergencyContact: "+91 98765 00003",
    registeredAt: "1 day ago",
    documents: ["ID Proof", "College ID"],
  },
  {
    id: 4,
    name: "Divya Krishnan",
    email: "divya@email.com",
    phone: "+91 98765 43218",
    type: "Professional",
    company: "Infosys",
    designation: "Business Analyst",
    officeLocation: "Gurgaon",
    emergencyContact: "+91 98765 00004",
    registeredAt: "1 day ago",
    documents: ["ID Proof", "Company ID"],
  },
]

export default function RegistrationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<typeof registrations[0] | null>(null)
  const [rejectReason, setRejectReason] = useState("")

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || reg.type.toLowerCase() === typeFilter.toLowerCase()
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Registrations</h1>
        <p className="text-muted-foreground mt-1">Review and approve new user registrations</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-amber-600">Pending Approval</p>
            <p className="text-3xl font-bold text-amber-600">{registrations.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Approved Today</p>
            <p className="text-3xl font-bold text-emerald-500">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Rejected Today</p>
            <p className="text-3xl font-bold text-destructive">2</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Registration Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredRegistrations.map((reg, index) => (
          <motion.div
            key={reg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                          {reg.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{reg.name}</h3>
                        <Badge variant="outline" className="mt-1">
                          {reg.type === "Student" ? (
                            <><GraduationCap className="mr-1 h-3 w-3" /> Student</>
                          ) : (
                            <><Briefcase className="mr-1 h-3 w-3" /> Professional</>
                          )}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-amber-500/10 text-amber-600">
                      Pending
                    </Badge>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {reg.email}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {reg.phone}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Registered {reg.registeredAt}
                    </div>
                  </div>

                  {reg.type === "Student" ? (
                    <div className="mt-4 rounded-lg bg-muted/50 p-3">
                      <p className="text-sm font-medium text-foreground">{reg.college}</p>
                      <p className="text-sm text-muted-foreground">{reg.course} • {reg.year}</p>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-lg bg-muted/50 p-3">
                      <p className="text-sm font-medium text-foreground">{reg.company}</p>
                      <p className="text-sm text-muted-foreground">{reg.designation} • {reg.officeLocation}</p>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    {reg.documents.map((doc) => (
                      <Badge key={doc} variant="outline" className="bg-background">
                        <FileText className="mr-1 h-3 w-3" />
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex border-t border-border">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex-1 rounded-none border-r border-border h-12"
                        onClick={() => setSelectedUser(reg)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Registration Details</DialogTitle>
                        <DialogDescription>Review complete information before approval</DialogDescription>
                      </DialogHeader>
                      {selectedUser && (
                        <div className="space-y-6">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarFallback className="bg-primary/10 text-primary text-xl">
                                {selectedUser.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                              <p className="text-muted-foreground">{selectedUser.email}</p>
                            </div>
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Phone</Label>
                              <p className="font-medium">{selectedUser.phone}</p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Emergency Contact</Label>
                              <p className="font-medium">{selectedUser.emergencyContact}</p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Type</Label>
                              <p className="font-medium">{selectedUser.type}</p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-muted-foreground">Registered</Label>
                              <p className="font-medium">{selectedUser.registeredAt}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" className="text-destructive">
                          <X className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                        <Button className="bg-emerald-500 hover:bg-emerald-600">
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    className="flex-1 rounded-none text-destructive hover:text-destructive hover:bg-destructive/10 h-12"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 rounded-none text-emerald-600 hover:text-emerald-600 hover:bg-emerald-500/10 h-12"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
