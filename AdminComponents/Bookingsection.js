"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Calendar, Users, Clock, Phone } from "lucide-react";
import packageVM from "@/viewmodel/packageVM";
import Link from "next/link";
import { toast } from "react-toastify";

const Bookingsection = () => {
  const { getAllBookings } = packageVM();
  const [loading, setLoading] = useState(true);
  const [bookingList, setBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);

      try {
        // Load bookings
        const bookings = await getAllBookings();
        setBookings(bookings);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 text-black "
      >
        <BookingManagement
          bookingList={bookingList}
          setBookings={setBookings} // <-- This setter function
          loading={loading}
        />
      </motion.div>
    </>
  );
};

export default Bookingsection;

const BookingManagement = ({
  bookingList = [],
  loading = false,
  setBookings,
}) => {
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    bookingId: null,
  });
  const [updateDialog, setUpdateDialog] = useState({
    open: false,
    bookingId: null,
    currentStatus: "",
  });
  const [selectedStatus, setSelectedStatus] = useState({});
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (bookingId) => {
    setDeleting(true);
    try {
      const response = await fetch("/api/booking", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: bookingId }),
      });

      if (response.ok) {
        // Remove the deleted booking from the list
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
        toast.success(`Booking deleted successfully!`);

        setDeleteDialog({ open: false, bookingId: null });
      } else {
        console.error("Failed to delete booking");
        toast.error(
          `Failed to delete booking: ${error.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error(
        `Failed to delete booking: ${error.error || "Unknown error"}`
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdate = async (bookingId) => {
    const newStatus = selectedStatus[bookingId];
    if (!newStatus) return;

    setUpdating(true);
    try {
      const response = await fetch("/api/booking", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: bookingId,
          updates: { status: newStatus },
        }),
      });

      if (response.ok) {
        const updatedBooking = await response.json();

        // Update the booking in the list
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: newStatus }
              : booking
          )
        );
        toast.success(`Booking updated successfully!`);

        setUpdateDialog({ open: false, bookingId: null, currentStatus: "" });
        setSelectedStatus((prev) => ({ ...prev, [bookingId]: "" }));
      } else {
        console.error("Failed to update booking");
        toast.error(
          `Failed to update booking: ${error.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error(
        `Failed to update booking: ${error.error || "Unknown error"}`
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleStatusChange = (bookingId, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [bookingId]: status,
    }));
  };

  const openUpdateDialog = (bookingId, currentStatus) => {
    const newStatus = selectedStatus[bookingId];
    if (!newStatus || newStatus === currentStatus) return;

    setUpdateDialog({ open: true, bookingId, currentStatus });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      case "completed":
        return "text-blue-600";
      default:
        return "text-orange-600";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 border-green-200";
      case "cancelled":
        return "bg-red-50 border-red-200";
      case "completed":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-orange-50 border-orange-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Loading state
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 text-black poppins"
      >
        <h2 className="text-2xl font-bold text-gray-900">
          Bookings Management
        </h2>

        <div className="flex flex-col h-[65vh] items-center justify-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-lg text-gray-600 animate-pulse">
            Loading bookings...
          </p>
        </div>
      </motion.div>
    );
  }

  // No bookings state
  if (!bookingList || bookingList.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 text-black poppins"
      >
        <h2 className="text-2xl font-bold text-gray-900">
          Bookings Management
        </h2>

        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-gray-100 rounded-full p-6 mb-4">
            <Calendar size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Bookings Yet
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            When customers make bookings for your travel packages, they will
            appear here for you to manage.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 text-black poppins"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Bookings Management
        </h2>
        <div className="text-sm text-right sm:text-base font-semibold text-gray-500">
          {bookingList.length} booking{bookingList.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Booking cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {bookingList.map((booking, index) => (
            <motion.div
              key={booking._id}
              layout
              className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-300 hover:shadow-xl ${getStatusBgColor(
                booking.status
              )}`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-5">
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 mb-1 line-clamp-2">
                    {booking.title}
                  </h3>
                  <p className="text-gray-600 font-medium flex items-center">
                    <Clock size={16} className="mr-1" />
                    {booking.days} Days / {booking.nights} Nights
                  </p>
                </div>
                <button
                  onClick={() =>
                    setDeleteDialog({ open: true, bookingId: booking._id })
                  }
                  className="text-red-400 hover:text-red-600 transition-colors duration-200 p-1 hover:bg-red-50 rounded-md"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Customer Details */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 mr-3">
                    Customer:
                  </span>
                  <span className="text-gray-800">{booking.fullName}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 mr-3">
                    Phone:
                  </span>
                  <span className="text-gray-800">{booking.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <Users size={16} className="text-gray-500 mr-1" />
                  <span className="font-semibold text-gray-700 mr-3">
                    People:
                  </span>
                  <span className="text-gray-800">
                    {booking.numberOfPeople}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 mr-3">
                    Price:
                  </span>
                  <span className="text-gray-800 font-bold">
                    ₹{booking.price}
                  </span>
                </div>
                <p className="flex items-center gap-3">
                  <Clock size={16} className="text-gray-400" />{" "}
                  {formatDate(booking.createdAt)}
                </p>
              </div>

              {/* Status Radio Buttons */}
              <div className="mb-5">
                <p className="font-semibold text-gray-700 mb-3">Status:</p>
                <div className="space-y-2">
                  {["pending", "cancelled", "confirmed", "completed"].map(
                    (status) => (
                      <label
                        key={status}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={`status-${booking._id}`}
                          value={status}
                          checked={
                            (selectedStatus[booking._id] || booking.status) ===
                            status
                          }
                          onChange={() =>
                            handleStatusChange(booking._id, status)
                          }
                          className={`mr-2 ${
                            status === "confirmed"
                              ? "text-green-500 focus:ring-green-300"
                              : status === "completed"
                                ? "text-blue-500 focus:ring-blue-300"
                                : status === "cancelled"
                                  ? "text-red-500 focus:ring-red-300"
                                  : "text-orange-500 focus:ring-orange-300"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium capitalize ${
                            (selectedStatus[booking._id] || booking.status) ===
                            status
                              ? getStatusColor(status)
                              : "text-gray-600"
                          }`}
                        >
                          {status}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Link href={`/tour/${booking.route}`} className="flex-1">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg">
                    View Package
                  </button>
                </Link>
                <button
                  onClick={() => openUpdateDialog(booking._id, booking.status)}
                  disabled={
                    !selectedStatus[booking._id] ||
                    selectedStatus[booking._id] === booking.status
                  }
                  className={`px-6 py-2.5 rounded-lg font-semibold shadow-md transition-all duration-200 ${
                    !selectedStatus[booking._id] ||
                    selectedStatus[booking._id] === booking.status
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:shadow-lg"
                  }`}
                >
                  Update
                </button>
              </div>
              <Link
                href={`tel:${booking.phoneNumber}`}
                className="w-full mt-5 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                Call {booking.phoneNumber}
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteDialog.open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-250">
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
                  Delete Booking
                </h3>
                <p className="text-gray-600">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this booking? All booking data
              will be permanently removed.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() =>
                  setDeleteDialog({ open: false, bookingId: null })
                }
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteDialog.bookingId)}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {deleting ? (
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

      {/* Update Confirmation Dialog */}
      {updateDialog.open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-250">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-mx-4 shadow-xl"
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Update Booking Status
                </h3>
                <p className="text-gray-600">Confirm status change.</p>
              </div>
            </div>
            <p className="text-gray-700 mb-6">
              Change status from{" "}
              <span className="font-semibold capitalize">
                {updateDialog.currentStatus}
              </span>{" "}
              to{" "}
              <span className="font-semibold capitalize">
                {selectedStatus[updateDialog.bookingId]}
              </span>
              ?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() =>
                  setUpdateDialog({
                    open: false,
                    bookingId: null,
                    currentStatus: "",
                  })
                }
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                disabled={updating}
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate(updateDialog.bookingId)}
                disabled={updating}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {updating ? (
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
    </motion.div>
  );
};
