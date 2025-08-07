"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, ImageIcon } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";

const PostRow = ({ post, onEdit, onDelete }) => (
  <TableRow>
    <TableCell className="font-medium">{post.id}</TableCell>
    <TableCell>{post.title}</TableCell>
    <TableCell>{post.slug}</TableCell>
    <TableCell>
      {post.thumbnailUrl ? (
        <img
          src={post.thumbnailUrl}
          alt={post.title}
          className="w-12 h-12 object-cover rounded-md"
          loading="lazy"
        />
      ) : (
        <ImageIcon className="w-8 h-8 text-muted-foreground" />
      )}
    </TableCell>
    <TableCell>
      <span className={post.status === "PRIVATE" ? "text-red-600" : "text-green-600"}>
        {post.status}
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
          <DropdownMenuItem onClick={() => onEdit(post)}>
            <Edit className="w-4 h-4 mr-2" /> Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(post.id)} className="text-red-600">
            <Trash2 className="w-4 h-4 mr-2" /> Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
);

export default PostRow;