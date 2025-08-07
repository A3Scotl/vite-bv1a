"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, FileText, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { postApi } from "@/apis/post-api"
import { handleFetch } from "@/utils/fetch-helper"
import { Link } from "react-router-dom"

const PostsSection = () => {
  const [posts, setPosts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    fetchPosts()
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const fetchPosts = () => {
    handleFetch({
      apiCall: postApi.getAllActive,
      setData:(data)=>{setPosts(data?.content)} ,
    })
  }

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setItemsPerView(1)
    } else if (window.innerWidth < 1024) {
      setItemsPerView(3)
    } else {
      setItemsPerView(4)
    }
  }

  // Lấy 10 bài viết đầu tiên
  const topPosts = posts.slice(0, 10)
  const visiblePosts = topPosts.slice(currentIndex, currentIndex + itemsPerView)

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
          {/* Posts Grid */}
          <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {visiblePosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  {post.thumbnailUrl ? (
                    <img
                      src={post.thumbnailUrl || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <CardContent className="px-4 py-0">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(post.publishedAt || post.createdAt)}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  <div
                    className="text-gray-600 text-sm line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: post.content?.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
                    }}
                  />

                  <Link to={`/tin-tuc-hoat-dong/${post.slug}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Đọc thêm
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center pt-4">
          

            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(topPosts.length / itemsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerView)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    Math.floor(currentIndex / itemsPerView) === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

           
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

export default PostsSection
