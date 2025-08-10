"use client";

import { createContext, useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { departmentApi } from "@/apis/department-api";
import { handleFetch } from "@/utils/fetch-helper";

export const DepartmentContext = createContext(null);

const DEFAULT_FORM_STATE = {
  name: "",
  description: "",
  thumbnailFile: null,
  thumbnail: "",
  isActive: true,
};

export const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [prevDepartments, setPrevDepartments] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [formState, setFormState] = useState(DEFAULT_FORM_STATE);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchDepartments = useCallback(
    async (page = 1, filters = {}) => {
      setIsTableLoading(true);
      await handleFetch({
        apiCall: () =>
          departmentApi.getAll({
            page: page - 1,
            size: 5,
            name: filters.searchQuery || undefined,
            isActive:
              filters.filterStatus !== "all"
                ? filters.filterStatus === "ACTIVE"
                : undefined,
          }),
        setData: (data) => {
          const sortedDepartments = (data.content || []).sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPrevDepartments(departments);
          setDepartments(sortedDepartments);
          setTotalPages(
            Number.isInteger(data.totalPages) && data.totalPages > 0
              ? data.totalPages
              : 1
          );
          setCurrentPage(page);
        },
        setLoading: setIsTableLoading,
        errorMessage: "Không thể tải danh sách phòng ban",
      });
    },
    []
  );

  useEffect(() => {
    fetchDepartments(1, { searchQuery, filterStatus });
  }, [fetchDepartments, searchQuery, filterStatus]);

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
      if (!formState.thumbnailFile) formData.delete("thumbnail");
      try {
        const response = currentDepartment
          ? await departmentApi.update(currentDepartment.id, formData)
          : await departmentApi.create(formData);
        if (response.success) {
          toast.success(response.message);
          setIsSheetOpen(false);
          setFormState(DEFAULT_FORM_STATE);
          await fetchDepartments(1, { searchQuery, filterStatus });
        } else {
          toast.error(response.message || "Đã xảy ra lỗi");
        }
      } catch (error) {
        toast.error("Lỗi khi lưu phòng ban: " + error.message);
      } finally {
        setIsFormLoading(false);
      }
    },
    [currentDepartment, formState, fetchDepartments, searchQuery, filterStatus]
  );

  const handleToggleActive = useCallback(
    async (id) => {
      setIsTableLoading(true);
      const response = await departmentApi.hide(id);
      if (response.success) {
        toast.success(response.message);
        await fetchDepartments(currentPage, { searchQuery, filterStatus });
      } else {
        toast.error(response.message);
      }
      setIsTableLoading(false);
    },
    [fetchDepartments, currentPage, searchQuery, filterStatus]
  );

  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm("Bạn có chắc muốn xóa phòng ban này?")) return;
      setIsTableLoading(true);
      try {
        const response = await departmentApi.delete(id);
        if (response.success) {
          toast.success(response.message);
          await fetchDepartments(currentPage, { searchQuery, filterStatus });
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Lỗi khi xóa phòng ban: " + error.message);
      } finally {
        setIsTableLoading(false);
      }
    },
    [fetchDepartments, currentPage, searchQuery, filterStatus]
  );

  const handleInputChange = useCallback((e) => {
    const { id, value, type, checked, files } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  }, []);

  const handleContentSave = useCallback((newContent) => {
    setFormState((prev) => ({ ...prev, description: newContent }));
    setIsContentModalOpen(false);
  }, []);

  return (
    <DepartmentContext.Provider
      value={{
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
      }}
    >
      {children}
    </DepartmentContext.Provider>
  );
};

export default DepartmentProvider;