import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart } from "lucide-react"

const StatisticsPage = () => {
  return (
    <div className="flex justify-center py-8">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5 text-primary" />
            Thống kê
          </CardTitle>
          <CardDescription>View various statistics and analytics for your application.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Nội dung thống kê sẽ ở đây. Bạn có thể tích hợp các biểu đồ và số liệu để hiển thị dữ liệu.</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatisticsPage
