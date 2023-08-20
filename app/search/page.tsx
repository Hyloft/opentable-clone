import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import ResaurantCard from "./components/ResaurantCard";
import { PrismaClient } from "@prisma/client";
import { CardType } from "@/types/CardType";

const prisma = new PrismaClient()

// INTERFACES
export interface typeSearchPageSearchParams{
  city?:string,
  region?:string,
  cuisine?:string,
  price?:string
}

interface typeSideBarFetchedProps{
  cuisines: {
      name: string;
  }[],
  locations: {
      name: string;
  }[],
}

export interface typeSideBarProps extends typeSideBarFetchedProps{
  searchParams:typeSearchPageSearchParams
}

// FETCH FUNCTIONS
const fetchRestaurants =async (city:string|null,cuisine:string|null,price:string|null):Promise<CardType[]> => {
  if(!city && !cuisine && !price){return await prisma.restaurant.findMany({
    select:
      {
        id:true,
        name:true,
        main_image:true,
        cuisine:true,
        location:true,
        price:true,
        slug:true
      }
  })}
  const where:any={
    location:{
      name:{
        contains:city || ''
      }
    },
    cuisine:{
      name:{
        contains:cuisine || ''
      }
    }
  }
  if(price){
    const price_ = {
     equals:price.toUpperCase() 
    }
    where.price = price_
  }
  const restaurants = await prisma.restaurant.findMany(
    {
      where,
      select:
      {
        id:true,
        name:true,
        main_image:true,
        cuisine:true,
        location:true,
        price:true,
        slug:true
      }
    }
  )
  return restaurants;
}

const fetchSideBarProps = async():Promise<typeSideBarFetchedProps>=>{
  const cuisines = await prisma.cuisine.findMany({
    select:{
      name:true
    }
  })
  const locations = await prisma.location.findMany({
    select:{
      name:true
    }
  })
  return {cuisines,locations}
}

// MAIN FUNCTION
export default async function Search({searchParams}:{searchParams:typeSearchPageSearchParams}) {
  const city = searchParams.city?searchParams.city.toLowerCase():null
  const cuisine = searchParams.cuisine?searchParams.cuisine.toLowerCase():null
  const price = searchParams.price?searchParams.price.toLowerCase():null
  const restaurants = await fetchRestaurants(city,cuisine,price);
  
  const sideBarProps = await fetchSideBarProps();
  
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar props={{...sideBarProps,searchParams}} />
        <div className="w-5/6">
          {restaurants.length>0?restaurants.map(restaurant=>{
            return <ResaurantCard restaurant={restaurant} />
          }): <p>There is no restaurant found in {city}</p>}
        </div>
      </div>
    </>
  );
}
