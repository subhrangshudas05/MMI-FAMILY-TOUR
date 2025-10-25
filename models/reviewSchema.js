import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ReviewSchema = new Schema({
  pkgTitle: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  stars: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5,
    validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value for stars.'
    }
  },
  comment: { type: String, trim: true },
  // NEW: Approval and ordering fields
  approved: { type: Boolean, default: false },
  displayOrder: { type: Number, default: 9999 } // Default to a high number to place new items last
}, { timestamps: true });

export const Review = mongoose.models.Review || model("Review", ReviewSchema);
