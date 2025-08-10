"use client";

import { useEffect, useMemo, useContext } from "react";
import { useDebounce } from "use-debounce";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "@/components/private/page-header";
import PostTable from "@/components/private/table/post-table";
import Pagination from "@/components/common/pagination";
import TableSkeleton from "@/components/private/table/table-skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { EditModal } from "@/components/common/edit-modal";
import PostForm from "@/components/private/form/post-form";
import { PostContext } from "@/context/post-context";

export default function Posts() {
  const {
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
  } = useContext(PostContext);

  // Debounce tất cả các bộ lọc
  const [debouncedSearch] = useDebounce(searchQuery, 300);
  const [debouncedStatus] = useDebounce(filterStatus, 300);
  const [debouncedTypes] = useDebounce(filterTypes, 300);

  useEffect(() => {
    fetchPosts(currentPage, {
      searchQuery: debouncedSearch,
      filterStatus: debouncedStatus,
      filterTypes: debouncedTypes,
    });
  }, [
    fetchPosts,
    currentPage,
    debouncedSearch,
    debouncedStatus,
    debouncedTypes,
  ]);

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  const handleSelectType = (value) =>
    setFormState((prev) => ({ ...prev, type: value }));

  const handleStatusToggle = () => {
    const now = new Date().toISOString();
    setFormState((prev) => ({
      ...prev,
      status: prev.status === "PRIVATE" ? "PUBLIC" : "PRIVATE",
      publishedAt: prev.status === "PRIVATE" ? now : "",
    }));
  };

  const handleContentSave = (newContent) => {
    setFormState((prev) => ({ ...prev, content: newContent }));
    setIsContentModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <PageHeader
          title="Quản lý bài viết"
          description="Tạo, chỉnh sửa và xuất bản bài viết cho website."
          icon={FileText}
          onAdd={() => handleOpenSheet()}
        />
        <CardContent className="pt-0">
          <div className="flex gap-4 mb-2">
            <Input
              placeholder="Tìm kiếm theo tiêu đề..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="PUBLIC">Công khai</SelectItem>
                <SelectItem value="PRIVATE">Riêng tư</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterTypes} onValueChange={setFilterTypes}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Lọc theo loại" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả thể loại</SelectItem>
                {postTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <AnimatePresence mode="wait">
            {isTableLoading && prevPosts.length === 0 ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TableSkeleton headers={["", "", "", "", ""]} rows={5} />
              </motion.div>
            ) : posts.length === 0 && !isTableLoading ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-center text-muted-foreground">
                  Không tìm thấy bài viết nào. Vui lòng thử điều chỉnh bộ lọc.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={`page-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <PostTable
                  posts={isTableLoading ? prevPosts : posts}
                  onEdit={handleOpenSheet}
                  onDelete={handleDelete}
                  onToggleActive={handleToggleActive}
                />
              </motion.div>
            )}
          </AnimatePresence>
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
          loading={isFormLoading}
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
}
