import mongoose from "mongoose";
const { Schema, model } = mongoose;

const BookingSchema = new Schema({
  // Package details (at top as requested)
  route: { type: String, required: true },
  days: { type: Number, required: true },
  nights: { type: Number, required: true },
  
  // Package info
  title: { type: String, required: true }, // Nepal Himalayan Kingdom
  price: { type: String, required: true }, // 25999
  
  // Customer details
  fullName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  numberOfPeople: { type: Number, required: true }, // the "1" field in form
  
  // Optional field
  additionalMessages: { type: String, required: false }, // "Additional messages or Requirements..."
  
  // Booking status
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  }
}, { timestamps: true });

export const Booking = mongoose.models.Booking || model("Booking", BookingSchema);