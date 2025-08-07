import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import AppointmentRow from "@/components/private/row/appointment-row";

const AppointmentTable = ({ appointments, onDelete }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Họ tên</TableHead>
        <TableHead>Số điện thoại</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Ngày khám</TableHead>
        <TableHead>Khung giờ</TableHead>
        <TableHead>Ghi chú</TableHead>
        <TableHead>Trạng thái</TableHead>
        <TableHead className="text-right">Hành động</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {appointments.length ? (
        appointments.map((appointment) => (
          <AppointmentRow
            key={appointment.id}
            appointment={appointment}
            onDelete={onDelete}
          />
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={9} className="h-24 text-center">
            Không tìm thấy lịch hẹn.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default AppointmentTable;