"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Slideshow() {
  const images = [
    "/slider1.jpg",
    "/slider2.jpg",
    "/slider3.jpg",
    "/slider4.jpg",
  ];

  const [index, setIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    // Start the scaling animation after component mounts
    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, 100);

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000); 
    
    return () => {
      clearTimeout(startTimer);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {images.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          
          <Image
            src={src}
            alt={`Slider ${i + 1}`}
            fill
            unoptimized
            className={`object-cover transition-transform duration-[5000ms] ease-linear ${
              i === index && isStarted ? "scale-110" : "scale-100"
            }`}
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  );
}