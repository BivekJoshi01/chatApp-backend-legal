// models/areaModel.js
import mongoose from "mongoose";

const areaSchema = new mongoose.Schema(
  {
    areaDetail: { type: String, required: true },
    areaShortName: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Area = mongoose.model("Area", areaSchema);

export default Area;
