import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import packageVM from "@/viewmodel/packageVM";
import { getRoutesFromSearch as fetchRoutes } from "@/actions/SearchAction";


const fuzzySearch = (query, items) => {
  if (!query || query.trim() === "") return [];

  const lowerQuery = query.toLowerCase();

  return items
    .filter(
      (item) =>
        item.keyword.toLowerCase().includes(lowerQuery) ||
        lowerQuery
          .split("")
          .every((char) => item.keyword.toLowerCase().includes(char))
    )
    .sort((a, b) => {
      const aIndex = a.keyword.toLowerCase().indexOf(lowerQuery);
      const bIndex = b.keyword.toLowerCase().indexOf(lowerQuery);

      if (aIndex === 0 && bIndex !== 0) return -1;
      if (bIndex === 0 && aIndex !== 0) return 1;
      if (aIndex !== -1 && bIndex === -1) return -1;
      if (bIndex !== -1 && aIndex === -1) return 1;

      return a.keyword.length - b.keyword.length;
    })
    .slice(0, 7);
};

const TravelSearchComponent = ({
  setIsOpen,
  searchQuery = "",
  setSearchQuery,
}) => {
    const { getReferralsList } = packageVM();

  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, []); 
  const [recommendations, setRecommendations] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const getRoutesFromSearch = (query) => {
    const results = fuzzySearch(query, referrals);
    const allRoutes = results.flatMap((item) => item.routes);
    return [...new Set(allRoutes)];
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = fuzzySearch(searchQuery, referrals);
      setRecommendations(results.map((item) => item.keyword));
      setShowRecommendations(true);
    } else {
      setRecommendations([]);
      setShowRecommendations(false);
    }
  }, [searchQuery]);

  const router = useRouter();

  const handlePlaceClick = async (query) => {
    const routes = await fetchRoutes(query);

    if (!Array.isArray(routes) || routes.length === 0) {
      console.log("⚠️ No routes found for", query);
      return;
    }
    router.push(`/packages?place=${query}&routes=${routes.join(",")}`);

    // Clear search after selection
    setSearchQuery(query);
    setShowRecommendations(false);
    setIsOpen(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      handlePlaceClick(searchQuery);
    }
  };

  const handleCancel = () => {
    setSearchQuery("");
    setRecommendations([]);
    setShowRecommendations(false);
    setIsSearchFocused(false);
    setIsOpen(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    // <div className="min-h-screen w-[75vw] bg-gradient-to-br from-blue-400 via-teal-500 to-green-400 flex items-center justify-center p-4">
    <motion.div className="w-full min-h-screen mx-auto relative text-sm poppins">
      {/* Main Search Container */}
      <div className=" rounded-2xl shadow-2xl p-8 backdrop-blur-md bg-white/10">
        {/* Search Bar */}
        <div className="relative">
          <div className="flex items-center bg-gray-100 rounded-full p-4 mb-6">
            <Search className="text-gray-500 mr-3" size={20} />
            <input
              type="text"
              placeholder="Search for cities, or packages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
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

          {/* Recommendations Dropdown */}
          <AnimatePresence>
            {showRecommendations && recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-[105%] left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-45 overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-200"
              >
                {recommendations.map((place, index) => (
                  <motion.button
                    key={`${place}-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handlePlaceClick(place)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <div className="flex items-center">
                      <Search className="mr-3 text-gray-400" size={16} />
                      {place}
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No Results Message */}
          <AnimatePresence>
            {showRecommendations &&
              recommendations.length === 0 &&
              searchQuery.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[105%] left-0 right-0 bg-white rounded-xl shadow-lg border border-gray-200 z-50 p-4 mb-6"
                >
                  <div className="text-gray-500 text-center py-2">
                    No results found
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        </div>

        {/* Action Buttons with proper spacing */}
        <motion.div
          className="flex justify-end space-x-4"
          initial={{ marginTop: "20px" }}
          animate={{
            marginTop: showRecommendations
              ? recommendations.length === 0
                ? "100px"
                : "200px"
              : "20px",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCancel}
            className="px-8 py-3 text-gray-600 bg-gray-200 rounded-xl hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
          </motion.button>

          <motion.button
            onClick={handleSearch}
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
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl hover:from-green-600 hover:to-teal-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all font-medium shadow-lg"
          >
            View Packages
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
    // </div>
  );
};
export default TravelSearchComponent;
