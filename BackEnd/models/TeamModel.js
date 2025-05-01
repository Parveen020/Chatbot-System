import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Member"],
      default: "Member",
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: function () {
        return this.role === "Member";
      },
    },
  },
  {
    timestamps: true,
  }
);

const TeamModal =
  mongoose.models.TeamMember || mongoose.model("TeamMember", TeamSchema);
export default TeamModal;
