"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, X, Save, Edit3, MapPin } from "lucide-react";
import Image from "next/image";

const GeneralPlaceComponent = ({
  title,
  data = [], // Renamed to `data` for clarity, this is the single source of truth
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  // UI-related state is still managed here, which is correct.
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  const [showAddCategoryDialog, setShowAddCategoryDialog] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ show: false, type: null, categoryIndex: null, itemIndex: null });

  const [formData, setFormData] = useState({ name: "", image: "", route: "" });
  const [categoryFormData, setCategoryFormData] = useState({ category: "", subtitle: "" });

  const generateRoute = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  };

  const handleAddItem = (categoryIndex) => {
    setSelectedCategoryIndex(categoryIndex);
    setFormData({ name: "", image: "", route: "" });
    setEditingItem(null);
    setShowAddItemDialog(true);
  };

  const handleEditItem = (categoryIndex, itemIndex) => {
    const item = data[categoryIndex].items[itemIndex];
    setSelectedCategoryIndex(categoryIndex);
    setFormData({ name: item.name, image: item.image, route: item.route });
    setEditingItem({ categoryIndex, itemIndex });
    setShowAddItemDialog(true);
  };

  const handleSaveItem = async () => {
    const route = formData.route || generateRoute(formData.name);
    const itemData = { ...formData, route };

    if (editingItem) {
      if (onUpdateItem) {
        await onUpdateItem(editingItem.categoryIndex, editingItem.itemIndex, itemData);
      }
    } else {
      if (onAddItem) {
        await onAddItem(selectedCategoryIndex, itemData);
      }
    }

    setShowAddItemDialog(false);
    setFormData({ name: "", image: "", route: "" });
    setEditingItem(null);
  };

  const handleDeleteItem = async (categoryIndex, itemIndex) => {
    if (onDeleteItem) {
      await onDeleteItem(categoryIndex, itemIndex);
    }
    setDeleteDialog({ show: false, type: null, categoryIndex: null, itemIndex: null });
  };

  const handleAddCategory = () => {
    setCategoryFormData({ category: "", subtitle: "" });
    setEditingCategory(null);
    setShowAddCategoryDialog(true);
  };

  const handleEditCategory = (index) => {
    const category = data[index];
    setCategoryFormData({ category: category.category, subtitle: category.subtitle });
    setEditingCategory(index);
    setShowAddCategoryDialog(true);
  };

  const handleSaveCategory = async () => {
    if (editingCategory !== null) {
      if (onUpdateCategory) {
        await onUpdateCategory(editingCategory, categoryFormData);
      }
    } else {
      if (onAddCategory) {
        await onAddCategory(categoryFormData);
      }
    }

    setShowAddCategoryDialog(false);
    setCategoryFormData({ category: "", subtitle: "" });
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (categoryIndex) => {
    if (onDeleteCategory) {
      await onDeleteCategory(categoryIndex);
    }
    setDeleteDialog({ show: false, type: null, categoryIndex: null, itemIndex: null });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 text-black poppins"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <button
          onClick={handleAddCategory}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors flex items-center"
        >
          <Plus size={24} className="mr-1" />
          Add Category
        </button>
      </div>

      {data.map((categoryData, categoryIndex) => (
        <div key={categoryIndex} className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-4 gap-0">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg sm:text-xl font-semibold text-orange-500">
                  {categoryData.category}
                </h3>
                <button
                  onClick={() => handleEditCategory(categoryIndex)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Edit3 size={16} />
                </button>
              </div>
              <p className="text-gray-600 text-base sm:text-lg">
                {categoryData.subtitle}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 items-end sm:items-center">
              <button
                onClick={() =>
                  setDeleteDialog({
                    show: true,
                    type: "category",
                    categoryIndex,
                    itemIndex: null,
                  })
                }
                className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center w-fit"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={() => handleAddItem(categoryIndex)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
              >
                <Plus size={16} className="mr-1" />
                Add Item
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryData.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="group relative text-center p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                onClick={() =>
                  handleEditItem(categoryIndex, itemIndex)
                }
              >
                <div className="aspect-square w-full mb-2 rounded-md overflow-hidden bg-gray-200 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill // fills the parent container (requires parent to be relative)
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target;
                      target.style.display = "none";
                      target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="w-full h-full hidden items-center justify-center text-gray-400 absolute top-0 left-0">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <p className="font-medium text-base sm:text-lg">{item.name}</p>
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditItem(categoryIndex, itemIndex);
                    }}
                    className="bg-blue-500 text-white p-1 rounded text-xs hover:bg-blue-600"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteDialog({
                        show: true,
                        type: "item",
                        categoryIndex,
                        itemIndex,
                      });
                    }}
                    className="bg-red-500 text-white p-1 rounded text-xs hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Add/Edit Item Dialog */}
      <AnimatePresence>
        {showAddItemDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-250 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="flex justify-between items-center p-6 border-b">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <MapPin className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {editingItem ? "Edit Item" : "Add New Item"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {editingItem
                        ? "Update destination details"
                        : "Add a new destination"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAddItemDialog(false);
                    setFormData({ name: "", image: "", route: "" });
                    setEditingItem(null);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Goa"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Route (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.route}
                    onChange={(e) =>
                      setFormData({ ...formData, route: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Auto-generated from name"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to auto-generate from name
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 p-6 border-t">
                <button
                  onClick={() => {
                    setShowAddItemDialog(false);
                    setEditMode(false);
                    setFormData({ name: "", image: "", route: "" });
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveItem}
                  disabled={!formData.name || !formData.image}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Save size={16} className="mr-1" />
                  {editingItem ? "Update" : "Add"} Item
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add/Edit Category Dialog */}
      <AnimatePresence>
        {showAddCategoryDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-250 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="flex justify-between items-center p-6 border-b">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Plus className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {editingCategory !== null
                        ? "Edit Category"
                        : "Add New Category"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {editingCategory !== null
                        ? "Update category details"
                        : "Create a new destination category"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowAddCategoryDialog(false);
                    setCategoryFormData({ category: "", subtitle: "" });
                    setEditingCategory(null);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Title
                  </label>
                  <input
                    type="text"
                    value={categoryFormData.category}
                    onChange={(e) =>
                      setCategoryFormData({
                        ...categoryFormData,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., MOST POPULAR"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={categoryFormData.subtitle}
                    onChange={(e) =>
                      setCategoryFormData({
                        ...categoryFormData,
                        subtitle: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., The Icons You Can't Miss"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 p-6 border-t">
                <button
                  onClick={() => {
                    setShowAddCategoryDialog(false);
                    setCategoryFormData({ category: "", subtitle: "" });
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCategory}
                  disabled={
                    !categoryFormData.category || !categoryFormData.subtitle
                  }
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Save size={16} className="mr-1" />
                  {editingCategory !== null ? "Update" : "Add"} Category
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Dialog */}
      <AnimatePresence>
        {deleteDialog.show && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-250">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
            >
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <Trash2 className="text-red-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Delete{" "}
                    {deleteDialog.type === "category" ? "Category" : "Item"}
                  </h3>
                  <p className="text-gray-600">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this {deleteDialog.type}?
                {deleteDialog.type === "category" &&
                  " All items in this category will also be deleted."}
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() =>
                    setDeleteDialog({
                      show: false,
                      type: null,
                      categoryIndex: null,
                      itemIndex: null,
                    })
                  }
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (deleteDialog.type === "category") {
                      handleDeleteCategory(deleteDialog.categoryIndex);
                    } else {
                      handleDeleteItem(
                        deleteDialog.categoryIndex,
                        deleteDialog.itemIndex
                      );
                    }
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GeneralPlaceComponent;
