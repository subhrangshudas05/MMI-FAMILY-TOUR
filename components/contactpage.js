"use client";

import React, { useState } from "react";
import {
  motion
} from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  Clock,
  Users,
  Award,
  Globe,
} from "lucide-react";
import KK from "@/components/contact2";
import { AnimatedNumber } from "./AnimateNumm";

const TravelContactPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const faqs = [
    {
      question: "How can I book a travel package?",
      answer:
        "You can book a travel package through our website by selecting your desired destination, choosing dates, and following the booking process. You can also call us directly at +919831393561 or visit our office for personalized assistance.",
    },
    {
      question: "Do you offer group discounts?",
      answer:
        "Yes! We offer attractive group discounts for parties of 6 or more people. Group discounts range from 10-25% depending on the destination and group size. Contact us for custom group packages and special rates.",
    },
    {
      question: "Can I reschedule my trip?",
      answer:
        "Trip rescheduling is possible with advance notice. Changes made 30+ days before travel have no fees, 15-29 days incur a 10% fee, and less than 15 days may have higher charges. Emergency situations are handled case-by-case.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, UPI payments, net banking, and cash payments at our office. EMI options are available for packages above ₹50,000.",
    },
    {
      question: "Is travel insurance included?",
      answer:
        "Basic travel insurance is included in all international packages. For domestic trips, insurance is optional but highly recommended. We can arrange comprehensive coverage including medical, trip cancellation, and baggage protection.",
    },
    {
      question: "What documents do I need for international travel?",
      answer:
        "For international travel, you'll need a valid passport (6+ months validity), visa (if required), travel insurance, and vaccination certificates where applicable. We provide complete documentation assistance and visa processing services.",
    },
    {
      question: "Do you provide customized itineraries?",
      answer:
        "Absolutely! We specialize in creating personalized travel experiences. Our expert team will work with you to design a custom itinerary based on your preferences, budget, and travel style. Contact us to start planning your dream trip.",
    },
    {
      question: "What's your cancellation policy?",
      answer:
        "Cancellation charges vary by package and timing: 30+ days (10% of package cost), 15-29 days (25%), 7-14 days (50%), less than 7 days (75%). Some components like flights may have different terms. Full policy details provided at booking.",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ fullName: "", email: "", phone: "", message: "" });
  };

  const Chevron = ({ isOpen }) => {
    return (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-orange-500 flex-shrink-0"
        initial={false} // prevents initial animation flash
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      >
        <polyline points="6 9 12 15 18 9" />
      </motion.svg>
    );
  };

  return (
    <div className="bg-gradient-to-b from-orange-200 via-yellow-50  to-orange-200 py-16 poppins  overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-gray-800 mb-6">
            Let's Plan Your Next
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              {" "}
              Adventure
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From dream destinations to seamless experiences, we're here to make
            your travel dreams come true. Get in touch and let's create
            unforgettable memories together.
          </p>
        </div>

        {/* Stats Section */}
        <div 
        id="achievments"
        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8 mb-16">
          {/* Happy Travelers */}
          <div className="text-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <Users className="w-8 h-8 text-orange-500 mx-auto mb-4" />
            <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center poppins">
              <AnimatedNumber number={250} duration={3} />+
            </div>
            <div className="text-gray-600">Happy Travelers</div>
          </div>

          {/* Destinations */}
          <div className="text-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <Globe className="w-8 h-8 text-orange-500 mx-auto mb-4" />
            <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center poppins">
              <AnimatedNumber number={40} duration={1.5} />+
            </div>
            <div className="text-gray-600">Destinations</div>
          </div>

          {/* Years Experience */}
          <div className="text-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <Award className="w-8 h-8 text-orange-500 mx-auto mb-4" />
            <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center poppins">
              <AnimatedNumber number={5} duration={1} />+
            </div>
            <div className="text-gray-600">Years Experience</div>
          </div>

          {/* Customer Support */}
          <div className="text-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <Clock className="w-8 h-8 text-orange-500 mx-auto mb-4" />
            <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              24/7
            </div>
            <div className="text-gray-600">Customer Support</div>
          </div>
        </div>

        <KK />

        {/* FAQ Section */}
        <div 
        id="faq"
        className="bg-white rounded-3xl p-8 pb-12 overflow-y-hidden shadow-xl my-16">
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.1, once: true }}
            transition={{
              default: { type: "tween", duration: 0.4, delay: 0.1 },
            }}
            className="mt-2"
          >
            <h2 className="text-2xl sm:text-4xl font-bold text-center text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-center mb-12 text-lg max-w-3xl mx-auto">
              Got questions? We've got answers! Here are some of the most common
              questions our travelers ask.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                whileHover={{
                  boxShadow:
                    "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.96 }}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ amount: 0.3 }}
                transition={{
                  default: { type: "tween", duration: 0.4, delay: 0.1 },
                  opacity: { type: "tween", duration: 0.3, delay: 0.2 },
                  y: { type: "tween", duration: 0.4, delay: 0.5 },
                }}
                key={index}
                className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm  "
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  </motion.div>
                </button>
                {openFaq === index && (
                  <motion.div className="px-6 py-5 bg-white">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            24/7 Emergency Travel Support
          </h3>
          <p className="mb-6 opacity-90">
            Traveling and need immediate assistance? Our emergency hotline is
            always available for urgent situations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center space-x-2 bg-white/20 px-6 py-3 rounded-full">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">Emergency: +91 62892 30689</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 px-6 py-3 rounded-full">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">WhatsApp 24/7</span>
            </div>
          </div>
        </div>

        {/* Google Maps Embed */}
        {/* <div className="mt-16 bg-white rounded-3xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Find Us on the Map
          </h3>
          <div className="bg-gray-200 h-96 rounded-2xl flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-orange-500" />
              <p className="text-lg font-semibold">Interactive Map Location</p>
              <p>Barrackpore Trunk Rd, Kolkata, West Bengal</p>
              <p className="text-sm mt-2 text-gray-500">
                (Google Maps integration would be embedded here)
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TravelContactPage;
