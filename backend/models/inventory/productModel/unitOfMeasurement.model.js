const mongoose = require("mongoose");

const unitOfMeasurementSchema = mongoose.Schema(
  {
    unitCategory: { type: String, require: true, unique: true },
    baseUnit: { type: String, require: true },
    contain: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const UnitOfMeasurement = mongoose.model(
  "UnitOfMeasurement",
  unitOfMeasurementSchema
);

module.exports = UnitOfMeasurement;
