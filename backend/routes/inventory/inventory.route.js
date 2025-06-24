import express from "express";

import {
  createUnitOfMeasurement,
  getUnitOfMeasurements,
  getUnitOfMeasurementPaginatedPost,
} from "../../controllers/inventoryC/productC/unitOfMeasurement.contoller.js";

import {
  createProductType,
  getProductTypes,
  getProductTypePaginatedPost,
  getProductTypeById,
  updateProductType,
  deleteProductType,
  searchProductTypes
} from "../../controllers/inventoryC/productC/productType.controller.js";

import {
  createProductCompany,
  getProductCompanies,
  getProductCompanyPaginatedPost,
  getProductCompanyById,
  updateProductCompany,
  deleteProductCompany
} from "../../controllers/inventoryC/productC/productCompany.controller.js";

import {
  createProductGroup,
  getProductGroups,
  getProductGroupPaginatedPost,
  getProductGroupById,
  updateProductGroup,
  deleteProductGroup,
  getProductGroupsByType
} from "../../controllers/inventoryC/productC/productGroup.controller.js";

import {
  createProductManagement,
  getProductManagements,
  getProductManagementPaginatedPost,
  getProductManagementById,
  updateProductManagement,
  deleteProductManagement,
  searchProductManagements
} from "../../controllers/inventoryC/productC/productManagement.controller.js";

const router = express.Router();

// Unit of Measurement routes
router.route("/unitOfMeasurement/create").post(createUnitOfMeasurement);
router.route("/unitOfMeasurement/getAll").get(getUnitOfMeasurements);
router.route("/unitOfMeasurement/search").post(getUnitOfMeasurementPaginatedPost);

// Product Type routes
router.route("/productType/create").post(createProductType);
router.route("/productType/getAll").get(getProductTypes);
router.route("/productType/search").post(getProductTypePaginatedPost);
router.route("/productType/:id").get(getProductTypeById);
router.route("/productType/:id").put(updateProductType);
router.route("/productType/:id").delete(deleteProductType);
router.route("/productType/keyword").get(searchProductTypes);

// Product Company routes
router.route("/productCompany/create").post(createProductCompany);
router.route("/productCompany/getAll").get(getProductCompanies);
router.route("/productCompany/search").post(getProductCompanyPaginatedPost);
router.route("/productCompany/:id").get(getProductCompanyById);
router.route("/productCompany/:id").put(updateProductCompany);
router.route("/productCompany/:id").delete(deleteProductCompany);

// Product Group routes
router.route("/productGroup/create").post(createProductGroup);
router.route("/productGroup/getAll").get(getProductGroups);
router.route("/productGroup/search").post(getProductGroupPaginatedPost);
router.route("/productGroup/:id").get(getProductGroupById);
router.route("/productGroup/:id").put(updateProductGroup);
router.route("/productGroup/:id").delete(deleteProductGroup);
router.route("/productGroup/type/:typeId").get(getProductGroupsByType);

// Product Management routes
router.route("/productManagement/create").post(createProductManagement);
router.route("/productManagement/getAll").get(getProductManagements);
router.route("/productManagement/search").post(getProductManagementPaginatedPost);
router.route("/productManagement/:id").get(getProductManagementById);
router.route("/productManagement/:id").put(updateProductManagement);
router.route("/productManagement/:id").delete(deleteProductManagement);
router.route("/productManagement/keyword").get(searchProductManagements);

export default router;
