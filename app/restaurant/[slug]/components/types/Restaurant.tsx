import { Review } from '@prisma/client';
export interface RestaurantType{
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews:Review[]
}