"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  scale,
} from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function Keyframes() {
  return (
    <motion.div
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["10%", "10%", "50%", "50%", "10%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
      className="h-25 w-25 rounded-2xl bg-amber-800"
    />
  );
}



export function AnimatedNumber({number,duration=4}) {
  const num=parseInt(number)
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.9 }); // once: true means animate only once
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, num, { duration: duration });
      return () => controls.stop();
    } else {
      const controls = animate(count, 0, { duration: duration });
      return () => controls.stop();
    }
  }, [isInView, count]);

  return (
    
      <motion.pre ref={ref} className="poppins">
        {rounded}
      </motion.pre>
    
  );
}


