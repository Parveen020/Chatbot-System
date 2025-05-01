import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import adminRouter from "./routes/adminRoutes.js";
import memberRouter from "./routes/teamMemberRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import chatSettingRouter from "./routes/chatSettingRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/admin", adminRouter);
app.use("/member", memberRouter);
app.use("/chat", chatRouter);
app.use("/chatbot-setting", chatSettingRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
