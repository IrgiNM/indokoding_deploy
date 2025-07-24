"use client";
import NavLink from '@/components/navLink'
import Home from '@/lib/home'
import { BookOnline } from '@/lib/bookOnline';
import Navbar from '@/lib/navbar'
import Service from '@/lib/ourServices';

import React from 'react'
import Footer from '@/components/footer'
import OurWork from '@/lib/ourWork'
import OurSkills from '@/lib/ourSkills';
import AboutUs from '@/lib/aboutUs';
import ClientDetails from '@/lib/clientDetails';
import ContactUs from '@/lib/contactUs';

export default function page() {
  return (
    <div className='w-full flex flex-col items-center justify-center overflow-hidden'>
      <Navbar/>
      <Home/>
      <OurWork/>
      <AboutUs/>
      <ClientDetails />
      <ContactUs />
      <OurSkills/>
      <Footer />
    </div>
  )
}
