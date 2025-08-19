import express from "express";
import { verifyTokenMiddleware } from "../../middleware/verifyTokenMiddleware.js";
import { createSales, getAllSalesPaginatedPost } from "../../controllers/inventoryC/salesC/sales.controller.js";

const router = express.Router();

// 🔹 Sales Routes
router.post("/sales/create", verifyTokenMiddleware, createSales);
router.post("/sales/search", verifyTokenMiddleware, getAllSalesPaginatedPost);

// router.get("/unitOfMeasurement/getAll", getUnitOfMeasurements);
// router.post("/unitOfMeasurement/search", getUnitOfMeasurementPaginatedPost);
// router.get("/unitOfMeasurement/:id", getUnitOfMeasurementById);
// router.put("/unitOfMeasurement/:id", verifyTokenMiddleware, updateUnitOfMeasurement);
// router.delete("/unitOfMeasurement/:id", verifyTokenMiddleware, deleteUnitOfMeasurement);

export default router;
