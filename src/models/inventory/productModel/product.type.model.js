import mongoose from "mongoose";

const productTypeSchema = mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    description: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const ProductType = mongoose.model("ProductType", productTypeSchema);

export default ProductType;
