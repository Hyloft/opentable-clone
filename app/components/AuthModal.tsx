"use client"

import {ChangeEvent, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface InputChange{
  firstName:string,
  lastName:string,
  phone:string,
  email:string,
  city:string,
  password:string,
}

export interface AuthInputProps{
  inputValues:InputChange
  handleChange(event: ChangeEvent<HTMLInputElement>): void
  isSignIn:boolean
}

export default function AuthModal({isSignIn}:{isSignIn:boolean}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const renderContent = (signInText:string,signUpText:string) =>{
    return isSignIn?signInText:signUpText
  }

  const [inputValues, setInputValues] = useState({
    firstName:'',
    lastName:'',
    phone:'',
    email:'',
    city:'',
    password:'',
  })

  const handleInputChange=(event: ChangeEvent<HTMLInputElement>)=>{
    setInputValues({
      ...inputValues,
      [event.target.name]:event.target.value
    })
  }

  return (
    <div>
      {isSignIn?
      <button
        onClick={handleOpen}
        className="bg-blue-500 text-white border p-1 px-4 rounded mr-3"
      >
        Sign in
      </button>
      :<button onClick={handleOpen} className="border p-1 px-4 rounded">Sign up</button>
      }
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
                {renderContent('sign in','create account')}
              </p>
            </div>
          </div>
          <div className="m-auto">
            <h2 className="text-lg font-light text-center">
              {renderContent('Log In Your Account','Create Your OpenTable Account')}
            </h2>
            <AuthModalInputs props={{inputValues,handleChange:handleInputChange,isSignIn:isSignIn}}/>
          </div>
          <button className='uppercase bg-red-600 w-full text-white p-3 mt-3 rounded text-sm mb-5 disabled:bg-green-400'>
            {renderContent('Log In','Sign Up')}
          </button>
        </Box>
      </Modal>
    </div>
  );
}