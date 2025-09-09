"use client";
import Home from '@/lib/home';
import Navbar from '@/lib/navbar';
import Service from '@/lib/ourServices';

import Footer from '@/lib/footer';
import AboutUs from '@/lib/aboutUs';
import React, { useState } from 'react';
import ContactUs from '@/lib/contactUs';
import OurSkills from '@/lib/ourSkills';
import OurWorkCenter from '@/lib/ourWorkCenter';
import { useRef } from "react";


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
        link="home"
        page={page}
        onNavClick={{
          ourWork: () => scrollToRef(ourWorkRef),
          aboutUs: () => scrollToRef(aboutUsRef),
          contactUs: () => scrollToRef(contactUsRef),
        }}
      />
      <Home/>
      <OurWorkCenter id="OurWork" ref={ourWorkRef}/>
      <AboutUs id="AboutUs" ref={aboutUsRef}/>
      <OurSkills id="OurSkill" ref={ourSkillRef} />
      <Service id="Service" ref={serviceRef} />
      <ContactUs id="ContactUs" ref={contactUsRef} />
      <Footer
        link="home"
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
