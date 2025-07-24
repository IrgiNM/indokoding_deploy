import CardSkill from '@/components/cardSkill'
import React from 'react'

export default function OurSkills() {
    const dataSkill = [
        {
            id: 1,
            image: "/python.svg",
            pin: "pin-yellow.png",
            title: "Python",
            description: "A flexible and readable language used for backend development, data analysis, and automation.",
            warnaTitle: "text-[#BFAF3D]",
            warnaBg: "bg-[#FFFAD6]",
            rotate: "rotate-5",
            position: "top-30 left-60"
        },
        {
            id: 2,
            image: "/java.svg",
            pin: "pin-red.png",
            title: "Java",
            description: "A powerful object-oriented language, ideal for building secure, scalable web and Android applications.",
            warnaTitle: "text-[#DB380E]",
            warnaBg: "bg-[#FFDED6]",
            rotate: "rotate-2",
            position: "top-30 left-130"
        },
        {
            id: 3,
            image: "/mysql.svg",
            pin: "pin-green.png",
            title: "mySQL",
            description: "A widely-used relational database system, perfect for web applications and fast data operations.",
            warnaTitle: "text-[#007714]",
            warnaBg: "bg-[#D6FFF1]",
            rotate: "-rotate-5",
            position: "top-40 left-200"
        },
        {
            id: 4,
            image: "/golang.svg",
            pin: "pin-blue.png",
            title: "Golang",
            description: "A high-performance language built for concurrency, great for modern backend services and microservices.",
            warnaTitle: "text-[#008DC0]",
            warnaBg: "bg-[#D6E9FF]",
            rotate: "-rotate-7",
            position: "top-110 left-100"
        },
        {
            id: 5,
            image: "/postgre.svg",
            pin: "pin-purple.png",
            title: "postgreSQL",
            description: "An advanced open-source relational database known for reliability, scalability, and strong data integrity..",
            warnaTitle: "text-[#534882]",
            warnaBg: "bg-[#DED6FF]",
            rotate: "-rotate-2",
            position: "top-114 left-170"
        },
    ]
  return (
    <div className='flex flex-col justify-center items-center relative mt-35 w-full'>
        {/* ABSOLUTE */}
        <p className='text-4xl absolute -top-10 text-[#F3D130] font-semibold -rotate-30 left-120'>&lt;/&gt;</p>
        <img src="/assets/image/postgre.png" alt="gambar-postgre" className='w-55 absolute -top-10 -rotate-20 -right-10 z-2 scale-x-[-1]'/>
        <img src="/assets/image/pythonb.png" alt="gambar-postgre" className='w-40 absolute -bottom-12 rotate-20 -left-10 z-2'/>
        {/* NORMAL */}
        <h1 className='text-[#005CB2] text-4xl font-extrabold'>Our Skills</h1>
        <div className='w-full mt-8 h-220 bg-[#D9DFFC] flex flex-row gap-5 justify-center items-center relative'>
            {dataSkill.map((skill, index) => (
                <CardSkill 
                    key={index} 
                    id={skill.id}
                    image={skill.image}
                    pin={skill.pin}
                    title={skill.title}
                    description={skill.description}
                    warnaTitle={skill.warnaTitle}
                    warnaBg={skill.warnaBg}
                    rotate={skill.rotate}
                    position={skill.position} 
                />
            ))}
        </div>
    </div>
  )
}
