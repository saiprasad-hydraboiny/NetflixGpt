import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import {useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {
  
  const [isSignInForm,setIsSignInForm]= useState(true);
  const [ErrorMessage,setErrorMessage]=useState(null);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  
  const name=useRef(null);
  const email=useRef(null); //useRef is used to reference the field
  const password=useRef(null);

  const handleButtonClick = () =>{
     const message=checkValidData(email.current.value,password.current.value);
     setErrorMessage(message);
     if(message)return;

     if(!isSignInForm)
     {
      // sign up logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: "https://occ-0-2164-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABRNxoR9tSkEVM9fATC_Q7TDU82w0oFcdfpBqRF3POzQaagpwfnzaA4euN6VmESuR8R9FbILlsdJMBFhPFs9dwgkjTuL6fSiXzutB.png?r=54a"
        }).then(() => {
          const {uid,email,displayName,photoURL}=auth.currentUser;
                dispatch(addUser({uid:uid, email:email,displayName:displayName,photoURL:photoURL}));
          navigate("/browse");
        }).catch((error) => {
          setErrorMessage(error.message)
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+" - "+errorMessage)
        // ..
      });

     }
     else
     {
       //sign in logic
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      // ...
      navigate("/browse");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode+" - "+errorMessage)
    });


     }
  }


  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
        <Header/>
        
        <div className="absolute">
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="logo"/>
        </div>

        <form  onSubmit={(e)=>e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
            <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In": "Sign Up" }</h1>

            {!isSignInForm && (
              <input  ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700"/>
              
            )
            }
            <input
            ref={email}
              type="text"
              placeholder="Email address"
              className="p-4 my-4 w-full bg-gray-700"
            />
            <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700"
            />

            <p className="text-red-700">{ErrorMessage}</p>
            <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
                {isSignInForm ? "Sign In": "Sign Up" }
            </button>
            <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm? "New to Netflix? Sign Up Now":"Already registered? Sign In Now." }</p>
        </form>
    </div>
  )
}

export default Login