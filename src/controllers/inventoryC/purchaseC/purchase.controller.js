import expressAsyncHandler from "express-async-handler";
import { buildSearchConditions } from "../../../config/heplerConditions.js";
import Purchase from "../../../models/inventory/purchaseModel/purchase.model.js";

export const createPurchase = expressAsyncHandler(async (req, res) => {
  const purchases = await Purchase.create(req.body);
  res.status(201).json({
    _id: purchases._id,
    message: "Purchase added successfully",
  });
});

export const getAllPurchase = expressAsyncHandler(async (req, res) => {
  const purchases = await Purchase.find();
  res.status(200).json(purchases);
});

export const getAllPurchasePaginatedPost = expressAsyncHandler(
  async (req, res) => {
    const { pageSize = 10, pageNumber = 1, ...searchFields } = req.body;

    const searchCondition = buildSearchConditions(searchFields);

    const count = await Purchase.countDocuments(searchCondition);

    const purchases = await Purchase.find(searchCondition)
      .limit(Number(pageSize))
      .skip(Number(pageSize) * (Number(pageNumber) - 1))
      .sort({ createdAt: -1 })
    //   .populate({
    //     path: "customerId",
    //     select:"customerId phoneNumber",
    //     populate: {
    //       path: "userId",
    //       select: "name email", // choose fields you want
    //     },
    //   });

    res.status(200).json({
      purchases,
      pageNumber: Number(pageNumber),
      pages: Math.ceil(count / Number(pageSize)),
      totalElements: count,
    });
  }
);