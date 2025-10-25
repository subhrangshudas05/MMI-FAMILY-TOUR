import { Place } from "@/models/placesSchema";
import connectDb from "@/db/connectDb";

let placeCache = null;

/**
 * Get all places
 */
export async function getAllPlaces() {
  await connectDb();
  // Commenting out cache for easier development, you can re-enable later
  // if (placeCache) return placeCache; 
  const data = await Place.find();
  placeCache = data;
  return placeCache;
}

/**
 * Insert a new place category
 */
export async function insertPlace(newPlace) {
  await connectDb();
  const created = await Place.create(newPlace);
  placeCache = null;
  return created;
}

/**
 * Update an item inside a category (by id)
 */
export async function updatePlace(id, updates) {
  await connectDb();
  
  // ✅ THE FIX:
  // 1. The query now correctly uses {_id: id}.
  // 2. The update operation is now simply { $set: updates }, which correctly applies 
  //    the entire 'updates' object from the frontend. This handles all your
  //    scenarios: updating a category title or replacing the 'items' array.
  const updated = await Place.findOneAndUpdate(
    { _id: id },
    { $set: updates },
    { new: true, runValidators: true }
  );

  placeCache = null;
  return updated;
}

/**
 * Delete an item by id
 */
export async function deletePlace(id) {
  await connectDb();
  const deleted = await Place.findByIdAndDelete(id);
  placeCache = null;
  return deleted;
}
