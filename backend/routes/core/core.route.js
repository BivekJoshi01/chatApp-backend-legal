const express = require("express");

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


module.exports = router;
