"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { departmentApi } from "@/apis/department-api";
import PageHeader from "@/components/private/page-header";
import TableSkeleton from "@/components/private/table/table-skeleton";
import ContentEditModal from "@/components/common/content-edit-modal";
import { EditModal } from "@/components/common/edit-modal";
import { handleFetch } from "@/utils/fetch-helper";
import DepartmentTable from "@/components/private/table/department-table";
import Pagination from "@/components/common/pagination";
import { motion, AnimatePresence } from "framer-motion";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    thumbnailFile: null,
    thumbnail: "",
    isActive: true,
  });

  const fetchDepartments = useCallback(async (page = 1) => {
    setIsTableLoading(true);
    await handleFetch({
      apiCall: () => departmentApi.getAll({ page: page - 1, size: 5 }),
      setData: (data) => {
        setDepartments(data.content || []);
        setTotalPages(Number.isInteger(data.totalPages) ? data.totalPages : 1);
      },
      setLoading: setIsTableLoading,
      errorMessage: "Không thể tải danh sách phòng ban",
    });
  }, []);

  useEffect(() => {
    fetchDepartments(currentPage);
  }, [fetchDepartments, currentPage]);

  const handleInputChange = useCallback((e) => {
    const { id, value, type, checked, files } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  }, []);

  const handleOpenSheet = useCallback((department = null) => {
    setCurrentDepartment(department);
    setFormState(
      department
        ? {
            name: department.name,
            description: department.description || "",
            thumbnailFile: null,
            thumbnail: department.thumbnail || "",
            isActive: department.isActive,
          }
        : {
            name: "",
            description: "",
            thumbnailFile: null,
            thumbnail: "",
            isActive: true,
          }
    );
    setIsSheetOpen(true);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append("name", formState.name);
      formData.append("description", formState.description);
      formData.append("isActive", formState.isActive.toString());
      if (formState.thumbnailFile)
        formData.append("thumbnail", formState.thumbnailFile);

      const response = currentDepartment
        ? await departmentApi.update(currentDepartment.id, formData)
        : await departmentApi.create(formData);

      if (response.success) {
        toast.success(response.message);
        setIsSheetOpen(false);
        await fetchDepartments();
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    },
    [currentDepartment, formState, fetchDepartments]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm("Bạn có chắc muốn xóa phòng ban này?")) {
        setLoading(true);
        const response = await departmentApi.delete(id);
        if (response.success) {
          toast.success(response.message);
          await fetchDepartments();
        } else {
          toast.error(response.message);
        }
        setLoading(false);
      }
    },
    [fetchDepartments]
  );

  const handleToggleActive = useCallback(
    async (id) => {
      setLoading(true);
      const response = await departmentApi.hide(id);
      if (response.success) {
        toast.success(response.message);
        await fetchDepartments();
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    },
    [fetchDepartments]
  );

  const handleContentSave = useCallback((newContent) => {
    setFormState((prev) => ({ ...prev, description: newContent }));
    setIsContentModalOpen(false);
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <PageHeader
          title="Quản lý phòng ban"
          description="Tạo, chỉnh sửa và quản lý các phòng ban cho bệnh viện."
          icon={FileText}
          onAdd={() => handleOpenSheet()}
        />
        <CardContent className="pt-4">
          <div>
            <AnimatePresence mode="wait">
              {isTableLoading && departments.length === 0 ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TableSkeleton
                    headers={[
                      "",
                      "",
                      "",
                      "",
                    ]}
                    rows={5}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key={`page-${currentPage}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <DepartmentTable
                    departments={departments}
                    onEdit={handleOpenSheet}
                    onToggleActive={handleToggleActive}
                    onDelete={handleDelete}
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
            <Button type="submit" disabled={loading}>
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </form>
      </EditModal>
    </div>
  );
};

export default Departments;
