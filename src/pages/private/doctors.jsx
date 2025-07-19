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
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileText,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  EyeOff,
  Eye,
  ImageIcon,
} from "lucide-react";

import { departmentApi } from "@/apis/department-api";
import LoadingPage from "@/pages/common/loading-page";
import ContentEditModal from "@/components/common/content-edit-modal";
import { EditModal } from "@/components/common/edit-modal";
import { doctorApi } from "@/apis/doctor-api";
import { handleFetch } from "@/utils/fetch-helper";

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
  const [formState, setFormState] = useState({
    fullName: "",
    description: "",
    avatar: null,
    avatarUrl: "",
    departmentId: "",
    position: "",
    active: true,
  });

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
    fetchPositions();
  }, []);

  const fetchPositions = () => {
    handleFetch({
      apiCall: doctorApi.getAllPositions,
      setData: (data) => {
        setPositions(data);
      },
      setLoading: setPositionsLoading,
      errorMessage: "Failed to fetch positions",
    });
  };

  const fetchDoctors = () => {
    handleFetch({
      apiCall: doctorApi.getAll,
      setData: setDoctors,
      setLoading,
      errorMessage: "Failed to fetch doctors",
    });
  };

  const fetchDepartments = () => {
    handleFetch({
      apiCall: departmentApi.getAllActive,
      setData: setDepartments,
      setLoading: setDepartmentsLoading,
      errorMessage: "Failed to fetch departments",
    });
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked, files } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormState((prev) => ({ ...prev, departmentId: value }));
  };

  const handlePositionChange = (value) => {
    setFormState((prev) => ({ ...prev, position: value }));
  };

  const handleOpenSheet = (doctor = null) => {
    setCurrentDoctor(doctor);
    if (doctor) {
      setFormState({
        fullName: doctor.fullName,
        description: doctor.description,
        avatar: null,
        avatarUrl: doctor.avatarUrl || "",
        departmentId: doctor.department ? doctor.department.id.toString() : "",
        position: doctor.position,
        active: doctor.active,
      });
    } else {
      setFormState({
        fullName: "",
        description: "",
        avatar: null,
        avatarUrl: "",
        departmentId: "",
        position: "",
        active: true,
      });
    }
    setIsSheetOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullName", formState.fullName);
    formData.append("description", formState.description);
    formData.append("departmentId", formState.departmentId);
    formData.append("position", formState.position);
    formData.append("isActive", formState.active);
    if (formState.avatar) {
      formData.append("avatarFile", formState.avatar); // Use avatarFile for new uploads
    } else if (formState.avatarUrl) {
      formData.append("avatarUrl", formState.avatarUrl); // Preserve existing avatarUrl
    }

    // Log FormData entries
    console.log("FormData entries for update:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    const response = currentDoctor
      ? await doctorApi.update(currentDoctor.id, formData)
      : await doctorApi.create(formData);

    console.log("Response:", response);
    if (response.success) {
      toast.success(response.message);
      setFormState({
        fullName: "",
        description: "",
        avatar: null,
        avatarUrl: "",
        departmentId: "",
        position: "",
        active: true,
      });
      setIsSheetOpen(false);
      fetchDoctors();
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  }; 

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      setLoading(true);
      const response = await doctorApi.delete(id);
      if (response.success) {
        toast.success(response.message);
        fetchDoctors();
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    }
  };

  const handleToggleActive = async (id) => {
    setLoading(true);
    const response = await doctorApi.hide(id);
    if (response.success) {
      toast.success(response.message);
      fetchDoctors();
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  const handleContentSave = (newContent) => {
    setFormState((prev) => ({ ...prev, description: newContent }));
    setIsContentModalOpen(false);
  };

  if (loading && (!doctors || !doctors.length)) return <LoadingPage />;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Quản lý bác sĩ
          </CardTitle>
          <Button onClick={() => handleOpenSheet()} size="sm">
            <Plus className="w-4 h-4 mr-2" /> Thêm bác sĩ mới
          </Button>
        </CardHeader>
        <CardDescription className="px-6">
          Tạo, chỉnh sửa và quản lý thông tin bác sĩ cho bệnh viện.
        </CardDescription>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Phòng ban</TableHead>
                  <TableHead>Ảnh đại diện</TableHead>
                  <TableHead>Hoạt động</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.length > 0 ? (
                  doctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell className="font-medium">{doctor.id}</TableCell>
                      <TableCell>{doctor.fullName}</TableCell>
                      <TableCell>{doctor.slug}</TableCell>
                      <TableCell>
                        {doctor.department ? doctor.department.name : "N/A"}
                      </TableCell>
                      <TableCell>
                        {doctor.avatarUrl ? (
                          <img
                            src={doctor.avatarUrl || "/placeholder.svg"}
                            alt={doctor.fullName}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell>
                        {doctor.active ? (
                          <span className="text-green-600">Hoạt động</span>
                        ) : (
                          <span className="text-red-600">Ẩn</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Mở menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleOpenSheet(doctor)}
                            >
                              <Edit className="w-4 h-4 mr-2" /> Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleActive(doctor.id)}
                            >
                              {doctor.active ? (
                                <>
                                  <EyeOff className="w-4 h-4 mr-2" /> Ẩn
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4 mr-2" /> Hiện
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(doctor.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" /> Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Không tìm thấy bác sĩ.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
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
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Họ tên</Label>
            <Input
              id="fullName"
              value={formState.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="positionId">Vị trí</Label>
            {positionsLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select
                value={formState.position}
                onValueChange={handlePositionChange}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vị trí" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="departmentId">Phòng ban</Label>
            {departmentsLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select
                value={formState.departmentId}
                onValueChange={handleSelectChange}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phòng ban" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((department) => (
                    <SelectItem
                      key={department.id}
                      value={department.id.toString()}
                    >
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Mô tả</Label>
            <Button
              type="button"
              variant="outline"
              className="w-full mb-2 flex items-center gap-2 bg-transparent"
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
            <Label htmlFor="avatar">Ảnh đại diện</Label>
            <Input
              id="avatar"
              type="file"
              onChange={handleInputChange}
              accept="image/*"
            />
            {formState.avatarUrl && !formState.avatar && (
              <img
                src={formState.avatarUrl || "/placeholder.svg"}
                alt="Ảnh đại diện hiện tại"
                className="w-24 h-24 object-cover rounded-md mt-2"
              />
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              checked={formState.active}
              onCheckedChange={(checked) =>
                setFormState((prev) => ({ ...prev, active: !!checked }))
              }
            />
            <Label htmlFor="active">Hoạt động</Label>
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

export default Doctors;
