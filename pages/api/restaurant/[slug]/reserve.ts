import { prisma } from "@/app/db";
import { findAvailableTables } from "@/services/findAvailableTables";
import { ReservationBody } from "@/types/ReservationBodyType";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(404)
      .json({ errorMessage: "This endpoint only accept POST requests" });
  }

  const { day, time, partySize, slug } = req.query as {
    day: string;
    time: string;
    partySize: string;
    slug: string;
  };

  const {
    bookerEmail,
    bookerPhone,
    bookerFirstName,
    bookerLastName,
    bookerOccation,
    bookerRequest,
  }: ReservationBody = req.body;

  const nextErrorResponse = (error?: string) => {
    return res.status(400).json({
      errorMessage: error || "Invalid data provided",
    });
  };

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) return nextErrorResponse("No restaurant found");

  if (
    new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
    new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
  )
    return nextErrorResponse("Restaurant is not open at that time");

  const searchTimesWithAvailableTables = await findAvailableTables({
    res,
    slug,
    time,
    day,
  });

  if (!searchTimesWithAvailableTables)
    return nextErrorResponse("No available tables");

  const searchTimeWithTables = searchTimesWithAvailableTables.find(
    (t) => t.date.toISOString() == `${day}T${time}`
  );

  if (!searchTimeWithTables) return nextErrorResponse("No availability");

  const tablesCount: {
    2: number[];
    4: number[];
  } = {
    2: [],
    4: [],
  };

  searchTimeWithTables.tables.forEach((table) => {
    if (table.seats === 2) tablesCount[2].push(table.id);
    if (table.seats === 4) tablesCount[4].push(table.id);
  });

  const tablesToBooks: number[] = [];

  let seatsRemaining = parseInt(partySize);

  const handlePlacement = () => {
    while (seatsRemaining > 0) {
      if (seatsRemaining > 2) {
        if (tablesCount[4].length) {
          tablesToBooks.push(tablesCount[4][0]);
          tablesCount[4].shift();
          seatsRemaining -= 4;
        } else if (tablesCount[2].length > 1) {
          for (let index = 0; index < 2; index++) {
            tablesToBooks.push(tablesCount[2][0]);
            tablesCount[2].shift();
            seatsRemaining -= 2;
          }
        } else {
          return false;
        }
      } else {
        if (tablesCount[2].length) {
          tablesToBooks.push(tablesCount[2][0]);
          tablesCount[2].shift();
          seatsRemaining -= seatsRemaining;
        } else if (tablesCount[4].length) {
          tablesToBooks.push(tablesCount[4][0]);
          tablesCount[4].shift();
          seatsRemaining -= seatsRemaining;
        } else {
          return false;
        }
      }
      if (seatsRemaining < 1) return true;
    }
  };

  const placement = handlePlacement();

  if (!placement) {
    nextErrorResponse("Cannot place seats");
  }

  const booking = await prisma.booking.create({
    data: {
      number_of_people: parseInt(partySize),
      booking_time: new Date(`${day}T${time}`),
      booker_email: bookerEmail,
      booker_first_name: bookerFirstName,
      booker_last_name: bookerLastName,
      booker_phone: bookerPhone,
      booker_occasion: bookerOccation,
      booker_request: bookerRequest,
      restaurant_id: restaurant.id,
    },
  });

  const bookingRelations = await prisma.bookingTable.createMany({
    data: tablesToBooks.map((t) => {
      return { booking_id: booking.id, table_id: t };
    }),
  });

  return res.json(booking);
}
//http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-01-01&time=20:00:00.000Z&partySize=5
