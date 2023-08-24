"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import { useAuth } from "@/hooks/useAuth";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface InputChange {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  password: string;
}

export interface AuthInputProps {
  inputValues: InputChange;
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
  isSignIn: boolean;
}

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signIn, signUp } = useAuth();

  const renderContent = (signInText: string, signUpText: string) => {
    return isSignIn ? signInText : signUpText;
  };

  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (isSignIn) {
      if (inputValues.password !== "" && inputValues.email !== "") {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      if (Object.values(inputValues).filter((val) => val === "").length === 0) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
    return () => {};
  }, [inputValues]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = () => {
    if (isSignIn) {
      signIn({
        email: inputValues.email,
        password: inputValues.password,
      });
    }
  };

  return (
    <div>
      {isSignIn ? (
        <button
          onClick={handleOpen}
          className="bg-blue-500 text-white border p-1 px-4 rounded mr-3"
        >
          Sign in
        </button>
      ) : (
        <button onClick={handleOpen} className="border p-1 px-4 rounded">
          Sign up
        </button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p2 ">
            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
              <p className="text-2xl">
                {renderContent("sign in", "create account")}
              </p>
            </div>
          </div>
          <div className="m-auto">
            <h2 className="text-lg font-light text-center">
              {renderContent(
                "Log In Your Account",
                "Create Your OpenTable Account"
              )}
            </h2>
            <AuthModalInputs
              props={{
                inputValues,
                handleChange: handleInputChange,
                isSignIn: isSignIn,
              }}
            />
          </div>
          <button
            className="uppercase bg-red-600 w-full text-white p-3 mt-3 rounded text-sm mb-5 disabled:bg-gray-400"
            disabled={disabled}
            onClick={handleClick}
          >
            {renderContent("Log In", "Sign Up")}
          </button>
        </Box>
      </Modal>
    </div>
  );
}
