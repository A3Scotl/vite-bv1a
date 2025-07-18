import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { handleFetch } from "@/utils/fetch-helper";
import { articleApi } from "@/apis/article-api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Tag, CheckCircle, ArrowLeft } from "lucide-react";

export default function ArticleDetailPage() {
  const { slug, type } = useParams();

  console.log("====================================");
  console.log("params", slug, type);
  console.log("====================================");

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticleDetail();
  }, [slug]);

  const fetchArticleDetail = async () => {
    await handleFetch({
      apiCall: () => articleApi.getArticleBySlug(slug),
      setData: setArticle,
      setLoading,
      errorMessage: "Không thể tải bài viết.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-lg text-blue-600">
          Đang tải bài viết...
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy bài viết
          </h1>
          <Link to={`/tin-tuc-hoat-dong`}>
            <Button>Quay lại danh sách bài viết</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <Link
              to={`/tin-tuc-hoat-dong/${type}`}
              className="hover:text-blue-600 transition-colors"
            >
              Tin tức
            </Link>
            <span>/</span>
            <span className="text-gray-900">{article.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to={`/tin-tuc-hoat-dong/${type}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại danh sách bài viết
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {article.thumbnailUrl && (
                  <img
                    src={article.thumbnailUrl}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-blue-700 mb-4">
                    {article.title}
                  </h1>
                  <div className="flex flex-wrap gap-4 items-center mb-4">
                    <Badge className="bg-blue-600 text-white flex items-center gap-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.publishAt
                        ? new Date(article.publishAt).toLocaleDateString()
                        : "Chưa xác định"}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                      <Tag className="w-4 h-4 mr-1" />
                      {article.type === "NEWS" ? "Tin tức" : article.type}
                    </Badge>
                    <Badge
                      className={`flex items-center gap-1 ${
                        article.status === "PUBLISHED"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {article.status === "PUBLISHED" ? "Đã xuất bản" : "Nháp"}
                    </Badge>
                  </div>
                  <Separator className="my-6" />
                  <div className="prose prose-lg max-w-none text-gray-800 mb-6">
                    {article.content}
                  </div>
                  <div className="flex justify-end">
                    <span className="text-xs text-gray-400">
                      Cập nhật:{" "}
                      {article.updateAt
                        ? new Date(article.updateAt).toLocaleDateString()
                        : "Chưa xác định"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Thông tin bài viết
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold">Trạng thái:</span>{" "}
                    {article.status === "PUBLISHED" ? (
                      <span className="text-blue-600 font-semibold">
                        Đã xuất bản
                      </span>
                    ) : (
                      <span className="text-gray-600 font-semibold">Nháp</span>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold">Loại bài viết:</span>{" "}
                    {article.type === "NEWS" ? "Tin tức" : article.type}
                  </div>
                  <div>
                    <span className="font-semibold">Ngày đăng:</span>{" "}
                    {article.publishAt
                      ? new Date(article.publishAt).toLocaleDateString()
                      : "Chưa xác định"}
                  </div>
                  <div>
                    <span className="font-semibold">Cập nhật:</span>{" "}
                    {article.updateAt
                      ? new Date(article.updateAt).toLocaleDateString()
                      : "Chưa xác định"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
