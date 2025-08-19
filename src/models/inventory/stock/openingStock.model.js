import mongoose from "mongoose";

const openingStockSchema = new mongoose.Schema(
  {
    fiscalYear: {
      type: String,
      required: true,
    },
    productManagementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductManagement",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    totalValue: {
      type: Number,
      required: true,
      min: 0,
    },
    warehouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Warehouse",
    },
    batchNumber: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const OpeningStock = mongoose.model("OpeningStock", openingStockSchema);

export default OpeningStock;
