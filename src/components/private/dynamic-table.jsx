import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

/**
 * Component bảng linh hoạt để hiển thị các loại dữ liệu khác nhau.
 *
 * @param {object} props - Các props của component.
 * @param {Array<string>} props.headers - Mảng các chuỗi cho tiêu đề cột của bảng.
 * @param {Array<object>} props.data - Mảng dữ liệu để hiển thị trong bảng.
 * @param {(item: object, index: number) => React.ReactNode} props.renderRow - Hàm render từng hàng dữ liệu.
 * @param {string} props.emptyMessage - Thông báo hiển thị khi không có dữ liệu.
 * @param {number} props.colSpan - Số cột để phủ khi hiển thị emptyMessage.
 */
const DynamicTable = ({ headers, data, renderRow, emptyMessage, colSpan }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* Render tiêu đề cột */}
          {headers.map((header, index) => (
            <TableHead key={index} className={index === headers.length - 1 ? "text-right" : ""}>
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Kiểm tra xem có dữ liệu không */}
        {data.length ? (
          // Nếu có dữ liệu, render từng hàng bằng hàm renderRow
          data.map((item, index) => renderRow(item, index))
        ) : (
          // Nếu không có dữ liệu, hiển thị thông báo trống
          <TableRow>
            <TableCell colSpan={colSpan} className="h-24 text-center">
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DynamicTable;
