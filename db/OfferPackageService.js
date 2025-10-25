import connectDb from "@/db/connectDb";
import OfferPackage from "@/models/offerPackageSchema";

let offerPackageCache = null;

/**
 * Get all offer packages
 */
export async function getAllOfferPackages() {
  await connectDb();
  if (offerPackageCache) return offerPackageCache;
  offerPackageCache = await OfferPackage.find();
  return offerPackageCache;
}

/**
 * Insert a new offer package
 */
export async function insertOfferPackage(newOfferPackage) {
  await connectDb();
  const created = await OfferPackage.create(newOfferPackage);
  offerPackageCache = null;
  return created;
}

/**
 * Update an offer package by id
 */
export async function updateOfferPackage(id, updates) {
  await connectDb();
  const updated = await OfferPackage.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true }
  );
  offerPackageCache = null;
  return updated;
}

/**
 * Delete an offer package by id
 */
export async function deleteOfferPackage(id) {
  await connectDb();
  const deleted = await OfferPackage.findByIdAndDelete(id);
  offerPackageCache = null;
  return deleted;
}
