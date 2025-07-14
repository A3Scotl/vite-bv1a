import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { User } from "lucide-react"

const DoctorsPage = () => {
  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Quản lý bác sĩ
          </CardTitle>
          <CardDescription>Manage doctor profiles, specialties, and availability.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Nội dung quản lý bác sĩ sẽ ở đây. Bạn có thể thêm form để thêm bác sĩ mới, bảng để hiển thị danh sách bác
            sĩ, và các tùy chọn chỉnh sửa/xóa.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default DoctorsPage
