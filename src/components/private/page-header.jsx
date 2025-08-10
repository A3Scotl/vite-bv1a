import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const PageHeader = ({ title, description, icon: Icon, onAdd }) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between pb-0">
      <div className="space-y-0">
        <CardTitle className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </div>
      <Button onClick={onAdd} size="sm" className="hidden sm:inline-flex">
        <Plus className="w-4 h-4 mr-2" /> Thêm mới
      </Button>
    </CardHeader>
  );
};

export default PageHeader;