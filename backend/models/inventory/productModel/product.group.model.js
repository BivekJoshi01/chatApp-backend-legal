import mongoose from "mongoose";

const productGroupSchema = mongoose.Schema(
  {
    groupName: { type: String, require: true, unique: true },
    description: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const ProductGroup = mongoose.model("ProductGroup", productGroupSchema);

export default ProductGroup;
