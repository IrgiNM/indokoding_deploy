"use client";
import NavLink from '@/components/navLink'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'


export default function Navbar(props: { page: string }) {
  const [bgNav, setBgNav] = useState(props.page);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

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
      link: () => (
        console.log("Home clicked"),
        setBgNav("Home"),
        router.push("/")
      )
    },
    {
      isi: "Our Work",
      warna: "text-[#128900]",
      active: "text-[#128900] bg-[#D4FFDB] font-bold",
      bg: "hover:bg-[#D4FFDB] hover:font-bold active:bg-[#BFA4FF]",
      link: () => (
        console.log("Our Work clicked"),
        setBgNav("Our Work")
      )
    },
    {
      isi: "About Us",
      warna: "text-[#004C6C]",
      active: "text-[#004C6C] bg-[#D4F6FF] font-bold",
      bg: "hover:bg-[#D4F6FF] hover:font-bold active:bg-[#BFA4FF]",
      link: () => (
        console.log("About Us clicked"),
        setBgNav("About Us")
      )
    },
    {
      isi: "Contact",
      warna: "text-[#6C4E00]",
      active: "text-[#6C4E00] bg-[#FEFFD4] font-bold",
      bg: "hover:bg-[#FEFFD4] hover:font-bold active:bg-[#BFA4FF]",
      link: () => (
        console.log("Contact clicked"),
        setBgNav("Contact")
      )
    },
    {
      isi: "Career",
      warna: "text-[#004C6C]",
      active: "text-[#004C6C] bg-[#D4F6FF] font-bold",
      bg: "hover:bg-[#D4F6FF] hover:font-bold active:bg-[#BFA4FF]",
      link: () => (
        console.log("Career clicked"),
        setBgNav("Career")
      )
    },
    {
      isi: "Book Online",
      warna: "text-[#4F006C]",
      active: "text-[#4F006C] bg-[#D9C6FF] font-bold",
      bg: "hover:bg-[#D9C6FF] hover:font-bold active:bg-[#BFA4FF]",
      link: () => (
        console.log("Book Online clicked"),
        setBgNav("Book Online"),
        router.push("/bookOnline")
      )
    },
  ];

  return (
    <div className={`h-20 flex flex-row justify-center items-start gap-4 pt-5 fixed top-0 w-full z-50 transition-all duration-300
      ${scrolled ? 'bg-white shadow-md' : 'bg-gradient-to-b from-white to-transparent'}`}>
      {nav.map((x, y) => (
        <NavLink key={y} warna={bgNav === x.isi ? x.active : x.warna} bg={x.bg} klik={x.link}>
          {x.isi}
        </NavLink>
      ))}
    </div>
  );
}

