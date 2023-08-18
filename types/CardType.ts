import { Cuisine, Location, PRICE } from "@prisma/client";

export interface CardType{
  id:number,
  name:string,
  main_image:string,
  cuisine:Cuisine,
  slug:string,
  location:Location,
  price:PRICE
}