import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";
import ContentEditModal from "@/components/common/content-edit-modal";

/**
 * Component form linh hoạt để tạo các form khác nhau.
 *
 * @param {object} props - Các props của component.
 * @param {object} props.formState - Đối tượng chứa trạng thái hiện tại của form.
 * @param {Array<object>} props.fields - Mảng các đối tượng mô tả các trường form.
 * @param {function} props.handleSubmit - Hàm xử lý khi submit form.
 * @param {boolean} props.loading - Trạng thái loading của form.
 * @param {function} props.onCancel - Hàm xử lý khi hủy form.
 */
const DynamicForm = ({
  formState,
  fields,
  handleSubmit,
  loading,
  onCancel,
}) => {
  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {fields.map((field, index) => (
        <div key={index} className="grid gap-2">
          {field.label && <Label htmlFor={field.id}>{field.label}</Label>}

          {field.type === "input" &&
            (field.inputType === "file" ? (
              <Input
                id={field.id}
                type="file"
                name={field.name}
                accept={field.accept}
                onChange={field.onChange}
                required={field.required}
              />
            ) : (
              <Input
                id={field.id}
                value={formState[field.name] || ""}
                onChange={field.onChange}
                type={field.inputType || "text"}
                accept={field.accept}
                required={field.required}
              />
            ))}

          {field.type === "select" &&
            (field.loading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select
                value={formState[field.name]}
                onValueChange={field.onValueChange}
                required={field.required}
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}

          {field.type === "content-editor" && (
            <>
              <Button
                type="button"
                variant="outline"
                className="w-full mb-2 flex items-center gap-2 bg-transparent"
                onClick={field.onClick}
              >
                <FileText className="w-4 h-4" />
                {field.buttonText}
              </Button>
              <ContentEditModal
                content={formState[field.name]}
                onSave={field.onSave}
                isOpen={field.isOpen}
                onClose={field.onClose}
              />
            </>
          )}

          {field.type === "file-preview" &&
            formState[field.previewUrlField] &&
            !formState[field.fileField] && (
              <img
                src={formState[field.previewUrlField] || "/placeholder.svg"}
                alt={field.previewAltText}
                className="w-24 h-24 object-cover rounded-md mt-2"
                loading="lazy"
              />
            )}
        </div>
      ))}

      <div className="flex justify-end gap-4 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
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
};

export default DynamicForm;
