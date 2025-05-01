import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderName: { type: String, required: true },
  senderType: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const ChatSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      default: function () {
        const now = new Date();
        const year = now.getFullYear();
        const date = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        return `${year}-0${date}${month}`;
      },
    },
    messages: [messageSchema],
    postedTime: { type: Date, default: Date.now },
    replyTime: { type: Date },
    elapsedTime: {
      type: String,
      default: "00:00",
    },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
    },
    assigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["resolved", "unresolved"],
      default: "unresolved",
    },
    isMissed: { type: Boolean, default: false },
    chatNumber: { type: Number },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

ChatSchema.pre("save", function (next) {
  if (this.replyTime && this.postedTime) {
    const elapsedMs = this.replyTime.getTime() - this.postedTime.getTime();
    const elapsedSeconds = Math.floor(elapsedMs / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    this.elapsedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  next();
});

const ChatModel = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
export default ChatModel;
