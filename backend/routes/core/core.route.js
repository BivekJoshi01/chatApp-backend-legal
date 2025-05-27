import express from "express";;

const {
  addAgent,
  getAllAgents,
  getAgentPaginatedPost,
} = require("../../controllers/customerSuppliersController/agent.controller");
const {
  addArea,
  getAllAreas,
  getAreasPaginated,
} = require("../../controllers/customerSuppliersController/area.controller");
const {
  createCustomer,
  getCustomers,
  getCustomerPaginatedPost,
} = require("../../controllers/customerSuppliersController/customer.controller");
const {
  createSupplier,
  getSuppliers,
  getSupplierPaginatedPost,
} = require("../../controllers/customerSuppliersController/supplier.controller");

const router = express.Router();

router.route("/agent/create").post(addAgent);
router.route("/agent/getAll").get(getAllAgents);
router.route("/agent/search").post(getAgentPaginatedPost);

router.route("/area/create").post(addArea);
router.route("/area/getAll").get(getAllAreas);
router.route("/area/paginated").get(getAreasPaginated);

router.route("/customer/create").post(createCustomer);
router.route("/customer/getAll").get(getCustomers);
router.route("/customer/search").post(getCustomerPaginatedPost);

router.route("/supplier/create").post(createSupplier);
router.route("/supplier/getAll").get(getSuppliers);
router.route("/supplier/search").post(getSupplierPaginatedPost);

export default router;
