import jwt from "jsonwebtoken";
import AdminModel from "../models/AdminModel.js";

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Authentication required");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await AdminModel.findById(decoded.id);

    if (!admin) {
      throw new Error("Admin not found");
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Please authenticate" });
  }
};

export { authenticateAdmin };
