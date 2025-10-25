"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Star, Trash2, CheckCircle, XCircle, Clock, Save } from "lucide-react";
import { toast } from "react-toastify";

const ReviewSection = () => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      // UPDATED: Removed '?admin=true'. The secured API endpoint handles authorization now.
      const response = await fetch("/api/reviews");
      if (!response.ok) {
        // Handle cases where a non-admin might try to access this page
        if (response.status === 403) {
          throw new Error(
            "Unauthorized: You do not have permission to view this page."
          );
        }
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();
      setPending(data.filter((r) => !r.approved));
      setApproved(
        data
          .filter((r) => r.approved)
          .sort((a, b) => a.displayOrder - b.displayOrder)
      );
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApproval = async (review, isApproved) => {
    const originalPending = [...pending];
    const originalApproved = [...approved];

    // Optimistic UI update
    if (isApproved) {
      const newDisplayOrder =
        approved.length > 0
          ? Math.max(...approved.map((r) => r.displayOrder)) + 1
          : 0;
      const reviewToMove = {
        ...review,
        approved: true,
        displayOrder: newDisplayOrder,
      };
      setPending(pending.filter((r) => r._id !== review._id));
      setApproved([...approved, reviewToMove]);
    } else {
      setApproved(approved.filter((r) => r._id !== review._id));
      setPending([...pending, { ...review, approved: false }]);
    }

    try {
      // The displayOrder for newly approved items is now calculated client-side for immediate visual feedback
      const displayOrder = isApproved
        ? approved.length > 0
          ? Math.max(...originalApproved.map((r) => r.displayOrder)) + 1
          : 0
        : 9999;
      await fetch("/api/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updateApproval",
          id: review._id,
          approved: isApproved,
          displayOrder,
        }),
      });
      toast.success(`Review ${isApproved ? "approved" : "rejected"}!`);
      // Refetch to ensure data consistency, especially displayOrder
      fetchReviews();
    } catch (err) {
      toast.error("Failed to update review status.");
      // Rollback on error
      setPending(originalPending);
      setApproved(originalApproved);
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this review permanently?"
      )
    )
      return;

    const originalPending = [...pending];
    const originalApproved = [...approved];

    setPending(pending.filter((r) => r._id !== id));
    setApproved(approved.filter((r) => r._id !== id));

    try {
      await fetch("/api/reviews", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.success("Review deleted!");
    } catch (err) {
      toast.error("Failed to delete review.");
      setPending(originalPending);
      setApproved(originalApproved);
    }
  };

  const handleSaveOrder = async () => {
    const orderUpdates = approved.map((review, index) => ({
      _id: review._id,
      displayOrder: index,
    }));

    try {
      await fetch("/api/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateOrder", orderUpdates }),
      });
      toast.success("Display order saved successfully!");
    } catch (err) {
      toast.error("Failed to save order.");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-600"></div>
      </div>
    );
  return (
    <div className="p-4 md:p-8 bg-gray-50 rounded-lg min-h-screen poppins text-blacl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Review Management
      </h1>

      {/* Pending Reviews Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
          Pending Approval ({pending.length})
        </h2>
        <AnimatePresence>
          {pending.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pending.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onApprove={handleApproval}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No pending reviews.</p>
          )}
        </AnimatePresence>
      </section>

      {/* Approved Reviews Section */}
      <section>
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-2xl font-semibold text-gray-700">
            Approved Reviews ({approved.length})
          </h2>
          <button
            onClick={handleSaveOrder}
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save size={18} /> Save Order
          </button>
        </div>
        <p className="text-gray-500 mb-4">
          Drag and drop to reorder how reviews appear on the public site.
        </p>
        <Reorder.Group
          axis="y"
          values={approved}
          onReorder={setApproved}
          className="space-y-4"
        >
          {approved.map((review) => (
            <Reorder.Item key={review._id} value={review}>
              <ReviewCard
                review={review}
                onApprove={handleApproval}
                onDelete={handleDelete}
                isApproved
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </section>
    </div>
  );
};

const ReviewCard = ({ review, onApprove, onDelete, isApproved = false }) => {
  const cardColor = isApproved
    ? "bg-green-50 border-green-200"
    : "bg-yellow-50 border-yellow-300";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={`p-5 rounded-lg border shadow-sm ${cardColor}`}
    >
      <div className="flex justify-between items-start text-black">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{review.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{review.pkgTitle}</p>
          <div className="flex items-center">
            {[...Array(review.stars)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className="text-yellow-400 fill-current"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isApproved ? (
            <button
              onClick={() => onApprove(review, false)}
              title="Reject"
              className="p-2 text-orange-600 hover:bg-orange-100 rounded-full"
            >
              <XCircle size={20} />
            </button>
          ) : (
            <button
              onClick={() => onApprove(review, true)}
              title="Approve"
              className="p-2 text-green-600 hover:bg-green-100 rounded-full"
            >
              <CheckCircle size={20} />
            </button>
          )}
          <button
            onClick={() => onDelete(review._id)}
            title="Delete"
            className="p-2 text-red-600 hover:bg-red-100 rounded-full"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      {review.comment && (
        <p className="mt-4 text-gray-700 bg-white border-1 border-amber-900/10 p-3 rounded-md">
          "{review.comment}"
        </p>
      )}
      <p className="text-xs text-gray-400 mt-4">
        <Clock size={12} className="inline mr-1" />
        {new Date(review.createdAt).toLocaleString()}
      </p>
    </motion.div>
  );
};

export default ReviewSection;
