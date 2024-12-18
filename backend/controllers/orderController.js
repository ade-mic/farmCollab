import Order from "../models/Order.js";

class OrderController {
  // Create a new order
  static async createOrder(req, res) {
    try {
      const { buyerId, farmerId, products, status, deliveryDate } = req.body;
      
      // Create the order
      const order = await Order.create({
        buyerId,
        farmerId,
        products,
        status: status || "Pending",
        deliveryDate,
      });

      res.status(201).json({
        success: true,
        message: "Order created successfully",
        order,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating order",
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
