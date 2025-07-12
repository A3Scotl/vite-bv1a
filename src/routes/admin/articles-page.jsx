import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, Trash2, Eye, EyeOff } from "lucide-react"

export function ArticlesPage() {
  // Mock data for articles
  const articles = [
    {
      id: "art-001",
      title: "Lợi ích của việc khám sức khỏe định kỳ",
      slug: "loi-ich-kham-suc-khoe-dinh-ky",
      category: "Sức khỏe tổng quát",
      isActive: true,
      createdAt: "2023-01-15",
      updatedAt: "2023-01-20",
    },
    {
      id: "art-002",
      title: "Phòng ngừa bệnh tim mạch hiệu quả",
      slug: "phong-ngua-benh-tim-mach",
      category: "Tim mạch",
      isActive: true,
      createdAt: "2023-02-01",
      updatedAt: "2023-02-05",
    },
    {
      id: "art-003",
      title: "Chế độ dinh dưỡng cho người tiểu đường",
      slug: "dinh-duong-tieu-duong",
      category: "Dinh dưỡng",
      isActive: false,
      createdAt: "2023-03-10",
      updatedAt: "2023-03-12",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Articles Management</CardTitle>
          <CardDescription>Manage your blog posts and health articles.</CardDescription>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Article
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input placeholder="Search articles..." className="max-w-sm" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="general">Sức khỏe tổng quát</SelectItem>
              <SelectItem value="cardiology">Tim mạch</SelectItem>
              <SelectItem value="nutrition">Dinh dưỡng</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="hidden">Hidden</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.slug}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>
                  <Badge variant={article.isActive ? "default" : "secondary"}>
                    {article.isActive ? "Active" : "Hidden"}
                  </Badge>
                </TableCell>
                <TableCell>{article.createdAt}</TableCell>
                <TableCell>{article.updatedAt}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-1">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" className="mr-1">
                    {article.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{article.isActive ? "Hide" : "Show"}</span>
                  </Button>
                  <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
