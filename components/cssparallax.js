import React from "react";
import Image from "next/image";
import "@/app/parallax.css";
import TravelContactPage from "@/components/contactpage";
import HeaderMenu from "@/components/HeaderMenu";

const contact = () => {


  
  return (
    <div className="wrapperr h-screen w-screen border-8 border-amber-700 overflow-y-auto overflow-x-hidden bg-orange-100">
      <HeaderMenu />
      <div
        className="absolute top-0 h-20 lg:h-35 w-full z-30"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,.8) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0) 100%)",
        }}
      ></div>

      <header className="all relative border-4 border-black flex items-center justify-center xl:h-[800px] lg:h-[570px] md:h-[900px] sm:h-[650px] h-[600px] transform-3d ">
        {/* Background layer - furthest back */}
        <div className="absolute top-0 h-full w-full transform translate-z-[-15px] scale-[2.5] z-[-1]">
          <Image
            src="https://travelojo.in/wp-content/uploads/2024/11/cityscape-of-shimla-himachal-pradesh-city-1-hero.jpeg"
            alt="bg"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-25"></div>
        </div>
        
        {/* Text layer - in front of background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-z-[-8px] scale-[1.8] z-10">
          <h1 className="federo text-white drop-shadow-2xl text-shadow-md text-shadow-amber-700 uppercase space-y-3 tracking-wider text-center">
            <AnimatedHeading />
          </h1>
        </div>
      </header>
      
      {/* Main content section - highest z-index */}
      <div className="relative h-screen w-screen bg-amber-300 z-20">
        <img
          src="/layer.png"
          alt="layer"
          className="absolute top-0 left-0 w-full transform -translate-y-[82%] z-21"
        />
        <div className="relative z-22">
          <TravelContactPage />
        </div>
      </div>
    </div>
  );
};

export default contact;

const AnimatedHeading = () => {
  // Component to animate individual letters
  const AnimatedLetter = ({ char, index }) => {
    // Handle spaces differently
    if (char === " ") {
      return <span className="inline-block w-4 sm:w-6 md:w-8"></span>;
    }

    return (
      <span
        className="inline-block cursor-pointer relative transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-125 hover:rotate-3 hover:text-orange-300 transform-gpu group"
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
    <div className="mb-4 sm:mb-6">
      <h1 className="federo text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-8xl font-bold text-white leading-tight  select-none tracking-wide">
        <span className="block mb-2">{splitTextIntoLetters("CONTACT")}</span>
        <span className="block">{splitTextIntoLetters("WITH US")}</span>
      </h1>
    </div>
  );
};
