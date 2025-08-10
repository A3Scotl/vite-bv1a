"use client";

import { createContext, useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { postApi } from "@/apis/post-api";
import { handleFetch } from "@/utils/fetch-helper";

export const PostContext = createContext(null);

const DEFAULT_FORM_STATE = {
  title: "",
  content: "",
  thumbnailFile: null,
  thumbnailUrl: "",
  status: "PUBLIC",
  publishedAt: "",
  type: "",
};

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [prevPosts, setPrevPosts] = useState([]);
  const [postTypes, setPostTypes] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [formState, setFormState] = useState(DEFAULT_FORM_STATE);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTypes, setFilterTypes] = useState("all");

  const fetchPosts = useCallback(
    async (page = 1, filters = {}) => {
      setIsTableLoading(true);
      await handleFetch({
        apiCall: () =>
          postApi.getAll({
            page: page - 1,
            size: 5,
            title: filters.searchQuery || undefined,
            status:
              filters.filterStatus !== "all" ? filters.filterStatus : undefined,
            type:
              filters.filterTypes !== "all" ? filters.filterTypes : undefined,
          }),
        setData: (data) => {
          const sortedPosts = (data.content || []).sort(
            (a, b) => new Date(b.createAt) - new Date(a.createAt)
          );
          setPrevPosts((prev) => posts); // hoặc prevPosts nhưng KHÔNG dùng `posts` trong dependency
          setPosts(sortedPosts);
          setTotalPages(
            Number.isInteger(data.totalPages) && data.totalPages > 0
              ? data.totalPages
              : 1
          );
          setCurrentPage(page);
        },
        setLoading: setIsTableLoading,
        errorMessage: "Không thể tải bài viết",
      });
    },
    [] 
  );

  const fetchPostTypes = useCallback(async () => {
    await handleFetch({
      apiCall: postApi.getArticleTypes,
      setData: (data) => {
        const types = Array.isArray(data)
          ? data.map((type) => ({
              id: type,
              name: type
                .replace("_", " ")
                .toLowerCase()
                .replace(/\b\w/g, (c) => c.toUpperCase()),
            }))
          : [];
        setPostTypes(types);
        console.log("Fetched post types:", types);
      },
      setLoading: setIsTableLoading,
      errorMessage: "Không thể tải loại bài viết",
    });
  }, []);

  useEffect(() => {
    fetchPosts(1, { searchQuery, filterStatus, filterTypes });
    fetchPostTypes();
  }, [fetchPosts, fetchPostTypes, searchQuery, filterStatus, filterTypes]);

  const handleOpenSheet = (post = null) => {
    setCurrentPost(post);
    setFormState(
      post ? { ...DEFAULT_FORM_STATE, ...post } : DEFAULT_FORM_STATE
    );
    setIsSheetOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormLoading(true);
    const formData = new FormData();
    Object.entries(formState).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });
    if (!formState.thumbnailFile) formData.delete("thumbnail");
    try {
      const response = currentPost
        ? await postApi.update(currentPost.id, formData)
        : await postApi.create(formData);
      if (response.success) {
        toast.success(response.message);
        setIsSheetOpen(false);
        setFormState(DEFAULT_FORM_STATE);
        await fetchPosts(1, { searchQuery, filterStatus, filterTypes });
      } else {
        toast.error(response.message || "Đã xảy ra lỗi");
      }
    } catch (error) {
      toast.error("Lỗi khi lưu bài viết: " + error.message);
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleToggleActive = useCallback(
    async (id) => {
      setIsTableLoading(true);
      const response = await postApi.hide(id);
      if (response.success) {
        toast.success(response.message);
        await fetchPosts(currentPage, {
          searchQuery,
          filterStatus,
          filterTypes,
        });
      } else {
        toast.error(response.message);
      }
      setIsTableLoading(false);
    },
    [fetchPosts, currentPage, searchQuery, filterStatus, filterTypes]
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài viết này?")) return;
    setIsTableLoading(true);
    try {
      const response = await postApi.delete(id);
      if (response.success) {
        toast.success(response.message);
        await fetchPosts(currentPage, {
          searchQuery,
          filterStatus,
          filterTypes,
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Lỗi khi xóa bài viết: " + error.message);
    } finally {
      setIsTableLoading(false);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        prevPosts,
        postTypes,
        currentPost,
        formState,
        setFormState,
        isSheetOpen,
        setIsSheetOpen,
        isContentModalOpen,
        setIsContentModalOpen,
        isTableLoading,
        isFormLoading,
        currentPage,
        setCurrentPage,
        totalPages,
        fetchPosts,
        handleOpenSheet,
        handleSubmit,
        handleToggleActive,
        handleDelete,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        filterTypes,
        setFilterTypes,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
