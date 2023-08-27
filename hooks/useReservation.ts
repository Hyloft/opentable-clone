import { ReservationBody } from "@/types/ReservationBodyType";
import axios from "axios";
import { useState } from "react";

interface CreateReservationInput extends ReservationBody {
  day: string;
  time: string;
  partySize: string;
  slug: string;
}

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReservation = async ({
    bookerEmail,
    bookerPhone,
    bookerFirstName,
    bookerLastName,
    bookerOccasion,
    bookerRequest,
    day,
    time,
    partySize,
    slug,
  }: CreateReservationInput) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerEmail,
          bookerPhone,
          bookerFirstName,
          bookerLastName,
          bookerOccasion,
          bookerRequest,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setLoading(false);
      return response.data;
    } catch (error: any) {
      setError(error.response.data.errorMessage);
      setLoading(false);
      return error.response.data;
    }
  };

  return { loading, error, createReservation };
}
