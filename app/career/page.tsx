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
import OurWorkCenter from '@/lib/ourWorkCenter';
import JoinUs from '@/components/JoinUs';
import JoinUsPage from '@/lib/joinUs';

export default function page() {
  return (
    <div className='w-full flex flex-col items-center justify-center overflow-hidden'>
      <Navbar page="Home"/>
      <JoinUsPage/>
      <Footer />
    </div>
  )
}

