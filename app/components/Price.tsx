import { PRICE } from "@prisma/client"

interface Props{
  price:PRICE,
  margin?:number;
}

const Price = ({price,margin}:Props) => {
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
    <p className={`mr-${margin?margin:3}`}>{renderPrices()}</p>
  )
}

export default Price