"use client";

import { React, useEffect, useState, useRef } from "react";
import { Car, Hotel, MapPin, Train } from "lucide-react";
import { offerPackages } from "@/data/OfferPackage";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import packageVM from "@/viewmodel/packageVM";
import { use } from "react";

import { ChevronLeft, ChevronDown, ChevronRight, X } from "lucide-react";
import Whatsapp from "@/components/socialmedia";

const Page = ({ params }) => {
  const { getOfferPackages } = packageVM();
  const resolvedParams = use(params);
  const key = resolvedParams.package;
  const { getTourPackage } = packageVM();
  const [pkg, setPkg] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackage = async () => {
      setLoading(true); // local loading on
      let result; // declare outside so it's accessible later

      if (key == "offer") {
        const offerPackages = await getOfferPackages();
        result = offerPackages[0];
      } else {
        result = await getTourPackage(key);
      }
      setPkg(result);
      setLoading(false); // local loading off
    };

    if (key) loadPackage();
  }, []);

  const [bookingOpen, setbookingOpen] = useState(false);

  const gridImages = pkg?.places.slice(0, 5); // take first 5

  return (
    <>
      <div className="poppins  text-black   w-screen overflow-x-clip">
        {loading && (
          <div className="h-screen w-full flex items-center justify-center">
            <div className="text-center text-gray-600 flex flex-col items-center ">
              <div className="w-12 md:w-18 h-12 md:h-18 border-8 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>

              <h2 className="text-xl font-semibold mt-2">Loading...</h2>
            </div>
          </div>
        )}

        {!loading && !pkg && (
          <div className="h-screen w-full flex items-center justify-center">
            <div className="text-center text-gray-600 ">
              <h2 className="text-xl font-semibold">No packages found</h2>
              <p>
                Try adjusting your search or browse our popular destinations
              </p>
            </div>
          </div>
        )}

        {!loading && pkg && (
          <div className="w-full relative   text-black  ">
            <Swiper
              modules={[Autoplay]}
              centeredSlides={true}
              loop={true}
              slidesPerView={1}
              allowTouchMove={true} // disable manual swipe
              autoplay={{
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }}
              className="block md:!hidden w-[100vw] h-[calc(100vw*5/6)] mx-auto  bg-amber-100 "
            >
              {pkg.places.map((place) => (
                <SwiperSlide key={place.route}>
                  <div
                    className="relative w-full h-full"
                    onClick={() => handlePlaceClick(place.route)}
                  >
                    <Image
                      src={place.img}
                      alt={place.name}
                      unoptimized
                      fill
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute h-full w-full bg-linear bg-gradient-to-t from-black/30 to-transparent "></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-2 rounded-3xl w-[90vw] mx-auto h-[65vh] mt-33 overflow-clip">
              {/* First image spanning 2 rows */}
              <div className="relative row-span-2 bg-amber-800/20 ">
                <Image
                  src={gridImages[0].img}
                  alt={gridImages[0].name}
                  fill
                  className="w-full h-full object-cover "
                />
              </div>

              {/* Next 4 images */}
              {gridImages.slice(1).map((place, idx) => (
                <div key={idx} className="relative bg-amber-800/20">
                  <Image
                    src={place.img}
                    alt={place.name}
                    fill
                    className="w-full h-full object-cover "
                  />
                </div>
              ))}
            </div>

            <div className="main md:w-[90vw]  mx-auto poppins text-black gap-8 md:gap-16  mt-8 lg:mt-12 px-4 lg:px-0">
              <div className="head  w-full mx-auto">
                <section className="w-full md:flex gap-20 items-center justify-between">
                  <div>
                    <h2 className="gradient-text5 lg:text-5xl text-2xl md:text-3xl pb-2 font-bold text-shadow-sm">
                      {pkg.title}
                    </h2>
                    <div className="flex items-center gap-8 mt-2 md:mt-6">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl px-5 md:px-6 py-3 md:py-4 shadow-lg transform hover:scale-105 transition-transform">
                          <span className="text-2xl md:text-4xl font-bold">
                            {pkg.ds}
                          </span>
                          <span className="text-lg md:text-2xl ml-2 font-medium">
                            Days
                          </span>
                        </div>
                        <div className="text-gray-400 text-2xl">×</div>
                        <div className="bg-gradient-to-br from-slate-600 to-slate-800 text-white rounded-2xl px-5 md:px-6 py-3 md:py-4 shadow-lg transform hover:scale-105 transition-transform">
                          <span className="text-2xl md:text-4xl font-bold">
                            {pkg.ns}
                          </span>
                          <span className="text-lg md:text-2xl ml-2 font-medium">
                            Nights
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex h-full items-center mr-0 md:mr-8 mt-4 md:mt-0">
                    <div className="flex  items-center justify-center gap-4 ">
                      <div className="flex lg:flex-col ">
                        <span className="text-lg lg:text-3xl  text-gray-600 font-semibold">
                          Starting
                        </span>
                        <span className="text-lg lg:text-3xl  text-gray-600 font-semibold">
                          &nbsp;from
                        </span>
                      </div>

                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                        <span className="text-2xl lg:text-4xl font-bold">
                          ₹{pkg.price}
                        </span>
                        <div className="text-sm lg:text-base opacity-90 mt-[2px] md:mt-1">
                          per person
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <div className="h-1 bg-amber-700/30 w-full  mx-auto my-6 md:my-10 rounded-full"></div>
                <section className=" w-full pb-8  md:pb-16 ">
                  <h1 className="gradient-text3 text-2xl md:text-[42px] font-semibold text-amber-800">
                    Included Places
                  </h1>
                  <div className="mt-4 md:mt-8 w-full">
                    <PlacesSlide places={pkg.places} />
                  </div>
                </section>
              </div>
              <TripOverview />
              {/* Decorative Divider */}
              <div className="flex items-center justify-center mt-6 mb-8 md:mt-8 md:mb-16">
                <div className="h-px bg-gradient-to-r from-transparent via-red-400 to-transparent flex-1"></div>
                <div className="mx-2 md:mx-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full p-2 md:p-4 shadow-lg">
                  <Train className="w-6 md:w-8 h-6 md:h-8 text-white" />
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-red-400 to-transparent flex-1"></div>
              </div>

              <div className="main  md:flex mb-16 md:mb-24 ">
                <div className="details w-full md:w-[60%] md:pr-16 ">
                  <h2 className="text-2xl md:text-5xl  text-center md:text-start gradient-text3 font-bold mb-4 md:mb-8">
                    Trip Overview
                  </h2>
                  <p className="text-sm md:text-base text-black">
                    {pkg.overview}
                  </p>
                  <ItineraryComponent plans={pkg.plans} />
                </div>
                <div className="bookform flex-1 hidden md:flex w-full pt-16 ">
                  <div className="">
                    <BookingForm pkg={pkg} />
                  </div>
                </div>
              </div>

              {/* Fixed Book Now Button for phones - stays at bottom of visible screen */}
              <div className="fixed md:hidden bottom-0 left-0 right-0 w-screen z-50">
                <div className="bg-gradient-to-r  from-amber-100 via-amber-50  to-amber-100 py-3 px-8 gap-4 shadow-[0_-6px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-2px_rgba(0,0,0,0.1)] flex">
                  <Whatsapp />
                  <button
                    onClick={() => setbookingOpen(true)}
                    className="w-full bg-gradient-to-r from-orange-500 via-orange-300 to-orange-500 hover:from-orange-600 hover:via-orange-400 hover:to-orange-600 text-white font-semibold py-2 rounded-2xl flex items-center justify-center space-x-2 shadow-lg transition-all duration-300 active:scale-96"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zM8 6V5a2 2 0 114 0v1H8zm2 6a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="poppins text-lg">Book Now</span>
                  </button>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: bookingOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden fixed inset-0 z-[999] pointer-events-none"
                style={{
                  visibility: bookingOpen ? "visible" : "hidden",
                }}
              >
                {/* Background overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: bookingOpen ? 1 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-black/80 pointer-events-auto"
                  onClick={() => setbookingOpen(false)}
                />

                {/* Modal content */}
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: bookingOpen ? "0%" : "100%" }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 150,
                  }}
                  className="absolute bottom-0 left-0 w-full pointer-events-auto"
                >
                  <div className="bg-white rounded-t-2xl overflow-hidden max-h-[95vh] flex items-center justify-center overflow-y-auto">
                    <button
                      onClick={() => setbookingOpen(false)}
                      className="text-gray-500 absolute top-2 right-2 bg-amber-800/10 hover:text-gray-800 rounded-full p-2 z-10"
                    >
                      <X size={20} />
                    </button>
                    <BookingFormPh pkg={pkg} />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Page;

import { AlertTriangle } from "lucide-react";

const BookingForm = ({ pkg }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    persons: "1",
    message: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "Please enter your full name";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Please enter your email address";
        } else if (!value.includes("@")) {
          error =
            "Please include an '@' in the email address. '" +
            value +
            "' is missing an '@'.";
        } else if (
          !value.includes(".") ||
          value.indexOf("@") > value.lastIndexOf(".")
        ) {
          error = "Please enter a valid email address";
        }
        break;
      case "phone":
        if (!value.trim()) {
          error = "Please enter your phone number";
        } else if (!/^\d+$/.test(value)) {
          error = "Phone number should contain only numbers";
        } else if (value.length !== 10) {
          error = "Phone number must be exactly 10 digits";
        }
        break;
      case "persons":
        if (!value || parseInt(value) < 1) {
          error = "Please select at least 1 person";
        }
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    // Validate all fields
    const errors = {};
    Object.keys(formData).forEach((field) => {
      if (field !== "message") {
        // message is optional
        const error = validateField(field, formData[field]);
        if (error) {
          errors[field] = error;
        }
      }
    });

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        // Create the booking object in the same format as your schema
        const bookingData = {
          route: pkg.route,
          days: parseInt(pkg.ds, 10) || 0,
          nights: parseInt(pkg.ns, 10) || 0,
          title: pkg.title,
          price: pkg.price,
          fullName: formData.fullName,
          emailAddress: formData.email,
          phoneNumber: formData.phone,
          numberOfPeople: parseInt(formData.persons, 10), // convert to number
          additionalMessages: formData.message,
          status: "pending",
        };

        // Send to API
        const res = await fetch("/api/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        });

        if (!res.ok) {
          throw new Error("Failed to create booking");
        }

        const result = await res.json();
        console.log("Booking created:", result);

        toast("Booking Completed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        // ✅ Step 3: Send the email notification and log the outcome
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "booking", data: bookingData }),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.success) {
              console.log("✅ Booking email notification sent successfully.");
            } else {
              console.error(
                "Email notification failed:",
                result.error || "Unknown API error"
              );
            }
          })
          .catch((error) => {
            // Log network error but don't bother the user, their booking is safe.
            console.error("Email notification network error:", error);
          });

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          persons: "1",
          message: "",
        });
      } catch (error) {
        console.error("Error submitting booking:", error);
        alert(
          `Something went wrong while submitting your booking. Please try again. error is - ${error}`
        );
      }
    }
  };

  const ValidationMessage = ({ error }) => {
    if (!error) return null;

    return (
      <div className="flex items-start gap-2 mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
        <span className="text-sm text-orange-700">{error}</span>
      </div>
    );
  };

  return (
    <div className="">
      <div className="bg-white rounded-3xl border-1 border-amber-800/20 shadow-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          {pkg?.title}
        </h1>

        {/* Price Display */}
        <div className="text-center mb-8">
          <span className="text-3xl font-bold text-gray-800">
            ₹{pkg?.price}/-
          </span>
          <p className="text-sm text-gray-600 mt-1">per person</p>
        </div>

        {/* Booking Form */}
        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name *"
              className={`w-full px-4 py-4 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-200 ${
                validationErrors.fullName
                  ? "border-orange-400 focus:ring-2 focus:ring-orange-300"
                  : "border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              }`}
            />
            <ValidationMessage error={validationErrors.fullName} />
          </div>

          {/* Email Address */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address *"
              className={`w-full px-4 py-4 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-200 ${
                validationErrors.email
                  ? "border-orange-400 focus:ring-2 focus:ring-orange-300"
                  : "border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              }`}
            />
            <ValidationMessage error={validationErrors.email} />
          </div>

          {/* Phone Number */}
          <div>
            <div className="flex gap-2">
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 text-gray-800 font-medium">
                +91
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number *"
                className={`flex-1 px-4 py-4 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-200 ${
                  validationErrors.phone
                    ? "border-orange-400 focus:ring-2 focus:ring-orange-300"
                    : "border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                }`}
              />
            </div>
            <ValidationMessage error={validationErrors.phone} />
          </div>

          {/* Number of Persons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Persons *
            </label>
            <input
              type="number"
              name="persons"
              value={formData.persons}
              onChange={handleInputChange}
              min="1"
              className={`w-full px-4 py-4 bg-gray-50 border rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-200 ${
                validationErrors.persons
                  ? "border-orange-400 focus:ring-2 focus:ring-orange-300"
                  : "border-gray-200 focus:ring-2 focus:ring-blue-300 focus:border-transparent"
              }`}
            />
            <ValidationMessage error={validationErrors.persons} />
          </div>

          {/* Additional Message */}
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Additional messages or Requirments..."
              rows={4}
              className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>

          {/* Book Now Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-orange-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Book Now
          </button>
        </div>

        {/* Required Fields Note */}
        <p className="text-xs text-gray-500 text-center mt-4">
          * All fields are required except Additional Message
        </p>

        {/* Quick Response Guarantee */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-sm text-green-700 text-center">
            <span className="font-semibold text-green-800">
              Quick Response Guarantee:
            </span>{" "}
            We typically respond to all inquiries within 2 hours during business
            hours!
          </p>
        </div>
      </div>
    </div>
  );
};

const BookingFormPh = ({ pkg = { title: "Title not found", price: "0" } }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    persons: "1",
    message: "",
  });

  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For phone number, only allow numbers and limit to 10 digits
    if (name === "phone") {
      const numbersOnly = value.replace(/\D/g, "");
      if (numbersOnly.length <= 10) {
        setFormData((prev) => ({
          ...prev,
          [name]: numbersOnly,
        }));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateAndSubmit = async () => {
    // Check all required fields
    const requiredFields = ["fullName", "email", "phone", "persons"];
    let firstInvalidField = null;

    for (const field of requiredFields) {
      const value = formData[field];
      let isValid = true;
      let message = "";

      switch (field) {
        case "fullName":
          if (!value.trim()) {
            isValid = false;
            message = "Please enter your full name";
          }
          break;
        case "email":
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value.trim()) {
            isValid = false;
            message = "Please enter your email address";
          } else if (!emailRegex.test(value)) {
            isValid = false;
            message = "Please enter a valid email address";
          }
          break;
        case "phone":
          if (!value.trim()) {
            isValid = false;
            message = "Please enter your phone number";
          } else if (!/^\d{10}$/.test(value)) {
            isValid = false;
            message = "Please enter a valid 10-digit phone number";
          }
          break;
        case "persons":
          if (!value || parseInt(value) < 1) {
            isValid = false;
            message = "Please select at least 1 person";
          }
          break;
      }

      if (!isValid) {
        // Find the input element within this specific form only
        const input = formRef.current?.querySelector(`[name="${field}"]`);
        if (input) {
          input.setCustomValidity(message);
          if (!firstInvalidField) {
            firstInvalidField = input;
          }
        }
      } else {
        // Clear any previous custom validity for this form's input
        const input = formRef.current?.querySelector(`[name="${field}"]`);
        if (input) {
          input.setCustomValidity("");
        }
      }
    }

    if (firstInvalidField) {
      firstInvalidField.reportValidity();
      firstInvalidField.focus();
      return;
    }

    // Build booking object
    const bookingData = {
      route: pkg.route,
      days: parseInt(pkg.ds, 10) || 0,
      nights: parseInt(pkg.ns, 10) || 0,
      title: pkg.title,
      price: pkg.price,
      fullName: formData.fullName,
      emailAddress: formData.email,
      phoneNumber: formData.phone,
      numberOfPeople: parseInt(formData.persons, 10) || 1,
      additionalMessages: formData.message,
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error("Failed to create booking");

      const createdBooking = await res.json();
      console.log("✅ Booking created:", createdBooking);

      toast("Booking Completed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      // ✅ Step 3: Send the email notification and log the outcome
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "booking", data: bookingData }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            console.log("✅ Booking email notification sent successfully.");
          } else {
            console.error(
              "Email notification failed:",
              result.error || "Unknown API error"
            );
          }
        })
        .catch((error) => {
          // Log network error but don't bother the user, their booking is safe.
          console.error("Email notification network error:", error);
        });

      // Reset form after success
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        persons: "1",
        message: "",
      });
    } catch (error) {
      console.error("❌ Booking failed:", error);
      alert("Failed to submit booking. Please try again.");
    }
  };

  const handleInputFocus = (e) => {
    // Clear custom validity when user starts interacting with the field
    e.target.setCustomValidity("");
  };

  return (
    <div className="">
      <div
        ref={formRef}
        className="bg-white  border-amber-800/20 shadow-2xl px-4 pt-8 w-full max-w-lg pb-6"
      >
        <h1 className="text-[22px] font-bold  mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
          {pkg?.title}
        </h1>

        {/* Price Display */}
        <div className="text-center flex gap-2 items-center mb-6">
          <span className="text-2xl font-bold text-gray-800">
            ₹{pkg?.price}/-
          </span>
          <p className="text-sm text-gray-600">per person</p>
        </div>

        {/* Booking Form */}
        <div className="space-y-4 text-sm">
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="Full Name *"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Email Address */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="Email Address *"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Phone Number */}
          <div>
            <div className="flex gap-2">
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium">
                +91
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                placeholder="Phone Number *"
                required
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Number of Persons */}
          <div>
            <input
              type="number"
              name="persons"
              value={formData.persons}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder="Persons *"
              min="1"
              required
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Additional Message */}
          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Additional messages or Requirments..."
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>

          {/* Book Now Button */}
          <button
            type="button"
            onClick={validateAndSubmit}
            className="w-full bg-gradient-to-r from-orange-500 via-orange-300 to-orange-500 hover:from-orange-600 hover:via-orange-400 hover:to-orange-600 text-white py-3 px-6 rounded-xl font-semibold text-lg  transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
          >
            Book Now
          </button>
        </div>

        {/* <p className="text-xs text-gray-500 text-center mt-4">
          * All fields are required except Additional Message
        </p>

        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-sm text-green-700 text-center">
            <span className="font-semibold text-green-800">
              Quick Response Guarantee:
            </span>{" "}
            We typically respond to all inquiries within 2 hours during business
            hours!
          </p>
        </div> */}
      </div>
    </div>
  );
};

