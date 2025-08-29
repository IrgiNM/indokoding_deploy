import { collection, getDocs, or, query, where } from "firebase/firestore";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { auth, db, provider, signInWithPopup } from '../firebase/config'; // sesuaikan path
import Cookies from "js-cookie";
import { getCookies, setCookies } from "@/utils/tokenController";

export default function PopUpLogin() {

    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState<string>("");
    const [showSignUp, setShowSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    

    const [showLogIn, setShowLogIn] = useState(true);

    useEffect(() => {
      const fetchCookies = async () => {
        try {
          const savedToken = await getCookies(); // <- pakai await
    
          if (savedToken) {
            // Parse JSON kalau cookies disimpan sebagai string
            const parsed = typeof savedToken === "string" ? JSON.parse(savedToken) : savedToken;
    
            // Ambil token dan simpan ke state
            setToken(parsed?.token || "");
          } else {
            setToken("");
          }
        } catch (error) {
          console.error("Gagal mengambil cookies:", error);
          setToken("");
        }
      };
    
      fetchCookies();
    }, [isLoading]);
    


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
                Cookies.set("token", data.token, { expires: 7 }); // berlaku 7 hari
                Cookies.set("username", data.username, { expires: 7 });
                Cookies.set("email", data.email, { expires: 7 });
                Cookies.set("role", data.role, { expires: 7 });
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
          await setCookies(data.token, data.username, data.email, data.role);
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
    
        // Simpan ke cookies (biar sama dengan login biasa)
        Cookies.set("token", token, { expires: 7 }); // berlaku 7 hari
        Cookies.set("username", user.displayName || "Guest", { expires: 7 });
        Cookies.set("email", user.email || "", { expires: 7 });
        Cookies.set("role", "guest", { expires: 7 });
    
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
    <div className='fixed z-11 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center'></div>
    <div className='fixed z-10 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center'></div>

    <div className='fixed lg:top-40 top-40 lg:left-108 left-12 lg:w-100 w-72 rounded-xl p-8 bg-white border border-purple-900 flex flex-col justify-start items-center gap-2 z-12'>
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
          onClick={() => (setShowLogIn(false), handleGoogleLogin())}
          className='w-full rounded-full p-3 flex flex-row gap-2 justify-center items-center text-[12px] text-purple-900 border font-semibold bg-white hover:bg-blue-50 mt-2'
        >
            <Image width={140} height={140} src="/google-color.svg" alt="" className="w-5"/>
            LogIn with Google
        </button>
        <p className='text-[12px] mt-1 text-justify'>
          Don't have an account? Please <button onClick={() => setShowSignUp(!showSignUp)} className='font-bold cursor-pointer'>sign up</button> first.
        </p>
    </div>
    <button onClick={() => (setShowLogIn(false))} className={`relative z-8 lg:-top-13 lg:right-95 -top-14 -right-3 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}>
        <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
    </button>
    {showSignUp && message !== "User berhasil disimpan" && token === "" ?
            <div className='fixed top-50 right-10 z-12'>
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
                    <button onClick={() => (setShowSignUp(false), handleGoogleLogin())}
                    className='w-full rounded-full p-3 flex flex-row gap-2 justify-center items-center text-[12px] text-red-900 border font-semibold bg-white hover:bg-blue-50 mt-2'
                    >
                    <Image width={140} height={140} src="/google-color.svg" alt="" className="w-5"/>
                    LogIn with Google
                    </button>
                    <p className='text-[12px] mt-1'>
                    have an account? Please <button onClick={() => setShowSignUp(false)} className='font-bold cursor-pointer'>Log In</button>
                    </p>
                </div>
                <button onClick={() => setShowSignUp(false)} className={`relative z-8 lg:-top-13 lg:right-95 -top-14 -right-3 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}>
                    <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
                </button>
            </div>
            : null
    }
    </>
    : null
}
    </>
  )
}
