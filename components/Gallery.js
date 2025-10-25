"use client";

import Image from "next/image";
import * as motion from "motion/react-client";
// import { motion, AnimatePresence } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getRoutesFromSearch } from "@/actions/SearchAction";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function Gallery({ data }) {
  // const { subtitle, items } = category;
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const router = useRouter();

  const handleLinkClick = (href) => {
    router.push(href);
  };

  const handlePlaceClick = async (query) => {
    // ✅ await here so routes is an array, not a Promise
    const routes = await getRoutesFromSearch(query);

    if (!Array.isArray(routes) || routes.length === 0) {
      console.log("⚠️ No routes found for", query);
      return;
    }

    router.push(`/packages?place=${query}&routes=${routes.join(",")}`);
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const goToSlide = (index) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  };

  const handlePrevClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  return (
    <section className=" w-full relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          y: { type: "spring", stiffness: 250, damping: 15 },
          opacity: { duration: 0.3 },
        }}
      >
        <div className="w-full relative flex items-center justify-center mb-4  sm:mb-8 ">
          <h3 className="gradient-text5 z-1 absolute  text-center federo text-2xl sm:text-5xl font-bold">
            {data.category}
          </h3>
          <h3 className="text-white absolute text-shadow-lg text-center federo text-2xl sm:text-5xl  font-bold">
            {data.category}
          </h3>
        </div>
        <p className="text-center font-[cursive] text-lg sm:text-2xl text-amber-950/60 mb-2 sm:mb-8 font-bold">
          {data.subtitle}
        </p>
      </motion.div>

      <Swiper
        modules={[Navigation, Autoplay]}
        centeredSlides={false}
        grabCursor={true}
        loop={true}
        slidesPerView="auto"
        spaceBetween={20}
        allowTouchMove={true} // Ensure touch/drag is enabled
        // Autoplay
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        // Event handlers
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        className="swiper-container  w-[90vw] mb-4 sm:mb-8 mx-auto "
      >
        {data.items.map((place, i) => (
          <SwiperSlide key={place.route} className="!w-auto">
            <div
              onClick={() => {
                handlePlaceClick(place.route);
                // handleLinkClick(`/search/${place.route}`);
              }}
              className="relative w-70 h-45 sm:h-70 sm:w-100"
            >
              <Image
                src={place.image} // 👈 use image from object
                alt={place.name} // 👈 better alt text
                fill
                className="object-cover rounded-xl sm:rounded-2xl border-2 border-amber-800/30"
                priority={i === 0}
              />
              <div className="absolute h-full w-full bg-linear bg-gradient-to-t from-black/20 to-transparent rounded-xl sm:rounded-2xl"></div>

              <div className="absolute text-s text-center z-2 right-1/2 translate-x-1/2 bottom-2 text-white text-2xl sm:text-4xl poppins font-bold pb-1  gradient-text4">
                {place.name}
              </div>
              <div className="absolute text-s text-center z-1 right-1/2 translate-x-1/2 bottom-2 text-white text-2xl sm:text-4xl poppins font-bold pb-1  gradient-text4 text-shadow-lg">
                {place.name}
              </div>
              <div className="absolute text-s text-center  right-1/2 translate-x-1/2 bottom-2 text-white text-2xl sm:text-4xl poppins font-bold pb-1  gradient-text4 text-shadow-lg">
                {place.name}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Fixed Navigation Container */}
      <div className="flex items-center justify-center gap-4 sm:gap-8  relative z-50">
        {/* Left Button - Fixed */}
        <button
          onClick={handlePrevClick}
          className="custom-prev cursor-pointer w-10 sm:w-14 h-10 sm:h-14 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg relative z-10 hover:rotate-3 hover:shadow-2xl hover:shadow-purple-500 border-2 border-white/40"
          type="button"
        >
          <ChevronLeft className="text-white w-4 h-4 sm:w-6 sm:h-6 pointer-events-none" />
        </button>

        {/* Custom Pagination Dots - Fixed */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 relative z-10">
          {data.items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              type="button"
              className={`transition-all duration-300 cursor-pointer relative z-10 ${
                activeIndex === index
                  ? "w-8 h-3 sm:w-12 sm:h-4 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full"
                  : "w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 hover:bg-gray-400 rounded-full"
              }`}
            />
          ))}
        </div>

        {/* Right Button - Fixed */}
        <button
          onClick={handleNextClick}
          className="custom-next cursor-pointer w-10 sm:w-14 h-10 sm:h-14 rounded-full bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg relative z-10  hover:rotate-[-3deg] hover:shadow-2xl hover:shadow-blue-500 border-2 border-white/70"
          type="button"
        >
          <ChevronRight className="text-white w-4 h-4 sm:w-6 sm:h-6 pointer-events-none" />
        </button>
      </div>

      <style jsx global>{`
        /* Custom styles for auto-width swiper */
        .swiper-slide {
          width: auto !important;
        }

        .swiper-wrapper {
          align-items: stretch;
        }

        /* Fix button interactions */
        .custom-prev,
        .custom-next {
          position: relative;
          z-index: 100 !important;
          pointer-events: auto !important;
        }

        /* Remove conflicting hover transforms */
        .custom-prev:active,
        .custom-next:active {
          transform: scale(0.95) !important;
        }
      `}</style>
    </section>
  );
}
