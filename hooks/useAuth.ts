import axios from "axios";

export const useAuth = () => {
  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      let response = await axios.post("http://localhost:3000/api/auth/signin", {
        email,
        password,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const signUp = async () => {};

  return {signIn,signUp}
};
