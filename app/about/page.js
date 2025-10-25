"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Wallet,
  Star,
  ShieldCheck,
  Sun,
  MountainSnow,
} from "lucide-react";
import Image from "next/image";

const AboutUsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="bg-slate-50 text-gray-800 poppins">
      {/* --- Hero Section --- */}
      <div className="relative h-[60vh] sm:h-[70vh] w-full">
        <Image
          src="/bg.png"
          alt="Travel India"
          fill
          unoptimized
          className="object-cover "
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-center text-white"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="mt-16 sm:mt-32">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-shadow-lg">
              About Us
            </h1>
            <p className="mt-4 text-lg sm:text-xl max-w-2xl">
              Discover the heart behind our journeys.
            </p>
          </div>
        </motion.div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        {/* --- Our Story Section --- */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-4">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every journey begins with a dream. For my parents- Pradip Chakraborty and Rupali
              Chakraborty, that dream was simple yet powerful: to make travel
              affordable and meaningful for every family.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              With limited means but unlimited enthusiasm, they explored India’s
              hidden gems, discovering that travel isn’t about how much you
              spend, but about the memories you create. This belief gave birth
              to Mimi Family Tour—a travel agency built not just with plans and
              bookings, but with heart, trust, and the warmth of family.
            </p>
            <p className="text-right text-base sm:text-2xl font-bold federo ">~Sreeparna Chakraborty</p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/mimi.jpeg"
              alt="Founders Portrait"
              fill
              unoptimized
              className="object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </motion.section>

        {/* --- Our Vision Section --- */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold mb-12"
          >
            Our Vision for Your Journey
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <Wallet size={40} className="mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Affordable</h3>
              <p className="text-gray-600">
                Journeys that fit your budget, without compromising on quality.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <Heart size={40} className="mx-auto text-red-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comfortable</h3>
              <p className="text-gray-600">
                Care and hospitality that makes you feel right at home.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <Star size={40} className="mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Memorable</h3>
              <p className="text-gray-600">
                Experiences and stories that will last a lifetime.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* --- Meet the Founders Section --- */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
          >
            Meet the Founders
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* Rupali's Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col sm:flex-row items-center gap-8"
            >
              <div className="flex-shrink-0 w-32 h-32 relative rounded-full overflow-hidden shadow-md">
                <Image
                  src="/rupali.jpeg"
                  alt="Rupali Chakraborty"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-pink-600">
                  🌸 Rupali Chakraborty
                </h3>
                <p className="text-gray-500 italic mt-1">
                  The Heart of Mimi Family Tour
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>A homemaker and devoted mother.</li>
                  <li>Known for her homely hospitality.</li>
                  <li>The dreamer who envisioned accessible travel for all.</li>
                </ul>
              </div>
            </motion.div>
            {/* Pradip's Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col sm:flex-row items-center gap-8"
            >
              <div className="flex-shrink-0 w-32 h-32 relative rounded-full overflow-hidden shadow-md">
                <Image
                  src="/pradip.jpeg"
                  alt="Pradip Chakraborty"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-600">
                  🌟 Pradip Chakraborty
                </h3>
                <p className="text-gray-500 italic mt-1">The Driving Force</p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>A passionate traveler and supportive husband.</li>
                  <li>Turned Rupali’s dream into a reality.</li>
                  <li>Committed to bringing joy to every journey.</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* --- Why Choose Us? --- */}
        <motion.section
          className="text-center bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16 px-6 rounded-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">Why Choose Us?</h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-purple-200">
            Because when you travel with Mimi Family Tour, you’re not just
            booking a trip—you’re joining our family. We walk with you every
            step of the way.
          </p>
          <p className="mt-6 text-xl font-semibold tracking-wider bg-white/20 inline-block px-6 py-3 rounded-full">
            ✨ Our Promise: Travel like family, explore without limits.
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutUsPage;
