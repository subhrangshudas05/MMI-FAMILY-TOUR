import mongoose, { Schema, model } from "mongoose";

// Reuse Place + Plan schemas if you already have them
const PlaceSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
});

const PlanSchema = new Schema({
  title: { type: String, required: true },
  plan: { type: String, required: true },
});

const OfferPackageSchema = new Schema(
  {
    route: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    places: { type: [PlaceSchema], required: true },
    plans: { type: [PlanSchema], required: true },
    ds: { type: String, required: true }, // duration in days
    ns: { type: String, required: true }, // nights
    price: { type: String, required: true },

    // ✅ New fields for offers
    month: { type: String, required: true },
    realPrice: { type: String, required: true },
    tagline: { type: String, required: true },

    // ✅ Flexible extras field
    extras: { type: Map, of: Schema.Types.Mixed },
  },
  { timestamps: true, strict: true }
);

export default mongoose.models.OfferPackage ||
  model("OfferPackage", OfferPackageSchema);
