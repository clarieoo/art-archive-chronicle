import { useState } from 'react';
import { Star, Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
          <div className="flex items-center space-x-2">
            {/* Rating Stars */}
            <div className="flex items-center space-x-1">
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
            <span className="text-sm text-muted-foreground">Rate this</span>
          </div>
          
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
      </CardContent>
    </Card>
  );
};