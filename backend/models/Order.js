import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OrderSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    farmerId: {
      type: Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },
    products: [
      {
        produce: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 }, 
      },
    ],
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
