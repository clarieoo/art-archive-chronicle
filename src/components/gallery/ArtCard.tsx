import { useState } from 'react';
import { Star, Bookmark, MessageCircle, Heart, Reply, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface ArtCardProps {
  id: string;
  title: string;
  artist: string;
  period: string;
  image: string;
  rating: number;
  totalRatings: number;
  isWatchLater?: boolean;
  onRate?: (artId: string, rating: number) => void;
  onToggleWatchLater?: (artId: string) => void;
}

export const ArtCard = ({
  id,
  title,
  artist,
  period,
  image,
  rating,
  totalRatings,
  isWatchLater = false,
  onRate,
  onToggleWatchLater
}: ArtCardProps) => {
  const [userRating, setUserRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comments] = useState([
    {
      id: '1',
      author: 'Art Enthusiast',
      avatar: '/placeholder.svg',
      content: 'Absolutely breathtaking! The technique used here is phenomenal.',
      timestamp: '2 hours ago',
      likes: 12,
      isLiked: false
    },
    {
      id: '2', 
      author: 'Museum Curator',
      avatar: '/placeholder.svg',
      content: 'A perfect example of the artistic movement of this era.',
      timestamp: '1 day ago',
      likes: 8,
      isLiked: true
    }
  ]);

  const handleStarClick = (starRating: number) => {
    setUserRating(starRating);
    onRate?.(id, starRating);
  };

  const handleWatchLaterToggle = () => {
    onToggleWatchLater?.(id);
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-elegant hover:-translate-y-1 bg-card">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Bookmark icon in top right */}
        <button
          onClick={handleWatchLaterToggle}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-lg transition-all duration-200 shadow-sm"
        >
          <Bookmark
            className={`w-4 h-4 ${
              isWatchLater ? 'fill-primary text-primary' : 'text-muted-foreground'
            }`}
          />
        </button>
      </div>

      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-foreground line-clamp-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm">
          by {artist} • {period}
        </p>
        <p className="text-sm text-muted-foreground">
          A magnificent piece from the {period.toLowerCase()} period showcasing the artistic mastery of the era.
        </p>

        {/* Rating Section */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-1">
            {/* Rating Stars */}
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-4 h-4 ${
                    star <= (hoveredStar || userRating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-muted-foreground/40'
                  }`}
                />
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* View Details Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log(`View details for artwork ${id}`)}
              className="h-8 px-3 text-xs"
            >
              View
            </Button>
            
            {/* Comments Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-accent"
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96 p-0" align="end">
                <div className="p-4 border-b">
                  <h4 className="font-semibold text-sm">Comments</h4>
                  <p className="text-xs text-muted-foreground">{comments.length} comments</p>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-4 border-b last:border-b-0">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={comment.avatar} />
                          <AvatarFallback>{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center space-x-2">
                            <h5 className="text-sm font-medium">{comment.author}</h5>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-foreground">{comment.content}</p>
                          <div className="flex items-center space-x-4 pt-2">
                            <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                              <Heart className={`w-3 h-3 ${comment.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                              <span>{comment.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                              <Reply className="w-3 h-3" />
                              <span>Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t bg-muted/30">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                    <input 
                      type="text" 
                      placeholder="Add a comment..." 
                      className="flex-1 text-sm bg-transparent border-none outline-none placeholder:text-muted-foreground"
                    />
                    <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                      Post
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Save Button */}
            <Button
              variant={isWatchLater ? "default" : "outline"}
              size="sm"
              onClick={handleWatchLaterToggle}
              className="h-8 px-3 text-xs"
            >
              {isWatchLater ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};