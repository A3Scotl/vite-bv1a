import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import { postApi } from "@/apis/post-api";
import { Link } from "react-router-dom";

export function NewsSection({ titleSection }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const fetchNews = async () => {
      setLoading(true);
      const res = await postApi.getByType("NEWS", { page: 0, size: 10 });
      if (!ignore && res?.success && Array.isArray(res.data?.content)) {
        setPosts(res.data.content);
      }
      setLoading(false);
        console.log(res);
    };
    fetchNews();
  
    return () => { ignore = true; };

  }, []);

  return (
    <section className="py-8 px-4 md:px-8 bg-white" aria-label="Tin tức">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2 text-blue-800">
          <Newspaper className="w-6 h-6" />
          {titleSection}
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="animate-pulse bg-gray-100 h-40" />
            ))
          ) : posts.length ? (
            posts.map((post) => (
              <Card
                key={post.id}
                className="hover:shadow-md transition-shadow bg-white"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold line-clamp-2">
                    <Link to={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <time
                    dateTime={post.publishedAt}
                    className="text-sm text-muted-foreground"
                  >
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("vi-VN")
                      : ""}
                  </time>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.summary ||
                      (post.content
                        ? post.content.replace(/<[^>]+>/g, "").slice(0, 120) + "..."
                        : "")}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center text-gray-500 py-8">
              Không có tin tức nào.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}