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
    <div className='w-[1600px] h-180 mt-30 flex flex-row justify-center items-start relative'>
        <div className='absolute left-70 flex flex-col justify-start items-start'>
            <p className='text-sm font-semibold text-center mb-2'>
                Stay tuned for updates!
            </p>
            <h1 className='text-3xl w-100 text-left font-bold text-[#007924]'>
                Available Career Opportunities
            </h1>
            <p className='text-sm mt-5 w-60 text-justify'>We are on the lookout for passionate and talented individuals to join our growing team. If you're ready to take the next step in your career and make a meaningful impact, explore the open positions below and apply today!</p>
        </div>
        <div className='absolute -top-10 left-145 -mr-80 ml-10 flex flex-row justify-start items-start gap-4 mt-10'>
            {dataCareer.map((career, index) => (
                <CardCareer key={index} onClick={career.onClick} title={career.title} description={career.description} isActive={diKlik} list={career.list} id={career.id} />
            ))}
        </div>
        <div className='w-[850px] absolute -z-1 right-40 h-200 bg-gradient-to-b mt-10 from-[#81ff88] to-[#4afcff] rounded-t-4xl'></div>
        
    </div>
  )
}
