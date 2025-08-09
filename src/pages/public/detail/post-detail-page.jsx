"use client";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { postApi } from "@/apis/post-api";
import { handleFetch } from "@/utils/fetch-helper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import ImageReveal from "@/components/common/image-reveal";
import PageTransition from "@/components/common/page-transition";
import {
  typeLabels,
  typeUrls,
  mapPathToType,
} from "@/context/post-type-context";
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
} from "lucide-react";

const PostDetailSkeleton = () => (
  <div className="min-h-screen bg-white-50">
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
);

const FeaturedPostsCarousel = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= posts.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, posts.length - itemsPerView) : prev - 1
    );
  };

  const visiblePosts = posts.slice(currentIndex, currentIndex + itemsPerView);

  if (posts.length === 0) return null;

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
              {Array.from({
                length: Math.ceil(posts.length / itemsPerView),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerView)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    Math.floor(currentIndex / itemsPerView) === index
                      ? "bg-blue-600"
                      : "bg-white-300"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex + itemsPerView >= posts.length}
              className="rounded-full"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visiblePosts.map((post) => (
            <Card
              key={post.id}
              className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={
                    post.thumbnailUrl || "/placeholder.svg?height=200&width=300"
                  }
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {typeLabels[post.type] || post.type}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(
                      post.publishAt || post.createdAt
                    ).toLocaleDateString("vi-VN")}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-2">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {post.content?.replace(/<[^>]*>/g, "").substring(0, 100)}...
                </p>

                <Link to={`/bai-viet/${post.slug}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 p-0"
                  >
                    Đọc thêm →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const PostDetailPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState("");
  const resolvedTypeUrl = typeUrls[post?.type] ?? "/tin-tuc-hoat-dong";
  const resolvedTypeLabel = typeLabels[post?.type] ?? "Tin tức";

  useEffect(() => {
    setShareUrl(window.location.href);
    fetchPostDetail();
    fetchFeaturedPosts();
  }, [slug]);

  const fetchPostDetail = async () => {
    setLoading(true);
    await handleFetch({
      apiCall: () => postApi.getBySlug(slug),
      setData: setPost,
      setLoading,
      errorMessage: "Không thể tải bài viết",
    });
  };

  const fetchFeaturedPosts = async () => {
    await handleFetch({
      apiCall: () =>
        postApi.getAllActive({ limit: 7, sort: "createdAt", order: "desc" }),
      setData: (data) => {
        const posts = data.posts || data;
        // setFeaturedPosts(posts.filter((a) => a.slug !== slug))
      },
      setLoading: () => {},
      errorMessage: "Không thể tải bài viết nổi bật",
    });
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(shareUrl);
    const title = encodeURIComponent(post?.title || "");

    let shareLink = "";
    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        return;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400");
    }
  };

  if (loading) {
    return <PostDetailSkeleton />;
  }

  if (!post) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Không tìm thấy bài viết
            </h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Trang chủ
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to={resolvedTypeUrl}>{resolvedTypeLabel}</Link>


              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 line-clamp-1">{post.title}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* post Content */}
          <Card className="overflow-hidden shadow-lg mb-8">
            <CardContent className="p-0">
              {/* Hero Image */}
              {post.thumbnailUrl && (
                <div className="aspect-video overflow-hidden">
                  <ImageReveal
                    src={post.thumbnailUrl || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full"
                  />
                </div>
              )}

              <div className="p-8">
                {/* post Meta */}
                <div className="flex flex-wrap justify-between gap-3 items-center mb-6">
                  <Badge className="bg-blue-600 text-white">
                    <Tag className="w-3 h-3 mr-1" />
                    {typeLabels[post.type] || post.type}
                  </Badge>
                  <div>
                    <Badge variant="outline">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(
                        post.publishAt || post.createdAt
                      ).toLocaleDateString("vi-VN")}
                    </Badge>

                    <Badge variant="outline">
                      <Eye className="w-3 h-3 mr-1" />
                      {post.viewCount || 0}
                    </Badge>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>

                {/* Summary */}
                {post.summary && (
                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
                    <p className="text-lg text-gray-700 italic">
                      {post.summary}
                    </p>
                  </div>
                )}

                <Separator className="my-8" />

                {/* Content */}
                <div
                  className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <Separator className="my-8" />

                {/* post Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-sm text-gray-500">
                    Cập nhật:{" "}
                    {new Date(
                      post.updateAt || post.createdAt
                    ).toLocaleDateString("vi-VN")}
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

       
        </div>

        {/* Featured Posts Carousel */}
        <FeaturedPostsCarousel posts={featuredPosts} />
      </div>
    </PageTransition>
  );
};

export default PostDetailPage;
