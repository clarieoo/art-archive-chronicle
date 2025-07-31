import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for artworks
const mockArtworks = [
  {
    id: 1,
    title: "Sunset Serenity",
    category: "Photography",
    status: "approved",
    views: 245,
    likes: 18,
    uploadDate: "2024-01-15",
    image: "/src/assets/sample-art-1.jpg"
  },
  {
    id: 2,
    title: "Urban Dreams",
    category: "Digital Art",
    status: "pending",
    views: 89,
    likes: 7,
    uploadDate: "2024-01-20",
    image: "/src/assets/sample-art-2.jpg"
  },
  {
    id: 3,
    title: "Nature's Canvas",
    category: "Painting",
    status: "approved",
    views: 312,
    likes: 25,
    uploadDate: "2024-01-10",
    image: "/src/assets/sample-art-3.jpg"
  },
  {
    id: 4,
    title: "Abstract Thoughts",
    category: "Mixed Media",
    status: "rejected",
    views: 156,
    likes: 12,
    uploadDate: "2024-01-18",
    image: "/src/assets/sample-art-4.jpg"
  }
];

export const ManageArtworks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredArtworks = mockArtworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || artwork.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (id: number) => {
    console.log('Edit artwork:', id);
    // TODO: Implement edit functionality
  };

  const handleDelete = (id: number) => {
    console.log('Delete artwork:', id);
    // TODO: Implement delete functionality
  };

  const handleView = (id: number) => {
    console.log('View artwork:', id);
    // TODO: Navigate to artwork detail page
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Artworks</h1>
          <p className="text-muted-foreground mt-2">
            Manage your uploaded artworks, edit details, and track performance
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Artworks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockArtworks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockArtworks.filter(a => a.status === 'approved').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockArtworks.filter(a => a.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {mockArtworks.reduce((sum, artwork) => sum + artwork.views, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Your Artworks</CardTitle>
          <CardDescription>
            View and manage all your uploaded artworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search artworks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Artworks Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Artwork</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Likes</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArtworks.map((artwork) => (
                  <TableRow key={artwork.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={artwork.image}
                          alt={artwork.title}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <div>
                          <div className="font-medium text-foreground">{artwork.title}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{artwork.category}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(artwork.status)}>
                        {artwork.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{artwork.views}</TableCell>
                    <TableCell>{artwork.likes}</TableCell>
                    <TableCell>{new Date(artwork.uploadDate).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(artwork.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(artwork.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(artwork.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};