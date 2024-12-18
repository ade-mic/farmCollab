import Project from "../models/Projects.js";

class ProjectController {
  // Create a new project
  static async createProject(req, res) {
    try {
      const { title, description, goalAmount, currency } = req.body;
      const creatorId = req.user.id;
      const project = await Project.create({ title, description, goalAmount, creatorId, currency });
      res.status(201).json({ success: true, message: "Project created successfully", project });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error creating project", error: error.message });
    }
  }

  // Get all projects
  static async getAllProjects(req, res) {
    try {
      const projects = await Project.find().populate("participants", "name");
      res.status(200).json({ success: true, projects });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching projects", error: error.message });
    }
  }

  // Get a single project by ID
  static async getProjectById(req, res) {
    try {
      const { id } = req.params;
      const project = await Project.findById(id).populate("participants", "name");
      if (!project) {
        return res.status(404).json({ success: false, message: "Project not found" });
      }
      res.status(200).json({ success: true, project });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching project", error: error.message });
    }
  }

  // Update project details
  static async updateProject(req, res) {
    try {
      const { id } = req.params;
      const updatedProject = await Project.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProject) {
        return res.status(404).json({ success: false, message: "Project not found" });
      }
      res.status(200).json({ success: true, message: "Project updated successfully", project: updatedProject });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating project", error: error.message });
    }
  }

  // Delete a project
  static async deleteProject(req, res) {
    try {
      const { id } = req.params;
      const deletedProject = await Project.findByIdAndDelete(id);
      if (!deletedProject) {
        return res.status(404).json({ success: false, message: "Project not found" });
      }
      res.status(200).json({ success: true, message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting project", error: error.message });
    }
  }

    // Subscribe to a project by contributing money
    static async subscribeToProject(req, res) {
      try {
        const { id } = req.params;  // Project ID from URL
        const { contributionAmount } = req.body;  // Amount contributed by the user
  
        // Ensure contribution amount is a positive number
        if (contributionAmount <= 0) {
          return res.status(400).json({ success: false, message: "Contribution amount must be greater than zero" });
        }
  
        // Find the project by ID
        const project = await Project.findById(id);
  
        if (!project) {
          return res.status(404).json({ success: false, message: "Project not found" });
        }
  
        // Update the current amount of the project
        project.currentAmount += contributionAmount;
  
        // Add the user to the participants array
        const userId = req.user.id;  // Get the logged-in user's ID from the JWT or session
        if (!project.participants.includes(userId)) {
          project.participants.push(userId);  // Add user if not already a participant
        }
  
        // Save the updated project
        await project.save();
  
        res.status(200).json({ 
          success: true, 
          message: "Successfully subscribed to the project", 
          project 
        });
      } catch (error) {
        res.status(500).json({ 
          success: false, 
          message: "Error subscribing to project", 
          error: error.message 
        });
      }
    }
  
}

export default ProjectController;
