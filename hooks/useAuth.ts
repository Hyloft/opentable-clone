import { AuthenticationContext } from "@/app/context/AuthContext";
import axios from "axios";
import { useContext } from "react";

export const useAuth = () => {
  const { error, loading, data, setAuthState } = useContext(
    AuthenticationContext
  );
  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      let response = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password,
      });
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
    } catch (error:any) {
      setAuthState({
        data: null,
        error: `${error.response.data.errorMessage}`,
        loading: false,
      });
    }
  };
  const signUp = async () => {};

  return { signIn, signUp };
};
