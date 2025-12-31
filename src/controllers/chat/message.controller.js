import expressAsyncHandler from "express-async-handler";
import Message from "../../models/chat/messageModel.js";
import { Chat } from "../../models/chat/chatModel.js";
import { fetchThirdPartyUser } from "../../services/thirdParty.service.js";

/**
 * Safely fetch third-party user info.
 * Returns a placeholder object if fetch fails.
 */
const safeFetchUser = async (userId, token) => {
  try {
    const res = await fetchThirdPartyUser(userId, token);
    return {
      _id: res.data.id,
      firstName: res.data.firstName,
      middleName: res.data.middleName,
      lastName: res.data.lastName,
    };
  } catch (err) {
    // console.warn(`Failed to fetch user ${userId}:`, err.message);
    return {
      _id: "a4608bcd-f971-414d-892c-8d8a1f52b9a5",
      firstName: "Legal",
      middleName: null,
      lastName: "Remit",
    };
  }
};

// ------------------ Send Message ------------------
export const sendMessage = expressAsyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!content || !chatId) {
    return res
      .status(400)
      .json({ message: "Invalid data passed into request" });
  }

  try {
    // 1️ Create message
    const newMessage = {
      senderId: req.userId,
      content,
      chat: chatId,
    };
    const message = await Message.create(newMessage);

    // 2️ Fetch sender info
    const sender = await safeFetchUser(req.userId, token);

    // 3️ Update chat with latest message
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { latestMessage: message },
      { new: true } // return updated chat
    );

    if (!updatedChat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // 4️ Fetch full user info for chat users
    const usersFullData = await Promise.all(
      updatedChat.users.map((userId) => safeFetchUser(userId, token))
    );

    // 5️ Prepare chat summary
    const chatSummary = {
      _id: updatedChat._id,
      chatName: updatedChat.chatName,
      isGroupChat: updatedChat.isGroupChat,
      users: usersFullData,
      createdAt: updatedChat.createdAt,
      updatedAt: updatedChat.updatedAt,
      latestMessage: updatedChat.latestMessage,
    };

    // 6️ Respond with message + chat info
    res.status(201).json({
      ...message.toObject(),
      sender,
      chat: chatSummary,
    });
  } catch (error) {
    console.error("SendMessage Error:", error);
    res.status(500).json({ message: "Server error while sending message" });
  }
});

// ------------------ Get All Messages ------------------
export const allMessages = expressAsyncHandler(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { chatId } = req.params;

  try {
    // 1️ Find all messages for this chat
    const messages = await Message.find({ chat: chatId });

    // 2️Fetch full sender info for each message
    const messagesWithSender = await Promise.all(
      messages.map(async (msg) => {
        const sender = await safeFetchUser(msg.senderId, token);
        return {
          ...msg.toObject(),
          sender,
        };
      })
    );

    res.status(200).json(messagesWithSender);
  } catch (error) {
    console.error("AllMessages Error:", error);
    res.status(500).json({ message: "Server error while fetching messages" });
  }
});
