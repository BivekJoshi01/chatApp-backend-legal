const expressAsyncHandler = require("express-async-handler");
const Area = require("../../models/customerSupplierModel/area.model");

const addArea = expressAsyncHandler(async (req, res) => {
  const { areaDetail, areaShortName } = req.body;

  if (!areaShortName) {
    res.status(400);
    throw newError("Please Enter area short name");
  }

  const area = await Area.create({
    areaDetail,
    areaShortName,
  });

  if (area) {
    res.status(201).json({
      _id: area._id,
      message: "Area added successfully",
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create area");
  }
});

const getAllAreas = expressAsyncHandler(async (req, res) => {
  const areas = await Area.find({});

  if (areas && areas.length > 0) {
    res.status(200).json(areas);
  } else {
    res.status(404);
    throw new Error("No areas found");
  }
});

const getAreasPaginated = expressAsyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10;
  const pageNumber = Number(req.query.pageNumber) || 1;
  const keyword = req.query.search
    ? {
        $or: [
          { areaDetail: { $regex: req.query.search, $options: "i" } },
          { areaShortName: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const count = await Area.countDocuments({ ...keyword });
  const areas = await Area.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (pageNumber - 1))
    .sort({ createdAt: -1 });

  res.status(200).json({
    areas,
    pageNumber,
    pages: Math.ceil(count / pageSize),
    totalElements: count,
  });
});

export default { addArea, getAllAreas, getAreasPaginated };
