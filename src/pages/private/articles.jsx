"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  ImageIcon,
} from "lucide-react";
import { articleApi } from "@/apis/article-api";
import LoadingPage from "@/pages/common/loading-page";
import ContentEditModal from "@/components/common/content-edit-modal";
import { EditModal } from "@/components/common/edit-modal";
import { handleFetch } from "@/utils/fetch-helper";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [articleTypesLoading, setArticleTypesLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [articleTypes, setArticleTypes] = useState([]);
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    thumbnailFile: null,
    thumbnailUrl: "",
    status: "DRAFT",
    publishedAt: "",
    type: "",
  });

  useEffect(() => {
    fetchArticles();
    fetchArticleTypes();
  }, []);

  const fetchArticles = async () => {
    await handleFetch({
      apiCall: articleApi.getAll,
      setData: setArticles,
      setLoading,
      errorMessage: "Failed to fetch articles",
    });
  };

  const fetchArticleTypes = async () => {
    await handleFetch({
      apiCall: articleApi.getArticleTypes,
      setData: (data) => {
        const transformedData = Array.isArray(data)
          ? data.map((type, index) => ({
              id: type,
              name: type
                .replace("_", " ")
                .toLowerCase()
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            }))
          : [];
        setArticleTypes(transformedData);
      },
      setLoading: setArticleTypesLoading,
      errorMessage: "Failed to fetch article types",
    });
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked, files } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSelectType = (value) => {
    setFormState((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleOpenSheet = (article = null) => {
    setCurrentArticle(article);
    if (article) {
      setFormState({
        title: article.title,
        content: article.content,
        thumbnailFile: null,
        thumbnailUrl: article.thumbnailUrl || "",
        status: article.status || "DRAFT",
        publishedAt: article.publishedAt || "",
        type: article.type || "",
      });
    } else {
      setFormState({
        title: "",
        content: "",
        thumbnailFile: null,
        thumbnailUrl: "",
        status: "DRAFT",
        publishedAt: "",
        type: "",
      });
    }
    setIsSheetOpen(true);
    console.log(article);
  };

  const handleStatusToggle = () => {
    setFormState((prev) => ({
      ...prev,
      status: prev.status === "DRAFT" ? "PUBLISHED" : "DRAFT",
      publishedAt: prev.status === "DRAFT" ? new Date().toISOString() : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    formData.append("title", formState.title);
    formData.append("content", formState.content);
    formData.append("status", formState.status);
    formData.append("publishedAt", formState.publishedAt);
    formData.append("type", formState.type);
    if (formState.thumbnailFile) {
      formData.append("thumbnail", formState.thumbnailFile);
    }
    const response = currentArticle
      ? await articleApi.update(currentArticle.id, formData)
      : await articleApi.create(formData);
    if (response.success) {
      toast.success(response.message);
      setIsSheetOpen(false);
      await fetchArticles();
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      setLoading(true);
      const response = await articleApi.delete(id);
      if (response.success) {
        toast.success(response.message);
        await fetchArticles();
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    }
  };

  const handleContentSave = (newContent) => {
    setFormState((prev) => ({ ...prev, content: newContent }));
    setIsContentModalOpen(false);
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Quản lý bài viết
          </CardTitle>
          <Button onClick={() => handleOpenSheet()} size="sm">
            <Plus className="w-4 h-4 mr-2" /> Add New Article
          </Button>
        </CardHeader>
        <CardDescription className="px-6">
          Create, edit, and publish articles for your website.
        </CardDescription>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Thumbnail</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.length > 0 ? (
                  articles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">
                        {article.id}
                      </TableCell>
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
                        {article.status == "DRAFT" ? (
                          <span className="text-red-600">DRAFT</span>
                        ) : (
                          <span className="text-green-600">PUBLISHED</span>
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
                            <DropdownMenuItem
                              onClick={() => handleOpenSheet(article)}
                            >
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(article.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key="no-articles">
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
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        title={currentArticle ? "Edit Article" : "Add New Article"}
        description={
          currentArticle
            ? "Make changes to the article here. Click save when you're done."
            : "Add a new article. Click save when you're done."
        }
      >
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formState.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label>Content</Label>
            <Button
              type="button"
              variant="outline"
              className="w-full mb-2 flex items-center gap-2 bg-transparent"
              onClick={() => setIsContentModalOpen(true)}
            >
              <FileText className="w-4 h-4" />
              Edit Content
            </Button>
            <ContentEditModal
              content={formState.content}
              onSave={handleContentSave}
              isOpen={isContentModalOpen}
              onClose={() => setIsContentModalOpen(false)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="articleType">Article Type</Label>
            {articleTypesLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select
                id="articleType"
                value={formState.type}
                onValueChange={handleSelectType}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  {articleTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="thumbnailFile">Thumbnail Image</Label>
            <Input
              id="thumbnailFile"
              type="file"
              onChange={handleInputChange}
              accept="image/*"
            />
            {formState.thumbnailUrl && !formState.thumbnailFile && (
              <img
                src={formState.thumbnailUrl || "/placeholder.svg"}
                alt="Current Thumbnail"
                className="w-24 h-24 object-cover rounded-md mt-2"
              />
            )}
          </div>

          {currentArticle && (
            <div className="grid gap-2">
              <Label>Status</Label>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    formState.status === "PUBLISHED"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {formState.status}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleStatusToggle}
                  className="ml-2 bg-transparent"
                >
                  {formState.status === "DRAFT" ? "Publish" : "Set as Draft"}
                </Button>
                {formState.status === "PUBLISHED" && (
                  <span className="text-xs text-gray-500 ml-4">
                    Published at:{" "}
                    {formState.publishedAt
                      ? new Date(formState.publishedAt).toLocaleString()
                      : ""}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSheetOpen(false)}
              className="bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </EditModal>
    </div>
  );
};

export default Articles;
