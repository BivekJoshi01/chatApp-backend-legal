import expressAsyncHandler from "express-async-handler";
import ProductType from "../../../models/inventory/productModel/product.type.model.js";
import { buildSearchConditions } from "../../../config/heplerConditions.js";

export const createProductType = expressAsyncHandler(async (req, res) => {
  const productType = await ProductType.create(req.body);
  res.status(201).json({
    _id: productType._id,
    message: "Product type added successfully",
  });
});

export const getProductTypes = expressAsyncHandler(async (req, res) => {
  const productTypes = await ProductType.find();
  console.log(productTypes);
  res.status(200).json(productTypes);
});

export const getProductTypePaginatedPost = expressAsyncHandler(
  async (req, res) => {
    const { pageSize = 10, pageNumber = 1, ...searchFields } = req.body;

    const searchCondition = buildSearchConditions(searchFields);

    const count = await ProductType.countDocuments(searchCondition);

    const productTypes = await ProductType.find(searchCondition)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * (Number(pageNumber) - 1))
      .sort({ createdAt: -1 });

    res.status(200).json({
      productTypes,
      pageNumber: Number(pageNumber),
      pages: Math.ceil(count / Number(pageSize)),
      totalElements: count,
    });
  }
);

export const getProductTypeById = expressAsyncHandler(async (req, res) => {
  const productType = await ProductType.findById(req.params.id);
  
  if (productType) {
    res.status(200).json(productType);
  } else {
    res.status(404);
    throw new Error("Product type not found");
  }
});

export const updateProductType = expressAsyncHandler(async (req, res) => {
  const productType = await ProductType.findById(req.params.id);

  if (productType) {
    Object.assign(productType, req.body);
    
    const updatedProductType = await productType.save();
    res.status(200).json({
      _id: updatedProductType._id,
      message: "Product type updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("Product type not found");
  }
});

export const deleteProductType = expressAsyncHandler(async (req, res) => {
  const productType = await ProductType.findById(req.params.id);

  if (productType) {
    await ProductType.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Product type removed successfully" });
  } else {
    res.status(404);
    throw new Error("Product type not found");
  }
});

export const searchProductTypes = expressAsyncHandler(async (req, res) => {
  const { keyword } = req.query;
  
  const searchCondition = keyword
    ? {
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      }
    : {};
    
  const productTypes = await ProductType.find(searchCondition);
  res.status(200).json(productTypes);
});