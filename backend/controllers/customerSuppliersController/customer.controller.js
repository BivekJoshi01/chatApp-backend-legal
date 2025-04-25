const expressAsyncHandler = require("express-async-handler");
const Customer = require("../../models/customerSupplierModel/customer.model");
const { buildSearchConditions } = require("../../config/heplerConditions");

const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({
      _id: customer._id,
      message: "Customer added successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
      .populate("areaId", "name"); // assuming Area model has a `name` field
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCustomerPaginatedPost = expressAsyncHandler(async (req, res) => {
  const { pageSize = 10, pageNumber = 1, ...searchFields } = req.body;

  const searchCondition = buildSearchConditions(searchFields);

  const count = await Customer.countDocuments(searchCondition);

  const customers = await Customer.find(searchCondition)
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

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerPaginatedPost
};
