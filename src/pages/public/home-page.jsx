import HeroSection from "@/components/public/home/hero-section";
import ServicesSection from "@/components/public/home/services-section";
import DepartmentsSection from "@/components/public/home/departments-section";
import DoctorsSection from "@/components/public/home/doctors-section";
import ArticlesSection from "@/components/public/home/articles-section";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <div className="max-w-screen-xl mx-auto px-4">
        <ServicesSection />
        <DepartmentsSection />
        <DoctorsSection />
        <ArticlesSection />
      </div>
    </>
  );
};

export default HomePage;
