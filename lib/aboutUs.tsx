import Image from 'next/image'
import React from 'react'

export default function AboutUs() {
  return (
    <div className='lg:mt-60 lg:flex lg:flex-col lg:justify-center lg:items-center lg:w-full lg:relative flex flex-col justify-center items-center relative w-full'>
      <div className='lg:w-270 w-70'>
        <div className='relative'>
          <h1 className='lg:text-4xl lg:font-extrabold lg:mb-5 lg:text-[#005CB2] text-xl font-extrabold mb-5 text-[#005CB2]'>About Us</h1>
          <Image width={140} height={140} src="/assets/image/3line-cyan.png" alt="3line-cyan" className='lg:absolute lg:left-42 lg:-top-8 lg:rotate- lg:w-15 absolute left-23 -top-3 rotate- w-8' />
        </div>
          
          <p className='lg:w-130 lg:mb-5 lg:text-justify lg:text-lg w-70 mb-5 text-justify text-xs'>We are an boutique software development started from a band of developers that excel in developing apps with great flexibility and always listen to client needs.</p>
          <p className='lg:w-130 lg:mb-5 lg:text-justify lg:text-lg w-70 mb-5 text-justify text-xs'>We always develop using agile methodologies in mind, means that a big features in chopped into small chunks. Each chunk can be done in two weeks. And we always do a weekly or twice a week meeting over skype or using trello so you can see your apps as it progressing.</p>
          <p className='lg:w-130 lg:mb-5 lg:text-justify lg:text-lg w-70 mb-5 text-justify text-xs'>Our goal is to make software development to adapt clients needs and deliver results as quickly as possible</p>
      </div>
      <div className="lg:absolute lg:rounded-full lg:-left-60 lg:-top-30 lg:-z-1 lg:bg-[#D6E9FF] lg:w-135 lg:h-135 absolute rounded-full -left-27 -top-20 -z-1 bg-[#D6E9FF] w-60 h-60"></div>
      
      <Image width={140} height={140} src="/assets/image/golang.png" alt="golang" className='lg:absolute lg:-left-20 lg:-top-70 lg:rotate-50 lg:w-70 absolute -left-10 -top-30  rotate-50 w-30' />
      
    </div>
  )
}