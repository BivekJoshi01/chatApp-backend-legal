const expressAsyncHandler = require("express-async-handler");
const UnitOfMeasurement = require("../../../models/inventory/productModel/unitOfMeasurement.model");
const { buildSearchConditions } = require("../../../config/heplerConditions");

const createUnitOfMeasurement = async (req, res) => {
  try {
    const customer = await UnitOfMeasurement.create(req.body);
    res.status(201).json({
      _id: customer._id,
      message: "Unit of measurement added successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUnitOfMeasurements = async (req, res) => {
  try {
    const unitOfMeasurements = await UnitOfMeasurement.find();
    res.status(200).json(unitOfMeasurements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUnitOfMeasurementPaginatedPost = expressAsyncHandler(async (req, res) => {
  const { pageSize = 10, pageNumber = 1, ...searchFields } = req.body;

  const searchCondition = buildSearchConditions(searchFields);

  const count = await UnitOfMeasurement.countDocuments(searchCondition);

  const customers = await UnitOfMeasurement.find(searchCondition)
    .limit(Number(pageSize))
    .skip(Number(pageSize) * (Number(pageNumber) - 1))
    .sort({ createdAt: -1 });

  res.status(200).json({
    customers,
    pageNumber: Number(pageNumber),
    pages: Math.ceil(count / Number(pageSize)),
    totalElements: count,
  });
});

export default {
    createUnitOfMeasurement,
    getUnitOfMeasurements,
    getUnitOfMeasurementPaginatedPost,
};
