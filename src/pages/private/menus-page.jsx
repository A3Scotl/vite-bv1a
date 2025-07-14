import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Menu } from "lucide-react"

const MenusPage = () => {
  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Menu className="w-5 h-5 text-primary" />
            Quản lý Menu
          </CardTitle>
          <CardDescription>Manage the navigation menus of your website.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Nội dung quản lý Menu sẽ ở đây. Bạn có thể thêm các công cụ để tạo, chỉnh sửa, và sắp xếp menu.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default MenusPage
