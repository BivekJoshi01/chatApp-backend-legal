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

export const getUnitOfMeasurementPaginatedPost = expressAsyncHandler(
  async (req, res) => {
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
  }
);

export const getUnitOfMeasurementById = expressAsyncHandler(
  async (req, res) => {
    const unitOfMeasurement = await UnitOfMeasurement.findById(req.params.id);

    if (unitOfMeasurement) {
      res.status(200).json(unitOfMeasurement);
    } else {
      res.status(404);
      throw new Error("Unit of measurement not found");
    }
  }
);

export const updateUnitOfMeasurement = expressAsyncHandler(async (req, res) => {
  const unitOfMeasurement = await UnitOfMeasurement.findById(req.params.id);

  if (unitOfMeasurement) {
    Object.assign(unitOfMeasurement, req.body);

    const updatedUnitOfMeasurement = await unitOfMeasurement.save();
    res.status(200).json({
      _id: updatedUnitOfMeasurement._id,
      message: "Unit of Measurement updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("Unit of Measurement not found");
  }
});

export const deleteUnitOfMeasurement = expressAsyncHandler(async (req, res) => {
  const unitOfMeasurement = await UnitOfMeasurement.findById(req.params.id);

  if (unitOfMeasurement) {
    await UnitOfMeasurement.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Unit of measurement removed successfully" });
  } else {
    res.status(404);
    throw new Error("Unit of measurement not found");
  }
});