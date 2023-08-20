import Price from "@/app/components/Price"
import { CardType } from "@/types/CardType"
import Link from "next/link"
import { Review } from '@prisma/client';
import { calculateAverageReview } from "@/utils/ReviewAverage";
import Stars from "@/app/components/Stars";

const ResaurantCard = ({restaurant}:{restaurant:CardType}) => {
  const renderReviewTitle = (reviews:Review[])=>{
    let average = calculateAverageReview(reviews)

    if (average >= 4) return "Awesome"
    else if (average >= 3.5) return "Good"
    else if (average >= 3) return "Okay"
    else if (average > 0) return "Bad"
    return ""
  }
  return (
    <div className="border-b flex pb-5">
      <img
        src={restaurant.main_image}
        alt=""
        className="w-44 rounded"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2"><Stars reviews={restaurant.reviews}/></div>
          <p className="ml-2 text-sm">{renderReviewTitle(restaurant.reviews)}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price margin={4} price={restaurant.price}/>
            <p className="mr-4">{restaurant.cuisine.name}</p>
            <p className="mr-4">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={"/restaurant/"+restaurant.slug}>View more information</Link>
        </div>
      </div>
    </div>
  )
}

export default ResaurantCard