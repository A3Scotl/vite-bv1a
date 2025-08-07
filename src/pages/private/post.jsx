"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { postApi } from "@/apis/post-api";
import LoadingPage from "@/pages/common/loading-page";
import { EditModal } from "@/components/common/edit-modal";
import { handleFetch } from "@/utils/fetch-helper";

import PostTable from "@/components/private/table/post-table";
import Pagination from "@/components/common/pagination";
import PostForm from "@/components/private/form/post-form";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [postTypes, setPostTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    thumbnailFile: null,
    thumbnailUrl: "",
    status: "PRIVATE",
    publishedAt: "",
    type: "",
  });

  const fetchPosts = async (page = 1) => {
    await handleFetch({
      apiCall: () => postApi.getAll({ page: page - 1, size: 5 }),
      setData: (data) => {
        setPosts(data.content || []);
        setTotalPages(Number.isInteger(data.totalPages) ? data.totalPages : 1);
      },
      setLoading,
      errorMessage: "Không thể tải bài viết",
    });
  };

  const fetchPostTypes = async () => {
    await handleFetch({
      apiCall: postApi.getArticleTypes,
      setData: (data) =>
        setPostTypes(
          Array.isArray(data)
            ? data.map((type) => ({
                id: type,
                name: type
                  .replace("_", " ")
                  .toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase()),
              }))
            : []
        ),
      setLoading,
      errorMessage: "Không thể tải loại bài viết",
    });
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchPosts(currentPage), fetchPostTypes()]);
      } catch (error) {
        toast.error("Lỗi khi tải dữ liệu: " + error.message);
      }
    };
    loadData();
    // eslint-disable-next-line
  }, [currentPage]);

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  const handleSelectType = (value) => {
    setFormState((prev) => ({ ...prev, type: value }));
  };

  const handleOpenSheet = (post = null) => {
    setCurrentPost(post);
    setFormState(
      post
        ? {
            title: post.title,
            content: post.content || "",
            thumbnailFile: null,
            thumbnailUrl: post.thumbnailUrl || "",
            status: post.status || "PRIVATE",
            publishedAt: post.publishedAt || "",
            type: post.type || "",
          }
        : {
            title: "",
            content: "",
            thumbnailFile: null,
            thumbnailUrl: "",
            status: "PRIVATE",
            publishedAt: "",
            type: "",
          }
    );
    setIsSheetOpen(true);
  };

  const handleStatusToggle = () => {
    const now = new Date().toISOString(); // Sử dụng thời gian hiện tại: 08:48 PM +07, 06/08/2025
    setFormState((prev) => ({
      ...prev,
      status: prev.status === "PRIVATE" ? "PUBLIC" : "PRIVATE",
      publishedAt: prev.status === "PRIVATE" ? now : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", formState.title);
    formData.append("content", formState.content);
    formData.append("status", formState.status);
    formData.append("publishedAt", formState.publishedAt);
    formData.append("type", formState.type);
    if (formState.thumbnailFile) formData.append("thumbnail", formState.thumbnailFile);

    try {
      const response = currentPost
        ? await postApi.update(currentPost.id, formData)
        : await postApi.create(formData);

      if (response.success) {
        toast.success(response.message);
        setIsSheetOpen(false);
        await fetchPosts();
      } else {
        toast.error(response.message || "Đã xảy ra lỗi");
      }
    } catch (error) {
      toast.error("Lỗi khi lưu bài viết: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      setLoading(true);
      try {
        const response = await postApi.delete(id);
        if (response.success) {
          toast.success(response.message);
          await fetchPosts();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Lỗi khi xóa bài viết: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleContentSave = (newContent) => {
    setFormState((prev) => ({ ...prev, content: newContent }));
    setIsContentModalOpen(false);
  };

  if (loading && !posts.length) return <LoadingPage />;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Quản lý bài viết
          </CardTitle>
          <Button onClick={() => handleOpenSheet()} size="sm">
            <Plus className="w-4 h-4 mr-2" /> Thêm bài viết
          </Button>
        </CardHeader>
        <CardDescription className="px-6">
          Tạo, chỉnh sửa và xuất bản bài viết cho website.
        </CardDescription>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <PostTable
              posts={posts}
              onEdit={handleOpenSheet}
              onDelete={handleDelete}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>

      <EditModal
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        title={currentPost ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
        description={
          currentPost
            ? "Thực hiện thay đổi cho bài viết tại đây. Nhấn lưu khi hoàn tất."
            : "Thêm một bài viết mới. Nhấn lưu khi hoàn tất."
        }
      >
        <PostForm
          formState={formState}
          postTypes={postTypes}
          loading={loading}
          isContentModalOpen={isContentModalOpen}
          setIsContentModalOpen={setIsContentModalOpen}
          handleInputChange={handleInputChange}
          handleSelectType={handleSelectType}
          handleContentSave={handleContentSave}
          handleStatusToggle={handleStatusToggle}
          handleSubmit={handleSubmit}
          currentPost={currentPost}
          setIsSheetOpen={setIsSheetOpen}
        />
      </EditModal>
      
    </div>
  );
};

export default Posts;