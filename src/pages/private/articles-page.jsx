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
import { FileText, Plus, MoreHorizontal, Edit, Trash2, EyeOff, Eye, ImageIcon } from "lucide-react"
import { articleApi } from "@/apis/article-api"
import LoadingPage from "@/pages/common/loading-page"
import { EditModal } from "@/components/common/edit-modal"
import ContentEditModal from "@/components/common/content-edit-modal"

const ArticlesPage = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [currentArticle, setCurrentArticle] = useState(null)
  const [formState, setFormState] = useState({
    title: "",
    slug: "",
    content: "",
    thumbnailFile: null,
    thumbnailUrl: "",
    active: true,
  })

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    setLoading(true)
    const response = await articleApi.getAll()
    if (response.success) {
      setArticles(response.data)
    } else {
      toast.error("Failed to fetch articles: " + response.message)
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

  const handleOpenSheet = (article = null) => {
    setCurrentArticle(article)
    if (article) {
      setFormState({
        title: article.title,
        slug: article.slug,
        content: article.content,
        thumbnailFile: null,
        thumbnailUrl: article.thumbnailUrl || "",
        active: article.active,
      })
    } else {
      setFormState({
        title: "",
        slug: "",
        content: "",
        thumbnailFile: null,
        thumbnailUrl: "",
        active: true,
      })
    }
    setIsSheetOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append("title", formState.title)
    formData.append("slug", formState.slug)
    formData.append("content", formState.content)
    formData.append("active", formState.active)
    if (formState.thumbnailFile) {
      formData.append("thumbnailFile", formState.thumbnailFile)
    }

    let response
    if (currentArticle) {
      response = await articleApi.update(currentArticle.id, formData)
    } else {
      response = await articleApi.create(formData)
    }

    if (response.success) {
      toast.success(response.message)
      setIsSheetOpen(false)
      fetchArticles()
    } else {
      toast.error(response.message)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      setLoading(true)
      const response = await articleApi.delete(id)
      if (response.success) {
        toast.success(response.message)
        fetchArticles()
      } else {
        toast.error(response.message)
      }
      setLoading(false)
    }
  }

  const handleToggleActive = async (id, currentActive) => {
    setLoading(true)
    const response = await articleApi.hide(id)
    if (response.success) {
      toast.success(response.message)
      fetchArticles()
    } else {
      toast.error(response.message)
    }
    setLoading(false)
  }

  const handleContentSave = (newContent) => {
    setFormState((prev) => ({ ...prev, content: newContent }))
  }

  if (loading && !articles.length) return <LoadingPage />

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Quản lý bài viết
          </CardTitle>
          <Button onClick={() => handleOpenSheet()} size="sm">
            <Plus className="w-4 h-4 mr-2" /> Add New Article
          </Button>
        </CardHeader>
        <CardDescription className="px-6">Create, edit, and publish articles for your website.</CardDescription>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Thumbnail</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.id}</TableCell>
                      <TableCell>{article.title}</TableCell>
                      <TableCell>{article.slug}</TableCell>
                      <TableCell>
                        {article.thumbnailUrl ? (
                          <img
                            src={article.thumbnailUrl || "/placeholder.svg"}
                            alt={article.title}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell>
                        {article.active ? (
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
                            <DropdownMenuItem onClick={() => handleOpenSheet(article)}>
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleActive(article.id, article.active)}>
                              {article.active ? (
                                <>
                                  <EyeOff className="w-4 h-4 mr-2" /> Hide
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4 mr-2" /> Show
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(article.id)} className="text-red-600">
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
                      No articles found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <EditModal
        className=""
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        title={currentArticle ? "Edit Article" : "Add New Article"}
        description={
          currentArticle
            ? "Make changes to the article here. Click save when you're done."
            : "Add a new article. Click save when you're done."
        }
      >
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={formState.title} onChange={handleInputChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={formState.slug} onChange={handleInputChange} required />
          </div>
          <div className="grid gap-2">
            <Label>Content</Label>
            <ContentEditModal content={formState.content} onSave={handleContentSave} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="thumbnailFile">Thumbnail Image</Label>
            <Input id="thumbnailFile" type="file" onChange={handleInputChange} accept="image/*" />
            {formState.thumbnailUrl && !formState.thumbnailFile && (
              <img
                src={formState.thumbnailUrl || "/placeholder.svg"}
                alt="Current Thumbnail"
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

export default ArticlesPage