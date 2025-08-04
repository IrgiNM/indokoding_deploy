"use client";
import Home from '@/lib/home';
import Navbar from '@/lib/navbar';
import Service from '@/lib/ourServices';

import Footer from '@/lib/footer';
import AboutUs from '@/lib/aboutUs';
import ContactUs from '@/lib/contactUs';
import OurSkills from '@/lib/ourSkills';
import OurWork from '@/lib/ourWork';
import CenterMode from '@/lib/ourWorkCenter';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import OurWorkCenter from '@/lib/ourWorkCenter';
import { useRef } from "react";


export default function page() {
  const ourWorkRef = useRef<HTMLDivElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='w-full flex flex-col items-center justify-center overflow-hidden'>
      <Navbar
        page="home"
        onNavClick={{
          ourWork: () => scrollToRef(ourWorkRef),
        }}
      />
      <Home />
      <OurWorkCenter ref={ourWorkRef}/>
      <AboutUs  />
      <OurSkills  />
      <Service  />
      <ContactUs  />
      <Footer />
    </div>
  )
}
