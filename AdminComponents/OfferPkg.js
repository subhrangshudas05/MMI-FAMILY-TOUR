import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import packageVM from "@/viewmodel/packageVM";
import Image from "next/image";
import { Search, X, Gift } from "lucide-react";
import OfferPackageEditComponent from "./OfferPkgEdit";
import OfferPackageCreateComponent from "./OfferCreate";
import { toast } from "react-toastify";

const OfferPkg = () => {
  const { getOfferPackages, loadOfferPackages, offerPackages } = packageVM();

  const [offerPkges, setOfferdPkges] = useState([]);
  const [editorOn, setEditorOn] = useState(false);
  const [addOn, setAddOn] = useState(false);
  const [editPackage, seteditPackage] = useState();
  const [loading, setLoading] = useState(true);
  const [packageLoading, setpackageLoading] = useState(false);

  useEffect(() => {
    const loadOffers = async () => {
      setpackageLoading(true);

      try {
        console.log("🚀 Starting to load offer packages...");

        // Load offer packages and get the returned data directly
        const fetchedPackages = await getOfferPackages();

        console.log("📦 Fetched packages:", fetchedPackages);
        console.log("📦 Package count:", fetchedPackages?.length || 0);

        // Set the local state with the returned data
        setOfferdPkges(fetchedPackages || []);

        setpackageLoading(false);
      } catch (error) {
        console.error("❌ Error loading data:", error);
        setpackageLoading(false);
      }
    };

    loadOffers();
  }, []);

  const packageClick = async (route) => {
    let pkg = offerPkges.find((pkg) => pkg.route == route);
    seteditPackage(pkg);
    setEditorOn(true);
  };

  const handleOfferPackageUpdate = async (id, updateData) => {
    try {
      console.log("🔄 Sending offer package update request:", {
        id,
        updates: updateData,
      });

      const response = await fetch(`/api/offer-package`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          updates: updateData,
        }),
      });

      const responseData = await response.json();
      console.log("📡 Update response:", responseData);

      if (response.ok) {
        // ✅ Optimistically update UI
        setOfferdPkges((prevPkges) =>
          prevPkges.map((pkg) =>
            pkg._id === id ? { ...pkg, ...updateData } : pkg
          )
        );
        toast.success(
          `Package "${updateData.title || id}" updated successfully!`
        );
        return true;
      } else {
        console.error("❌ Update failed:", responseData);
        toast.error(
          `Failed to Update offer package: ${responseData.error || responseData.message || "Unknown error"}`
        );

        return false;
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(
        `Failed to Update offer package: ${err.message || "Unknown error"}`
      );
    }
  };

  const handleOfferPackageDelete = async (id) => {
    try {
      console.log("🗑️ Sending delete request for offer package:", id);

      const response = await fetch(`/api/offer-package`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      });

      if (response.ok) {
        // ✅ Remove from state immediately
        setOfferdPkges((prevPkges) =>
          prevPkges.filter((pkg) => pkg._id !== id)
        );

        toast.success(`Package deleted successfully!`);
        return true;
      } else {
        const error = await response.json();
        toast.error(
          `Failed to Delete offer package: ${error.error || "Unknown error"}`
        );

        return false;
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(
        `Failed to Delete offer package: ${err.message || "Unknown error"}`
      );
      return false;
    }
  };

  const handleOfferPackageCreate = async (packageData) => {
    try {
      const response = await fetch("/api/offer-package", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packageData),
      });

      if (response.ok) {
        setOfferdPkges((prevPkges) => [...prevPkges, packageData]);

        toast.success(`Package "${packageData.title}" created successfully!`);
      } else {
        const error = await response.json();
        toast.error(
          `Failed to Create offer package: ${error.error || "Unknown error"}`
        );
      }
    } catch (err) {
      toast.error(
        `Failed to Create offer package: ${err.message || "Unknown error"}`
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">Offer Packages</h2>

      {offerPkges.length != 0 && !packageLoading && (
        <div className="text-base sm:text-lg w-full text-black mt-6 sm:mt-8 mb-8 sm:mb-12 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 ">
            {offerPkges.map((pkg) => (
              <div
                onClick={() => {
                  packageClick(pkg.route);
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
                      <span className="text-gray-500 line-through text-lg md:text-xl font-medium ml-2">
                        ₹{pkg.realPrice}
                      </span>
                    </p>
                  </div>

                  {/* Action Buttons */}

                  <motion.button
                    onClick={() => packageClick(pkg.route)}
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
                    className="px-8 py-3 text-white rounded-2xl font-semibold shadow-lg text-sm sm:text-xl poppins "
                  >
                    View / Edit
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {offerPkges.length === 0 && !packageLoading && (
        <div className="text-base sm:text-lg w-full text-gray-500 mx-10 sm:mx-24 my-20 sm:my-30 ">
          <h2 className="text-lg sm:text-xl font-semibold ">
            No Offer packages found 🙅🏻‍♂️
          </h2>
          <p>👀 Looks like No avaiable Offers now</p>
        </div>
      )}
      {offerPkges.length === 0 && packageLoading && (
        <div className="w-full text-gray-500 mx-10 sm:mx-20 my-20 sm:my-30 ">
          <div className="text-center text-gray-600 flex flex-col items-center ">
            <div className="w-12 md:w-18 h-12 md:h-18 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>

            <h2 className="text-xl font-semibold mt-2">Loading...</h2>
          </div>
        </div>
      )}

      {editorOn && (
        <OfferPackageEditComponent
          pkg={editPackage}
          onClose={() => {
            setEditorOn(false);
            seteditPackage(null);
          }}
          onUpdate={handleOfferPackageUpdate}
          onDelete={handleOfferPackageDelete}
        />
      )}

      <button
        onClick={() => {
          setAddOn(true);
        }}
        className="bg-orange-500 text-white px-6 py-2  rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2 text-lg sm:text-xl font-bold"
      >
        <Gift size={20} />
        <span>Add Offer</span>
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">
          Create special offer packages with monthly deals, taglines, and
          promotional content.
        </p>
      </div>

      {addOn && (
        <OfferPackageCreateComponent
          pkg={editPackage}
          onClose={() => {
            setAddOn(false);
          }}
          handleOfferPackageCreate={handleOfferPackageCreate}
        />
      )}
    </motion.div>
  );
};

export default OfferPkg;
