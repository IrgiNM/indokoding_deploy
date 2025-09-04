import CardSkill from '@/components/cardSkill'
import Image from 'next/image'
import React, { forwardRef } from 'react'

function OurSkillsComponent(props: object, ref: React.Ref<HTMLDivElement>) {
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
            position: "lg:top-30 lg:left-0 top-20 left-20"
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
            position: "lg:top-30 lg:left-70 top-85 left-20"
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
            position: "lg:top-40 lg:left-140 top-151 left-20"
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
            position: "lg:top-110 lg:left-30 top-218 left-20"
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
            position: "lg:top-114 lg:left-100 top-289 left-22"
        },
    ]
  return (
    <div ref={ref} className='flex flex-col justify-center items-center relative mt-50 w-full'>
        {/* ABSOLUTE */}
        <div className='relative'>
            <h1 className='text-[#005CB2] mb-8 lg:text-4xl text-xl font-extrabold'>Our Skills</h1>
            <p className='lg:text-4xl text-xl absolute lg:-top-10 -top-5 text-[#F3D130] font-semibold -rotate-30 lg:-left-20 -left-10'>&lt;/&gt;</p>
        </div>
        
        <Image width={140} height={140} src="/assets/image/postgre.png" alt="gambar-postgre" className='lg:w-55 w-30 absolute lg:-top-10 top-0 -rotate-20 -right-10 z-2 scale-x-[-1]'/>
        <Image width={140} height={140} src="/assets/image/pythonb.png" alt="gambar-postgre" className='lg:w-40 w-30 absolute lg:-bottom-12 -bottom-9 rotate-20 -left-10 z-2'/>

        {/* NORMAL */}
        <div className='w-full lg:h-210 h-400 bg-[#D9DFFC] relative overflow-visible flex justify-center items-center'>
            <div className='lg:w-200 w-87 lg:h-210 h-400 flex flex-row gap-5 justify-center items-center relative'>
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
        
    </div>
  )
}

const OurSkills = forwardRef(OurSkillsComponent);
export default OurSkills;
