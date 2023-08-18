import Header from "./components/Header";
import ReservationCard from "./components/ReservationCard";
import RestaurantNav from "./components/RestaurantNav";

const layout = ({ children,params }: {params:{slug:string}, children: React.ReactNode }) => {
  return (
    <>
      <Header name={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        <div className="bg-white w-[70%] rounded p-3 shadow">
          <RestaurantNav slug={params.slug}/>
          {children}
        </div>
        <ReservationCard />
      </div>
    </>
  );
};

export default layout;
