"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import packageVM from "@/viewmodel/packageVM";
import { getRoutesFromSearch as fetchRoutes } from "@/actions/SearchAction";
import Image from "next/image";
import PackageEditComponent from "./PkgEdit";
import { toast } from "react-toastify";

const fuzzySearch = (query, items) => {
  if (!query || query.trim() === "") return [];
  const lowerQuery = query.toLowerCase();
  return items
    .filter((item) => item.keyword.toLowerCase().includes(lowerQuery))
    .sort((a, b) => a.keyword.length - b.keyword.length)
    .slice(0, 7);
};

const SearchPackages = () => {
  const {
    getReferralsList,
    packages,
    loadPackagesFromRoutes,
    getPackageByRoute,
  } = packageVM();

  const [startSearch, setStartSearch] = useState(false);
  const [foundPkges, setFoundPkges] = useState([]);
  const [editorOn, setEditorOn] = useState(false);
  const [editPackage, setEditPackage] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [packageLoading, setPackageLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const searchInputRef = useRef(null); // Ref for the input element

  useEffect(() => {
    const loadReferrals = async () => {
      try {
        const data = await getReferralsList();
        setReferrals(data);
      } catch (error) {
        console.error("Failed to load referrals:", error);
      } finally {
        setLoading(false);
      }
    };
    loadReferrals();
  }, [getReferralsList]);

  // ✅ FIX #1: This useEffect syncs the local state `foundPkges` with the central `packages` state.
  // It runs whenever `packages` (from your VM) changes, ensuring the UI always has the latest data.
  useEffect(() => {
    if (packages) {
      setFoundPkges(packages);
    }
  }, [packages]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = fuzzySearch(searchQuery, referrals);
      setRecommendations(results.map((item) => item.keyword));
      setShowRecommendations(true);
    } else {
      setRecommendations([]);
      setShowRecommendations(false);
    }
  }, [searchQuery, referrals]);

  const handlePlaceClick = async (query) => {
    setSearchQuery(query); // Set the search bar text
    setShowRecommendations(false); // Immediately hide recommendations
    if (searchInputRef.current) {
      searchInputRef.current.blur(); // Unfocus the input field
    }

    setStartSearch(true);
    setPackageLoading(true);
    setFoundPkges([]); // Clear previous results immediately

    try {
      const routes = await fetchRoutes(query);
      if (!Array.isArray(routes) || routes.length === 0) {
        console.log("⚠️ No routes found for", query);
        setPackageLoading(false);
        return;
      }
      // This will now trigger the useEffect above to update `foundPkges` correctly.
      await loadPackagesFromRoutes(routes);
    } catch (error) {
      console.error("Error loading packages:", error);
    } finally {
      setPackageLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      setStartSearch(false);
      setFoundPkges([]);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      handlePlaceClick(searchQuery);
    }
  };

  const handleCancel = () => {
    setSearchQuery("");
    setStartSearch(false);
    setFoundPkges([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const packageClick = async (route) => {
    let pkg = foundPkges.find((pkg) => pkg.route == route);
    setEditPackage(pkg);
    setEditorOn(true);
  };

  // No changes needed for update/delete handlers, they are correct.
  const handlePackageUpdate = async (id, updateData) => {
    try {
      const response = await fetch(`/api/packages`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, updates: updateData }),
      });
      const responseData = await response.json();
      if (response.ok) {
        setFoundPkges((prevPkges) =>
          prevPkges.map((pkg) =>
            pkg._id === id ? { ...pkg, ...updateData } : pkg
          )
        );
        toast.success(`Package "${updateData.title}" updated successfully!`);
        return true;
      } else {
        toast.error(
          `Failed to update booking: ${responseData.error || "Unknown error"}`
        );
        return false;
      }
    } catch (err) {
      toast.error(`Update failed: ${err.message}`);
      return false;
    }
  };

  const handlePackageDelete = async (id) => {
    try {
      const response = await fetch(`/api/packages`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      });
      if (response.ok) {
        setFoundPkges((prevPkges) => prevPkges.filter((pkg) => pkg._id !== id));
        toast.success(`Package deleted successfully!`);
        return true;
      } else {
        const error = await response.json();
        toast.error(
          `Failed to delete booking: ${responseData.error || "Unknown error"}`
        );
        return false;
      }
    } catch (err) {
      toast.error(`Delete failed: ${err.message}`);
      return false;
    }
  };

  return (
    <motion.div className="w-full mx-auto relative text-sm sm:text-base poppins">
      <div className="rounded-2xl max-w-2xl shadow-2xl py-8 px-4 sm:px-8 backdrop-blur-md bg-black/25">
        <div className="relative">
          <div className="flex items-center bg-gray-100 rounded-full p-4 mb-6">
            <Search className="text-gray-500 mr-3" size={20} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for cities, or packages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowRecommendations(true)}
              onBlur={() =>
                setTimeout(() => setShowRecommendations(false), 150)
              } // Hide on blur with a small delay
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-gray-400 hover:text-gray-600 ml-2"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <AnimatePresence>
            {showRecommendations && recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 bg-white rounded-xl shadow-lg border z-50 max-h-60 overflow-y-auto"
              >
                {recommendations.map((place, index) => (
                  <button
                    key={`${place}-${index}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handlePlaceClick(place);
                    }} // Use onMouseDown to prevent onBlur from firing first
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 text-gray-700 transition-colors flex items-center"
                  >
                    <Search className="mr-3 text-gray-400" size={16} />
                    {place}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="flex justify-end space-x-4"
          initial={{ marginTop: "20px" }}
          animate={{
            marginTop: showRecommendations
              ? recommendations.length === 0
                ? "20px"
                : "250px"
              : "20px",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCancel}
            className="px-8 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
          >
            View Packages
          </motion.button>
        </motion.div>
      </div>

      {startSearch && (
        <>
          {foundPkges.length > 0 && (
            <div className="text-base sm:text-lg w-full text-black mt-12 mb-12">
              <h2 className="text-3xl mb-8 font-semibold">Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                {foundPkges.map((pkg) => (
                  <div
                    key={pkg.route}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-101 cursor-pointer"
                    onClick={() => packageClick(pkg.route)}
                  >
                    <div className="relative w-full aspect-[16/9]">
                      <Image
                        src={pkg.places[0].img}
                        alt={pkg.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-4 left-4 px-4 py-2 backdrop-blur-sm rounded-full bg-black/20 border border-white/50">
                        <p className="text-white text-sm font-semibold">
                          {pkg.ds} Days / {pkg.ns} Nights
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                        {pkg.title}
                      </h3>
                      <p className="text-lg font-bold text-gray-800 mb-4">
                        Starting from{" "}
                        <span className="text-2xl text-green-600">
                          ₹{pkg.price}
                        </span>
                      </p>
                      <motion.button
                        disabled={!(searchQuery && searchQuery.trim())}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
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
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg"
                      >
                        View / Edit
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {packageLoading && (
            <div className="w-full text-gray-500 text-center my-20">
              <div className="inline-block w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
              <h2 className="text-xl font-semibold mt-4">
                Loading Packages...
              </h2>
            </div>
          )}
          {!packageLoading && foundPkges.length === 0 && (
            <div className="text-base sm:text-lg w-full text-center text-gray-500 my-20">
              <h2 className="text-xl font-semibold">
                No packages found for "{searchQuery}"
              </h2>
              <p>
                Try adjusting your search or browse our popular destinations.
              </p>
            </div>
          )}
        </>
      )}

      {editorOn && (
        <PackageEditComponent
          pkg={editPackage}
          onClose={() => setEditorOn(false)}
          onUpdate={handlePackageUpdate}
          onDelete={handlePackageDelete}
        />
      )}
    </motion.div>
  );
};

export default SearchPackages;
