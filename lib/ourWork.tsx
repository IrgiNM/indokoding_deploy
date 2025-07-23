import CardOurWork from '@/components/cardOurWork'
import React, { useState } from 'react'

export default function OurWork() {
  const [isOpen, setIsOpen] = useState(1);
  const handleClick = (id: number) => {
    setIsOpen(id);
  }
  const dataCard = [
    {
      id: 1,
      title: 'Equusbook',
      description: 'Kami pernah mengembangkan Equusbook, marketplace berbasis Next.js dan Tailwind CSS untuk jual beli kuda, horsebox, dan properti equestrian di Inggris. Platform ini mendukung iklan gratis dan navigasi yang mudah bagi komunitas berkuda.',
      image: '/assets/image/porto1.avif',
      tags: ['next js', 'tailwindcss', 'market place']
    },
  ]
  return (
    <div className='w-full pb-100 relative flex flex-col items-start justify-center'>
      <div className='w-full flex flex-col items-end justify-end'>
        <h1 className='text-4xl text-[#128900] font-extrabold mr-50'>Our Work</h1>
        <p className='mr-50'>A collection of website we've made with passion</p>
      </div>
        
        <div className='w-full px-50 flex flex-row gap-8 justify-start mt-10 overflow-auto'>
            <CardOurWork />
            <CardOurWork />
            <CardOurWork />
        </div>
    </div>
  )
}
