import { prisma } from "@/app/db";
import { UserType } from "@/types/UserType";
import jwt from "jsonwebtoken";

export const getUserWithToken = async (
  token: string
): Promise<UserType | null> => {
  const payload = jwt.decode(token) as { email: string };

  if (!payload) {
    return null;
  } else if (!payload.email) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: { email: payload.email },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });
  return user;
};
