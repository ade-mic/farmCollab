import mongoose from "mongoose";
import Order from "../models/Order.js";
import Inventory from "../models/Inventory.js";

class OrderController {
  // Create a new order
  static async placeOrder(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const buyerId = req.user?.id;
      const { items } = req.body;

      // Validate user authentication
      if (!buyerId) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }

      // Validate input data
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, message: "Invalid input data" });
      }

      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 2);

      // Aggregate items by inventory ID to avoid duplicate orders
      const aggregatedItems = items.reduce((acc, item) => {
        if (!acc[item._id]) {
          acc[item._id] = { ...item, quantity: 0 };
        }
        acc[item._id].quantity += item.quantity;
        return acc;
      }, {});

      const orders = [];

      for (const item of Object.values(aggregatedItems)) {
        const inventoryId = item._id;
        const { quantity } = item;

        if (!inventoryId || !Number.isInteger(quantity) || quantity <= 0) {
          await session.abortTransaction();
          return res.status(400).json({ success: false, message: "Invalid input data" });
        }

        const inventoryItem = await Inventory.findOneAndUpdate(
          { _id: inventoryId, quantity: { $gte: quantity } },
          { $inc: { quantity: -quantity } },
          { new: true, session }
        );

        if (!inventoryItem) {
          await session.abortTransaction();
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${item.name} or item not found`,
          });
        }

        const totalPrice = inventoryItem.pricePerUnit * quantity;

        const order = await Order.create(
          [
            {
              buyerId,
              inventoryId,
              quantity,
              totalPrice,
              status: "Pending",
              deliveryDate,
            },
          ],
          { session }
        );

        orders.push(order[0]);
      }

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        orders,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error placing order:", error);
      res.status(500).json({
        success: false,
        message: "Error placing order",
        error: error.message,
      });
    }
  }

  // Get all orders
  static async getAllOrders(req, res) {
    try {
      const orders = await Order.find()
        .populate("buyerId", "name")
        .populate({ path: "inventoryId", select: "name unit" });
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching orders",
        error: error.message,
      });
    }
  }

  // Get a single order by ID
  static async getOrderById(req, res) {
    try {
      const { id } = req.params;

      const order = await Order.findById(id)
        .populate("buyerId", "name")
        .populate({ path: "inventoryId", select: "name unit" });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching order",
        error: error.message,
      });
    }
  }

  // Update an order's quantity or delivery date
  static async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const { quantity, deliveryDate } = req.body;

      if (!quantity || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Invalid input data",
        });
      }

      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      const inventoryItem = await Inventory.findById(order.inventoryId);
      if (!inventoryItem) {
        return res.status(404).json({ success: false, message: "Inventory item not found" });
      }

      const totalPrice = inventoryItem.pricePerUnit * quantity;
      order.quantity = quantity;
      order.totalPrice = totalPrice;

      if (deliveryDate) {
        order.deliveryDate = new Date(deliveryDate);
      }

      await order.save();

      res.status(200).json({
        success: true,
        message: "Order updated successfully",
        order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating order",
        error: error.message,
      });
    }
  }

  // Update order status
  static async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["Pending", "Shipped", "Delivered"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      const order = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating order status",
        error: error.message,
      });
    }
  }

  // Delete an order
  static async deleteOrder(req, res) {
    try {
      const { id } = req.params;

      const order = await Order.findByIdAndDelete(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Order deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting order",
        error: error.message,
      });
    }
  }

  // Get all orders by a specific user
  static async getUserOrders(req, res) {
    try {
      const buyerId = req.user.id;

      const orders = await Order.find({ buyerId })
        .populate("buyerId", "name")
        .populate({ path: "inventoryId", select: "name unit" });

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching user orders",
        error: error.message,
      });
    }
  }

  // Get all orders by a specific seller
  static async getSellerOrders(req, res) {
    try {
      const sellerId = req.user.id;
  
      // Find all inventory items associated with the seller
      const sellerInventoryIds = await Inventory.find({ userId: sellerId }).distinct("_id");
  
      // Find orders where the inventoryId matches any of the seller's inventory
      const orders = await Order.find({ inventoryId: { $in: sellerInventoryIds } })
      // Populate buyer details with just the name
        .populate("buyerId", "name") 
        .populate({ path: "inventoryId", select: "itemName unit" }); // Populate inventory details with just the name and unit
  
      // Respond with the orders
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      // Handle errors
      res.status(500).json({
        success: false,
        message: "Error fetching seller orders",
        error: error.message,
      });
    }
  }
  
}

export default OrderController;
