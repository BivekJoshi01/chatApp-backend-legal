import mongoose from "mongoose";

const productManagementSchema = mongoose.Schema(
  {
    productName: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    barCode: { type: String },

    description: { type: String },

    purchasePrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    mrp: { type: Number },
    discountPrice: { type: Number },
    discountPercent: { type: Number },

    vatRate: { type: Number, default: 0 },
    priceIncludeVat: { type: Boolean, default: false },

    stockQuantity: { type: Number, default: 0 },
    minStockLevel: { type: Number, default: 0 },
    maxStockLevel: { type: Number, default: 0 },

    unitOfMeasurement: { type: mongoose.Schema.Types.ObjectId, ref: "UnitOfMeasurement" },

    weight: { type: Number },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },

    productGroup: { type: mongoose.Schema.Types.ObjectId, ref: "ProductGroup" },
    productCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCompany",
    },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },

    hasExpiryDate: { type: Boolean, default: false },
    expiryDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return !this.hasExpiryDate || !!v;
        },
        message: "Expiry date is required when hasExpiryDate is true.",
      },
    },
    batchNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return !this.hasExpiryDate || !!v;
        },
        message: "Batch number is required when hasExpiryDate is true.",
      },
    },

    requireAdditionalInfo: { type: Boolean, default: false },

    hsnCode: {
      type: String,
      validate: {
        validator: function (v) {
          return !this.requireAdditionalInfo || !!v;
        },
        message: "HSN Code is required when requireAdditionalInfo is true.",
      },
    },
    warehouseLocation: {
      type: String,
      validate: {
        validator: function (v) {
          return !this.requireAdditionalInfo || !!v;
        },
        message:
          "Warehouse location is required when requireAdditionalInfo is true.",
      },
    },
    
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },

    imageUrls: [{ type: String }],

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const ProductManagement = mongoose.model("Product", productManagementSchema);

export default ProductManagement;
