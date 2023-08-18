import { PrismaClient } from "@prisma/client";
import Card from "./components/Card";
import Header from "./components/Header";
import { CardType } from "@/types/CardType";

// import { prisma } from './db';

// export async function getServerSideProps() {
//   const restaurants = await prisma.restaurant.findMany();

//   return {props:{restaurants}};
// }

const prisma = new PrismaClient()

const fetchRestaurants =async ():Promise<CardType[]> => {
  const restaurants = await prisma.restaurant.findMany(
    {
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

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant)=>(
          <Card restaurant={restaurant}/>
        ))}
      </div>
    </main>
  );
}
