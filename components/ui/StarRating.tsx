import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg' | number;
  showRating?: boolean;
}

const sizeMap = {
  sm: 14,
  md: 16,
  lg: 20,
};

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviewCount,
  size = 'md',
  showRating = true
}) => {
  const starSize = typeof size === 'number' ? size : sizeMap[size];

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={starSize}
            className={`${
              star <= Math.floor(rating)
                ? 'fill-amber-400 text-amber-400'
                : star - 0.5 <= rating
                ? 'fill-amber-400 text-amber-400 opacity-50'
                : 'fill-none text-gray-300'
            }`}
          />
        ))}
      </div>
      {showRating && (
        <span className="text-sm text-gray-600 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount && (
        <span className="text-sm text-gray-500 ml-1">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
