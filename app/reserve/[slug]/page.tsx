import Header from "./components/Header";
import Nav from "@/app/components/Nav";
import Form from "./components/Form";

export default function ReservationPage() {
  return(
    <main className="bg-gray-100 min-h-screen w-screen">
      <main className="max-w-screen-2xl m-auto bg-white">
        <Nav/>
        <div className="border-t h-screen">
          <div className="py-9 w-3/5 m-auto">
            <Header/>
            <Form/>
          </div>
        </div>
      </main>
    </main>
  )
}