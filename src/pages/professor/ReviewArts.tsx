import { useState } from 'react';
import { ArrowLeft, CheckCircle, X, Clock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ArtSubmission {
  id: string;
  title: string;
  curator: string;
  category: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  image: string;
  description: string;
}

export const ReviewArts = () => {
  const navigate = useNavigate();
  const [selectedArt, setSelectedArt] = useState<ArtSubmission | null>(null);
  const [comment, setComment] = useState('');

  // Mock data - replace with actual API call
  const artSubmissions: ArtSubmission[] = [
    {
      id: '1',
      title: 'Abstract Harmony',
      curator: 'John Smith',
      category: 'Painting',
      submittedDate: '2024-01-15',
      status: 'pending',
      image: '/src/assets/sample-art-1.jpg',
      description: 'A vibrant abstract painting exploring the harmony between colors and forms.'
    },
    {
      id: '2',
      title: 'Digital Dreams',
      curator: 'Sarah Johnson',
      category: 'Digital Art',
      submittedDate: '2024-01-14',
      status: 'approved',
      image: '/src/assets/sample-art-2.jpg',
      description: 'A digital artwork that blends reality with dreams through innovative techniques.'
    },
    {
      id: '3',
      title: 'Urban Sculpture',
      curator: 'Mike Davis',
      category: 'Sculpture',
      submittedDate: '2024-01-13',
      status: 'rejected',
      image: '/src/assets/sample-art-3.jpg',
      description: 'A modern sculpture representing the complexity of urban life.'
    },
    {
      id: '4',
      title: 'Nature\'s Whisper',
      curator: 'Emily Chen',
      category: 'Photography',
      submittedDate: '2024-01-12',
      status: 'pending',
      image: '/src/assets/sample-art-4.jpg',
      description: 'A photography series capturing the subtle beauty of natural landscapes.'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><X className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleApprove = (artId: string) => {
    console.log('Approving art:', artId, 'Comment:', comment);
    setComment('');
    setSelectedArt(null);
  };

  const handleReject = (artId: string) => {
    console.log('Rejecting art:', artId, 'Comment:', comment);
    setComment('');
    setSelectedArt(null);
  };

  const pendingArts = artSubmissions.filter(art => art.status === 'pending');
  const approvedArts = artSubmissions.filter(art => art.status === 'approved');
  const rejectedArts = artSubmissions.filter(art => art.status === 'rejected');

  const ArtTable = ({ arts }: { arts: ArtSubmission[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Artwork</TableHead>
          <TableHead>Curator</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Submitted</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {arts.map((art) => (
          <TableRow key={art.id}>
            <TableCell>
              <div className="flex items-center space-x-3">
                <img 
                  src={art.image} 
                  alt={art.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <p className="font-medium">{art.title}</p>
                  <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {art.description}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>{art.curator}</TableCell>
            <TableCell>{art.category}</TableCell>
            <TableCell>{art.submittedDate}</TableCell>
            <TableCell>{getStatusBadge(art.status)}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedArt(art)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Review Artwork</DialogTitle>
                    </DialogHeader>
                    {selectedArt && (
                      <div className="space-y-4">
                        <div className="aspect-video w-full overflow-hidden rounded-lg">
                          <img 
                            src={selectedArt.image} 
                            alt={selectedArt.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold">{selectedArt.title}</h3>
                          <p className="text-muted-foreground">{selectedArt.description}</p>
                          <div className="flex gap-4 text-sm">
                            <span><strong>Curator:</strong> {selectedArt.curator}</span>
                            <span><strong>Category:</strong> {selectedArt.category}</span>
                            <span><strong>Submitted:</strong> {selectedArt.submittedDate}</span>
                          </div>
                        </div>
                        
                        {selectedArt.status === 'pending' && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="comment">Review Comment</Label>
                              <Textarea
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add your review comment here..."
                                rows={3}
                              />
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                onClick={() => handleApprove(selectedArt.id)}
                                className="flex-1"
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                              <Button 
                                variant="destructive"
                                onClick={() => handleReject(selectedArt.id)}
                                className="flex-1"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/professor/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Review Art Submissions</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingArts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{approvedArts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <X className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedArts.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different statuses */}
        <Card>
          <CardHeader>
            <CardTitle>Art Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">Pending ({pendingArts.length})</TabsTrigger>
                <TabsTrigger value="approved">Approved ({approvedArts.length})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({rejectedArts.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending" className="mt-6">
                <ArtTable arts={pendingArts} />
              </TabsContent>
              
              <TabsContent value="approved" className="mt-6">
                <ArtTable arts={approvedArts} />
              </TabsContent>
              
              <TabsContent value="rejected" className="mt-6">
                <ArtTable arts={rejectedArts} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};