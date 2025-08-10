"use client";

import { createContext, useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { doctorApi } from "@/apis/doctor-api";
import { departmentApi } from "@/apis/department-api";
import { handleFetch } from "@/utils/fetch-helper";

export const DoctorContext = createContext(null);

const DEFAULT_FORM_STATE = {
  fullName: "",
  description: "",
  avatar: null,
  avatarUrl: "",
  departmentId: "",
  position: "",
  isActive: true,
};

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [prevDoctors, setPrevDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [formState, setFormState] = useState(DEFAULT_FORM_STATE);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterPosition, setFilterPosition] = useState("all");

  const fetchDoctors = useCallback(
    async (page = 1, filters = {}) => {
      setIsTableLoading(true);
      await handleFetch({
        apiCall: () =>
          doctorApi.getAll({
            page: page - 1,
            size: 5,
            fullName: filters.searchQuery || undefined,
            isActive:
              filters.filterStatus !== "all"
                ? filters.filterStatus === "ACTIVE"
                : undefined,
            departmentId:
              filters.filterDepartment !== "all"
                ? filters.filterDepartment
                : undefined,
            position:
              filters.filterPosition !== "all"
                ? filters.filterPosition
                : undefined,
          }),
        setData: (data) => {
          const sortedDoctors = (data.content || []).sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPrevDoctors(doctors);
          setDoctors(sortedDoctors);
          setTotalPages(
            Number.isInteger(data.totalPages) && data.totalPages > 0
              ? data.totalPages
              : 1
          );
          setCurrentPage(page);
        },
        setLoading: setIsTableLoading,
        errorMessage: "Không thể tải danh sách bác sĩ",
      });
    },
    []
  );

  const fetchDepartments = useCallback(async () => {
    await handleFetch({
      apiCall: departmentApi.getAllActive,
      setData: (data) => setDepartments(data.content || []),
      setLoading: setIsTableLoading,
      errorMessage: "Không thể tải danh sách phòng ban",
    });
  }, []);

  const fetchPositions = useCallback(async () => {
    await handleFetch({
      apiCall: doctorApi.getAllPositions,
      setData: (data) =>
        setPositions(
          Array.isArray(data)
            ? data.map((pos) => ({
                id: pos,
                name: pos
                  .replace("_", " ")
                  .toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase()),
              }))
            : []
        ),
      setLoading: setIsTableLoading,
      errorMessage: "Không thể tải danh sách chức vụ",
    });
  }, []);

  useEffect(() => {
    fetchDoctors(1, { searchQuery, filterStatus, filterDepartment, filterPosition });
    fetchDepartments();
    fetchPositions();
  }, [fetchDoctors, fetchDepartments, fetchPositions, searchQuery, filterStatus, filterDepartment, filterPosition]);

  const handleOpenSheet = useCallback((doctor = null) => {
    setCurrentDoctor(doctor);
    setFormState(
      doctor
        ? {
            fullName: doctor.fullName,
            description: doctor.description || "",
            avatar: null,
            avatarUrl: doctor.avatarUrl || "",
            departmentId: doctor.department ? doctor.department.id.toString() : "",
            position: doctor.position || "",
            isActive: doctor.isActive,
          }
        : DEFAULT_FORM_STATE
    );
    setIsSheetOpen(true);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsFormLoading(true);
      const formData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });
      if (!formState.avatar) formData.delete("avatarFile");
      try {
        const response = currentDoctor
          ? await doctorApi.update(currentDoctor.id, formData)
          : await doctorApi.create(formData);
        if (response.success) {
          toast.success(response.message);
          setIsSheetOpen(false);
          setFormState(DEFAULT_FORM_STATE);
          await fetchDoctors(1, { searchQuery, filterStatus, filterDepartment, filterPosition });
        } else {
          toast.error(response.message || "Đã xảy ra lỗi");
        }
      } catch (error) {
        toast.error("Lỗi khi lưu bác sĩ: " + error.message);
      } finally {
        setIsFormLoading(false);
      }
    },
    [currentDoctor, formState, fetchDoctors, searchQuery, filterStatus, filterDepartment, filterPosition]
  );

  const handleToggleActive = useCallback(
    async (id) => {
      setIsTableLoading(true);
      const response = await doctorApi.hide(id);
      if (response.success) {
        toast.success(response.message);
        await fetchDoctors(currentPage, {
          searchQuery,
          filterStatus,
          filterDepartment,
          filterPosition,
        });
      } else {
        toast.error(response.message);
      }
      setIsTableLoading(false);
    },
    [fetchDoctors, currentPage, searchQuery, filterStatus, filterDepartment, filterPosition]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm("Bạn có chắc muốn xóa bác sĩ này?")) return;
      setIsTableLoading(true);
      try {
        const response = await doctorApi.delete(id);
        if (response.success) {
          toast.success(response.message);
          await fetchDoctors(currentPage, {
            searchQuery,
            filterStatus,
            filterDepartment,
            filterPosition,
          });
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Lỗi khi xóa bác sĩ: " + error.message);
      } finally {
        setIsTableLoading(false);
      }
    },
    [fetchDoctors, currentPage, searchQuery, filterStatus, filterDepartment, filterPosition]
  );

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

  const handleContentSave = useCallback((newContent) => {
    setFormState((prev) => ({ ...prev, description: newContent }));
    setIsContentModalOpen(false);
  }, []);

  return (
    <DoctorContext.Provider
      value={{
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
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

export default DoctorProvider;