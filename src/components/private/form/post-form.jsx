import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";
import ContentEditModal from "@/components/common/content-edit-modal";

const PostForm = ({
  formState,
  postTypes,
  loading,
  isContentModalOpen,
  setIsContentModalOpen,
  handleInputChange,
  handleSelectType,
  handleContentSave,
  handleStatusToggle,
  handleSubmit,
  currentPost,
  setIsSheetOpen,
}) => (
  <form onSubmit={handleSubmit} className="grid gap-4">
    <div className="grid gap-2">
      <Label htmlFor="title">Tiêu đề</Label>
      <Input
        id="title"
        value={formState.title}
        onChange={handleInputChange}
        required
      />
    </div>

    <div className="grid gap-2">
      <Label>Nội dung</Label>
      <Button
        type="button"
        variant="outline"
        className="w-full mb-2 flex items-center gap-2 bg-transparent"
        onClick={() => setIsContentModalOpen(true)}
      >
        <FileText className="w-4 h-4" />
        Chỉnh sửa nội dung
      </Button>
      <ContentEditModal
        content={formState.content}
        onSave={handleContentSave}
        isOpen={isContentModalOpen}
        onClose={() => setIsContentModalOpen(false)}
      />
    </div>

    <div className="grid gap-2">
      <Label htmlFor="postType">Loại bài viết</Label>
      {loading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Select className="w-full" value={formState.type} onValueChange={handleSelectType} required>
          <SelectTrigger>
            <SelectValue placeholder="Chọn loại..." />
          </SelectTrigger>
          <SelectContent>
            {postTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>

    <div className="grid gap-2">
      <Label htmlFor="thumbnailFile">Hình ảnh đại diện</Label>
      <Input
        id="thumbnailFile"
        type="file"
        onChange={handleInputChange}
        accept="image/*"
      />
      {formState.thumbnailUrl && !formState.thumbnailFile && (
        <img
          src={formState.thumbnailUrl || "/placeholder.svg"}
          alt="Hình ảnh hiện tại"
          className="w-24 h-24 object-cover rounded-md mt-2"
          loading="lazy"
        />
      )}
    </div>

    {currentPost && (
      <div className="grid gap-2">
        <Label>Trạng thái</Label>
        <div className="flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              formState.status === "PUBLIC"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {formState.status}
          </span>
          <Button
            type="button"
            variant="outline"
            onClick={handleStatusToggle}
            className="ml-2 bg-transparent"
          >
            {formState.status === "PRIVATE" ? "Công khai" : "Ẩn bài viết"}
          </Button>
          {formState.status === "PUBLIC" && (
            <span className="text-xs text-gray-500 ml-4">
              Xuất bản lúc: {new Date(formState.publishedAt).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    )}

    <div className="flex justify-end gap-4 mt-6">
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsSheetOpen(false)}
        className="bg-gray-100 hover:bg-gray-200"
      >
        Hủy
      </Button>
      <Button type="submit" disabled={loading}>
        {loading ? "Đang lưu..." : "Lưu thay đổi"}
      </Button>
    </div>
  </form>
);

export default PostForm;