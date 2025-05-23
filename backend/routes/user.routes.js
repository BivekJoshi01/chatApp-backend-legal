import express from "express";
import { login, logout, signup, verifyEmail } from "../controllers/auth/auth.controller.js";
// const {
//   registerUser,
//   authUser,
//   allUsers,
//   getUserById,
// } = require("../controllers/auth/user.controller");
// const { protect } = require("../middleware/authMiddleware");
// const { addCompany } = require("../controllers/utilitiesC/company.controller");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);


// router.route("/register").post(registerUser);
// router.post("/login", authUser);
// router.route("/getAll").get(protect, allUsers);
// router.route("/:id").get(protect, getUserById);

// router.route("/company").post(addCompany);

export default router;
