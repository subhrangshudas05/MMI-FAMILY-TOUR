import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  Trash2,
  Plus,
  X,
  Save,
  Moon,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Image,
  Edit3,
} from "lucide-react";

const PackageEditComponent = ({ pkg, onClose, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({
    route: "",
    title: "",
    overview: "",
    places: [{ name: "", img: "" }],
    plans: [{ title: "", plan: "" }],
    ds: "",
    ns: "",
    price: "",
    extras: [],
  });

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newExtraKey, setNewExtraKey] = useState("");
  const [newExtraValue, setNewExtraValue] = useState("");

  useEffect(() => {
    if (pkg) {
      setFormData({
        route: pkg.route || "",
        title: pkg.title || "",
        overview: pkg.overview || "",
        places:
          pkg.places && pkg.places.length > 0
            ? pkg.places
            : [{ name: "", img: "" }],
        plans:
          pkg.plans && pkg.plans.length > 0
            ? pkg.plans
            : [{ title: "", plan: "" }],
        ds: pkg.ds || "",
        ns: pkg.ns || "",
        price: pkg.price || "",
        extras: pkg.extras
          ? Object.entries(pkg.extras).map(([key, value]) => ({
              key,
              value: String(value),
            }))
          : [],
      });
    }
  }, [pkg]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addArrayItem = (arrayName, template) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], template],
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  const addExtra = () => {
    if (newExtraKey.trim() && newExtraValue.trim()) {
      setFormData((prev) => ({
        ...prev,
        extras: [
          ...prev.extras,
          { key: newExtraKey.trim(), value: newExtraValue.trim() },
        ],
      }));
      setNewExtraKey("");
      setNewExtraValue("");
    }
  };

  const removeExtra = (index) => {
    setFormData((prev) => ({
      ...prev,
      extras: prev.extras.filter((_, i) => i !== index),
    }));
  };

 

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Convert extras array back to object
      const extrasObj = {};
      formData.extras.forEach(({ key, value }) => {
        extrasObj[key] = value;
      });

      const updateData = {
        ...formData,
        extras: extrasObj,
      };

      await onUpdate(pkg._id, updateData);
      setUpdateDialog(false);
      onClose();
    } catch (error) {
      toast.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete(pkg._id);
      setDeleteDialog(false);
      onClose();
    } catch (error) {
      toast.error("Delete failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-999 flex items-center justify-center  p-4 poppins text-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Edit3 className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Edit Package</h2>
              <p className="text-gray-600 text-sm">
                Modify package details and content
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 p-1 rounded-md hover:bg-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FileText size={20} className="mr-2 text-blue-600" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Route
                </label>
                <input
                  type="text"
                  value={formData.route}
                  onChange={(e) => handleInputChange("route", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., kashmir_valley_classic"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Package title"
                />
              </div>
              <div className="flex space-x-4 items-center">
                <div className="flex-1">
                  <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Calendar size={16} className="mr-1" />
                    Days
                  </label>
                  <input
                    type="text"
                    value={formData.ds}
                    onChange={(e) => handleInputChange("ds", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="8"
                  />
                </div>
                <div className="flex-1">
                  <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Moon size={16} className="mr-1" />
                    Nights
                  </label>
                  <input
                    type="text"
                    value={formData.ns}
                    onChange={(e) => handleInputChange("ns", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="7"
                  />
                </div>
              </div>
              <div>
                <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
                  ₹ Price
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="21,999"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overview
              </label>
              <textarea
                value={formData.overview}
                onChange={(e) => handleInputChange("overview", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Package overview and description..."
              />
            </div>
          </section>

          {/* Places Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <MapPin size={20} className="mr-2 text-green-600" />
                Places ({formData.places.length})
              </h3>
              <button
                onClick={() => addArrayItem("places", { name: "", img: "" })}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg flex items-center text-sm font-medium"
              >
                <Plus size={16} className="mr-1" />
                Add Place
              </button>
            </div>
            <div className="space-y-4">
              {formData.places.map((place, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      Place #{index + 1}
                    </span>
                    {formData.places.length > 1 && (
                      <button
                        onClick={() => removeArrayItem("places", index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Place name"
                      value={place.name}
                      onChange={(e) =>
                        handleArrayChange(
                          "places",
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="url"
                      placeholder="Image URL"
                      value={place.img}
                      onChange={(e) =>
                        handleArrayChange(
                          "places",
                          index,
                          "img",
                          e.target.value
                        )
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Plans Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Calendar size={20} className="mr-2 text-purple-600" />
                Itinerary Plans ({formData.plans.length})
              </h3>
              <button
                onClick={() => addArrayItem("plans", { title: "", plan: "" })}
                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg flex items-center text-sm font-medium"
              >
                <Plus size={16} className="mr-1" />
                Add Plan
              </button>
            </div>
            <div className="space-y-4">
              {formData.plans.map((plan, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-medium text-gray-600">
                      Day #{index + 1}
                    </span>
                    {formData.plans.length > 1 && (
                      <button
                        onClick={() => removeArrayItem("plans", index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Day title"
                      value={plan.title}
                      onChange={(e) =>
                        handleArrayChange(
                          "plans",
                          index,
                          "title",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Day plan description"
                      value={plan.plan}
                      onChange={(e) =>
                        handleArrayChange(
                          "plans",
                          index,
                          "plan",
                          e.target.value
                        )
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Extras Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Plus size={20} className="mr-2 text-orange-600" />
                  Extra Fields ({formData.extras.length})
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Add custom key-value pairs for additional package data
                </p>
              </div>
            </div>

            {/* Add new extra field */}
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Add New Field
              </h4>
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Field key (e.g., 'difficulty')"
                  value={newExtraKey}
                  onChange={(e) => setNewExtraKey(e.target.value)}
                  className="flex-1 px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Field value (e.g., 'moderate')"
                  value={newExtraValue}
                  onChange={(e) => setNewExtraValue(e.target.value)}
                  className="flex-1 px-3 py-2 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  onClick={addExtra}
                  disabled={!newExtraKey.trim() || !newExtraValue.trim()}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Add
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Enter key-value pairs like: difficulty → moderate, season →
                winter, etc.
              </p>
            </div>

            {/* Existing extras */}
            {formData.extras.length > 0 && (
              <div className="space-y-3">
                {formData.extras.map((extra, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-3 rounded-lg border flex items-center justify-between"
                  >
                    <div className="flex space-x-3 flex-1">
                      <span className="text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded">
                        {extra.key}
                      </span>
                      <span className="text-sm text-gray-600">→</span>
                      <span className="text-sm text-gray-800">
                        {extra.value}
                      </span>
                    </div>
                    <button
                      onClick={() => removeExtra(index)}
                      className="text-red-500 hover:text-red-700 ml-3"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-2 justify-between items-center rounded-b-2xl">
          <button
            onClick={() => setDeleteDialog(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
          >
            <Trash2 size={20} className="mr-2" />
            Delete Package
          </button>

          <div className="flex space-x-3">
            <button
              onClick={() => setUpdateDialog(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center"
            >
              <Save size={20} className="mr-2" />
              Update Package
            </button>
          </div>
        </div>
      </motion.div>

      {/* Update Dialog */}
      {updateDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-250">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-mx-4 shadow-xl"
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Save className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Update Package
                </h3>
                <p className="text-gray-600">Save changes to this package?</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              All modifications will be saved and updated in the system. $
              {formData.title}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setUpdateDialog(false)}
                disabled={loading}
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Dialog */}
      {deleteDialog && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-250">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-mx-4 shadow-xl"
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <Trash2 className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Package
                </h3>
                <p className="text-gray-600">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete "<strong>{formData.title}</strong>
              "? All package data will be permanently removed.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteDialog(false)}
                disabled={loading}
                className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={
                  loading
                }
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PackageEditComponent;
