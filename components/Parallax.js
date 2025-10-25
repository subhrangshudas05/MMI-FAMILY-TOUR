// app/parallax-page.jsx  (or pages/parallax-page.jsx)
// NOTE: keep this file in app or pages and import into your router.
// Usage: navigate to the route and scroll.

"use client";
import React from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Parallax() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* BEFORE: 100vh */}
      {/* <section className="h-[50vh] flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center px-6">
          <h2 className="text-3xl md:text-5xl font-semibold">Before Section</h2>
          <p className="mt-4 text-lg opacity-80">
            Scroll down to reveal the parallax section.
          </p>
        </div>
      </section> */}

      {/* PARALLAX SECTION: 100vh */}
      <section
        id="parallax-section"
        className={`h-[90vh] border-4 border-amber-700 wrapper relative overflow-auto scrollbar-hide `}
      >
        <header className="relative flex items-center justify-center  h-full transform-3d -z-1 ">
          <div className="bg absolute h-full w-full transform translate-z-[-10px] scale-200 ">
            <Image src="/slider1.jpg" alt="bg" fill />
          </div>
          <h1 className="absolute  text-5xl md:text-7xl lg:text-8xl font-extrabold text-white drop-shadow-2xl text-shadow-lg text-shadow-amber-700 z-3">
            PARALLAX TITLE
          </h1>

          <div className="absolute h-full w-full bg-gradient-to-b from-sky-400 via-indigo-400 to-purple-500 opacity-40 "></div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-3">
          <small>Scroll more to exit the pinned state</small>
        </div>
        </header>

        <section className="h-screen flex items-center justify-center bg-orange-200 text-white">
        <div className="text-center px-6">
          <h2 className="text-3xl md:text-5xl font-semibold">After Section</h2>
          <p className="mt-4 text-lg opacity-80">
            Done — that was the parallax area.
          </p>
        </div>
      </section>
        {/* optional content underneath */}
        
      </section>

      {/* AFTER: 100vh */}
      
    </div>
  );
}
