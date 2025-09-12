import React, { forwardRef, useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
// import "./styles.css";
// import required modules
import Image from "next/image";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "./styles.css";
import { OurWorkData } from "./adminOurWork";

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

  function OurWorkCenterComponent(props: { id: string } & object, ref: React.Ref<HTMLDivElement>) {

  const [activeIndex, setActiveIndex] = useState(0);
  const [ourWorks, setOurWorks] = useState<OurWorkData[]>([]);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        // panggil backend API
        const res = await fetch("/api/getOurWorks");
        const data = await res.json();
        console.log("Fetched ourWorks:", data);

        // Urutkan data berdasarkan pilihan sorting
        setOurWorks(data);
      } catch (err) {
        console.error("Gagal fetch ourWorks:", err);
      }
    };
    fetchContacts();
  }, []);

  return (
    <>
    <div ref={ref} id={props.id} className="relative -top-30 right-0"></div>
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
        {ourWorks.map((work, index) => (
          <SwiperSlide key={index} className="w-50">
            <Image width={140} height={140} alt={work.title} src={`/uploads/${work.fileName}`} className="rounded border-2 border-[#128900]"/>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex flex-col relative lg:w-120 lg:mb-30 lg:bottom-5 w-60 mb-100 bottom-5">
        {
          ourWorks.map((item, index) => (
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