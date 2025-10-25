"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit3, Trash2, AlertTriangle, X, Save } from "lucide-react";
import { toast } from "react-toastify";

const ReferralManager = () => {
  const [sessionReferrals, setSessionReferrals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReferral, setEditingReferral] = useState(null);
  const [formData, setFormData] = useState({ keyword: "", routes: "" });
  const [deleteDialog, setDeleteDialog] = useState({
    show: false,
    referral: null,
  });

  // --- API Call Helper ---
  const makeApiCall = async (method, body) => {
    try {
      const response = await fetch("/api/referrals", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Operation failed: An error occurred`);
      }
      return await response.json();
    } catch (err) {
      console.error(`API call failed:`, err);

      toast.error(`Operation failed: ${err.message}`);
      return null;
    }
  };

  // --- UI Handlers ---
  const handleOpenModal = (referral = null) => {
    if (referral) {
      setEditingReferral(referral);
      setFormData({
        keyword: referral.keyword,
        routes: referral.routes.join(", "),
      });
    } else {
      setEditingReferral(null);
      setFormData({ keyword: "", routes: "" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReferral(null);
  };

  // --- CRUD Operations ---
  const handleSave = async () => {
    const routesArray = formData.routes
      .split(",")
      .map((route) => route.trim())
      .filter(Boolean);
    if (!formData.keyword || routesArray.length === 0) {
      toast.error(`Keyword and atleast one Route is required`);
      return;
    }

    const payload = {
      keyword: formData.keyword.toLowerCase(),
      routes: routesArray,
    };

    if (editingReferral) {
      const result = await makeApiCall("PUT", {
        id: editingReferral._id,
        updates: payload,
      });
      if (result) {
        setSessionReferrals((prev) =>
          prev.map((r) =>
            r._id === editingReferral._id
              ? { ...r, ...payload, status: "Updated" }
              : r
          )
        );
        toast.success(`Referral updated successfully!`);
      }
    } else {
      const result = await makeApiCall("POST", payload);
      if (result) {
        setSessionReferrals((prev) => [
          ...prev,
          { ...result, status: "Added" },
        ]);
        toast.success(`Referral created successfully!`);
      }
    }
    handleCloseModal();
  };

  const confirmDelete = async () => {
    if (!deleteDialog.referral) return;

    const result = await makeApiCall("DELETE", {
      id: deleteDialog.referral._id,
    });
    if (result) {
      setSessionReferrals((prev) =>
        prev.map((r) =>
          r._id === deleteDialog.referral._id ? { ...r, status: "Deleted" } : r
        )
      );
      toast.success(`Referral deleted successfully!`);
    }
    setDeleteDialog({ show: false, referral: null });
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen text-black poppins">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Referrals</h1>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-200"
          >
            <Plus size={20} />
            Add Referral
          </button>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-r-lg mb-8 flex items-start gap-4">
          <div className="flex-shrink-0 pt-1 text-yellow-600">
            <AlertTriangle />
          </div>
          <div>
            <h2 className="font-bold text-lg">How This Feature Works</h2>
            <p className="mt-1">
              This section powers the website's search engine by linking search{" "}
              <strong className="font-semibold">keywords</strong> to{" "}
              <strong className="font-semibold">package routes</strong>.
            </p>
            <p className="text-sm mt-2">
              <strong className="font-semibold">Important:</strong> This page
              only shows activity from your current session. The list will be
              empty on page reload.
            </p>
          </div>
        </div>

        <AnimatePresence>
          {sessionReferrals.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white p-6 rounded-xl shadow-lg space-y-3"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Session Activity
              </h3>
              {sessionReferrals.map((ref) => (
                <motion.div
                  key={ref._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-lg flex justify-between items-center transition-colors ${
                    ref.status === "Deleted"
                      ? "bg-red-50 text-gray-500"
                      : "bg-gray-50"
                  }`}
                >
                  <div>
                    <span
                      className={`text-xs font-bold uppercase py-1 px-2 rounded-full text-white ${
                        ref.status === "Added"
                          ? "bg-green-500"
                          : ref.status === "Updated"
                            ? "bg-blue-500"
                            : "bg-red-500"
                      }`}
                    >
                      {ref.status}
                    </span>
                    <p
                      className={`font-mono font-bold text-lg mt-2 ${ref.status === "Deleted" && "line-through"}`}
                    >
                      {ref.keyword}
                    </p>
                    <p
                      className={`text-sm text-gray-600 font-mono mt-1 ${ref.status === "Deleted" && "line-through"}`}
                    >
                      {ref.routes.join(", ")}
                    </p>
                  </div>
                  {ref.status !== "Deleted" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenModal(ref)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() =>
                          setDeleteDialog({ show: true, referral: ref })
                        }
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16 px-6 bg-white rounded-xl shadow-lg">
              <p className="text-gray-500">
                No referrals have been modified in this session.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Click "Add Referral" to get started.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-250 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingReferral ? "Edit Referral" : "Add New Referral"}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keyword
                  </label>
                  <input
                    type="text"
                    value={formData.keyword}
                    onChange={(e) =>
                      setFormData({ ...formData, keyword: e.target.value })
                    }
                    placeholder="e.g., kashmir"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Routes
                  </label>
                  <textarea
                    rows="4"
                    value={formData.routes}
                    onChange={(e) =>
                      setFormData({ ...formData, routes: e.target.value })
                    }
                    placeholder="Enter routes, separated by commas..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    Example: kashmir_valley_classic, amritsar_srinagar
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!formData.keyword || !formData.routes}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center gap-2"
                >
                  <Save size={16} />
                  {editingReferral ? "Save Changes" : "Create"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteDialog.show && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-250 p-4">
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
                    Delete Referral
                  </h3>
                  <p className="text-gray-600">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Are you sure you want to permanently delete the keyword{" "}
                <strong className="font-semibold">
                  "{deleteDialog.referral?.keyword}"
                </strong>
                ?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() =>
                    setDeleteDialog({ show: false, referral: null })
                  }
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReferralManager;
