import { Review } from "@/models/reviewSchema";
import connectDb from "@/db/connectDb";

/**
 * Insert a new review. It will be unapproved by default.
 */
export async function insertReview(reviewData) {
  await connectDb();
  const created = await Review.create(reviewData);
  return created;
}

/**
 * Get all APPROVED reviews, sorted by their display order.
 * This is for the public-facing site.
 */
export async function getApprovedReviews() {
    await connectDb();
    const reviews = await Review.find({ approved: true }).sort({ displayOrder: 1, createdAt: -1 });
    return reviews;
}

/**
 * Get ALL reviews (approved and unapproved) for the admin panel.
 */
export async function getAllReviewsForAdmin() {
    await connectDb();
    const reviews = await Review.find().sort({ approved: 1, createdAt: -1 });
    return reviews;
}

/**
 * Update a review's approval status.
 */
export async function updateReviewApproval(id, approved, displayOrder) {
    await connectDb();
    const updated = await Review.findByIdAndUpdate(id, { approved, displayOrder }, { new: true });
    return updated;
}

/**
 * Update the display order of multiple reviews.
 * @param {Array<{_id: string, displayOrder: number}>} orderUpdates - An array of objects with review ID and new order.
 */
export async function updateReviewOrder(orderUpdates) {
    await connectDb();
    const bulkOps = orderUpdates.map(update => ({
        updateOne: {
            filter: { _id: update._id },
            update: { $set: { displayOrder: update.displayOrder } }
        }
    }));
    if (bulkOps.length === 0) return { ok: 1 }; // No updates needed
    return await Review.bulkWrite(bulkOps);
}


/**
 * Delete a review by its ID.
 */
export async function deleteReview(id) {
    await connectDb();
    const deleted = await Review.findByIdAndDelete(id);
    return deleted;
}
