import { prisma } from "@/app/db";
import { times } from "@/data";
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

  const searchTimes = times.find((t) => t.time === time)?.searchTimes;

  if (!searchTimes) {
    return invalidDataError();
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTableObject: { [key: string]: { [key: number]: true } } = {};

  bookings.forEach((booking) => {
    bookingTableObject[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      }, {});
  });

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: slug,
    },
    select: {
      tables: true,
    },
  });

  if (!restaurant) {
    return invalidDataError("No restaurant found");
  }

  const tables = restaurant.tables;

  const searchTimesWithAvailableTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables:tables.filter(table=>{
        if(bookingTableObject[`${day}T${searchTime}`]){
          if(bookingTableObject[`${day}T${searchTime}`][table.id]){
            return false
          }
        }
        return true
      })
    };
  });

  return res.json({ bookingTableObject, tables, searchTimesWithAvailableTables });
}
//http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-01-01&time=20:00:00.000Z&partySize=5
