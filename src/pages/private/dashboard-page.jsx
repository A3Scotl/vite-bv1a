import { Home } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome to your Dashboard!</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-5 h-5 text-primary" />
            Overview
          </CardTitle>
          <CardDescription>
            This is your main dashboard area. Select an option from the sidebar to manage specific sections.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Here you can see a summary of your application's key metrics and recent activities.</p>
          <p className="mt-4 text-muted-foreground">
            (Further content for each dashboard section will appear here based on sidebar navigation.)
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard;
