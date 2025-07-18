"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import { articleApi } from "@/apis/article-api"
import { handleFetch } from "@/utils/fetch-helper"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import ImageReveal from "@/components/common/image-reveal"
import PageTransition from "@/components/common/page-transition"
import { Search, Calendar, Tag, ChevronRight, Grid, List, Clock } from "lucide-react"

const mapPathToType = {
  "/tin-tuc-hoat-dong": "NEWS",
  "/thong-bao": "NOTIFICATION",
  "/kien-thuc-y-khoa": "KNOWLEDGE",
}

const typeLabels = {
  NEWS: "Tin tức hoạt động",
  NOTIFICATION: "Thông báo",
  KNOWLEDGE: "Kiến thức y khoa",
}

const ArticleCard = ({ article, viewMode = "grid" }) => {
  const isGridView = viewMode === "grid"

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className={`p-0 ${isGridView ? "" : "flex"}`}>
        <div className={`${isGridView ? "aspect-video" : "w-48 flex-shrink-0"} overflow-hidden`}>
          <ImageReveal
            src={article.thumbnailUrl || "/placeholder.svg?height=200&width=300"}
            alt={article.title}
            className="w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className={`p-6 ${isGridView ? "" : "flex-1"}`}>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              <Tag className="w-3 h-3 mr-1" />
              {typeLabels[article.type] || article.type}
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              {new Date(article.publishAt || article.createdAt).toLocaleDateString("vi-VN")}
            </Badge>
          </div>

          <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {article.title}
          </h3>

          {/* <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {article.summary || article.content?.substring(0, 150) + "..."}
          </p> */}

          <div className="flex items-center justify-between">
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              {new Date(article.updatedAt || article.createdAt).toLocaleDateString("vi-VN")}
            </div>

            <Link
              to={`/bai-viet/${article.slug}`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform"
            >
              Đọc thêm
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const ArticlesSkeleton = ({ viewMode = "grid" }) => {
  const isGridView = viewMode === "grid"

  return (
    <div className={`grid gap-6 ${isGridView ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className={`p-0 ${isGridView ? "" : "flex"}`}>
            <Skeleton className={`${isGridView ? "aspect-video w-full" : "w-48 h-32"}`} />
            <div className={`p-6 ${isGridView ? "" : "flex-1"}`}>
              <div className="flex gap-2 mb-3">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const ArticlesPage = ({ type: propType }) => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")
  const [viewMode, setViewMode] = useState("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const type = mapPathToType[location.pathname] || "NEWS"
  const pageTitle = typeLabels[type] || "Bài viết"

  useEffect(() => {
    fetchArticles()
  }, [type, currentPage, searchTerm])

  const fetchArticles = async () => {
    setLoading(true)
    await handleFetch({
      apiCall: () =>
        articleApi.getByType(type, {
          page: currentPage,
          limit: 12,
          search: searchTerm,
        }),
      setData: (data) => {
        setArticles(data.articles || data)
        setTotalPages(data.totalPages || 1)
      },
      setLoading,
      errorMessage: "Không thể tải danh sách bài viết",
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    setSearchParams(searchTerm ? { search: searchTerm } : {})
    fetchArticles()
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Trang chủ
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900">{pageTitle}</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{pageTitle}</h1>
                <p className="text-gray-600">Cập nhật thông tin mới nhất từ Bệnh viện 1A</p>
              </div>

              {/* Search & Controls */}
              <div className="flex items-center gap-4">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Tìm kiếm bài viết..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Button type="submit" size="icon">
                    <Search className="w-4 h-4" />
                  </Button>
                </form>

                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <ArticlesSkeleton viewMode={viewMode} />
          ) : articles.length > 0 ? (
            <>
              <div className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} viewMode={viewMode} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Trước
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => setCurrentPage(page)}
                        className="w-10"
                      >
                        {page}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Sau
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy bài viết</h3>
              <p className="text-gray-600">
                {searchTerm
                  ? `Không có bài viết nào phù hợp với "${searchTerm}"`
                  : "Chưa có bài viết nào được đăng tải"}
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}

export default ArticlesPage
