import mongoose from "mongoose";

const { Schema, model } = mongoose;

const InventorySchema = new Schema(
  {
    userId: { type: String, required: true },
    farmId: { type: String, required: true },
    itemName: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    pricePerUnit: { type: Number, default: 0, required: true, min: 0 },
    currency: { type: String, default: "NGN" },
    unit: { type: String, default: "kg", enum: ["kg", "liter", "ton", "piece"] },
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
