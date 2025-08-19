import { collection, getDocs, or, query, where } from "firebase/firestore";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { auth, db, provider, signInWithPopup } from '../firebase/config'; // sesuaikan path


export default function LoginForm(props: { onSignUp: () => void }) {

    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const [showLogIn, setShowLogIn] = useState(true);

    useEffect(() => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
      }
    }, []);

    const [formDataLogin, setFormDataLogin] = useState({ 
        username: "", 
        password: "",
        role: "guest",
    });
    
    const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormDataLogin((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleLogin = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:3001/api/loginUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formDataLogin.username,
            password: formDataLogin.password,
            role: "guest",
          }),
        });
    
        const data = await res.json();
        console.log("Respon dari server:", data);
    
        if (res.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          localStorage.setItem("email", data.email);
          localStorage.setItem("role", data.role);
          setUsername(data.username);
          setEmail(data.email);
          setRole(data.role);
          setToken(data.token);
          setMessage(data.message);
          alert(data.message || "Login berhasil!");
        } else {
          alert(data.error || "Login gagal");
        }
      } catch (error) {
        console.error("Error saat login:", error);
        console.error("username saat login:", formDataLogin.username);
        console.error("password saat login:", formDataLogin.password);
        alert("Terjadi kesalahan saat login");
      }finally {
        setIsLoading(false);
      }
    };
      
  
    const handleGoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("User Info:", user);
    
        // Ambil token dari Firebase
        const token = await user.getIdToken();
    
        // Simpan ke localStorage (biar sama dengan login biasa)
        localStorage.setItem("token", token);
        localStorage.setItem("username", user.displayName || "Guest");
        localStorage.setItem("email", user.email || "");
        localStorage.setItem("role", "guest");
    
        // Simpan ke state React
        setToken(token);
        setUsername(user.displayName || "Guest");
        setEmail(user.email || "");
        setRole("guest");
    
        setMessage("Login dengan Google berhasil!");
        alert(`Welcome ${user.displayName || "Guest"}!`);
      } catch (error) {
        console.error("Google login error:", error);
        alert("Login Google gagal!");
      }
    };
    
  return (
    <>
    {showLogIn && message !== "User berhasil disimpan" && token === "" ?
    <>
    <div className='fixed z-5 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center'></div>
    <div className='fixed z-4 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center'></div>

    <div className='fixed lg:top-40 top-40 lg:left-108 left-12 lg:w-100 w-72 rounded-xl p-8 bg-white border border-purple-900 flex flex-col justify-start items-center gap-2 z-7'>
        <p className='text-2xl font-bold text-purple-900 mb-2'>Log In</p>
        <input type="text" placeholder='Username'
            name="username"
            value={username ? username : formDataLogin.username}
            onChange={handleChangeLogin}
            className='border border-purple-400 bg-purple-50 w-full p-2 rounded-full text-[12px] px-4 text-purple-900'/>
        <input type="password" placeholder='Password'
            name="password"
            value={formDataLogin.password}
            onChange={handleChangeLogin}
            className='border border-purple-400 bg-purple-50 w-full p-2 rounded-full text-[12px] px-4 text-purple-900'/>
        <button onClick={handleLogin} type='submit' className='w-full rounded-full p-2 text-[12px] font-bold bg-blue-400 hover:bg-blue-600 text-white mt-2'>
            {isLoading ? "Try LogIn..." : "Log In"}
        </button>
        <div className='w-full h-[1px] mt-2 bg-purple-100'></div>
        <button 
          onClick={() => (handleGoogleLogin())}
          className='w-full rounded-full p-3 flex flex-row gap-2 justify-center items-center text-[12px] text-purple-900 border font-semibold bg-white hover:bg-blue-50 mt-2'
        >
            <Image width={140} height={140} src="/google-color.svg" alt="" className="w-5"/>
            LogIn with Google
        </button>
        <p className='text-[12px] mt-1 text-justify'>
          Don't have an account? Please <button onClick={props.onSignUp} className='font-bold cursor-pointer'>sign up</button> first.
        </p>
    </div>
    {/* <button onClick={props.onClose} className={`relative z-8 lg:-top-13 lg:right-95 -top-14 -right-3 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}>
        <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
    </button> */}
    </>
    : null
}
    </>
  )
}
