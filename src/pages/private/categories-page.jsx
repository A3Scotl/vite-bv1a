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
import { Package, Plus, MoreHorizontal, Edit, Trash2, EyeOff, Eye } from "lucide-react"
import { categoryApi } from "@/apis/category-api"
import LoadingPage from "@/pages/common/loading-page"
import { EditModal } from "@/components/common/edit-modal" 
import { handleFetch } from "@/utils/fetch-helper";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)
  const [formState, setFormState] = useState({
    name: "",
    slug: "",
    active: true,
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    handleFetch({
        apiCall: categoryApi.getAll,
        setData: setCategories,
        setLoading,
        errorMessage: "Failed to fetch categories",
      });
  }

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormState((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleOpenSheet = (category = null) => {
    setCurrentCategory(category)
    if (category) {
      setFormState({
        name: category.name,
        slug: category.slug,
        active: category.active,
      })
    } else {
      setFormState({
        name: "",
        slug: "",
        active: true,
      })
    }
    setIsSheetOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let response
    if (currentCategory) {
      response = await categoryApi.update(currentCategory.id, formState)
      console.log(formState);
    } else {
      response = await categoryApi.create(formState)
    }

    if (response.success) {
      toast.success(response.message)
      setIsSheetOpen(false)
      fetchCategories()
    } else {
      toast.error(response.message)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setLoading(true)
      const response = await categoryApi.delete(id)
      if (response.success) {
        toast.success(response.message)
        fetchCategories()
      } else {
        toast.error(response.message)
      }
      setLoading(false)
    }
  }

  const handleToggleActive = async (id) => {
    setLoading(true)
    const response = await categoryApi.hide(id)
    if (response.success) {
      toast.success(response.message)
      fetchCategories()
    } else {
      toast.error(response.message)
    }
    setLoading(false)
  }

  if (loading && !categories.length) return <LoadingPage />

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Quản lý danh mục
          </CardTitle>
          <Button onClick={() => handleOpenSheet()} size="sm">
            <Plus className="w-4 h-4 mr-2" /> Add New Category
          </Button>
        </CardHeader>
        <CardDescription className="px-6">
          Organize and manage different categories for articles, doctors, etc.
        </CardDescription>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.id}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.slug}</TableCell>
                    
                      <TableCell>
                        {category.active ? (
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
                            <DropdownMenuItem onClick={() => handleOpenSheet(category)}>
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleActive(category.id, category.active)}>
                              {category.active ? (
                                <>
                                  <EyeOff className="w-4 h-4 mr-2" /> Hide
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4 mr-2" /> Show
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(category.id)} className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No categories found.
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
        title={currentCategory ? "Edit Category" : "Add New Category"}
        description={
          currentCategory
            ? "Make changes to the category here. Click save when you're done."
            : "Add a new category. Click save when you're done."
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

export default CategoriesPage
