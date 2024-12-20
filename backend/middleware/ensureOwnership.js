import Order from '../models/Order.js';
import Inventory from '../models/Inventory.js';
import Farm from '../models/Farm.js';
import Project from '../models/Projects.js';


class EnsureOwnership {
  static async order(req, res, next) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }

      if (order.buyerId !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to modify this order"
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching order during ensureOwnership",
        error: error.message
      });
    }
  }

  static async inventory(req, res, next) {
    try {
      const inventory = await Inventory.findById(req.params.id);
      if (!inventory) {
        return res.status(404).json({
          success: false,
          message: "Inventory not found"
        });
      }

      if (inventory.farmId !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to modify this inventory"
        });
      }
      next(); 
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching inventory during ensureOwnership",
        error: error.message
      });
    }
  }

  static async farm(req, res, next) {
    try {
      const farm = await Farm.findById(req.params.id);
      if (!farm) {
        return res.status(404).json({
          success: false,
          message: "Farm not found"
        });
      }

      if (farm.owner !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to modify this farm"
        });
      }
      next(); 
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching farm during ensureOwnership",
        error: error.message
      });
    }
  }

  static async project(req, res, next) {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found"
        });
      }

      if (project.creatorId !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to modify this project"
        });
      }
      next(); 
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching project during ensureOwnership",
        error: error.message
      });
    }
  }
}


export default EnsureOwnership;