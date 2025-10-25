"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

const Image_slider = ({ images }) => {
  return (
    <>
      <div className="relative w-full">
        {/* Custom Navigation Buttons */}
        <button className="custom-prev navigation absolute left-[10%] top-1/2 -translate-y-1/2 cursor-pointer z-10 w-10 h-10 rounded-full bg-[#7c7d82] flex items-center justify-center transition hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left text-white w-5 h-5"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
        </button>

        <button className="custom-next navigation absolute right-[10%] top-1/2 -translate-y-1/2 cursor-pointer z-10 w-10 h-10 rounded-full bg-[#7c7d82] flex items-center justify-center transition hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right text-white w-5 h-5"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>

        <Swiper
          loop={true}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={4}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="customSwiper relative"
          breakpoints={{
            320: { slidesPerView: 1 }, // mobile
            640: { slidesPerView: 2 }, // tablet
            1024: { slidesPerView: 4.2 }, // desktop
          }}
        >
          {images.map((img) => (
            <SwiperSlide key={img.id}>
              <div className=" w-[250px] h-[200px] transform transition-transform duration-200 ease-in-out hover:scale-110 relative rounded-lg overflow-hidden flex-shrink-0 cursor-pointer bg-white group flex justify-center items-center">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="100vw"
                  className="object-cover rounded-xl shadow-md"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Image_slider;
