"use client";
import Home from '@/lib/home';
import Navbar from '@/lib/navbar';
import Service from '@/lib/ourServices';

import Footer from '@/lib/footer';
import AboutUs from '@/lib/aboutUs';
import React from 'react';
import ContactUs from '@/lib/contactUs';
import OurSkills from '@/lib/ourSkills';
import OurWorkCenter from '@/lib/ourWorkCenter';
import { useRef } from "react";


export default function Page() {
  const ourWorkRef = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLDivElement>(null);
  const contactUsRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='w-full flex flex-col items-center justify-center overflow-hidden'>
      <Navbar
        page="home"
        onNavClick={{
          ourWork: () => scrollToRef(ourWorkRef),
          aboutUs: () => scrollToRef(aboutUsRef),
          contactUs: () => scrollToRef(contactUsRef),
        }}
      />
      <Home/>
      <OurWorkCenter ref={ourWorkRef}/>
      <AboutUs ref={aboutUsRef}/>
      <OurSkills  />
      <Service  />
      <ContactUs ref={contactUsRef} />
      <Footer />
    </div>
  )
}
