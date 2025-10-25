import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MessageSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
}, { timestamps: true });

export const Message = mongoose.models.Message || model("Message", MessageSchema);
