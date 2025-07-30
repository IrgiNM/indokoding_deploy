import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper w-full"
        >
        {[1, 2, 3, 4, 5].map((num) => (
            <SwiperSlide key={num}>
            <div className="flex items-center justify-center h-72 bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-4xl font-bold rounded-xl shadow-xl">
                Slide {num}
            </div>
            </SwiperSlide>
        ))}
    </Swiper>

    </>
  );
}
