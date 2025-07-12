import { Header } from "../components/common/header"
import { Footer } from "../components/common/footer"

export function ClientLayout({ children }) {
  return (
    <div className="flex flex-col min-h-svh">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  )
}
