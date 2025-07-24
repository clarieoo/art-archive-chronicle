import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Eye, CheckCircle, XCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function ReviewArts() {
  const [searchQuery, setSearchQuery] = useState('');

  const artworks = [
    { 
      id: 1, 
      title: "Byzantine Icon", 
      curator: "John Doe", 
      category: "Religious Art", 
      status: "pending",
      submittedDate: "2024-01-20",
      description: "12th century Byzantine icon depicting...",
      imageUrl: "/sample-art-1.jpg"
    },
    { 
      id: 2, 
      title: "Roman Fresco Fragment", 
      curator: "Jane Smith", 
      category: "Ancient Art", 
      status: "approved",
      submittedDate: "2024-01-19",
      description: "Well-preserved fresco from Pompeii...",
      imageUrl: "/sample-art-2.jpg"
    },
    { 
      id: 3, 
      title: "Medieval Illuminated Manuscript", 
      curator: "Mike Johnson", 
      category: "Medieval", 
      status: "rejected",
      submittedDate: "2024-01-18",
      description: "Illuminated manuscript page from...",
      imageUrl: "/sample-art-3.jpg"
    }
  ];

  const filteredArtworks = artworks.filter(artwork =>
    artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artwork.curator.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artwork.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      case 'pending': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-primary">Review Arts</h1>
            <p className="text-muted-foreground text-lg">
              Review and manage artwork submissions
            </p>
          </div>
        </div>

        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Artwork Submissions</CardTitle>
            <CardDescription>
              Review curator submissions and manage approval status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search artworks by title, curator, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Artworks Table */}
            <div className="rounded-md border border-border/50">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Artwork</TableHead>
                    <TableHead>Curator</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArtworks.map((artwork) => (
                    <TableRow key={artwork.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img 
                            src={artwork.imageUrl} 
                            alt={artwork.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <div className="font-medium">{artwork.title}</div>
                            <div className="text-sm text-muted-foreground">{artwork.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{artwork.curator}</TableCell>
                      <TableCell>{artwork.category}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(artwork.status)}>
                          {artwork.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{artwork.submittedDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {artwork.status === 'pending' && (
                            <>
                              <Button variant="default" size="sm">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="destructive" size="sm">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredArtworks.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No artworks found matching your search.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}