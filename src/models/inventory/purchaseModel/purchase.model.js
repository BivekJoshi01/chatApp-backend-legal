import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    purchaseNumber: {
      type: String,
      required: true,
      default: 0,
    },
    purchaseDate: {
      type: String,
      required: true,
      default: 0,
    },
    invioceNumber: {
      type: String,
      required: true,
      default: 0,
    },
    invoiceDate: {
      type: String,
      required: true,
      default: 0,
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    discountAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    discountPercent: {
      type: Number,
      required: true,
      default: 0,
    },
    discountValue: {
      type: Number,
      required: true,
      default: 0,
    },
    isDISCOUNTChecked: {
      type: Boolean,
      required: true,
      default: false,
    },
    isVATChecked: {
      type: Boolean,
      required: true,
      default: false,
    },
    vatPercent: {
      type: Number,
      required: true,
      default: 0,
    },
    tax: {
      type: Number,
      required: true,
      default: 0,
    },
    subTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    grandTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    productItems: [
      {
        pm_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductManagement",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        unit: {
          type: String,
          required: true,
          trim: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        totalPrice: {
          type: Number,
          required: true,
          min: 0,
        },
        remarks: {
          type: String,
          default: "",
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Purchase = mongoose.model("Purchase", PurchaseSchema);

export default Purchase;
