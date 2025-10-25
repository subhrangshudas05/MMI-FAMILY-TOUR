import connectDb from "@/db/connectDb";
import Package from "@/models/packageSchema";

let packageCache = null;

/**
 * Get all packages
 */
export async function getAllPackages() {
  await connectDb();
  if (packageCache) return packageCache;
  packageCache = await Package.find();
  return packageCache;
}

/**
 * Get a single package by id
 */
export async function getPackageByRoute(id) {
  await connectDb();
  const pkg = await Package.findOne({ id });
  return pkg;
}

/**
 * Insert a new package
 */
export async function insertPackage(newPackage) {
  await connectDb();
  const created = await Package.create(newPackage);
  packageCache = null;
  return created;
}

/**
 * Update a package by id
 */
export async function updatePackage(id, updates) {
  await connectDb();
  const updated = await Package.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true }
  );
  packageCache = null;
  return updated;
}

/**
 * Delete a package by id
 */
export async function deletePackage(id) {
  await connectDb();
  const deleted = await Package.findByIdAndDelete(id);
  packageCache = null;
  return deleted;
}
