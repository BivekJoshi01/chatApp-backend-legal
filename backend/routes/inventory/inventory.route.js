const express = require("express");

const {
  createUnitOfMeasurement,
  getUnitOfMeasurements,
  getUnitOfMeasurementPaginatedPost,
} = require("../../controllers/inventoryC/unitOfMeasurement.contoller");

const router = express.Router();

router.route("/unitOfMeasurement/create").post(createUnitOfMeasurement);
router.route("/unitOfMeasurement/getAll").get(getUnitOfMeasurements);
router.route("/unitOfMeasurement/search").post(getUnitOfMeasurementPaginatedPost);

module.exports = router;
