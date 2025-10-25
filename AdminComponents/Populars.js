"use client";

import { useState, useEffect, useCallback } from "react";
import packageVM from "@/viewmodel/packageVM.js";
import { motion } from "framer-motion";
import GeneralPlaceComponent from "./GeneralPlace.js";
import { toast } from "react-toastify";

const Populars = () => {
  // 1. STATE MANAGEMENT
  const { getPopularDestinationsData } = packageVM();
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // 2. DATA FETCHING
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        console.log("🚀 Fetching initial popular destinations data...");
        const data = await getPopularDestinationsData();
        setDestinations(data || []);
      } catch (error) {
        console.error("❌ Failed to load initial data:", error);
        toast.error("Could not load popular destinations.");
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, [getPopularDestinationsData]);

  // A helper function for making API calls to keep the code DRY
  const makeApiCall = async (method, body) => {
    try {
      const response = await fetch("/api/nav/popular", {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Operation failed: An error occurred`);
        
      }

      return await response.json();
    } catch (err) {
      console.error(`❌ API call with method ${method} failed:`, err);
      toast.error(`Operation failed: ${err.message}`);
      return null;
    }
  };

  // 3. CRUD HANDLERS FOR CATEGORIES
  const handleAddCategory = async (newCategoryData) => {
    // As you noted, a new category starts with an empty items array.
    const payload = { ...newCategoryData, items: [] };
    const createdCategory = await makeApiCall("POST", payload);

    if (createdCategory) {
      setDestinations((prev) => [...prev, createdCategory]);
      toast.success(" Category created successfully!");
    }
  };

  const handleUpdateCategory = async (categoryIndex, categoryUpdateData) => {
    const categoryToUpdate = destinations[categoryIndex];
    if (!categoryToUpdate) return;

    const payload = { id: categoryToUpdate._id, updates: categoryUpdateData };
    const updatedCategory = await makeApiCall("PUT", payload);

    if (updatedCategory) {
      setDestinations((prev) =>
        prev.map((cat) =>
          cat._id === categoryToUpdate._id
            ? { ...cat, ...categoryUpdateData }
            : cat
        )
      );
      toast.success(" Category updated successfully!");
    }
  };

  const handleDeleteCategory = async (categoryIndex) => {
    const categoryToDelete = destinations[categoryIndex];
    if (!categoryToDelete) return;

    const payload = { id: categoryToDelete._id };
    const result = await makeApiCall("DELETE", payload);

    if (result) {
      setDestinations((prev) =>
        prev.filter((cat) => cat._id !== categoryToDelete._id)
      );
      toast.success(" Category deleted successfully!");
    }
  };

  // 4. CRUD HANDLERS FOR ITEMS (Implemented as Category Updates)
  const handleAddItem = async (categoryIndex, newItemData) => {
    const categoryToUpdate = destinations[categoryIndex];
    if (!categoryToUpdate) return;

    const updatedItems = [...categoryToUpdate.items, newItemData];
    const payload = {
      id: categoryToUpdate._id,
      updates: { items: updatedItems },
    };

    const result = await makeApiCall("PUT", payload);

    if (result) {
      setDestinations((prev) =>
        prev.map((cat) =>
          cat._id === categoryToUpdate._id
            ? { ...cat, items: updatedItems }
            : cat
        )
      );
      toast.success(" Item added successfully!");
    }
  };

  const handleUpdateItem = async (
    categoryIndex,
    itemIndex,
    updatedItemData
  ) => {
    const categoryToUpdate = destinations[categoryIndex];
    if (!categoryToUpdate) return;

    const updatedItems = categoryToUpdate.items.map((item, index) =>
      index === itemIndex ? updatedItemData : item
    );

    const payload = {
      id: categoryToUpdate._id,
      updates: { items: updatedItems },
    };
    const result = await makeApiCall("PUT", payload);

    if (result) {
      setDestinations((prev) =>
        prev.map((cat) =>
          cat._id === categoryToUpdate._id
            ? { ...cat, items: updatedItems }
            : cat
        )
      );
      toast.success(" Item updated successfully!");
    }
  };

  const handleDeleteItem = async (categoryIndex, itemIndex) => {
    const categoryToUpdate = destinations[categoryIndex];
    if (!categoryToUpdate) return;

    const updatedItems = categoryToUpdate.items.filter(
      (_, index) => index !== itemIndex
    );

    const payload = {
      id: categoryToUpdate._id,
      updates: { items: updatedItems },
    };
    const result = await makeApiCall("PUT", payload);

    if (result) {
      setDestinations((prev) =>
        prev.map((cat) =>
          cat._id === categoryToUpdate._id
            ? { ...cat, items: updatedItems }
            : cat
        )
      );
      toast.success(" Item deleted successfully!");
    }
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] sm:h-[75vh] w-full flex items-center justify-center">
        <div className="text-center text-gray-600 flex flex-col items-center ">
          <div className="w-12 md:w-18 h-12 md:h-18 border-8 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>

          <h2 className="text-xl font-semibold mt-2">Loading...</h2>
        </div>
      </div>
    ); // Or any loading indicator
  }

  return (
    <GeneralPlaceComponent
    title={"Popular Destinations"}
      data={destinations}
      onAddCategory={handleAddCategory}
      onUpdateCategory={handleUpdateCategory}
      onDeleteCategory={handleDeleteCategory}
      onAddItem={handleAddItem}
      onUpdateItem={handleUpdateItem}
      onDeleteItem={handleDeleteItem}
    />
  );
};

export default Populars;
