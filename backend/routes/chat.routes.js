import express from "express";
const { protect } = require("../middleware/authMiddleware");

const {
  accessChat,
  fetchChat,
  createGroup,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chat/chat.controller");

const router = express.Router();

router.route("/accessChat").post(protect, accessChat);
router.route("/fetchChat").get(protect, fetchChat);
router.route("/createGroup").post(protect, createGroup);
router.route("/renameGroup").put(protect, renameGroup);
router.route("/groupadd").put(protect, addToGroup);
router.route("/groupremove").put(protect, removeFromGroup);

module.exports = router;
