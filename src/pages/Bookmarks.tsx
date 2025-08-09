import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Filter, Grid, List, Share2, Trash2, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
 } from '@/components/ui/dropdown-menu';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
      return raw ? JSON.parse(raw) as BookmarkedArt[] : defaultBookmarks;
    } catch {
      return defaultBookmarks;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bookmarks', JSON.stringify(bookmarkedArtworks));
    } catch {}
  }, [bookmarkedArtworks]);

  useEffect(() => {
    document.title = 'My Bookmarks | Art Gallery';
  }, []);

  const categories = ['all', ...new Set(bookmarkedArtworks.map(art => art.category))];

  const filteredArtworks = bookmarkedArtworks.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRemoveBookmark = (artId: string) => {
    setBookmarkedArtworks((prev) => prev.filter((art) => art.id !== artId));
  };

  const handleShare = (art: BookmarkedArt) => {
    if (navigator.share) {
      navigator.share({
        title: art.title,
        text: `Check out "${art.title}" by ${art.artist}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${art.title} by ${art.artist} - ${window.location.href}`);
      console.log('Link copied to clipboard!');
    }
  };

  const handleToggleBookmark = (artId: string) => {
    // Toggle bookmark behaves as unsave for existing bookmarks
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

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredArtworks.length} bookmark{filteredArtworks.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Bookmarks Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtworks.map((art) => (
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
        ) : (
          <div className="space-y-4">
            {filteredArtworks.map((art) => (
              <Card key={art.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{art.title}</h3>
                            <p className="text-muted-foreground">{art.artist}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => navigate(`/artwork/${art.id}`)}>
                              View
                            </Button>
                            <Button variant="default" size="sm" onClick={() => handleToggleBookmark(art.id)}>
                              Unsave
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="sm" variant="ghost">
                                  •••
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleShare(art)}>
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleRemoveBookmark(art.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {art.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {art.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{art.category} • {art.period}</span>
                        <span>Bookmarked {art.dateBookmarked}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredArtworks.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No bookmarks found</h3>
            <p className="text-muted-foreground">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Start exploring artworks and bookmark your favorites'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}