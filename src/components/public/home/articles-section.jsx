"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { articleApi } from "@/apis/article-api"
import { handleFetch } from "@/utils/fetch-helper"
import { Link } from "react-router-dom"

const ArticlesSection = () => {
  const [articles, setArticles] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    fetchArticles()
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const fetchArticles = () => {
    handleFetch({
      apiCall: articleApi.getAllActive,
      setData: setArticles,
    })
  }

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setItemsPerView(1)
    } else if (window.innerWidth < 1024) {
      setItemsPerView(2)
    } else {
      setItemsPerView(3)
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= articles.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, articles.length - itemsPerView) : prev - 1))
  }

  const visibleArticles = articles.slice(currentIndex, currentIndex + itemsPerView)

  const formatDate = (dateString) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("vi-VN")
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tin tức & Bài viết</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cập nhật những thông tin y tế mới nhất và kiến thức sức khỏe hữu ích
          </p>
        </div>

        <div className="relative">
        

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleArticles.map((article) => (
              <Card key={article.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  {article.thumbnailUrl ? (
                    <img
                      src={article.thumbnailUrl || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(article.publishedAt || article.createdAt)}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>

                  <div
                    className="text-gray-600 text-sm line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: article.content?.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
                    }}
                  />

                  <Link to={`/tin-tuc-hoat-dong/${article.slug}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Đọc thêm
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
  {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="rounded-full bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(articles.length / itemsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerView)}
                  className={`w-3 h-3 rounded-full transition-colors ${
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
          {/* View All Button */}
          <div className="text-center mt-8">
            <Link to="/tin-tuc-hoat-dong">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Xem tất cả bài viết
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArticlesSection
