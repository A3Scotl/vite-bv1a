"use client";

import { useState, useEffect } from "react";
import { FileText, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { postApi } from "@/apis/post-api";
import { handleFetch } from "@/utils/fetch-helper";
import { Link } from "react-router-dom";

// Skeleton component
const PostSkeleton = () => (
  <Card className="overflow-hidden animate-pulse">
    <div className="aspect-video bg-gray-200" />
    <CardContent className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-3/4" />
    </CardContent>
  </Card>
);

const PostsSection = () => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    handleFetch({
      apiCall: postApi.getAllActive,
      setData: (data) => {
        setPosts(data?.content || []);
        setLoading(false);
      },
    });
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setItemsPerView(1);
    } else if (window.innerWidth < 1024) {
      setItemsPerView(3);
    } else {
      setItemsPerView(4);
    }
  };

  const topPosts = [...posts]
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, 8);
  const visiblePosts = topPosts.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Tin tức & Bài viết
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Cập nhật những thông tin y tế mới nhất và kiến thức sức khỏe hữu ích
        </p>
      </div>
      <div className="grid grid-cols-[35%_65%] gap-6 items-stretch">
        {/* Cột trái - 1 bài lớn */}
        <div className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col bg-white">
          {loading ? (
            <PostSkeleton />
          ) : topPosts[0] ? (
            <Link
              to={`/bai-viet/${topPosts[0].slug}`}
              className="flex flex-col h-full"
            >
              <img
                src={topPosts[0].thumbnailUrl}
                alt={topPosts[0].title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="text-base font-bold mb-2 line-clamp-2 hover:text-blue-600">
                  {topPosts[0].title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-4 flex-1">
                  {topPosts[0].content
                    ?.replace(/<[^>]*>/g, "")
                    .substring(0, 120)}
                  ...
                </p>
              </div>
            </Link>
          ) : null}
        </div>

        {/* Cột phải - nhiều bài nhỏ */}
        <div className="space-y-4 bg-white">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <PostSkeleton key={i} />)
            : topPosts.slice(1, 5).map((post) => (
                <div
                  key={post.id}
                  className="flex items-start space-x-3 border-b pb-3"
                >
                  <img
                    src={post.thumbnailUrl}
                    alt={post.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <Link
                      to={`/bai-viet/${post.slug}`}
                      className="text-blue-600 font-medium hover:underline line-clamp-2"
                    >
                      {post.title}
                    </Link>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {post.content?.replace(/<[^>]*>/g, "").substring(0, 90)}
                      ...
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Nút xem tất cả */}
      <div className="text-center mt-8">
        <Link to="/tin-tuc-hoat-dong">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Xem thêm tất cả tin tức
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default PostsSection;
