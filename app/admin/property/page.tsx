"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Building,
  Bed,
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  ArrowUpDown,
  MoreHorizontal,
  Home,
  User,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

const rooms = [
  { number: "101", floor: 1, type: "Triple Sharing", beds: 3, occupied: 3, status: "full" },
  { number: "102", floor: 1, type: "Double Sharing", beds: 2, occupied: 2, status: "full" },
  { number: "103", floor: 1, type: "Triple Sharing", beds: 3, occupied: 2, status: "available" },
  { number: "104", floor: 1, type: "Single", beds: 1, occupied: 0, status: "maintenance" },
  { number: "201", floor: 2, type: "Triple Sharing", beds: 3, occupied: 3, status: "full" },
  { number: "202", floor: 2, type: "Double Sharing", beds: 2, occupied: 1, status: "available" },
  { number: "203", floor: 2, type: "Triple Sharing", beds: 3, occupied: 3, status: "full" },
  { number: "204", floor: 2, type: "Single", beds: 1, occupied: 1, status: "full" },
  { number: "301", floor: 3, type: "Triple Sharing", beds: 3, occupied: 2, status: "available" },
  { number: "302", floor: 3, type: "Double Sharing", beds: 2, occupied: 0, status: "available" },
  { number: "303", floor: 3, type: "Triple Sharing", beds: 3, occupied: 3, status: "full" },
  { number: "304", floor: 3, type: "Single", beds: 1, occupied: 1, status: "full" },
]

const floors = [
  { number: 1, totalRooms: 20, totalBeds: 52, occupiedBeds: 48 },
  { number: 2, totalRooms: 20, totalBeds: 52, occupiedBeds: 50 },
  { number: 3, totalRooms: 20, totalBeds: 52, occupiedBeds: 46 },
]

export default function PropertyPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [floorFilter, setFloorFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.number.includes(searchQuery)
    const matchesFloor = floorFilter === "all" || room.floor.toString() === floorFilter
    const matchesStatus = statusFilter === "all" || room.status === statusFilter
    return matchesSearch && matchesFloor && matchesStatus
  })

  const totalBeds = rooms.reduce((acc, room) => acc + room.beds, 0)
  const occupiedBeds = rooms.reduce((acc, room) => acc + room.occupied, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Property Management</h1>
          <p className="text-muted-foreground mt-1">Manage rooms, beds, and allocations</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Room</DialogTitle>
              <DialogDescription>Create a new room in the property</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input id="roomNumber" placeholder="e.g., 401" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="floor">Floor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select floor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Floor 1</SelectItem>
                    <SelectItem value="2">Floor 2</SelectItem>
                    <SelectItem value="3">Floor 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Room Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="double">Double Sharing</SelectItem>
                    <SelectItem value="triple">Triple Sharing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Room</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Building className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Rooms</p>
                <p className="text-2xl font-bold">{rooms.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Bed className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Beds</p>
                <p className="text-2xl font-bold">{totalBeds}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                <Users className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Occupied</p>
                <p className="text-2xl font-bold">{occupiedBeds}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Home className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold">{totalBeds - occupiedBeds}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floor Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Floor Overview</CardTitle>
          <CardDescription>Occupancy status by floor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            {floors.map((floor) => (
              <div key={floor.number} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-lg">Floor {floor.number}</h4>
                  <Badge variant="outline">{floor.totalRooms} rooms</Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Beds Occupied</span>
                    <span className="font-medium">{floor.occupiedBeds}/{floor.totalBeds}</span>
                  </div>
                  <Progress value={(floor.occupiedBeds / floor.totalBeds) * 100} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {Math.round((floor.occupiedBeds / floor.totalBeds) * 100)}% occupancy
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search room number..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={floorFilter} onValueChange={setFloorFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Floor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Floors</SelectItem>
                <SelectItem value="1">Floor 1</SelectItem>
                <SelectItem value="2">Floor 2</SelectItem>
                <SelectItem value="3">Floor 3</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="full">Full</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRooms.map((room, index) => (
          <motion.div
            key={room.number}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`relative overflow-hidden ${
              room.status === "maintenance" ? "border-amber-500/50" : ""
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Room {room.number}</h3>
                    <p className="text-sm text-muted-foreground">Floor {room.floor}</p>
                  </div>
                  <Badge
                    variant={
                      room.status === "available" ? "default" :
                      room.status === "full" ? "secondary" : "outline"
                    }
                    className={
                      room.status === "available" ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" :
                      room.status === "maintenance" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" : ""
                    }
                  >
                    {room.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{room.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: room.beds }).map((_, i) => (
                      <div
                        key={i}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                          i < room.occupied
                            ? "bg-primary/10 border-primary/30"
                            : "bg-muted/50 border-border"
                        }`}
                      >
                        <User className={`h-4 w-4 ${
                          i < room.occupied ? "text-primary" : "text-muted-foreground"
                        }`} />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {room.occupied}/{room.beds} beds occupied
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Users className="mr-1 h-3 w-3" />
                    Assign
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
