import expressAsyncHandler from "express-async-handler";
import { Chat } from "../../models/chat/chatModel.js";
import { User } from "../../models/auth/user.model.js";
import { fetchThirdPartyUser } from "../../services/thirdParty.service.js";

export const accessChat = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (!userId) return res.status(400).json({ message: "UserId not provided" });
  if (!token)
    return res.status(401).json({ message: "Authorization token missing" });

  // Find chat containing both users
  let chat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [req.userId, userId] },
  }).populate("latestMessage");

  // If no chat exists, create one
  if (!chat) {
    chat = await Chat.create({
      chatName: "Legal Remit",
      isGroupChat: false,
      users: [req.userId, userId],
    });
  }

  // Fetch third-party user info for all users in the chat
  const usersInfo = await Promise.all(
    chat.users.map(async (id) => {
      try {
        const res = await fetchThirdPartyUser(id, token);
        return res.data; // return the actual user data
      } catch (err) {
        console.error("Error fetching user:", id, err.message);
        return null;
      }
    })
  );

  return res.status(200).json({
    chat,
    users: usersInfo.filter(Boolean), // remove any failed calls
  });
});

export const fetchChat = expressAsyncHandler(async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token

    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Get all chats that include current user
    let chats = await Chat.find({
      users: { $elemMatch: { $eq: req.userId } },
    })
      .populate("latestMessage") // if you have Message model
      .sort({ updatedAt: -1 });

    // For each chat, fetch users info from third-party API
    const chatsWithUsers = await Promise.all(
      chats.map(async (chat) => {
        // Fetch all users info
        const usersInfo = await Promise.all(
          chat.users.map(async (id) => {
            try {
              const response = await fetchThirdPartyUser(id, token);
              return response.data; // exact user info
            } catch (err) {
              console.error("Error fetching user:", id, err.message);
              return null;
            }
          })
        );

        // Fetch groupAdmin info if it exists
        let groupAdminInfo = null;
        if (chat.groupAdmin) {
          try {
            const response = await fetchThirdPartyUser(chat.groupAdmin, token);
            groupAdminInfo = response.data;
          } catch (err) {
            console.error(
              "Error fetching groupAdmin:",
              chat.groupAdmin,
              err.message
            );
          }
        }

        return {
          chat: chat.toObject(),
          users: usersInfo.filter(Boolean), // remove failed calls
          groupAdmin: groupAdminInfo,
        };
      })
    );

    res.status(200).json(chatsWithUsers);
  } catch (error) {
    console.error("Error fetching chats:", error.message);
    res.status(500).json({ message: "Server error" });
  }
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
