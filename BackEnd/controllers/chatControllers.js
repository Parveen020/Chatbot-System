import ChatModel from "../models/ChatModel.js";
import TeamModal from "../models/TeamModel.js";
import AdminModel from "../models/AdminModel.js";
import ChatSettingModel from "../models/ChatSettingModel.js";

const reteriveChats = async (req, res) => {
  try {
    const chats = await ChatModel.find();
    res.status(200).json({ success: true, chats });
  } catch (error) {
    console.error("Error retrieving chats:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve chats" });
  }
};

const fetchSingleChat = async (req, res) => {
  const { chatId } = req.params;
  try {
    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.status(200).json({
      success: true,
      chat: chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching chat",
      error: error.message,
    });
  }
};

const getAllChat = async (req, res) => {
  const { userId } = req.params;

  try {
    const chats = await ChatModel.find({ assigned: userId });
    res.status(200).json(chats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching chats", error: error.message });
  }
};

const createChat = async (req, res) => {
  try {
    const { name, email, phone, id } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    const admins = await AdminModel.find({});
    if (admins.length === 0) {
      return res
        .status(500)
        .json({ error: "No admins available for assignment." });
    }

    const randomIndex = Math.floor(Math.random() * admins.length);
    const selectedAdmin = admins[randomIndex];

    const newChat = new ChatModel({
      customer: { name, email, phone },
      assigned: selectedAdmin._id,
    });

    await newChat.save();

    res.status(201).json({
      success: true,
      message: "Chat created with random admin",
      chat: newChat,
    });
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const assignChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { newAssigneeId } = req.body;

    if (req.admin.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }

    const teamMember = await TeamModal.findById(newAssigneeId);
    if (!teamMember) {
      return res.status(404).json({ error: "Assignee not found." });
    }

    chat.assigned = newAssigneeId;
    await chat.save();

    res.status(200).json({ message: "Chat reassigned successfully", chat });
  } catch (err) {
    console.error("Reassignment error:", err);
    res.status(500).json({ error: "Server error during reassignment" });
  }
};

const fetchMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    res.json({ messages: chat.messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content, senderName, senderType } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Message content is required." });
    }

    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }

    const newMessage = {
      senderName,
      senderType,
      content,
      timestamp: new Date(),
    };

    chat.messages.push(newMessage);
    await chat.save();

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
      chatId: chat._id,
      newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const changeStatus = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { status } = req.body;

    if (!["resolved", "unresolved"].includes(status)) {
      return res.status(400).json({
        error: "Invalid status. It must be 'resolved' or 'unresolved'.",
      });
    }

    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: "Chat not found." });
    }

    if (chat.status === status) {
      return res
        .status(400)
        .json({ error: `Chat is already marked as '${status}'` });
    }

    chat.status = status;

    if (status === "resolved") {
      chat.isMissed = false;
    }

    await chat.save();

    res.status(200).json({
      message: `Chat marked as '${status}' successfully.`,
      chat,
    });
  } catch (error) {
    console.error("Error changing status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const checkIsMissed = async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) {
    return res.status(400).json({ message: "chatId is required" });
  }

  try {
    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (chat.replyTime) {
      return res
        .status(200)
        .json({ message: "Chat already replied", isMissed: false });
    }

    const settings = await ChatSettingModel.initializeSettings();
    const { hours, minutes, seconds } = settings.missedChatTimer;
    const timeoutMs = ((hours * 60 + minutes) * 60 + seconds) * 1000;
    const now = new Date();

    const shouldBeMissed =
      now.getTime() - chat.postedTime.getTime() > timeoutMs;

    if (shouldBeMissed && !chat.isMissed) {
      chat.isMissed = true;
      await chat.save();
    }

    return res.status(200).json({
      message: shouldBeMissed ? "Chat is missed" : "Chat is not missed yet",
      isMissed: chat.isMissed,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export {
  fetchSingleChat,
  reteriveChats,
  getAllChat,
  createChat,
  assignChat,
  fetchMessages,
  sendMessage,
  changeStatus,
  checkIsMissed,
};
