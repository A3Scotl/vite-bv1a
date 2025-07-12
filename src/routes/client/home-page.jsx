import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section - Inspired by diag.vn's clean hero */}
      <section className="relative w-full h-[500px] bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center justify-center text-center p-8">
        <img
          src="/placeholder.svg?height=500&width=1200"
          alt="Modern Hospital"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-bold mb-4 leading-tight">Chăm Sóc Sức Khỏe Toàn Diện Cho Gia Đình Bạn</h1>
          <p className="text-xl mb-8">
            Bệnh Viện 1A cam kết mang đến dịch vụ y tế chất lượng cao, hiện đại và tận tâm.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-3 rounded-full shadow-lg"
          >
            Đặt Lịch Khám Ngay <ChevronRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center text-diag-blue mb-12">Dịch Vụ Nổi Bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <img src="/placeholder.svg?height=100&width=100" alt="General Check-up" className="mx-auto mb-4" />
              <CardTitle className="text-2xl">Khám Tổng Quát</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Kiểm tra sức khỏe định kỳ toàn diện giúp phát hiện sớm các vấn đề tiềm ẩn.
              </CardDescription>
              <Button variant="link" className="mt-4 text-diag-blue">
                Tìm hiểu thêm <ChevronRight size={16} />
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <img src="/placeholder.svg?height=100&width=100" alt="Specialist Consultation" className="mx-auto mb-4" />
              <CardTitle className="text-2xl">Tư Vấn Chuyên Khoa</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm sẵn sàng tư vấn và điều trị.
              </CardDescription>
              <Button variant="link" className="mt-4 text-diag-blue">
                Tìm hiểu thêm <ChevronRight size={16} />
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <img src="/placeholder.svg?height=100&width=100" alt="Emergency Care" className="mx-auto mb-4" />
              <CardTitle className="text-2xl">Cấp Cứu 24/7</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Dịch vụ cấp cứu khẩn cấp luôn sẵn sàng phục vụ 24 giờ mỗi ngày, 7 ngày mỗi tuần.
              </CardDescription>
              <Button variant="link" className="mt-4 text-diag-blue">
                Tìm hiểu thêm <ChevronRight size={16} />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Us Section */}
      <section className="w-full bg-gray-50 py-16 px-4">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img src="/placeholder.svg?height=400&width=600" alt="About Us" className="rounded-lg shadow-lg" />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-diag-blue mb-6">Về Bệnh Viện 1A</h2>
            <p className="text-lg text-gray-700 mb-6">
              Với hơn 15 năm kinh nghiệm, Bệnh Viện 1A tự hào là một trong những cơ sở y tế hàng đầu tại Việt Nam, cung
              cấp dịch vụ chăm sóc sức khỏe toàn diện và chất lượng cao. Chúng tôi luôn nỗ lực không ngừng để mang lại
              sự an tâm và sức khỏe tốt nhất cho cộng đồng.
            </p>
            <Button
              size="lg"
              className="bg-diag-blue hover:bg-diag-blue-dark text-white text-lg px-8 py-3 rounded-full shadow-lg"
            >
              Tìm hiểu thêm <ChevronRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-4xl font-bold text-diag-blue mb-6">Liên Hệ Với Chúng Tôi</h2>
        <p className="text-lg text-gray-700 mb-8">
          Bạn có câu hỏi hoặc cần hỗ trợ? Đừng ngần ngại liên hệ với chúng tôi.
        </p>
        <Button
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-3 rounded-full shadow-lg"
        >
          Gửi Yêu Cầu <ChevronRight className="ml-2" />
        </Button>
      </section>
    </div>
  )
}
