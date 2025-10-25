"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  "/slider1.jpg",
  "/slider2.jpg",
  "/slider3.jpg",
  "/slider4.jpg",
  "https://majesticjourney.in/wp-content/uploads/2020/05/rishikesh.jpg",
  "https://clubmahindra.gumlet.io/blog/images/pahalgam-resized.jpg?w=376&dpr=2.6",
  "https://travelojo.in/wp-content/uploads/2024/11/cityscape-of-shimla-himachal-pradesh-city-1-hero.jpeg",
];

export default function Gallery() {
  return (
    <section className="py-10 w-full relative">
      {/* Sexy Navigation Buttons */}
      <button className="custom-prev absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 cursor-pointer z-20 w-10 sm:w-14 h-10 sm:h-14 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-3 hover:shadow-2xl hover:shadow-purple-500 border-2 border-white/40 group">
        <ChevronLeft className="text-white w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-125 transition-transform duration-300" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>

      <button className="custom-next absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 cursor-pointer z-20 w-10 sm:w-14 h-10 sm:h-14 rounded-full bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-[-3deg] hover:shadow-2xl hover:shadow-blue-500 border-2 border-white/50 group">
        <ChevronRight className="text-white w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-125 transition-transform duration-300" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-100"></div>
      </button>

      <h2 className="text-center text-3xl font-semibold mb-6">
        Places Gallery
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        // KEY CHANGES: Remove effect and set proper alignment
        centeredSlides={false} // Start from left, not center
        grabCursor={true}
        loop={true}
        slidesPerView="auto" // This allows auto-sizing based on slide width
        spaceBetween={20} // Gap between slides
        freeMode={true} // Allows natural scrolling
        // Autoplay
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        // Navigation
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="swiper-container w-[80vw] overflow-visible px-20 border-2" // More padding for bigger buttons
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i} className="!w-auto">
            {" "}
            {/* !w-auto is crucial for auto-width */}
            <div className="relative w-40 h-30 md:h-60 md:w-80">
              {" "}
              {/* Fixed width per slide */}
              <Image
                src={src}
                alt={`Slide ${i + 1}`}
                fill
                className="object-cover rounded-xl sm:rounded-2xl"
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex relative items-center justify-center gap-60 w-full">
        <div className="w-14 h-14 rounded-full bg-amber-700"></div>
        <div className="w-14 h-14 rounded-full bg-amber-700"></div>
      </div>

      <style jsx global>{`
        /* Custom styles for auto-width swiper */
        .swiper-slide {
          width: auto !important;
        }
        
        .swiper-wrapper {
          align-items: stretch;
        }
        
        /* Responsive pagination */
        .swiper-pagination {
          position: relative !important;
          margin-top: 40px !important;
          text-align: center !important;
        }

        /* Custom bullet styles */
        .swiper-pagination-bullet {
          width: 14px !important;
          height: 14px !important;
          background: #d1d5db !important;
          opacity: 0.8 !important;
          margin: 0 6px !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          border-radius: 50% !important;
          cursor: pointer !important;
        }

        .swiper-pagination-bullet:hover {
          background: #9ca3af !important;
          transform: scale(1.3) !important;
        }

        .swiper-pagination-bullet-active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          width: 40px !important;
          height: 14px !important;
          border-radius: 20px !important;
          opacity: 1 !important;
          transform: scale(1) !important;
        }

        .swiper-pagination-bullet-active:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
          width: 40px !important;
          height: 14px !important;
          border-radius: 20px !important;
          opacity: 1 !important;
          transform: scale(1.3) !important;
        }

        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .swiper-pagination-bullet {
            width: 9px !important;
            height: 9px !important;
            margin: 0 4px !important;
          }

          .swiper-pagination-bullet:hover {
            transform: scale(1.2) !important;
          }

          .swiper-pagination-bullet-active {
            width: 25px !important;
            height: 9px !important;
            border-radius: 10px !important;
          }

          .swiper-pagination-bullet-active:hover {
            width: 20px !important;
            height: 9px !important;
            border-radius: 10px !important;
            transform: scale(1.2) !important;
          }
        }
        
        /* Hover effect for navigation buttons */
        .custom-prev:hover,
        .custom-next:hover {
          transform:  scale(1.1);
        }
        
        .custom-prev:active,
        .custom-next:active {
          transform:  scale(0.95);
        }
      `}</style>
    </section>
  );
}
