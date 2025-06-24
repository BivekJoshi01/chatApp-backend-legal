import expressAsyncHandler from "express-async-handler";
import ProductGroup from "../../../models/inventory/productModel/product.group.model.js";
import { buildSearchConditions } from "../../../config/heplerConditions.js";

export const createProductGroup = expressAsyncHandler(async (req, res) => {
  const productGroup = await ProductGroup.create(req.body);
  res.status(201).json({
    _id: productGroup._id,
    message: "Product group added successfully",
  });
});

export const getProductGroups = expressAsyncHandler(async (req, res) => {
  const productGroups = await ProductGroup.find()
    .populate("typeId", "name description"); 
  res.status(200).json(productGroups);
});

export const getProductGroupPaginatedPost = expressAsyncHandler(
  async (req, res) => {
    const { pageSize = 10, pageNumber = 1, ...searchFields } = req.body;

    const searchCondition = buildSearchConditions(searchFields);

    const count = await ProductGroup.countDocuments(searchCondition);

    const productGroups = await ProductGroup.find(searchCondition)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * (Number(pageNumber) - 1))
      .sort({ createdAt: -1 })
      .populate("typeId", "name description");

    res.status(200).json({
      productGroups,
      pageNumber: Number(pageNumber),
      pages: Math.ceil(count / Number(pageSize)),
      totalElements: count,
    });
  }
);

export const getProductGroupById = expressAsyncHandler(async (req, res) => {
  const productGroup = await ProductGroup.findById(req.params.id)
    .populate("typeId", "name shortName");
  
  if (productGroup) {
    res.status(200).json(productGroup);
  } else {
    res.status(404);
    throw new Error("Product group not found");
  }
});

export const updateProductGroup = expressAsyncHandler(async (req, res) => {
  const productGroup = await ProductGroup.findById(req.params.id);

  if (productGroup) {
    Object.assign(productGroup, req.body);
    
    const updatedProductGroup = await productGroup.save();
    res.status(200).json({
      _id: updatedProductGroup._id,
      message: "Product group updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("Product group not found");
  }
});

export const deleteProductGroup = expressAsyncHandler(async (req, res) => {
  const productGroup = await ProductGroup.findById(req.params.id);

  if (productGroup) {
    await ProductGroup.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Product group removed successfully" });
  } else {
    res.status(404);
    throw new Error("Product group not found");
  }
});

export const getProductGroupsByType = expressAsyncHandler(async (req, res) => {
  const typeId = req.params.typeId;
  
  const productGroups = await ProductGroup.find({ typeId })
    .populate("typeId", "name shortName");
    
  res.status(200).json(productGroups);
});