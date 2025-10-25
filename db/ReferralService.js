import { Referral } from "@/models/referralSchema";
import connectDb from "@/db/connectDb";

// local cache
let referralCache = null;

/**
 * Get all referrals (with cache).
 */
export async function getAllReferrals() {
  await connectDb();
  if (referralCache) return referralCache;
  referralCache = await Referral.find();
  return referralCache;
}

/**
 * Insert a new referral.
 */
export async function insertReferral(newReferral) {
  await connectDb();
  const created = await Referral.create(newReferral);
  referralCache = null;
  return created;
}

/**
 * Update referral by id.
 */
export async function updateReferral(id, updates) {
  await connectDb();
  const updated = await Referral.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true }
  );
  referralCache = null;
  return updated;
}

/**
 * Delete referral by id.
 */
export async function deleteReferral(id) {
  await connectDb();
  const deleted = await Referral.findByIdAndDelete(id);
  referralCache = null;
  return deleted;
}
