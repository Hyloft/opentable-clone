import { convertToDisplayTime } from "@/utils/convertToDisplayTime";
import { format } from "date-fns";

const Header = ({
  name,
  image,
  day,
  time,
  partySize,
}: {
  name: string;
  image: string;
  day: string;
  time: string;
  partySize: string;
}) => {
  return (
    <div>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={image} alt="" className="w-32 h-18 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{format(new Date(day), "cccc MMM d")}</p>
            <p className="mr-6">{convertToDisplayTime(time)}</p>
            <p className="mr-6">{partySize} people</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
