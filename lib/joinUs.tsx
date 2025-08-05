import Image from 'next/image'
import React from 'react'

export default function JoinUsPage() {
  return (
    <div className='w-full flex flex-row justify-center items-center relative gap-20 h-100 mt-40 mb-30'>
      <div className='relative'>
        <p className='lg:text-4xl lg:font-bold lg:italic lg:text-[#2C507A] lg:px-10 lg:pt-2 lg:pb-3 lg:border-5 lg:ml-20 lg:rounded-full lg:border-[#498cff] lg:backdrop-blur lg:absolute lg:-left-40 lg:-top-13 lg:-rotate-4 text-2xl font-bold italic text-[#181F38] px-5 pt-1 pb-2 border-3 rounded-full border-[#498cff] backdrop-blur absolute left-26 top-47 -rotate-4'>Join Us</p>
        <div className='p-8 flex flex-col justify-center items-start gap-y-4 bg-white rounded-[20px] border-[1px] -ml-20  border-[#307CFF]'>
          <div className="flex space-x-2 gap-3">
            <input type="text" placeholder="Your Name" className="bg-[#d9ebfc] text-sm text-[#00296c] px-6 py-3  rounded-[40px] w-[420px]" />
            <input type="text" placeholder="How much rate do you want?" className="bg-[#d9ebfc] text-sm text-[#00296c] px-6 py-3  rounded-[40px] w-[260px]" />
          </div>
          <div className="flex space-x-2 gap-4">
            <div className="flex flex-col space-y-2 gap-2">
              <div className="flex space-x-2">
                <input type="text" placeholder="What position do you" className="text-sm text-[#00296c] bg-[#d9ebfc] px-6 py-3 rounded-[10px] w-[205px] h-[50px]" />
                <input type="text" placeholder="Where are you come from?" className="text-sm text-[#00296c] bg-[#d9ebfc] px-6 py-3 rounded-[10px] w-[205px] h-[50px]" />
              </div>
              <div className="flex space-x-2">
                <input type="email" placeholder="Your email" className="text-sm text-[#00296c] bg-[#d9ebfc] px-6 py-3  rounded-[50px] w-[205px] h-[50px]" />
                <input type="tel" placeholder="Your phone number" className="text-sm text-[#00296c] bg-[#d9ebfc] px-6 py-3  rounded-[50px] w-[205px] h-[50px]" />
              </div>
            </div>
            <textarea placeholder="Some more words, maybe?" className="bg-[#d9ebfc] text-sm text-[#00296c] px-6 py-3  rounded-[10px] w-[260px] h-[119px]" />
            </div>
          <button className="mt-3 w-[705px] py-3 bg-[#181F38] text-sm font-bold text-white rounded-full">Submit</button>
        </div>
        <div className='w-[1400px] h-90 bg-gradient-to-b from-[#aae8ff] to-[#498cff] rounded-[20px] absolute -z-1 rotate-3 top-0 -left-45'/>
        
      </div>
      
      <div className="ml-20 flex flex-col items-center justify-center">
        <div className='relative'>
          <h3 className="text-2xl text-left font-extrabold text-blue-800 mb-7 font-poppins rotate-3">OUR SKILLS</h3>
          <Image width={140} height={140} src="/assets/image/2line-yellow.png" alt="MySQL" className="absolute w-10 h-10 scale-x-[-1] -left-10 -top-5" />
        </div>
        
        <div className="flex flex-row flex-wrap gap-5 w-50 place-items-center">
          <Image width={140} height={140} src="/golang.svg" alt="Go" className="bg-white w-20 h-20 p-3 rounded-lg border-1 border-b-2 border-[#498cff]"/> 
          <Image width={140} height={140} src="/postgre.svg" alt="PostgreSQL" className="bg-white w-20 h-20 p-3 rounded-lg border-1 border-b-2 border-[#498cff]" />
          <Image width={140} height={140} src="/python.svg" alt="Python" className="bg-white w-20 h-20 p-3 rounded-lg border-1 border-b-2 border-[#498cff]" />
          <Image width={140} height={140} src="/java.svg" alt="Java" className="bg-white w-20 h-20 p-3 rounded-lg border-1 border-b-2 border-[#498cff]" />
          <Image width={140} height={140} src="/mysql.svg" alt="MySQL" className="bg-white w-20 h-20 p-3 rounded-lg border-1 border-b-2 border-[#498cff]" />
        </div>
      </div>
      {/* <div className='w-120 h-120 absolute -z-1 rounded-full -top-40 -right-60 bg-gradient-to-b from-[#D6FFD8] to-[#A0FDFF]'/> */}
      <Image width={140} height={140} src="/assets/image/pythonk.png" alt="gambar-pythonb" className='lg:w-35 lg:-rotate-20 lg:absolute lg:-right-6 lg:-bottom-25  w-10 rotate-10 scale-x-[-1] absolute -right-10 -bottom-20'/>
    </div>
  )
}
