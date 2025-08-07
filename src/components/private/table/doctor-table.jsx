import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import DoctorRow from "@/components/private/row/doctor-row";

const DoctorTable = ({ doctors, onEdit, onToggleActive, onDelete }) => (
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
      {doctors.length ? (
        doctors.map((doctor) => (
          <DoctorRow
            key={doctor.id}
            doctor={doctor}
            onEdit={onEdit}
            onToggleActive={onToggleActive}
            onDelete={onDelete}
          />
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
);

export default DoctorTable;