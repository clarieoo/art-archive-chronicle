import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArtCard } from '@/components/gallery/ArtCard';

interface BookmarkedArt {
  id: string;
  title: string;
  artist: string;
  category: string;
  period: string;
  imageUrl: string;
  description: string;
  dateBookmarked: string;
  tags: string[];
}

export default function Bookmarks() {
  const navigate = useNavigate();

  // Mock bookmarked artworks data
  const defaultBookmarks: BookmarkedArt[] = [
    {
      id: '1',
      title: 'The Starry Night',
      artist: 'Vincent van Gogh',
      category: 'Post-Impressionism',
      period: '1889',
      imageUrl: '/src/assets/sample-art-1.jpg',
      description: 'A masterpiece depicting a swirling night sky over a village',
      dateBookmarked: '2024-01-20',
      tags: ['famous', 'night', 'swirls', 'blue']
    },
    {
      id: '2',
      title: 'The Great Wave',
      artist: 'Katsushika Hokusai',
      category: 'Japanese Art',
      period: '1831',
      imageUrl: '/src/assets/sample-art-2.jpg',
      description: 'Iconic woodblock print of a giant wave threatening boats',
      dateBookmarked: '2024-01-19',
      tags: ['wave', 'japanese', 'woodblock', 'blue']
    },
    {
      id: '3',
      title: 'Girl with a Pearl Earring',
      artist: 'Johannes Vermeer',
      category: 'Baroque',
      period: '1665',
      imageUrl: '/src/assets/sample-art-3.jpg',
      description: 'Mysterious portrait of a girl with an exotic pearl earring',
      dateBookmarked: '2024-01-18',
      tags: ['portrait', 'mystery', 'pearl', 'dutch']
    },
    {
      id: '4',
      title: 'The Persistence of Memory',
      artist: 'Salvador Dalí',
      category: 'Surrealism',
      period: '1931',
      imageUrl: '/src/assets/sample-art-4.jpg',
      description: 'Surreal landscape with melting clocks',
      dateBookmarked: '2024-01-17',
      tags: ['surreal', 'clocks', 'melting', 'time']
    },
    {
      id: '5',
      title: 'The Scream',
      artist: 'Edvard Munch',
      category: 'Expressionism',
      period: '1893',
      imageUrl: '/src/assets/sample-art-5.jpg',
      description: 'Iconic expression of existential anguish',
      dateBookmarked: '2024-01-16',
      tags: ['scream', 'anxiety', 'expressionism', 'orange']
    },
    {
      id: '6',
      title: 'Water Lilies',
      artist: 'Claude Monet',
      category: 'Impressionism',
      period: '1919',
      imageUrl: '/src/assets/sample-art-6.jpg',
      description: 'Serene pond with floating water lilies',
      dateBookmarked: '2024-01-15',
      tags: ['impressionism', 'water', 'lilies', 'peaceful']
    }
  ];

  const [bookmarkedArtworks, setBookmarkedArtworks] = useState<BookmarkedArt[]>(() => {
    try {
      const raw = localStorage.getItem('bookmarks');
      return raw ? (JSON.parse(raw) as BookmarkedArt[]) : defaultBookmarks;
    } catch {
      return defaultBookmarks;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarkedArtworks));
    } catch {}
  }, [bookmarkedArtworks]);

  // SEO
  useEffect(() => {
    document.title = 'My Bookmarks | Art Gallery';
  }, []);

  const handleToggleBookmark = (artId: string) => {
    // Unsave when toggled from the bookmarks page
    setBookmarkedArtworks((prev) => prev.filter((art) => art.id !== artId));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Bookmark className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">My Bookmarks</h1>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {bookmarkedArtworks.length} bookmark{bookmarkedArtworks.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Bookmarks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedArtworks.map((art) => (
            <ArtCard
              key={art.id}
              id={art.id}
              title={art.title}
              artist={art.artist}
              period={art.period}
              image={art.imageUrl}
              rating={0}
              totalRatings={0}
              isWatchLater={true}
              onToggleWatchLater={handleToggleBookmark}
            />
          ))}
        </div>

        {/* Empty State */}
        {bookmarkedArtworks.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
            <p className="text-muted-foreground">Start exploring artworks and bookmark your favorites.</p>
          </div>
        )}
      </div>
    </div>
  );
}
