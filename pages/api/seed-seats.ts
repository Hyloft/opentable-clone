// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await prisma.bookingTable.deleteMany();
  await prisma.table.deleteMany();
  await prisma.booking.deleteMany();

  const restaurants = await prisma.restaurant.findMany({
    select: { id: true },
  });
  restaurants.forEach(async (restaurant) => {
    await prisma.table.createMany({
      data: [
        {
          restaurant_id: restaurant.id,
          seats: 4,
        },
        {
          restaurant_id: restaurant.id,
          seats: 4,
        },
        {
          restaurant_id: restaurant.id,
          seats: 2,
        },
      ],
    });
  });

  res.status(200).json({ name: "hello" });
}
