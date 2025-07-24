import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Eye, MessageSquare, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ProfessorDashboard() {
  const navigate = useNavigate();
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
        {/* Back Arrow */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

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

        {/* Pending Artworks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                Pending Artworks
              </CardTitle>
              <CardDescription>Artworks awaiting your review and decision</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingArtworks.map((artwork) => (
                  <div key={artwork.id} className="p-4 bg-surface/50 rounded-lg border border-border/30">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{artwork.title}</h4>
                      <Badge variant={artwork.priority === 'high' ? 'destructive' : artwork.priority === 'medium' ? 'default' : 'secondary'}>
                        {artwork.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Curator: {artwork.curator}</p>
                    <p className="text-sm text-muted-foreground mb-1">Category: {artwork.category}</p>
                    <p className="text-sm text-muted-foreground mb-3">Submitted: {artwork.submittedDate}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive" className="flex-1">
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/professor/review">
                  <Button variant="outline" className="w-full">
                    View All Pending ({stats.pending})
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

        {/* Quick Actions */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and navigation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/professor/review">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <Clock className="h-6 w-6" />
                  Review Queue
                </Button>
              </Link>
              <Link to="/professor/approved">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <CheckCircle className="h-6 w-6" />
                  Approved Arts
                </Button>
              </Link>
              <Link to="/professor/reports">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <MessageSquare className="h-6 w-6" />
                  Review Reports
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}