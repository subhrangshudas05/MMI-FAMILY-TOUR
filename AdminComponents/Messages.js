"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MessageSquare, Clock, Inbox, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";

const MessagesViewer = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    show: false,
    messageId: null,
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        if (!response.ok) {
          throw new Error(
            "Failed to fetch messages. Are you logged in as an admin?"
          );
        }
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleDelete = async (messageId) => {
    try {
      const response = await fetch("/api/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: messageId }),
      });

      if (!response.ok) {
        toast.error(`Failed to Delete Message"}`);
      }

      // Optimistically update UI
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
      toast.success(`Message deleted successfully!`);

      setDeleteDialog({ show: false, messageId: null }); // Close dialog on success
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(
        `Failed to Delete Message: ${err.message || "Unknown error"}`
      );
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-100 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 poppins">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customer Messages</h1>
        <span className="text-gray-600 font-semibold">
          {messages.length} messages
        </span>
      </div>

      <AnimatePresence>
        {messages.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {messages.map((msg, index) => (
              <motion.div
                key={msg._id}
                layout
                className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() =>
                    setDeleteDialog({ show: true, messageId: msg._id })
                  }
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-600 hover:bg-red-100 p-2 rounded-full transition-colors"
                  aria-label="Delete message"
                >
                  <Trash2 size={18} />
                </button>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="text-purple-700 font-bold text-xl">
                        {msg.fullName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 truncate pr-8">
                      {msg.fullName}
                    </h2>
                  </div>

                  <div className="space-y-3 text-gray-600 text-sm">
                    <p className="flex items-center gap-3">
                      <Mail size={16} className="text-gray-400" /> {msg.email}
                    </p>
                    <p className="flex items-center gap-3">
                      <Clock size={16} className="text-gray-400" />{" "}
                      {formatDate(msg.createdAt)}
                    </p>
                    <div className="pt-2">
                      <p className="flex items-start gap-3">
                        <MessageSquare
                          size={16}
                          className="text-gray-400 mt-1 flex-shrink-0"
                        />
                        <span className="bg-gray-50 p-3 rounded-md w-full">
                          {msg.message}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href={`tel:${msg.phone}`}
                  className="w-full mt-5 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={18} />
                  Call {msg.phone}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 px-6 bg-white rounded-xl shadow-lg">
            <Inbox size={48} className="mx-auto text-gray-300" />
            <p className="text-gray-500 mt-4 text-lg font-semibold">
              No messages yet.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              New messages from the contact form will appear here.
            </p>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
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
                    Delete Message
                  </h3>
                  <p className="text-gray-600">This action cannot be undone.</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Are you sure you want to permanently delete this message?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() =>
                    setDeleteDialog({ show: false, messageId: null })
                  }
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteDialog.messageId)}
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

export default MessagesViewer;
