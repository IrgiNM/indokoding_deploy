"use client";
import NavLink from '@/components/navLink';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Navbar({
  page,
  onNavClick,
}: {
  page: string;
  onNavClick: {
    ourWork?: () => void;
    aboutUs?: () => void;
    contact?: () => void;
  };
}) {
  const [bgNav, setBgNav] = useState(page);
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isClick, setIsClick] = useState(false);
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
    {
      isi: "Contact",
      warna: "text-[#6C4E00]",
      active: "text-[#6C4E00] bg-[#FEFFD4] font-bold",
      bg: "hover:bg-[#FEFFD4] hover:font-bold active:bg-[#BFA4FF]",
      link: () => {
        console.log("Contact clicked");
        setBgNav("Contact");
      },
    },
    {
      isi: "Career",
      warna: "text-[#004C6C]",
      active: "text-[#004C6C] bg-[#D4F6FF] font-bold",
      bg: "hover:bg-[#D4F6FF] hover:font-bold active:bg-[#BFA4FF]",
      link: () => {
        console.log("Career clicked");
        setBgNav("Career");
        router.push("/career"); // <-- navigasi ke halaman career
      },
    },
    {
      isi: "Book Online",
      warna: "text-[#4F006C]",
      active: "text-[#4F006C] bg-[#D9C6FF] font-bold",
      bg: "hover:bg-[#D9C6FF] hover:font-bold active:bg-[#BFA4FF]",
      link: () => {
        console.log("Book Online clicked");
        setBgNav("Book Online");
        router.push("/bookOnline"); // <-- navigasi ke halaman book online
      },
    },
  ];
  
  return (
    <>
    <div className={`w-full lg:h-20 h-40 bg-gradient-to-b fixed top-0 from-white z-20 to-transparent ${scrolled ? 'lg:bg-white lg:shadow-md' : 'lg:bg-gradient-to-b lg:from-white lg:to-transparent'}`}>

      <div className="hidden h-20 lg:flex flex-row justify-center relative items-start gap-4 pt-7 w-full  ">
        {nav.map((x, y) => (
          <NavLink key={y} warna={bgNav === x.isi ? x.active : x.warna} bg={x.bg} klik={x.link}>
            {x.isi}
          </NavLink>
        ))}
        {bgNav !== "Home" && 
          <div className='flex flex-row justify-start items-center gap-4 absolute top-6 left-10 w-50 z-20'>
            <Image width={140} height={140} src="/logo2.svg" alt="" className='hidden w-10 lg:flex'/>
          </div>
        }
        
      </div>

      
      <div className='lg:hidden w-full fixed right-0 flex'>
        <button onClick={handleClick} className='w-12 h-12 flex justify-center items-center bg-[#AD48FF] rounded-full absolute top-5 right-5 active:bg-gradient-to-b active:from-[#AD48FF] active:to-[#6f09c3] active:font-bold z-21'>
          {isClick ?
          <Image width={140} height={140} src="/close.svg" alt="" className='w-5'/>
          :
          <Image width={140} height={140} src="/2line-navbar.svg" alt="" className='w-5'/>
          }
        </button>

        {isClick && <><div className='flex flex-col justify-start gap-3 items-start pl-5 pt-30 h-200 w-60 absolute z-20 right-0 top-0 bg-[#412E57]'>
          <button className='font-semibold text-white py-2 pl-5 border border-[#76559c] rounded-md w-50 text-left'>Home</button>
          <button className='font-semibold text-white py-2 pl-5 border border-[#76559c] rounded-md w-50 text-left'>Our Work</button>
          <button className='font-semibold text-white py-2 pl-5 border border-[#76559c] rounded-md w-50 text-left'>About Us</button>
          <button className='font-semibold text-white py-2 pl-5 border border-[#76559c] rounded-md w-50 text-left'>Contact Us</button>
          <button className='font-semibold text-white py-2 pl-5 border border-[#76559c] rounded-md w-50 text-left'>Career</button>
          <button className='font-semibold text-white py-2 pl-5 border border-[#76559c] rounded-md w-50 text-left'>Book Online</button>
        </div>
        <div className='w-200 h-200 bg-white opacity-70 absolute right-0 z-19 blur-xl'>ssc</div></>
        }
        <Image width={140} height={140} src="/logo2.svg" alt="" className={`lg:hidden absolute w-15 left-5 top-5 ${scrolled && 'hidden'}`}/>
        
      </div>
    </div>
    </>
  );
}