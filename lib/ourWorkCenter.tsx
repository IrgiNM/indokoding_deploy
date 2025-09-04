import React, { forwardRef, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// import "swiper/css/effect-coverflow";
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
      description: 'We once developed Equusbook, a Next.js and Tailwind CSS-based marketplace for buying and selling horses, horseboxes, and equestrian properties in the UK. This platform supports free advertising and easy navigation for the equestrian community.',
      image: '/assets/image/ourwork/porto1.avif',
      tags: ['next js', 'tailwindcss', 'market place'],
    },
    {
      id: 2,
      title: 'Home and Gift Center',
      description: 'We once developed Home and Gift Center, an e-commerce platform built with Next.js and Tailwind CSS, designed to sell home decor and gift products. This online store offers product search features, categories, price filters, and a user-friendly gallery view.',
      image: '/assets/image/ourwork/porto2.avif',
      tags: ['next js', 'tailwindcss', 'e-commerce']
    },
    {
      id: 3,
      title: 'Thirsty Camel',
      description: 'We once developed Thirsty Camel, a product catalog platform and internal ordering system based on Next.js and Tailwind CSS. This platform allows users to view product details such as size, price, and stock in real-time, as well as facilitates the ordering process for items such as uniforms or merchandise.',
      image: '/assets/image/ourwork/porto3.avif',
      tags: ['next js', 'tailwindcss', 'product catalog'],
    },
    {
      id: 4,
      title: 'Greene King Venue Finder',
      description: 'We once built Greene King Venue Finder, a platform for searching pubs and restaurants in the UK. Created with Next.js and Tailwind CSS, this system allows users to search for venues based on their current location, distance radius, and group size. The platform is integrated with Google Maps for an interactive and user-friendly search experience.',
      image: '/assets/image/ourwork/porto4.avif',
      tags: ['next js', 'tailwindcss', 'map integration'],
    },
    {
      id: 5,
      title: 'ASCC Artist-in-Residence Program',
      description: 'We also developed the Artist-in-Residence program site for the Sheikh Abdullah Al-Salem Cultural Centre in Kuwait. This platform is built with Next.js and Tailwind CSS, designed to facilitate registration and dissemination of information about the art residency program. The site provides information about studio facilities, program objectives, and easy access to online registration.',
      image: '/assets/image/ourwork/porto5.avif',
      tags: ['next js', 'tailwindcss', 'culture', 'residency'],
    },
    {
      id: 6,
      title: 'Thermo Fisher - Who The One?',
      description: 'We once developed an interactive project for Thermo Fisher Scientific titled “Who The One?”. In this project, users can upload photos and see themselves humorously blended with famous scientists. This Next.js and Tailwind CSS-based application aims to build audience engagement in a creative and fun way.',
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

 function OurWorkCenterComponent(props: object, ref: React.Ref<HTMLDivElement>) {

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
    <div ref={ref} id="our-work" className="relative -top-30 right-0"></div>
    <div className='lg:w-full lg:relative lg:flex lg:flex-col lg:items-start lg:justify-center w-full relative flex flex-col items-start justify-center mt-0'>
      <div className='lg:w-full lg:flex lg:flex-col lg:items-end lg:justify-end w-full flex flex-col items-end justify-end'>
        <h1 className='lg:text-4xl lg:text-[#128900] lg:font-extrabold lg:mr-50 text-xl text-[#128900] font-extrabold mr-10'>Our Work</h1>
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
      <div className="flex flex-col relative lg:w-120 lg:mb-30 lg:bottom-5 w-60 mb-100 bottom-5">
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

const OurWorkCenter = forwardRef(OurWorkCenterComponent);
export default OurWorkCenter;