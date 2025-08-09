import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Eye, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfessorDashboard() {
  const pendingArtworks = [
    { 
      id: 1, 
      title: "Byzantine Icon", 
      curator: "John Doe", 
      category: "Religious Art", 
      submittedDate: "2024-01-20",
      priority: "high"
    },
    { 
      id: 2, 
      title: "Roman Fresco Fragment", 
      curator: "Jane Smith", 
      category: "Ancient Art", 
      submittedDate: "2024-01-19",
      priority: "medium"
    },
    { 
      id: 3, 
      title: "Medieval Illuminated Manuscript", 
      curator: "Mike Johnson", 
      category: "Medieval", 
      submittedDate: "2024-01-18",
      priority: "low"
    }
  ];

  const recentDecisions = [
    { artwork: "Renaissance Portrait", decision: "approved", curator: "Alice Brown", date: "Yesterday" },
    { artwork: "Gothic Sculpture", decision: "rejected", curator: "Bob Wilson", date: "2 days ago" },
    { artwork: "Baroque Painting", decision: "approved", curator: "Carol Davis", date: "3 days ago" }
  ];

  const stats = {
    pending: 15,
    approved: 42,
    rejected: 8,
    total: 65
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Professor Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Review and approve curator submissions for the Historical Archive Gallery
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reviewed</CardTitle>
              <Eye className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
            </CardContent>
          </Card>
        </div>

        {/* Professor Functions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Review Artworks
              </CardTitle>
              <CardDescription>Review and approve curator submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  View and manage artwork submissions from curators. Approve or reject artworks with detailed feedback.
                </p>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {[
                    '/src/assets/sample-art-1.jpg',
                    '/src/assets/sample-art-2.jpg',
                    '/src/assets/sample-art-3.jpg',
                    '/src/assets/sample-art-4.jpg',
                    '/src/assets/sample-art-5.jpg'
                  ].map((image, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded-lg border">
                      <img 
                        src={image} 
                        alt={`Sample artwork ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        onClick={() => window.open(`/artwork/${index + 1}`, '_blank')}
                      />
                    </div>
                  ))}
                </div>
                <Link to="/professor/review">
                  <Button className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Review Submissions ({stats.pending})
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Curator Applications
              </CardTitle>
              <CardDescription>Review upgrade requests to curator status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Review and approve visitor applications to become curators. Check their qualifications and submissions.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-surface/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">John Doe</p>
                      <p className="text-xs text-muted-foreground">Art History Student</p>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-surface/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Sarah Johnson</p>
                      <p className="text-xs text-muted-foreground">Museum Assistant</p>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                </div>
                <Link to="/professor/curator-applications">
                  <Button variant="outline" className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Review Applications (5)
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Recent Decisions
              </CardTitle>
              <CardDescription>Your latest review decisions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDecisions.map((decision, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{decision.artwork}</p>
                      <p className="text-xs text-muted-foreground">by {decision.curator}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={decision.decision === 'approved' ? 'default' : 'destructive'}>
                        {decision.decision}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{decision.date}</p>
                    </div>
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