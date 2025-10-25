"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Send } from "lucide-react";
import { toast } from "react-toastify";

const StarRating = ({ rating, setRating }) => (
  <div className="flex items-center gap-2 poppins">
    {[1, 2, 3, 4, 5].map((star) => (
      <motion.div key={star} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
        <Star
          size={32}
          className={`cursor-pointer transition-colors ${
            star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
          onClick={() => setRating(star)}
        />
      </motion.div>
    ))}
  </div>
);

const REVIEWS_PER_PAGE = 8;

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE);

  const [formData, setFormData] = useState({ pkgTitle: "", name: "", comment: "" });
  const [stars, setStars] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();
        
        
        const sortedData = data
          .filter(review => review.approved)
          .sort((a, b) => a.displayOrder - b.displayOrder);
        
        setReviews(sortedData);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (stars === 0 || !formData.name || !formData.pkgTitle) {
      toast.error("Please provide your name, the package title, and a star rating.");
      return;
    }

    setIsSubmitting(true);
    try {
      const reviewPayload = { ...formData, stars };
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewPayload),
      });

      if (!response.ok) throw new Error("Failed to submit review");
      
      toast.success("Review submitted! It will appear after admin approval.");

      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "review", data: reviewPayload }),
      })
      .then(res => res.json())
      .then(result => {
          if (result.success) {
              console.log("✅ Admin notification email sent successfully.");
          } else {
              console.error("Email notification failed:", result.error);
          }
      }).catch(err => {
          console.error("Email notification network error:", err);
      });

      setIsModalOpen(false);
      setFormData({ pkgTitle: "", name: "", comment: "" });
      setStars(0);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="reviews" className="bg-slate-900 text-white py-16 sm:py-24 poppins px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            What Our Travelers Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-slate-400">
            Real stories from our happy customers. Share your experience!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-8 inline-block bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-transform duration-200 hover:scale-105"
          >
            Write a Review
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center">Loading reviews...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              <AnimatePresence>
                {reviews.slice(0, visibleCount).map((review, index) => (
                  <motion.div
                    key={review._id}
                    layout
                    className="bg-slate-800 p-4 md:p-6 rounded-2xl flex flex-col"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center mb-2">
                      {[...Array(review.stars)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <h3 className="font-bold text-sm md:text-lg text-purple-300 mb-2 md:mb-4">
                      {review.pkgTitle}
                    </h3>
                    {review.comment && (
                      <p className="text-slate-300 text-xs md:text-base mb-2 flex-grow">
                        "{review.comment}"
                      </p>
                    )}
                    <p className="font-semibold text-slate-100 text-sm md:text-base">
                      ~ {review.name}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {visibleCount < reviews.length && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setVisibleCount(prev => prev + REVIEWS_PER_PAGE)}
                  className="bg-slate-700 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-600 transition-colors"
                >
                  Load More Reviews
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-250 p-4">
             <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="flex justify-between items-center p-6 border-b border-slate-700">
                <h3 className="text-xl font-semibold">Share Your Experience</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <StarRating rating={stars} setRating={setStars} />
                <input type="text" name="pkgTitle" placeholder="Package or Tour Title" value={formData.pkgTitle} onChange={handleInputChange} required className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500"/>
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500"/>
                <textarea name="comment" rows="4" placeholder="Your comments (optional)" value={formData.comment} onChange={handleInputChange} className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500"></textarea>
                <button type="submit" disabled={isSubmitting} className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 disabled:bg-purple-800 flex items-center justify-center gap-2">
                  <Send size={18} />
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerReviews;

