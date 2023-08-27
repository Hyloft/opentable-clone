import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { day, time, partySize } = req.query;

  return res.json({ day, time, partySize });
}
//http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/reserve?day=2023-01-01&time=20:00:00.000Z&partySize=5
