const mongoose = require("mongoose");

const agentSchema = mongoose.Schema(
  {
    agentDetail: { type: String, require: true },
    street: { type: String, require: true },
    city: { type: String, require: true },
    country: { type: String, require: true },
    contactPerson: { type: String, require: true },
    emailAddress: { type: String, require: true },
    phoneNumber: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Agent = mongoose.model("Agent", agentSchema);

module.exports = Agent;
