"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, AlertTriangle, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CancellationPolicyPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <div className="bg-gray-100 text-gray-800 poppins ">
      {/* --- Hero Section --- */}
      <div className="relative h-[40vh] sm:h-[50vh] w-full ">
        <Image
          src="https://images.unsplash.com/photo-1506662865996-3a5a7f62e787?q=80&w=2070&auto=format&fit=crop"
          alt="Railway tracks disappearing into the distance"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-center px-8 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Cancellation Policy
            </h1>
            <p className="mt-2 sm:mt-4 text-lg sm:text-xl max-w-2xl">
              Clear and fair policies for your peace of mind.
            </p>
          </div>
        </motion.div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-black">
        <motion.div
          className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg space-y-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Our Commitment */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="text-blue-600" size={24} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Our Commitment
              </h2>
            </div>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              At Mimi Family Tour, we understand that plans can change. We
              strive to be as flexible and fair as possible with our
              cancellation policies. Our goal is to provide clarity so you can
              book your dream vacation with confidence.
            </p>
          </motion.div>

          {/* Cancellation After Booking */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Cancellation After Ticket Booking
              </h2>
            </div>
            <div className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed border-l-4 border-red-500 pl-6 py-2 bg-red-50 rounded-r-lg">
              <p>
                If a cancellation request is made{" "}
                <strong className="font-semibold text-gray-800">
                  after your travel tickets (flight, train, etc.) have been
                  booked
                </strong>
                , the following charges will apply:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 font-medium">
                <li>
                  The{" "}
                  <strong className="text-red-700">
                    full, non-refundable cost of the booked tickets
                  </strong>
                  .
                </li>
                <li>
                  An additional{" "}
                  <strong className="text-red-700">
                    service charge of ₹1,000 to ₹2,000 per person
                  </strong>{" "}
                  to cover administrative and processing costs.
                </li>
              </ul>
              <p className="mt-4">
                The remaining amount from your advance payment will be refunded
                to you.
              </p>
            </div>
          </motion.div>

          {/* Refund Processing */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Clock className="text-green-600" size={24} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                How to Cancel & Refund Process
              </h2>
            </div>
            <ul className="mt-4 space-y-3 text-base sm:text-lg text-gray-600 leading-relaxed">
              <li>
                <strong className="font-semibold">Request in Writing:</strong>{" "}
                All cancellation requests must be done on Phone Call or sent via email to{" "}
                <Link
                  href="mimifamilytour@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  mimifamilytour@gmail.com
                </Link>{" "}
                to be considered valid.
              </li>
              <li>
                <strong className="font-semibold">Processing Time:</strong>{" "}
                Refunds will be processed within 7-10 business days after
                receiving the cancellation request and confirming the applicable
                charges.
              </li>
              <li>
                <strong className="font-semibold">
                  Pre-Booking Cancellations:
                </strong>{" "}
                If you cancel before any tickets are booked on your behalf, we
                offer more flexible options. Please contact us directly to
                discuss.
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CancellationPolicyPage;
