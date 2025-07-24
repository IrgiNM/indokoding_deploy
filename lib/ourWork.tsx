import CardOurWork from '@/components/cardOurWork'
import { TypeOurWork } from '@/type/typeOurWork';
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
      image: '/assets/image/ourwork/porto1.avif',
      tags: ['next js', 'tailwindcss', 'market place'],
      onClick: () => handleClick(1),
    },
    {
      id: 2,
      title: 'KEDUA',
      description: 'Kami pernah mengembangkan Equusbook, marketplace berbasis Next.js dan Tailwind CSS untuk jual beli kuda, horsebox, dan properti equestrian di Inggris. Platform ini mendukung iklan gratis dan navigasi yang mudah bagi komunitas berkuda.',
      image: '/assets/image/ourwork/porto2.avif',
      tags: ['next js', 'tailwindcss', 'market place'],
      onClick: () => handleClick(2),
    },
    {
      id: 3,
      title: 'KEDUA',
      description: 'Kami pernah mengembangkan Equusbook, marketplace berbasis Next.js dan Tailwind CSS untuk jual beli kuda, horsebox, dan properti equestrian di Inggris. Platform ini mendukung iklan gratis dan navigasi yang mudah bagi komunitas berkuda.',
      image: '/assets/image/ourwork/porto3.avif',
      tags: ['next js', 'tailwindcss', 'market place'],
      onClick: () => handleClick(3),
    },
    {
      id: 4,
      title: 'KEDUA',
      description: 'Kami pernah mengembangkan Equusbook, marketplace berbasis Next.js dan Tailwind CSS untuk jual beli kuda, horsebox, dan properti equestrian di Inggris. Platform ini mendukung iklan gratis dan navigasi yang mudah bagi komunitas berkuda.',
      image: '/assets/image/ourwork/porto4.avif',
      tags: ['next js', 'tailwindcss', 'market place'],
      onClick: () => handleClick(4),
    },
    {
      id: 5,
      title: 'KEDUA',
      description: 'Kami pernah mengembangkan Equusbook, marketplace berbasis Next.js dan Tailwind CSS untuk jual beli kuda, horsebox, dan properti equestrian di Inggris. Platform ini mendukung iklan gratis dan navigasi yang mudah bagi komunitas berkuda.',
      image: '/assets/image/ourwork/porto5.avif',
      tags: ['next js', 'tailwindcss', 'market place'],
      onClick: () => handleClick(5),
    },
    {
      id: 6,
      title: 'KEDUA',
      description: 'Kami pernah mengembangkan Equusbook, marketplace berbasis Next.js dan Tailwind CSS untuk jual beli kuda, horsebox, dan properti equestrian di Inggris. Platform ini mendukung iklan gratis dan navigasi yang mudah bagi komunitas berkuda.',
      image: '/assets/image/ourwork/porto6.avif',
      tags: ['next js', 'tailwindcss', 'market place'],
      onClick: () => handleClick(6),
    },
  ]
  return (
    <div className='w-full pb-50 relative flex flex-col items-start justify-center'>
      <div className='w-full flex flex-col items-end justify-end'>
        <h1 className='text-4xl text-[#128900] font-extrabold mr-50'>Our Work</h1>
        <p className='mr-50'>A collection of website we've made with passion</p>
      </div>
        
        <div className='w-full px-50 flex flex-row gap-8 justify-start mt-10 overflow-auto hide-scrollbar'>
            {dataCard.map((item,y) => (
              <CardOurWork key={y} title={item.title} description={item.description} id={item.id} image={item.image} tags={item.tags} onClick={item.onClick} class={isOpen === item.id ? 'h-150' : 'h-95'}/>
            ))}
        </div>
    </div>
  )
}
