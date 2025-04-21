const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/auth/user.controller");
const { protect } = require("../middleware/authMiddleware");
const { addCompany } = require("../controllers/utilitiesC/company.controller");
const { addArea } = require("../controllers/customerSuppliersController/area.controller");

const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", authUser);
router.route("/getAll").get(protect, allUsers);

router.route("/company").post(addCompany);
router.route("/area").post(addArea);



module.exports = router;
