"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { departmentApi } from "@/apis/department-api";
import { doctorApi } from "@/apis/doctor-api";
import PageHeader from "@/components/private/page-header";
import TableSkeleton from "@/components/private/table/table-skeleton";
import { EditModal } from "@/components/common/edit-modal";
import { handleFetch } from "@/utils/fetch-helper";
import DoctorTable from "@/components/private/table/doctor-table";
import Pagination from "@/components/common/pagination";
import DoctorForm from "@/components/private/form/doctor-form";
import { motion, AnimatePresence } from "framer-motion";
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [positionsLoading, setPositionsLoading] = useState(true);
  const [departmentsLoading, setDepartmentsLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [formState, setFormState] = useState({
    fullName: "",
    description: "",
    avatar: null,
    avatarUrl: "",
    departmentId: "",
    position: "",
    isActive: true,
  });

  const fetchDoctors = useCallback(async (page = 1) => {
    setIsTableLoading(true);
    await handleFetch({
      apiCall: () => doctorApi.getAll({ page: page - 1, size: 5 }),
      setData: (data) => {
        setDoctors(data.content || []);
        setTotalPages(Number.isInteger(data.totalPages) ? data.totalPages : 1);
      },
      setLoading: setIsTableLoading,
      errorMessage: "Không thể tải danh sách bác sĩ",
    });
  }, []);

  const fetchDepartments = useCallback(async () => {
    await handleFetch({
      apiCall: departmentApi.getAllActive,
      setData: (data) => setDepartments(data.content || []),
      setLoading: setDepartmentsLoading,
      errorMessage: "Không thể tải danh sách phòng ban",
    });
  }, []);

  const fetchPositions = useCallback(async () => {
    await handleFetch({
      apiCall: doctorApi.getAllPositions,
      setData: setPositions,
      setLoading: setPositionsLoading,
      errorMessage: "Không thể tải danh sách chức vụ",
    });
  }, []);

  useEffect(() => {
    Promise.all([
      fetchDoctors(currentPage),
      fetchDepartments(),
      fetchPositions(),
    ]).catch((error) => toast.error("Lỗi khi tải dữ liệu: " + error.message));
  }, [fetchDoctors, fetchDepartments, fetchPositions, currentPage]);

  const handleInputChange = useCallback((e) => {
    const { id, value, type, checked, files } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  }, []);

  const handleSelectChange = useCallback((value) => {
    setFormState((prev) => ({ ...prev, departmentId: value }));
  }, []);

  const handlePositionChange = useCallback((value) => {
    setFormState((prev) => ({ ...prev, position: value }));
  }, []);

  const handleOpenSheet = useCallback((doctor = null) => {
    setLoading(false);
    setCurrentDoctor(doctor);
    setFormState(
      doctor
        ? {
            fullName: doctor.fullName,
            description: doctor.description || "",
            avatar: null,
            avatarUrl: doctor.avatarUrl || "",
            departmentId: doctor.department
              ? doctor.department.id.toString()
              : "",
            position: doctor.position || "",
            isActive: doctor.isActive,
          }
        : {
            fullName: "",
            description: "",
            avatar: null,
            avatarUrl: "",
            departmentId: "",
            position: "",
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
      formData.append("fullName", formState.fullName);
      formData.append("description", formState.description);
      formData.append("departmentId", formState.departmentId);
      formData.append("position", formState.position);
      formData.append("isActive", formState.isActive.toString());
      if (formState.avatar) formData.append("avatarFile", formState.avatar);
      else if (formState.avatarUrl)
        formData.append("avatarUrl", formState.avatarUrl);

      const response = currentDoctor
        ? await doctorApi.update(currentDoctor.id, formData)
        : await doctorApi.create(formData);

      if (response.success) {
        toast.success(response.message);
        setFormState({
          fullName: "",
          description: "",
          avatar: null,
          avatarUrl: "",
          departmentId: "",
          position: "",
          isActive: true,
        });
        setIsSheetOpen(false);
        await fetchDoctors();
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    },
    [currentDoctor, formState, fetchDoctors]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm("Bạn có chắc muốn xóa bác sĩ này?")) {
        setLoading(true);
        const response = await doctorApi.delete(id);
        if (response.success) {
          toast.success(response.message);
          await fetchDoctors();
        } else {
          toast.error(response.message);
        }
        setLoading(false);
      }
    },
    [fetchDoctors]
  );

  const handleToggleActive = useCallback(
    async (id) => {
      setLoading(true);
      const response = await doctorApi.hide(id);
      if (response.success) {
        toast.success(response.message);
        await fetchDoctors();
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    },
    [fetchDoctors]
  );

  const handleContentSave = useCallback((newContent) => {
    setFormState((prev) => ({ ...prev, description: newContent }));
    setIsContentModalOpen(false);
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <PageHeader
          title="Quản lý bác sĩ"
          description="Tạo, chỉnh sửa và quản lý thông tin bác sĩ cho bệnh viện."
          icon={FileText}
          onAdd={() => handleOpenSheet()}
        />
        <CardContent className="pt-4">
          <div>
            <AnimatePresence mode="wait">
              {isTableLoading && doctors.length === 0 ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TableSkeleton headers={["", "", "", ""]} rows={5} />
                </motion.div>
              ) : (
                <motion.div
                  key={`page-${currentPage}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <DoctorTable
                    doctors={doctors}
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
        title={currentDoctor ? "Chỉnh sửa bác sĩ" : "Thêm bác sĩ mới"}
        description={
          currentDoctor
            ? "Thực hiện thay đổi cho bác sĩ tại đây. Nhấn lưu khi hoàn tất."
            : "Thêm một bác sĩ mới. Nhấn lưu khi hoàn tất."
        }
      >
        <DoctorForm
          formState={formState}
          positions={positions}
          departments={departments}
          positionsLoading={positionsLoading}
          departmentsLoading={departmentsLoading}
          isContentModalOpen={isContentModalOpen}
          setIsContentModalOpen={setIsContentModalOpen}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handlePositionChange={handlePositionChange}
          handleContentSave={handleContentSave}
          handleSubmit={handleSubmit}
          loading={loading}
          setIsSheetOpen={setIsSheetOpen}
          currentDoctor={currentDoctor}
        />
      </EditModal>
    </div>
  );
};

export default Doctors;
