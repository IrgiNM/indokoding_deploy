import React, { useState } from 'react'
import LoginForm from './loginForm';
import SignUpForm from './SignUpForm';

export default function AuthPopUp(props: {login: boolean, signUp: boolean}) {
    const [isSignUp, setIsSignUp] = useState(props.signUp);
    const [isLogIn, setIsLogIn] = useState(props.login);
  return (
    <>
        {isSignUp &&
            <SignUpForm onLogIn={()=>(setIsLogIn(true))}/>
        }
        {isLogIn && 
            <LoginForm onSignUp={()=>(setIsSignUp(true))}/>
        }
        {isSignUp || isLogIn ?
        <div className='fixed z-4 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center'></div>
        : null
        }
        {isSignUp || isLogIn ?
        <div className='fixed z-5 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center'></div>
        : null
        }
    </>
  )
}
