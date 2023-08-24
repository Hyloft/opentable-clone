import { SignInInputs } from "@/app/components/AuthModal";
import { AuthenticationContext } from "@/app/context/AuthContext";
import axios from "axios";
import { useContext } from "react";
import { deleteCookie } from "cookies-next";

export const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);

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
      return response.data;
    } catch (error: any) {
      setAuthState({
        data: null,
        error: `${error.response.data.errorMessage}`,
        loading: false,
      });
      return { errorMessage: error.response.data.errorMessage };
    }
  };

  const signUp = async (inputs: SignInInputs) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      let response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        inputs
      );
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      return response.data;
    } catch (error: any) {
      setAuthState({
        data: null,
        error: `${error.response.data.errorMessage}`,
        loading: false,
      });
      return { errorMessage: error.response.data.errorMessage };
    }
  };

  const singOut = () => {
    deleteCookie("jwt");

    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };

  return { signIn, signUp, singOut };
};
