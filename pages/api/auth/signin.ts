import { prisma } from "@/app/db";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from 'bcrypt'
import * as jose from 'jose'
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method !== "POST"){
    return res.status(404).json({
      errorMessage:"invalid request"
    })
  }

  const errors:string[]=[]
  const {email,password} = req.body

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid"
    },{
      valid: validator.isLength(password,{
        min:1
      }),
      errorMessage: "Password is invalid"
    }
  ]

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });
  if (errors.length) {
    return res.status(400).json({ errorMessage: errors[0] });
  }

  const userWithEmail = await prisma.user.findFirst({where:{email}})

  const notMatchError = "Email or password not match"

  if(!userWithEmail){
    return res.status(400).json({ errorMessage: notMatchError });
  }

  const match = await bcrypt.compare(password,userWithEmail.password)
  
  if (!match) {
    return res.status(400).json({ errorMessage: notMatchError });
  }

  const secret = new TextEncoder().encode(process.env.JWTSECRET)

  const token = await new jose.SignJWT({email:userWithEmail.email})
  .setProtectedHeader({alg:'HS256'})
  .setExpirationTime("24h")
  .sign(secret)

  setCookie('jwt',token,{req,res,maxAge:60*24*7})

  const user = userWithEmail

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
