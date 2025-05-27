const expressAsyncHandler = require("express-async-handler");
const Company = require("../../models/utilities/comapnyModel");

const addCompany = expressAsyncHandler(async (req, res) => {
  const { companyName, email, pic } = req.body;

  if (!companyName || !email) {
    res.status(400);
    throw newError("Please Enter all the Feilds".orange);
  }

  const userExists = await Company.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists".red);
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
    throw new Error("Failed to Create the User");
  }
});

export default { addCompany };
