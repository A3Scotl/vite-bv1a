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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

import { handleFetch } from "@/utils/fetch-helper";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    // slug: "",
    description: "",
    thumbnailFile: null,
    thumbnail: "",
    active: true,
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    handleFetch({
        apiCall: departmentApi.getAll,
        setData: setDepartments,
        setLoading,
        errorMessage: "Failed to fetch department",
      });
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked, files } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleOpenSheet = (department = null) => {
    setCurrentDepartment(department);
    if (department) {
      setFormState({
        name: department.name,
        // slug: department.slug,
        description: department.description,
        thumbnailFile: null,
        thumbnail: department.thumbnail || "",
        active: department.active,
      });
    } else {
      setFormState({
        name: "",
        // slug: "",
        description: "",
        thumbnailFile: null,
        thumbnail: "",
        active: true,
      });
    }
    setIsSheetOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", formState.name);
    // formData.append("slug", formState.slug);
    formData.append("description", formState.description);
    formData.append("isActive", formState.active);
    if (formState.thumbnailFile) {
      formData.append("thumbnail", formState.thumbnailFile);
    }

    const response = currentDepartment
      ? await departmentApi.update(currentDepartment.id, formData)
      : await departmentApi.create(formData);

    if (response.success) {
      toast.success(response.message);
      setIsSheetOpen(false);
      fetchDepartments();
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      setLoading(true);
      const response = await departmentApi.delete(id);
      if (response.success) {
        toast.success(response.message);
        fetchDepartments();
      } else {
        toast.error(response.message);
      }
      setLoading(false);
    }
  };

  const handleToggleActive = async (id) => {
    setLoading(true);
    const response = await departmentApi.hide(id);
    if (response.success) {
      toast.success(response.message);
      fetchDepartments();
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  const handleContentSave = (newContent) => {
    setFormState((prev) => ({ ...prev, description: newContent }));
    setIsContentModalOpen(false);
  };

  if (loading && (!departments || !departments.length)) return <LoadingPage />;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Quản lý phòng ban
          </CardTitle>
          <Button onClick={() => handleOpenSheet()} size="sm">
            <Plus className="w-4 h-4 mr-2" /> Thêm phòng ban mới
          </Button>
        </CardHeader>
        <CardDescription className="px-6">
          Tạo, chỉnh sửa và quản lý các phòng ban cho bệnh viện.
        </CardDescription>
        <CardContent className="pt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tên</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Hình ảnh</TableHead>
                  <TableHead>Hoạt động</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.length > 0 ? (
                  departments.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell className="font-medium">
                        {department.id}
                      </TableCell>
                      <TableCell>{department.name}</TableCell>
                      <TableCell>{department.slug}</TableCell>
                      <TableCell>
                        {department.thumbnail ? (
                          <img
                            src={department.thumbnail}
                            alt={department.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell>
                        {department.active ? (
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
                              onClick={() => handleOpenSheet(department)}
                            >
                              <Edit className="w-4 h-4 mr-2" /> Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleToggleActive(department.id)}
                            >
                              {department.active ? (
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
                              onClick={() => handleDelete(department.id)}
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
                    <TableCell colSpan={6} className="h-24 text-center">
                      Không tìm thấy phòng ban.
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

          {/* <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={formState.slug}
              onChange={handleInputChange}
              required
            />
          </div> */}

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

export default Departments;
