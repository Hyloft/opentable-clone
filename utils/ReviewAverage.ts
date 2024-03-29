import { Review } from "@prisma/client";

export function calculateAverageReview(reviews:Review[]):number{
  if(!reviews) return 0
  if (reviews.length == 0) return 0
  return reviews.reduce((sum,review)=>{return sum+review.rating},0)/reviews.length
}