import { ServiceCard2 } from '@/components/serviceCard2';
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
    <div className='w-252 flex flex-col relative gap-1 mt-35'>
        <img src="/assets/image/2line-yellow.png" alt="2line" className="absolute left-23 -top-6 w-10 h-10"/>
        <p className='font-semibold text-[16px]'>what we do</p>
        <h1 className='text-4xl font-extrabold tracking-wider text-[#005CB2]'>OUR SERVICES</h1>
        <div className='flex flex-row items-start justify-center gap-3 w-full p-5 mt-3'>
            {services2.map((service2) => (
                <React.Fragment key={service2.id}>
                {service2.id === 2 && <div className='w-0.5 h-[260px] bg-gray-300'></div>}
                    <div>
                    <ServiceCard2 key={service2.id} id={service2.id} title={service2.title} warna={service2.warna} description={service2.description} border={service2.border} bg={service2.bg}/>
                    </div>
                    {service2.id === 2 && <div className='w-0.5 h-[260px] bg-gray-300'></div>}
                </React.Fragment>
                ))}
        </div>
        <div className='flex flex-col items-end text-right relative gap-5 mt-30 mb-20'>
            <img src="/assets/image/pythonk.png" alt="pythonk" className="absolute rotate-22 -left-33 -top-6 w-37 h-37"/>
            <img src="/assets/image/pythonb.png" alt="pythonb" className="absolute -rotate-24 -right-35 top-40 w-25 h-25 -scale-x-100"/>
            <h1 className='text-4xl font-extrabold tracking-wider text-[#4F006C]'>SERVICES DESCRIPTION</h1>
            <p className='pl-5 text-[20px] text-[#4F006C]'>Free online consultation for a bespoke app development whether web or mobile apps, we are proud of making web apps for e commerce using django, PHP, node.js for various clients in US, Canada, UK, Kuwait, Australia and Indonesia. Don't forget to inform us about your contact and let us get back to you!</p>
        </div>
    </div>
  )
}
