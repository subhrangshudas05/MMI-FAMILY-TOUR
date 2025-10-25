import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Reusable item schema
const ItemSchema = new Schema({
  name: { type: String, required: true },
  route: { type: String, required: true },
  image: { type: String, required: true },
});

// Main places schema
const PlacesSchema = new Schema({
  category: { type: String, required: true },
  subtitle: { type: String, required: true },
  items: { type: [ItemSchema], required: true },
}, { timestamps: true });

export const Place = mongoose.models.Place || model("Place", PlacesSchema);
