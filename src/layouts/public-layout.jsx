import { Outlet } from "react-router-dom"
import Header from "@/components/public/header"
import Footer from "@/components/public/footer"
import QuickContact from "@/components/public/quick-contact"

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 bg-white">
        <Outlet />
        <div className="max-w-6xl mx-auto px-4 pt-10">
           {/* Quick Actions */}
            <QuickContact/>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
