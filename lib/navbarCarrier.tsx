"use client";
import NavLink from '@/components/navLink';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NavbarCarrier() {
  const [bgNav, setBgNav] = useState("Career");
  const router = useRouter();

  const nav = [
    {
      isi: "Home",
      warna: "text-[#4F006C]",
      active: "text-[#4F006C] bg-[#D9C6FF] font-bold",
      bg: "hover:bg-[#D9C6FF] hover:font-bold active:bg-[#BFA4FF]",
      link: () => {
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
        setBgNav("Our Work");
      },
    },
    {
      isi: "About Us",
      warna: "text-[#004C6C]",
      active: "text-[#004C6C] bg-[#D4F6FF] font-bold",
      bg: "hover:bg-[#D4F6FF] hover:font-bold active:bg-[#BFA4FF]",
      link: () => {
        setBgNav("About Us");
      },
    },
    {
      isi: "Contact",
      warna: "text-[#6C4E00]",
      active: "text-[#6C4E00] bg-[#FEFFD4] font-bold",
      bg: "hover:bg-[#FEFFD4] hover:font-bold active:bg-[#BFA4FF]",
      link: () => {
        setBgNav("Contact");
      },
    },
    {
      isi: "Career",
      warna: "text-[#004C6C]",
      active: "text-[#004C6C] bg-[#D4F6FF] font-bold",
      bg: "hover:bg-[#D4F6FF] hover:font-bold active:bg-[#BFA4FF]",
      link: () => {
        setBgNav("Career");
        router.push("/career");
      },
    },
    {
      isi: "Book Online",
      warna: "text-[#4F006C]",
      active: "text-[#4F006C] bg-[#D9C6FF] font-bold",
      bg: "hover:bg-[#D9C6FF] hover:font-bold active:bg-[#BFA4FF]",
      link: () => {
        setBgNav("Book Online");
      },
    },
  ];

  return (
    <div className="h-20 flex flex-row justify-between items-center gap-4 px-4 fixed top-0 w-full z-100">
      <div
        className="flex items-center gap-2 pl-6 cursor-pointer z-101 pt-2"
        onClick={() => {
          setBgNav("Home");
          router.push("/");
        }}
        >
        <Image width={140} height={140} src="/indokoding-warna.svg" alt="indokoding" className="w-10 h-10" />
        <span className="text-xl font-bold text-black">&lt;indokoding/&gt;</span>
      </div>

      <div className="h-20 flex flex-row justify-center items-start pt-7 fixed top-0 left-0 w-full z-100 bg-gradient-to-b from-white to-transparent">
        {nav.map((x, y) => (
          <NavLink key={y} warna={bgNav === x.isi ? x.active : x.warna} bg={x.bg} klik={x.link}>
            {x.isi}
          </NavLink>
        ))}
      </div>
        <footer/>
    </div>
  );
}
