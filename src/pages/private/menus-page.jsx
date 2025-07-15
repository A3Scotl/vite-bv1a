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
import { Menu, Plus, MoreHorizontal, Edit, Trash2, EyeOff, Eye } from "lucide-react"
import { menuApi } from "@/apis/menu-api"
import LoadingPage from "@/pages/common/loading-page"
import { EditModal } from "@/components/common/edit-modal" 
import { handleFetch } from "../../utils/fetch-helper"

const MenusPage = () => {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [currentMenu, setCurrentMenu] = useState(null) // For editing
  const [formState, setFormState] = useState({
    title: "",
    url: "",
    orderIndex: 0,
    active: true,
    parentId: null,
  })

  useEffect(() => {
    fetchMenus()
  }, [])

  const fetchMenus = async () => {
    handleFetch({
      apiCall:menuApi.getAll,
      setData:setMenus,
      setLoading,
      errorMessage: "Failed to fetch department",
    })
  }

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target
    setFormState((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }))
  }

  const handleOpenSheet = (menu = null) => {
    setCurrentMenu(menu)
    if (menu) {
      setFormState({
        title: menu.title,
        url: menu.url,
        orderIndex: menu.orderIndex,
        active: menu.active,
        parentId: menu.parentId || null,
      })
    } else {
      setFormState({
        title: "",
        url: "",
        orderIndex: 0,
        active: true,
        parentId: null,
      })
    }
    setIsSheetOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let response
    if (currentMenu) {
      response = await menuApi.update(currentMenu.id, formState)
    } else {
      response = await menuApi.create(formState)
    }

    if (response.success) {
      toast.success(response.message)
      setIsSheetOpen(false)
      fetchMenus()
    } else {
      toast.error(response.message)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      setLoading(true)
      const response = await menuApi.delete(id)
      if (response.success) {
        toast.success(response.message)
        fetchMenus()
      } else {
        toast.error(response.message)
      }
      setLoading(false)
    }
  }

  const handleToggleActive = async (id, currentActive) => {
    setLoading(true)
    const response = await menuApi.hide(id) // Assuming hide toggles active status
    if (response.success) {
      toast.success(response.message)
      fetchMenus()
    } else {
      toast.error(response.message)
    }
    setLoading(false)
  }

  if (loading && !menus.length) return <LoadingPage />

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <Menu className="w-5 h-5 text-primary" />
            Quản lý Menu
          </CardTitle>
          <Button onClick={() => handleOpenSheet()} size="sm">
            <Plus className="w-4 h-4 mr-2" /> Add New Menu
          </Button>
        </CardHeader>
        <CardDescription className="px-6">
          Create, edit, and manage the navigation menus of your website.
        </CardDescription>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>OrderIndex</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menus.length > 0 ? (
                  menus.map((menu) => (
                    <TableRow key={menu.id}>
                      <TableCell className="font-medium">{menu.id}</TableCell>
                      <TableCell>{menu.title}</TableCell>
                      <TableCell>{menu.url}</TableCell>
                      <TableCell>{menu.orderIndex}</TableCell>
                      <TableCell>
                        {menu.active ? (
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
                            <DropdownMenuItem onClick={() => handleOpenSheet(menu)}>
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleActive(menu.id, menu.active)}>
                              {menu.active ? (
                                <>
                                  <EyeOff className="w-4 h-4 mr-2" /> Hide
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4 mr-2" /> Show
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(menu.id)} className="text-red-600">
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
                      No menus found.
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
        title={currentMenu ? "Edit Menu" : "Add New Menu"}
        description={
          currentMenu
            ? "Make changes to the menu here. Click save when you're done."
            : "Add a new menu to your website. Click save when you're done."
        }
      >
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={formState.title} onChange={handleInputChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" value={formState.url} onChange={handleInputChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="orderIndex">OrderIndex</Label>
            <Input id="orderIndex" type="number" value={formState.orderIndex} onChange={handleInputChange} required />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              checked={formState.active}
              onCheckedChange={(checked) => setFormState((prev) => ({ ...prev, active: checked }))}
            />
            <Label htmlFor="active">Active</Label>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="parentId">Parent Menu (Optional)</Label>
            <Input
              id="parentId"
              type="number"
              value={formState.parentId || ""}
              onChange={handleInputChange}
              placeholder="Enter parent menu ID"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </EditModal>
    </div>
  )
}

export default MenusPage
