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


export default function ExampleCarousel() {
  return (
    <>
    <div className='w-full pb-10 relative flex flex-col items-start justify-center'>
      <div className='w-full flex flex-col items-end justify-end'>
        <h1 className='text-4xl text-[#128900] font-extrabold mr-50'>Our Work</h1>
        <p className='mr-50'>A collection of website we&apos;ve made with passion</p>
      </div>
    </div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
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
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/assets/image/ourwork/porto1.avif" className="rounded border-2 border-[#128900]"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/ourwork/porto2.avif" className="rounded border-2 border-[#128900]"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/ourwork/porto3.avif" className="rounded border-2 border-[#128900]"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/ourwork/porto4.avif" className="rounded border-2 border-[#128900]"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/ourwork/porto5.avif" className="rounded border-2 border-[#128900]"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/image/ourwork/porto6.avif" className="rounded border-2 border-[#128900]"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" className="rounded border-2 border-[#128900]"/>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" className="rounded border-2 border-[#128900]"/>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
