import { ServiceCard } from '@/components/serviceCard';
import Image from 'next/image';
import React from 'react';

const services = [
    {
        id: 1,
        title: "Full Stack WebDev",
        description: "We’ll help you develop your website from scratch, front end, back end and even set up server. We can do it all.",
        warna: "text-[#128900]",
        line: false
    },
    {
        id: 2,
        // title: "",
        title: "Mobile App",
        description: "Whether it’s Android or iOS our professional team of mobile developer can help you make mobile app that’s easy to use.",
        warna: "text-[#004F6C]",
        line: true
    },
    {
        id: 3,
        title: "Trouble Shooting",
        description: "Having trouble with your app? Don’t call Ghostbuster. Call our Bugbuster team instead. We can help you fix it in no time.",
        warna: "text-[#6C4E00]",
        line: false
    },
];

export default function Service() {
  return (
    <>
    <div className='lg:w-full lg:flex lg:flex-col lg:relative lg:items-center lg:gap-2 lg:mt-15 w-full flex flex-col relative items-center mt-15 mb-70'>
        <div className='relative'>
            <Image width={140} height={140} src="/assets/image/2line-yellow.png" alt="2line" className="lg:absolute lg:-right-10 lg:-top-5 lg:w-10 lg:h-10 absolute -right-7 -top-3 w-7 h-7"/>
            <p className='lg:text-[16px] text-[12px]'>what we do</p>
        </div>
        <h1 className='lg:text-4xl lg:font-extrabold lg:tracking-wider lg:text-[#005CB2] text-xl font-extrabold tracking-wider text-[#005CB2] mb-6'>Our Services</h1>
        <div className='lg:flex flex-row items-start justify-center gap-7 w-full p-5 hidden '>
            {services.map((service) => (
                <React.Fragment key={service.id}>
                {service.id === 2 && <div className='w-[1px] h-70 bg-gray-300'></div>}
                <div className={`flex flex-col items-center justify-center gap-4 p-4`}>
                <ServiceCard key={service.id} id={service.id} title={service.title} warna={service.warna} description={service.description}/>
                </div>
                {service.id === 2 && <div className='w-[1px] h-70 bg-gray-300'></div>}
                </React.Fragment>
            ))}
        </div>
        <div className='flex flex-wrap flex-row items-center justify-center gap-4 gap-y-0 w-full p-5 lg:hidden'>
            <div className='flex flex-row flex-wrap items-center justify-center gap-7 mb-5'>
                <ServiceCard key={services[0].id} id={services[0].id} title={services[0].title} warna={services[0].warna} description={services[0].description}/>
                <div className='w-[1px] h-[170px] bg-gray-300'></div>
                <ServiceCard key={services[1].id} id={services[1].id} title={services[1].title} warna={services[1].warna} description={services[1].description}/>
                <div className='hidden md:flex w-[1px] h-[170px] bg-gray-300'></div>
                <ServiceCard key={services[2].id} id={services[2].id} title={services[2].title} warna={services[2].warna} description={services[2].description}/>
            </div>
            
        </div>
        <div className="lg:absolute lg:rounded-full lg:-right-40 lg:top-60 lg:-z-1 lg:bg-[#FEFFD6] lg:w-90 lg:h-90 absolute rounded-full -right-30 top-90 -z-1 bg-[#FEFFD6] w-50 h-50"></div>
    </div>
    </>
)
}