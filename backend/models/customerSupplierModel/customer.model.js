const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    customerDetail: { type: String, require: true },
    street: { type: String, require: true },
    city: { type: String, require: true },
    country: { type: String, require: true },
    vatPan: { type: String, require: true },

    contactPerson: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phoneNumber: { type: String, require: true },
    area: { type: String, require: true },
    agent: { type: String, require: true },
    creditLimit: { type: String, require: true },
    type: { type: String, require: true },
    memo: { type: String, require: true },
    isActive: { type: String, require: true },
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
