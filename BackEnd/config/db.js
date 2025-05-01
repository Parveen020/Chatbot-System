import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb+srv://Parv809:Parv1234@cluster0.xi4pp.mongodb.net/HomeIt")
    .then(() => console.log("DB Connected"));
};
