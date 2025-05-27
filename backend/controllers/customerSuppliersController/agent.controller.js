const expressAsyncHandler = require("express-async-handler");
const Agent = require("../../models/customerSupplierModel/agent.model");
const { buildSearchConditions } = require("../../config/heplerConditions");

const addAgent = expressAsyncHandler(async (req, res) => {
  const {
    agentDetail,
    street,
    city,
    country,
    contactPerson,
    emailAddress,
    phoneNumber,
  } = req.body;

  const agent = await Agent.create({
    agentDetail,
    street,
    city,
    country,
    contactPerson,
    emailAddress,
    phoneNumber,
  });

  if (agent) {
    res.status(201).json({
      _id: agent._id,
      message: "Agent added successfully",
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create agent");
  }
});

const getAllAgents = expressAsyncHandler(async (req, res) => {
  const agent = await Agent.find({});

  if (agent && agent.length > 0) {
    res.status(200).json(agent);
  } else {
    res.status(404);
    throw new Error("No agent found");
  }
});

const getAgentPaginatedPost = expressAsyncHandler(async (req, res) => {
  const { pageSize = 10, pageNumber = 1, ...searchFields } = req.body;

  const searchCondition = buildSearchConditions(searchFields);

  const count = await Agent.countDocuments(searchCondition);

  const agents = await Agent.find(searchCondition)
    .limit(Number(pageSize))
    .skip(Number(pageSize) * (Number(pageNumber) - 1))
    .sort({ createdAt: -1 });

  res.status(200).json({
    agents,
    pageNumber: Number(pageNumber),
    pages: Math.ceil(count / Number(pageSize)),
    totalElements: count,
  });
});

export default { addAgent, getAllAgents, getAgentPaginatedPost };
