import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ReferralSchema = new Schema({
  keyword: { type: String, required: true}, // each keyword must be unique
  routes: { type: [String], required: true }, // array of package route strings
}, { timestamps: true });

export const Referral = mongoose.models.Referral || model("Referral", ReferralSchema);
