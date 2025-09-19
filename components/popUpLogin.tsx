import { getCookies, setCookies } from "@/utils/tokenController";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { auth, db, provider, signInWithPopup } from '../firebase/config'; // sesuaikan path
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { FirebaseError } from "firebase/app";

type PopUpLoginProps = {
  onClick: () => void;
  isClose: boolean;
  isRole: string;
};

export default function PopUpLogin({isClose, isRole }: PopUpLoginProps) {

    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState<string>("");
    const [showSignUp, setShowSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const signUpClose = isClose;
    const isAdmin = isRole;
    const router = useRouter();
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    

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
      role: isAdmin,
      captcha: captchaToken,
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
        if (!captchaToken) {
          Swal.fire({
            title: "Verification Required",
            text: "Please complete the reCAPTCHA verification",
            icon: "warning"
          });
          return;
        }
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
                const res = await fetch("/api/registerUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataRegister),
                });

                const data = await res.json();

                if (res.ok) {
                await setCookies(data.token, data.username, data.email, data.role);
                setUsername(data.username);
                setMessage(data.message);
                setToken(data.token);
                if(data.role==='admin'){
                  router.push("/admin/dashboard");
                }
                Swal.fire({
                  title: "Registration successful!",
                  icon: "success",
                  draggable: true
                });
                // alert(data.message || "Registrasi berhasil!");
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Registration failed!",
                  });
                // alert(data.message || "Registrasi gagal");
                }
            } catch (error) {
                console.error("Error saat registrasi:", error);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "an error occurred during registration",
                });
                // alert("Terjadi kesalahan saat registrasi");
            } finally {
                setIsLoading(false);
            }
        }else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "username or email already registered",
            });
            // alert("Username atau email sudah terdaftar");
        }
    };

    const [formDataLogin, setFormDataLogin] = useState({ 
        username: "", 
        password: "",
        role: isAdmin,
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
        const res = await fetch("/api/loginUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formDataLogin.username,
            password: formDataLogin.password,
            role: isAdmin,
          }),
        });
    
        const data = await res.json();
    
        if (res.ok) {
          await setCookies(data.token, data.username, data.email, data.role);
          setUsername(data.username);
          setToken(data.token);
          setMessage(data.message);
          if(data.role==='admin'){
            router.push("/admin/dashboard");
          }
          Swal.fire({
            title: "Login successful!",
            icon: "success",
            draggable: true
          });
          // alert(data.message || "Login berhasil!");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Login failed!",
          });
          // alert(data.error || "Login gagal");
        }
      } catch (error) {
        console.error("Error saat login:", error);
        console.error("username saat login:", formDataLogin.username);
        console.error("password saat login:", formDataLogin.password);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "an error occurred during login",
        });
        // alert("Terjadi kesalahan saat login");
      }finally {
        setIsLoading(false);
      }
    };
      
  
    const handleGoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
    
        // Ambil token dari Firebase
        const token = await user.getIdToken();

        await setCookies(token, (user.displayName ? user.displayName : "empty"), (user.email ? user.email : "empty@gmail.com"), "guest");

        // Simpan ke state React
        setToken(token);
        setUsername(user.displayName || "Guest");
        setMessage("Login dengan Google berhasil!");

        const res = await fetch("/api/registerGoogleUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.displayName,
          email: user.email,
          role: isAdmin,
        }),
        });

        const data = await res.json();

        if (res.ok) {
        setUsername(data.username);
        setMessage(data.message);
        setToken(data.token);
        if(data.role==='admin'){
          router.push("/admin/dashboard");
        }
        Swal.fire({
          title: data.message || "Registrasi successful!",
          icon: "success",
          draggable: true
        });
        // alert(data.message || "Registrasi berhasil!");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Registrasi failed!",
          });
        // alert(data.error || "Registrasi gagal");
        }
    
        Swal.fire(`Welcome ${user.displayName || "Guest"}!`);
        // alert(`Welcome ${user.displayName || "Guest"}!`);
      } catch (err: unknown) {
        const error = err as FirebaseError;
        // console.error("Google login error:", error);

        if (error.code === "auth/popup-closed-by-user") {
          Swal.fire({
            icon: "warning",
            title: "Login canceled",
            text: "You closed the Google login popup.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Google login failed!",
          });
        }
        // alert("Login Google gagal!");
      }
    };

    const handleGoogleLoginAdmin = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
    
        // Ambil token dari Firebase
        await user.getIdToken();

        setMessage("Login dengan Google berhasil!");
        
        const res = await fetch("/api/loginGoogleAdmin",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.displayName,
          email: user.email,
          role: 'admin',
        }),
        });
        
        const data = await res.json();

        if (res.ok) {
          await setCookies(data.token, data.username, data.email, data.role);
          setUsername(data.username);
          setMessage(data.message);
          setToken(data.token);
          if(data.role==='admin'){
            router.push("/admin/dashboard");
          }
          Swal.fire({
            title: data.message || "Registrasi successful!",
            icon: "success",
            draggable: true
          });
          // alert(data.message || "Registrasi berhasil!");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Registrasi failed!",
          });
          // alert(data.error || "Registrasi gagal!");
          router.push("/");
        }
        
        Swal.fire(`Welcome ${user.displayName || "Guest"}!`);
        // alert(`Welcome ${user.displayName || "Guest"}!`);
      } catch (err: unknown) {
        const error = err as FirebaseError;
        // console.error("Google login error:", error);

        if (error.code === "auth/popup-closed-by-user") {
          Swal.fire({
            icon: "warning",
            title: "Login canceled",
            text: "You closed the Google login popup.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Google login failed!",
          });
        }
        // alert("Login Google gagal!");
      }
    };
    

  return (
    <>
      {showLogIn && message !== "User berhasil disimpan" && token === "" ? (
        <>
          <div className="fixed z-11 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center"></div>
          <div className="fixed z-10 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center"></div>
          <div className="fixed z-12 right-0 left-0 top-0 bottom-0 flex justify-center items-center">
            <div className="relative lg:-top-10 top-0 lg:left-0 left-0 lg:w-100 w-72 rounded-xl p-8 bg-white border border-purple-900 flex flex-col justify-start items-center gap-2 z-12">
              <p className="text-2xl font-bold text-purple-900 mb-2">Log In</p>
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={username ? username : formDataLogin.username}
                onChange={handleChangeLogin}
                className="border border-purple-400 bg-purple-50 w-full p-2 rounded-full text-[12px] px-4 text-purple-900"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formDataLogin.password}
                onChange={handleChangeLogin}
                className="border border-purple-400 bg-purple-50 w-full p-2 rounded-full text-[12px] px-4 text-purple-900"
              />
              <button
                onClick={handleLogin}
                type="submit"
                className="w-full rounded-full p-2 text-[12px] font-bold bg-blue-400 hover:bg-blue-600 text-white mt-2"
              >
                {isLoading ? "Try LogIn..." : "Log In"}
              </button>
              <div className="w-full h-[1px] mt-2 bg-purple-100"></div>
              <button
                onClick={() => {
                  setShowLogIn(false);
                  if (isAdmin === "admin") {
                    handleGoogleLoginAdmin();
                  } else if (isAdmin === "guest") {
                    handleGoogleLogin();
                  }
                }}
                className="w-full rounded-full p-3 flex flex-row gap-2 justify-center items-center text-[12px] text-purple-900 border font-semibold bg-white hover:bg-blue-50 mt-2"
              >
                <Image
                  width={140}
                  height={140}
                  src="/google-color.svg"
                  alt=""
                  className="w-5"
                />
                LogIn with Google
              </button>
              <p className="text-[12px] mt-1 text-justify">
                Don&apos;t have an account? Please{" "}
                <button
                  onClick={() => setShowSignUp(!showSignUp)}
                  className="font-bold cursor-pointer"
                >
                  sign up
                </button>{" "}
                first.
              </p>
              {/* <button
                onClick={() => setShowLogIn(false)}
                className={`absolute z-8 lg:-top-4 lg:-right-4 -top-4 -right-3 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}
              >
                <Image
                  width={140}
                  height={140}
                  src="/close.svg"
                  alt=""
                  className="w-3"
                />
              </button> */}
            </div>
          </div>
          {/* <button
            onClick={() => setShowLogIn(false)}
            className={`relative z-13 lg:-top-16 lg:right-95 -top-14 -right-3 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}
          >
            <Image
              width={140}
              height={140}
              src="/close.svg"
              alt=""
              className="w-3"
            />
          </button> */}
          {showSignUp &&
          message !== "User berhasil disimpan" &&
          token === "" ? (
            <div className="fixed z-12 right-0 left-0 top-0 bottom-0 flex justify-center items-center">
              <div className="fixed flex justify-center items-center top-0 right-0 bottom-0 left-0 z-12">
                <div className="relative lg:top-11 lg:left-0 top-18 left-0 lg:w-100 w-72 rounded-xl p-8 bg-white border border-purple-900 flex flex-col justify-start items-center gap-2 z-7">
                  <p className="text-2xl font-bold text-purple-900 mb-2">
                    Sign Up
                  </p>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formDataRegister.username}
                    onChange={handleChangeRegister}
                    className="border border-purple-400 bg-purple-50 w-full p-2 rounded-full text-[12px] px-4 text-purple-900"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email@gmail.com"
                    value={formDataRegister.email}
                    onChange={handleChangeRegister}
                    className="border border-purple-400 bg-purple-50 w-full p-2 rounded-full text-[12px] px-4 text-purple-900"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formDataRegister.password}
                    onChange={handleChangeRegister}
                    className="border border-purple-400 bg-purple-50 w-full p-2 rounded-full text-[12px] px-4 text-purple-900"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formDataRegister.confirmPassword}
                    onChange={handleChangeRegister}
                    className="border border-purple-400 bg-purple-50 w-full p-2 rounded-full text-[12px] px-4 text-purple-900"
                  />
                  <ReCAPTCHA
                    className="w-68"
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={(token) => {
                      setCaptchaToken(token);
                    }}
                    onExpired={() => {
                      setTimeout(() => {
                        setCaptchaToken(null);
                      }, 30000); // 30 detik
                    }}
                  />
                  <button
                    type="submit"
                    onClick={handleRegister}
                    className="w-full rounded-full p-2 text-[12px] font-bold bg-[#ff097c] hover:bg-[#ae0051] text-white mt-2"
                  >
                    {isLoading ? "Try SignUp..." : "Sign Up"}
                  </button>

                  <div className="w-full h-[1px] mt-2 bg-purple-100"></div>
                  <button
                    onClick={() => (setShowSignUp(false), handleGoogleLogin())}
                    className="w-full rounded-full p-3 flex flex-row gap-2 justify-center items-center text-[12px] text-red-900 border font-semibold bg-white hover:bg-blue-50 mt-2"
                  >
                    <Image
                      width={140}
                      height={140}
                      src="/google-color.svg"
                      alt=""
                      className="w-5"
                    />
                    LogIn with Google
                  </button>
                  <p className="text-[12px] mt-1">
                    have an account? Please{" "}
                    <button
                      onClick={() => setShowSignUp(false)}
                      className="font-bold cursor-pointer"
                    >
                      Log In
                    </button>
                  </p>
                </div>
                {signUpClose && (
                  <button
                    onClick={() => setShowSignUp(false)}
                    className={`relative z-8 lg:-top-3 lg:right-95 -top-14 -right-3 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}
                  >
                    <Image
                      width={140}
                      height={140}
                      src="/close.svg"
                      alt=""
                      className="w-3"
                    />
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
}
