import { TypeSkill } from '@/type/typeSkill'
import Image from 'next/image'
import React from 'react'

export default function CardSkill(props: TypeSkill) {
  return (
    <div className={` lg:w-60 lg:pb-3 lg:bg-white lg:rounded-xl lg:absolute lg:flex lg:flex-col ${props.rotate} lg:justify-start lg:items-center lg:pt-14 lg:shadow-lg ${props.position} w-50 pb-3 bg-white rounded-xl absolute flex flex-col justify-start items-center pt-14 shadow-lg`}>
        <Image width={140} height={140} src={`/assets/image/${props.pin}`} alt="" className=' lg:w-12 lg:absolute lg:-top-3 w-10 absolute -top-3'/>
        <Image width={140} height={140} src={props.image} alt="" className=' lg:w-15 lg:absolute lg:top-10 lg:right-10 w-12 absolute top-10 right-10'/>
        <div className={`lg:w-55 ${props.warnaBg} lg:rounded-xl lg:p-4 w-45 rounded-xl p-4`}>
            <p className={`lg:text-3xl lg:font-bold ${props.warnaTitle} text-md font-bold`}>0{props.id}</p>
            <p className='lg:text-1xl lg:font-bold lg:text-black lg:mb-2 text-[12px] font-bold text-black mb-2'>{props.title}</p>
            <p className='lg:text-sm lg:w-full lg:text-justify lg:text-black text-[12px] w-full text-justify text-black'>{props.description}</p>
        </div>
    </div>
  )
}
