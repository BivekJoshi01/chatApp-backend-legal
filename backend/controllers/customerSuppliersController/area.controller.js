const expressAsyncHandler = require("express-async-handler");
const Area = require("../../models/customerSupplierModel/area.model");

const addArea = expressAsyncHandler(async (req, res) => {
  const { areaDetail, areaShortName } = req.body;

  if (!areaShortName) {
    res.status(400);
    throw newError("Please Enter area short name".orange);
  }

  const area = await Area.create({
    areaDetail,
    areaShortName,
  });

  if (area) {
    res.status(201).json({
      _id: area._id,
      areaDetail: area.areaDetail,
      areaShortName: area.areaShortName,
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create area");
  }
});

module.exports = { addArea };
