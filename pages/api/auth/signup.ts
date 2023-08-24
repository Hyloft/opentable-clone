import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt"
import * as jose from 'jose'
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(404).json({
      errorMessage: "invalid request",
    });
  }
  const { firstName, lastName, email, phone, city, password }:{firstName:string, lastName:string, email:string, phone:string, city:string, password:string } = req.body;
  let errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isLength(firstName, {
        min: 2,
        max: 20,
      }),
      errorMessage: "First name invalid",
    },
    {
      valid: validator.isLength(lastName, {
        min: 2,
        max: 25,
      }),
      errorMessage: "Last name invalid",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid",
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: "Phone number is invalid",
    },
    {
      valid: validator.isLength(city, {
        min: 2,
        max: 20,
      }),
      errorMessage: "City is invalid",
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: "Password is too week",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  const userWithEmail = await prisma.user.findFirst({where:{email:email}})
  if (userWithEmail){
    errors.push('email already used')
  }

  if (errors.length) {
    return res.status(400).json({ errorMessage: errors[0] });
  }

  const hashedPassword = await bcrypt.hash(password,7)

  const user = await prisma.user.create({
    data:{
      city,
      email,
      phone,
      first_name:firstName,
      last_name:lastName,
      password:hashedPassword
    }
  })

  const secret = new TextEncoder().encode(process.env.JWTSECRET)

  const token = await new jose.SignJWT({email:user.email})
  .setProtectedHeader({alg:'HS256'})
  .setExpirationTime(24)
  .sign(secret)

  setCookie('jwt',token,{req,res,maxAge:60*24*7})

  if (req.method == "POST") {
    res.status(200).json({
      firstName:user.first_name,
      lastName:user.last_name,
      email:user.email,
      city:user.city,
      phone:user.phone,
    });
  }
}
