import Farm from "../models/Farm.js";
import dbClient from "../utils/db.js";

class FarmController {
  // Create a new farm
  static async createFarm(req, res) {
    try {
      const { name, location, size } = req.body;
      const owner = req.user.id
      const farm = await Farm.create({name, location, owner, size });
      res.status(201).json({ success: true, message: "Farm created successfully", farm });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error creating farm", error: error.message });
    }
  }

  // Get all farms
  static async getAllFarms(req, res) {
    try {
      const farms = await Farm.find().populate("owner", "name");
      res.status(200).json({ success: true, farms });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching farms", error: error.message });
    }
  }

  // Get a single farm by ID
  static async getFarmById(req, res) {
    try {
      const { id } = req.params;
      const farm = await Farm.findById(id).populate("owner", "name");
      if (!farm) {
        return res.status(404).json({ success: false, message: "Farm not found" });
      }
      res.status(200).json({ success: true, farm });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching farm", error: error.message });
    }
  }

  // Update farm details
  static async updateFarm(req, res) {
    try {
      const { id } = req.params;
      const updatedFarm = await Farm.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedFarm) {
        return res.status(404).json({ success: false, message: "Farm not found" });
      }
      res.status(200).json({ success: true, message: "Farm updated successfully", farm: updatedFarm });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating farm", error: error.message });
    }
  }

  // Delete a farm
  static async deleteFarm(req, res) {
    try {
      const { id } = req.params;
      const deletedFarm = await Farm.findByIdAndDelete(id);
      if (!deletedFarm) {
        return res.status(404).json({ success: false, message: "Farm not found" });
      }
      res.status(200).json({ success: true, message: "Farm deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting farm", error: error.message });
    }
  }
}

export default FarmController;
