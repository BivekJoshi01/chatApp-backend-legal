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

const router = express.Router();

router.post("/agent/create", addAgent);
router.get("/agent/getAll", getAllAgents);
router.post("/agent/search", getAgentPaginatedPost);

router.post("/area/create", addArea);
router.get("/area/getAll", getAllAreas);
router.get("/area/paginated", getAreasPaginated);

router.post("/customer/create", createCustomer);
router.get("/customer/getAll", getCustomers);
router.post("/customer/search", getCustomerPaginatedPost);

router.post("/supplier/create", createSupplier);
router.get("/supplier/getAll", getSuppliers);
router.post("/supplier/search", getSupplierPaginatedPost);

export default router;
