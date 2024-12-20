import mongoose from "mongoose";

const { Schema, model } = mongoose;

const InventorySchema = new Schema(
  {
    farmId: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    pricePerUnit: { type: Number, default: 0, required: true, min: 0 },
    unit: { type: String, default: "kg", enum: ["kg", "liter", "ton", "piece"] },
    available: { type: Boolean, default: true },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Inventory", InventorySchema);
