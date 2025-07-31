"use client";
import NavLink from '@/components/navLink';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar(props: { page: string }) {
  const [bgNav, setBgNav] = useState(props.page);
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

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
    <div className={`w-full h-20 bg-gradient-to-b fixed top-0 from-white z-20 to-transparent ${scrolled ? 'bg-white shadow-md' : 'bg-gradient-to-b from-white to-transparent'}`}>
      <div className="hidden h-20 lg:flex flex-row justify-center items-start gap-4 pt-7 w-full  ">
        {nav.map((x, y) => (
          <NavLink key={y} warna={bgNav === x.isi ? x.active : x.warna} bg={x.bg} klik={x.link}>
            {x.isi}
          </NavLink>
        ))}
      </div>
      {/* <div className='lg:hidden flex'>
        <button className='w-12 h-12 flex justify-center items-center bg-[#AD48FF] rounded-full absolute top-5 right-5 active:bg-gradient-to-b active:from-[#AD48FF] active:to-[#6f09c3] active:font-bold z-5'>
          {isClick ?
          <Image width={140} height={140} src="/close.svg" alt="" className='w-5'/>
          :
          <Image width={140} height={140} src="/2line-navbar.svg" alt="" className='w-5'/>
          }
        </button>
        <div className='flex flex-col justify-start items-end h-200 w-50 absolute z-3 right-0 top-0 bg-[#4F006C]'></div>
        <div className='w-200 h-200 bg-black opacity-65 absolute z-2 blur-xl'>ssc</div>
      </div> */}
    </div>
    </>
  );
}