import { prisma } from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { day, time, partySize, slug } = req.query as {
    day: string;
    time: string;
    partySize: string;
    slug: string;
  };

  const invalidDataError = (error?: string) => {
    return res.status(400).json({
      errorMessage: error || "Invalid data provided",
    });
  };

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) return invalidDataError("No restaurant found");

  if (
    new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
    new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
  ) return invalidDataError("Restaurant is not open at that time");

  return res.json({ day, time, partySize });
}
//http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-01-01&time=20:00:00.000Z&partySize=5
