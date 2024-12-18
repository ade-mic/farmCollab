import mongoose from "mongoose";
import { randomUUID } from "crypto";

const { Schema, model } = mongoose;

const ProduceSchema = new Schema({
  name: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 0 },
  pricePerUnit: { type: Number, required: true, min: 0 },
  unit: { type: String, default: "kg", enum: ["kg", "liter", "ton", "piece"] },
  available: { type: Boolean, default: true },
});

const InventorySchema = new Schema(
  {
    inventoryId: {
      type: String,
      default: () => randomUUID(),
      unique: true,
      index: true,
    },
    farmId: {
      type: Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
      index: true,
    },
    produce: {
      type: [ProduceSchema],
      validate: {
        validator: function (items) {
          return items.length > 0;
        },
        message: "At least one produce item is required.",
      },
    },
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
