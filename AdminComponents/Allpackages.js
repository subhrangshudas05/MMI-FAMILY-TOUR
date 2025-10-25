import React, { useState } from "react";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { toast } from "react-toastify";
import Image from "next/image";

import SearchPackages from "./Searchbar";
import PackageCreateComponent from "./PkgCreate";
import PackageEditComponent from "./PkgEdit";

const Allpackages = () => {
  const [newlyAdded, setNewlyAdded] = useState([]);
  const [addOn, setAddOn] = useState(false);
  const [editorOn, setEditorOn] = useState(false);
  const [editPackage, setEditPackage] = useState(null);

  const addPackage = (newPackage) => {
    const isDuplicate = newlyAdded.some((pkg) => pkg._id === newPackage._id);
    if (isDuplicate) {
      toast.error(`Package "${newPackage.title}" already exists in the list.`);
      return;
    }
    setNewlyAdded((prev) => [...prev, newPackage]);
    toast.success(`Package "${newPackage.title}" is ready for review.`);
  };

  const handlePackageClick = (route) => {
    const pkg = newlyAdded.find((p) => p.route === route);
    if (pkg) {
      setEditPackage(pkg);
      setEditorOn(true);
    }
  };

  const handlePackageUpdate = async (id, updateData) => {
    // Validate ID exists - check for both _id and id fields
    const packageId = id || updateData?._id || updateData?.id;
    if (!packageId) {
      toast.error(
        "Cannot update package: This package hasn't been saved to the database yet. Please create it first."
      );
      return false;
    }

    try {
      const response = await fetch(`/api/packages`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: packageId, updates: updateData }),
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        toast.error("Invalid response from server");
        return false;
      }

      if (response.ok) {
        // Handle both response formats: {success: true, data: pkg} or direct package object
        const updatedPackageFromServer = responseData.data || responseData;

        // Validate we got a package object
        if (!updatedPackageFromServer || !updatedPackageFromServer._id) {
          toast.error("Update failed: Invalid response from server");
          return false;
        }

        setNewlyAdded((prevPkges) =>
          prevPkges.map((pkg) =>
            pkg._id === packageId || pkg.id === packageId
              ? updatedPackageFromServer
              : pkg
          )
        );

        if (
          editPackage &&
          (editPackage._id === packageId || editPackage.id === packageId)
        ) {
          setEditPackage(updatedPackageFromServer);
        }

        toast.success(
          `Package "${updatedPackageFromServer.title}" updated successfully!`
        );
        return true;
      } else {
        toast.error(`Update failed: ${responseData?.error || "Unknown error"}`);
        return false;
      }
    } catch (err) {
      console.error("Update request error:", err);
      toast.error(`Update request failed: ${err.message}`);
      return false;
    }
  };

  // ✅ FIXED: Enhanced error handling and response validation
  const handlePackageDelete = async (id) => {
    // Validate ID exists
    if (!id) {
      toast.error("Cannot delete package: Missing ID");
      return false;
    }

    try {
      const response = await fetch(`/api/packages`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      // Parse response first
      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        // If response is empty (successful delete), that's okay
        if (response.ok) {
          responseData = { success: true };
        } else {
          toast.error("Invalid response from server");
          return false;
        }
      }

      if (
        response.ok &&
        (responseData.success || responseData.success !== false)
      ) {
        // Remove from state
        setNewlyAdded((prevPkges) => prevPkges.filter((pkg) => pkg._id !== id));

        // Close editor if the deleted package was being edited
        if (editPackage && editPackage._id === id) {
          setEditorOn(false);
          setEditPackage(null);
        }

        toast.success("Package deleted successfully!");
        return true;
      } else {
        // Handle both HTTP errors and application-level errors
        const errorMessage =
          responseData?.error || responseData?.message || "Delete failed";
        toast.error(`Delete failed: ${errorMessage}`);
        return false;
      }
    } catch (err) {
      console.error("Delete request error:", err);
      toast.error(`Delete request failed: ${err.message}`);
      return false;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 poppins"
    >
      <h2 className="text-2xl font-bold text-gray-900">Manage Packages</h2>
      <SearchPackages />
      <button
        onClick={() => setAddOn(true)}
        className="bg-green-500 mt-12 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
      >
        <Package size={20} />
        <span className="text-lg sm:text-xl font-bold">Add New Package</span>
      </button>

      <div className="bg-white rounded-lg shadow-md text-black p-6">
        <p className="text-gray-600">
          Use the search bar to find and load existing packages. Click "Add New
          Package" to create one.
        </p>
        <p className="text-base sm:text-lg font-bold mt-2">
          IMPORTANT: After Adding the package COPY the "ROUTE" and CREATE new
          referral on REFERRALS section with "KEYWORD". Package will be found
          with "KEYWORD" on search! AND ROUTE is used to FETCH DETAILS!!! Else
          PACKAGE can't be found .{" "}
        </p>
      </div>

      {newlyAdded.length > 0 ? (
        <div className="w-full text-black mt-12 mb-12">
          <h2 className="text-3xl mb-8 font-semibold">
            Packages in this Session
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {newlyAdded.map((pkg) => (
              <div
                key={pkg._id}
                onClick={() => handlePackageClick(pkg.route)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative w-full aspect-[16/9] cursor-pointer">
                  <Image
                    src={pkg.places?.[0]?.img || "/images/placeholder.png"}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/images/placeholder.png";
                    }}
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
                    onClick={() => handlePackageClick(pkg.route)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg"
                  >
                    View / Edit
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-xl shadow-xl">
          <p className="text-gray-700">
            No packages have been loaded in this session.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Use the search bar above or click "Add New Package" to get started.
          </p>
        </div>
      )}

      {editorOn && editPackage && (
        <PackageEditComponent
          pkg={editPackage}
          onClose={() => setEditorOn(false)}
          onUpdate={handlePackageUpdate}
          onDelete={handlePackageDelete}
        />
      )}

      {addOn && (
        <PackageCreateComponent
          onClose={() => setAddOn(false)}
          addPkges={addPackage}
        />
      )}
    </motion.div>
  );
};

export default Allpackages;
