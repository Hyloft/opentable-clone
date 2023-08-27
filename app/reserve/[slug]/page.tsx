import Header from "./components/Header";
import Form from "./components/Form";
import { prisma } from "@/app/db";

const fetchRestaurant = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      main_image: true,
    },
  });
  if (!restaurant) {
    throw new Error("no restaurant found");
  }
  return restaurant;
};

export default async function ReservationPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { date: string; partySize: string };
}) {
  const restaurant = await fetchRestaurant(params.slug);
  const { date, partySize } = searchParams;
  let [day, time] = date.split("T");

  return (
    <>
      <div className="border-t h-screen">
        <div className="py-9 w-3/5 m-auto">
          <Header
            day={day}
            time={time}
            partySize={partySize}
            name={restaurant.name}
            image={restaurant.main_image}
          />
          <Form />
        </div>
      </div>
    </>
  );
}
