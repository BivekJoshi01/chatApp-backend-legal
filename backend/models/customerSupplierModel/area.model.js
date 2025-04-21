const mongoose = require("mongoose");

const areaSchema = mongoose.Schema(
  {
    areaDetail: { type: String, require: true },
    areaShortName: { type: String, require: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Area = mongoose.model("Area", areaSchema);

module.exports = Area;
