import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Bookmark, Heart, MessageCircle, Share2, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import sampleArt1 from '@/assets/sample-art-1.jpg';
import sampleArt2 from '@/assets/sample-art-2.jpg';
import sampleArt3 from '@/assets/sample-art-3.jpg';
import sampleArt4 from '@/assets/sample-art-4.jpg';
import sampleArt5 from '@/assets/sample-art-5.jpg';
import sampleArt6 from '@/assets/sample-art-6.jpg';

export default function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const [relatedStartIndex, setRelatedStartIndex] = useState(0);

  // Mock artwork data - in real app, this would come from API based on id
  const artwork = {
    id: id || '1',
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    period: 'Post-Impressionism',
    year: '1889',
    medium: 'Oil on canvas',
    dimensions: '73.7 cm × 92.1 cm',
    location: 'Museum of Modern Art, New York',
    image: '/src/assets/sample-art-1.jpg',
    rating: 4.8,
    totalRatings: 2847,
    description: 'The Starry Night is an oil-on-canvas painting by Dutch Post-Impressionist painter Vincent van Gogh. Painted in June 1889, it depicts the view from the east-facing window of his asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an imaginary village.',
    history: 'Van Gogh painted The Starry Night during his 12-month stay at the Saint-Paul-de-Mausole asylum near Saint-Rémy-de-Provence, France, several months after suffering a breakdown in which he severed a part of his own ear.',
    tags: ['Post-Impressionism', 'Oil Painting', 'Night Scene', 'Masterpiece']
  };

  const comments = [
    {
      id: '1',
      author: 'Art Enthusiast',
      avatar: '/placeholder.svg',
      content: 'One of the most recognizable paintings in the history of Western culture. The swirling sky and cypress tree create such movement!',
      timestamp: '2 hours ago',
      likes: 34,
      isLiked: false
    },
    {
      id: '2',
      author: 'Museum Curator',
      avatar: '/placeholder.svg',
      content: 'The technique Van Gogh used here shows his unique approach to depicting light and movement. Truly revolutionary for its time.',
      timestamp: '1 day ago',
      likes: 28,
      isLiked: true
    },
    {
      id: '3',
      author: 'Student',
      avatar: '/placeholder.svg',
      content: 'I had the chance to see this in person at MoMA. The texture and colors are even more vibrant than any reproduction can show.',
      timestamp: '2 days ago',
      likes: 19,
      isLiked: false
    }
  ];

  const handleStarClick = (starRating: number) => {
    setUserRating(starRating);
  };

  const handleWatchLaterToggle = () => {
    setIsWatchLater(!isWatchLater);
  };

  // Generate more related artworks (simulate 15 total artworks)
  const allRelatedArtworks = [
    { id: 'art-2', image: sampleArt2, title: 'Classical Portrait' },
    { id: 'art-3', image: sampleArt3, title: 'Renaissance Scene' },
    { id: 'art-4', image: sampleArt4, title: 'Medieval Manuscript' },
    { id: 'art-5', image: sampleArt5, title: 'Baroque Painting' },
    { id: 'art-6', image: sampleArt6, title: 'Gothic Architecture' },
    { id: 'art-7', image: sampleArt1, title: 'Ancient Sculpture' },
    { id: 'art-8', image: sampleArt2, title: 'Roman Fresco' },
    { id: 'art-9', image: sampleArt3, title: 'Byzantine Art' },
    { id: 'art-10', image: sampleArt4, title: 'Victorian Portrait' },
    { id: 'art-11', image: sampleArt5, title: 'Impressionist Work' },
    { id: 'art-12', image: sampleArt6, title: 'Modern Classic' },
    { id: 'art-13', image: sampleArt1, title: 'Contemporary Piece' },
    { id: 'art-14', image: sampleArt2, title: 'Abstract Expression' },
    { id: 'art-15', image: sampleArt3, title: 'Cultural Heritage' },
    { id: 'art-16', image: sampleArt4, title: 'Historical Document' }
  ];

  const itemsPerPage = 5;
  const totalPages = Math.ceil(allRelatedArtworks.length / itemsPerPage);
  const currentRelatedArtworks = allRelatedArtworks.slice(relatedStartIndex, relatedStartIndex + itemsPerPage);

  const handlePrevRelated = () => {
    setRelatedStartIndex(prev => Math.max(0, prev - itemsPerPage));
  };

  const handleNextRelated = () => {
    setRelatedStartIndex(prev => Math.min(allRelatedArtworks.length - itemsPerPage, prev + itemsPerPage));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex items-center gap-4 h-16">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="font-semibold text-lg truncate">{artwork.title}</h1>
          
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant={isWatchLater ? "default" : "outline"}
              size="sm"
              onClick={handleWatchLaterToggle}
            >
              <Bookmark className="h-4 w-4 mr-2" />
              {isWatchLater ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] relative">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>

            {/* Related Artworks - Moved above comments */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Related Artworks</h3>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handlePrevRelated}
                      disabled={relatedStartIndex === 0}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {Math.floor(relatedStartIndex / itemsPerPage) + 1} / {totalPages}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleNextRelated}
                      disabled={relatedStartIndex + itemsPerPage >= allRelatedArtworks.length}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {currentRelatedArtworks.map((relatedArt) => (
                    <div 
                      key={relatedArt.id} 
                      className="cursor-pointer group"
                      onClick={() => navigate(`/artwork/${relatedArt.id}`)}
                    >
                      <div className="aspect-square overflow-hidden rounded-lg">
                        <img
                          src={relatedArt.image}
                          alt={relatedArt.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 text-center truncate">
                        {relatedArt.title}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MessageCircle className="h-5 w-5" />
                  <h3 className="font-semibold">Comments ({comments.length})</h3>
                </div>

                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium text-sm">{comment.author}</h5>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm text-foreground">{comment.content}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                            <Heart className={`w-3 h-3 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                            <span>{comment.likes}</span>
                          </button>
                          <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Add Comment */}
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 text-sm bg-muted rounded-lg px-3 py-2 border-none outline-none placeholder:text-muted-foreground"
                    />
                    <Button size="sm">Post</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Artwork Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{artwork.title}</h2>
                  <p className="text-muted-foreground">by {artwork.artist}</p>
                </div>

                {/* Rating */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(artwork.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-muted-foreground/40'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {artwork.rating} ({artwork.totalRatings} ratings)
                    </span>
                  </div>

                  {/* User Rating */}
                  <div>
                    <p className="text-sm font-medium mb-2">Rate this artwork:</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleStarClick(star)}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= (hoveredStar || userRating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-muted-foreground/40'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Details */}
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm">Period</h4>
                    <p className="text-sm text-muted-foreground">{artwork.period}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Year</h4>
                    <p className="text-sm text-muted-foreground">{artwork.year}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Medium</h4>
                    <p className="text-sm text-muted-foreground">{artwork.medium}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Dimensions</h4>
                    <p className="text-sm text-muted-foreground">{artwork.dimensions}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Location</h4>
                    <p className="text-sm text-muted-foreground">{artwork.location}</p>
                  </div>
                </div>

                <Separator />

                {/* Tags */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {artwork.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {artwork.description}
                </p>
                
                <Separator />
                
                <h4 className="font-medium text-sm">Historical Context</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {artwork.history}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}