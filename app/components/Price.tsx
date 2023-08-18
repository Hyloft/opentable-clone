import { PRICE } from "@prisma/client"

interface Props{
  price:PRICE
}

const Price = ({price}:Props) => {
  const renderPrices =() => {
    if (price === PRICE.CHEAP){
      return(
        <>
        <span>$$</span><span className="text-gray-400">$$</span>
        </>
      )
    }else if (price === PRICE.EXPENSIVE){
      return(
        <>
        <span>$$$$</span>
        </>
      )
    }else{
      return(
        <>
        <span>$$$</span><span className="text-gray-400">$</span>
        </>
      )
    }
  }
  return (
    <p className="mr-3">{renderPrices()}</p>
  )
}

export default Price