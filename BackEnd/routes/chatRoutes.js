import express from "express";
import { authenticateAdmin } from "../middleware/auth.js";
import {
  assignChat,
  changeStatus,
  checkIsMissed,
  createChat,
  fetchMessages,
  fetchSingleChat,
  getAllChat,
  reteriveChats,
  sendMessage,
} from "../controllers/chatControllers.js";

const chatRouter = express.Router();

chatRouter.get("/fetchSingleChat/:chatId", fetchSingleChat);
chatRouter.get("/retrieveChats", reteriveChats);
chatRouter.get("/getAllChats/:userId", getAllChat);
chatRouter.post("/createChat", createChat);
chatRouter.get("/fetchMessages/:chatId", fetchMessages);
chatRouter.post("/sendMessage/:chatId", sendMessage);
chatRouter.put("/:chatId/assign", authenticateAdmin, assignChat);
chatRouter.put("/:chatId/status", changeStatus);
chatRouter.get("/checkIsMissed/:chatId", checkIsMissed);

export default chatRouter;
