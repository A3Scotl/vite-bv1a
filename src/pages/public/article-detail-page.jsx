"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { articleApi } from "@/apis/article-api"
import { handleFetch } from "@/utils/fetch-helper"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import ImageReveal from "@/components/common/image-reveal"
import PageTransition from "@/components/common/page-transition"
import {
  Calendar,
  Tag,
  Clock,
  Facebook,
  Twitter,
  LinkIcon,
  ChevronRight,
  ArrowLeft,
  ChevronLeft,
  Eye,
} from "lucide-react"

const typeLabels = {
  NEWS: "Tin tức hoạt động",
  NOTIFICATION: "Thông báo",
  KNOWLEDGE: "Kiến thức y khoa",
}

const ArticleDetailSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-6 w-32 mb-6" />

      <div className="space-y-8">
        <Card>
          <CardContent className="p-0">
            <Skeleton className="w-full h-80" />
            <div className="p-8">
              <Skeleton className="h-10 w-full mb-4" />
              <div className="flex gap-4 mb-6">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
)

const FeaturedArticlesCarousel = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= articles.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, articles.length - itemsPerView) : prev - 1))
  }

  const visibleArticles = articles.slice(currentIndex, currentIndex + itemsPerView)

  if (articles.length === 0) return null

  return (
    <div className="bg-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Bài viết nổi bật</h2>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="rounded-full bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex space-x-1">
              {Array.from({ length: Math.ceil(articles.length / itemsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerView)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    Math.floor(currentIndex / itemsPerView) === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex + itemsPerView >= articles.length}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleArticles.map((article) => (
            <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.thumbnailUrl || "/placeholder.svg?height=200&width=300"}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {typeLabels[article.type] || article.type}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(article.publishAt || article.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                  {article.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {article.content?.replace(/<[^>]*>/g, "").substring(0, 100)}...
                </p>

                <Link to={`/bai-viet/${article.slug}`}>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0">
                    Đọc thêm →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

const ArticleDetailPage = () => {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [featuredArticles, setFeaturedArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    setShareUrl(window.location.href)
    fetchArticleDetail()
    fetchFeaturedArticles()
  }, [slug])

  const fetchArticleDetail = async () => {
    setLoading(true)
    await handleFetch({
      apiCall: () => articleApi.getArticleBySlug(slug),
      setData: setArticle,
      setLoading,
      errorMessage: "Không thể tải bài viết",
    })
  }

  const fetchFeaturedArticles = async () => {
    await handleFetch({
      apiCall: () => articleApi.getAllActive({ limit: 7, sort: "createdAt", order: "desc" }),
      setData: (data) => {
        const articles = data.articles || data
        setFeaturedArticles(articles.filter((a) => a.slug !== slug))
      },
      setLoading: () => {},
      errorMessage: "Không thể tải bài viết nổi bật",
    })
  }

  const handleShare = (platform) => {
    const url = encodeURIComponent(shareUrl)
    const title = encodeURIComponent(article?.title || "")

    let shareLink = ""
    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        break
      case "copy":
        navigator.clipboard.writeText(shareUrl)
        return
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400")
    }
  }

  if (loading) {
    return <ArticleDetailSkeleton />
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết</h1>
          <Link to="/tin-tuc-hoat-dong">
            <Button>Quay lại danh sách bài viết</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Trang chủ
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/tin-tuc-hoat-dong" className="hover:text-blue-600 transition-colors">
                Tin tức
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 line-clamp-1">{article.title}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link
            to="/tin-tuc-hoat-dong"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách bài viết
          </Link>

          {/* Article Content */}
          <Card className="overflow-hidden shadow-lg mb-8">
            <CardContent className="p-0">
              {/* Hero Image */}
              {article.thumbnailUrl && (
                <div className="aspect-video overflow-hidden">
                  <ImageReveal
                    src={article.thumbnailUrl || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full"
                  />
                </div>
              )}

              <div className="p-8">
                {/* Article Meta */}
                <div className="flex flex-wrap gap-3 items-center mb-6">
                  <Badge className="bg-blue-600 text-white">
                    <Tag className="w-3 h-3 mr-1" />
                    {typeLabels[article.type] || article.type}
                  </Badge>
                  <Badge variant="outline">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(article.publishAt || article.createdAt).toLocaleDateString("vi-VN")}
                  </Badge>
                  <Badge variant="outline">
                    <Clock className="w-3 h-3 mr-1" />5 phút đọc
                  </Badge>
                  <Badge variant="outline">
                    <Eye className="w-3 h-3 mr-1" />
                    {article.views || 0} lượt xem
                  </Badge>
                </div>

                {/* Title */}
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">{article.title}</h1>

                {/* Summary */}
                {article.summary && (
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
                    <p className="text-lg text-gray-700 italic">{article.summary}</p>
                  </div>
                )}

                <Separator className="my-8" />

                {/* Content */}
                <div
                  className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <Separator className="my-8" />

                {/* Article Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-sm text-gray-500">
                    Cập nhật: {new Date(article.updatedAt || article.createdAt).toLocaleDateString("vi-VN")}
                  </div>

                  {/* Share Buttons */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 mr-2">Chia sẻ:</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare("facebook")}
                      className="text-blue-600 hover:bg-blue-50"
                    >
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare("twitter")}
                      className="text-blue-400 hover:bg-blue-50"
                    >
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShare("copy")}
                      className="text-gray-600 hover:bg-gray-50"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Article Info Card */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin bài viết</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-gray-600 mb-1">Trạng thái</div>
                  <Badge variant={article.status === "PUBLISHED" ? "default" : "secondary"} className="text-xs">
                    {article.status === "PUBLISHED" ? "Đã xuất bản" : "Nháp"}
                  </Badge>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-gray-600 mb-1">Loại bài viết</div>
                  <div className="font-medium">{typeLabels[article.type] || article.type}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-gray-600 mb-1">Ngày đăng</div>
                  <div className="font-medium">
                    {new Date(article.publishAt || article.createdAt).toLocaleDateString("vi-VN")}
                  </div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-gray-600 mb-1">Lượt xem</div>
                  <div className="font-medium">{article.views || 0}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Contact */}
          <Card className="bg-blue-50 border-blue-200 mb-8">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-bold text-blue-900 mb-2">Cần tư vấn?</h3>
              <p className="text-blue-700 text-sm mb-4">Liên hệ với chúng tôi để được hỗ trợ tốt nhất</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/lien-he">
                  <Button className="bg-blue-600 hover:bg-blue-700">Liên hệ ngay</Button>
                </Link>
                <Link to="/dat-lich-kham">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                    Đặt lịch khám
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Articles Carousel */}
        <FeaturedArticlesCarousel articles={featuredArticles} />
      </div>
    </PageTransition>
  )
}

export default ArticleDetailPage
