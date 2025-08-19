// models/supplierModel.js
import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    supplierDetail: { type: String, required: true },

    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true },

    contactPerson: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    isRegular: { type: Boolean, required: true },
    vatPan: { type: String, required: true },

    type: { type: String, required: true },

    memo: { type: String, required: true },
    isActive: { type: Boolean, required: true },

    supplierPic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
