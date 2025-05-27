// models/agentModel.js
import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    agentDetail: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    contactPerson: { type: String, required: true },
    emailAddress: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
