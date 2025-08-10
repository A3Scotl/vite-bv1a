import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { doctorApi } from "@/apis/doctor-api";
import { handleFetch } from "@/utils/fetch-helper";
import { motion } from "framer-motion";

const DoctorSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    handleFetch({
      apiCall: doctorApi.getAllActive,
      setData: (data) => {
        setDoctors(data?.content || []);
        setLoading(false);
      },
    });
  };

  const handleCardClick = (slug) => {
    navigate(`/doi-ngu-chuyen-gia/${slug}`);
  };

  // Skeleton loader component
  const DoctorSkeleton = () => (
    <Card className="w-full border border-gray-200 shadow-sm">
      <Skeleton className="h-[200px] w-full rounded-t-lg" />
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4 mx-auto" />
        <Skeleton className="h-3 w-1/2 mx-auto" />
        <Skeleton className="h-3 w-2/3 mx-auto" />
      </CardContent>
    </Card>
  );

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
          Đội Ngũ Chuyên Gia
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <DoctorSkeleton key={index} />
            ))}
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-3 md:-ml-6">
              {doctors.map((doc) => (
                <CarouselItem
                  key={doc.id}
                  className="pl-3 md:pl-6 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card
                      className="pt-0 overflow-hidden text-center border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white"
                      onClick={() => handleCardClick(doc.slug)}
                    >
                      <div className="h-[200px] bg-gray-100 overflow-hidden">
                        <img
                          src={doc.avatarUrl}
                          alt={doc.fullName}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg text-gray-800 mb-2">{doc.fullName}</h3>
                        <p className="text-gray-600 text-sm font-medium">{doc.department.name}</p>
                        <p className="text-gray-500 text-sm">{doc.position}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex bg-white text-gray hover:bg-blue-50 cursor-pointer" />
            <CarouselNext className="hidden md:flex bg-white text-gray hover:bg-blue-50 cursor-pointer" />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default DoctorSection;