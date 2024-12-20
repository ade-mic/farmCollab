import Order from "../models/Order.js";
import Inventory from "../models/Inventory.js";

class OrderController {
  // Create a new order
  static async placeOrder(req, res) {
    try {
      const inventoryId = req.params;
      const buyerId = req.user.id
      const { status, deliveryDate } = req.body;

      // validate input
      if (!inventoryId || quantity <=0 ) {
        return res.status(400).json({ success: false, message: "Invalid input data" });
      }

      // find the inventory item
      const inventoryItem = await Inventory.findById(inventoryId);
      if (!inventoryItem) {
        return res.status(404).json({
          success: false,
          message: "inventory item not found"
        })
      }

      // check stock availability
      if (inventoryItem.quantity === 0) {
        return res.status(404).json({
          success: false,
          message: "Out of stock"
        })
      }

      if (inventoryItem.quantity < quantity) {
        return res.status(400).json({
        success: false,
        message: `Insufficient stock. Only ${inventoryItem.quantity} ${inventoryItem.unit}`})
      }

      productName = inventoryItem.name;
      productUnit = inventoryItem.unit;

          // Calculate total price
      const totalPrice = inventoryItem.pricePerUnit * quantity;

      // Create the order
      const order = await Order.create({
        buyerId,
        inventoryId,
        quantity,
        totalPrice,
        productName,
        productUnit,
        status: status || "Pending",
        deliveryDate,
      });

      // Update inventory quantity
      inventoryItem.quantity -= quantity;
      await inventoryItem.save();

      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order,
      });
    } catch (error) {
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
      const orders = await Order.find().populate("buyerId", "name").populate("farmerId", "name");
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

      const order = await Order.findById(id).populate("buyerId", "name").populate("farmerId", "name");

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
        { new: true } // Return the updated document
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
}

export default OrderController;
