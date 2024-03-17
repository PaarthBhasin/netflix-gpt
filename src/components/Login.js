import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleButtonClick = () => {

        // Validate the form data
        const message = checkValidData(email.current.value, password.current.value)
        setErrorMessage(message)
        // console.log(email)
        if (message) return;

        // Sign in/sign up
        if (!isSignInForm) {
            // sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: "https://avatars.githubusercontent.com/u/90496636?v=4"
                    })
                    .then(() => {
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                        dispatch(
                            addUser({
                                uid:uid,
                                email:email,
                                displayName: displayName,
                                photoURL: photoURL
                            })
                        )
                        navigate("/browse")
                    })
                    .catch((error) => {
                        setErrorMessage(error.message)
                    });
                })

                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage)
                });
        }
        else {
            // sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                    navigate("/browse")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage)
                });
        }
    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="bg" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-75 rounded-lg'>
                <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && <input type="text" ref={name} placeholder='Name' className='p-4 my-4 w-full bg-gray-700 rounded-lg' />}
                <input type="text" ref={email} placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700 rounded-lg' />
                <input type="password" ref={password} placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded-lg' />
                <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
                <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign up now" : "Already registered? Sign in now"}</p>
            </form>
        </div>
    )
}

export default Login
