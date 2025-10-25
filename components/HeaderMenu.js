"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import AnimatedText from "./Animatetext";
import Navbar from "./Navbar";
import Link from "next/link";
import SideMenu from "@/components/sidemenu";
import * as motion from "motion/react-client";
import TravelSearchComponent from "./SearchBar";

export default function HeaderMenu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hidden, setHidden] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLg, setIsLg] = useState(false);

  const checkIfAtTop = () => {
    const currentScrollY = window.scrollY;
    setHidden(currentScrollY > 10);
  };

  // Track screen size
  useEffect(() => {
    const checkSize = () => setIsLg(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const bigHead = {
    collapsed: {
      opacity: 0,
      y: -120,
      transition: {
        duration: 0.4,
        type: "tween",
      },
    },
    opened: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "tween",
      },
    },
  };
  const lilHead = {
    collapsed: {
      opacity: 0,
      y: -80,
      transition: {
        duration: 0.4,
        type: "tween",
      },
    },
    opened: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "tween",
      },
    },
  };
  useEffect(() => {
    setHidden(false);
  }, []);

  useEffect(() => {
    // Set client-side flag and check initial position
    setIsClient(true);
    checkIfAtTop();

    const handleScroll = () => {
      checkIfAtTop();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't render until client-side to prevent hydration mismatch
  // if (!isClient) {
  //   return null;
  // }
  const searchBar = {
    collapsed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        type: "tween",
      },
      transitionEnd: {
        visibility: "hidden", // only after fade-out
      },
    },
    openned: {
      opacity: 1,
      y: -10,
      visibility: "visible",
      transition: {
        duration: 0.2,
        type: "tween",
      },
    },
  };
  const searchBarPh = {
    collapsed: {
      opacity: 0,
      x: 40,
      y: 0,
      transition: {
        duration: 0.3,
        type: "tween",
      },
      transitionEnd: {
        visibility: "hidden", // only after fade-out
      },
    },
    openned: {
      opacity: 1,
      x: 0,
      y: 0,
      visibility: "visible",
      transition: {
        duration: 0.2,
        type: "tween",
      },
    },
  };

  return (
    <div>
      <motion.div
        className="absolute insert-0 h-15 lg:h-30 z-50 "
        initial="opened"
        animate={hidden ? "collapsed" : "opened"}
      >
        <motion.div
          className={`text-white hidden lg:block fixed top-0 left-0 right-0  h-30 `}
          variants={bigHead}
        >
          {/* logo */}
          <Link
            href="/"
            className="z-200 absolute top-0 xl:mx-4 xl:mt-2 lg:mx-2 lg:mt-3 lg:h-[80px] lg:w-[180px] xl:h-[100px] xl:w-[220px]"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-full w-full object-contain"
            />
          </Link>

          <div className="flex flex-col justify-center items-center  h-full w-full">
            {/* top portion over navbar */}
            <div className=" federo  flex justify-center items-center  w-full h-14 z-100  text-2xl overflow-hidden  ">
              {/* searchbar */}
              <motion.div
                onClick={() => {
                  if (!isOpen) setIsOpen(true);
                }}
                className="text-black search absolute left-1/2 flex transform -translate-x-1/2  h-10 bg-white rounded-full px-4 items-center justify-between gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className=" text-black cursor-pointer"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
                <span className=" text-gray-600 font-semibold poppins text-xs ps-0.5 pe-2 ">
                  {searchQuery || "Explore & Discover"}
                </span>
                <AnimatedText />
              </motion.div>
              <motion.div
                variants={searchBar}
                initial="collapsed"
                animate={isOpen ? "openned" : "collapsed"}
                className="w-2xl absolute top-4 left-1/2 -translate-x-1/2 "
              >
                <TravelSearchComponent
                  setIsOpen={setIsOpen}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </motion.div>
              {/* insta */}
              <div
                className="ml-auto mr-8 "
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/mimi_family_tour/",
                    "_blank"
                  )
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

            <div className=" federo flex justify-center items-center  w-full h-14  text-2xl">
              <Navbar />
            </div>
          </div>
        </motion.div>

        <motion.div
          className={` text-white lg:hidden block fixed top-0 left-0 right-0 z-50 h-15  `}
          variants={lilHead}
        >
          <div className="relative flex items-center  w-full h-full sm:px-4 px-3">
            <SideMenu />

            {/* logo */}
            <Link
              href={"/"}
              className="z-200 absolute top-[4px] left-1/2 h-14 w-30 sm:h-16 sm:w-34 transform -translate-x-[60%] "
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="h-full w-full object-contain"
              />
            </Link>

            <div
              onClick={() => {
                if (!isOpen) setIsOpen(true);
              }}
              className="absolute right-2 sm:right-4 text-black search  flex   h-8 bg-white rounded-full px-2 sm:px-4 items-center justify-center gap-1 sm:gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
                className=" text-black cursor-pointer"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
              <span className="federo hidden md:block text-gray-600 font-bold text-xs ps-0.5 pe-2 ">
                Explore & Discover
              </span>
              <div className="">
                <AnimatedText />
              </div>
            </div>
            <motion.div
              variants={searchBarPh}
              initial="collapsed"
              animate={isOpen ? "openned" : "collapsed"}
              className="w-2xl max-w-screen ps-4 z-999 absolute top-2 right-2 "
            >
              <TravelSearchComponent
                setIsOpen={setIsOpen}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* black overlay */}
      <div
        className="absolute top-0 h-20 sm:h-20 lg:h-35 w-full z-20  "
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,.8) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,0) 100%)",
        }}
      ></div>
    </div>
  );
}
