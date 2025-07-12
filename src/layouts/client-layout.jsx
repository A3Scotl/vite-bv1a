import { Header } from "../components/common/header"
import { Footer } from "../components/common/footer"
import { Outlet } from "react-router-dom"
export function ClientLayout() {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
