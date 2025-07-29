// import Image from 'next/image'
// import React from 'react'

// export default function AboutUs() {
//   return (
//     <div className='flex flex-row relative '>
//       <div className='w-270'>
//           <p className='mb-70'></p>
//           <h1 className='text-4xl font-extrabold mb-5 text-[#005CB2]'>About Us</h1>
//           <p className='w-130 mb-5 text-justify text-lg'>We are an boutique software development started from a band of developers that excel in developing apps with great flexibility and always listen to client needs.</p>
//           <p className='w-130 mb-5 text-justify text-lg'>We always develop using agile methodologies in mind, means that a big features in chopped into small chunks. Each chunk can be done in two weeks. And we always do a weekly or twice a week meeting over skype or using trello so you can see your apps as it progressing.</p>
//           <p className='w-130 mb-5 text-justify text-lg'>Our goal is to make software development to adapt clients needs and deliver results as quickly as possible</p>
          
//       </div >
//       {/* <div className='absolute rounded-full  '></div> */}
//       <div className="absolute rounded-full right-215 top-25 -z-1 bg-[#D6E9FF] w-135 h-135"></div>
      
//       <Image width={140} height={140} src="/assets/image/golang.png" alt="golang" className='absolute -left-40  rotate-50 w-70' />
//       <Image width={140} height={140} src="/assets/image/3line-cyan.png" alt="3line-cyan" className='absolute left-42 top-62 rotate- w-15' />
//     </div>
//   )
// }


import Image from 'next/image'
import React from 'react'

export default function AboutUs() {
  return (
    <div className='lg:flex lg:flex-row lg:relative flex flex-row relative'>
      <div className='lg:w-270 w-70'>
          <p className='lg:mb-70 mb-70'></p>
          <h1 className='lg:text-4xl lg:font-extrabold lg:mb-5 lg:text-[#005CB2] text-xl font-extrabold mb-5 text-[#005CB2]'>About Us</h1>
          <p className='lg:w-130 lg:mb-5 lg:text-justify lg:text-lg w-70 mb-5 text-justify text-xs'>We are an boutique software development started from a band of developers that excel in developing apps with great flexibility and always listen to client needs.</p>
          <p className='lg:w-130 lg:mb-5 lg:text-justify lg:text-lg w-70 mb-5 text-justify text-xs'>We always develop using agile methodologies in mind, means that a big features in chopped into small chunks. Each chunk can be done in two weeks. And we always do a weekly or twice a week meeting over skype or using trello so you can see your apps as it progressing.</p>
          <p className='lg:w-130 lg:mb-5 lg:text-justify lg:text-lg w-70 mb-5 text-justify text-xs'>Our goal is to make software development to adapt clients needs and deliver results as quickly as possible</p>
      </div>
      <div className="lg:absolute lg:rounded-full lg:right-215 lg:top-25 lg:-z-1 lg:bg-[#D6E9FF] lg:w-135 lg:h-135 absolute rounded-full -left-40 top-50 -z-1 bg-[#D6E9FF] w-60 h-60"></div>
      
      <Image width={140} height={140} src="/assets/image/golang.png" alt="golang" className='lg:absolute lg:-left-40 lg:top-0 lg:rotate-50 lg:w-70 absolute -left-25 top-40  rotate-50 w-30' />
      <Image width={140} height={140} src="/assets/image/3line-cyan.png" alt="3line-cyan" className='lg:absolute lg:left-42 lg:top-62 lg:rotate- lg:w-15 absolute left-23 top-67 rotate- w-8' />
    </div>
  )
}