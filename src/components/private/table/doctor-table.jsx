import DynamicTable from "@/components/private/dynamic-table";
import DynamicTableRow from "@/components/private/dynamic-table-row";
import { Edit, Trash2, EyeOff, Eye } from "lucide-react";

const DoctorTable = ({ doctors, onEdit, onToggleActive, onDelete }) => {
  const headers = [
    "Họ tên",
    "Ảnh đại diện",
    "Phòng ban",
    "Chức vụ",
    "Hoạt động",
    "Hành động",
  ];

  const renderDoctorRow = (doctor) => (
    <DynamicTableRow
      key={doctor.id}
      data={doctor}
      cells={[

        { value: (item) => item.fullName },
        {
          type: "image",
          getImageUrl: (item) => item.avatarUrl,
          altText: (item) => item.fullName,
        },
        { value: (item) => (item.department ? item.department.name : "N/A") },
        { value: (item) => item.position },
        {
          type: "status",
          getStatus: (item) => (item.isActive ? "Đang hoạt động" : "Tạm ngưng hoạt động"),
          getStatusClass: (item) => (item.isActive ? "text-green-600" : "text-red-600"),
        },
      ]}
      actions={[
        {
          key: "edit",
          label: "Chỉnh sửa",
          onClick: (item) => onEdit(item),
          icon: <Edit className="w-4 h-4 mr-2" />,
        },
        {
          key: "toggle-active",
          label: doctor.isActive ? "Ẩn" : "Hiện",
          onClick: (item) => onToggleActive(item.id),
          icon: doctor.isActive ? (
            <EyeOff className="w-4 h-4 mr-2" />
          ) : (
            <Eye className="w-4 h-4 mr-2" />
          ),
        },
        {
          key: "delete",
          label: "Xóa",
          onClick: (item) => onDelete(item.id),
          icon: <Trash2 className="w-4 h-4 mr-2" />,
          className: "text-red-600",
        },
      ]}
    />
  );

  return (
    <DynamicTable
      headers={headers}
      data={doctors}
      renderRow={renderDoctorRow}
      emptyMessage="Không tìm thấy bác sĩ."
      colSpan={headers.length}
    />
  );
};

export default DoctorTable;
