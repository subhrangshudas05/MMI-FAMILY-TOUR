"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getRoutesFromSearch } from "@/actions/SearchAction";

import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";

const Footer = () => {
  const router = useRouter();

  // Selected 6 best destinations from the data
  const popularDestinations = [
    { name: "Goa", route: "goa" },
    { name: "Jaipur", route: "jaipur" },
    { name: "Kerala", route: "kerala" },
    { name: "Manali", route: "manali" },
    { name: "Leh Ladakh", route: "leh-ladakh" },
    { name: "Delhi", route: "delhi" },
  ];

  const handleDestinationClick = async (query) => {
    // ✅ await here so routes is an array, not a Promise
    const routes = await getRoutesFromSearch(query);

    if (!Array.isArray(routes) || routes.length === 0) {
      console.log("⚠️ No routes found for", query);
      return;
    }

    router.push(`/packages?place=${query}&routes=${routes.join(",")}`);
  };

  //logo variants
  const baloonVariant = {
    initial: {
      x: -150,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
      },
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.5,
      },
    },
  };
  const cloud1Variant = {
    initial: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
      },
    },
    animate: {
      x: [0, 10, 0, -10, 0], // horizontal ellipse motion
      y: [0, -2.5, 5, 2.5, -5, 0], // vertical ellipse motion + entrance
      opacity: 1,
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  const cloud2Variant = {
    initial: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
      },
    },
    animate: {
      x: [10, 0, -10, 0, 10],
      y: [0, 2.5, -5, -2.5, 5, 0],
      opacity: 1,
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Animation variants
  const baloonVariant2 = {
    initial: { y: 20, opacity: 0.8 },
    animate: {
      y: [20, 0, 20],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const cloud1Variant2 = {
    initial: { x: -10, opacity: 0.6 },
    animate: {
      x: [-10, 10, -10],
      opacity: [0.6, 0.8, 0.6],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const cloud2Variant2 = {
    initial: { x: 10, opacity: 0.6 },
    animate: {
      x: [10, -10, 10],
      opacity: [0.6, 0.8, 0.6],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <footer className="relative z-100 bg-gradient-to-b from-slate-800 to-slate-950 poppins text-white pb-16 md:pb-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          variants={baloonVariant2}
          initial="initial"
          animate="animate"
          className="h-16 w-16 md:h-20 md:w-20 absolute top-4 right-8"
        >
          <div className="w-full h-full bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-30"></div>
        </motion.div>

        <motion.div
          variants={cloud2Variant2}
          initial="initial"
          animate="animate"
          className="absolute top-8 right-4 h-12 w-12 md:h-16 md:w-16"
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-300 to-blue-500 rounded-full opacity-20"></div>
        </motion.div>

        <motion.div
          variants={cloud1Variant2}
          initial="initial"
          animate="animate"
          className="absolute top-6 left-3 h-10 w-10 md:h-14 md:w-14"
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-300 to-purple-500 rounded-full opacity-20"></div>
        </motion.div>
      </div>

      {/* Desktop Layout */}
      <div className="block">
        <div className="max-w-[1536px] w-[87vw] sm:w-[93vw] mx-auto sm:px-8 lg:px-9 py-12">
          <div className="flex flex-col md:flex-row justify-between w-full gap-8 md:gap-16">
            {/* Company Info */}
            <div className="flex items-center gap-8">
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ amount: 0.2, once: false }}
                className="relative  transform z-10 h-40 w-40 md:h-70 md:w-70 "
              >
                <motion.div
                  variants={baloonVariant}
                  className="h-full w-full absolute "
                >
                  <Image
                    src="/baloon.png"
                    // src="https://static.vecteezy.com/system/resources/thumbnails/041/713/502/small_2x/ai-generated-majestic-snowy-peaks-of-a-high-mountain-range-on-transparent-background-stock-png.png"
                    alt="bg"
                    fill
                    unoptimized
                    className="object-contain object-bottom  "
                  />
                </motion.div>

                <motion.div
                  variants={cloud2Variant}
                  className="absolute top-[30%] z-20 -translate-y-1/2 -right-4 h-18 w-18 md:h-30 md:w-30"
                >
                  <Image
                    src="/cloud.png"
                    // src="https://static.vecteezy.com/system/resources/thumbnails/041/713/502/small_2x/ai-generated-majestic-snowy-peaks-of-a-high-mountain-range-on-transparent-background-stock-png.png"
                    alt="bg"
                    fill
                    unoptimized
                    className="object-contain object-bottom z-10"
                  />
                </motion.div>
                <motion.div
                  variants={cloud1Variant}
                  className="absolute top-[50%] -left-2 h-18 w-18 md:h-30 md:w-30 -translate-y-1/2"
                >
                  <Image
                    src="/cloud.png"
                    // src="https://static.vecteezy.com/system/resources/thumbnails/041/713/502/small_2x/ai-generated-majestic-snowy-peaks-of-a-high-mountain-range-on-transparent-background-stock-png.png"
                    alt="bg"
                    fill
                    unoptimized
                    className="object-contain object-bottom z-10"
                  />
                </motion.div>
              </motion.div>

              <div className="">
                <div className="text-lg md:text-3xl font-bold text-orange-400 mb-1 md:mb-3">
                  Mimi family tour
                </div>
                <div className="text-xs text-gray-300 space-y-1">
                  <p>Kolkata, West Bengal</p>
                </div>

                {/* Social Media Icons */}
                <div className="flex space-x-3 mt-3 md:mt-6">
                  <Link
                    href="https://www.facebook.com/share/169sNhPi6r/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Facebook size={20} />
                  </Link>
                  <Link
                    href="https://www.instagram.com/mimi_family_tour?igsh=N296d29lZXI0bjFn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    <Instagram size={20} />
                  </Link>
                  {/* <Link href="#" className="text-red-400 hover:text-red-300 transition-colors">
                  <Youtube size={20} />
                </Link> */}
                  <Link
                    href="https://wa.me/918820361987"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors"
                  >
                    <img src="/whatsappoutline.png" alt="wp" className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex  justify-between w-auto px-4 ">
              {/* Quick Links */}
              <div className="">
                <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-4 text-orange-400">
                  Quick Links
                </h3>
                <div className="space-y-1 md:space-y-2 text-sm md:text-base ">
                  <Link
                    href="/about"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                  {/* <Link
                    href="/blog"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Blog
                  </Link> */}
                  <Link
                    href="/contact#faq"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    FAQ's
                  </Link>
                  <Link
                    href="/#reviews"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Reviews
                  </Link>
                  <Link
                    href="/contact#achievments"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Achievments
                  </Link>
                  <Link
                    href="/contact"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/contact#send message"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Send Message
                  </Link>
                  {/* <Link
                    href="/privacy"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link> */}
                  <Link
                    href="/cancellation-policy"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Cancellation Policy
                  </Link>
                  {/* <Link
                    href="/terms"
                    className="block text-gray-300 hover:text-white transition-colors"
                  >
                    Terms & Condition
                  </Link> */}
                </div>
              </div>

              {/* Popular Destinations */}
              <div className="">
                <h3 className="text-base md:text-lg text-right font-semibold mb-2 md:mb-4 text-orange-400">
                  Popular Destinations
                </h3>
                <div className="flex flex-col space-y-1 md:space-y-2 text-sm md:text-base ">
                  {popularDestinations.map((destination, index) => (
                    <button
                      key={index}
                      onClick={() => handleDestinationClick(destination.route)}
                      className="text-gray-300 hover:text-white hover:text-bold transition-all duration-200 text-right"
                    >
                      {destination.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t gap-4 border-gray-700 mt-8 md:mt-8 pt-4 md:pt-6 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400">
              © 2025 <span className="text-orange-400">Mini family tour</span>.
              All rights reserved.
            </div>
            <div className="flex lg:flex-row flex-col items-center space-x-6 text-sm text-gray-300 gap-1">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>{process.env.NEXT_PUBLIC_EMAIL}</span>
              </div>
              <div className="flex items-center text-sm md:text-base space-x-2">
                <Phone size={16} />
                <span>+91 62892 30689</span>
                <span>|</span>
                <span>+91 88203 61987</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
