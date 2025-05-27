import expressAsyncHandler from "express-async-handler";
import UnitOfMeasurement from "../../../models/inventory/productModel/unitOfMeasurement.model.js";
import { buildSearchConditions } from "../../../config/heplerConditions.js";

export const createUnitOfMeasurement = expressAsyncHandler(async (req, res) => {
  const unit = await UnitOfMeasurement.create(req.body);
  res.status(201).json({
    _id: unit._id,
    message: "Unit of measurement added successfully",
  });
});

export const getUnitOfMeasurements = expressAsyncHandler(async (req, res) => {
  const unitOfMeasurements = await UnitOfMeasurement.find();
  res.status(200).json(unitOfMeasurements);
});

export const getUnitOfMeasurementPaginatedPost = expressAsyncHandler(async (req, res) => {
  const { pageSize = 10, pageNumber = 1, ...searchFields } = req.body;

  const searchCondition = buildSearchConditions(searchFields);

  const count = await UnitOfMeasurement.countDocuments(searchCondition);

  const units = await UnitOfMeasurement.find(searchCondition)
    .limit(Number(pageSize))
    .skip(Number(pageSize) * (Number(pageNumber) - 1))
    .sort({ createdAt: -1 });

  res.status(200).json({
    units,
    pageNumber: Number(pageNumber),
    pages: Math.ceil(count / Number(pageSize)),
    totalElements: count,
  });
});
