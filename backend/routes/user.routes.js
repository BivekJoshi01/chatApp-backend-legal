const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/auth/user.controller");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/").get(protect, allUsers);

module.exports = router;
