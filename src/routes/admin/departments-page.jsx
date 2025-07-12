import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Trash2, Eye, EyeOff } from "lucide-react"

export function DepartmentsPage() {
  // Mock data for departments
  const departments = [
    {
      id: "dep-001",
      name: "Khoa Tim mạch",
      slug: "khoa-tim-mach",
      description: "Chuyên khám và điều trị các bệnh về tim mạch.",
      category: "Nội khoa",
      isActive: true,
      createdAt: "2022-10-01",
    },
    {
      id: "dep-002",
      name: "Khoa Nhi",
      slug: "khoa-nhi",
      description: "Chăm sóc sức khỏe toàn diện cho trẻ em.",
      category: "Nhi khoa",
      isActive: true,
      createdAt: "2022-11-05",
    },
    {
      id: "dep-003",
      name: "Khoa Da liễu",
      slug: "khoa-da-lieu",
      description: "Điều trị các bệnh về da, tóc, móng.",
      category: "Ngoại khoa",
      isActive: false,
      createdAt: "2023-01-20",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex text-black flex-row items-center justify-between">
        <div>
          <CardTitle>Departments Management</CardTitle>
          <CardDescription>Manage hospital departments and their details.</CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Department
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4 text-black">
          <Input placeholder="Search departments..." className="max-w-sm" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="internal">Nội khoa</SelectItem>
              <SelectItem value="pediatrics">Nhi khoa</SelectItem>
              <SelectItem value="surgery">Ngoại khoa</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="hidden">Hidden</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell className="font-medium">{department.name}</TableCell>
                <TableCell>{department.slug}</TableCell>
                <TableCell className="max-w-[200px] truncate">{department.description}</TableCell>
                <TableCell>{department.category}</TableCell>
                <TableCell>
                  <Badge variant={department.isActive ? "default" : "secondary"}>
                    {department.isActive ? "Active" : "Hidden"}
                  </Badge>
                </TableCell>
                <TableCell>{department.createdAt}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-1">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="mr-1">
                    {department.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{department.isActive ? "Hide" : "Show"}</span>
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
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
