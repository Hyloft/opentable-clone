import { times } from "@/data";

export const filterTimeByRestaurant = (openTime:string,closeTime:string)=>{
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