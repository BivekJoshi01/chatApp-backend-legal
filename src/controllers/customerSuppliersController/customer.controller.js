import expressAsyncHandler from "express-async-handler";
import Customer from "../../models/customerSupplierModel/customer.model.js";
import { buildSearchConditions } from "../../config/heplerConditions.js";
import User from "../../models/auth/userModel.js";

export const createCustomer = expressAsyncHandler(async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(201).json({
    _id: customer._id,
    message: "Customer added successfully",
  });
});

export const getCustomers = expressAsyncHandler(async (req, res) => {
  const customers = await Customer.find()
    .populate("areaId", "areaDetail areaShortName") // populate areaId with name
    .populate("agentId", "agentDetail")
    .populate("userId", "_id email name");
  res.status(200).json(customers);
});

export const getCustomerPaginatedPost = expressAsyncHandler(
  async (req, res) => {
    const { pageSize = 10, pageNumber = 1, ...rawSearchFields } = req.body;

    let searchFields = { ...rawSearchFields };

    if (searchFields.userId?.name) {
      const userMatches = await User.find({
        name: new RegExp(searchFields.userId.name, "i"),
      }).select("_id");

      const userIds = userMatches.map((u) => u._id);

      if (userIds.length) {
        searchFields.userId = { $in: userIds };
      } else {
        // If no users match, short-circuit the search
        return res.status(200).json({
          customers: [],
          pageNumber: Number(pageNumber),
          pages: 0,
          totalElements: 0,
        });
      }
    } else {
      delete searchFields.userId;
    }

    const searchCondition = buildSearchConditions(searchFields);

    const count = await Customer.countDocuments(searchCondition);

    const customers = await Customer.find(searchCondition)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * (Number(pageNumber) - 1))
      .sort({ createdAt: -1 })
      .populate("areaId", "areaDetail areaShortName")
      .populate("agentId", "agentDetail")
      .populate("userId", "_id email name");

    res.status(200).json({
      customers,
      pageNumber: Number(pageNumber),
      pages: Math.ceil(count / Number(pageSize)),
      totalElements: count,
    });
  }
);

