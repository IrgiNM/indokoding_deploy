import { collection, getDocs, or, query, where } from "firebase/firestore";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { auth, db, provider, signInWithPopup } from '../firebase/config'; // sesuaikan path
import { getToken } from "@/utils/getToken";


export default function SignUpForm(props: { onLogIn: () => void }) {

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

    const [formDataRegister, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "guest",
    });   

    const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleRegister = async () => {
        setIsLoading(true);
        // Query Firestore untuk cek username
        const checkUserQuery = query(
            collection(db, "users"),
            or(
                where("username", "==", formDataRegister.username),
                where("email", "==", formDataRegister.email)
            )
        );
        const checkSnap = await getDocs(checkUserQuery);

        if( checkSnap.empty) {
            
            try {
                const res = await fetch("http://localhost:3001/api/registerUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataRegister),
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
                setMessage(data.message);
                setToken(data.token);
                console.log("Token:", data.token);
                alert(data.message || "Registrasi berhasil!");
                } else {
                alert(data.message || "Registrasi gagal");
                }
            } catch (error) {
                console.error("Error saat registrasi:", error);
                alert("Terjadi kesalahan saat registrasi");
            } finally {
                setIsLoading(false);
            }
        }else {
            alert("Username atau email sudah terdaftar");
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
        <div className='fixed top-50 right-10 z-7'>
            <div className='fixed lg:top-40 lg:left-108 top-40 left-12 lg:w-100 w-72 rounded-xl p-8 bg-white border border-purple-900 flex flex-col justify-start items-center gap-2 z-7'>
                <p className='text-2xl font-bold text-purple-900 mb-2'>Sign Up</p>
                <input type="text" name="username"
                    placeholder="Username"
                    value={formDataRegister.username}
                    onChange={handleChangeRegister} className='border border-purple-400 bg-purple-50 w-full p-2 rounded-full text-[12px] px-4 text-purple-900'/>
                <input type="email" name="email"
                    placeholder="Email@gmail.com"
                    value={formDataRegister.email}
                    onChange={handleChangeRegister} className='border border-purple-400 bg-purple-50 w-full p-2 rounded-full text-[12px] px-4 text-purple-900'/>
                <input type="password" name="password"
                    placeholder="Password"
                    value={formDataRegister.password}
                    onChange={handleChangeRegister} className='border border-purple-400 bg-purple-50 w-full p-2 rounded-full text-[12px] px-4 text-purple-900'/>
                <input type="password" name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formDataRegister.confirmPassword}
                    onChange={handleChangeRegister} className='border border-purple-400 bg-purple-50 w-full p-2 rounded-full text-[12px] px-4 text-purple-900'/>
                <button type='submit' onClick={handleRegister}
                    className='w-full rounded-full p-2 text-[12px] font-bold bg-[#ff097c] hover:bg-[#ae0051] text-white mt-2'>
                        {isLoading ? "Try SignUp..." : "Sign Up"}
                    </button>
                <div className='w-full h-[1px] mt-2 bg-purple-100'></div>
                <button onClick={() => (handleGoogleLogin())}
                className='w-full rounded-full p-3 flex flex-row gap-2 justify-center items-center text-[12px] text-red-900 border font-semibold bg-white hover:bg-blue-50 mt-2'
                >
                <Image width={140} height={140} src="/google-color.svg" alt="" className="w-5"/>
                LogIn with Google
                </button>
                <p className='text-[12px] mt-1'>
                have an account? Please <button onClick={props.onLogIn} className='font-bold cursor-pointer'>Log In</button>
                </p>
            </div>
            {/* <button onClick={props.onClose} className={`relative z-8 lg:-top-13 lg:right-95 -top-14 -right-3 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}>
                <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
            </button> */}
        </div>
    </>
  )
}
