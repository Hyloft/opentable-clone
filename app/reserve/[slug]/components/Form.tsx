"use client";

import useReservation from "@/hooks/useReservation";
import { ReservationBody } from "@/types/ReservationBodyType";
import { Alert, CircularProgress } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import TemporaryReservationHeader from "./TemporaryReservationHeader";

const Form = ({
  slug,
  day,
  time,
  partySize,
}: {
  slug: string;
  day: string;
  time: string;
  partySize: string;
}) => {
  const [data, setData] = useState<ReservationBody>({
    bookerEmail: "",
    bookerPhone: "",
    bookerFirstName: "",
    bookerLastName: "",
    bookerOccasion: "",
    bookerRequest: "",
  });

  const { error, loading, createReservation } = useReservation();

  const [success, setSuccess] = useState(false);

  const [disabled, setDisabled] = useState(true);

  const [temporaryReservation, setTemporaryReservation] = useState(false);

  const [endTemporary, setEndTemporary] =
    useState<() => Promise<boolean> | null>();

  let keysDisabled = Object.keys(data).filter(
    (k) => k !== "bookerRequest" && k !== "bookerOccasion"
  );

  useEffect(() => {
    let d = false;
    keysDisabled.forEach((key) => {
      if (data[key as keyof ReservationBody] == "") {
        d = true;
        return;
      }
    });

    setDisabled(d);
  }, [data]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async () => {
    if (endTemporary) await endTemporary();
    createReservation({
      slug,
      day,
      time,
      partySize,
      ...data,
    }).then((res) => {
      if (!res.errorMessage) {
        setSuccess(true);
        setTemporaryReservation(false);
      }
    });
  };
  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      <TemporaryReservationHeader
        setTemporaryReservation={setTemporaryReservation}
        endTemporary={endTemporary}
        setEndTemporary={setEndTemporary}
        day={day}
        time={time}
        partySize={partySize}
        slug={slug}
        temporaryReservation={temporaryReservation}
      />
      {error ? (
        <Alert severity="error" className="w-[100%] mb-3">
          {error}
        </Alert>
      ) : null}

      {success ? (
        <div>
          <p className="text-lg">Reservation Completed</p>
          <p className="text-reg italic">
            You successfully made a reservation!
          </p>
        </div>
      ) : (
        <>
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
            name="bookerOccasion"
            value={data.bookerOccasion || ""}
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
            disabled={disabled || loading}
            onClick={handleFormSubmit}
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              <>"Complete reservation"</>
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
};

export default Form;
