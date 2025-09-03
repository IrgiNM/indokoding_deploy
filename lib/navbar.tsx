"use client";
import NavLink from '@/components/navLink';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AuthPopUp from '@/components/authPopUp';
import PopUpLogin from '@/components/popUpLogin';
import Cookies from "js-cookie";
import { deleteCookies, getCookies } from '@/utils/tokenController';

export default function Navbar({
  page,
  onNavClick,
}: {
  page: string;
  onNavClick: {
    ourWork?: () => void; 
    aboutUs?: () => void;
    contactUs?: () => void;
  };
}) {
  const [bgNav, setBgNav] = useState(page);
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showActive, setShowActive] = useState('none');
  const [love, setLove] = useState(false);
  
  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const savedToken = await getCookies(); // <- pakai await
  
        if (savedToken) {
          // Parse JSON kalau cookies disimpan sebagai string
          const parsed = typeof savedToken === "string" ? JSON.parse(savedToken) : savedToken;
          setShowAuth(false);
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
  }, [showLogOut, showAuth, token]);

  useEffect(() => {
    const checkLoginSuccess = async () => {
      try {
        const savedToken = await getCookies();
        // Langsung parse token kalau ada
        const parsed = savedToken
          ? typeof savedToken === "string"
            ? JSON.parse(savedToken)
            : savedToken
          : null;
  
        if (parsed?.token) {
          setToken(parsed.token);
        }
        // ✅ Apapun kondisi token, popup login akan ditutup
        setShowAuth(false);
      } catch (error) {
        console.error("Gagal membaca cookies:", error);
        setShowAuth(false); // Tetap ditutup walau ada error
      }
    };
  
    // Override alert bawaan browser
    const originalAlert = window.alert;
    window.alert = function (message) {
      if (
        message.includes("Login successful") ||
        message.includes("berhasil")
      ) {
        setTimeout(checkLoginSuccess, 100);
        setShowAuth(false); // ✅ Beri jeda sebelum menutup
      }
      return originalAlert.apply(this, arguments as any);
    };
  
    return () => {
      window.alert = originalAlert; // Kembalikan alert bawaan saat unmount
    };
  }, [showAuth]);
  
  
  const handleClick = () => {
    if (isClick === true) {
      setIsClick(false);
    } else if( isClick === false) {
      setIsClick(true);
    }
  }

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect(() => {
  //   const storedToken: string = Cookies.get("token") || '';
  //   setToken(storedToken);
  // }, [showLogOut, showAuth]);

  const logout = (): void => {
    try {
      deleteCookies();
      alert("Berhasil logout!");
      console.log("Logout berhasil, data dihapus dari cookies");
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };
  

  const nav = [
    {
      isi: "Home",
      warna: "text-[#4F006C]",
      active: "text-[#4F006C] bg-[#D9C6FF] font-bold",
      bg: "hover:bg-[#D9C6FF] hover:font-bold active:bg-[#BFA4FF]",
      link: () => {
        console.log("Home clicked");
        setBgNav("Home");
        router.push("/");
      },
    },
    {
      isi: "Our Work",
      warna: "text-[#128900]",
      active: "text-[#128900] bg-[#D4FFDB] font-bold",
      bg: "hover:bg-[#D4FFDB] hover:font-bold active:bg-[#BFA4FF]",
      link: () => {
        console.log("Our Work clicked");
        setBgNav("Our Work");
        onNavClick.ourWork?.();
      },
    },
    {
      isi: "About Us",
      warna: "text-[#004C6C]",
      active: "text-[#004C6C] bg-[#D4F6FF] font-bold",
      bg: "hover:bg-[#D4F6FF] hover:font-bold active:bg-[#BFA4FF]",
      link: () => {
        console.log("About Us clicked");
        setBgNav("About Us");
        onNavClick.aboutUs?.();
      },
    },
    // {
    //   isi: "Contact",
    //   warna: "text-[#6C4E00]",
    //   active: "text-[#6C4E00] bg-[#FEFFD4] font-bold",
    //   bg: "hover:bg-[#FEFFD4] hover:font-bold active:bg-[#BFA4FF]",
    //   link: () => {
    //     console.log("Contact clicked");
    //     setBgNav("Contact");
    //     onNavClick.contactUs?.();
    //   },
    // },
    // {
    //   isi: "Career",
    //   warna: "text-[#004C6C]",
    //   active: "text-[#004C6C] bg-[#D4F6FF] font-bold",
    //   bg: "hover:bg-[#D4F6FF] hover:font-bold active:bg-[#BFA4FF]",
    //   link: () => {
    //     console.log("Career clicked");
    //     setBgNav("Career");
    //     router.push("/career");
    //   },
    // },
    {
      isi: "Book Online",
      warna: "text-[#4F006C]",
      active: "text-[#4F006C] bg-[#D9C6FF] font-bold",
      bg: "hover:bg-[#D9C6FF] hover:font-bold active:bg-[#BFA4FF]",
      link: () => {
        console.log("Book Online clicked");
        setBgNav("Book Online");
        router.push("/bookOnline");
      },
    },
  ];
    
  useEffect(() => {
    console.log("showAuth", showAuth);
    console.log("token",token);
  }, [token, showAuth]);

  return (
    <>
    <div className={`w-full lg:h-20 h-40 bg-gradient-to-b fixed top-0 from-white z-20 to-transparent ${scrolled ? 'lg:bg-white lg:shadow-md' : 'lg:bg-gradient-to-b lg:from-white lg:to-transparent'}`}>

      <div className="hidden h-20 lg:flex flex-row justify-center relative items-start gap-4 pt-7 w-full  ">
        {nav.map((x, y) => (
          <NavLink key={y} warna={bgNav === x.isi ? x.active : x.warna} bg={x.bg} klik={x.link}>
            {x.isi}
          </NavLink>
        ))}
        {(bgNav === "Book Online" || bgNav === "Career" || scrolled === true) && bgNav !== "Home" ?
          <div className={`flex flex-row justify-start items-center gap-4 absolute top-6 left-10 w-50 z-20`}>
            <Image width={140} height={140} src="/logo2.svg" alt="" className='hidden w-10 lg:flex'/>
          </div>
          :
          <div className='absolute top-6 left-10 w-50'></div>
        }
      </div>

      {/* {token ?
      <button onClick={() => (setShowLogOut(true))} className='p-2 px-5 rounded-full border-1 transition-all duration-300 border-[#f00070] text-[12px] absolute lg:right-10 right-19 top-7 font-bold text-[#f00070] hover:bg-[#f00070] hover:text-white'>Log Out</button>
      :
      <>
      <button onClick={() => (setShowActive("login"), setShowAuth(true))} className='p-2 px-5 rounded-full border-1 transition-all duration-300 border-purple-600 text-[12px] absolute lg:right-8 right-19 top-7 font-bold text-purple-600 hover:bg-purple-600 hover:text-white'>Log In</button>
      </>
      } */}
      
      <div className='lg:hidden w-full fixed right-0 flex'>
        <button onClick={handleClick} className='w-12 h-12 flex justify-center items-center bg-[#AD48FF] rounded-full absolute top-5 right-5 active:bg-gradient-to-b active:from-[#AD48FF] active:to-[#6f09c3] active:font-bold z-21'>
          {isClick ?
          <Image width={140} height={140} src="/close.svg" alt="" className='w-5'/>
          :
          <Image width={140} height={140} src="/2line-navbar.svg" alt="" className='w-5'/>
          }
        </button>

        {isClick && <><div className='flex flex-col justify-start gap-3 items-start pl-5 pt-30 h-200 w-60 absolute z-20 right-0 top-0 bg-[#412E57]'>
          <button onClick={() => {
            console.log("Home clicked");
            setBgNav("Home");
            router.push("/");
          }}
          className='font-semibold text-white py-2 pl-5 border border-[#76559c] flex flex-row justify-between pr-4 rounded-md w-50 text-left'>
            Home
            <Image width={140} height={140} src="/home.svg" alt="" className='w-4'/>
          </button>
          {/* <button onClick={() => {
            console.log("Career clicked");
            setBgNav("Career");
            router.push("/career");
          }}
          className='font-semibold text-white py-2 pl-5 border border-[#76559c] flex flex-row justify-between rounded-md w-50 text-left pr-4'>Career
            <Image width={140} height={140} src="/suitcase.svg" alt="" className='w-4'/>
          </button> */}
          <button onClick={() => {
            console.log("Book Online clicked");
            setBgNav("Book Online");
            router.push("/bookOnline");
          }}
          className='font-semibold text-white py-2 pl-5 border border-[#76559c] flex flex-row justify-between rounded-md w-50 text-left pr-2'>Book Online
            <Image width={140} height={140} src="/date.svg" alt="" className='w-7'/>
          </button>
        </div>
        <div className='w-200 h-200 bg-white opacity-70 absolute right-0 z-19 blur-xl'>ssc</div></>
        }
        <Image width={140} height={140} src="/logo2.svg" alt="" className={`lg:hidden absolute w-15 left-5 top-5 ${scrolled && 'hidden'}`}/>
        
      </div>
    </div>


    {showLogOut ?
      <div className='fixed z-4 rounded-lg top-0 right-0 left-0 bottom-0 backdrop-blur-sm flex flex-col justify-center items-center'></div>
      : null
    }
    {showLogOut ?
      <div className='fixed z-5 rounded-lg top-0 right-0 left-0 bottom-0 bg-purple-950 opacity-30 flex flex-col justify-center items-center'></div>
      : null
    }
    {showLogOut && token !== '' ?
      <div className='fixed z-6 lg:top-40 lg:left-140 top-40 p-5 border-1 rounded-lg border-purple-900 bg-white flex flex-col gap-3 justify-center items-center'>
          <Image width={140} height={140} src="/warning-red.svg" alt="" className="w-10"/>
          <p className='text-[12px] text-purple-900 w-30 text-center'>Are you sure you want to log out?</p>
          <button onClick={() => (logout(),setShowLogOut(false))} className='text-[12px] font-bold text-[#f00070] w-full border py-1 rounded-md hover:bg-red-50'>Log Out</button>
          <button onClick={() => (setShowLogOut(false))} className={`fixed z-6 lg:top-37 lg:right-133 lg:mr-0 -mr-40 top-36 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}>
              <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
          </button>
      </div>
      : null
    }

    {showAuth && (token === '' || token === null) ?
      <button onClick={()=>(setShowAuth(false))} className={`fixed z-25 lg:top-27 lg:right-105 top-37 right-8 w-8 h-8 rounded-full bg-[#AD48FF] flex justify-center items-center hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3]`}>
          <Image width={140} height={140} src="/close.svg" alt="" className="w-3"/>
      </button>
    : null
    }

    {showAuth &&
      <PopUpLogin onClick={()=>setShowAuth(false)} isClose={false} isRole="guest"/>
    }
    </>
  );
}