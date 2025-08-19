import express from "express";
import {
  createUnitOfMeasurement,
  getUnitOfMeasurements,
  getUnitOfMeasurementPaginatedPost,
  getUnitOfMeasurementById,
  updateUnitOfMeasurement,
  deleteUnitOfMeasurement,
} from "../../controllers/inventoryC/productC/unitOfMeasurement.contoller.js";

import {
  createProductType,
  getProductTypes,
  getProductTypePaginatedPost,
  getProductTypeById,
  updateProductType,
  deleteProductType,
  searchProductTypes,
} from "../../controllers/inventoryC/productC/productType.controller.js";

import {
  createProductCompany,
  getProductCompanies,
  getProductCompanyPaginatedPost,
  getProductCompanyById,
  updateProductCompany,
  deleteProductCompany,
} from "../../controllers/inventoryC/productC/productCompany.controller.js";

import {
  createProductGroup,
  getProductGroups,
  getProductGroupPaginatedPost,
  getProductGroupById,
  updateProductGroup,
  deleteProductGroup,
  getProductGroupsByType,
} from "../../controllers/inventoryC/productC/productGroup.controller.js";

import {
  createProductManagement,
  getProductManagements,
  getProductManagementPaginatedPost,
  getProductManagementById,
  updateProductManagement,
  deleteProductManagement,
  searchProductManagements,
} from "../../controllers/inventoryC/productC/productManagement.controller.js";

import { verifyTokenMiddleware } from "../../middleware/verifyTokenMiddleware.js";

const router = express.Router();

// 🔹 Unit of Measurement Routes
router.post("/unitOfMeasurement/create", verifyTokenMiddleware, createUnitOfMeasurement);
router.get("/unitOfMeasurement/getAll", getUnitOfMeasurements);
router.post("/unitOfMeasurement/search", getUnitOfMeasurementPaginatedPost);
router.get("/unitOfMeasurement/:id", getUnitOfMeasurementById);
router.put("/unitOfMeasurement/:id", verifyTokenMiddleware, updateUnitOfMeasurement);
router.delete("/unitOfMeasurement/:id", verifyTokenMiddleware, deleteUnitOfMeasurement);

// 🔹 Product Type Routes
router.post("/productType/create", verifyTokenMiddleware, createProductType);
router.get("/productType/getAll", getProductTypes);
router.post("/productType/search", getProductTypePaginatedPost);
router.get("/productType/:id", getProductTypeById);
router.put("/productType/:id", verifyTokenMiddleware, updateProductType);
router.delete("/productType/:id", verifyTokenMiddleware, deleteProductType);
router.get("/productType/keyword", searchProductTypes);

// 🔹 Product Company Routes
router.post("/productCompany/create", verifyTokenMiddleware, createProductCompany);
router.get("/productCompany/getAll", getProductCompanies);
router.post("/productCompany/search", getProductCompanyPaginatedPost);
router.get("/productCompany/:id", getProductCompanyById);
router.put("/productCompany/:id", verifyTokenMiddleware, updateProductCompany);
router.delete("/productCompany/:id", verifyTokenMiddleware, deleteProductCompany);

// 🔹 Product Group Routes
router.post("/productGroup/create", verifyTokenMiddleware, createProductGroup);
router.get("/productGroup/getAll", getProductGroups);
router.post("/productGroup/search", getProductGroupPaginatedPost);
router.get("/productGroup/:id", getProductGroupById);
router.put("/productGroup/:id", verifyTokenMiddleware, updateProductGroup);
router.delete("/productGroup/:id", verifyTokenMiddleware, deleteProductGroup);
router.get("/productGroup/type/:typeId", getProductGroupsByType);

// 🔹 Product Management Routes
router.post("/productManagement/create", verifyTokenMiddleware, createProductManagement);
router.get("/productManagement/getAll", getProductManagements);
router.post("/productManagement/search", getProductManagementPaginatedPost);
router.get("/productManagement/:id", getProductManagementById);
router.put("/productManagement/:id", verifyTokenMiddleware, updateProductManagement);
router.delete("/productManagement/:id", verifyTokenMiddleware, deleteProductManagement);
router.get("/productManagement/keyword", searchProductManagements);

export default router;
