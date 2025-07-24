import { useState } from 'react';
import { ArtCard } from './ArtCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample art data
import sampleArt1 from '@/assets/sample-art-1.jpg';
import sampleArt2 from '@/assets/sample-art-2.jpg';
import sampleArt3 from '@/assets/sample-art-3.jpg';
import sampleArt4 from '@/assets/sample-art-4.jpg';
import sampleArt5 from '@/assets/sample-art-5.jpg';
import sampleArt6 from '@/assets/sample-art-6.jpg';

const generateSampleArt = () => {
  const images = [sampleArt1, sampleArt2, sampleArt3, sampleArt4, sampleArt5, sampleArt6];
  const artists = ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Botticelli', 'Donatello', 'Caravaggio'];
  const periods = ['Renaissance', 'Medieval', 'Baroque', 'Classical', 'Gothic', 'Roman'];
  const titles = [
    'Madonna and Child', 'David', 'The Creation', 'Venus Rising', 'Sacred Manuscript',
    'Portrait of a Lady', 'Ancient Wisdom', 'Divine Light', 'Classical Beauty', 'Historical Chronicle'
  ];

  return Array.from({ length: 60 }, (_, i) => ({
    id: `art-${i + 1}`,
    title: titles[i % titles.length] + ` ${Math.floor(i / titles.length) + 1}`,
    artist: artists[i % artists.length],
    period: periods[i % periods.length],
    image: images[i % images.length],
    rating: Math.random() * 2 + 3, // Random rating between 3-5
    totalRatings: Math.floor(Math.random() * 500) + 50,
  }));
};

interface GalleryGridProps {
  searchQuery?: string;
  categoryFilter?: string;
}

export const GalleryGrid = ({ searchQuery = '', categoryFilter = '' }: GalleryGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [watchedItems, setWatchedItems] = useState<Set<string>>(new Set());
  const itemsPerPage = 6;
  
  const allArtworks = generateSampleArt();
  
  // Filter artworks based on search and category
  const filteredArtworks = allArtworks.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || art.period === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArtworks = filteredArtworks.slice(startIndex, startIndex + itemsPerPage);

  const handleRate = (artId: string, rating: number) => {
    console.log(`Rated ${artId} with ${rating} stars`);
    // Here you would typically update the rating in your backend
  };

  const handleToggleWatchLater = (artId: string) => {
    setWatchedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(artId)) {
        newSet.delete(artId);
      } else {
        newSet.add(artId);
      }
      return newSet;
    });
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Results Info */}
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredArtworks.length)} of {filteredArtworks.length} artworks
        </p>
        <p className="text-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentArtworks.map((artwork) => (
          <ArtCard
            key={artwork.id}
            {...artwork}
            isWatchLater={watchedItems.has(artwork.id)}
            onRate={handleRate}
            onToggleWatchLater={handleToggleWatchLater}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(pageNumber)}
                  className="w-10"
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};