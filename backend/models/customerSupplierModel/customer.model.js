const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    customerDetail: { type: String, required: true },

    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },

    vatPan: { type: String, required: true },
    isRetailer: { type: Boolean, required: true },

    contactPerson: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },

    areaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
      required: true,
    },
    creditLimit: { type: String, required: true },
    type: { type: String, required: true },
    memo: { type: String, required: true },
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

module.exports = Customer;
