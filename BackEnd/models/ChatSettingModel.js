import mongoose from "mongoose";

const ChatSettingSchema = new mongoose.Schema(
  {
    headerColor: { type: String, default: "#4267B2" },
    backgroundColor: { type: String, default: "#FFFFFF" },
    customMessages: {
      welcomeMessage: {
        type: String,
        default:
          "Want to chat about Hubly? I'm a chatbot here to help you find your way.",
      },
      introMessage: { type: String, default: "How can I help you?" },
      askMessage: { type: String, default: "Ask me anything..." },
    },
    introductionForm: {
      enabled: { type: Boolean, default: true },
      fields: {
        name: { type: Boolean, default: true },
        phone: { type: Boolean, default: true },
        email: { type: Boolean, default: true },
      },
    },
    missedChatTimer: {
      hours: { type: Number, default: 12 },
      minutes: { type: Number, default: 10 },
      seconds: { type: Number, default: 0 },
    },
  },
  { minimize: false }
);

ChatSettingSchema.statics.initializeSettings = async function () {
  const settings = await this.findOne();
  if (!settings) {
    const defaultSettings = new this();
    await defaultSettings.save();
    return defaultSettings;
  }
  return settings;
};

const ChatSettingModel =
  mongoose.models.ChatSetting ||
  mongoose.model("ChatSetting", ChatSettingSchema);

export default ChatSettingModel;
