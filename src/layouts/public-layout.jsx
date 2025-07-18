import { Outlet } from "react-router-dom"
import Header from "@/components/public/header"
import Footer from "@/components/public/footer"

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 bg-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
