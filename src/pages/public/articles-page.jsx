import React, { useEffect, useState } from "react";
import { useParams, Link, data } from "react-router-dom";
import { handleFetch } from "@/utils/fetch-helper";
import { articleApi } from "@/apis/article-api";

const ArticlesPage = () => {
  const { type } = useParams();

  console.log("====================================");
  console.log("type", type);
  console.log("====================================");

  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, [type]);

  const fetchArticles = async () => {
    await handleFetch({
      apiCall: () => articleApi.getArticleByType(type),
      setData: (data) => {
        // console.log("====================================");
        // console.log("data", data);
        // console.log("====================================");
        setArticles(data);
      },
      setLoading: setLoading,
      errorMessage: "Không thể tải danh sách bài viết.",
      successMessage: "Tải danh sách bài viết thành công.",
      loadingMessage: "Đang tải danh sách bài viết...",
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        Danh sách bài viết: {type}
      </h2>
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Tìm tiêu đề bài viết..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-64"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded"
        />
      </div>
      {loading ? (
        <div>Đang tải...</div>
      ) : articles.length === 0 ? (
        <div>Không có bài viết nào.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
            >
              <Link to={`/tin-tuc-hoat-dong/${type}/${article.slug}`}>
                <h3 className="text-lg font-semibold text-blue-700 hover:underline mb-2">
                  {article.title}
                </h3>
              </Link>
              {article.thumbnailUrl && (
                <img
                  src={article.thumbnailUrl}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <div className="text-sm text-gray-600 mb-1">
                Ngày đăng:{" "}
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString()
                  : "Chưa xác định"}
              </div>
              <div className="text-sm text-gray-700 mb-2">
                {article.description || article.content?.slice(0, 120) + "..."}
              </div>
              <Link
                to={`/tin-tuc-hoat-dong/${type}/${article.slug}`}
                className="text-blue-600 hover:underline text-sm"
              >
                Xem chi tiết →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
