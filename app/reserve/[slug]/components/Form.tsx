"use client";

import { ReservationBody } from "@/types/ReservationBodyType";
import { ChangeEvent, useEffect, useState } from "react";

const Form = () => {
  const [data, setData] = useState<ReservationBody>({
    bookerEmail: "",
    bookerPhone: "",
    bookerFirstName: "",
    bookerLastName: "",
    bookerOccation: "",
    bookerRequest: "",
  });
  const [disabled, setDisabled] = useState(true);

  let keysDisabled = Object.keys(data).filter(
    (k) => k !== "bookerRequest" && k !== "bookerOccation"
  );

  useEffect(() => {  
    let d = false
    keysDisabled.forEach((key) => {
      if (data[key as keyof ReservationBody] == ""){ 
        d = true
        return
      };
    });
    
    setDisabled(d);
  }, [data]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="First name"
        name="bookerFirstName"
        value={data.bookerFirstName}
        onChange={handleChange}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Last name"
        name="bookerLastName"
        value={data.bookerLastName}
        onChange={handleChange}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Phone number"
        name="bookerPhone"
        value={data.bookerPhone}
        onChange={handleChange}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Email"
        name="bookerEmail"
        value={data.bookerEmail}
        onChange={handleChange}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Occasion (optional)"
        name="bookerOccation"
        value={data.bookerOccation || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Requests (optional)"
        name="bookerRequest"
        value={data.bookerRequest || ""}
        onChange={handleChange}
      />
      <button
        disabled={disabled}
        className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
      >
        Complete reservation
      </button>
      <p className="mt-4 text-sm">
        By clicking “Complete reservation” you agree to the OpenTable Terms of
        Use and Privacy Policy. Standard text message rates may apply. You may
        opt out of receiving text messages at any time.
      </p>
    </div>
  );
};

export default Form;
