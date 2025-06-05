import express from "express";

import {
  addAgent,
  getAllAgents,
  getAgentPaginatedPost,
} from "../../controllers/customerSuppliersController/agent.controller.js";

import {
  addArea,
  getAllAreas,
  getAreasPaginated,
} from "../../controllers/customerSuppliersController/area.controller.js";

import {
  createCustomer,
  getCustomers,
  getCustomerPaginatedPost,
} from "../../controllers/customerSuppliersController/customer.controller.js";

import {
  createSupplier,
  getSuppliers,
  getSupplierPaginatedPost,
} from "../../controllers/customerSuppliersController/supplier.controller.js";
import { verifyTokenMiddleware } from "../../middleware/verifyTokenMiddleware.js";

const router = express.Router();

router.post("/agent/create", verifyTokenMiddleware, addAgent);
router.get("/agent/getAll", verifyTokenMiddleware, getAllAgents);
router.post("/agent/search", verifyTokenMiddleware, getAgentPaginatedPost);

router.post("/area/create", verifyTokenMiddleware, addArea);
router.get("/area/getAll", verifyTokenMiddleware, getAllAreas);
router.get("/area/paginated", verifyTokenMiddleware, getAreasPaginated);

router.post("/customer/create", verifyTokenMiddleware, createCustomer);
router.get("/customer/getAll", verifyTokenMiddleware, getCustomers);
router.post(
  "/customer/search",
  verifyTokenMiddleware,
  getCustomerPaginatedPost
);

router.post("/supplier/create", createSupplier);
router.get("/supplier/getAll", getSuppliers);
router.post("/supplier/search", getSupplierPaginatedPost);

export default router;
