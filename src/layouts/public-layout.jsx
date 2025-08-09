import { Outlet } from "react-router-dom"
import Header from "@/components/public/header"
import Footer from "@/components/public/footer"
import QuickContact from "@/components/public/quick-contact"
import LoadingPage from "@/pages/common/loading-page";
import { useSiteConfig } from "@/context/site-config-context";
const PublicLayout = () => {
   const { loading } = useSiteConfig();

  if (loading) return <LoadingPage />;
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-1 bg-white">
        <Outlet />
        <QuickContact/>
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
