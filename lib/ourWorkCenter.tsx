import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import "./styles.css";
// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "./styles.css";
import Image from "next/image";

const dataCard = [
    {
      id: 1,
      title: 'Equusbook',
      description: 'Kami pernah mengembangkan Equusbook, marketplace berbasis Next.js dan Tailwind CSS untuk jual beli kuda, horsebox, dan properti equestrian di Inggris. Platform ini mendukung iklan gratis dan navigasi yang mudah bagi komunitas berkuda.',
      image: '/assets/image/ourwork/porto1.avif',
      tags: ['next js', 'tailwindcss', 'market place'],
    },
    {
      id: 2,
      title: 'Home and Gift Center',
      description: 'Kami pernah mengembangkan Home and Gift Center, sebuah platform e-commerce berbasis Next.js dan Tailwind CSS yang dirancang untuk menjual produk dekorasi rumah dan hadiah. Toko online ini menawarkan fitur pencarian produk, kategori, filter harga, serta tampilan galeri yang ramah pengguna.',
      image: '/assets/image/ourwork/porto2.avif',
      tags: ['next js', 'tailwindcss', 'e-commerce']
    },
    {
      id: 3,
      title: 'Thirsty Camel',
      description: 'Kami pernah mengembangkan Thirsty Camel, sebuah platform katalog produk dan sistem pemesanan internal berbasis Next.js dan Tailwind CSS. Platform ini memungkinkan pengguna untuk melihat detail produk seperti ukuran, harga, dan stok secara real-time, serta mempermudah proses pemesanan barang seperti seragam atau merchandise.',
      image: '/assets/image/ourwork/porto3.avif',
      tags: ['next js', 'tailwindcss', 'product catalog'],
    },
    {
      id: 4,
      title: 'Greene King Venue Finder',
      description: 'Kami pernah membangun Greene King Venue Finder, sebuah platform pencarian lokasi pub dan restoran di Inggris. Dibuat dengan Next.js dan Tailwind CSS, sistem ini memungkinkan pengguna mencari venue berdasarkan lokasi saat ini, radius jarak, dan ukuran grup. Platform ini terintegrasi dengan Google Maps untuk pengalaman pencarian yang interaktif dan mudah digunakan.',
      image: '/assets/image/ourwork/porto4.avif',
      tags: ['next js', 'tailwindcss', 'map integration'],
    },
    {
      id: 5,
      title: 'ASCC Artist-in-Residence Program',
      description: 'Kami turut mengembangkan situs program Artist-in-Residence untuk Sheikh Abdullah Al-Salem Cultural Centre di Kuwait. Platform ini dibangun dengan Next.js dan Tailwind CSS, dirancang untuk memfasilitasi pendaftaran dan penyebaran informasi program residensi seni. Situs ini menyediakan informasi fasilitas studio, tujuan program, dan akses pendaftaran daring yang mudah.',
      image: '/assets/image/ourwork/porto5.avif',
      tags: ['next js', 'tailwindcss', 'culture', 'residency'],
    },
    {
      id: 6,
      title: 'Thermo Fisher - Who The One?',
      description: 'Kami pernah mengembangkan proyek interaktif untuk Thermo Fisher Scientific berjudul “Who The One?”. Dalam proyek ini, pengguna dapat mengunggah foto dan melihat diri mereka dipadukan dengan ilmuwan terkenal secara humoris. Aplikasi berbasis Next.js dan Tailwind CSS ini bertujuan untuk membangun keterlibatan audiens secara kreatif dan menyenangkan.',
      image: '/assets/image/ourwork/porto6.avif',
      tags: ['next js', 'tailwindcss', 'interactive', 'science'],
    },
  ]

  const warnaTag = [
        {
            id: 1,
            bg: 'bg-[#F5F8C4] text-[#895B00]'
        },
        {
            id: 2,
            bg: 'bg-[#B3E3EB] text-[#004B89]'
        },
        {
            id: 3,
            bg: 'bg-[#BDEBB3] text-[#128900]'
        },
        {
            id: 4,
            bg: 'bg-[#F1D6FF] text-[#4F006C]'
        },
    ]

