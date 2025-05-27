import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    companyName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
