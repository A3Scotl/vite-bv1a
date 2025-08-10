import HeroSection from "@/components/public/home/hero-section";

import DepartmentsSection from "@/components/public/home/departments-section";
import DoctorsSection from "@/components/public/home/doctors-section";
import PostSection from "@/components/public/home/post-section";
import BannerSection from "@/components/public/banner-section";
const HomePage = () => {
  return (
    <div className="bg-gray-50">
    <BannerSection/>
      {/* <HeroSection /> */}
      <div className="max-w-5xl mx-auto px-4">

        {/* <DepartmentsSection /> */}
        <DoctorsSection />
        <PostSection />

      </div>
         <BannerSection/>
      <div className="max-w-5xl mx-auto px-4">

        {/* <DepartmentsSection /> */}
        <DoctorsSection />
        <PostSection />

      </div>
  
    </div>
  );
};

export default HomePage;
