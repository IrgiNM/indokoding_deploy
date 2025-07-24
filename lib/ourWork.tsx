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
      title: 'Home and Gift Center',
      description: 'Kami pernah mengembangkan Home and Gift Center, sebuah platform e-commerce berbasis Next.js dan Tailwind CSS yang dirancang untuk menjual produk dekorasi rumah dan hadiah. Toko online ini menawarkan fitur pencarian produk, kategori, filter harga, serta tampilan galeri yang ramah pengguna.',
      image: '/assets/image/ourwork/porto2.avif',
      tags: ['next js', 'tailwindcss', 'e-commerce'],
      onClick: () => handleClick(2),
    },
    {
      id: 3,
      title: 'Thirsty Camel',
      description: 'Kami pernah mengembangkan Thirsty Camel, sebuah platform katalog produk dan sistem pemesanan internal berbasis Next.js dan Tailwind CSS. Platform ini memungkinkan pengguna untuk melihat detail produk seperti ukuran, harga, dan stok secara real-time, serta mempermudah proses pemesanan barang seperti seragam atau merchandise.',
      image: '/assets/image/ourwork/porto3.avif',
      tags: ['next js', 'tailwindcss', 'product catalog'],
      onClick: () => handleClick(3),
    },
    {
      id: 4,
      title: 'Greene King Venue Finder',
      description: 'Kami pernah membangun Greene King Venue Finder, sebuah platform pencarian lokasi pub dan restoran di Inggris. Dibuat dengan Next.js dan Tailwind CSS, sistem ini memungkinkan pengguna mencari venue berdasarkan lokasi saat ini, radius jarak, dan ukuran grup. Platform ini terintegrasi dengan Google Maps untuk pengalaman pencarian yang interaktif dan mudah digunakan.',
      image: '/assets/image/ourwork/porto4.avif',
      tags: ['next js', 'tailwindcss', 'map integration'],
      onClick: () => handleClick(4),
    },
    {
      id: 5,
      title: 'ASCC Artist-in-Residence Program',
      description: 'Kami turut mengembangkan situs program Artist-in-Residence untuk Sheikh Abdullah Al-Salem Cultural Centre di Kuwait. Platform ini dibangun dengan Next.js dan Tailwind CSS, dirancang untuk memfasilitasi pendaftaran dan penyebaran informasi program residensi seni. Situs ini menyediakan informasi fasilitas studio, tujuan program, dan akses pendaftaran daring yang mudah.',
      image: '/assets/image/ourwork/porto5.avif',
      tags: ['next js', 'tailwindcss', 'culture', 'residency'],
      onClick: () => handleClick(5),
    },
    {
      id: 6,
      title: 'Thermo Fisher - Who The One?',
      description: 'Kami pernah mengembangkan proyek interaktif untuk Thermo Fisher Scientific berjudul “Who The One?”. Dalam proyek ini, pengguna dapat mengunggah foto dan melihat diri mereka dipadukan dengan ilmuwan terkenal secara humoris. Aplikasi berbasis Next.js dan Tailwind CSS ini bertujuan untuk membangun keterlibatan audiens secara kreatif dan menyenangkan.',
      image: '/assets/image/ourwork/porto6.avif',
      tags: ['next js', 'tailwindcss', 'interactive', 'science'],
      onClick: () => handleClick(6),
    },
  ]
  const data3 = [
    [0,1,2],
    [1,2,3],
    [2,3,4],
    [3,4,5],
    [4,5,0],
    [5,0,1],
  ]
  const [idData3, setIdData3] = useState(0);
  const [selectData3, setSelectData3] = useState(data3[idData3]);
   
  return (
    <div className='w-full pb-50 relative flex flex-col items-start justify-center'>
      <div className='w-full flex flex-col items-end justify-end'>
        <h1 className='text-4xl text-[#128900] font-extrabold mr-50'>Our Work</h1>
        <p className='mr-50'>A collection of website we've made with passion</p>
      </div>
        
      <div className='w-full px-50 pl-0 flex flex-row gap-8 justify-start mt-10 overflow-hidden hide-scrollbar'>
          {/* {dataCard.map((item,y) => (
            <CardOurWork key={y} title={item.title} description={item.description} id={item.id} image={item.image} tags={item.tags} onClick={item.onClick} class={isOpen === item.id ? 'h-150' : 'h-95'}/>
          ))} */}
          <CardOurWork title={dataCard[selectData3[0]].title} description={dataCard[selectData3[0]].description} id={dataCard[selectData3[0]].id} image={dataCard[selectData3[0]].image} tags={dataCard[selectData3[0]].tags} onClick={dataCard[selectData3[0]].onClick} class='-ml-27 h-100'/>
          <CardOurWork title={dataCard[selectData3[1]].title} description={dataCard[selectData3[1]].description} id={dataCard[selectData3[1]].id} image={dataCard[selectData3[1]].image} tags={dataCard[selectData3[1]].tags} onClick={dataCard[selectData3[1]].onClick} class='h-150'/>
          <CardOurWork title={dataCard[selectData3[2]].title} description={dataCard[selectData3[2]].description} id={dataCard[selectData3[2]].id} image={dataCard[selectData3[2]].image} tags={dataCard[selectData3[2]].tags} onClick={dataCard[selectData3[2]].onClick} class='h-100'/>
        </div>

        {/* ABSOLUTE */}
        <button className='w-100 h-75 rounded-xl absolute hover:bg-gradient-to-r hover:from-[#128900] hover:to-transparent top-26 -right-13 transition-all duration-500 opacity-50 flex justify-start items-center pl-10' onClick={() => {
          console.log("Next clicked");
          if (idData3 === 5) {
            setIdData3(0);
          } else {
            setIdData3(idData3 + 1);
          }
          setSelectData3(data3[idData3 === 5 ? 0 : idData3 + 1]);
        }}>
          <img src="/arrow.svg" alt="" className='w-5'/>
        </button>
        <button className='w-100 h-75 rounded-xl absolute hover:bg-gradient-to-l hover:from-[#128900] hover:to-transparent top-26 -left-7 transition-all duration-500 opacity-50 flex justify-end items-center pr-10' onClick={() => {
          console.log("Next clicked");
          if (idData3 === 0) {
            setIdData3(5);
          } else {
            setIdData3(idData3 - 1);
          }
          setSelectData3(data3[idData3 === 0 ? 5 : idData3 - 1]);
        }}>
          <img src="/arrow.svg" alt="" className='w-5 scale-x-[-1]'/>
        </button>
    </div>
  )
}
