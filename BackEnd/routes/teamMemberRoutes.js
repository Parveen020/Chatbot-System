import express from "express";
import {
  findTeamMemberName,
  loginTeamMember,
  updateMemberProfile,
} from "../controllers/teamMemberControllers.js";

const memberRouter = express.Router();
memberRouter.post("/loginTeamMember", loginTeamMember);
memberRouter.get("/memberName/:id", findTeamMemberName);
memberRouter.put("/memberUpdate/:memberId", updateMemberProfile);

export default memberRouter;
