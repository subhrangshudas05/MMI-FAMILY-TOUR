"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import packageVM from "@/viewmodel/packageVM";
import { getRoutesFromSearch } from "@/actions/SearchAction";
import { Suspense } from "react";

export default function PackagesPage() {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const router = useRouter();
  const handlePkgClick = (href) => {
    router.push(href);
  };
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  // read values from query string
  const q = searchParams.get("q");
  const place = searchParams.get("place");
  const routes = searchParams.get("routes");

  const routeList = routes?.split(",") || [];

  const { packages, isLoading, loadPackagesFromRoutes, applyFilters } =
    packageVM();

  useEffect(() => {
    const fetchData = async () => {
      if (routeList?.length) {
        await loadPackagesFromRoutes(routeList);
      } else if (q) {
        const calculatedRoutes = await getRoutesFromSearch(q);
        await loadPackagesFromRoutes(calculatedRoutes);
      } else if (place) {
        const calculatedRoutes = await getRoutesFromSearch(place);
        await loadPackagesFromRoutes(calculatedRoutes);
      }
    };
    setLoading(true);
    fetchData();
    setLoading(false);
  }, [q, place, routes, loadPackagesFromRoutes]);

  const handleSort = (sortBy) => {
    // preserve existing query params
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortBy);

    applyFilters({ sortBy });
    // navigate (no `shallow` here – App Router is shallow by design)
    router.push(`/packages?${params.toString()}`);
  };
  // Apply sorting via Zustand

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
      y: 100,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
      },
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };
  const cloud2Variant = {
    initial: {
      x: 80,
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
        delay: 0.2,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center text-2xl sm:text-3xl">
          Loading...
        </div>
      }
    >
      <div className="max-w-[2000px] mx-auto overflow-x-clip">
        <header className="relative w-full  h-[500px] sm:h-600px lg:h-[700px] transform ">
          <div
            className="absolute h-full w-full overflow-clip"
            style={{ transform: `translateY(${offsetY * 0.5}px)` }}
          >
            <Image
              src="/mountbg.png"
              alt="bg"
              fill
              unoptimized
              className="object-cover  z-10"
            />
            <div
              style={{ transform: `translateY(${offsetY * 0.2}px)` }}
              className="gradbg3 absolute h-full w-full"
            ></div>
            <div className="absolute h-full w-full z-12 bg-black/25"></div>
          </div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ amount: 0.2, once: false }}
            className="absolute top-[45%] left-1/2 transform  -translate-y-1/2 -translate-x-1/2  z-10 h-60 w-60 sm:h-80 sm:w-80 "
            style={{ transform: `translateY(${offsetY * 0.4}px)` }}
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
              className="absolute top-[30%] -translate-y-1/2 right-0 h-25 w-25 sm:h-35 sm:w-35"
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
              className="absolute top-[50%] left-2 h-25 w-25 sm:h-35 sm:w-35 -translate-y-1/2"
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
        </header>

        <section className="poppins gradbg relative z-20 flex flex-col items-center py-12 sm:py-18  w-full  text-black ">
          {packages.length != 0 && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-center mb-8"
              >
                <h2 className="gradient-text5 text-xl sm:text-3xl text-shadow-lg font-bold text-blue-950 border-4 border-blue-950 rounded-full px-6 md:px-8 py-2 md:py-4 inline-block">
                  Our Packages
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.2,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                className="text-center text-gray-600 mb-12 mx-4 text-lg"
              >
                <span className="font-semibold text-blue-900">Note:</span> The
                packages shown are based on the items you searched for.
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20 px-4 sm:px-10">
                {packages.map((pkg) => (
                  <div
                    onClick={() => {
                      handlePkgClick(`/tour/${pkg.route}`);
                    }}
                    key={pkg.route}
                    className="bg-white  rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-101 overflow-x-clip"
                  >
                    {/* WhatsApp Icon */}
                    <div className="relative border-8 border-transparent w-[90vw] md:w-[45vw] aspect-[4/3]  sm:aspect-[16/9] ">
                      <Image
                        src={pkg.places[0].img}
                        alt={pkg.title}
                        fill
                        className=" object-cover rounded-2xl "
                      />

                      {/* Duration Badge */}
                      <div className="mb-4 sm:mb-6">
                        <div className="absolute bottom-4 left-4 flex poppins px-4 py-3 sm:px-6 sm:py-3 backdrop-blur-sm rounded-full bg-black/20 border-2 border-white/80 transition-all duration-300 transform hover:scale-102">
                          <div className="text-white flex gap-2 text-sm sm:text-base font-semibold tracking-wide uppercase ">
                            <span>{pkg.ds} Days</span>
                            {`.`}
                            <span>{pkg.ns} Nights</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="gradient-text5 text-xl sm:text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
                        {pkg.title}
                      </h3>

                      {/* Price */}
                      <div className="mb-6">
                        <p className="text-lg font-bold text-gray-800">
                          Starting from{" "}
                          <span className="text-2xl text-green-600 ms-1">
                            ₹{pkg.price}
                          </span>
                        </p>
                      </div>

                      {/* Action Buttons */}

                      <Link href={`/tour/${pkg.route}`}>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          variants={{
                            pulse: {
                              background: [
                                "linear-gradient(45deg, #1f1c2c, #928dab, #524a7b)",
                                "linear-gradient(90deg, #3b140d, #63311f, #ab4607)",
                                "linear-gradient(135deg, #1d0f38, #2e1065, #6a0572)",
                                "linear-gradient(180deg, #2d1b69, #11998e, #38ef7d)",
                              ],
                              transition: {
                                duration: 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                              },
                            },
                          }}
                          animate="pulse"
                          className="px-8 py-3 text-white rounded-2xl font-medium shadow-lg text-xl federo"
                        >
                          Begin the Adventure
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {packages.length === 0 && !isLoading && (
            <div className="text-center text-base sm:text-lg w-screen text-gray-500 mx-16 my-16 sm:my-20 ">
              <h2 className="text-lg sm:text-xl font-semibold ">
                No packages found
              </h2>
              <p>
                Try adjusting your search or browse our popular destinations
              </p>
            </div>
          )}
          {packages.length === 0 && isLoading && (
            <div className="text-center w-screen text-gray-500 mx-16 my-16 sm:my-20 ">
              <div className="text-center text-gray-600 flex flex-col items-center ">
                <div className="w-12 md:w-18 h-12 md:h-18 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>

                <h2 className="text-xl font-semibold mt-2">Loading...</h2>
              </div>
            </div>
          )}
        </section>
      </div>
    </Suspense>
  );
}

// puro past faltu div
{
  /* <div className=" gradbg relative z-20 flex flex-col items-center p-20 h-[200vh] w-full  text-black">
        <div className="mb-4">
          {q && <h1>Search results for "{q}"</h1>}
          {place && <h1>Packages for {place}</h1>}
        </div>

        <div className="flex flex-wrap gap-2 my-4">
          {routeList.map((r, i) => (
            <span key={i} className="px-2 py-1 bg-amber-80 rounded-lg">
              {r}
            </span>
          ))}
        </div>



        <div className="filters mb-6">
          <select onChange={(e) => handleSort(e.target.value)}>
            <option value="relevance">Sort by Relevance</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="duration">Duration</option>
          </select>
        </div>




        {isLoading && <div className="text-center">Loading packages...</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.title}
              className="package-card border rounded-lg p-4 shadow text-2xl text-black"
            >
              <h1>{pkg.title}</h1>
            </div>
          ))}
        </div>

        {packages.length === 0 && !isLoading && (
          <div className="text-center text-gray-500 mt-12">
            <h2>No packages found</h2>
            <p>Try adjusting your search or browse our popular destinations</p>
          </div>
        )}
      </div> */
}
