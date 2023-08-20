import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import ResaurantCard from "./components/ResaurantCard";
import { PrismaClient } from "@prisma/client";
import { CardType } from "@/types/CardType";

const prisma = new PrismaClient()

const fetchRestaurants =async (city:string|null):Promise<CardType[]> => {
  if(city == null){return await prisma.restaurant.findMany({
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
  const restaurants = await prisma.restaurant.findMany(
    {
      where:{
        location:{
          name:{
            contains:city
          }
        }
      },
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


export default async function Search({searchParams}:{searchParams:{city:string}}) {
  const city = searchParams.city?searchParams.city.toLowerCase():null
  const restaurants = await fetchRestaurants(city);
  
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
        <div className="w-5/6">
          {restaurants.length>0?restaurants.map(restaurant=>{
            return <ResaurantCard restaurant={restaurant} />
          }): <p>There is no restaurant found in {city}</p>}
        </div>
      </div>
    </>
  );
}
