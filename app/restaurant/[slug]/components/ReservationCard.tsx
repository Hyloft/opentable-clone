"use client";

import { partySize, times } from "@/data";
import { useState } from "react";
import DatePicker from "react-datepicker";

const ReservationCard = ({openTime,closeTime}:{openTime:string,closeTime:string}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const filterTimeByRestaurant = ()=>{
    interface timeType{
      displayTime: string;
      time: string;
      searchTimes: string[];
    }
    const timesWithinWindow:timeType[] = []

    let isWithinWindow = false
    
    times.forEach(time=>{
      if (time.time == openTime){
        isWithinWindow = true
      }
      if (time.time == closeTime){
        isWithinWindow = false
      }
      if(isWithinWindow){
        timesWithinWindow.push(time)
      }
    })
    return timesWithinWindow
  }

  const timesWithinWindow = filterTimeByRestaurant()

  const partySizeOptions = partySize.map((size) => {
    return <option value={size.value}>{size.label}</option>;
  });

  const timeOptions = timesWithinWindow.map((time) => {
    return <option value={time.time}>{time.displayTime}</option>;
  });

  return (
    <div className="w-[27%] relative text-reg">
      <div className="fixed w-[15%] bg-white rounded p-3 shadow">
        <div className="text-center border-b pb-2 font-bold">
          <h4 className="mr-7 text-lg">Make a Reservation</h4>
        </div>
        <div className="my-3 flex flex-col">
          <label htmlFor="">Party size</label>
          <select name="" className="py-3 border-b font-light" id="">
            {partySizeOptions}
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
            <select name="" id="" className="py-3 border-b font-light">
              {timeOptions}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
            Find a Time
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
