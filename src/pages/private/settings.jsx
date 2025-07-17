import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Settings } from "lucide-react"

const Setting = () => {
  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Cài đặt
          </CardTitle>
          <CardDescription>Configure general settings for your application.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Nội dung cài đặt sẽ ở đây. Bạn có thể thêm các form để chỉnh sửa các tùy chọn cấu hình.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Setting;
