import { Card, CardContent } from "@/components/ui/card";

const DepartmentSection = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Chuyên khoa</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {departments.map((dep) => (
            <Card key={dep.id} className="overflow-hidden text-center border">
              <div className="h-[80px] flex items-center justify-center bg-white">
                <img
                  src={dep.iconUrl}
                  alt={dep.name}
                  className="max-h-[60px] object-contain"
                />
              </div>
              <CardContent className="p-3">
                <h3 className="font-semibold text-sm">{dep.name}</h3>
                <p className="text-gray-500 text-xs line-clamp-2 mt-1">
                  {dep.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentSection;
