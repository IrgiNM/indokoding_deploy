import { TypeSkill } from '@/type/typeSkill'
import React from 'react'

export default function CardSkill(props: TypeSkill) {
  return (
    <div className={`w-60 pb-3 bg-white rounded-xl absolute flex flex-col ${props.rotate} justify-start items-center pt-14 shadow-lg ${props.position}`}>
        <img src={`/assets/image/${props.pin}`} alt="" className='w-12 absolute -top-3'/>
        <img src={props.image} alt="" className='w-15 absolute top-10 right-10'/>
        <div className={`w-55 ${props.warnaBg} rounded-xl p-4`}>
            <p className={`text-3xl font-bold ${props.warnaTitle}`}>0{props.id}</p>
            <p className='text-1xl font-bold text-black mb-2'>{props.title}</p>
            <p className='text-sm w-full text-justify text-black'>{props.description}</p>
        </div>
    </div>
  )
}