export default function OurWorkCenter() {

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
    <div className=' lg:w-full lg:relative lg:flex lg:flex-col lg:items-start lg:justify-center w-full relative flex flex-col items-start justify-center mt-0'>
      <div className=' lg:w-full lg:flex lg:flex-col lg:items-end lg:justify-end w-full flex flex-col items-end justify-end'>
        <h1 className=' lg:text-4xl lg:text-[#128900] lg:font-extrabold lg:mr-50 text-xl text-[#128900] font-extrabold mr-10'>Our Work</h1>
        <p className='lg:mr-50 mr-10 text-right lg:text-[16px] text-[12px]'>A collection of website we&apos;ve made with passion</p>
      </div>
    </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        // pagination={{
        //   clickable: true,
        // }}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => {
        const realIndex = swiper.realIndex; // agar bisa handle loop dengan benar
        setActiveIndex(realIndex);
      }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className="w-50">
          <Image width={140} height={140} alt={dataCard[0].title} src="/assets/image/ourwork/porto1.avif" className="rounded border-2 border-[#128900]"/>
        </SwiperSlide>
        <SwiperSlide>
          <Image width={140} height={140} alt={dataCard[0].title} src="/assets/image/ourwork/porto2.avif" className="rounded border-2 border-[#128900]"/>
        </SwiperSlide>
        <SwiperSlide>
          <Image width={140} height={140} alt={dataCard[0].title} src="/assets/image/ourwork/porto3.avif" className="rounded border-2 border-[#128900]"/>
        </SwiperSlide>
        <SwiperSlide>
          <Image width={140} height={140} alt={dataCard[0].title} src="/assets/image/ourwork/porto4.avif" className="rounded border-2 border-[#128900]"/>
        </SwiperSlide>
        <SwiperSlide>
          <Image width={140} height={140} alt={dataCard[0].title} src="/assets/image/ourwork/porto5.avif" className="rounded border-2 border-[#128900]"/>
        </SwiperSlide>
        <SwiperSlide>
          <Image width={140} height={140} alt={dataCard[0].title} src="/assets/image/ourwork/porto6.avif" className="rounded border-2 border-[#128900]"/>
        </SwiperSlide>
      </Swiper>
      <div className="flex flex-col relative lg:w-120 w-70 mb-100 bottom-5">
        {
          dataCard.map((item, index) => (
            <div key={index} className={`absolute transition-opacity duration-500 ease-in-out ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}>
              <h2 className="lg:text-xl text-md font-bold mb-3 text-[#128900]">{item.title}</h2>
              <div className="flex flex-row flex-wrap justify-start items-end gap-2 mb-3">
                {
                  item.tags.map((tag, tagIndex) => (
                    <p key={tagIndex} className={`py-1 px-4
                      ${
                          tag === 'next js' ? warnaTag[1].bg :
                          tag === 'tailwindcss' ? warnaTag[2].bg :
                          tag === 'market place' ? warnaTag[0].bg :
                          warnaTag[3].bg
                      }
                      rounded-full lg:text-[12px] text-[8px] font-semibold`}>{tag}</p>
                  ))
                }
              </div>
              
              <p className="lg:text-sm text-[12px] mt-3 text-justify text-gray-700">{item.description}</p>
            </div>
          ))
        }
        {/* {activeIndex === 0 && (
          <p className="mt-4 transition-opacity duration-500 ease-in-out opacity-100">
          Kami pernah mengembangkan Equusbook, marketplace berbasis Next.js dan Tailwind CSS untuk jual beli kuda, horsebox, dan properti equestrian di Inggris. Platform ini mendukung iklan gratis dan navigasi yang mudah bagi komunitas berkuda
          </p>
        )} */}
      </div>
    </>
  );
}
