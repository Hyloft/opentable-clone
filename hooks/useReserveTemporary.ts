import { SocketClient } from "@/types/SocketType";
import axios from "axios";
import { v4 } from "uuid";

interface CreateTemporaryReservationInput {
  day: string;
  time: string;
  partySize: string;
  slug: string;
}

export default function useReserveTemporary(io: SocketClient) {
  const uuid = v4();

  const endTemporaryReservation = async () => {
    await io.emit('endReservation',uuid)
    return true
  };

  const setEventAfterSocketResponse = (fn: (...args: any) => void) => {
    io.on(`reservation=${uuid}`, (...args: any) => {
      fn(args);
    });
  };

  const createTemporaryReservation = async ({
    day,
    time,
    partySize,
    slug,
  }: CreateTemporaryReservationInput) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerEmail: "not needed",
          bookerPhone: "not needed",
          bookerFirstName: "not needed",
          bookerLastName: "not needed",
          bookerOccasion: "not needed",
          bookerRequest: "not needed",
          temporary: true,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      io.emit("reserveTemporary", { booking: response.data, uuid });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  return {
    createTemporaryReservation,
    setEventAfterSocketResponse,
    endTemporaryReservation,
  };
}
