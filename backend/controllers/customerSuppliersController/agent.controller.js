import expressAsyncHandler from "express-async-handler";
import Agent from "../../models/customerSupplierModel/agent.model.js";
import { buildSearchConditions } from "../../config/heplerConditions.js";

export const addAgent = expressAsyncHandler(async (req, res) => {
  const {
    agentDetail,
    street,
    city,
    country,
    contactPerson,
    emailAddress,
    phoneNumber,
  } = req.body;

  if (
    !agentDetail ||
    !street ||
    !city ||
    !country ||
    !contactPerson ||
    !emailAddress ||
    !phoneNumber
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }

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
    throw new Error("Failed to create agent");
  }
});

export const getAllAgents = expressAsyncHandler(async (req, res) => {
  const agents = await Agent.find({});

  if (agents && agents.length > 0) {
    res.status(200).json(agents);
  } else {
    res.status(404);
    throw new Error("No agents found");
  }
});

export const getAgentPaginatedPost = expressAsyncHandler(async (req, res) => {
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
