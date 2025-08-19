import expressAsyncHandler from "express-async-handler";
import Area from "../../models/customerSupplierModel/area.model.js";

export const addArea = expressAsyncHandler(async (req, res) => {
  const { areaDetail, areaShortName } = req.body;

  if (!areaShortName) {
    res.status(400);
    throw new Error("Please enter area short name");
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
    throw new Error("Failed to create area");
  }
});

export const getAllAreas = expressAsyncHandler(async (req, res) => {
  const areas = await Area.find({});

  if (areas && areas.length > 0) {
    res.status(200).json(areas);
  } else {
    res.status(404);
    throw new Error("No areas found");
  }
});

export const getAreasPaginated = expressAsyncHandler(async (req, res) => {
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

  const count = await Area.countDocuments(keyword);
  const areas = await Area.find(keyword)
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

export const getAreaById = expressAsyncHandler(async (req, res) => {
  const area = await Area.findById(req.params.id);
  if (area) {
    res.status(200).json(area);
  } else {
    res.status(404);
    throw new Error("Area not found");
  }
});

export const updateArea = expressAsyncHandler(async (req, res) => {
  const area = await Area.findById(req.params.id);

  if (area) {
    Object.assign(area, req.body);

    const updatedArea = await area.save();
    res.status(200).json({
      _id: updatedArea._id,
      message: "Area updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("Area not found");
  }
});

export const deleteArea = expressAsyncHandler(async (req, res) => {
  const area = await Area.findById(req.params.id);

  if (area) {
    await Area.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Area removed successfully" });
  } else {
    res.status(404);
    throw new Error("Area not found");
  }
});

