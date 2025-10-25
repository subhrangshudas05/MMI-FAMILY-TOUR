import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PlaceSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true }
});

const PlanSchema = new Schema({
  title: { type: String, required: true },
  plan: { type: String, required: true }
});

const PackageSchema = new Schema({
  route: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  overview: { type: String, required: true },
  places: { type: [PlaceSchema], required: true },
  plans: { type: [PlanSchema], required: true },
  ds: { type: String, required: true },
  ns: { type: String, required: true },
  price: { type: String, required: true },

  // Flexible extras field
  extras: { type: Map, of: Schema.Types.Mixed } 
}, { timestamps: true, strict: true });

export default mongoose.models.Package || model("Package", PackageSchema);
