import expressAsyncHandler from "express-async-handler";
import { buildSearchConditions } from "../../../config/heplerConditions.js";
import ProductManagement from "../../../models/inventory/productModel/product.management.model.js";

export const createProductManagement = expressAsyncHandler(async (req, res) => {
  // const productManagement = await ProductManagement.create(req.body);
  const product = new ProductManagement(req.body);
  await product.save(); 
  res.status(201).json({
    _id: product._id,
    message: "Product added successfully",
  });
});

export const getProductManagements = expressAsyncHandler(async (req, res) => {
  const productManagements = await ProductManagement.find();
  res.status(200).json(productManagements);
});

export const getProductManagementPaginatedPost = expressAsyncHandler(
  async (req, res) => {
    const { pageSize = 10, pageNumber = 1, ...searchFields } = req.body;

    if (searchFields.productGroupId) {
      searchFields.productGroup = searchFields.productGroupId;
      delete searchFields.productGroupId;
    }

    const searchCondition = buildSearchConditions(searchFields);

    const count = await ProductManagement.countDocuments(searchCondition);

    const productManagements = await ProductManagement.find(searchCondition)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * (Number(pageNumber) - 1))
      .sort({ createdAt: -1 })
      .populate("unitOfMeasurement", "unitCategory baseUnit contain")
      .populate("productGroup", "shortName")
      .populate("productCompany", "name")
      .populate("supplier", "supplierDetail");

    res.status(200).json({
      productManagements,
      pageNumber: Number(pageNumber),
      pages: Math.ceil(count / Number(pageSize)),
      totalElements: count,
    });
  }
);


export const getProductManagementById = expressAsyncHandler(async (req, res) => {
  const productManagement = await ProductManagement.findById(req.params.id);
  
  if (productManagement) {
    res.status(200).json(productManagement);
  } else {
    res.status(404);
    throw new Error("Product category not found");
  }
});

export const updateProductManagement = expressAsyncHandler(async (req, res) => {
  const productManagement = await ProductManagement.findById(req.params.id);

  if (productManagement) {
    Object.assign(productManagement, req.body);
    
    const updatedProductManagement = await productManagement.save();
    res.status(200).json({
      _id: updatedProductManagement._id,
      message: "Product category updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("Product category not found");
  }
});

export const deleteProductManagement = expressAsyncHandler(async (req, res) => {
  const productManagement = await ProductManagement.findById(req.params.id);

  if (productManagement) {
    await ProductManagement.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Product category removed successfully" });
  } else {
    res.status(404);
    throw new Error("Product category not found");
  }
});

export const searchProductManagements = expressAsyncHandler(async (req, res) => {
  const { keyword } = req.query;
  
  const searchCondition = keyword
    ? {
        $or: [
          { productName: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      }
    : {};
    
  const productManagements = await ProductManagement.find(searchCondition);
  res.status(200).json(productManagements);
});