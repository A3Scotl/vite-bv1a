"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Building2, Plus, MoreHorizontal, Edit, Trash2, EyeOff, Eye, ImageIcon } from "lucide-react"
import { departmentApi } from "@/apis/department-api"
import LoadingPage from "@/pages/common/loading-page"
import { EditModal } from "@/components/common/edit-modal" 

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [currentDepartment, setCurrentDepartment] = useState(null) 
  const [formState, setFormState] = useState({
    name: "",
    slug: "",
    description: "",
    active: true,
    imageFile: null,
    imageUrl: "", 
  })

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    setLoading(true)
    const response = await departmentApi.getAll()
    if (response.success) {
      setDepartments(response.data)
    } else {
      toast.error("Failed to fetch departments: " + response.message)
    }
    setLoading(false)
  }

  const handleInputChange = (e) => {
    const { id, value, type, checked, files } = e.target
    setFormState((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : files ? files[0] : value,
    }))
  }

  const handleOpenSheet = (department = null) => {
    setCurrentDepartment(department)
    if (department) {
      setFormState({
        name: department.name,
        slug: department.slug,
        description: department.description,
        active: department.active,
        imageFile: null, // Reset file input for edit
        imageUrl: department.imageUrl || "", // Assuming department has an imageUrl field
      })
    } else {
      setFormState({
        name: "",
        slug: "",
        description: "",
        active: true,
        imageFile: null,
        imageUrl: "",
      })
    }
    setIsSheetOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append("name", formState.name)
    formData.append("slug", formState.slug)
    formData.append("description", formState.description)
    formData.append("active", formState.active)
    if (formState.imageFile) {
      formData.append("imageFile", formState.imageFile)
    }

    let response
    if (currentDepartment) {
      response = await departmentApi.update(currentDepartment.id, formData)
    } else {
      response = await departmentApi.create(formData)
    }

    if (response.success) {
      toast.success(response.message)
      setIsSheetOpen(false)
      fetchDepartments()
    } else {
      toast.error(response.message)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      setLoading(true)
      const response = await departmentApi.delete(id)
      if (response.success) {
        toast.success(response.message)
        fetchDepartments()
      } else {
        toast.error(response.message)
      }
      setLoading(false)
    }
  }

  const handleToggleActive = async (id, currentActive) => {
    setLoading(true)
    const response = await departmentApi.hide(id) // Assuming hide toggles active status
    if (response.success) {
      toast.success(response.message)
      fetchDepartments()
    } else {
      toast.error(response.message)
    }
    setLoading(false)
  }

  if (loading && !departments.length) return <LoadingPage />

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Quản lý phòng ban
          </CardTitle>
          <Button onClick={() => handleOpenSheet()} size="sm">
            <Plus className="w-4 h-4 mr-2" /> Add New Department
          </Button>
        </CardHeader>
        <CardDescription className="px-6">Manage hospital departments and their details.</CardDescription>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.length > 0 ? (
                  departments.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell className="font-medium">{department.id}</TableCell>
                      <TableCell>{department.name}</TableCell>
                      <TableCell>{department.slug}</TableCell>
                      <TableCell>{department.description}</TableCell>
                      <TableCell>
                        {department.imageUrl ? (
                          <img
                            src={department.imageUrl || "/placeholder.svg"}
                            alt={department.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell>
                        {department.active ? (
                          <span className="text-green-600">Active</span>
                        ) : (
                          <span className="text-red-600">Hidden</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenSheet(department)}>
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleActive(department.id, department.active)}>
                              {department.active ? (
                                <>
                                  <EyeOff className="w-4 h-4 mr-2" /> Hide
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4 mr-2" /> Show
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(department.id)} className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No departments found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <EditModal
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        title={currentDepartment ? "Edit Department" : "Add New Department"}
        description={
          currentDepartment
            ? "Make changes to the department here. Click save when you're done."
            : "Add a new department. Click save when you're done."
        }
      >
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={formState.name} onChange={handleInputChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={formState.slug} onChange={handleInputChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" value={formState.description} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="imageFile">Image</Label>
            <Input id="imageFile" type="file" onChange={handleInputChange} accept="image/*" />
            {formState.imageUrl && !formState.imageFile && (
              <img
                src={formState.imageUrl || "/placeholder.svg"}
                alt="Current Image"
                className="w-24 h-24 object-cover rounded-md mt-2"
              />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              checked={formState.active}
              onCheckedChange={(checked) => setFormState((prev) => ({ ...prev, active: checked }))}
            />
            <Label htmlFor="active">Active</Label>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </EditModal>
    </div>
  )
}

export default DepartmentsPage
