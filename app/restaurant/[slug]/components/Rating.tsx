import { calculateAverageReview } from '@/utils/ReviewAverage';
import { Review } from '@prisma/client';

const Rating = ({reviews}:{reviews:Review[]}) => {
  const renderRating=()=>{
    return calculateAverageReview(reviews).toFixed(1)
  }
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <p>*****</p>
        <p className="text-reg ml-3">{renderRating()}</p>
      </div>
      <div>
        <p className="text-reg ml-4">{reviews?reviews.length:0} Reviews</p>
      </div>
    </div>
  );
};

export default Rating;
