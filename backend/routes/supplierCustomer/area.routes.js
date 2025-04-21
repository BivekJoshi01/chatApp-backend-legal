const express = require("express");

const {
  addArea,
} = require("../../controllers/customerSuppliersController/area.controller");

const router = express.Router();

router.route("/area").post(addArea);

module.exports = router;
