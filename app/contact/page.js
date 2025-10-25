"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import TravelContactPage from "@/components/contactpage";
import HeaderMenu from "@/components/HeaderMenu";

const Contact = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      <header className="all relative  flex items-center justify-center xl:h-[820px] lg:h-[750px] md:h-[700px] h-[600px]  w-full  ">
        {/* Background layer - furthest back */}
        <div
          className="absolute top-0 h-full w-full transform "
          style={{ transform: `translateY(${offsetY * 0.5}px)` }}
        >
          <img
            src="https://travelojo.in/wp-content/uploads/2024/11/cityscape-of-shimla-himachal-pradesh-city-1-hero.jpeg"
            alt="bg"
            className="object-cover h-full w-full"
          />
          
          <div className="absolute inset-0 bg-black opacity-35"></div>
        </div>

        {/* Text layer - in front of background */}
        <div className="absolute top-1/2 left-1/12 transform  -translate-y-1/2  z-10">
          <h1
            className="federo text-white drop-shadow-2xl text-shadow-md text-shadow-amber-700 uppercase space-y-3 tracking-wider text-center"
            style={{ transform: `translateY(${offsetY * 0.4}px)` }}
          >
            <AnimatedHeading />
          </h1>
        </div>
      </header>
      <div className="relative  bg-amber-800 z-20">
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

export default Contact;

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
      <h1 className="federo text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[88px] font-bold text-white leading-tight  select-none tracking-wide">
        <span className="block mb-2">{splitTextIntoLetters("CONTACT")}</span>
        <span className="block">{splitTextIntoLetters("WITH US")}</span>
      </h1>
    </div>
  );
};
