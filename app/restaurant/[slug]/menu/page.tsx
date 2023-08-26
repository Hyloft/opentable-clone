import { prisma } from "@/app/db";
import Menu from "./components/Menu";
import RestaurantNav from "../components/RestaurantNav";
import ReservationCard from "../components/ReservationCard";

const fetchRestaurant = async (slug:string) => {
  const restaurant = await prisma.restaurant.findUnique(
    {
      where:{
        slug
      },
      select:{
        items:true,
        close_time:true,
        open_time:true
      }
    }
  )
  
  if(!restaurant){
    throw new Error()
  }

  return restaurant
}


export default async function RestaurantMenuPage({params}:{params:{slug:string}}) {
  const restaurant = await fetchRestaurant(params.slug)
  
  return (
    <>
    <div className="bg-white w-[70%] rounded p-3 shadow">
      <RestaurantNav slug={params.slug} />
      <Menu items={restaurant.items}/>
    </div>
    <ReservationCard openTime={restaurant.open_time} closeTime={restaurant.close_time} />
  </>
  );
}