const PlacesSlide = ({ places }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const goToSlide = (index) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  };

  const handlePrevClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        centeredSlides={false}
        grabCursor={true}
        loop={true}
        slidesPerView="auto"
        spaceBetween={20}
        allowTouchMove={true} // Ensure touch/drag is enabled
        // Autoplay
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        // Event handlers
        onSwiper={setSwiperInstance}
        onSlideChange={handleSlideChange}
        className="swiper-container  w-full mb-4 md:mb-8 mx-auto "
      >
        {places.map((place, i) => (
          <SwiperSlide key={place.name} className="!w-auto">
            <div className="relative w-70 h-45 md:h-70 md:w-100">
              <Image
                src={place.img} // 👈 use image from object
                alt={place.name} // 👈 better alt text
                fill
                className="object-cover rounded-xl md:rounded-2xl border-2 border-amber-800/30"
                priority={i === 0}
              />
              <div className="absolute h-full w-full bg-linear bg-gradient-to-t from-black/20 to-transparent rounded-xl md:rounded-2xl"></div>

              <div className="absolute text-s text-center z-2 right-1/2 translate-x-1/2 bottom-1 md:bottom-2 text-white text-2xl md:text-3xl poppins font-bold pb-1  gradient-text4">
                {place.name}
              </div>
              <div className="absolute text-s text-center z-1 right-1/2 translate-x-1/2 bottom-1 md:bottom-2 text-white text-2xl md:text-3xl poppins font-bold pb-1  gradient-text4 text-shadow-lg">
                {place.name}
              </div>
              <div className="absolute text-s text-center  right-1/2 translate-x-1/2 bottom-1 md:bottom-2 text-white text-2xl md:text-3xl poppins font-bold pb-1  gradient-text4 text-shadow-lg">
                {place.name}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Fixed Navigation Container */}
      <div className="flex items-center justify-center gap-4 md:gap-8  relative z-50">
        {/* Left Button - Fixed */}
        <button
          onClick={handlePrevClick}
          className="custom-prev cursor-pointer w-10 md:w-14 h-10 md:h-14 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-red-500 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg relative z-10 hover:rotate-3 hover:shadow-2xl hover:shadow-purple-500 border-2 border-white/40"
          type="button"
        >
          <ChevronLeft className="text-white w-4 h-4 md:w-6 md:h-6 pointer-events-none" />
        </button>

        {/* Custom Pagination Dots - Fixed */}
        <div className="flex items-center justify-center gap-1 md:gap-2 relative z-10">
          {places.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              type="button"
              className={`transition-all duration-300 cursor-pointer relative z-10 ${
                activeIndex === index
                  ? "w-8 h-3 md:w-12 md:h-4 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full"
                  : "w-3 h-3 md:w-4 md:h-4 bg-gray-300 hover:bg-gray-400 rounded-full"
              }`}
            />
          ))}
        </div>

        {/* Right Button - Fixed */}
        <button
          onClick={handleNextClick}
          className="custom-next cursor-pointer w-10 md:w-14 h-10 md:h-14 rounded-full bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg relative z-10  hover:rotate-[-3deg] hover:shadow-2xl hover:shadow-blue-500 border-2 border-white/70"
          type="button"
        >
          <ChevronRight className="text-white w-4 h-4 md:w-6 md:h-6 pointer-events-none" />
        </button>
      </div>
    </>
  );
};

