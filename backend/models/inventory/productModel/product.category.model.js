// models/productCategoryModel.js
import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema(
  {
    productCategory: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    // grouping: you can add a grouping field here if needed
  },
  {
    timestamps: true,
  }
);

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);

export default ProductCategory;
