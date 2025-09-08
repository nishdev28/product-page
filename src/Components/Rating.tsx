// src/components/Rating.tsx
import type { Rating as RatingType } from '../types/Product';

interface RatingProps {
  rating: RatingType;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating.rate);
  const hasHalfStar = rating.rate % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <i key={i} className="fa-solid fa-star text-yellow-500"></i>;
        } else if (i === fullStars && hasHalfStar) {
          return (
            <i
              key={i}
              className="fa-solid fa-star-half-alt text-yellow-500"
            ></i>
          );
        } else {
          return <i key={i} className="fa-regular fa-star text-yellow-500"></i>;
        }
      })}
      <span className="ml-2 text-gray-600">({rating.count})</span>
    </div>
  );
};

export default Rating;
