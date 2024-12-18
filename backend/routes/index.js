import express from 'express';
import UserController from '../controllers/userController.js'
import ProjectController from '../controllers/projectController.js';
import OrderController from '../controllers/orderController.js';
import FarmController from '../controllers/farmController.js';
import InventoryController from '../controllers/inventoryController.js';
import isAuthenticate from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorization.js';


const router = express.Router();
// User Route
router.post('/register',  UserController.createUser);
router.post('/login', UserController.userLogin);
router.get('/me', isAuthenticate, UserController.getMe);
router.post('/logout', UserController.logout);
router.get('/users',isAuthenticate, UserController.getAllUsers);
// router.get('/users/:id', UserController.getUserById);
router.get('/users/:id', isAuthenticate, UserController.getUserById);
router.put('/users/:id', isAuthenticate, UserController.updateUser);
router.delete('/users/:id', isAuthenticate, UserController.deleteUser);

// Project Routes
router.post('/projects', isAuthenticate,
  authorizeRoles('Farmer'),
  ProjectController.createProject
);
router.get('/projects', ProjectController.getAllProjects);
router.get('/projects/:id', ProjectController.getProjectById);
router.put('/projects/:id',
  isAuthenticate,
  authorizeRoles('Farmer'),
   ProjectController.updateProject
  );
router.delete('/projects/:id',
  isAuthenticate,
  authorizeRoles('Farmer'),
  ProjectController.deleteProject
);

// Route for subscribing to a project
router.post('/projects/:id/subscribe', isAuthenticate, ProjectController.subscribeToProject);

// Order Routes
router.post('/orders',
  isAuthenticate,
  authorizeRoles('Farmer'),
  OrderController.createOrder);
router.get('/orders', OrderController.getAllOrders);
router.get('/orders/:id', OrderController.getOrderById);
router.put('/orders/:id/status', OrderController.updateOrderStatus);
router.delete('/orders/:id', OrderController.deleteOrder);

// Farm Routes
router.post('/farms', FarmController.createFarm);
router.get('/farms', FarmController.getAllFarms);
router.get('/farms/:id', FarmController.getFarmById);
router.put('/farms/:id', FarmController.updateFarm);
router.delete('/farms/:id', FarmController.deleteFarm);

// Inventory Routes
router.post('/inventories', InventoryController.createInventory);
router.get('/inventories', InventoryController.getAllInventories);
router.get('/inventories/:id', InventoryController.getInventoryById);
router.put('/inventories/:id', InventoryController.updateInventory);
router.delete('/inventories/:id', InventoryController.deleteInventory);


export default router