const TripOverview = () => {
  return (
    <div className="min-h-screen py-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-5xl font-bold text-red-500 mb-8 md:mb-12 text-center">
          Package Inclusions
        </h1>

        {/* Icons Section */}
        <div className="flex justify-center items-start gap-6 md:gap-12 mb-8 md:mb-12">
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-full p-3 md:p-6 shadow-lg mb-2 md:mb-4 transition-all transform hover:scale-105 border-2 border-amber-800/20">
              <Car className="w-6 h-6 md:w-10 md:h-10 text-gray-800" />
            </div>
            <span className="text-lg md:text-xl font-semibold text-gray-800">
              Transfer
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white rounded-full p-3 md:p-6 shadow-lg mb-2 md:mb-4 transition-all transform hover:scale-105 border-2 border-amber-800/20">
              <Hotel className="w-6 h-6 md:w-10 md:h-10 text-gray-800" />
            </div>
            <span className="text-lg md:text-xl font-semibold text-gray-800">
              Hotel
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white rounded-full p-3 md:p-6 shadow-lg mb-2 md:mb-4 transition-all transform hover:scale-105 border-2 border-amber-800/20">
              <MapPin className="w-6 h-6 md:w-10 md:h-10 text-red-500" />
            </div>
            <span className="text-lg md:text-xl font-semibold text-gray-800">
              Activities
            </span>
            <span className="text-sm text-gray-600 mt-1">(Extra Cost)</span>
          </div>
        </div>

        {/* Trip Overview Section */}
        <div className="text-center mb-6 md:mb-12">
          <div className="bg-white border-2 border-amber-800/10 rounded-xl shadow-lg p-4 md:p-8 max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-red-100 rounded-full p-2 md:p-4 mt-1">
                    <Car className="w-4 h-4 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium md:font-semibold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">
                      Local Transportation
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Airport/station transfers and local sightseeing
                      transportation included in package
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-red-100 rounded-full p-2 md:p-4 mt-1">
                    <Hotel className="w-4 h-4 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium md:font-semibold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">
                      Accommodation
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Comfortable hotel stays with quality amenities throughout
                      your journey
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-orange-100 rounded-full p-2 md:p-4 mt-1">
                    <MapPin className="w-4 h-4 md:w-6 md:h-6 text-orange-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium md:font-semibold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">
                      Additional Activities
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Optional experiences and activities available at extra
                      cost to enhance your trip
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-blue-100 rounded-full p-2 md:p-4 mt-1">
                    <Train className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium md:font-semibold text-gray-800 mb-1 md:mb-2 text-sm md:text-base">
                      Journey to Package Start
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Train travel from your home location to the package
                      starting point (arranged separately)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-8 p-3 md:p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-red-500">
              <p className="text-gray-700 text-xs md:text-sm">
                <strong>Note:</strong> Train journey to reach the package
                destination and any additional activities are not included in
                the base package price and need to be arranged separately.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-xl p-4 md:p-6 text-white text-center transition-all transform hover:scale-105">
            <Car className="w-6 md:w-10 h-6 md:h-10 mx-auto mb-2 md:mb-3" />
            <h3 className="font-semibold mb-1 md:mb-2">Transfers Included</h3>
            <p className="text-sm opacity-90">
              Airport/railway station pickup and drop-off
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 md:p-6 text-white text-center transition-all transform hover:scale-105">
            <Hotel className="w-6 md:w-10 h-6 md:h-10 mx-auto mb-2 md:mb-3" />
            <h3 className="font-semibold mb-1 md:mb-2">Quality Stay</h3>
            <p className="text-sm opacity-90">
              Comfortable accommodations with modern amenities
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-4 md:p-6 text-white text-center transition-all transform hover:scale-105">
            <MapPin className="w-6 md:w-10 h-6 md:h-10 mx-auto mb-2 md:mb-3" />
            <h3 className="font-semibold mb-1 md:mb-2">Flexible Activities</h3>
            <p className="text-sm opacity-90">
              Choose additional experiences based on your interests
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItineraryComponent = ({ plans }) => {
  const [openDay, setOpenDay] = useState(null);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 pb-12 md:pb-16 overflow-y-hidden shadow-xl my-8 md:my-16">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ amount: 0.1, once: true }}
        transition={{
          default: { type: "tween", duration: 0.4, delay: 0.1 },
        }}
        className="mt-2"
      >
        <h2 className="text-xl md:text-4xl font-bold text-center text-gray-800 mb-3 md:mb-4">
          Travel Itinerary
        </h2>
        <p className="text-gray-600 text-center mb-8 md:mb-12 text-base md:text-lg max-w-3xl mx-auto px-2">
          Your complete day-by-day journey guide. Click on any day to see
          detailed plans.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
        {plans.map((obj, index) => (
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
            className="border border-gray-200 rounded-xl md:rounded-2xl overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setOpenDay(openDay === index ? null : index)}
              className="w-full px-4 py-4 md:px-6 md:py-5 text-left flex items-start justify-between bg-gray-50 hover:bg-gray-100 transition-colors gap-3 md:gap-4"
            >
              <div className="flex items-start space-x-3 md:space-x-4 flex-1 min-w-0">
                <span className="bg-green-400 text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0 mt-0.5 md:mt-0">
                  Day {index + 1}
                </span>
                <span className="text-base md:text-lg font-semibold text-gray-800 break-words leading-snug">
                  {obj.title}
                </span>
              </div>
              <motion.div
                animate={{ rotate: openDay === index ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex-shrink-0 mt-1 md:mt-0.5"
              >
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
              </motion.div>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: openDay === index ? "auto" : 0,
                opacity: openDay === index ? 1 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                opacity: { delay: openDay === index ? 0.15 : 0 },
              }}
              className="overflow-hidden bg-white"
            >
              <motion.div
                initial={false}
                animate={{
                  y: openDay === index ? 0 : -10,
                  opacity: openDay === index ? 1 : 0,
                }}
                transition={{
                  duration: 0.25,
                  delay: openDay === index ? 0.1 : 0,
                  ease: "easeOut",
                }}
                className="px-4 py-4 md:px-6 md:py-5"
              >
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {obj.plan}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
