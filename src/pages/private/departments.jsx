"use client";

import { useEffect, useContext } from "react";
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
import DepartmentTable from "@/components/private/table/department-table";
import Pagination from "@/components/common/pagination";
import TableSkeleton from "@/components/private/table/table-skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { EditModal } from "@/components/common/edit-modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ContentEditModal from "@/components/common/content-edit-modal";
import { DepartmentContext } from "@/context/department-context";

export default function Departments() {
  const {
    departments,
    prevDepartments,
    currentDepartment,
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
    fetchDepartments,
    handleOpenSheet,
    handleSubmit,
    handleToggleActive,
    handleDelete,
    handleInputChange,
    handleContentSave,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
  } = useContext(DepartmentContext);

  // Debounce các bộ lọc
  const [debouncedSearch] = useDebounce(searchQuery, 300);
  const [debouncedStatus] = useDebounce(filterStatus, 300);

  useEffect(() => {
    fetchDepartments(currentPage, {
      searchQuery: debouncedSearch,
      filterStatus: debouncedStatus,
    });
  }, [fetchDepartments, currentPage, debouncedSearch, debouncedStatus]);

  return (
    <div className="space-y-6">
      <Card>
        <PageHeader
          title="Quản lý phòng ban"
          description="Tạo, chỉnh sửa và quản lý các phòng ban cho bệnh viện."
          icon={FileText}
          onAdd={() => handleOpenSheet()}
        />
        <CardContent className="pt-0">
          <div className="flex gap-4 mb-2">
            <Input
              placeholder="Tìm kiếm theo tên phòng ban..."
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
                <SelectItem value="ACTIVE">Hoạt động</SelectItem>
                <SelectItem value="INACTIVE">Không hoạt động</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AnimatePresence mode="wait">
            {isTableLoading && prevDepartments.length === 0 ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TableSkeleton headers={["", "", "", "", ""]} rows={5} />
              </motion.div>
            ) : departments.length === 0 && !isTableLoading ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-center text-muted-foreground">
                  Không tìm thấy phòng ban nào. Vui lòng thử điều chỉnh bộ lọc.
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
                <DepartmentTable
                  departments={isTableLoading ? prevDepartments : departments}
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
        title={currentDepartment ? "Chỉnh sửa phòng ban" : "Thêm phòng ban mới"}
        description={
          currentDepartment
            ? "Thực hiện thay đổi cho phòng ban tại đây. Nhấn lưu khi hoàn tất."
            : "Thêm một phòng ban mới. Nhấn lưu khi hoàn tất."
        }
      >
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Tên phòng ban</Label>
            <Input
              id="name"
              value={formState.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label>Mô tả</Label>
            <Button
              type="button"
              variant="outline"
              className="w-full mb-2 flex items-center gap-2"
              onClick={() => setIsContentModalOpen(true)}
            >
              <FileText className="w-4 h-4" />
              Chỉnh sửa mô tả
            </Button>
            <ContentEditModal
              content={formState.description}
              onSave={handleContentSave}
              isOpen={isContentModalOpen}
              onClose={() => setIsContentModalOpen(false)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="thumbnailFile">Hình ảnh đại diện</Label>
            <Input
              id="thumbnailFile"
              type="file"
              onChange={handleInputChange}
              accept="image/*"
            />
            {formState.thumbnail && !formState.thumbnailFile && (
              <img
                src={formState.thumbnail}
                alt="Hình ảnh hiện tại"
                className="w-24 h-24 object-cover rounded-md mt-2"
                loading="lazy"
              />
            )}
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSheetOpen(false)}
              className="bg-gray-100 hover:bg-gray-200"
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isFormLoading}>
              {isFormLoading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </form>
      </EditModal>
    </div>
  );
}