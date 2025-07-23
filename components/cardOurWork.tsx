import React, { useState } from 'react'

export default function CardOurWork() {
    const tag =[]
  return (
    <button onClick={()=>(console.log('diklik'))} className='group relative flex flex-col justify-start items-start h-90 overflow-clip transition-all duration-700 '>
        <img src="/assets/image/porto1.avif" alt="" className='w-150 h-90 rounded-xl border-2 border-b-5 border-[#128900] object-cover'/>
        <div className='w-150 h-90 rounded-xl border-2 border-b-5 border-[#128900] bg-[#128900] absolute top-0 opacity-0 group-hover:opacity-20 transition-all duration-200'></div>
        <div className='flex flex-row justify-center items-end gap-2 mt-2'>
            <h2 className='text-2xl font-bold mt-5 text-[#128900] mr-3'>Equusbook</h2>
            <p className='py-1 px-4 bg-blue-200 rounded-full text-[12px] font-semibold text-[#004C6C]'>next js</p>
            <p className='py-1 px-4 bg-blue-200 rounded-full text-[12px] font-semibold text-[#004C6C]'>tailwindcss</p>
            <p className='py-1 px-4 bg-blue-200 rounded-full text-[12px] font-semibold text-[#004C6C]'>market place</p>
        </div>
        <p className='w-150 text-justify mt-5'>Kami pernah mengembangkan Equusbook, marketplace berbasis Next.js dan Tailwind CSS untuk jual beli kuda, horsebox, dan properti equestrian di Inggris. Platform ini mendukung iklan gratis dan navigasi yang mudah bagi komunitas berkuda.</p>
    </button>
  )
}
