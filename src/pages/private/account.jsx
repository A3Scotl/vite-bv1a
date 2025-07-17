import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Users } from "lucide-react"

const Account = () => {
  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Quản lý tài khoản admin
          </CardTitle>
          <CardDescription>Manage administrator accounts and their permissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Nội dung quản lý tài khoản admin sẽ ở đây. Bạn có thể thêm form để tạo tài khoản mới, bảng để hiển thị danh
            sách tài khoản, và các tùy chọn chỉnh sửa/xóa.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Account
