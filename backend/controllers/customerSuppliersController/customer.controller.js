import expressAsyncHandler from "express-async-handler";
import Customer from "../../models/customerSupplierModel/customer.model.js";
import { buildSearchConditions } from "../../config/heplerConditions.js";

export const createCustomer = expressAsyncHandler(async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(201).json({
    _id: customer._id,
    message: "Customer added successfully",
  });
});

export const getCustomers = expressAsyncHandler(async (req, res) => {
  // Populate area fields 'name' and 'agent' properly in one call
  const customers = await Customer.find().populate("area", "name agent");
  res.status(200).json(customers);
});

export const getCustomerPaginatedPost = expressAsyncHandler(async (req, res) => {
  const { pageSize = 10, pageNumber = 1, ...searchFields } = req.body;

  const searchCondition = buildSearchConditions(searchFields);

  const count = await Customer.countDocuments(searchCondition);

  const customers = await Customer.find(searchCondition)
    .limit(Number(pageSize))
    .skip(Number(pageSize) * (Number(pageNumber) - 1))
    .sort({ createdAt: -1 })
    .populate("area", "name agent");

  res.status(200).json({
    customers,
    pageNumber: Number(pageNumber),
    pages: Math.ceil(count / Number(pageSize)),
    totalElements: count,
  });
});