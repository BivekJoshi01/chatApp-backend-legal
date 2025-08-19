import mongoose from "mongoose";

const productGroupSchema = mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    shortName: { type: String, require: true, unique: true },
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType",
      required: true,
    },
    description: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const ProductGroup = mongoose.model("ProductGroup", productGroupSchema);

export default ProductGroup;
