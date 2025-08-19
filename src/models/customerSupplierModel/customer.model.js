// models/customerModel.js
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },

    // customerDetail: { type: String, required: true },

    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },

    vatPan: { type: String, required: false },
    landlineNo: { type: String, required: false },
    isRetailer: { type: Boolean, required: true },

    contactPerson: { type: String, required: false },
    // email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },

    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: false,
    },
    areaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
      required: false,
    },
    creditLimit: { type: String, required: false },
    type: { type: String, required: false },
    memo: { type: String, required: false },
    isActive: { type: Boolean, required: true },

    customerPic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
