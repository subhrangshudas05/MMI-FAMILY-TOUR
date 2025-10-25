"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Package,
  Gift,
  Star,
  MapPin,
  Users,
  Map,
  Menu,
  MessageCircleIcon,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Bookingsection from "@/AdminComponents/Bookingsection";
import Allpackages from "@/AdminComponents/Allpackages";
import OfferPkg from "@/AdminComponents/OfferPkg";
import Populars from "@/AdminComponents/Populars";
import AroundIndia from "@/AdminComponents/AroundIndia";
import AllPlaces from "@/AdminComponents/AllPlaces";
import ReferralManager from "@/AdminComponents/Referral";
import MessagesViewer from "@/AdminComponents/Messages";
import ReviewSection from "@/AdminComponents/ReviewSection";

// Import admin components (you'll create these in @/admincomponent/)
const BookingSection = ({ isActive }) => {
  if (!isActive) return null;

  return <Bookingsection />;
};

const AllPackagesSection = ({ isActive }) => {
  if (!isActive) return null;

  return <Allpackages />;
};

const OfferPackageSection = ({ isActive }) => {
  if (!isActive) return null;

  return <OfferPkg />;
};

const PopularsSection = ({ isActive }) => {
  if (!isActive) return null;

  return <Populars />;
};

const AroundIndiaSection = ({ isActive }) => {
  if (!isActive) return null;

  return <AroundIndia />;
};

const ReferralsSection = ({ isActive }) => {
  if (!isActive) return null;

  return <ReferralManager />;
};

const MessageSection = ({ isActive }) => {
  if (!isActive) return null;

  return <MessagesViewer />;
};

const ReviewssSection = ({ isActive }) => {
  if (!isActive) return null;

  return <ReviewSection />;
};

const AllPlacesSection = ({ isActive }) => {
  if (!isActive) return null;

  return <AllPlaces />;
};

const TravelAdminDashboard = () => {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [hidden, setHidden] = useState(false);

  const checkIfAtTop = () => {
    const currentScrollY = window.scrollY;
    setHidden(currentScrollY > 10);
  };
  useEffect(() => {
    setHidden(false);
  }, []);

  useEffect(() => {
    checkIfAtTop();

    const handleScroll = () => {
      checkIfAtTop();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session, status]);

  const [windowWidth, setWindowWidth] = useState(0); // default 0 for SSR
  const [activeSection, setActiveSection] = useState("booking");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    // Set initial width on mount
    setWindowWidth(window.innerWidth);

    // Listen for resize and update
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sections = [
    { id: "booking", label: "Bookings", icon: Calendar },
    { id: "messages", label: "Messages", icon: MessageCircleIcon },
    { id: "packages", label: "All Packages", icon: Package },
    { id: "offers", label: "Offer Package", icon: Gift },
    { id: "populars", label: "Populars", icon: Star },
    { id: "india", label: "Around India", icon: MapPin },
    { id: "places", label: "All Places", icon: Map },
    { id: "referrals", label: "Referrals", icon: Users },
    { id: "reviews", label: "Reviews", icon: MessageCircleIcon },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case "booking":
        return <BookingSection isActive={true} />;
      case "messages":
        return <MessageSection isActive={true} />;
      case "packages":
        return <AllPackagesSection isActive={true} />;
      case "offers":
        return <OfferPackageSection isActive={true} />;
      case "populars":
        return <PopularsSection isActive={true} />;
      case "india":
        return <AroundIndiaSection isActive={true} />;
      case "referrals":
        return <ReferralsSection isActive={true} />;
      case "places":
        return <AllPlacesSection isActive={true} />;
      case "reviews":
        return <ReviewssSection isActive={true} />;
      default:
        return <BookingSection isActive={true} />;
    }
  };

  if (isAdmin) {
    return (
      <div className="relative min-h-screen pt-15 sm:pt-20 lg:pt-30">
        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-12 left-2 z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="bg-white text-black p-2 rounded-lg shadow-md"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="lg:hidden fixed inset-0 bg-black/60  z-10"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Navigation */}
        <motion.nav
          initial={{ x: -300 }}
          animate={{
            x: isMobileMenuOpen || windowWidth >= 1024 ? 0 : -300,
          }}
          className={`fixed top-0 lg:pt-30 left-0 h-full w-64 bg-white shadow-lg z-50 lg:z-5 lg:translate-x-0 transition-transform duration-300 ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
          ${hidden ? "lg:pt-0" : "lg:pt-30"}
          `}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <button
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <ul className="space-y-2">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <li key={section.id}>
                    <button
                      onClick={() => {
                        setActiveSection(section.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <IconComponent size={20} />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.nav>

        {/* Main Content */}
        <main className="lg:ml-64 overflow-x-clip p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{renderActiveSection()}</div>
        </main>
      </div>
    );
  } else {
    return (
      <div className="text-3xl poppins sm:text-4xl h-screen w-screen text-center p-8 sm:p-16 flex items-center justify-center font-bold text-amber-900 ">
        You are Unauthorised to visit this.
      </div>
    );
  }
};

export default TravelAdminDashboard;
