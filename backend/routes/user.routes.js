const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/auth/user.controller");
const { protect } = require("../middleware/authMiddleware");
// const { addCompany } = require("../controllers/utilitiesC/company.controller");

const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", authUser);
router.route("/getAll").get(protect, allUsers);

// router.route("/company").post(addCompany);

module.exports = router;
