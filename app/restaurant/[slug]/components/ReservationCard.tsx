"use client";

import { partySize, times } from "@/data";
import useAvailability from "@/hooks/useAvailability";
import { convertToDisplayTime } from "@/utils/convertToDisplayTime";
import { filterTimeByRestaurant } from "@/utils/filterTimeByRestaurant";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";

const ReservationCard = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) => {
  const { data, loading, error, fetchAvailabilities } = useAvailability();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [party, setParty] = useState(2);
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const timesWithinWindow = filterTimeByRestaurant(openTime, closeTime);

  const handleClick = () => {
    fetchAvailabilities({
      slug,
      day: day,
      time,
      partySize: party.toString(),
    });
  };

  return (
    <div className="w-[27%] relative text-reg">
      <div className="fixed w-[15%] bg-white rounded p-3 shadow">
        <div className="text-center border-b pb-2 font-bold">
          <h4 className="mr-7 text-lg">Make a Reservation</h4>
        </div>
        <div className="my-3 flex flex-col">
          <label htmlFor="">Party size</label>
          <select
            value={party}
            onChange={(e) => setParty(parseInt(e.target.value.split(" ")[0]))}
            name=""
            className="py-3 border-b font-light"
            id=""
          >
            {partySize.map((size) => {
              return <option value={size.value}>{size.label}</option>;
            })}
          </select>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-[48%]">
            <label htmlFor="">Date</label>
            <DatePicker
              className="py-3 border-b font-light text-reg w-24"
              dateFormat={"MMMM d"}
              onChange={handleChangeDate}
              selected={selectedDate}
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <label htmlFor="">Time</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              name=""
              id=""
              className="py-3 border-b font-light"
            >
              {timesWithinWindow.map((time) => {
                return <option value={time.time}>{time.displayTime}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button
            onClick={handleClick}
            className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
          >
            {loading ? <CircularProgress /> : <>Find a Time</>}
          </button>
        </div>
        {data && data.availabilities.length ? (
          <div className="mt-4">
            <p className="text-reg">Select Time</p>
            <div className="flex flex-wrap mt-2">
              {data.availabilities.map((time) =>
                time.available ? (
                  <Link
                    href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${party}`}
                    className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                  >
                    <p className="text-sm font-bold">
                      {convertToDisplayTime(time.time)}
                    </p>
                  </Link>
                ) : (
                  <p className="bg-gray-400 p02 w-24 mb-3 rounded mr-3"></p>
                )
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ReservationCard;
