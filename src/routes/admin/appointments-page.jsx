import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Eye, XCircle } from "lucide-react"

export function AppointmentsPage() {
  // Mock data for appointments
  const appointments = [
    {
      id: "app-001",
      patientName: "Nguyễn Văn A",
      dateTime: "2024-07-15 09:00",
      department: "Khoa Tim mạch",
      status: "Confirmed",
    },
    {
      id: "app-002",
      patientName: "Trần Thị B",
      dateTime: "2024-07-15 10:30",
      department: "Khoa Nhi",
      status: "Pending",
    },
    {
      id: "app-003",
      patientName: "Lê Văn C",
      dateTime: "2024-07-16 14:00",
      department: "Khoa Da liễu",
      status: "Completed",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointments Management</CardTitle>
        <CardDescription>View and manage patient appointments.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input placeholder="Search patient name..." className="max-w-sm" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cardiology">Khoa Tim mạch</SelectItem>
              <SelectItem value="pediatrics">Khoa Nhi</SelectItem>
              <SelectItem value="dermatology">Khoa Da liễu</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          {/* Có thể thêm Date Picker cho bộ lọc theo ngày */}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.patientName}</TableCell>
                <TableCell>{appointment.dateTime}</TableCell>
                <TableCell>{appointment.department}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      appointment.status === "Confirmed"
                        ? "default"
                        : appointment.status === "Pending"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-1">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View Details</span>
                  </Button>
                  <Button variant="destructive" size="icon">
                    <XCircle className="h-4 w-4" />
                    <span className="sr-only">Cancel Appointment</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
