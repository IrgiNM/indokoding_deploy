"use client";
import { BookOnline } from '@/lib/bookOnline';
import Navbar from '@/lib/navbar'

import React, { useRef, useState } from 'react'
import Footer from '@/lib/footer'
import { Service2 } from '@/lib/ourServices2';

export default function Page() {
  const ourWorkRef = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLDivElement>(null);
  const contactUsRef = useRef<HTMLDivElement>(null);
  const ourSkillRef = useRef<HTMLDivElement>(null);
  const serviceRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const [page, setPage] = useState("home");
  return (
    <div className='w-full flex flex-col items-center justify-center overflow-hidden'>
      <Navbar 
        page="Book Online" 
        onNavClick={{
        }}
      />
      <BookOnline/>
      <Service2/>
      <Footer
        page={page}
        onNavClick={{
          ourWork: () => {
            scrollToRef(ourWorkRef);
            setPage("Our Work");
          },
          aboutUs: () => {
            scrollToRef(aboutUsRef);
            setPage("About Us");
          },
          contactUs: () => {
            scrollToRef(contactUsRef);
            setPage("Contact Us");
          },
          ourSkill: () => {
            scrollToRef(ourSkillRef);
            setPage("About Us");
          },
          ourService: () => {
            scrollToRef(serviceRef);
            setPage("About Us");
          },
        }}
      />
    </div>
  )
}
