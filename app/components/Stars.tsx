import { Review } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import emptyStar from '../../public/icons/empty-star.png'
import halfStar from '../../public/icons/half-star.png'
import fullStar from '../../public/icons/full-star.png'
import { calculateAverageReview } from '@/utils/ReviewAverage'


const Stars = ({reviews}:{reviews:Review[]}) => {
  <Image alt='star' src={fullStar}/>
  const renderStars=()=>{
    let average = calculateAverageReview(reviews)
    let stars = []
    for (let index = 0; index < 5; index++) {
      let diff = average-index
      if(diff>=1){
        stars.push(<Image alt='star' className='w-4 h-4 m-1' src={fullStar}/>)
      }
      else if(diff>0 && diff>0.25){
        stars.push(<Image alt='star' className='w-4 h-4 m-1' src={halfStar}/>)
      }
      else{
        stars.push(<Image alt='star' className='w-4 h-4 m-1' src={emptyStar}/>)
      }
    }
    return stars
  }

  return (
    <div className='items-center flex'>{renderStars()}</div>
  )
}

export default Stars