import expressAsyncHandler from "express-async-handler";
import ProductCompany from "../../../models/inventory/productModel/product.company.model.js";
import { buildSearchConditions } from "../../../config/heplerConditions.js";

export const createProductCompany = expressAsyncHandler(async (req, res) => {
  const productCompany = await ProductCompany.create(req.body);
  res.status(201).json({
    _id: productCompany._id,
    message: "Product company added successfully",
  });
});

export const getProductCompanies = expressAsyncHandler(async (req, res) => {
  const productCompanies = await ProductCompany.find();
  res.status(200).json(productCompanies);
});

export const getProductCompanyPaginatedPost = expressAsyncHandler(
  async (req, res) => {
    const { pageSize = 10, pageNumber = 1, ...searchFields } = req.body;

    const searchCondition = buildSearchConditions(searchFields);

    const count = await ProductCompany.countDocuments(searchCondition);

    const productCompanies = await ProductCompany.find(searchCondition)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * (Number(pageNumber) - 1))
      .sort({ createdAt: -1 });

    res.status(200).json({
      productCompanies,
      pageNumber: Number(pageNumber),
      pages: Math.ceil(count / Number(pageSize)),
      totalElements: count,
    });
  }
);

export const getProductCompanyById = expressAsyncHandler(async (req, res) => {
  const productCompany = await ProductCompany.findById(req.params.id);
  
  if (productCompany) {
    res.status(200).json(productCompany);
  } else {
    res.status(404);
    throw new Error("Product company not found");
  }
});

export const updateProductCompany = expressAsyncHandler(async (req, res) => {
  const productCompany = await ProductCompany.findById(req.params.id);

  if (productCompany) {
    Object.assign(productCompany, req.body);
    
    const updatedProductCompany = await productCompany.save();
    res.status(200).json({
      _id: updatedProductCompany._id,
      message: "Product company updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("Product company not found");
  }
});

export const deleteProductCompany = expressAsyncHandler(async (req, res) => {
  const productCompany = await ProductCompany.findById(req.params.id);

  if (productCompany) {
    await ProductCompany.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Product company removed successfully" });
  } else {
    res.status(404);
    throw new Error("Product company not found");
  }
});