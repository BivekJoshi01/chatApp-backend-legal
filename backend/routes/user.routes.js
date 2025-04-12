const express = require("express");
const { registerUser } = require("../controllers/auth/user.controller");

const router = express.Router();

router.route("/").post(registerUser);
// router.route("/login")

module.exports = router;
