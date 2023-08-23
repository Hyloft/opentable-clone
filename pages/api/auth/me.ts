import { NextApiRequest, NextApiResponse } from "next";
import { getUserWithToken } from "@/utils/getUserWithToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;
  const token = bearerToken.split(" ")[1];

  const errorUnauthorized = () => {
    return res.status(401).json({
      errorMessage: "Unauthorized request",
    });
  };

  const user = await getUserWithToken(token);

  if (!user) {
    return errorUnauthorized();
  }

  return res.json({ me: user });
}
