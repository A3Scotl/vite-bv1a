import DynamicTable from "@/components/private/dynamic-table";
import DynamicTableRow from "@/components/private/dynamic-table-row";
import { Edit, Trash2, EyeOff, Eye } from "lucide-react";

const DepartmentTable = ({ departments, onEdit, onToggleActive, onDelete }) => {
  const headers = [
    "Tên",
    "Hình ảnh",
    "Hoạt động",
    "Hành động", 
  ];

  const renderDepartmentRow = (department) => (
    <DynamicTableRow
      key={department.id}
      data={department}
      cells={[
        { value: (item) => item.name },
        {
          type: "image",
          getImageUrl: (item) => item.thumbnail,
          altText: (item) => item.name,
        },
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
          label: department.isActive ? "Ẩn" : "Hiện",
          onClick: (item) => onToggleActive(item.id),
          icon: department.isActive ? (
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
      data={departments}
      renderRow={renderDepartmentRow}
      emptyMessage="Không tìm thấy phòng ban."
      colSpan={headers.length}
    />
  );
};

export default DepartmentTable;
