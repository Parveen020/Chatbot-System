import express from "express";
import { authenticateAdmin } from "../middleware/auth.js";
import {
  getSettings,
  updateSettings,
} from "../controllers/chatSettingController.js";

const chatSettingRouter = express.Router();

chatSettingRouter.get("/get-chat-setting", getSettings);
chatSettingRouter.put(
  "/update-chat-setting",
  authenticateAdmin,
  updateSettings
);

export default chatSettingRouter;
