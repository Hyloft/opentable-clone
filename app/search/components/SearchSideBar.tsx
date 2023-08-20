import Link from "next/link"
import { typeSearchPageSearchParams, typeSideBarProps } from "../page"
import { PRICE } from "@prisma/client"

const SearchSideBar = ({props}:{props:typeSideBarProps}) => {
  const handleFilter=(input:typeSearchPageSearchParams):typeSearchPageSearchParams=>{
    return {...props.searchParams,...input}
  }

  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2">Region</h1>
        {props.locations.map(location=>(
          <Link href={{query:{...handleFilter({city:location.name})}}}>
            <p className="font-light text-reg capitalize">{location.name}</p>
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2">Cuisine</h1>
        {props.cuisines.map(cuisine=>(
          <Link href={{query:{...handleFilter({cuisine:cuisine.name})}}}>
            <p className="font-light text-reg capitalize">{cuisine.name}</p>
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link href={{query:{...handleFilter({price:PRICE.CHEAP})}}}>
            <button className="border w-full text-reg font-light rounded-l p-2">
              $
            </button>
          </Link>
          <Link href={{query:{...handleFilter({price:PRICE.REGULAR})}}}>
            <button
              className="border-r border-t border-b w-full text-reg font-light p-2"
            >
              $$
            </button>
          </Link>
          <Link href={{query:{...handleFilter({price:PRICE.EXPENSIVE})}}}>
            <button
              className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
            >
              $$$
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SearchSideBar