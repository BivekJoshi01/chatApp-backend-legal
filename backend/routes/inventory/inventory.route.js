import express from "express";;

const {
  createUnitOfMeasurement,
  getUnitOfMeasurements,
  getUnitOfMeasurementPaginatedPost,
} = require("../../controllers/inventoryC/productC/unitOfMeasurement.contoller");

const router = express.Router();

router.route("/unitOfMeasurement/create").post(createUnitOfMeasurement);
router.route("/unitOfMeasurement/getAll").get(getUnitOfMeasurements);
router.route("/unitOfMeasurement/search").post(getUnitOfMeasurementPaginatedPost);

export default router;
