import AdminModel from "../models/AdminModel.js";
import TeamModal from "../models/TeamModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const loginTeamMember = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const member = await TeamModal.findOne({ email });
    console.log("member-", member);
    if (!member) {
      return res.status(401).json({
        success: false,
        message: "Team member does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(member._id);

    res.status(200).json({
      success: true,
      token,
      member: {
        id: member._id,
        fullName: member.fullName,
        email: member.email,
        role: member.role,
        adminId: member.adminId,
      },
    });
  } catch (error) {
    console.error("Team member login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateMemberProfile = async (req, res) => {
  const { firstName, lastName, email, newPassword, confirmPassword } = req.body;
  const { memberId } = req.params;

  console.log("Update request received:", {
    memberId,
    firstName,
    lastName,
    email,
    passwordProvided: !!newPassword,
  });

  try {
    const member = await TeamModal.findById(memberId);
    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }

    console.log("Found member:", member._id.toString());

    let shouldLogout = false;
    const updates = {};

    if (firstName || lastName) {
      const fName = firstName?.trim() || member.firstName;
      const lName = lastName?.trim() || member.lastName;
      updates.firstName = fName;
      updates.lastName = lName;
      updates.fullName = `${fName} ${lName}`;
    }

    if (email && email !== member.email) {
      if (!validator.isEmail(email)) {
        return res
          .status(400)
          .json({ success: false, message: "Please enter a valid email" });
      }

      const emailExists = await TeamModal.findOne({
        email,
        _id: { $ne: memberId }, // Don't check against the member's own email
      });

      if (emailExists) {
        return res
          .status(409)
          .json({ success: false, message: "Email already in use" });
      }

      updates.email = email.toLowerCase().trim();
      shouldLogout = true;
    }

    if (newPassword) {
      console.log("Processing password update");

      if (newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 8 characters",
        });
      }

      if (newPassword !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "New password and confirmation don't match",
        });
      }

      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(newPassword, salt);
      shouldLogout = true;

      console.log("Password hashed and ready for update");
    }

    console.log("Updates to apply:", Object.keys(updates));

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No changes to update",
      });
    }

    const updatedMember = await TeamModal.findByIdAndUpdate(
      memberId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    console.log("Member updated successfully:", updatedMember._id.toString());

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      member: updatedMember,
      shouldLogout,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during profile update" });
  }
};

const findTeamMemberName = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await TeamModal.findById(id);
    if (member) {
      return res.status(200).json({ name: member.fullName });
    }
  } catch (err) {
    return res.status(404).json({ error: "Assignee not found" });
  }
};

export { loginTeamMember, findTeamMemberName, updateMemberProfile };
