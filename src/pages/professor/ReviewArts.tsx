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
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

interface ArtSubmission {
  id: string;
  title: string;
  curator: string;
  category: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  images: string[];
  description: string;
  dimension: string;
  tags: string;
  culture: string;
  department: string;
  period: string;
  foundDate?: string;
  location: string;
}

export const ReviewArts = () => {
  const navigate = useNavigate();
  const [selectedArt, setSelectedArt] = useState<ArtSubmission | null>(null);
  const [comment, setComment] = useState('');
  const [currentPages, setCurrentPages] = useState({
    pending: 1,
    approved: 1,
    rejected: 1
  });
  const itemsPerPage = 10;

  // Generate mock data for 50+ submissions
  const generateArtSubmissions = (): ArtSubmission[] => {
    const categories = ['Painting', 'Digital Art', 'Sculpture', 'Photography', 'Mixed Media'];
    const curators = ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Emily Chen', 'Alex Brown', 'Lisa Wilson', 'David Lee', 'Maria Garcia'];
    const statuses: ('pending' | 'approved' | 'rejected')[] = ['pending', 'approved', 'rejected'];
    const submissions = [];
    
    for (let i = 1; i <= 54; i++) {
      submissions.push({
        id: i.toString(),
        title: `Artwork Submission ${i}`,
        curator: curators[Math.floor(Math.random() * curators.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        submittedDate: new Date(2024, Math.floor(Math.random() * 2), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        images: [`/src/assets/sample-art-${((i - 1) % 6) + 1}.jpg`],
        description: `Description for artwork submission ${i}. This piece explores various themes and techniques.`,
        dimension: '24 x 36 inches',
        tags: 'contemporary, modern, artistic',
        culture: 'Contemporary',
        department: 'Fine Arts',
        period: '21st Century',
        foundDate: new Date(2024, 0, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
        location: 'Art Museum'
      });
    }
    return submissions;
  };

  const artSubmissions = generateArtSubmissions();

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

  const getPaginatedArts = (arts: ArtSubmission[], status: 'pending' | 'approved' | 'rejected') => {
    const startIndex = (currentPages[status] - 1) * itemsPerPage;
    return arts.slice(startIndex, startIndex + itemsPerPage);
  };

  const getTotalPages = (arts: ArtSubmission[]) => Math.ceil(arts.length / itemsPerPage);

  const ArtTable = ({ arts, status }: { arts: ArtSubmission[], status: 'pending' | 'approved' | 'rejected' }) => {
    const paginatedArts = getPaginatedArts(arts, status);
    const totalPages = getTotalPages(arts);
    
    return (
      <div>
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
            {paginatedArts.map((art) => (
              <TableRow key={art.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={art.images[0]} 
                      alt={art.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{art.title}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {art.description}
                      </p>
                      {art.images.length > 1 && (
                        <p className="text-xs text-muted-foreground">+{art.images.length - 1} more</p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{art.curator}</TableCell>
                <TableCell>{art.category}</TableCell>
                <TableCell>{art.submittedDate}</TableCell>
                <TableCell>{getStatusBadge(art.status)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                     <Button 
                       variant="outline" 
                       size="sm"
                       onClick={() => navigate(`/artwork/art-${art.id}`)}
                     >
                       <Eye className="h-4 w-4 mr-1" />
                       View Details
                     </Button>

                    {/* Approve/Reject buttons for pending items */}
                    {art.status === 'pending' && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => setSelectedArt(art)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Approve Artwork</DialogTitle>
                            </DialogHeader>
                            {selectedArt && (
                              <div className="space-y-4">
                                <p>Are you sure you want to approve "{selectedArt.title}" by {selectedArt.curator}?</p>
                                <div className="space-y-2">
                                  <Label htmlFor="approveComment">Approval Comment (Optional)</Label>
                                  <Textarea
                                    id="approveComment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Add your approval comment here..."
                                    rows={3}
                                  />
                                </div>
                                <div className="flex space-x-2">
                                  <Button 
                                    onClick={() => handleApprove(selectedArt.id)}
                                    className="flex-1"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Confirm Approval
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="destructive"
                              size="sm"
                              onClick={() => setSelectedArt(art)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reject Artwork</DialogTitle>
                            </DialogHeader>
                            {selectedArt && (
                              <div className="space-y-4">
                                <p>Are you sure you want to reject "{selectedArt.title}" by {selectedArt.curator}?</p>
                                <div className="space-y-2">
                                  <Label htmlFor="rejectComment">Rejection Reason (Required)</Label>
                                  <Textarea
                                    id="rejectComment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Please provide a reason for rejection..."
                                    rows={3}
                                    required
                                  />
                                </div>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="destructive"
                                    onClick={() => handleReject(selectedArt.id)}
                                    className="flex-1"
                                    disabled={!comment.trim()}
                                  >
                                    <X className="h-4 w-4 mr-2" />
                                    Confirm Rejection
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPages[status] > 1) {
                        setCurrentPages(prev => ({
                          ...prev,
                          [status]: prev[status] - 1
                        }));
                      }
                    }}
                    className={currentPages[status] === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPages(prev => ({
                          ...prev,
                          [status]: page
                        }));
                      }}
                      isActive={currentPages[status] === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPages[status] < totalPages) {
                        setCurrentPages(prev => ({
                          ...prev,
                          [status]: prev[status] + 1
                        }));
                      }
                    }}
                    className={currentPages[status] === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/professor')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Review Art Submissions</h1>
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
                <ArtTable arts={pendingArts} status="pending" />
              </TabsContent>
              
              <TabsContent value="approved" className="mt-6">
                <ArtTable arts={approvedArts} status="approved" />
              </TabsContent>
              
              <TabsContent value="rejected" className="mt-6">
                <ArtTable arts={rejectedArts} status="rejected" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};