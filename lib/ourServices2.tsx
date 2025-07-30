import { ServiceCard2 } from '@/components/serviceCard2';
import Image from 'next/image';
import React from 'react'

const services2 = [
    {
        id: 1,
        title: "Full Stack WebDev",
        description: "We’ll help you develop your website from scratch, front end, back end and even set up server. We can do it all.",
        warna: "text-[#128900]",
        border: "border-[#128900]",
        bg: "bg-[#EFFFF2]",
        line: false
    },
    {
        id: 2,
        title: "Mobile App",
        description: "Whether it’s Android or iOS our professional team of mobile developer can help you make mobile app that’s easy to use.",
        warna: "text-[#004F6C]",
        border: "border-[#004F6C]",
        bg: "bg-[#EFF8FF]",
        line: true
    },
    {
        id: 3,
        title: "Trouble Shooting",
        description: "Having trouble with your app? Don’t call Ghostbuster. Call our Bugbuster team instead. We can help you fix it in no time.",
        warna: "text-[#6C4E00]",
        border: "border-[#6C4E00]",
        bg: "bg-[#FFFEEF]",
        line: false
    },
];

export function Service2() {
  return (
    <div className='lg:w-full lg:flex lg:flex-col lg:relative lg:gap-1 lg:mt-35 w-full flex flex-col items-center relative gap-1 mt-35'>
        <div className='relative'>
            <Image width={140} height={140} src="/assets/image/2line-yellow.png" alt="2line" className="lg:absolute lg:left-23 lg:-top-6 lg:w-10 lg:h-10 absolute left-17 -top-3 w-7 h-7"/>
            <p className='lg:font-semibold lg:text-[16px] font-semibold text-[12px]'>what we do</p>
        </div>
        <h1 className='lg:text-4xl lg:font-extrabold lg:tracking-wider lg:text-[#005CB2] text-xl font-extrabold tracking-wider text-[#005CB2]'>OUR SERVICES</h1>
        <div className='lg:flex lg:flex-row lg:items-start lg:justify-center lg:gap-3 lg:w-full lg:p-5 lg:mt-3 w-full flex flex-row flex-wrap items-start justify-center gap-3 p-5 mt-3'>
            {services2.map((service2) => (
                <React.Fragment key={service2.id}>
                    <div>
                    <ServiceCard2 key={service2.id} id={service2.id} title={service2.title} warna={service2.warna} description={service2.description} border={service2.border} bg={service2.bg}/>
                    </div>
                </React.Fragment>
                ))}
        </div>
        <div className='lg:w-full lg:flex lg:flex-col lg:items-end lg:text-right  lg:relative lg:gap-5 lg:mt-30 lg:mb-50 lg:px-32 w-full px-15 flex flex-col items-center relative mt-20 mb-50'>
            <Image width={140} height={140} src="/assets/image/pythonk.png" alt="pythonk" className="lg:absolute lg:rotate-22 lg:-left-3 lg:top-2 lg:w-37 lg:h-37 absolute rotate-22 -left-3 top-1 w-17 h-17"/>
            <Image width={140} height={140} src="/assets/image/pythonb.png" alt="pythonb" className="lg:absolute lg:-rotate-24 lg:-right-3 lg:top-45 lg:w-25 lg:h-25 lg:-scale-x-100 absolute -rotate-24 -right-6 top-35 w-15 h-15 -scale-x-100"/>
            <h1 className='lg:text-4xl lg:font-extrabold lg:tracking-wider lg:text-[#4F006C] text-xl font-extrabold tracking-wider text-[#4F006C]'>SERVICES DESCRIPTION</h1>
            <p className='lg:pl-5 lg:text-lg lg:text-justify lg:text-[#4F006C] w-full pt-4 text-[12px] text-justify text-[#4F006C]'>Free online consultation for a bespoke app development whether web or mobile apps, we are proud of making web apps for e commerce using django, PHP, node.js for various clients in US, Canada, UK, Kuwait, Australia and Indonesia. Don’t forget to inform us about your contact and let us get back to you!</p>
        </div>
    </div>
  )
}
