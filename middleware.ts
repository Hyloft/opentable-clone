import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest, res: NextResponse) {
  const bearerToken = req.headers.get("authorization") as string;

  const errorUnauthorized = () => {
    return new NextResponse(
      JSON.stringify({
        errorMessage: "Unauthorized request",
      }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  };

  if (!bearerToken) {
    return errorUnauthorized();
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return errorUnauthorized();
  }

  const secret = new TextEncoder().encode(process.env.JWTSECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return errorUnauthorized();
  }
}

export const config = {
  matcher: ["/api/auth/me"],
};
