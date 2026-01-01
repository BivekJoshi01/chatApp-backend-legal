import expressAsyncHandler from "express-async-handler";
import { Chat } from "../../models/chat/chatModel.js";
import safeFetchUser from "../../services/safeFetchUser.js";

export const accessChat = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!userId) {
    return res.status(400).json({ message: "UserId not provided" });
  }
  
  let chat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [req.userId, userId] },
  }).populate("latestMessage");

  if (!chat) {
    chat = await Chat.create({
      chatName: "Legal Remit",
      isGroupChat: false,
      users: [req.userId, userId],
    });
  }

  //  Fetch users safely (admin → API, others → token)
  const users = await Promise.all(
    chat.users.map((id) => safeFetchUser(id, token))
  );

  res.status(200).json({
    chat,
    users,
  });
});

export const fetchChat = expressAsyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const chats = await Chat.find({
    users: { $elemMatch: { $eq: req.userId } },
  })
    .populate("latestMessage")
    .sort({ updatedAt: -1 });

  const chatsWithUsers = await Promise.all(
    chats.map(async (chat) => {
      const users = await Promise.all(
        chat.users.map((id) => safeFetchUser(id, token))
      );

      const groupAdmin = chat.groupAdmin
        ? await safeFetchUser(chat.groupAdmin, token)
        : null;

      return {
        chat: chat.toObject(),
        users,
        groupAdmin,
      };
    })
  );

  res.status(200).json(chatsWithUsers);
});


export const createGroup = expressAsyncHandler(async (req, res) => {
  const { users: usersRaw, name } = req.body;

  if (!usersRaw || !name) {
    return res.status(400).send({ message: "Please fill all the fields" });
  }

  const users = JSON.parse(usersRaw);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.userId);

  try {
    const groupChat = await Chat.create({
      chatName: name,
      users,
      isGroupChat: true,
      groupAdmin: req.userId,
    });

    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const renameGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  }

  res.json(updatedChat);
});

export const addToGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const updated = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updated) {
    res.status(404);
    throw new Error("Chat Not Found");
  }

  res.json(updated);
});

export const removeFromGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const updated = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updated) {
    res.status(404);
    throw new Error("Chat Not Found");
  }

  res.json(updated);
});
