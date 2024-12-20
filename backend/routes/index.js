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
// router.get('/users',isAuthenticate, UserController.getAllUsers);
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
router.post('/projects/:id/subscribe',
   isAuthenticate,
   ProjectController.subscribeToProject
);

// Farm Routes
router.post('/farms',
  isAuthenticate,
  authorizeRoles('Farmer'),
  FarmController.createFarm
);
router.get('/farms', FarmController.getAllFarms);
router.get('/farms/:id', FarmController.getFarmById);
router.put('/farms/:id',
  isAuthenticate,
  authorizeRoles('Farmer'),
   FarmController.updateFarm
);
router.delete('/farms/:id',
  isAuthenticate,
  authorizeRoles('Farmer'),
  FarmController.deleteFarm);


// Inventory Routes
router.post('/inventory/:farmId',
  isAuthenticate,
  authorizeRoles('Farmer'),
  InventoryController.createInventory
);
router.get('/inventory', InventoryController.getAllInventories);
router.get('/inventory/:id', InventoryController.getInventoryById);
router.put('/inventory/:id',
  isAuthenticate,
  authorizeRoles('Farmer'),
  InventoryController.updateInventory
);
router.delete('/inventory/:farmId/:id',
  isAuthenticate,
  authorizeRoles('Farmer'),
  InventoryController.deleteInventory
);


// Order Routes
router.post('/orders/:inventoryId',
  isAuthenticate,
  OrderController.placeOrder
);
router.get('/orders',
  isAuthenticate,
  OrderController.getAllOrders
);
router.get('/orders/:id',
  isAuthenticate,
  OrderController.getOrderById
);
router.put('/orders/:id/status',
  isAuthenticate,
  OrderController.updateOrderStatus
);
router.delete('/orders/:id',
  isAuthenticate,
  OrderController.deleteOrder
);


export default router