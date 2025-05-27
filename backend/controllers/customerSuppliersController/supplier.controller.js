const expressAsyncHandler = require("express-async-handler");
const Supplier = require("../../models/customerSupplierModel/supplier.model");
const { buildSearchConditions } = require("../../config/heplerConditions");

const createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json({
      _id: supplier._id,
      message: "Supplier added successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find()
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSupplierPaginatedPost = expressAsyncHandler(async (req, res) => {
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

export default {
  createSupplier,
  getSuppliers,
  getSupplierPaginatedPost,
};
