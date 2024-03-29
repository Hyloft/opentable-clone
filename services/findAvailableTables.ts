import { prisma, redis } from "@/app/db";
import { times } from "@/data";
import { NextApiResponse } from "next";

export const findAvailableTables = async ({
  res,
  slug,
  time,
  day,
}: {
  res: NextApiResponse;
  slug: string;
  time: string;
  day: string;
}) => {
  const searchTimes = times.find((t) => t.time === time)?.searchTimes;

  if (!searchTimes) {
    return null;
  }

  let bookings = await prisma.booking.findMany({
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

  const redisFetch = await redis.get("reservations");
  if (redisFetch) {
    const redisBookings = JSON.parse(redisFetch).reservations;
    if (redisBookings.length !== 0)
      redisBookings.forEach((b:any)=>{
        bookings.push({...b.booking,booking_time:new Date(b.booking.booking_time)})
      })
  }

  const bookingTableObject: { [key: string]: { [key: number]: true } } = {};

  bookings.forEach((booking) => {
    bookingTableObject[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      }, bookingTableObject[booking.booking_time.toISOString()]);
  });

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: slug,
    },
    select: {
      tables: true,
      close_time: true,
      open_time: true,
    },
  });

  if (!restaurant) {
    return null;
  }

  const tables = restaurant.tables;

  const searchTimesWithAvailableTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables: tables.filter((table) => {
        if (bookingTableObject[`${day}T${searchTime}`]) {
          if (bookingTableObject[`${day}T${searchTime}`][table.id]) {
            return false;
          }
        }
        return true;
      }),
    };
  });

  return searchTimesWithAvailableTables;
};
