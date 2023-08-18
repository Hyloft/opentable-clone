import Menu from "./components/Menu";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchRestaurantItems = async (slug:string) => {
  const restaurant = await prisma.restaurant.findUnique(
    {
      where:{
        slug
      },
      select:{
        items:true
      }
    }
  )
  
  if(!restaurant){
    throw new Error()
  }

  return restaurant.items
}


export default async function RestaurantMenuPage({params}:{params:{slug:string}}) {
  const items = await fetchRestaurantItems(params.slug)
  
  return (
    <>
      <Menu items={items}/>
    </>
  );
}
