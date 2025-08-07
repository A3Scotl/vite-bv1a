import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import DepartmentRow from "@/components/private/row/department-row";

const DepartmentTable = ({ departments, onEdit, onToggleActive, onDelete }) => (
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
      {departments.length ? (
        departments.map((department) => (
          <DepartmentRow
            key={department.id}
            department={department}
            onEdit={onEdit}
            onToggleActive={onToggleActive}
            onDelete={onDelete}
          />
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
);

export default DepartmentTable;