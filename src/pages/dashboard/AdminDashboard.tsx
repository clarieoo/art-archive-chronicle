import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Image, FolderOpen, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const dashboardItems = [
    {
      title: "Manage Users",
      description: "View, edit, and manage user accounts",
      icon: Users,
      path: "/admin/users",
      count: "1,234",
      color: "text-blue-600"
    },
    {
      title: "Manage Artworks",
      description: "Manage and review artwork submissions",
      icon: Image,
      path: "/admin/arts",
      count: "89",
      color: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Manage your Historical Archive Gallery system
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-10">
          {dashboardItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Card key={item.title} className="hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </CardTitle>
                  <IconComponent className={`h-6 w-6 ${item.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-1">{item.count}</div>
                  <p className="text-xs text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  <Link to={item.path}>
                    <Button variant="outline" size="sm" className="w-full group">
                      Manage
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest actions and updates in your system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                <div>
                  <p className="font-medium">New user registration</p>
                  <p className="text-sm text-muted-foreground">John Doe joined as curator</p>
                </div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                <div>
                  <p className="font-medium">Art submission pending</p>
                  <p className="text-sm text-muted-foreground">Renaissance painting awaiting approval</p>
                </div>
                <span className="text-sm text-muted-foreground">5 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface/50 rounded-lg">
                <div>
                  <p className="font-medium">Category updated</p>
                  <p className="text-sm text-muted-foreground">Medieval category rules modified</p>
                </div>
                <span className="text-sm text-muted-foreground">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}