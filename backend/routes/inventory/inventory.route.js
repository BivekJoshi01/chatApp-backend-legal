import express from "express";;

import {
  createUnitOfMeasurement,
  getUnitOfMeasurements,
  getUnitOfMeasurementPaginatedPost,
} from "../../controllers/inventoryC/productC/unitOfMeasurement.contoller.js";

const router = express.Router();

router.route("/unitOfMeasurement/create").post(createUnitOfMeasurement);
router.route("/unitOfMeasurement/getAll").get(getUnitOfMeasurements);
router.route("/unitOfMeasurement/search").post(getUnitOfMeasurementPaginatedPost);

export default router;
