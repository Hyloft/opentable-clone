import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {firstName,lastName,email,phone,city,password} = req.body
  let errors: string[]=[]

  const validationSchema = [
    {
      valid:validator.isLength(firstName,{
        min:2,max:20
      }),
      errorMessage:"First name invalid"
    },{
      valid:validator.isLength(lastName,{
        min:2,max:25
      }),
      errorMessage:"Last name invalid"
    },
    {
      valid:validator.isEmail(email),
      errorMessage:"Email is invalid"
    },
    {
      valid:validator.isMobilePhone(phone),
      errorMessage:"Phone number is invalid"
    },{
      valid:validator.isLength(city,{
        min:2,max:20
      }),
      errorMessage:"City is invalid"
    },{
      valid:validator.isStrongPassword(password),
      errorMessage:"Password is too week"
    }
  ]

  validationSchema.forEach(check => {
    if (!check.valid){
      errors.push(check.errorMessage)
    }
  });

  if(errors.length){
    return res.status(400).json({errorMessage:errors[0]})
  }

  if (req.method == "POST"){
    res.status(200).json({
      status:"user signed successfully"
    })
  }
}
