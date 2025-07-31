import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Settings, Image, PlusCircle, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function CuratorDashboard() {
  const myArtworks = [
    { id: 1, title: "Renaissance Portrait", status: "approved", date: "2024-01-15" },
    { id: 2, title: "Medieval Manuscript", status: "pending", date: "2024-01-20" },
    { id: 3, title: "Baroque Painting", status: "rejected", date: "2024-01-18" }
  ];

  const recentComments = [
    { artwork: "Gothic Cathedral", comment: "Beautiful architectural details", user: "Prof. Smith", date: "2 hours ago" },
    { artwork: "Roman Sculpture", comment: "Excellent preservation", user: "Dr. Johnson", date: "5 hours ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Curator Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Manage your artwork submissions and engage with the community
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <PlusCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle>Upload New Art</CardTitle>
              <CardDescription>Submit a new artwork for review</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/curator/upload">
                <Button className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Artwork
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Image className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle>My Artworks</CardTitle>
              <CardDescription>View and manage your submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/curator/artworks">
                <Button variant="outline" className="w-full">
                  View All ({myArtworks.length})
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Settings className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle>Manage Artworks</CardTitle>
              <CardDescription>Edit, delete and manage your artworks</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/curator/manage">
                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Manage Artworks
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* My Artworks Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>My Submitted Artworks</CardTitle>
              <CardDescription>Track the status of your submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {myArtworks.map((artwork) => (
                  <div key={artwork.id} className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                    <div>
                      <p className="font-medium">{artwork.title}</p>
                      <p className="text-sm text-muted-foreground">{artwork.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {artwork.status === 'approved' && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {artwork.status === 'pending' && <Clock className="h-4 w-4 text-yellow-600" />}
                      {artwork.status === 'rejected' && <div className="h-4 w-4 rounded-full bg-red-600" />}
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        artwork.status === 'approved' ? 'bg-green-100 text-green-800' :
                        artwork.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {artwork.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recent Comments</CardTitle>
              <CardDescription>Latest feedback on artworks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentComments.map((comment, index) => (
                  <div key={index} className="p-3 bg-surface/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-sm">{comment.artwork}</p>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">"{comment.comment}"</p>
                    <p className="text-xs text-primary">- {comment.user}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}