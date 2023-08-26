import axios from "axios";
import { useState } from "react";

export default function useAvailability() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: {
    slug: string;
    partySize: string;
    day: string;
    time: string;
  }) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/restaurant/${slug}/availability`,
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setData(response.data);
      setLoading(false);
    } catch (error: any) {
      setError(error.response.data.errorMessage);
      setLoading(false);
    }
  };

  return { loading, error, data, fetchAvailabilities };
}
