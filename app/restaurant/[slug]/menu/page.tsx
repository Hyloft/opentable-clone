import Nav from "@/app/components/Nav";
import Header from "../components/Header";
import RestaurantNav from "../components/RestaurantNav";
import Menu from "./components/Menu";

export default function RestaurantMenuPage() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <Nav/>
        <Header/>
        <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
          <div className="bg-white w-[100%] rounded p-3 shadow">
            <RestaurantNav/>
            <Menu/>
          </div>
        </div>
      </main>
    </main>
  )
}