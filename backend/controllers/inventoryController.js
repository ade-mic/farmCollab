import Inventory from "../models/Inventory.js";

class InventoryController {
  // Create an inventory
  static async createInventory(req, res) {
    try {
      const { farmId, produce } = req.body;
      const inventory = await Inventory.create({ farmId, produce });
      res.status(201).json({ success: true, message: "Inventory created successfully", inventory });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error creating inventory", error: error.message });
    }
  }

  // Get all inventories
  static async getAllInventories(req, res) {
    try {
      const inventories = await Inventory.find().populate("farmId", "name location");
      res.status(200).json({ success: true, inventories });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching inventories", error: error.message });
    }
  }

  // Get inventory by ID
  static async getInventoryById(req, res) {
    try {
      const { id } = req.params;
      const inventory = await Inventory.findById(id).populate("farmId", "name location");
      if (!inventory) {
        return res.status(404).json({ success: false, message: "Inventory not found" });
      }
      res.status(200).json({ success: true, inventory });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching inventory", error: error.message });
    }
  }

  // Update inventory
  static async updateInventory(req, res) {
    try {
      const { id } = req.params;
      const updatedInventory = await Inventory.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedInventory) {
        return res.status(404).json({ success: false, message: "Inventory not found" });
      }
      res.status(200).json({ success: true, message: "Inventory updated successfully", inventory: updatedInventory });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating inventory", error: error.message });
    }
  }

  // Delete inventory
  static async deleteInventory(req, res) {
    try {
      const { id } = req.params;
      const deletedInventory = await Inventory.findByIdAndDelete(id);
      if (!deletedInventory) {
        return res.status(404).json({ success: false, message: "Inventory not found" });
      }
      res.status(200).json({ success: true, message: "Inventory deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting inventory", error: error.message });
    }
  }
}

export default InventoryController;
