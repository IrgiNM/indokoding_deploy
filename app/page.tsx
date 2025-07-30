"use client";
import Home from '@/lib/home';
import Navbar from '@/lib/navbar';
import Service from '@/lib/ourServices';

import Footer from '@/lib/footer';
import AboutUs from '@/lib/aboutUs';
import ContactUs from '@/lib/contactUs';
import OurSkills from '@/lib/ourSkills';
import OurWork from '@/lib/ourWork';
import ContactUsSm from '@/lib/mobile/contactUsSm';
import FooterSm from '@/lib/mobile/footerSm';
import CenterMode from '@/lib/ourWorkCenter';

export default function page() {
  return (
    <div className='w-full flex flex-col items-center justify-center overflow-hidden'>
      <Navbar page="Home"/>
      <Home/>
      <OurWork/>
      <CenterMode />
      <AboutUs/>
      <OurSkills/>
      <Service/>
      {/* <ContactUs /> */}
      <ContactUsSm />
      <Footer />
      {/* <FooterSm /> */}
    </div>
  )
}
