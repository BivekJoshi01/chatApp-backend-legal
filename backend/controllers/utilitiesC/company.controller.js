import expressAsyncHandler from "express-async-handler";
import Company from "../../models/utilities/companyModel.js";

const addCompany = expressAsyncHandler(async (req, res) => {
  const { companyName, email, pic } = req.body;

  if (!companyName || !email) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const companyExists = await Company.findOne({ email });

  if (companyExists) {
    res.status(400);
    throw new Error("Company already exists");
  }

  const company = await Company.create({
    companyName,
    email,
    pic,
  });

  if (company) {
    res.status(201).json({
      _id: company._id,
      companyName: company.companyName,
      email: company.email,
      pic: company.pic,
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the company");
  }
});

export default { addCompany };
