import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import { RestaurantType } from "./components/types/Restaurant";
import { prisma } from "@/app/db";
import ReservationCard from "./components/ReservationCard";
import RestaurantNav from "./components/RestaurantNav";

const fetchRestaurant = async (slug: string): Promise<RestaurantType> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    // notFound() NOT WORKING NEXTJS CURRENT VERSION
    throw new Error("Restaurant cannot found");
  }

  return restaurant;
};

export default async function RestaurantDetails(props: any) {
  const restaurant = await fetchRestaurant(props.params.slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNav slug={props.params.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <ReservationCard slug={props.params.slug} openTime={restaurant.open_time} closeTime={restaurant.close_time} />
    </>
  );
}
