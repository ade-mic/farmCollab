import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OrderSchema = new Schema(
  {
    buyerId: {
      type: String,
      ref: "User",
       required: true
    },
    inventoryId: {
      type: String,
      ref: "Inventory",
      required: true,
    },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered"],
      default: "Pending",
    },
    currency: {
      type: String,
      default: "NGN",
      required: true
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
