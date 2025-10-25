"use client"; // required for client-side animations in Next.js 13+ App Router

import React, { useState, useEffect } from "react";

const texts = ["Nepal", "Darjeeling", "Punjab", "Meghalaya", "Shimla"];

const AnimatedText = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    let timeout;

    if (typing && !erasing) {
      // Typing forward: Add letters one by one
      if (displayed.length < texts[index].length) {
        timeout = setTimeout(() => {
          setDisplayed(texts[index].slice(0, displayed.length + 1));
        }, 100);
      } else {
        // Word fully typed, pause before erasing
        timeout = setTimeout(() => {
          setTyping(false);
          setErasing(true);
        }, 1000);
      }
    } else if (erasing) {
      // Erasing: Remove letters one by one
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 50);
      } else {
        // Word fully erased, move to next word
        timeout = setTimeout(() => {
          setErasing(false);
          setTyping(true);
          setIndex((prev) => (prev + 1) % texts.length);
        }, 200);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, erasing, index]);

  return (
    <span className="text-black federo font-bold text-xs sm:text-sm inline-block min-w-[65px] sm:w-[70px] transition-opacity">
      {displayed}
    </span>
  );
};

export default AnimatedText;