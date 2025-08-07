"use client";

import { memo } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, EyeOff, Eye, ImageIcon } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";

const DepartmentRow = memo(({ department, onEdit, onToggleActive, onDelete }) => (
  <TableRow>
    <TableCell className="font-medium">{department.id}</TableCell>
    <TableCell>{department.name}</TableCell>
    <TableCell>{department.slug}</TableCell>
    <TableCell>
      {department.thumbnail ? (
        <img
          src={department.thumbnail}
          alt={department.name}
          className="w-12 h-12 object-cover rounded-md"
          loading="lazy"
        />
      ) : (
        <ImageIcon className="w-8 h-8 text-muted-foreground" />
      )}
    </TableCell>
    <TableCell>
      <span className={department.active ? "text-green-600" : "text-red-600"}>
        {department.active ? "Hoạt động" : "Ẩn"}
      </span>
    </TableCell>
    <TableCell className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Mở menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onEdit(department)}>
            <Edit className="w-4 h-4 mr-2" /> Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onToggleActive(department.id)}>
            {department.active ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" /> Ẩn
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" /> Hiện
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(department.id)} className="text-red-600">
            <Trash2 className="w-4 h-4 mr-2" /> Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
));

export default DepartmentRow;