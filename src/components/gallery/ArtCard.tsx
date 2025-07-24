import { useState } from 'react';
import { Star, Heart, HeartIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center space-y-4">
            {/* Rating Stars */}
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoveredStar || userRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-white/60'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Watch Later Button */}
            <Button
              variant="secondary"
              size="sm"
              onClick={handleWatchLaterToggle}
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              {isWatchLater ? (
                <HeartIcon className="w-4 h-4 mr-2 fill-red-500 text-red-500" />
              ) : (
                <Heart className="w-4 h-4 mr-2" />
              )}
              {isWatchLater ? 'Saved' : 'Save for Later'}
            </Button>
          </div>
        </div>

        {/* Period Badge */}
        <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
          {period}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-2">
          {title}
        </h3>
        <p className="text-muted-foreground mb-3">
          by {artist}
        </p>

        {/* Rating Display */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.round(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {rating.toFixed(1)} ({totalRatings})
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};