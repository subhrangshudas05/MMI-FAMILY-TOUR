import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Reusable schema for each "item"
const ItemSchema = new Schema({
  name: { type: String, required: true },
  route: { type: String, required: true },
  image: { type: String, required: true },
});

// Schema for Popular Destinations
const PopularDestinationsSchema = new Schema({
  category: { type: String, required: true },
  subtitle: { type: String, required: true },
  items: { type: [ItemSchema]},
 }, { timestamps: true });

// Schema for Around India
const AroundIndiaSchema = new Schema({
  category: { type: String, required: true },
  subtitle: { type: String, required: true },
  items: { type: [ItemSchema] },
}, { timestamps: true });

// Models
export const PopularDestination = mongoose.models.PopularDestination || model("PopularDestination", PopularDestinationsSchema);
export const AroundIndia = mongoose.models.AroundIndia || model("AroundIndia", AroundIndiaSchema);
