import HeroSection from "@/components/public/home/hero-section";

import DepartmentsSection from "@/components/public/home/departments-section";
import DoctorsSection from "@/components/public/home/doctors-section";
import PostSection from "@/components/public/home/post-section";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <div className="max-w-6xl mx-auto px-4">

        {/* <DepartmentsSection /> */}
        {/* <DoctorsSection /> */}
        <PostSection />
      </div>
    </>
  );
};

export default HomePage;
