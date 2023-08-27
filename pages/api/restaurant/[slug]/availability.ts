import { prisma } from "@/app/db";
import { times } from "@/data";
import { findAvailableTables } from "@/services/findAvailableTables";
import { filterTimeByRestaurant } from "@/utils/filterTimeByRestaurant";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  const invalidDataError = (error?: string) => {
    return res.status(400).json({
      errorMessage: error || "Invalid data provided",
    });
  };

  if (!day || !time || !partySize) {
    return invalidDataError();
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: slug,
    },
    select: {
      close_time: true,
      open_time: true,
    },
  });

  if (!restaurant) {
    return invalidDataError("No restaurant found");
  }

  const searchTimesWithAvailableTables = await findAvailableTables({
    res,
    slug,
    time,
    day,
  });

  if (!searchTimesWithAvailableTables) {
    return invalidDataError("No tables found at that time");
  }

  const availableTimes = filterTimeByRestaurant(
    restaurant.open_time,
    restaurant.close_time
  );

  const availabilities = searchTimesWithAvailableTables
    .map((t) => {
      const sumSeats = t.tables.reduce((sum, table) => sum + table.seats, 0);

      return {
        time: t.time,
        available: sumSeats >= parseInt(partySize),
      };
    })
    .filter((availability) => {
      if (
        availableTimes.filter((t) => t.time == availability.time).length > 0
      ) {
        return true;
      }
      return false;
    });

  return res.json({ availabilities });
}
//http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-01-01&time=20:00:00.000Z&partySize=5
