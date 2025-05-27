import expressAsyncHandler from "express-async-handler";
import Supplier from "../../models/customerSupplierModel/supplier.model.js";
import { buildSearchConditions } from "../../config/heplerConditions.js";

export const createSupplier = expressAsyncHandler(async (req, res) => {
  const supplier = await Supplier.create(req.body);
  res.status(201).json({
    _id: supplier._id,
    message: "Supplier added successfully",
  });
});

export const getSuppliers = expressAsyncHandler(async (req, res) => {
  const suppliers = await Supplier.find();
  res.status(200).json(suppliers);
});

export const getSupplierPaginatedPost = expressAsyncHandler(async (req, res) => {
  const { pageSize = 10, pageNumber = 1, ...searchFields } = req.body;

  const searchCondition = buildSearchConditions(searchFields);

  const count = await Supplier.countDocuments(searchCondition);

  const suppliers = await Supplier.find(searchCondition)
    .limit(Number(pageSize))
    .skip(Number(pageSize) * (Number(pageNumber) - 1))
    .sort({ createdAt: -1 });

  res.status(200).json({
    suppliers,
    pageNumber: Number(pageNumber),
    pages: Math.ceil(count / Number(pageSize)),
    totalElements: count,
  });
});
