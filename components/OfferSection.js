import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

export const OfferGroupTour = ({ pkg }) => {
  // Calculate percentage discount
  const originalPrice = parseInt(pkg.realPrice.replace(",", ""));
  const offerPrice = parseInt(pkg.price.replace(",", ""));
  const discountPercentage = Math.round(
    ((originalPrice - offerPrice) / originalPrice) * 100
  );

  const router=useRouter()
    const handlePkgClick= (href)=>{
      router.push(href)
    }

  return (
    <div className="max-w-7xl mx-auto px-4 poppins">
      {/* Header Section */}
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-4xl md:text-5xl federo font-bold mb-1 sm:mb-3">
          <span className="text-blue-900 text-shadow-lg">SPECIAL</span>{" "}
          <span className="text-blue-400 text-shadow-lg">OFFER</span>
        </h1>
        <p className="text-lg md:text-xl text-amber-700 font-medium poppins">
          Limited Time Adventure Deal
        </p>
      </div>

      {/* Offer Package Card */}
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500">
          {/* Discount Badge */}
          <div className="absolute top-8 sm:top-10 right-6 sm:right-8 z-10">
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
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-full font-bold text-lg sm:text-xl shadow-lg animate-bounce"
            >
              {discountPercentage}% OFF
            </motion.div>
          </div>

          {/* Image Section */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={pkg.places[0].img}
              alt={pkg.title}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

            {/* Duration Badge */}
            <div className="absolute bottom-4 left-4 flex poppins px-4 py-3 sm:px-6 sm:py-3 backdrop-blur-sm rounded-full bg-black/20 border-2 border-white/80 transition-all duration-300 transform hover:scale-102">
              <div className="text-white flex gap-2 text-sm sm:text-base font-semibold tracking-wide uppercase ">
                <span>{pkg.ds} Days</span>
                {`.`}
                <span>{pkg.ns} Nights</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {pkg.title}
            </h2>

            {/* Tagline */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-l-4 border-purple-500 p-3 rounded-r-lg mb-4">
              <p className="text-purple-800 font-semibold text-sm md:text-base">
                🎉 {pkg.tagline}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-gray-500 line-through text-lg md:text-xl font-medium">
                    ₹{pkg.realPrice}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-green-600">
                    ₹{pkg.price}
                  </div>
                </div>
                <div className="text-xs md:text-sm text-gray-500">
                  per person
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  handlePkgClick(`/tour/offer`);
                }}
                className="w-full  sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 sm:px-8 py-4 rounded-2xl font-bold text-base md:text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View Package • {pkg.month}
              </button>
            </div>

            {/* Quick Features */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-blue-50 p-3 rounded-lg flex items-center justify-center">
                  <div className="text-blue-600 font-bold text-sm">
                    Wildlife Safari
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg flex items-center justify-center">
                  <div className="text-green-600 font-bold text-sm">
                    Mangrove Forest
                  </div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg flex items-center justify-center">
                  <div className="text-orange-600 font-bold text-sm">
                    Cultural Program
                  </div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg flex items-center justify-center">
                  <div className="text-purple-600 font-bold text-sm">
                    Village Walk
                  </div>
                </div>
              </div>
            </div>

            {/* Urgency Text */}
            <div className="mt-4 text-center">
              <p className="text-red-600 font-semibold text-xs md:text-sm animate-pulse">
                ⚡ Limited seats available • Offer expires soon!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 text-center">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-gray-500 text-xs md:text-sm">
          <div className="flex items-center gap-1">
            <span className="text-green-500">✓</span> Best Price Guarantee
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-500">✓</span> Free Cancellation
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-500">✓</span> Expert Guides
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-500">✓</span> 24/7 Support
          </div>
        </div>
      </div>
    </div>
  );
};
