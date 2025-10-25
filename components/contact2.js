import React, { useState } from "react";
import Link from "next/link";
import {
  motion,
} from "framer-motion";
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Send,
  Loader2,
  AlertTriangle,
} from "lucide-react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const KK = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ new state

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Please enter your full name";
        break;
      case "email":
        if (!value.trim()) {
          error = "Please enter your email address";
        } else if (!value.includes("@")) {
          error = `Please include an '@' in the email address. '${value}' is missing an '@'.`;
        } else if (
          !value.includes(".") ||
          value.indexOf("@") > value.lastIndexOf(".")
        ) {
          error = "Please enter a valid email address";
        }
        break;
      case "phone":
        if (!value.trim()) {
          error = "Please enter your phone number";
        } else if (!/^\d+$/.test(value)) {
          error = "Phone number should contain only numbers";
        } else if (value.length !== 10) {
          error = "Phone number must be exactly 10 digits";
        }
        break;
      case "message":
        if (!value.trim()) error = "Please fill in this field";
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (validationErrors[e.target.name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [e.target.name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });

    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true); // ✅ show loader
      try {
        const response = await fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        toast("Message Sent", {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });

        // ✅ Step 3: Send the email notification and log the outcome
        fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "message", data: formData }),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result.success) {
              console.log("✅ Message sent successfully.");
            } else {
              console.error(
                "Email notification failed:",
                result.error || "Unknown API error"
              );
            }
          })
          .catch((error) => {
            // Log network error but don't bother the user, their booking is safe.
            console.error("Email notification network error:", error);
          });

        setFormData({ fullName: "", email: "", phone: "", message: "" });
      } catch (error) {
        console.error("Form submission error:", error);
      } finally {
        setIsSubmitting(false); // ✅ hide loader
      }
    }
  };

  const ValidationMessage = ({ error }) => {
    if (!error) return null;

    return (
      <div className="flex items-start gap-2 mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
        <span className="text-sm text-orange-700">{error}</span>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full max-w-7xl mx-auto poppins">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ amount: 0.1 }}
          transition={{
            default: { type: "tween", duration: 0.4, delay: 0.1 },
          }}
          className="bg-white rounded-3xl py-8 p-4 sm:p-8  shadow-xl overflow-x-hidden text-black "
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-8">
            We're Just a Message Away
          </h2>
          <p className="text-gray-600 mb-8 text-md sm:text-lg px-1">
            Whether you have a question, a wild idea, or just want to say hi —
            drop us a line. Let's create something amazing together.
          </p>

          <div className="space-y-6 mb-8">
            <div className="flex items-start space-x-4 text-sm">
              <div className="bg-pink-100 p-3 rounded-full">
                <Instagram className="w-4 h-4 sm:w-6 sm:h-6 text-pink-500" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  Visit Our Instagram Page
                </h3>
                <p className="text-gray-600">Username: mimi_family_tour</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Call Us</h3>
                <div className="text-gray-600 flex flex-col sm:flex-row sm:gap-2">
                  <span>+91 62892 30689</span>
                  <span className="hidden sm:block">|</span>
                  <span>+91 88203 61987</span>
                </div>
                <p className="text-sm text-gray-500">
                  Mon-Sat: 9AM-8PM, Sun: 10AM-6PM
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <img
                  src="/whatsappoutline.png"
                  alt="wp"
                  className="h-4 w-4 sm:h-6 sm:w-6"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">WhatsApp</h3>
                <p className="text-gray-600">+91 88203 61987</p>
                <p className="text-sm text-gray-500">
                  Quick responses guaranteed!
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Email Us</h3>
                <p className="text-gray-600">{process.env.NEXT_PUBLIC_EMAIL}</p>
                <p className="text-sm text-gray-500">
                  We'll respond within 2 hours
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-800 mb-4">Follow Us:</h3>
            <div className="flex space-x-4">
              {[
                {
                  icon: Facebook,
                  color: "text-blue-600 hover:bg-blue-100",
                  bg: "bg-blue-50",
                  href: "https://www.facebook.com/share/169sNhPi6r/",
                },
                {
                  icon: Instagram,
                  color: "text-pink-600 hover:bg-pink-100",
                  bg: "bg-pink-50",
                  href: "https://www.instagram.com/mimi_family_tour?igsh=N296d29lZXI0bjFn",
                },
              ].map((social, index) => (
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                  className={`p-3 rounded-full transition-all ${social.bg} ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          id="send-message"
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ amount: 0.1 }}
          transition={{
            default: { type: "tween", duration: 0.4, delay: 0.1 },
          }}
          className="bg-white rounded-3xl py-8 p-4 sm:p-8 shadow-xl overflow-x-hidden text-black text-base sm:text-lg"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">
            Send a Message
          </h2>

          <div className="space-y-6 text-base">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full px-4 py-4 border rounded-xl transition-all  ${
                  validationErrors.fullName
                    ? "border-orange-400 focus:ring-2 focus:ring-orange-500"
                    : "border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                }`}
              />
              <ValidationMessage error={validationErrors.fullName} />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-4 border rounded-xl transition-all  ${
                  validationErrors.email
                    ? "border-orange-400 focus:ring-2 focus:ring-orange-500"
                    : "border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                }`}
              />
              <ValidationMessage error={validationErrors.email} />
            </div>

            {/* Phone */}
            <div>
              <div className="flex gap-2 sm:gap-4">
                <div className="flex items-center justify-center px-4 py-4 rounded-xl border border-gray-200 text-gray-600 flex-shrink-0">
                  +91
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 border rounded-xl transition-all ${
                    validationErrors.phone
                      ? "border-orange-400 focus:ring-2 focus:ring-orange-500"
                      : "border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  }`}
                />
              </div>
              <ValidationMessage error={validationErrors.phone} />
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                placeholder="Tell us about your dream destination, travel dates, group size, or any specific requirements..."
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className={`w-full px-4 py-4 border rounded-xl transition-all  resize-none ${
                  validationErrors.message
                    ? "border-orange-400 focus:ring-2 focus:ring-orange-500"
                    : "border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                }`}
              />
              <ValidationMessage error={validationErrors.message} />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 px-6 rounded-xl text-lg font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all
            ${
              isSubmitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-orange-600 hover:to-amber-600"
            }
          `}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>

          {/* Info Section */}
          <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <p className="text-green-700 text-center">
              <strong>Quick Response Guarantee:</strong> We typically respond to
              all inquiries within 2 hours during business hours!
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default KK;
