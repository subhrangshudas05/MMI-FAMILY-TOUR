"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeaderMenu from "./HeaderMenu";
import Slideshow from "./Slideshow.js";
import HeroSection from "./HeroSection.js";
import FeaturesSection from "./Feature.js";
const Header = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="relative  slider-block  style-five  xl:h-[790px] lg:h-[700px] md:h-[600px] sm:h-[650] h-[600px]  w-full overflow-hidden">
      <div
        className="bg absolute inset-0 "
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      >
        <Slideshow />
        <div className="absolute inset-0 z-10 bg-black opacity-35"></div>
      </div>

      <div
        className="absolute inset-0 txts"
        style={{ transform: `translateY(${offsetY * 0.38}px)` }}
      >
        <div className="absolute top-0 left-0 right-0 z-30 flex flex-col h-[480px] sm:h-full">
          <HeroSection />
        </div>
        <div className="absolute bottom-0 z-30  w-full flex flex-col items-center justify-center ">
          <FeaturesSection />
        </div>
      </div>

      <div
        className="absolute top-20 right-4 z-30 cursor-pointer block lg:hidden"
        onClick={() =>
          window.open("https://www.instagram.com/mimi_family_tour/", "_blank")
        }
      >
        {" "}
        <Image
          src="/insta.png"
          alt="insta Icon"
          width={45}
          height={45}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Header;
