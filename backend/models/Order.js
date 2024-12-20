import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OrderSchema = new Schema(
  {
    inventoryId: {
      type: String,
      ref: "Inventory",
      required: true,
    },
    quantity: { type: Number, required: true },
    unit: {type: String, required: true},
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
    deliveryDate: {
      type: Date,
      required: false,
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


export default model("Order", OrderSchema);
