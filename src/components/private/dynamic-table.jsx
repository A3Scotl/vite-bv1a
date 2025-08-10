import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Input
} from "@/components/ui/input";
import {
  Select
} from "@/components/ui/select";
import React from "react";

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
    <div>

        <Table className="transition-all duration-300 ease-in-out">
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className={`transition-all duration-300 ease-in-out ${
                  index === headers.length - 1 ? "text-right" : ""
                }`}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length ? (
            data.map((item, index) =>
              React.cloneElement(renderRow(item, index), {
                className: "transition-all duration-300 ease-in-out",
              })
            )
          ) : (
            <TableRow>
              <TableCell
                colSpan={colSpan}
                className="h-24 text-center transition-all duration-300 ease-in-out"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DynamicTable;
