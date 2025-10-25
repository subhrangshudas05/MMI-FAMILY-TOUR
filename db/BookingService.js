import { Booking } from "@/models/bookingSchema";
import connectDb from "@/db/connectDb";

// local cache
let bookingCache = null;

/**
 * Get all bookings (with cache).
 */
export async function getAllBookings() {
  await connectDb();
  if (bookingCache) return bookingCache;
  bookingCache = await Booking.find().sort({ createdAt: -1 }); // newest first
  return bookingCache;
}

/**
 * Get booking by ID.
 */
export async function getBookingById(id) {
  await connectDb();
  return await Booking.findById(id);
}

/**
 * Insert a new booking.
 */
export async function insertBooking(newBooking) {
  await connectDb();
  const created = await Booking.create(newBooking);
  bookingCache = null; // clear cache
  return created;
}

/**
 * Update booking by ID.
 */
export async function updateBooking(id, updates) {
  await connectDb();
  const updated = await Booking.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true }
  );
  bookingCache = null; // clear cache
  return updated;
}

/**
 * Update booking status.
 */
export async function updateBookingStatus(id, status) {
  await connectDb();
  const updated = await Booking.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true }
  );
  bookingCache = null; // clear cache
  return updated;
}

/**
 * Delete booking by ID.
 */
export async function deleteBooking(id) {
  await connectDb();
  const deleted = await Booking.findByIdAndDelete(id);
  bookingCache = null; // clear cache
  return deleted;
}

/**
 * Get bookings by status.
 */
export async function getBookingsByStatus(status) {
  await connectDb();
  return await Booking.find({ status }).sort({ createdAt: -1 });
}

/**
 * Get bookings by email.
 */
export async function getBookingsByEmail(emailAddress) {
  await connectDb();
  return await Booking.find({ emailAddress }).sort({ createdAt: -1 });
}