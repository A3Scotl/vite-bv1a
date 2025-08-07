"use client";

import { memo } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table"; // Thêm dòng này nếu thiếu

const AppointmentRow = memo(({ appointment, onDelete }) => (
  <TableRow>
    <TableCell className="font-medium">{appointment.id}</TableCell>
    <TableCell>{appointment.fullName}</TableCell>
    <TableCell>{appointment.phone}</TableCell>
    <TableCell>{appointment.email}</TableCell>
    <TableCell>{new Date(appointment.date).toLocaleDateString("vi-VN")}</TableCell>
    <TableCell>{appointment.timeSlot}</TableCell>
    <TableCell>{appointment.note || "N/A"}</TableCell>
    <TableCell>
      <span
        className={
          appointment.status === "PENDING"
            ? "text-yellow-600"
            : appointment.status === "CONFIRMED"
            ? "text-green-600"
            : "text-red-600"
        }
      >
        {appointment.status}
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
          <DropdownMenuItem onClick={() => onDelete(appointment.id)} className="text-red-600">
            <Trash2 className="w-4 h-4 mr-2" /> Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
));

export default AppointmentRow;