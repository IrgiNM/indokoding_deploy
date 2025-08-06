import CardCareer from '@/components/cardCareer'
import React, { useState } from 'react'

export default function CareerApply() {
    const [diKlik, setDiKlik] = useState('Django Developer');
    const dataCareer = [
        {
            id: 1,
            title: "Django Developer",
            description: "We are looking for a Django Developer to join our team. You will be responsible for building and maintaining web applications using Django framework.",
            onClick: () => {
                console.log("Django Developer clicked");
                setDiKlik("Django Developer");
            },
            list: [
                "Develop and maintain web applications using Django framework.",
                "Collaborate with front-end developers to integrate user-facing elements.",
                "Write reusable, testable, and efficient code.",
                "Participate in code reviews and maintain code quality."
            ]  
        },
        {
            id: 2,
            title: "IOS Developer",
            description: "We are looking for a Django Developer to join our team. You will be responsible for building and maintaining web applications using Django framework.",
            onClick: () => {
                console.log("IOS Developer clicked");
                setDiKlik("IOS Developer");
            },
            list: [
                "Develop and maintain web applications using Django framework.",
                "Collaborate with front-end developers to integrate user-facing elements.",
                "Write reusable, testable, and efficient code.",
                "Participate in code reviews and maintain code quality."
            ]  
        },
        {
            id: 3,
            title: "Administrator",
            description: "We are looking for a Django Developer to join our team. You will be responsible for building and maintaining web applications using Django framework.",
            onClick: () => {
                console.log("Administrator clicked");
                setDiKlik("Administrator");
            },
            list: [
                "Develop and maintain web applications using Django framework.",
                "Collaborate with front-end developers to integrate user-facing elements.",
                "Write reusable, testable, and efficient code.",
                "Participate in code reviews and maintain code quality."
            ]  
        },
    ]
  return (
    <div className=' lg:w-[1600px] lg:h-180 lg:mt-30 lg:flex lg:flex-row lg:justify-center lg:items-start lg:relative w-[300px] h-240 mt-0 flex flex-col justify-center items-start relative'>
        <div className=' lg:absolute lg:left-70 lg:flex lg:flex-col lg:justify-start lg:items-start absolute left-5 top-0 flex flex-col justify-start items-start'>
            <p className=' lg:text-sm lg:font-semibold lg:text-center lg:mb-2 text-[12px] font-semibold text-center mb-2'>
                Stay tuned for updates!
            </p>
            <h1 className=' lg:text-3xl lg:w-100 lg:text-left lg:font-bold lg:text-[#007924] text-2xl w-70 text-left font-bold text-[#007924]'>
                Available Career Opportunities
            </h1>
            <p className=' lg:text-sm lg:mt-5 lg:w-60 lg:text-justify text-[12px] mt-5 w-60 text-justify'>We’re on the lookout for passionate and talented individuals to join our growing team. If you're ready to take the next step in your career and make a meaningful impact, explore the open positions below and apply today!</p>
        </div>
        <div className='lg:w-200 lg:absolute lg:-top-10 lg:left-145 lg:-mr-80 lg:ml-10 lg:flex lg:flex-row lg:justify-start lg:items-start lg:gap-4 lg:mt-10 pt-5 lg:pl-0 w-120 absolute top-60 -left-40 mr-0 ml-0 flex flex-row justify-start items-start gap-4 mt-10 hide-scrollbar overflow-auto pl-45'>
            {dataCareer.map((career, index) => (
                <CardCareer key={index} onClick={career.onClick} title={career.title} description={career.description} isActive={diKlik} list={career.list} id={career.id} />
            ))}
        </div>
        <div className=' lg:w-[850px] lg:absolute lg:-z-1 lg:right-40 lg:h-200 lg:bg-gradient-to-b lg:mt-10 lg:from-[#81ff88] lg:to-[#4afcff] lg:rounded-t-4xl w-[850px] absolute -z-1 -right-150 top-53 h-200 bg-gradient-to-b mt-10 from-[#81ff88] to-[#4afcff] rounded-t-xl'></div>
        
    </div>
  )
}
