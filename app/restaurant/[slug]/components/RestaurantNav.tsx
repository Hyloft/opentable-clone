"use client"
import Link from "next/link";
import { useParams } from "next/navigation";


const RestaurantNav = () => {
  const params  = useParams()
  const slug = params.slug
  return (
    <nav className="flex text-reg border-b pb-2">
      <Link href={'/restaurant/'+slug} className="mr-7">
        {" "}
        Overview{" "}
      </Link>
      <Link href={'/restaurant/'+slug+"/menu"} className="mr-7">
        {" "}
        Menu{" "}
      </Link>
    </nav>
  );
};

export default RestaurantNav;
