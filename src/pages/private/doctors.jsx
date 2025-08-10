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
import DoctorTable from "@/components/private/table/doctor-table";
import Pagination from "@/components/common/pagination";
import TableSkeleton from "@/components/private/table/table-skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { EditModal } from "@/components/common/edit-modal";
import DoctorForm from "@/components/private/form/doctor-form";
import { DoctorContext } from "@/context/doctor-context";

export default function Doctors() {
  const {
    doctors,
    prevDoctors,
    departments,
    positions,
    currentDoctor,
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
    fetchDoctors,
    handleOpenSheet,
    handleSubmit,
    handleToggleActive,
    handleDelete,
    handleInputChange,
    handleSelectChange,
    handlePositionChange,
    handleContentSave,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filterDepartment,
    setFilterDepartment,
    filterPosition,
    setFilterPosition,
  } = useContext(DoctorContext);

  // Debounce các bộ lọc
  const [debouncedSearch] = useDebounce(searchQuery, 300);
  const [debouncedStatus] = useDebounce(filterStatus, 300);
  const [debouncedDepartment] = useDebounce(filterDepartment, 300);
  const [debouncedPosition] = useDebounce(filterPosition, 300);

  useEffect(() => {
    fetchDoctors(currentPage, {
      searchQuery: debouncedSearch,
      filterStatus: debouncedStatus,
      filterDepartment: debouncedDepartment,
      filterPosition: debouncedPosition,
    });
  }, [
    fetchDoctors,
    currentPage,
    debouncedSearch,
    debouncedStatus,
    debouncedDepartment,
    debouncedPosition,
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <PageHeader
          title="Quản lý bác sĩ"
          description="Tạo, chỉnh sửa và quản lý thông tin bác sĩ cho bệnh viện."
          icon={FileText}
          onAdd={() => handleOpenSheet()}
        />
        <CardContent className="pt-0">
          <div className="flex gap-4 mb-2">
            <Input
              placeholder="Tìm kiếm theo tên bác sĩ..."
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
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Lọc theo phòng ban" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả phòng ban</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id.toString()}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterPosition} onValueChange={setFilterPosition}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Lọc theo chuyên khoa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vị trí</SelectItem>
                {positions.map((pos) => (
                  <SelectItem key={pos.id} value={pos.id}>
                    {pos.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <AnimatePresence mode="wait">
            {isTableLoading && prevDoctors.length === 0 ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TableSkeleton headers={["", "", "", "", ""]} rows={5} />
              </motion.div>
            ) : doctors.length === 0 && !isTableLoading ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-center text-muted-foreground">
                  Không tìm thấy bác sĩ nào. Vui lòng thử điều chỉnh bộ lọc.
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
                <DoctorTable
                  doctors={isTableLoading ? prevDoctors : doctors}
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
        title={currentDoctor ? "Chỉnh sửa bác sĩ" : "Thêm bác sĩ mới"}
        description={
          currentDoctor
            ? "Thực hiện thay đổi cho bác sĩ tại đây. Nhấn lưu khi hoàn tất."
            : "Thêm một bác sĩ mới. Nhấn lưu khi hoàn tất."
        }
      >
        <DoctorForm
          formState={formState}
          departments={departments}
          positions={positions}
          loading={isFormLoading}
          isContentModalOpen={isContentModalOpen}
          setIsContentModalOpen={setIsContentModalOpen}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handlePositionChange={handlePositionChange}
          handleContentSave={handleContentSave}
          handleSubmit={handleSubmit}
          currentDoctor={currentDoctor}
          setIsSheetOpen={setIsSheetOpen}
        />
      </EditModal>
    </div>
  );
}