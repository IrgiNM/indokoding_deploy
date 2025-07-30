"use client";
import { BookOnline } from '@/lib/bookOnline';
import Navbar from '@/lib/navbar'

import React from 'react'
import Footer from '@/lib/footer'
import { Service2 } from '@/lib/ourServices2';

export default function page() {
  return (
    <div className='w-full flex flex-col items-center justify-center overflow-hidden'>
      <Navbar page="Book Online"/>
      <BookOnline/>
      <Service2/>
      <Footer />
    </div>
  )
}
