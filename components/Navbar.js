import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { popularDestinationsData, aroundIndiaData } from "@/data/NavData.js";
import { useRouter } from "next/navigation";
import { getRoutesFromSearch } from "@/actions/SearchAction";
import packageVM from "@/viewmodel/packageVM";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session, status]);
  
  const { getPopularDestinationsData, getAroundIndiaData } = packageVM();
  const [indias, setIndias] = useState(null);
  const [populars, setPopulars] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      setLoading(true); // local loading on
      let populars;
      let indias;
      populars = await getPopularDestinationsData();
      indias = await getAroundIndiaData();
      setIndias(indias);
      setPopulars(populars);
      setLoading(false); // local loading off
    };

    loadPackages();
  }, []);
  const router = useRouter();

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handlePlaceClick = async (query) => {
    // ✅ await here so routes is an array, not a Promise
    const routes = await getRoutesFromSearch(query);

    if (!Array.isArray(routes) || routes.length === 0) {
      console.log("⚠️ No routes found for", query);
      return;
    }

    router.push(`/packages?place=${query}&routes=${routes.join(",")}`);
  };

  const dropdown = {
    collapsed: {
      opacity: 0,
      y: 8,
      transition: {
        duration: 0.3,
        type: "tween",
      },
      transitionEnd: {
        visibility: "hidden", // hides AFTER fade-out finishes
      },
    },
    openned: {
      opacity: 1,
      y: 20,
      visibility: "visible",
      transition: {
        duration: 0.4,
        type: "tween",
      },
    },
  };

  return (
    <nav className="  relative ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 ">
          {/* Navigation Links */}
          <div className="flex lg:space-x-4 xl:space-x-8 2xl:space-x-10 text-sm xl:text-base ">
            {/* Popular Destinations */}
            <div
              className="relative "
              onMouseEnter={() => handleMouseEnter("destinations")}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                animate={{
                  background: [
                    "linear-gradient(45deg, #1f1c2c, #928dab, #524a7b)", // deep purple → muted lavender → medium purple
                    "linear-gradient(90deg, #3b140d, #63311f, #ab4607)", // dark espresso → coffee → burnt orange
                    "linear-gradient(135deg, #1d0f38, #2e1065, #6a0572)", // midnight → deep purple → dark magenta
                    "linear-gradient(180deg, #2d1b69, #11998e, #38ef7d)", // deep purple → teal → emerald
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="text-white px-4   py-1.5 rounded-full  font-medium transition-colors duration-200 flex items-center"
              >
                Popular Destinations
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>

              {/* Popular Destinations Dropdown */}
              <motion.div
                className="absolute overflow-auto top-full w-90 left-0 bg-white rounded-lg shadow-xl"
                variants={dropdown}
                animate={
                  activeDropdown === "destinations" ? "openned" : "collapsed"
                }
                initial="collapsed"
                onMouseEnter={() => handleMouseEnter("destinations")}
                onMouseLeave={handleMouseLeave}
              >
                <div className="h-full w-full flex items-center justify-center ">
                  <div className="grid grid-cols-2 gap-8 pb-7 pt-8 ">
                    {populars && populars.length > 0 && (
                      <>
                        {populars.map((section, idx) => (
                          <div key={idx}>
                            <h4 className=" gradient-text2 text-orange-500 font-semibold text-sm mb-3 tracking-wide">
                              {section.category}
                            </h4>
                            <div className="space-y-1">
                              {section.items.map((item, index) => (
                                <div
                                  key={index}
                                  onClick={() => handlePlaceClick(item.route)}
                                  // href={`/search/${item.route}`}
                                  className="block text-sm cursor-pointer text-gray-600 hover:text-gray-900 hover:font-semibold hover:scale-105 p-1 transition-all duration-300 transform origin-left"
                                >
                                  {item.name}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Around India */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter("india")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-white hover:text-orange-300 px-4 py-1.5 rounded-md font-medium transition-colors duration-200 flex items-center">
                Around India
                <svg
                  className="ml-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Around India Dropdown */}
              <motion.div
                className="absolute overflow-auto top-full w-150 left-0 bg-white rounded-xl shadow-xl"
                variants={dropdown}
                animate={activeDropdown === "india" ? "openned" : "collapsed"}
                initial="collapsed"
                onMouseEnter={() => handleMouseEnter("india")}
                onMouseLeave={handleMouseLeave}
              >
                <div className="h-full w-full flex items-center  justify-center ">
                  <div className="flex flex-wrap space-y-6 space-x-13 pb-4 pt-7 px-10 justify-start ">
                    {indias && indias.length > 0 && (
                      <>
                        {indias.map((section, idx) => (
                          <div key={idx}>
                            <h4 className=" gradient-text2 text-orange-500 font-semibold text-sm mb-3 tracking-wide">
                              {section.category}
                            </h4>
                            <div className="space-y-0">
                              {section.items.map((item, index) => (
                                <div
                                  key={index}
                                  onClick={() => handlePlaceClick(item.route)}
                                  className="block text-sm cursor-pointer text-gray-600 hover:text-gray-900 hover:font-semibold hover:scale-105 p-1 transition-all duration-300 transform origin-left"
                                >
                                  {item.name}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* About Us */}
            <Link
              href="/about"
              className="gradient-text text-white hover:text-orange-300 px-4   py-1.5 rounded-md font-medium transition-colors duration-200"
            >
              About Us
            </Link>

            {/* Contact Us */}
            <Link
              href="/contact"
              className=" gradient-text text-white hover:text-orange-300 px-4   py-1.5 rounded-md transition-colors duration-200"
            >
              Contact Us
            </Link>
            {/* Contact Us */}
            <Link
              href="/signIn"
              className=" gradient-text text-white hover:text-orange-300 px-4   py-1.5 rounded-md transition-colors duration-200"
            >
              Sign In
            </Link>
            {isAdmin && (
              <Link href="/admin-dashboard">
                <RainbowButton>Admin Panel</RainbowButton>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

{
  /* <div className="space-y-6">
                      <div>
                        <h4 className="text-orange-500 font-semibold text-sm mb-4 tracking-wide">
                          NORTH INDIA
                        </h4>
                        <div className="space-y-3">
                          {aroundIndiaData["NORTH INDIA"].items.map(
                            (item, index) => (
                              <Link
                                key={index}
                                href={`/search/${item.route}`}
                                className="block text-gray-600 hover:text-gray-900 hover:font-semibold hover:scale-105 p-1 transition-all duration-200 transform origin-left"
                              >
                                {item.name}
                              </Link>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-orange-500 font-semibold text-sm mb-4 tracking-wide">
                          SOUTH INDIA
                        </h4>
                        <div className="space-y-3">
                          {aroundIndiaData["SOUTH INDIA"].items.map(
                            (item, index) => (
                              <Link
                                key={index}
                                href={`/search/${item.route}`}
                                className="block text-gray-600 hover:text-gray-900 hover:font-semibold hover:scale-105 p-1 transition-all duration-200 transform origin-left"
                              >
                                {item.name}
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-orange-500 font-semibold text-sm mb-4 tracking-wide">
                          EAST & NORTHEAST INDIA
                        </h4>
                        <div className="space-y-3">
                          {aroundIndiaData["EAST & NORTHEAST INDIA"].items.map(
                            (item, index) => (
                              <Link
                                key={index}
                                href={`/search/${item.route}`}
                                className="block text-gray-600 hover:text-gray-900 hover:font-semibold hover:scale-105 p-1 transition-all duration-200 transform origin-left"
                              >
                                {item.name}
                              </Link>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-orange-500 font-semibold text-sm mb-4 tracking-wide">
                          CENTRAL & WEST INDIA
                        </h4>
                        <div className="space-y-3">
                          {aroundIndiaData["CENTRAL & WEST INDIA"].items.map(
                            (item, index) => (
                              <Link
                                key={index}
                                href={`/search/${item.route}`}
                                className="block text-gray-600 hover:text-gray-900 hover:font-semibold hover:scale-105 p-1 transition-all duration-200 transform origin-left"
                              >
                                {item.name}
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </div> */
}
