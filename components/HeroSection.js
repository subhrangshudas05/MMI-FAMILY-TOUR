import React from "react";
import { useRouter } from "next/navigation";


const HeroSection = () => {
    const router = useRouter();
  
  const handleCallNow = () => {
    // Replace with your actual phone number
    window.location.href = "tel:+918478031443";
  };

  const handleBooking = () => {
        router.push(`/#main`);

  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full w-[95vw] sm:w-[90vw] md:w-[80vw] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Agency Tag */}
        <div className="mb-4 sm:mb-6">
          <div className=" flex poppins px-4 py-3 sm:px-6 sm:py-3 backdrop-blur-sm rounded-full bg-white/5 border-2 border-white/60 transition-all duration-300 transform hover:scale-105">
            <span className="text-white text-xs sm:text-sm font-medium tracking-wide uppercase ">
              MIMI FAMILY TOUR
            </span>
          </div>
        </div>

        <AnimatedHeading />

        {/* Call to Action Button */}
        <div>
          <button
            onClick={handleBooking}
            className="group inline-flex items-center px-6 py-2 sm:px-8 sm:py-3 bg-white/60 text-black font-semibold text-lg rounded-full hover:bg-white/80 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/90"
          >
            <span className="mr-3 tracking-wide  text-md">BOOK NOW</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>

        {/* Optional: Phone number display */}
        {/* <div className=" mt-2 sm:mt-4 ms-4">
          <p className="text-white  font-bold text-sm opacity-100">
             +91 84780 31443
          </p>
        </div> */}
      </div>

      {/* Floating elements for visual appeal */}
      {/* <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-ping"></div>
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-white rounded-full animate-bounce opacity-30"></div> */}
    </div>
  );
};

export default HeroSection;

const AnimatedHeading = () => {
  // Component to animate individual letters
  const AnimatedLetter = ({ char, index }) => {
    // Handle spaces differently
    if (char === " ") {
      return <span className="inline-block w-4 sm:w-6 md:w-8"></span>;
    }

    return (
      <span
        className="inline-block ps cursor-pointer relative transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-125 hover:rotate-3 hover:text-orange-300 transform-gpu group"
        style={{
          animationDelay: `${index * 0.05}s`,
        }}
      >
        {char}
      </span>
    );
  };

  // Split text into characters
  const splitTextIntoLetters = (text) => {
    return text
      .split("")
      .map((char, index) => (
        <AnimatedLetter key={index} char={char} index={index} />
      ));
  };

  return (
    <div className=" ps-3 mb-4 sm:mb-6">
      <h1 className="federo text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight select-none">
        <span className="block mb-2">
          {splitTextIntoLetters("WE PLAN YOU")}
        </span>
        <span className="block">{splitTextIntoLetters("PACK")}</span>
      </h1>
    </div>
  );
};
