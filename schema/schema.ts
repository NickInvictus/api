import mongoose, { Schema } from "mongoose";

const carSchema: Schema = new mongoose.Schema({
  brand: String,
  model: String,
  price: Number,
  year: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Car = mongoose.model("Car", carSchema);
