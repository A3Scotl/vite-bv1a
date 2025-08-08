import DynamicTable from "@/components/private/dynamic-table";
import DynamicTableRow from "@/components/private/dynamic-table-row";
import { Trash2 } from "lucide-react";

const AppointmentTable = ({ appointments, onDelete }) => {
  const headers = [
    "Họ tên",
    "Số điện thoại",
    "Ngày khám",
    "Khung giờ",
    "Ghi chú",
    "Trạng thái",
    "Hành động",
  ];

  const renderAppointmentRow = (appointment) => (
    <DynamicTableRow
      key={appointment.id}
      data={appointment}
      cells={[
        { value: (item) => item.fullName },
        { value: (item) => item.phone },
        { type: "date", value: (item) => item.date }, 
        { value: (item) => item.timeSlot },
        { value: (item) => item.note || "N/A" },
        {
          type: "status",
          getStatus: (item) => item.status,
          getStatusClass: (item) =>
            item.status === "PENDING"
              ? "text-yellow-600"
              : item.status === "CONFIRMED"
              ? "text-green-600"
              : "text-red-600",
        },
      ]}
      actions={[
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
      data={appointments}
      renderRow={renderAppointmentRow}
      emptyMessage="Không tìm thấy lịch hẹn."
      colSpan={headers.length} 
    />
  );
};

export default AppointmentTable;
