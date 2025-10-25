import { PopularDestination, AroundIndia } from "@/models/navSchemas";
import connectDb from "@/db/connectDb";

// Local caches
let popularCache = null;
let aroundCache = null;

/**
 * Get all items from a collection (with cache).
 */
export async function getAllNav(type) {
  await connectDb();

  if (type === "popular") {
    // Forcing a fresh fetch for development, remove cache logic if not needed
    // if (popularCache) return popularCache; 
    const data = await PopularDestination.find();
    popularCache = data;
    return popularCache;
  }

  if (type === "india") {
    // if (aroundCache) return aroundCache;
    const data = await AroundIndia.find();
    aroundCache = data;
    return aroundCache;
  }

  throw new Error("Invalid type. Use 'popular' or 'india'");
}

/**
 * Insert one item into a collection.
 */
export async function insertNavItem(type, newItem) {
  await connectDb();

  if (type === "popular") {
    const created = await PopularDestination.create(newItem);
    popularCache = null; // clear cache
    return created;
  }

  if (type === "india") {
    const created = await AroundIndia.create(newItem);
    aroundCache = null;
    return created;
  }

  throw new Error("Invalid type. Use 'popular' or 'india'");
}

/**
 * Update one item by id.
 */
export async function updateNavItem(type, id, updates) {
  await connectDb();

  const options = { new: true, runValidators: true }; // return updated doc and run schema validation

  if (type === "popular") {
    // ✅ THE FIX: 
    // Removed the incorrect "items.$" positional operator.
    // This now correctly applies the 'updates' object from your frontend,
    // whether it's updating the category title or replacing the entire items array.
    const updated = await PopularDestination.findByIdAndUpdate(id, { $set: updates }, options);
    popularCache = null;
    return updated;
  }

  if (type === "india") {
    // ✅ THE FIX: (Applied here as well)
    const updated = await AroundIndia.findByIdAndUpdate(id, { $set: updates }, options);
    aroundCache = null;
    return updated;
  }

  throw new Error("Invalid type. Use 'popular' or 'india'");
}

/**
 * Delete one item by id.
 */
export async function deleteNavItem(type, id) {
  await connectDb();

  // ✅ CLEANUP: Removed unused pullQuery. This function correctly deletes the entire document.
  // Your frontend logic for deleting a single item is handled by the updateNavItem function.
  if (type === "popular") {
    const deleted = await PopularDestination.findByIdAndDelete(id);
    popularCache = null;
    return deleted;
  }

  if (type === "india") {
    const deleted = await AroundIndia.findByIdAndDelete(id);
    aroundCache = null;
    return deleted;
  }

  throw new Error("Invalid type. Use 'popular' or 'india'");
}
