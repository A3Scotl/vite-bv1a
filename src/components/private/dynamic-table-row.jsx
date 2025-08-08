"use client";

import { memo } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Edit, EyeOff, Eye, ImageIcon } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";

/**
 * Một component hàng trong bảng linh hoạt, có thể hiển thị dữ liệu và các hành động
 * khác nhau tùy thuộc vào props.
 * @param {object} data - Dữ liệu của hàng (ví dụ: cuộc hẹn, bác sĩ).
 * @param {Array<object>} cells - Mảng các đối tượng mô tả các ô (TableCell) cần hiển thị.
 * @param {Array<object>} actions - Mảng các đối tượng mô tả các hành động trong DropdownMenu.
 */
const DynamicTableRow = memo(({ data, cells, actions }) => {
  const renderCellContent = (cell) => {
    switch (cell.type) {
      case "status": {
        const { getStatus, getStatusClass } = cell;
        const status = getStatus(data);
        return (
          <span className={getStatusClass(data)}>
            {status}
          </span>
        );
      }
      case "image": {
        const { getImageUrl, altText } = cell;
        const imageUrl = getImageUrl(data);
        return imageUrl ? (
          <img
            src={imageUrl}
            alt={altText(data)}
            className="w-12 h-12 object-cover rounded-md"
            loading="lazy"
          />
        ) : (
          <ImageIcon className="w-8 h-8 text-muted-foreground" />
        );
      }
      case "date": {
        const { value } = cell;
        return new Date(value(data)).toLocaleDateString("vi-VN");
      }
      default:
        return cell.value(data);
    }
  };

  return (
    <TableRow>
      {cells.map((cell, index) => (
        <TableCell key={index} className={cell.className}>
          {renderCellContent(cell)}
        </TableCell>
      ))}
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Mở menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {actions.map((action, index) => (
              <DropdownMenuItem
                key={action.key || index} // Sử dụng key nếu có, hoặc index nếu không có
                onClick={() => action.onClick(data)}
                className={action.className}
              >
                {action.icon}
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
});

export default DynamicTableRow;
