import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";
import ContentEditModal from "@/components/common/content-edit-modal";

const DoctorForm = ({
  formState,
  positions,
  departments,
  positionsLoading,
  departmentsLoading,
  isContentModalOpen,
  setIsContentModalOpen,
  handleInputChange,
  handleSelectChange,
  handlePositionChange,
  handleContentSave,
  handleSubmit,
  loading,
  setIsSheetOpen,
  currentDoctor,
}) => (
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
        <Select value={formState.position} onValueChange={handlePositionChange} required>
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
        <Select value={formState.departmentId} onValueChange={handleSelectChange} required>
          <SelectTrigger>
            <SelectValue placeholder="Chọn phòng ban" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((department) => (
              <SelectItem key={department.id} value={department.id.toString()}>
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
          loading="lazy"
        />
      )}
    </div>

    <div className="flex items-center space-x-2">
      <Checkbox
        id="active"
        checked={formState.active}
        onCheckedChange={(checked) =>
          handleInputChange({ target: { id: "active", type: "checkbox", checked } })
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
);

export default DoctorForm;