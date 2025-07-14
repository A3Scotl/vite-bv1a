import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Building2 } from "lucide-react"

const DepartmentsPage = () => {
  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Quản lý phòng ban
          </CardTitle>
          <CardDescription>Manage hospital departments and their details.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Nội dung quản lý phòng ban sẽ ở đây. Bạn có thể thêm form để tạo phòng ban mới và bảng để hiển thị các phòng
            ban hiện có.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default DepartmentsPage
