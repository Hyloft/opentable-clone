"use client";

import useReserveTemporary from "@/hooks/useReserveTemporary";
import { SocketClient } from "@/types/SocketType";
import { Alert, AlertTitle } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const TemporaryReservationHeader = ({
  setTemporaryReservation,
  endTemporary,
  setEndTemporary,
  day,
  time,
  partySize,
  slug,
  temporaryReservation,
}: any) => {
  const [timer, setTimer] = useState(120);

  const timerRef = useRef(120);

  function fmtMSS(s: number) {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  }

  const startTimer = () => {
    let intv: any = setInterval(async () => {
      if (timerRef.current <= 0) {
        if (endTemporary) await endTemporary();
        setTemporaryReservation(false);
        return clearInterval(intv);
      }
      timerRef.current -= 1;
      setTimer(timerRef.current);
    }, 1000);
    return () => clearInterval(intv);
  };

  const afterTemporaryReservation = () => {
    setTemporaryReservation(true);
    startTimer();
  };

  useEffect(() => {
    const socket: SocketClient = io("ws://localhost:3001");
    const {
      createTemporaryReservation,
      setEventAfterSocketResponse,
      endTemporaryReservation,
    } = useReserveTemporary(socket);
    createTemporaryReservation({ day, time, partySize, slug });
    setEndTemporary(() => endTemporaryReservation);
    setEventAfterSocketResponse(afterTemporaryReservation);
  }, []);
  return (
    <>
      {temporaryReservation ? (
        <Alert severity="info" className="w-[100%] mb-3">
          <AlertTitle>This Reservation Booked Temporary For You!</AlertTitle>
          {fmtMSS(timer)} <strong>minutes left!</strong>
        </Alert>
      ) : (
        <></>
      )}
    </>
  );
};

export default TemporaryReservationHeader;
