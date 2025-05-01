import express from "express";
import {
  loginAdmin,
  registerAdmin,
  updateProfile,
  AddTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getTeamMembers,
  findAdminName,
} from "../controllers/adminControllers.js";
import { authenticateAdmin } from "../middleware/auth.js";

const adminRouter = express.Router();
adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.put("/updateProfile", authenticateAdmin, updateProfile);
adminRouter.get("/getTeamMembers", authenticateAdmin, getTeamMembers);
adminRouter.post("/addTeamMember", authenticateAdmin, AddTeamMember);
adminRouter.put("/updateTeamMember/:id", authenticateAdmin, updateTeamMember);
adminRouter.delete(
  "/deleteTeamMember/:id",
  authenticateAdmin,
  deleteTeamMember
);
adminRouter.post("/adminName/:id", findAdminName);

export default adminRouter;
