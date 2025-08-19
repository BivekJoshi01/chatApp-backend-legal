import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        pm_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ProductManagement",
          required: true,
        },
        productName: {
          type: String,
          required: true,
          trim: true,
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
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

const Sales = mongoose.model("Sales", SalesSchema);

export default Sales;
