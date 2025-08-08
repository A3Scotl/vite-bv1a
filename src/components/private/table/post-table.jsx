import DynamicTable from "@/components/private/dynamic-table";
import DynamicTableRow from "@/components/private/dynamic-table-row";
import { Edit, Trash2, EyeOff, Eye } from "lucide-react";

const PostTable = ({ posts, onEdit, onToggleActive, onDelete }) => {
  const headers = [
    "ID",
    "Tiêu đề",
    "Thể loại",
    "Hình ảnh",
    "Trạng thái",
    "Hành động", 
  ];

  const renderPostRow = (post) => (
    <DynamicTableRow
      key={post.id}
      data={post}
      cells={[
        { value: (item) => item.id, className: "font-medium" },
        { value: (item) => item.title },
        { value: (item) => item.type },
        {
          type: "image",
          getImageUrl: (item) => item.thumbnailUrl,
          altText: (item) => item.title,
        },
        {
          type: "status",
          getStatus: (item) => item.status,
          getStatusClass: (item) => (item.status === "PRIVATE" ? "text-red-600" : "text-green-600"),
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
          key: "toggle-status",
          label: post.status === "PRIVATE" ? "Công khai" : "Ẩn",
          onClick: (item) => onToggleActive(item.id),
          icon: post.status === "PRIVATE" ? (
            <Eye className="w-4 h-4 mr-2" />
          ) : (
            <EyeOff className="w-4 h-4 mr-2" />
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
      data={posts}
      renderRow={renderPostRow}
      emptyMessage="Không tìm thấy bài viết."
      colSpan={headers.length}
    />
  );
};

export default PostTable;
