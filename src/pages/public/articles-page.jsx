// ArticleListPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { articleApi } from "@/apis/article-api"
import { handleFetch } from "@/utils/fetch-helper"
const mapPathToType = {
  "/tin-tuc-hoat-dong": "NEWS",
  "/thong-bao": "NOTIFICATION",
  "/kien-thuc-y-khoa": "KNOWLEDGE",
};

export default function ArticleListPage() {
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const type = mapPathToType[location.pathname] || "NEWS";

  useEffect(() => {
    const fetchArticles = () => {
      handleFetch({
      apiCall:()=> articleApi.getByType(type),
      setData: setArticles,
      setLoading,
    })
    };
    fetchArticles();
  }, [type]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        {location.pathname === "/tin-tuc-hoat-dong" && "Tin tức hoạt động"}
        {location.pathname === "/thong-bao" && "Thông báo"}
        {location.pathname === "/kien-thuc-y-khoa" && "Kiến thức y khoa"}
      </h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id} className="mb-2">
              {article.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
