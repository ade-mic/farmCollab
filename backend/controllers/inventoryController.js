import Farm from "../models/Farm.js";
import Inventory from "../models/Inventory.js";

class InventoryController {
  // Create an inventory
  static async createInventory(req, res) {
    try {
      const { farmId } = req.params
      const { name, quantity, pricePerUnit, unit, available }  = req.body;
      const inventoryItem = new Inventory({
        farmId,
        name,
        quantity,
        pricePerUnit,
        unit,
        available
      });
      const savedItem = await inventoryItem.save();
      await Farm.findByIdAndUpdate(farmId, {
        $push: { inventory: savedItem._id},
      });

      res.status(201).json({ success: true, message: "Inventory created successfully", savedItem });
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
      const updatedInventory = await Inventory.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
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
      const { farmId, id } = req.params;
      const deletedInventory = await Inventory.findByIdAndDelete(id);

      // Remove reference from the farm
      await Farm.findByIdAndUpdate(farmId, {
        $pull: { inventory: id },
      });

      if (!deletedInventory) {
        return res.status(404).json({ success: false, message: "Inventory not found" });
      }
      res.status(200).json({ success: true, message: "Inventory deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting inventory", error: error.message });
    }
  }

    // Get all inventory items associated with a user
  static async getUserInventory(req, res) {
    try {
      const userId = req.user.id;
      const inventory = await Inventory.find({ userId });
      res.status(200).json({ success: true, inventory });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching user's inventory", error: error.message });
    }
  }
  
}

export default InventoryController;
