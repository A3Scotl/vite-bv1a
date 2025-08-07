import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import PostRow from "@/components/private/row/post-row";

const PostTable = ({ posts, onEdit, onDelete }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Tiêu đề</TableHead>
        <TableHead>Slug</TableHead>
        <TableHead>Hình ảnh</TableHead>
        <TableHead>Trạng thái</TableHead>
        <TableHead className="text-right">Hành động</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {posts.length ? (
        posts.map((post) => (
          <PostRow
            key={post.id}
            post={post}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="h-24 text-center">
            Không tìm thấy bài viết.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

export default PostTable;