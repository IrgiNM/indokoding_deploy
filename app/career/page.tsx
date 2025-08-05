"use client";
import Navbar from '@/lib/navbar';

import Footer from '@/lib/footer';
import JoinUsPage from '@/lib/joinUs';
import CareerApply from '@/lib/careerApply';

export default function page() {
  return (
    <div className='w-full flex flex-col items-center justify-center overflow-hidden'>
      <Navbar page="Career" 
        onNavClick={{
        }}/>
      <JoinUsPage/>
      <CareerApply />
      <Footer />
    </div>
  )
}

