import AdminModel from "../models/AdminModel.js";
import TeamModal from "../models/TeamModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Admin not exist" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(admin._id);
    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        password: admin.password,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const exists = await AdminModel.findOne({ email });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "Admin already exists" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    if (name.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 2 characters",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new AdminModel({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const admin = await newAdmin.save();
    const token = createToken(admin._id);

    res.status(201).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateProfile = async (req, res) => {
  const { firstName, lastName, email, newPassword, confirmPassword } = req.body;
  const adminId = req.admin._id;

  try {
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    let shouldLogout = false;
    const updates = {};

    if (firstName || lastName) {
      const fName = firstName?.trim() || admin.firstName;
      const lName = lastName?.trim() || admin.lastName;
      updates.firstName = fName;
      updates.lastName = lName;
      updates.name = `${fName} ${lName}`;
    }

    if (email && email !== admin.email) {
      if (!validator.isEmail(email)) {
        return res
          .status(400)
          .json({ success: false, message: "Please enter a valid email" });
      }

      const emailExists = await AdminModel.findOne({ email });
      if (emailExists) {
        return res
          .status(409)
          .json({ success: false, message: "Email already in use" });
      }

      updates.email = email.toLowerCase().trim();
      shouldLogout = true;
    }

    if (newPassword) {
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
    }

    const updatedAdmin = await AdminModel.findByIdAndUpdate(
      adminId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      admin: updatedAdmin,
      shouldLogout,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during profile update" });
  }
};

const getTeamMembers = async (req, res) => {
  const adminId = req.admin._id;

  try {
    const teamMembers = await TeamModal.find({ adminId });
    return res.status(200).json({ success: true, data: teamMembers });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error });
  }
};

const AddTeamMember = async (req, res) => {
  try {
    const adminId = req.admin._id;

    const { fullName, phone, email, role } = req.body;

    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    console.log("admin - ", admin);

    const newMember = new TeamModal({
      fullName,
      phone,
      email,
      role,
      password: admin.password,
      adminId: adminId,
    });

    await newMember.save();
    res
      .status(201)
      .json({ success: true, message: "Team member added", data: newMember });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updateTeamMember = async (req, res) => {
  try {
    const adminId = req.admin._id;
    const { id } = req.params;
    const teamMember = await TeamModal.findById(id);

    if (!teamMember) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }

    if (
      !teamMember.adminId ||
      teamMember.adminId.toString() !== adminId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only update your own team members",
      });
    }

    const updateData = { ...req.body };
    const updatedMember = await TeamModal.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json({
      success: true,
      message: "Team member updated",
      data: updatedMember,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deleteTeamMember = async (req, res) => {
  try {
    const adminId = req.admin._id;
    const { id } = req.params;
    const deletedMember = await TeamModal.findById(id);

    if (!deletedMember) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }

    if (
      !deletedMember.adminId ||
      deletedMember.adminId.toString() !== adminId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only delete your own team members",
      });
    }

    const dMember = await TeamModal.findByIdAndDelete(id);

    res.json({ success: true, message: "Team member deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const findAdminName = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await AdminModel.findById(id);
    if (admin) {
      return res.status(200).json({ name: admin.name });
    }
  } catch (err) {
    return res.status(404).json({ error: "Assignee not found" });
  }
};

export {
  loginAdmin,
  registerAdmin,
  updateProfile,
  getTeamMembers,
  AddTeamMember,
  updateTeamMember,
  deleteTeamMember,
  findAdminName,
};
