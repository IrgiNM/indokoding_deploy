"use client";
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Home() {
  const router = useRouter();
  return (
    <div className='lg:w-full lg:h-200 lg:relative lg:flex lg:flex-col lg:pt-25 lg:items-center lg:justify-start w-full h-140 relative flex flex-col pt-25 pl-10 items-start justify-start'>


        <div className='flex flex-row justify-center items-center gap-4 mt-9 lg:hidden'>
            <p className='text-[12px] text-[#4F006C] font-semibold'>&lt;indokoding/&gt;</p>
            <div className='w-[1.5px] h-3 bg-[#4F006C]'></div>
            <p className='text-[12px] text-[#4F006C]'>IT Services</p>
        </div>
        <Image width={140} height={140} src="/logo.svg" alt="" className='hidden lg:flex'/>

        <div className='relative'>
          <h1 className='lg:text-6xl lg:font-bold lg:text-[#4F006C] lg:mt-5 lg:flex hidden'>BESPOKE SOFTWARE FOR</h1>
          <h1 className='text-[30px] font-bold text-[#4F006C] mt-0 lg:hidden'>BESPOKE SOFTWARE</h1>
          <h1 className='text-[30px] font-bold text-[#4F006C] -mt-2 lg:hidden'>FOR</h1>
          <h1 className='lg:text-6xl lg:font-bold lg:text-[#4F006C] lg:mt-1 lg:pl-80 text-[30px] font-bold text-[#4F006C] -mt-2'>BUSINESSES</h1>
          <div className='absolute lg:top-19 lg:-left-26 -top-38 -left-10 z-1 p-5 w-110'>
            <p className='lg:text-6xl lg:font-bold lg:italic lg:text-[#4F006C] lg:px-10 lg:pt-3 lg:pb-5 lg:border-5 lg:ml-20 lg:rounded-full lg:border-[#AD48FF] lg:backdrop-blur lg:absolute lg:left-0 lg:top-0 lg:-rotate-4 text-2xl font-bold italic text-[#4F006C] px-5 pt-1 pb-2 border-3 rounded-full border-[#AD48FF] backdrop-blur absolute left-26 top-47 -rotate-4'>Growing</p>
            <Image width={140} height={140} src="/assets/image/3line_purple.png" alt="gambar-icon-3garis" className='lg:w-17 lg:-rotate-30 lg:absolute lg:left-5 lg:top-5 lg:scale-x-[1] w-8 rotate-40 absolute right-38 top-49 scale-x-[-1]'/>
          </div>
        </div>


        <div className='lg:flex lg:flex-row lg:justify-center lg:items-center lg:gap-4 lg:mt-9 hidden'>
            <p className='lg:text-sm lg:text-[#4F006C] lg:font-bold'>&lt;indokoding/&gt;</p>
            <div className='lg:w-[2px] lg:h-5 lg:bg-[#4F006C]'></div>
            <p className='lg:text-sm lg:text-[#4F006C]'>IT Services</p>
        </div>
        <button className='lg:px-12 lg:py-3 lg:text-xl lg:text-white lg:font-semibold lg:mt-13 lg:rounded-full lg:bg-[#AD48FF] lg:hover:bg-gradient-to-b lg:hover:from-[#AD48FF] lg:hover:to-[#6f09c3] lg:hover:font-bold lg:transition lg:duration-200 px-6 py-2 text-sm text-white font-semibold mt-7 rounded-full bg-[#AD48FF] hover:bg-gradient-to-b hover:from-[#AD48FF] hover:to-[#6f09c3] hover:font-bold transition duration-200' onClick={()=>(
          router.push("/bookOnline")
        )}>Start Book Now</button>




        {/* ABSOLUTE */}
        {/* <div className='absolute lg:top-73 lg:left-50 top-0 left-0 z-1 p-5 w-110'>
          <p className='lg:text-6xl lg:font-bold lg:italic lg:text-[#4F006C] lg:px-10 lg:pt-3 lg:pb-5 lg:border-5 lg:ml-20 lg:rounded-full lg:border-[#AD48FF] lg:backdrop-blur lg:absolute lg:left-0 lg:top-0 lg:-rotate-4 text-2xl font-bold italic text-[#4F006C] px-5 pt-1 pb-2 border-3 rounded-full border-[#AD48FF] backdrop-blur absolute left-26 top-47 -rotate-4'>Growing</p>
          <Image width={140} height={140} src="/assets/image/3line_purple.png" alt="gambar-icon-3garis" className='lg:w-17 lg:-rotate-30 lg:absolute lg:left-5 lg:top-5 lg:scale-x-[1] w-8 rotate-40 absolute right-38 top-49 scale-x-[-1]'/>
        </div> */}
        <Image width={140} height={140} src="/assets/image/pythonb.png" alt="gambar-pythonb" className='lg:w-30 lg:-rotate-10 lg:absolute lg:left-25 lg:top-40 w-8 rotate-10 absolute left-45 top-25'/>
        <Image width={140} height={140} src="/assets/image/pythonk.png" alt="gambar-pythonk" className='lg:w-35 lg:rotate-25 lg:blur-[2px] lg:absolute lg:right-30 lg:top-25 w-17 rotate-55 absolute right-15 z-1 top-1'/>
        <Image width={140} height={140} src="/assets/image/golang.png" alt="gambar-golang" className='lg:w-45 lg:-rotate-30 lg:absolute lg:-right-10 lg:top-95 w-23 -rotate-30 absolute -right-5 top-65'/>
        <Image width={140} height={140} src="/assets/image/postgre.png" alt="gambar-postgre" className='lg:w-75 lg:-rotate-25 lg:absolute lg:-left-10 lg:top-95 lg:blur-[2px] lg:scale-x-[1] w-20 rotate-15 absolute right-25 top-85 scale-x-[-1]'/>

        {/* CIRCLE */}
        <div className='lg:absolute lg:-left-20 lg:-top-20 lg:w-130 lg:h-130 lg:rounded-full lg:bg-[#F1D6FF] lg:-z-1 absolute -left-40 top-10 w-70 h-70 rounded-full bg-[#F1D6FF] -z-1'></div>
        <div className='lg:absolute lg:right-50 lg:-top-30 lg:w-50 lg:h-50 lg:rounded-full lg:bg-[#D6FFDC] absolute right-20 -top-5 w-20 h-20 rounded-full bg-[#D6FFDC]'></div>
        <div className='lg:absolute lg:-right-30 lg:top-40 lg:w-130 lg:h-130 lg:rounded-full lg:bg-[#D6E9FF] lg:-z-1 absolute -right-10 top-40 w-40 h-40 rounded-full bg-[#D6E9FF] -z-1'></div>
    </div>
  )
}