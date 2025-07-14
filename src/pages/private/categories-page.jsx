import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Package } from "lucide-react"

const CategoriesPage = () => {
  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Quản lý danh mục
          </CardTitle>
          <CardDescription>Organize and manage different categories for articles, doctors, etc.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Nội dung quản lý danh mục sẽ ở đây. Bạn có thể thêm form để tạo danh mục mới và bảng để hiển thị các danh
            mục hiện có.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default CategoriesPage
