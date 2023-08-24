"use client"

import Link from "next/link";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import { useAuth } from "@/hooks/useAuth";

export default function Nav(){
  const {data,loading,initialLoad} = useContext(AuthenticationContext)
  const {singOut} = useAuth()
  return(
    <nav className="bg-white p-2 flex justify-between">
          <Link href="/" className="font-bold text-gray-700 text-2xl">
            {" "} OpenTable{" "}
          </Link>
          <div>
            {loading&&!initialLoad||
            <div className="flex">
              {data?
                <>
                  <p className="mr-4 capitalize text-center flex p-1 italic text-lg">Welcome, {data.firstName}</p>
                  <button
                    className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
                    onClick={singOut}
                  >
                      Sign Out
                  </button>
                </>:
                <>
                  <AuthModal isSignIn={true}/>
                  <AuthModal isSignIn={false}/>
                </>
              }
            </div>
            }
          </div>
        </nav>
  )
}