import React, { useEffect, useState } from 'react'
import { ServiceCard } from './serviceCard';

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

    const [isAktif, setAktif] = useState("")

    useEffect(() => {

        if (isAktif === "mobileApp") {
            console.log("Mobile App is active");
        } else if (isAktif === "webDev") {
            console.log("Web Development is active");
        }
        else if (isAktif === "troubleShoot") {
            console.log("Trouble Shooting is active");
        } else {
            console.log("No service is active");
        }

        console.log("twst");

    }, [isAktif]);

    const [color, setColor] = useState("bg-red-200")

    const [isDelivery, setIsDelivery] = useState(false)


  return (
    <>
    <div className='flex flex-col relative items-center min-h-screen gap-2 mt-15'>
        <img src="/assets/image/2line-yellow.png" alt="2line" className="absolute right-134 -top-6 w-10 h-10"/>
        <p className='text-[16px]'>what we do</p>
        <h1 className='text-4xl text-[32px] font-bold tracking-wider text-[#005CB2]'>Our Services</h1>
        <div className='flex flex-row items-start justify-center gap-15 w-full p-5'>
            {services.map((service) => (
                <>
                {/* {service.line && (<div className='w-[1px] h-[230px] bg-blue-500'></div>)} */}
                {service.id === 2 && <div className='w-0.5 h-[260px] bg-gray-300'></div>}
                <div className={`${isAktif === "mobileApp" && service.id === 2 
                    ? "animate-spin" 
                    : isAktif === "webDev" && service.id === 1 
                    ? "animate-pulse" 
                    : isAktif === "troubleShoot" && service.id === 3 
                    ? "animate-bounce" 
                    : ""} flex flex-col items-center justify-center gap-4 p-4`}>
                <ServiceCard id={service.id} title={service.title} warna={service.warna} description={service.description} />
                </div>
                {service.id === 2 && <div className='w-0.5 h-[260px] bg-gray-300'></div>}
                {/* {service.line && (<div className='w-[1px] h-[230px] bg-blue-500'></div>)} */}
                </>
            ))}
        </div>

    {/* <button className={`rounded-sm px-1 ${services[0].warna}`} onClick={() => setAktif("webDev")}>web dev</button>
    <button className={`rounded-sm px-1 ${services[1].warna}`} onClick={() => setAktif("mobileApp")}>mobile app</button>
    <button className={`rounded-sm px-1 ${services[2].warna}`} onClick={() => setAktif("troubleShoot")}>trouble shoot</button>
    <button onClick={() => setAktif("")}>reset</button> */}
    </div>
    </>
)
}