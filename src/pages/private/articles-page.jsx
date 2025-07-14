import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText } from "lucide-react"

const ArticlesPage = () => {
  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Quản lý bài viết
          </CardTitle>
          <CardDescription>Create, edit, and publish articles for your website.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Nội dung quản lý bài viết sẽ ở đây. Bạn có thể thêm trình soạn thảo văn bản, công cụ quản lý hình ảnh, và
            bảng để hiển thị các bài viết.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default ArticlesPage
