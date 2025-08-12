import { useState } from 'react';
import { ArrowLeft, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Mock data for artworks (50+ items)
const generateMockArtworks = () => {
  const categories = ['Photography', 'Digital Art', 'Painting', 'Mixed Media', 'Sculpture', 'Illustration'];
  const artworks = [];
  
  for (let i = 1; i <= 53; i++) {
    artworks.push({
      id: i,
      title: `Artwork ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      views: Math.floor(Math.random() * 500) + 50,
      likes: Math.floor(Math.random() * 50) + 1,
      uploadDate: new Date(2024, Math.floor(Math.random() * 2), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      image: `/src/assets/sample-art-${((i - 1) % 6) + 1}.jpg`,
      curator: `Curator ${Math.floor(Math.random() * 10) + 1}`
    });
  }
  return artworks;
};

const mockArtworks = generateMockArtworks();

export const ManageArtworks = () => {
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState(mockArtworks);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(artworks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArtworks = artworks.slice(startIndex, startIndex + itemsPerPage);

  const handleViewDetails = (id: number) => {
    navigate(`/artwork/art-${id}`);
  };

  const handleDelete = (id: number) => {
    setArtworks(prevArtworks => prevArtworks.filter(artwork => artwork.id !== id));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/admin')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manage Artworks</h1>
          <p className="text-muted-foreground mt-2">
            Manage all artworks uploaded by curators
          </p>
        </div>
      </div>

      {/* Artworks Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Artworks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Artwork</TableHead>
                  <TableHead>Curator</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedArtworks.map((artwork) => (
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
                    <TableCell>{artwork.curator}</TableCell>
                    <TableCell>{artwork.category}</TableCell>
                    <TableCell>{new Date(artwork.uploadDate).toLocaleDateString()}</TableCell>
                     <TableCell className="text-right">
                       <div className="flex gap-2 justify-end">
                         <Button
                           variant="outline"
                           size="sm"
                           onClick={() => handleViewDetails(artwork.id)}
                         >
                           <Eye className="w-4 h-4 mr-1" />
                           View Details
                         </Button>
                         <Button
                           variant="destructive"
                           size="sm"
                           onClick={() => handleDelete(artwork.id)}
                         >
                           <Trash2 className="w-4 h-4 mr-1" />
                           Delete
                         </Button>
                       </div>
                     </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

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
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                        isActive={currentPage === page}
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
                        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};